import crewRoster from "@/data/crews.json";

export type RankedVideo = {
  rank: number;
  videoId: string;
  title: string;
  channelTitle: string;
  channelId: string;
  country: string | null;
  thumbnailUrl: string;
  viewCount: number;
  publishedAt: string;
  url: string;
};

export type RankingsResult = {
  videos: RankedVideo[];
  weekStart: string;
  weekEnd: string;
  crewCount: number;
  source: "youtube-api" | "mock";
  generatedAt: string;
};

const RANKING_SIZE = 20;
const CONCURRENCY = 10;

type Crew = {
  channelId: string;
  channelTitle: string;
  country: string | null;
  thumbnailUrl: string;
  uploadsPlaylistId: string;
};

const CREWS = crewRoster as Crew[];

function isRelevantTitle(title: string, description: string) {
  const normalize = (text: string) => text.toLowerCase().replace(/[^a-z0-9]/g, "");
  // Only look at the start of the description: long-tail keyword-stuffed
  // tags appended further down (an SEO trick) shouldn't count as a match.
  const haystack = normalize(`${title} ${description.slice(0, 160)}`);
  if (haystack.includes("kpopinpublic")) return true;
  if (haystack.includes("inpublic") && haystack.includes("dance")) return true;
  return false;
}

function getWeekRange() {
  const weekEnd = new Date();
  const weekStart = new Date(weekEnd.getTime() - 7 * 24 * 60 * 60 * 1000);
  return { weekStart, weekEnd };
}

async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;

  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await fn(items[index]);
    }
  }

  await Promise.all(new Array(Math.min(limit, items.length)).fill(0).map(worker));
  return results;
}

type RecentUpload = { videoId: string; channelId: string };

async function fetchRecentUploads(
  apiKey: string,
  crew: Crew,
  weekStart: Date
): Promise<RecentUpload[]> {
  const params = new URLSearchParams({
    key: apiKey,
    part: "snippet",
    playlistId: crew.uploadsPlaylistId,
    maxResults: "10",
  });

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?${params.toString()}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    console.error(`playlistItems failed for ${crew.channelTitle}: ${res.status}`);
    return [];
  }

  const data = await res.json();

  type PlaylistItem = {
    snippet: {
      publishedAt: string;
      resourceId: { videoId: string };
    };
  };

  return (data.items ?? [])
    .filter((item: PlaylistItem) => new Date(item.snippet.publishedAt) >= weekStart)
    .map((item: PlaylistItem) => ({
      videoId: item.snippet.resourceId.videoId,
      channelId: crew.channelId,
    }));
}

async function fetchFromCrewRoster(apiKey: string): Promise<RankedVideo[]> {
  const { weekStart } = getWeekRange();

  const uploadLists = await mapWithConcurrency(CREWS, CONCURRENCY, (crew) =>
    fetchRecentUploads(apiKey, crew, weekStart)
  );

  const uploads = uploadLists.flat();
  if (uploads.length === 0) {
    return [];
  }

  const channelById = new Map(CREWS.map((c) => [c.channelId, c]));
  const videoIds = uploads.map((u) => u.videoId);

  const videoBatches: string[][] = [];
  for (let i = 0; i < videoIds.length; i += 50) {
    videoBatches.push(videoIds.slice(i, i + 50));
  }

  type YouTubeVideoItem = {
    id: string;
    snippet: {
      title: string;
      description: string;
      channelId: string;
      publishedAt: string;
      thumbnails: {
        high?: { url: string };
        medium?: { url: string };
        default?: { url: string };
      };
    };
    statistics: {
      viewCount?: string;
    };
  };

  const items: YouTubeVideoItem[] = [];
  for (const batch of videoBatches) {
    const params = new URLSearchParams({
      key: apiKey,
      part: "snippet,statistics",
      id: batch.join(","),
    });
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?${params.toString()}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) {
      console.error(`videos.list failed: ${res.status} ${await res.text()}`);
      continue;
    }
    const data = await res.json();
    items.push(...(data.items ?? []));
  }

  const videos: RankedVideo[] = items
    .filter((item) => isRelevantTitle(item.snippet.title, item.snippet.description))
    .map((item) => {
      const crew = channelById.get(item.snippet.channelId);
      return {
        videoId: item.id,
        title: item.snippet.title,
        channelTitle: crew?.channelTitle ?? "Unknown",
        channelId: item.snippet.channelId,
        country: crew?.country ?? null,
        thumbnailUrl:
          item.snippet.thumbnails.high?.url ??
          item.snippet.thumbnails.medium?.url ??
          item.snippet.thumbnails.default?.url ??
          "",
        viewCount: Number(item.statistics.viewCount ?? 0),
        publishedAt: item.snippet.publishedAt,
        url: `https://www.youtube.com/watch?v=${item.id}`,
        rank: 0,
      };
    })
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, RANKING_SIZE)
    .map((video, index) => ({ ...video, rank: index + 1 }));

  return videos;
}

