export const categories = ['전체', '홍보영상', '모션그래픽', '강연/인터뷰/스케치', '광고/바이럴'] as const;
export type Category = typeof categories[number];
export type Project = {
 id:string; slug:string; title:string; category:Category|'미분류'; description:string;
 thumbnail:string; homeThumbnail?:string; videoUrl?:string; videoType?:'youtube'|'mp4'|'webm';
 featured:boolean; workVisible?:boolean; homeOrder?:number; gridColumn?:number; gridSpan?:number; detailUrl?:string;
};
export const studio = { introduction: '영상과 디자인으로 사람과 브랜드의 이야기를 전합니다.', demo: false };
const records =[
  {
    "id": "d4-QuCs9K_w",
    "title": "MEDIA ART",
    "author": "DO PROJECT",
    "thumbnail": "https://i.ytimg.com/vi/d4-QuCs9K_w/hqdefault.jpg"
  },
  {
    "id": "cJsCqmQyiIM",
    "title": "2023년 경기청년 사다리 프로그램",
    "author": "경기도일자리재단",
    "thumbnail": "https://i.ytimg.com/vi/cJsCqmQyiIM/hqdefault.jpg"
  },
  {
    "id": "wCYeYW3XS84",
    "title": "🙋2023년 경기청년 해외 취창업 기회 확충!ㅣ경기도는 여러분을 응원합니다!",
    "author": "경기도경제과학진흥원GBSA",
    "thumbnail": "https://i.ytimg.com/vi/wCYeYW3XS84/hqdefault.jpg"
  },
  {
    "id": "TiocdOVrAr0",
    "title": "참여만해도 상금이 ⁉ 연진아~ 나 지금 되게 신나😎",
    "author": "화성특례시 · 화성온TV",
    "thumbnail": "https://i.ytimg.com/vi/TiocdOVrAr0/hqdefault.jpg"
  },
  {
    "id": "dxnSapO6aRc",
    "title": "브랜딩 2편 [새로운 세상의 등장 편]",
    "author": "한국예탁결제원",
    "thumbnail": "https://i.ytimg.com/vi/dxnSapO6aRc/hqdefault.jpg"
  },
  {
    "id": "_NqsdxbPCVI",
    "title": "브랜딩 1편 [당신이 몰랐던 이야기 편]",
    "author": "한국예탁결제원",
    "thumbnail": "https://i.ytimg.com/vi/_NqsdxbPCVI/hqdefault.jpg"
  },
  {
    "id": "ba9PGJtHk3I",
    "title": "2021년 일학습병행의 새로운 캐치프레이즈 ‘모드전환 모두전환!’",
    "author": "일학습병행",
    "thumbnail": "https://i.ytimg.com/vi/ba9PGJtHk3I/hqdefault.jpg"
  },
  {
    "id": "USBsy8xsakI",
    "title": "별별화성이 다시 돌아왔습니다. 드루와~ 드루와~",
    "author": "화성특례시 · 화성온TV",
    "thumbnail": "https://i.ytimg.com/vi/USBsy8xsakI/hqdefault.jpg"
  },
  {
    "id": "w9Vqp8EhhR8",
    "title": "[모션그래픽 홍보영상] 효원 캡너트 /#motiongraphics",
    "author": "DO PROJECT",
    "thumbnail": "https://i.ytimg.com/vi/w9Vqp8EhhR8/hqdefault.jpg"
  }
];
const layout = [[1,3],[4,5],[1,5],[6,3],[1,3],[4,5]];
export const projects:Project[] = records.map((record,i)=>({
 id:record.id,slug:record.id,title:record.title,category:i===8?'모션그래픽':'미분류',
 description:`공개 채널: ${record.author}`,thumbnail:`/assets/${record.id}.jpg`,
 videoType:'youtube',videoUrl:`https://www.youtube.com/watch?v=${record.id}`,
 detailUrl:`https://www.youtube.com/watch?v=${record.id}`,
 featured:i<6,workVisible:true,homeOrder:i<6?i+1:undefined,
 gridColumn:layout[i]?.[0],gridSpan:layout[i]?.[1],
}));
