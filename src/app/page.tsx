import { getWeeklyRankings } from "@/lib/youtube";

export const revalidate = 3600;

function formatViewCount(count: number) {
  return new Intl.NumberFormat("ko-KR").format(count);
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

function countryFlag(countryCode: string | null) {
  if (!countryCode || countryCode.length !== 2) return null;
  const codePoints = [...countryCode.toUpperCase()].map(
    (char) => 0x1f1a5 + char.charCodeAt(0)
  );
  return String.fromCodePoint(...codePoints);
}

const RANK_STYLES: Record<number, string> = {
  1: "bg-gradient-to-br from-yellow-300 to-yellow-500 text-yellow-950",
  2: "bg-gradient-to-br from-zinc-200 to-zinc-400 text-zinc-900",
  3: "bg-gradient-to-br from-orange-300 to-orange-500 text-orange-950",
};

export default async function Home() {
  const { videos, weekStart, weekEnd, source, crewCount } =
    await getWeeklyRankings();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <header className="mb-8 text-center">
          <p className="text-sm font-medium tracking-widest text-pink-400 uppercase">
            Weekly Chart · Registered Crews
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            KPOP IN PUBLIC 조회수 랭킹
          </h1>
          <p className="mt-3 text-sm text-zinc-400">
            {formatDate(weekStart)} – {formatDate(weekEnd)} 업로드 영상 기준 ·
            등록 크루 {crewCount}팀 대상
          </p>
        </header>

        {source === "mock" && (
          <div className="mb-6 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
            지금은 샘플(목업) 데이터로 표시 중입니다. 서버 환경변수{" "}
            <code className="rounded bg-black/30 px-1 py-0.5">
              YOUTUBE_API_KEY
            </code>
            를 설정하면 실제 YouTube 데이터로 자동 전환됩니다.
          </div>
        )}

        {videos.length === 0 ? (
          <p className="text-center text-zinc-400">
            이번 주에 발견된 영상이 없습니다.
          </p>
        ) : (
          <ol className="flex flex-col gap-3">
            {videos.map((video) => (
              <li key={video.videoId}>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-3 transition hover:border-pink-500/60 hover:bg-zinc-800 sm:p-4"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold sm:h-10 sm:w-10 ${
                      RANK_STYLES[video.rank] ?? "bg-zinc-800 text-zinc-300"
                    }`}
                  >
                    {video.rank}
                  </span>

                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="h-16 w-28 shrink-0 rounded-lg object-cover sm:h-20 sm:w-36"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-zinc-50 sm:text-base">
                      {video.title}
                    </p>
                    <p className="mt-1 truncate text-xs text-zinc-400 sm:text-sm">
                      {countryFlag(video.country) && (
                        <span className="mr-1">{countryFlag(video.country)}</span>
                      )}
                      {video.channelTitle} · {formatDate(video.publishedAt)}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-sm font-bold text-pink-400 sm:text-base">
                      {formatViewCount(video.viewCount)}
                    </p>
                    <p className="text-[11px] text-zinc-500">views</p>
                  </div>
                </a>
              </li>
            ))}
          </ol>
        )}

        <footer className="mt-10 text-center text-xs text-zinc-600">
          매시간 자동 갱신 · 전 세계 &quot;kpop in public&quot; 크루 {crewCount}
          팀의 최근 7일 업로드 영상만을 대상으로, 조회수 순으로 정렬합니다.
          임의 검색 결과가 아닌 등록된 채널만 집계해 신뢰도를 높였습니다.
        </footer>
      </div>
    </div>
  );
}
