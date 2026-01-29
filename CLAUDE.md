# The Grove Journal — 프로젝트 컨텍스트

## 프로젝트 개요

**필라테스 그로브(Pilates Grove)**의 프리미엄 디지털 매거진.
원장님을 "스포츠 재활의 대가"로 포지셔닝하는 브랜드 매거진 + 자동 콘텐츠 파이프라인.

- **라이브 URL**: https://the-grove-journal.vercel.app
- **GitHub**: https://github.com/link8411-max/the-grove-journal
- **네이버 블로그**: https://blog.naver.com/pilatesgrove
- **인스타그램**: https://www.instagram.com/pilatesgrove_official/
- **네이버 플레이스**: https://pcmap.place.naver.com/place/1392181307/home

---

## 기술 스택

| 항목 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router, Turbopack) |
| 스타일링 | Tailwind CSS v4 (`@theme inline`) |
| 아이콘 | Lucide React |
| 콘텐츠 | Markdown (gray-matter + remark + remark-html) |
| OG 이미지 | @vercel/og (Edge Runtime) |
| 콘텐츠 봇 | Python + Google Gemini API (gemini-2.0-flash) |
| CI/CD | GitHub Actions (daily cron) → Vercel 자동 배포 |
| 배포 | Vercel |

---

## 폴더 구조

```
the-grove-journal/
├── app/
│   ├── layout.tsx                    # 루트 레이아웃 (폰트, Header, Footer, MobileReserveBar)
│   ├── page.tsx                      # 홈 (HeroSection + ArticleGrid + ConnectCTA)
│   ├── globals.css                   # Tailwind v4 + prose 스타일링
│   ├── sitemap.ts                    # 동적 sitemap.xml 생성
│   ├── robots.ts                     # robots.txt 생성
│   ├── medical-column/
│   │   ├── page.tsx                  # 의학 칼럼 리스트
│   │   └── [slug]/page.tsx           # 개별 칼럼 상세
│   ├── power-pilates/
│   │   ├── page.tsx                  # 파워 필라테스 리스트
│   │   └── [slug]/page.tsx           # 개별 글 상세
│   ├── grove-story/
│   │   ├── page.tsx                  # 그로브 소식 리스트
│   │   └── [slug]/page.tsx           # 개별 소식 상세
│   └── api/og/route.tsx              # OG 이미지 자동 생성 API (Edge)
├── components/
│   ├── Header.tsx                    # 고정 헤더 (로고 + 메뉴 + RESERVE) — "use client"
│   ├── Footer.tsx                    # 3단 푸터 (브랜드/매거진/외부링크)
│   ├── HeroSection.tsx               # "Movement as Medicine" 히어로
│   ├── ArticleGrid.tsx               # 2열 반응형 아티클 그리드
│   ├── ArticleCard.tsx               # 카테고리별 아이콘/그라데이션 카드
│   ├── ConnectCTA.tsx                # 채널 연결 CTA (블로그/인스타/예약)
│   ├── CrossLinkBanner.tsx           # 아티클 하단 크로스링크 + 네이버 검색 유도
│   └── MobileReserveBar.tsx          # 모바일 하단 고정 예약 버튼 — "use client"
├── lib/
│   ├── constants.ts                  # SITE, LINKS, CATEGORIES 상수
│   └── posts.ts                      # 마크다운 파싱 (getAllPosts, getPostBySlug 등)
├── content/                          # 마크다운 콘텐츠 (봇이 여기에 자동 생성)
│   ├── medical-column/
│   ├── power-pilates/
│   └── grove-story/
├── scripts/
│   ├── marketing_bot.py              # Gemini 기반 콘텐츠 자동 생성 봇
│   └── .bot_state.json               # 봇 순환 상태 (next_index)
└── .github/workflows/
    └── daily-publish.yml             # 매일 KST 07:00 자동 발행
```

---

## 핵심 파일 설명

### `lib/constants.ts`
모든 외부 링크, 사이트 메타, 카테고리 정의가 여기 집중됨.
새 카테고리 추가 시 이 파일의 `CATEGORIES` 배열에 추가 필요.

### `lib/posts.ts`
`content/` 디렉토리의 `.md` 파일을 읽어 PostMeta/Post 객체로 변환.
frontmatter 필드: `title`, `date`, `category`, `excerpt`, `thumbnail`(optional).

### `scripts/marketing_bot.py`
- 6개 내장 주제 (neck-pain, round-shoulder, postpartum, disc, gratz, knee-pain)
- 페르소나: 국민대 석사 + Power Pilates 공인 지도자 + 10년 임상
- 금지 규칙: 세일즈 표현, AI 표현 절대 금지
- 실행: `python3 scripts/marketing_bot.py` (순환) / `--topic N` / `--all` / `--list`
- 카테고리별 기본 Unsplash 썸네일 자동 삽입

