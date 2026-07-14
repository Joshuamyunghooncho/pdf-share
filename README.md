# KPOP IN PUBLIC 주간 랭킹

전 세계 "kpop in public" 커버댄스 크루 100팀의 유튜브 채널을 등록해두고, 그 채널들이 최근 7일 내 올린 영상만 대상으로 조회수 순위를 매기는 Next.js 웹 서비스입니다. 키워드로 유튜브 전체를 검색하지 않기 때문에 밈/쇼츠/무관한 영상이 섞이지 않습니다.

## 동작 방식

- `src/data/crews.json`: 등록된 크루(채널) 목록. `scripts/discover-crews.mjs`로 실제 YouTube 검색 결과에서 반복적으로 "kpop in public" 영상을 올리는 채널만 골라 생성했습니다.
- `src/lib/youtube.ts`가 각 크루의 업로드 재생목록(`uploads playlist`)을 조회 → 최근 7일 내 올라온 영상만 추출 → 관련도 낮은 결과 필터링 → 조회수 내림차순 정렬을 수행합니다.
- `YOUTUBE_API_KEY` 환경변수가 없으면 자동으로 샘플(목업) 데이터를 보여줍니다.
- 페이지(`/`)와 API(`/api/rankings`)는 1시간마다 재검증(ISR)됩니다.

## 크루 목록 갱신하기

새로운 크루를 발굴하거나 목록을 다시 만들고 싶다면:

```bash
node --env-file=.env.local scripts/discover-crews.mjs > src/data/crews.json
```

여러 검색어(기본 쿼리 + 도시별 쿼리)로 유튜브를 훑어 "kpop in public" 영상을 반복적으로 올리는 채널을 빈도순으로 상위 100개 추립니다. 1회 실행에 약 2,600 units의 API 할당량이 소요됩니다(일일 기본 할당량 10,000 units).

## 시작하기

1. 의존성 설치

   ```bash
   npm install
   ```

2. YouTube Data API v3 키 발급

   - [Google Cloud Console](https://console.cloud.google.com/) → 프로젝트 선택(또는 생성)
   - "API 및 서비스" → "라이브러리"에서 **YouTube Data API v3** 사용 설정
   - "API 및 서비스" → **"사용자 인증 정보"** → "+ 사용자 인증 정보 만들기" → "API 키"
   - 발급된 키를 복사 (권장: 키 제한사항에서 YouTube Data API v3만 허용하도록 제한)

3. 환경변수 설정

   ```bash
   cp .env.example .env.local
   # .env.local 파일을 열어 YOUTUBE_API_KEY 값을 채워넣기
   ```

4. 개발 서버 실행

   ```bash
   npm run dev
   ```

   [http://localhost:3000](http://localhost:3000) 접속

## 배포

Vercel 등에 배포 시 프로젝트 환경변수에 `YOUTUBE_API_KEY`를 등록하세요. 키는 서버 사이드에서만 사용되며 브라우저에 노출되지 않습니다.

## 참고

- 매 재검증마다 크루 100팀 × `playlistItems.list`(1 unit) + `videos.list` 배치 조회 정도로, 약 100~110 units가 소모됩니다. 키워드 검색(`search.list`, 100 units) 방식보다 오히려 할당량 효율이 좋습니다.
- "이번 주 업로드 영상 중 조회수 순" 기준이므로, 오래된 인기 영상의 누적 조회수 증가분은 반영되지 않습니다.
- 등록 크루 목록은 수동 큐레이션이 아니라 YouTube 검색 API 결과 기반으로 자동 생성했기 때문에, 실제로 활동 중인 채널인지 주기적으로 재검증(`discover-crews.mjs` 재실행)하는 것을 권장합니다.
