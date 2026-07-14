# KPOP IN PUBLIC 주간 랭킹

유튜브에서 "kpop in public" 커버댄스 영상을 검색해, 최근 7일 내 업로드된 영상을 조회수 순으로 랭킹을 매기는 Next.js 웹 서비스입니다.

## 동작 방식

- `src/lib/youtube.ts`가 YouTube Data API v3로 `"kpop in public"` 검색 → 최근 7일 업로드 영상 조회 → 관련도 낮은 결과(단순 키워드 우연 매칭 등) 필터링 → 조회수 내림차순 정렬을 수행합니다.
- `YOUTUBE_API_KEY` 환경변수가 없으면 자동으로 샘플(목업) 데이터를 보여줍니다.
- 페이지(`/`)와 API(`/api/rankings`)는 1시간마다 재검증(ISR)됩니다.

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

- YouTube Data API v3는 일일 할당량(기본 10,000 units)이 있습니다. `search.list` 1회당 100 units가 소모되므로, 트래픽이 많다면 재검증 주기(`revalidate`)를 늘리는 것을 고려하세요.
- "이번 주 업로드 영상 중 조회수 순" 기준이므로, 오래된 인기 영상의 누적 조회수 증가분은 반영되지 않습니다.
