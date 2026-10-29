# STUDIO HEEJAE

스튜디오 희재 포트폴리오 웹사이트. 2026-10-29 작업 내용을 보관한 저장소입니다.

React · TypeScript · Vite · React Router · Motion · GSAP/SplitText

## 실행

```sh
npm run dev -- --port 5173
```

- HOME: http://localhost:5173/
- WORK: http://localhost:5173/work
- 빌드: `npm run build`
- 빌드 미리보기: `npm run preview -- --port 4173`

요청에 따라 **node_modules와 dist도 포함**했습니다. 포함된 의존성은 작업 당시 Windows x64 환경 기준입니다. 다른 OS·환경에서 실행하거나 의존성을 다시 설치하려면 Node.js 22를 준비하고 아래 명령을 실행하세요.

```sh
npm ci
npm run dev -- --port 5173
```

## 현재 구현

- HOME: 3:5 / 5:3 / 3:5 비대칭 8컬럼, 모든 미디어16:9, 실제 YouTube 1~6번.
- WORK: 실제 YouTube9개, 카테고리 필터, 2열·4열 보기, 레몬 옐로 카드 Hover.
- 보기 버튼: 솔리드16:9 프레임, 선택 검정/비선택 회색, 투명 배경, GSAP Vertical Reveal.
- 공통 헤더: HTML 세리프 텍스트 로고, GSAP SplitText 다중 레이어3D 플립, 검색, 전체 화면 메뉴.
- 전체 화면 메뉴: 단일 로고 유지, 현재 경로 밑줄 및 aria-current, 배경 inert·포커스 처리.
- 공통 Footer: 대형 워드마크 중앙 정렬, 동일 너비3컬럼, 검정 텍스트, #F3F3F3 배경, 전화·메일 링크, BACK TO TOP.
- 로딩바: 최상단 검정4px, 표시 생략 없음, 실제 라우팅과 WORK 카테고리 클릭에 연결.
- PC·태블릿·모바일 대응 및 prefers-reduced-motion 처리.

ABOUT / CONTACT / 서비스 / 프로젝트 상세페이지는 아직 구현하지 않았습니다. 준비 중 메뉴는 비활성 상태입니다. WORK는 각 YouTube 영상으로 연결됩니다. 영상분류 근거가 없는 작업은 미분류로 두었고, 제목에 장르가 명시된9번만 모션그래픽으로 지정했습니다.

## 콘텐츠·디자인 수정

- 프로젝트·순서·제목·채널·분류·영상 URL: `src/data/projects.ts`
- HOME 영상 재생: `src/components/YouTubeBackground.tsx`
- 공통 카드: `src/components/ProjectCard.tsx`
- 헤더·전체 화면 메뉴: `src/components/Header.tsx`
- 3D 로고: `src/components/AnimatedLogo.tsx` / `.css`
- Footer: `src/components/Footer.tsx` / `.css`
- Footer 워드마크: `src/components/FooterWordmark.tsx`
- 보기 전환: `src/components/GridViewButton.tsx`, `GridViewIcon.tsx`
- 로딩바: `src/components/PageLoadingProgressBar.tsx`, `PageProgressContext.tsx`
- 라우터·공통 페이지 구성: `src/main.tsx`
- 색상·간격: `src/styles/tokens.css`, `global.css`

브랜드 포인트 `--color-yellow: #ECEA6B`. 흰 배경 위 작은 Work 텍스트는 대비를 보정한 `--color-yellow-text: #747222`를 사용합니다. 로고 플립은 글자별1.1초, stagger .07초입니다.

실제 YouTube 영상은 썸네일 우선 로드, 화면 진입 후 플레이어 초기화, 음소거 재생, 화면 밖 정지·재진입 재생을 사용합니다. 자동재생·임베드 정책 및 적응형 화질은 YouTube와 브라우저에 영향을 받습니다. 화질 강제 지정이나 로고·광고 강제 제거는 하지 않았습니다. 상세 진단은 검증 보고서를 참고하세요.

## 오늘 작업 기록

- `docs/reports/`: 초기 구현부터 최종 메뉴 수정까지의 검증·진단 보고서
- `docs/screenshots/`: 실제 브라우저 검증 캡처
- `docs/references/`: 제공받은 HOME / WORK / Footer 시안
- `docs/briefs/`: 초기 작업 지시서와 BUCK 소스 분석 가이드
- `public/assets/`: 원본 로고 보존본, YouTube 썸네일, 초기 시안 검토용 이미지

보고서는 당시 변경 단계의 기록입니다. 현재 동작은 이 README와 최신 소스를 기준으로 확인하세요. 초기 보고서에 있는2px 로딩바, 이전 로고 속도·아이콘 형태 등은 이후 수정됐습니다. 로컬 파일 경로 링크는 원래 작업 PC 기준이며, GitHub에서는 문서·스크린샷 폴더에서 직접 확인할 수 있습니다.

빌드는 통과했으며 Vite의 메인 번들500KB 권고 경고가 남아 있습니다. 모션 감소 설정의 실제 전환과 모든 실물 기기는 검증하지 않았고, 보고서에서 구현·실측·미검증 범위를 구분했습니다.

이번 업로드는 GitHub 소스 보관이며, 외부 웹 호스팅 배포는 포함하지 않습니다.
