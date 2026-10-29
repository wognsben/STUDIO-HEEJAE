import { useLogoAnimation } from '../components/LogoAnimationContext';
import { usePageProgress } from '../components/PageProgressContext';
import { GridViewButton } from '../components/GridViewButton';
import { useEffect,useRef,useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categories,projects,type Category } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
function saved<T>(key:string,fallback:T):T{try{return JSON.parse(sessionStorage.getItem(key)||'null')??fallback;}catch{return fallback;}}
export function WorkPage(){const notifyProgress=usePageProgress();const {request:requestLogo}=useLogoAnimation();const [params,setParams]=useSearchParams();const [category,setCategory]=useState<Category>('전체'),[cols,setCols]=useState<2|4>(()=>saved<number>('heejae-columns',4)===2?2:4);
 const previousCategory=useRef(category);useEffect(()=>{if(previousCategory.current!==category){previousCategory.current=category;requestLogo();}},[category,requestLogo]);
 const query=params.get('q')||'';useEffect(()=>{if(query){setCategory('전체');sessionStorage.setItem('heejae-category',JSON.stringify('전체'));}},[query]);const filtered=projects.filter(p=>p.workVisible!==false&&(category==='전체'||p.category===category)&&`${p.title} ${p.category}`.toLowerCase().includes(query.toLowerCase()));
 function filter(c:Category){notifyProgress();setCategory(c);sessionStorage.setItem('heejae-category',JSON.stringify(c));}
 function columns(c:2|4){setCols(c);sessionStorage.setItem('heejae-columns',JSON.stringify(c));}
 return <main className="work-page page-padding"><div className="work-controls"><div className="work-filter" aria-label="프로젝트 카테고리">{categories.map(c=><button key={c} aria-pressed={category===c} className={category===c?'selected':''} onClick={()=>filter(c)}>{c}</button>)}</div><div className="grid-toggle" aria-label="그리드 보기"><GridViewButton columns={2} selected={cols===2} onSelect={()=>columns(2)}/><GridViewButton columns={4} selected={cols===4} onSelect={()=>columns(4)}/></div></div>
 {query&&<div className="query-status">“{query}” 검색 결과 <button onClick={()=>setParams({})}>검색 해제 ×</button></div>}
 <div className={`work-grid columns-${cols}`} aria-live="polite">{filtered.map(p=><ProjectCard key={p.id} project={p}/>)}</div>{!filtered.length&&<p className="empty-state">조건에 맞는 프로젝트가 없습니다.</p>}</main>;
}
