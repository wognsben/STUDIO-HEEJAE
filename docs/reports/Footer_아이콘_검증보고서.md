# 공통 Footer 및 WORK 아이콘

2026-10-29 · 로컬 사이트 http://localhost:5173/ 에 반영.

- Footer 배경 #F3F3F3, 대형 세리프 HTML 워드마크, 가는 구분선, COMPANY / WORK / GET IN TOUCH 3영역, 저작권 및 BACK TO TOP.
- 워드마크는 `FooterWordmark.tsx`로 분리. S 모핑 및 별도 애니메이션 없음.
- App의 라우트 밖에서 `Footer.tsx`를 한 번 렌더하므로 HOME·WORK 및 앞으로 추가할 라우트에 공통 적용됩니다.
- Portfolio·Projects는 /work 연결. COMPANY의 미구현 페이지는 준비 중 표시·비활성화했으며 가짜 페이지를 생성하지 않았습니다.
- 전화 tel:01064064660, 이메일 mailto:ceo@doproject-lab.com, 지정 부산 주소 적용. 전화·이메일 앱을 실제 실행하지 않고 href 값을 확인했습니다.
- BACK TO TOP은 smooth scroll, 모션 감소 설정에서는 즉시 이동합니다.
- PC 3열, 태블릿은 연락처 너비 확대, 모바일은 COMPANY·WORK 2열 및 연락처 전체 폭으로 정리했습니다.
- 보기 전환 아이콘은 검정 솔리드 프레임 2개/4개만 표시합니다. 프레임의 width/height=16/9를 실측했습니다. 2열·4열 텍스트와 선택 회색 #ebebeb 유지. 노란 버튼 효과 없음. 기존 카드 Hover는 변경하지 않았습니다.

## 브라우저 검증

| 항목 | 결과 | 신뢰도 |
|---|---|---:|
| Footer 배경·내용·링크 | RGB 243/243/243 및 지정 텍스트·href 확인 | 0.99 |
| PC 렌더 | 시안 구조에 맞는 대형 워드마크·3열·구분선·하단 영역 확인 | 0.97 |
| 태블릿 768px | Footer 3열, 문서 가로 넘침 없음 | 0.98 |
| 모바일 390px | 2열+전체폭 연락처, 워드마크·버튼 정상 표시, 가로 넘침 없음 | 0.98 |
| BACK TO TOP | 실제 클릭 후 scrollY=0 확인 | 0.99 |
| 아이콘 | rect 2개/4개, 모든 width/height 1.7777778 확인 | 0.99 |

시안은 비율·배치의 기준으로 사용했습니다. 시스템 세리프 폰트에 따라 글자 세부 형태는 달라질 수 있습니다. 미구현 COMPANY의 준비 중 표시는 시안 대비 의도적인 차이입니다. 모든 실물 기기 검증은 아니며 브라우저 뷰포트 기준입니다.

시각 구성 30%, 기능·링크 30%, 반응형 25%, 아이콘 15% 가중 시 검증 범위 신뢰도 약 0.98입니다. 기존 HOME/WORK 그리드·영상 컴포넌트·Header 애니메이션은 수정하지 않았습니다.

신규 파일: Footer.tsx, Footer.css, FooterWordmark.tsx. 변경 파일: main.tsx(공통 Footer 연결), GridViewIcon.tsx(프레임 단순화). TypeScript 및 Vite 빌드 성공.
