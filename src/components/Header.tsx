import { AnimatedLogo } from './AnimatedLogo';
import { useEffect, useRef, useState } from 'react';
import { Link,useLocation } from 'react-router-dom';
import { AnimatePresence,motion,useReducedMotion } from 'motion/react';
import { projects } from '../data/projects';
export function Header(){
 const [panel,setPanel]=useState<'search'|'menu'|null>(null),[query,setQuery]=useState(''),[panelVisible,setPanelVisible]=useState(false);
 const location=useLocation(),path=location.pathname.replace(/\/+$/,'')||'/';
 const active=path==='/'?'home':path==='/work'||path.startsWith('/work/')?'work':path==='/about'?'about':path==='/contact'?'contact':null;
 const reduced=useReducedMotion(),dialog=useRef<HTMLDivElement>(null),opener=useRef<HTMLButtonElement|null>(null),header=useRef<HTMLElement>(null);
 useEffect(()=>{setPanel(null);},[location.pathname]);
 useEffect(()=>{if(!panelVisible){opener.current?.focus();return;}const nodes=[document.getElementById('content'),document.querySelector<HTMLElement>('.site-footer')].filter((el):el is HTMLElement=>!!el);const previous=nodes.map(el=>el.inert);nodes.forEach(el=>{el.inert=true;});return()=>nodes.forEach((el,i)=>{el.inert=previous[i];});},[panelVisible]);
 useEffect(()=>{if(!panel)return; const prev=document.body.style.overflow;document.body.style.overflow='hidden';
 const el=dialog.current;el?.querySelector<HTMLElement>('input,button,a')?.focus();
 const key=(e:KeyboardEvent)=>{if(e.key==='Escape')setPanel(null);if(e.key==='Tab'&&el){const logo=header.current?.querySelector<HTMLElement>('.animated-logo');const all=[...(logo?[logo]:[]),...Array.from(el.querySelectorAll<HTMLElement>('button:not(:disabled),a,input'))];const current=all.indexOf(document.activeElement as HTMLElement);e.preventDefault();all[(current+(e.shiftKey?-1:1)+all.length)%all.length]?.focus();}};
 document.addEventListener('keydown',key);return()=>{document.body.style.overflow=prev;document.removeEventListener('keydown',key);};},[panel]);
 function open(p:'search'|'menu',e:React.MouseEvent<HTMLButtonElement>){opener.current=e.currentTarget;setPanelVisible(true);setPanel(p);}
 return <><motion.header ref={header} className={`site-header${panelVisible?' has-panel':''}`} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:reduced?0:.5,delay:reduced?0:.1}}>
 <AnimatedLogo onNavigate={()=>setPanel(null)}/>
 <nav aria-label="주요 메뉴" inert={panelVisible} aria-hidden={panelVisible||undefined}><Link to="/work">WORK</Link><Link to="/about" aria-current={active==="about"?"page":undefined}>ABOUT</Link><button disabled title="준비 중">CONTACT</button></nav>
 <div className="header-actions" inert={panelVisible} aria-hidden={panelVisible||undefined}><button className="icon-button search-icon" aria-label="프로젝트 검색" onClick={e=>open('search',e)}><svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="13" cy="13" r="9"/><path d="m20 20 8 8"/></svg></button><button className="icon-button" aria-label="메뉴 열기" onClick={e=>open('menu',e)}><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M2 7h28M2 16h28M2 25h28"/></svg></button></div>
 </motion.header><AnimatePresence onExitComplete={()=>setPanelVisible(false)}>{panel&&<motion.div ref={dialog} className={`panel panel--${panel}`} role="dialog" aria-modal="true" aria-owns="site-logo" aria-label={panel==='search'?'프로젝트 검색':'전체 메뉴'} initial={{y:reduced?0:'100%',opacity:0}} animate={{y:0,opacity:1}} exit={{y:reduced?0:'100%',opacity:0}} transition={{duration:reduced?0:.4,ease:'easeOut'}}>
 <button className="panel-close icon-button" aria-label="닫기" onClick={()=>setPanel(null)}>×</button>
 {panel==='menu'?<nav className="menu-links" aria-label="전체 메뉴 탐색"><Link to="/" aria-current={active==="home"?"page":undefined} onClick={()=>setPanel(null)}>HOME</Link><Link to="/work" aria-current={active==="work"?"page":undefined} onClick={()=>setPanel(null)}>WORK</Link><Link to="/about" aria-current={active==="about"?"page":undefined} onClick={()=>setPanel(null)}>ABOUT</Link><span aria-disabled="true"><span aria-current={active==="contact"?"page":undefined}>CONTACT</span> <small>준비 중</small></span><button onClick={()=>setPanel('search')}>SEARCH</button></nav>:<div className="search-content"><label htmlFor="search">프로젝트 검색</label><input id="search" type="search" placeholder="프로젝트명 또는 카테고리" value={query} onChange={e=>setQuery(e.target.value)}/><div className="search-results" aria-live="polite">{query.trim()&&(projects.filter(p=>p.workVisible!==false&&`${p.title} ${p.category}`.toLowerCase().includes(query.trim().toLowerCase())).map(p=><Link key={p.id} to={`/work?q=${encodeURIComponent(query.trim())}`} onClick={()=>setPanel(null)}>{p.title}<small>{p.category}</small></Link>))}{query.trim()&&!projects.some(p=>p.workVisible!==false&&`${p.title} ${p.category}`.toLowerCase().includes(query.trim().toLowerCase()))&&<p>검색 결과가 없습니다.</p>}</div></div>}
 </motion.div>}</AnimatePresence></>;
}
