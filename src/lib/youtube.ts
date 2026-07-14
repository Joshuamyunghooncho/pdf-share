export type RankedVideo = {
  rank: number;
  videoId: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  viewCount: number;
  publishedAt: string;
  url: string;
};

export type RankingsResult = {
  videos: RankedVideo[];
  weekStart: string;
  weekEnd: string;
  source: "youtube-api" | "mock";
  generatedAt: string;
};

const SEARCH_QUERY = '"kpop in public"';
const MAX_RESULTS = 50;
const RANKING_SIZE = 20;

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

async function fetchFromYouTube(apiKey: string): Promise<RankedVideo[]> {
  const { weekStart } = getWeekRange();

  const searchParams = new URLSearchParams({
    key: apiKey,
    part: "snippet",
    q: SEARCH_QUERY,
    type: "video",
    order: "viewCount",
    maxResults: String(MAX_RESULTS),
    publishedAfter: weekStart.toISOString(),
    safeSearch: "none",
  });

  const searchRes = await fetch(
    `https://www.googleapis.com/youtube/v3/search?${searchParams.toString()}`,
    { next: { revalidate: 3600 } }
  );

  if (!searchRes.ok) {
    const body = await searchRes.text();
    throw new Error(`YouTube search failed (${searchRes.status}): ${body}`);
  }

  const searchData = await searchRes.json();
  const videoIds: string[] = (searchData.items ?? [])
    .map((item: { id?: { videoId?: string } }) => item.id?.videoId)
    .filter((id: string | undefined): id is string => Boolean(id));

  if (videoIds.length === 0) {
    return [];
  }

  const videosParams = new URLSearchParams({
    key: apiKey,
    part: "snippet,statistics",
    id: videoIds.join(","),
  });

  const videosRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?${videosParams.toString()}`,
    { next: { revalidate: 3600 } }
  );

  if (!videosRes.ok) {
    const body = await videosRes.text();
    throw new Error(`YouTube videos lookup failed (${videosRes.status}): ${body}`);
  }

  const videosData = await videosRes.json();

  type YouTubeVideoItem = {
    id: string;
    snippet: {
      title: string;
      description: string;
      channelTitle: string;
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

  const videos: RankedVideo[] = (videosData.items ?? [])
    .filter((item: YouTubeVideoItem) =>
      isRelevantTitle(item.snippet.title, item.snippet.description)
    )
    .map((item: YouTubeVideoItem) => ({
      videoId: item.id,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnailUrl:
        item.snippet.thumbnails.high?.url ??
        item.snippet.thumbnails.medium?.url ??
        item.snippet.thumbnails.default?.url ??
        "",
      viewCount: Number(item.statistics.viewCount ?? 0),
      publishedAt: item.snippet.publishedAt,
      url: `https://www.youtube.com/watch?v=${item.id}`,
      rank: 0,
    }))
    .sort((a: RankedVideo, b: RankedVideo) => b.viewCount - a.viewCount)
    .slice(0, RANKING_SIZE)
    .map((video: RankedVideo, index: number) => ({ ...video, rank: index + 1 }));

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
    return {
      rank: 0,
      videoId: `mock-${index}`,
      title: `[KPOP IN PUBLIC] ${group} - '${songs[index % songs.length]}' Dance Cover in ${spots[index % spots.length]}`,
      channelTitle: `${group} Dance Crew`,
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
      source: "mock",
      generatedAt: new Date().toISOString(),
    };
  }

  const videos = await fetchFromYouTube(apiKey);

  return {
    videos,
    weekStart: weekStart.toISOString(),
    weekEnd: weekEnd.toISOString(),
    source: "youtube-api",
    generatedAt: new Date().toISOString(),
  };
}
