# STUDIO HEEJAE 실제 YouTube 콘텐츠 연결

2026-10-29 · 로컬 주소 http://localhost:5173/ · 실제 프로젝트 `C:\Users\user\OneDrive\바탕 화면\새 폴더-=-\studio-heejae`

공개 YouTube oEmbed 응답에서 아래 제목·게시 채널을 확인했습니다. 사용자가 제공한 순서를 유지했으며 게시일을 기준으로 재정렬하지 않았습니다. HOME은 1~6번, WORK는 1~9번입니다.

| 순서 | 영상 제목 | 카테고리 | 썸네일 |
|---|---|---|---|
| 1 | [MEDIA ART](https://www.youtube.com/watch?v=d4-QuCs9K_w) | 미분류 | 1280×720 |
| 2 | [2023년 경기청년 사다리 프로그램](https://www.youtube.com/watch?v=cJsCqmQyiIM) | 미분류 | 1280×720 |
| 3 | [🙋2023년 경기청년 해외 취창업 기회 확충!ㅣ경기도는 여러분을 응원합니다!](https://www.youtube.com/watch?v=wCYeYW3XS84) | 미분류 | 1280×720 |
| 4 | [참여만해도 상금이 ⁉ 연진아~ 나 지금 되게 신나😎](https://www.youtube.com/watch?v=TiocdOVrAr0) | 미분류 | 1280×720 |
| 5 | [브랜딩 2편 [새로운 세상의 등장 편]](https://www.youtube.com/watch?v=dxnSapO6aRc) | 미분류 | 대체 480×360 |
| 6 | [브랜딩 1편 [당신이 몰랐던 이야기 편]](https://www.youtube.com/watch?v=_NqsdxbPCVI) | 미분류 | 1280×720 |
| 7 | [2021년 일학습병행의 새로운 캐치프레이즈 ‘모드전환 모두전환!’](https://www.youtube.com/watch?v=ba9PGJtHk3I) | 미분류 | 1280×720 |
| 8 | [별별화성이 다시 돌아왔습니다. 드루와~ 드루와~](https://www.youtube.com/watch?v=USBsy8xsakI) | 미분류 | 1280×720 |
| 9 | [[모션그래픽 홍보영상] 효원 캡너트 /#motiongraphics](https://www.youtube.com/watch?v=w9Vqp8EhhR8) | 모션그래픽 | 대체 480×360 |

9번은 원본 제목의 명시적 장르를 근거로 분류했습니다. 나머지는 기존 클라이언트 사이트의 분류가 확보되지 않았으므로 임의로 배정하지 않았습니다. 필터 항목은 추가·변경하지 않았습니다. 미분류 작업은 전체에서 표시되며, 모션그래픽 필터에는 9번만 표시됩니다. 다른 분류는 현재 결과가 비어 있습니다. 설명은 창작하지 않고 공개 게시 채널 정보를 사용했습니다. 실제 제작 역할·납품 범위까지 공개 메타데이터로 검증한 것은 아닙니다.

## 구현

- 기존 Header, 로고, HOME·WORK 그리드, 메타데이터 CSS, 노란 Hover 및 16:9 전환 아이콘을 유지했습니다. 페이지 하단의 임시 콘텐츠 문구만 LOCAL PREVIEW로 교체했습니다.
- `src/data/projects.ts`: 실제 9개 영상 데이터, 순서, 제목, 분류, 채널 설명, 로컬 썸네일, YouTube URL, 향후 교체 가능한 detailUrl.
- `src/components/YouTubeBackground.tsx`: 공용 API 스크립트 1회 로드, 화면 근처·실제 진입 조건 충족 후 플레이어 초기화, 중복 생성 방지, 화면 밖 및 숨겨진 탭에서 pauseVideo, 재진입 playVideo, 언마운트 destroy.
- `src/components/ProjectCard.tsx`: HOME만 자동재생 플레이어 사용. WORK는 정적 썸네일과 실제 유튜브 링크만 사용하며 새 탭으로 열립니다. 영상 재생 버튼은 WORK에 생성하지 않으므로 기존 Hover가 유지됩니다.
- `public/assets/{VIDEO_ID}.jpg`: 9개 공개 썸네일을 로컬 저장했습니다. 5·9번 maxres 요청 실패 후 hqdefault로 대체했고 이미지 디코딩·치수를 확인했습니다. 런타임 이미지 로딩 실패 시 원격 hqdefault를 재시도합니다.
- muted autoplay, loop=1, playlist=동일ID, playsinline=1, controls=0, origin 및 enablejsapi를 설정했습니다. API 재생 상태 1을 받은 뒤에만 iframe을 보여줍니다. 준비·재생 차단·오류·시간 초과 시 썸네일로 복귀합니다. 모션 감소 설정에서는 자동재생하지 않습니다.

구현 근거: [YouTube IFrame API 공식 문서](https://developers.google.com/youtube/iframe_api_reference). 최소 플레이어 크기 200×200px를 충족하지 않는 카드에는 iframe을 만들지 않고 썸네일을 유지합니다. 모바일 16:9 카드가 작더라도 기존 프레임을 확대하지 않습니다. 플레이어 자체의 로고·정보·광고·영상에 포함된 레터박스는 YouTube 또는 원본 영상의 동작이며 CSS로 강제 제거하지 않습니다.

## 실제 검증 결과

| 하위 문제 | 확인 결과 | 신뢰도 |
|---|---|---:|
| 제목·썸네일 | 9개 oEmbed 응답, 9개 JPG 디코딩, 브라우저 naturalWidth>0 확인 | 0.99 |
| HOME 순서·배치 | 제공 순서의 1~6번, 3:5 / 5:3 / 3:5 유지 | 0.99 |
| 실제 자동재생 | 스크롤하면서 1~6번 모두 PLAYING 이벤트·started=true 확인 | 0.97 |
| 음소거 | 1번 iframe 내부 video에서 muted=true, paused=false, currentTime 약 25.6초 확인 | 0.98 |
| 화면 밖 정지·재진입 | 상단 1·2번 playing→paused, 중간 3·4번 playing, 하단 5·6번 playing, 상단 재진입 1·2번 playing 확인 | 0.97 |
| 프레임·메타 | 6개 width/height 약 1.7778. 기존 CSS·DOM 메타 구조 유지 | 0.99 |
| WORK 순서·성능 | 지정 순서의 9개 href, 이미지 9개 정상 로드, iframe 0개 | 0.99 |
| 보기 전환·필터 | 4열 약 340px×4, 2열 약 703px×2, 모션그래픽 결과 9번 1개 확인 | 0.98 |
| 반복재생 | loop/playlist 및 종료 이벤트 재생 로직 구현. 영상 전체 종료→재시작을 실시간으로 끝까지 관찰하지는 않음 | 실증 완료에서 제외 |
| 차단 환경 | 썸네일 복귀 처리 구현. 모든 브라우저의 자동재생 차단·통신 실패를 강제로 재현하지는 않음 | 실증 완료에서 제외 |

초기 데스크톱 화면에서 iframe 2개만 생성되는 것을 확인했습니다. 부분적으로 다음 행이 보이는 뷰포트에서는 3개가 생성됐습니다. 전체를 스크롤한 뒤에는 방문한 HOME 플레이어 최대 6개를 유지하되 화면 밖은 정지합니다. WORK는 플레이어를 생성하지 않습니다. CPU·메모리 수치의 정량 프로파일링은 수행하지 않았습니다.

콘텐츠 30%, 재생·정지 35%, 레이아웃 20%, WORK 상호작용 15%로 가중한 검증 범위 신뢰도는 약 0.98입니다. 루프 전체 사이클과 모든 차단 환경은 이 수치에서 제외했습니다. 카테고리의 불확실성을 실제 분류로 포장하지 않고 미분류로 남겼습니다.

TypeScript 및 Vite 프로덕션 빌드를 통과했습니다. 브라우저 외부 네트워크 속도·자동재생 정책·영상 소유자의 임베드 설정 변경에 따라 이후 동작이 달라질 수 있습니다. 로컬 서버는 백그라운드로 계속 실행합니다.
