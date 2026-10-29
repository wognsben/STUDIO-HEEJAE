# STUDIO HEEJAE — 로컬 시안

HOME `/` 및 WORK `/work`만 구현한 React + TypeScript + Vite 프로젝트입니다. 외부 배포와 GitHub 연동은 하지 않았습니다.

## 실행

```powershell
cd 'C:\Users\user\OneDrive\바탕 화면\새 폴더-=-\studio-heejae'
npm run dev -- --port 5173
```

주소: http://127.0.0.1:5173/ · WORK: http://127.0.0.1:5173/work

이미 5173 포트가 사용 중이면 Vite가 출력한 다음 포트를 사용하세요. `npm run build`는 TypeScript 검사와 프로덕션 빌드를 수행합니다. `npm run preview -- --port 4173`으로 빌드 결과를 확인할 수 있습니다. 의존성이 없을 때만 `npm ci`를 실행하세요.

## 파일 구성

- `src/components/Header.tsx`: 공통 원본 로고, 메뉴, 검색
- `src/components/ProjectCard.tsx`: 공통 카드, HOME/WORK variant, 이미지·영상 처리
- `src/pages/HomePage.tsx`: HOME 비대칭 8컬럼과 점진 표시
- `src/pages/WorkPage.tsx`: WORK 필터, 2열·4열 전환, 세션 상태 유지
- `src/data/projects.ts`: 프로젝트·카테고리·소개 문구
- `src/styles/tokens.css`: 색상, rem 간격, 브레이크포인트
- `src/styles/global.css`: 공통 및 페이지 스타일
- `src/main.tsx`: 라우팅, 페이지 진입·이탈, 모션 감소 대응
- `vite.config.ts`, `tsconfig.json`, `package.json`, `package-lock.json`, `index.html`, `.gitignore`: 환경 설정
- `public/assets/`: 원본 로고 복사본, 레퍼런스에서 추출한 임시 WebP
- `dist/`: 최종 빌드 결과

## 실제 이미지·영상 교체

1. `public/assets/`에 사용 가능한 실제 작업물을 추가합니다.
2. `src/data/projects.ts`의 `thumbnail`(WORK), `homeThumbnail`(HOME), 제목·설명·카테고리를 수정합니다.
3. `featured`, `homeOrder`, `gridColumn`, `gridSpan`으로 HOME 표시 순서와 8컬럼 배치를 지정합니다. `workVisible: false`는 HOME 전용 프로젝트입니다.
4. YouTube는 `videoType: 'youtube'`, `videoUrl: 'https://www.youtube.com/watch?v=실제ID'`로 지정합니다. 썸네일 위 재생 버튼을 눌렀을 때만 iframe을 생성합니다. URL은 youtube.com/watch, youtube.com/embed, youtube.com/shorts 및 youtu.be 형식을 처리합니다.
5. 자체 영상은 `videoType: 'mp4'` 또는 `'webm'`, `videoUrl: '/assets/실제파일.mp4'`로 지정합니다. 화면 근처에서 muted·loop·playsInline으로 재생하고 실패 시 포스터를 유지합니다. 모션 감소 설정에서는 자동재생을 하지 않습니다.
6. 실제 상세페이지가 준비된 경우만 `detailUrl`을 넣습니다. 현재 데모 카드에는 가짜 상세 링크를 넣지 않았습니다.

영상 프레임은 모두 16:9입니다. YouTube의 자동재생·네트워크 실패 신호는 브라우저와 플레이어 정책에 영향을 받습니다. 실제 영상 URL을 받은 후 재생 검증이 필요합니다.

`studio.introduction`은 임시 소개 문구입니다. `--color-yellow`는 임시 #f5c400 토큰입니다. 이미지 원본은 레퍼런스 전체에서 추출한 낮은 해상도의 시안 자산이므로 공개용으로 교체해야 합니다. 로고는 제공 PNG를 비율 유지하여 사용했습니다.
