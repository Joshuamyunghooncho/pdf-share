// One-off discovery script: finds real YouTube channels that repeatedly
// publish "kpop in public" content, using the YouTube Data API (no
// invented names). Writes the curated roster to src/data/crews.json.
//
// Usage: node --env-file=.env.local scripts/discover-crews.mjs

const API_KEY = process.env.YOUTUBE_API_KEY;
if (!API_KEY) {
  console.error("YOUTUBE_API_KEY is not set");
  process.exit(1);
}

const BASE_QUERIES = [
  { q: '"kpop in public"', order: "relevance", pages: 2 },
  { q: '"kpop in public"', order: "viewCount", pages: 2 },
  { q: '"kpop in public" one take', order: "relevance", pages: 1 },
  { q: '"kpop in public" dance cover', order: "relevance", pages: 1 },
];

const CITIES = [
  "Paris",
  "London",
  "Tokyo",
  "Bangkok",
  "Manila",
  "Jakarta",
  "New York",
  "Los Angeles",
  "Sao Paulo",
  "Mexico City",
  "Madrid",
  "Berlin",
  "Toronto",
  "Sydney",
  "Seoul",
  "Singapore",
  "Hong Kong",
  "Taipei",
  "Lima",
  "Ho Chi Minh",
];

const REGIONAL_QUERIES = CITIES.map((city) => ({
  q: `"kpop in public" ${city}`,
  order: "relevance",
  pages: 1,
}));

const ALL_QUERIES = [...BASE_QUERIES, ...REGIONAL_QUERIES];

function isRelevant(title, description) {
  const normalize = (t) => t.toLowerCase().replace(/[^a-z0-9]/g, "");
  const haystack = normalize(`${title} ${(description || "").slice(0, 160)}`);
  if (haystack.includes("kpopinpublic")) return true;
  if (haystack.includes("inpublic") && haystack.includes("dance")) return true;
  return false;
}

let unitsUsed = 0;

async function searchPage(q, order, pageToken) {
  const params = new URLSearchParams({
    key: API_KEY,
    part: "snippet",
    q,
    type: "video",
    order,
    maxResults: "50",
  });
  if (pageToken) params.set("pageToken", pageToken);

  const res = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`);
  unitsUsed += 100;
  if (!res.ok) {
    console.error(`search failed for "${q}" (${order}): ${res.status} ${await res.text()}`);
    return { items: [], nextPageToken: undefined };
  }
  return res.json();
}

async function discover() {
  const candidates = new Map(); // channelId -> { channelTitle, count, videoIds: Set }

  for (const { q, order, pages } of ALL_QUERIES) {
    let pageToken;
    for (let page = 0; page < pages; page++) {
      const data = await searchPage(q, order, pageToken);
      for (const item of data.items ?? []) {
        const channelId = item.snippet?.channelId;
        const channelTitle = item.snippet?.channelTitle;
        const videoId = item.id?.videoId;
        if (!channelId || !videoId) continue;
        if (!isRelevant(item.snippet.title, item.snippet.description)) continue;

        const entry = candidates.get(channelId) ?? {
          channelTitle,
          count: 0,
          videoIds: new Set(),
        };
        entry.videoIds.add(videoId);
        entry.count = entry.videoIds.size;
        candidates.set(channelId, entry);
      }
      pageToken = data.nextPageToken;
      if (!pageToken) break;
    }
    console.error(`[discover] "${q}" (${order}) -> ${candidates.size} unique channels so far, ${unitsUsed} units used`);
  }

  return candidates;
}

async function fetchChannelDetails(channelIds) {
  const details = new Map();
  for (let i = 0; i < channelIds.length; i += 50) {
    const batch = channelIds.slice(i, i + 50);
    const params = new URLSearchParams({
      key: API_KEY,
      part: "snippet,contentDetails",
      id: batch.join(","),
    });
    const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?${params}`);
    unitsUsed += 1;
    if (!res.ok) {
      console.error(`channels.list failed: ${res.status} ${await res.text()}`);
      continue;
    }
    const data = await res.json();
    for (const item of data.items ?? []) {
      details.set(item.id, {
        channelId: item.id,
        channelTitle: item.snippet.title,
        country: item.snippet.country ?? null,
        thumbnailUrl:
          item.snippet.thumbnails?.medium?.url ??
          item.snippet.thumbnails?.default?.url ??
          "",
        uploadsPlaylistId: item.contentDetails?.relatedPlaylists?.uploads ?? null,
      });
    }
  }
  return details;
}

async function main() {
  const candidates = await discover();

  const ranked = [...candidates.entries()]
    .map(([channelId, v]) => ({ channelId, channelTitle: v.channelTitle, matchCount: v.count }))
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, 100);

  console.error(`[discover] top candidate pool: ${ranked.length} channels`);

  const details = await fetchChannelDetails(ranked.map((r) => r.channelId));

  const roster = ranked
    .map((r) => {
      const d = details.get(r.channelId);
      if (!d || !d.uploadsPlaylistId) return null;
      return {
        channelId: r.channelId,
        channelTitle: d.channelTitle,
        country: d.country,
        thumbnailUrl: d.thumbnailUrl,
        uploadsPlaylistId: d.uploadsPlaylistId,
        matchCount: r.matchCount,
      };
    })
    .filter(Boolean);

  console.error(`[discover] final roster: ${roster.length} channels, total units used: ${unitsUsed}`);

  process.stdout.write(JSON.stringify(roster, null, 2) + "\n");
}

main();