function buildMockVideos(): RankedVideo[] {
  const groups = [
    "IVE",
    "NewJeans",
    "LE SSERAFIM",
    "aespa",
    "TWICE",
    "STAYC",
    "ITZY",
    "(G)I-DLE",
    "Kep1er",
    "NMIXX",
    "BABYMONSTER",
    "ZEROBASEONE",
  ];
  const spots = [
    "Hongdae",
    "Myeongdong",
    "Times Square",
    "Shibuya Crossing",
    "Gangnam Station",
    "Paris",
    "London",
    "Bangkok",
    "Osaka",
    "Sydney",
    "Berlin",
    "Toronto",
  ];
  const songs = [
    "LOVE DIVE",
    "Super Shy",
    "EASY",
    "Supernova",
    "SET ME FREE",
    "ASAP",
    "UNTOUCHABLE",
    "Klaxon",
    "Fire in the belly",
    "DASH",
    "SHEESH",
    "In the name of love",
  ];

  const { weekStart, weekEnd } = getWeekRange();
  const span = weekEnd.getTime() - weekStart.getTime();

  const videos = groups.map((group, index) => {
    const publishedAt = new Date(weekStart.getTime() + Math.random() * span);
    const baseViews = 900000 - index * 60000;
    const viewCount = Math.max(
      5000,
      Math.round(baseViews + (Math.random() - 0.5) * 150000)
    );
    const crew = CREWS[index % CREWS.length];
    return {
      rank: 0,
      videoId: `mock-${index}`,
      title: `[KPOP IN PUBLIC] ${group} - '${songs[index % songs.length]}' Dance Cover in ${spots[index % spots.length]}`,
      channelTitle: `${group} Dance Crew`,
      channelId: crew?.channelId ?? "",
      country: crew?.country ?? null,
      thumbnailUrl: `https://picsum.photos/seed/kpop-${index}/480/270`,
      viewCount,
      publishedAt: publishedAt.toISOString(),
      url: "#",
    };
  });

  return videos
    .sort((a, b) => b.viewCount - a.viewCount)
    .map((video, index) => ({ ...video, rank: index + 1 }));
}

export async function getWeeklyRankings(): Promise<RankingsResult> {
  const { weekStart, weekEnd } = getWeekRange();
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return {
      videos: buildMockVideos(),
      weekStart: weekStart.toISOString(),
      weekEnd: weekEnd.toISOString(),
      crewCount: CREWS.length,
      source: "mock",
      generatedAt: new Date().toISOString(),
    };
  }

  const videos = await fetchFromCrewRoster(apiKey);

  return {
    videos,
    weekStart: weekStart.toISOString(),
    weekEnd: weekEnd.toISOString(),
    crewCount: CREWS.length,
    source: "youtube-api",
    generatedAt: new Date().toISOString(),
  };
}
