export type AboutSlide={id:string;image:string;alt:string;objectPosition?:string};
// Independent review assets. Replace these paths when actual ABOUT photographs arrive.
export const productionSlides:AboutSlide[]=[
 {id:'production-1',image:'/assets/about%20what%20we%20do.png',alt:'What we do 촬영 스튜디오 이미지'},
 {id:'production-2',image:'/assets/USBsy8xsakI.jpg',alt:'별별화성이 다시 돌아왔습니다 — 작업 썸네일'},
 {id:'production-3',image:'/assets/TiocdOVrAr0.jpg',alt:'참여만해도 상금이 — 작업 썸네일'},
 {id:'production-4',image:'/assets/cJsCqmQyiIM.jpg',alt:'2023년 경기청년 사다리 프로그램 — 작업 썸네일'},
];
export const approachSlides:AboutSlide[]=[
 {id:'approach-1',image:'/assets/about%20approach.png',alt:'Our approach 비주얼 이미지'},
 {id:'approach-2',image:'/assets/wCYeYW3XS84.jpg',alt:'2023년 경기청년 해외 취창업 기회 확충 — 작업 썸네일'},
 {id:'approach-3',image:'/assets/ba9PGJtHk3I.jpg',alt:'모드전환 모두전환 — 작업 썸네일'},
 {id:'approach-4',image:'/assets/dxnSapO6aRc.jpg',alt:'브랜딩 2편 [새로운 세상의 등장 편] — 작업 썸네일'},
];
// Local original logos; duplicate What we do photograph is excluded.
const logoFiles=['dpr.png','jeleve.png','jinro.png','kakao.png','kb국민은행.png','l;g.png','동덕여대.png','식품의약처.png','아디다스.png','한화생명금융.png'];
export const clientLogos=logoFiles.map(file=>({file,src:`/assets/about%20logos/${encodeURIComponent(file).replace(/%3B/g,';')}`,alt:`${file.replace(/\.png$/,'')} 로고`}));