### `.github/workflows/daily-publish.yml`
- 스케줄: `cron: '0 22 * * *'` (UTC) = KST 07:00
- 수동 실행 가능 (workflow_dispatch, topic 입력)
- 커밋 메시지에 요일별 카테고리 라벨 자동 포함

---

## 디자인 시스템

### 폰트
- **제목(h1~h3)**: Noto Serif KR → Playfair Display → Georgia (한글 우선)
- **본문**: Pretendard (가변폰트 CDN)
- **영문 장식**: Playfair Display italic

### 컬러
Stone 팔레트 (따뜻한 뉴트럴) 기반:
- 배경: stone-50 (#fafaf9)
- 본문: stone-800 (#292524) ~ stone-900 (#1c1917)
- 서브텍스트: stone-400~500
- 액센트: 없음 (의도적으로 무채색 유지)

### 카테고리별 시각 구분
| 카테고리 | 그라데이션 | 아이콘 |
|----------|-----------|--------|
| medical-column | stone→amber-50 | Stethoscope |
| power-pilates | stone→stone-200 | Dumbbell |
| grove-story | stone→emerald-50 | TreePine |

### 반응형
- 모바일: 1열, 본문 16px, line-height 2.0
- 데스크탑(sm+): 2열 그리드, 본문 17px, line-height 1.95
- `word-break: keep-all` (한글 어절 단위 줄바꿈)

---

## SEO 구성

- `sitemap.ts` → `/sitemap.xml` 자동 생성 (전체 아티클 포함)
- `robots.ts` → `/robots.txt` (전체 허용 + sitemap 위치)
- 각 아티클 `generateMetadata()`로 title, description, OG 태그 자동
- `/api/og?title=...` → Vercel OG 이미지 자동 생성
- 아티클 하단 네이버 검색 유도 텍스트 ("필라테스 그로브 검색")

---

## 크로스링크 전략

1. **아티클 하단 CrossLinkBanner**: 네이버 블로그 + 상담 예약 + SNS 링크
2. **홈 ConnectCTA**: 블로그 / Instagram / 상담 예약 3버튼
3. **헤더 RESERVE 버튼**: 네이버 플레이스 예약 (데스크탑)
4. **모바일 MobileReserveBar**: 하단 고정 예약 버튼
5. **네이버 검색 유도**: 링크 클릭이 아닌 "검색 행위" 유도 → 검색량 증가

---

## 환경 변수

| 변수 | 용도 | 위치 |
|------|------|------|
| `GEMINI_API_KEY` | 콘텐츠 봇 API 키 | `.env.local` (로컬) / GitHub Secrets (CI) |

---

## 자주 쓰는 명령어

```bash
# 개발 서버
npm run dev

# 빌드
npm run build

# 콘텐츠 봇
python3 scripts/marketing_bot.py              # 다음 순서 1편
python3 scripts/marketing_bot.py --topic 3    # 특정 주제
python3 scripts/marketing_bot.py --all        # 전체 6편
python3 scripts/marketing_bot.py --list       # 주제 목록

# 배포
git add -A && git commit -m "메시지" && git push origin main
# → Vercel 자동 배포
```

---

## 커밋 히스토리

```
51a5d76 seo: sitemap.xml + robots.txt 추가
f89668f improve: 네이버 검색 유도 + 모바일 타이포그래피 개선
e523f63 refactor: 뉴스레터 섹션 → 채널 연결 CTA로 교체
a4d8f15 content: 아티클 썸네일 이미지 추가 (Unsplash)
c779cc6 style: UI 개선 — 카테고리별 카드 아이콘, 모바일 RESERVE 바, 히어로 구분선
3f3740c chore: 도메인 URL 업데이트 (the-grove-journal.vercel.app)
95e2919 feat: GitHub Actions 매일 자동 콘텐츠 발행 워크플로우
256b335 feat: The Grove Journal 매거진 사이트 전체 구축
04d7bb0 Initial commit from Create Next App
```

---

## 알려진 이슈 / 참고사항

- `google.generativeai` 패키지가 deprecated 경고 표시 → 동작에는 문제 없음. 향후 `google.genai`로 마이그레이션 필요
- Gemini API 키 1번(`AIzaSyCltI...ViGQ`)은 leaked 처리됨 → 사용 불가
- OG 이미지 API는 Edge Runtime 사용 → static generation 불가 경고 (정상)
- 모바일 하단 MobileReserveBar 높이(h-14)만큼 body에 스페이서 추가됨
