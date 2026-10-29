# WORK Vertical Reveal / Footer 검정 텍스트

2026-10-29 · 로컬 서버에 적용했습니다.

- [제공 Codrops](https://tympanus.net/codrops/?p=81174)를 확인하고 overflow:hidden 및 GSAP yPercent 세로 이동 원리만 적용했습니다. 스크롤 로직은 가져오지 않았습니다.
- `GridViewButton.tsx`·`GridViewButton.css`를 추가했습니다. 각 버튼에 동일 SVG 아이콘 2개를 겹치고 기본 0→-110%, 복제 110→0%를 동시에 .55초 power3.inOut으로 이동합니다. 이탈 시 같은 timeline을 reverse합니다.
- 버튼당 timeline 하나를 useLayoutEffect에서 만들고 play/reverse로 재사용합니다. 클릭·선택 변경으로 재생을 초기화하지 않습니다. 언마운트 시 timeline·리스너·GSAP 스타일을 정리합니다.
- 마우스 Hover 및 키보드 focus-visible에서 동작합니다. 마우스 클릭으로 생긴 포커스는 Hover 이탈 복귀를 방해하지 않습니다. prefers-reduced-motion에서는 timeline을 초기 상태로 멈춥니다.
- 기존 GSAP만 사용하며 SplitType, ScrollTrigger, Lenis는 추가하지 않았습니다.
- 버튼은 텍스트 없이 기존 솔리드 16:9 모양·투명 배경·선택 #111111 / 비선택 #AAAAAA를 유지합니다. aria-label, aria-pressed, 1px focus-visible 검정 외곽선도 유지합니다.
- Footer.css의 회색 글자 선언만 #000000으로 변경했습니다. 배경 #F3F3F3, 구분선·워드마크·폰트 크기·굵기·정보·여백·반응형은 유지했습니다. 준비 중 메뉴 3개는 disabled 상태입니다.

## 브라우저 확인

- 버튼별 레이어2개, 마스크 overflow:hidden 확인.
- Hover/클릭 직후 translateY가 변화하고 기존 아이콘 약-110% / 복제 약0%로 이동하는 것을 확인했습니다. 버튼 크기는 기존 약45.73×41.92px로 유지됐습니다.
- Hover 이탈 후 정확히 기본0% / 복제110%로 복귀했습니다.
- Hover 도중2열 클릭 후 aria-pressed=true 및 실제2컬럼 확인. 4열 클릭 후 실제4컬럼도 확인했습니다.
- Shift+Tab으로2열 버튼에 키보드 포커스 진입 후 동일 이동 확인. Enter 선택 후2컬럼으로 정상 전환했습니다. 1px 검정 포커스 외곽선도 확인했습니다.
- Footer의 섹션 제목·링크·버튼·주소·저작권·준비 중·워드마크의 computed color를 전부 검사해 rgb(0,0,0) 한 값만 확인했습니다. 배경 rgb(243,243,243), disabled 메뉴3개 확인.
- TypeScript/Vite 빌드 성공. 모션 감소 실제 설정 전환은 브라우저 도구가 지원하지 않아 코드 경로 검토에 한정했습니다.

변경 파일은 GridViewButton.tsx/CSS(신규), WorkPage.tsx(버튼 연결), Footer.css(색상) 및 빌드 결과입니다. HOME·Header·Footer 구조·WORK 프로젝트 그리드 CSS·카테고리 필터·영상은 수정하지 않았습니다.

동작 확인 신뢰도 .97, 선택·접근성 .98, 색상·범위 .99. 가중40/30/30% 기준 약.98이며, 모션 감소 실제환경 전환과 모든 실물 기기는 검증 범위에서 제외합니다.
