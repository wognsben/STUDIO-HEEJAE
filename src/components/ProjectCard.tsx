import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { YouTubeBackground } from './YouTubeBackground';
import type { Project } from '../data/projects';
export function youtubeId(url:string) {
 try { const u=new URL(url); if(u.hostname==='youtu.be') return u.pathname.split('/')[1]?.match(/^[\w-]{11}$/)?.[0];
 if(/(^|\.)youtube\.com$/.test(u.hostname)) return (u.searchParams.get('v')||u.pathname.split('/').pop()||'').match(/^[\w-]{11}$/)?.[0]; } catch { /* Invalid URL uses the supplied poster. */ }
}
export function ProjectMedia({ project:p, home=false }: {project:Project;home?:boolean}) {
 const [loaded,setLoaded]=useState(false),[failed,setFailed]=useState(false),[near,setNear]=useState(false);
 const ref=useRef<HTMLDivElement>(null), reduced=useReducedMotion();
 useEffect(()=>{const obs=new IntersectionObserver(([e])=>setNear(e.isIntersecting),{rootMargin:'250px'});if(ref.current)obs.observe(ref.current);return()=>obs.disconnect();},[]);
 const id=p.videoType==='youtube'&&p.videoUrl?youtubeId(p.videoUrl):undefined;
 return <div ref={ref} className={`project-media ${loaded?'is-loaded':''}`}>
  <img src={home?p.homeThumbnail||p.thumbnail:p.thumbnail} alt={p.title} loading="lazy" decoding="async" onLoad={()=>setLoaded(true)} onError={e=>{const img=e.currentTarget;if(id&&!img.src.includes('hqdefault')){img.src=`https://i.ytimg.com/vi/${id}/hqdefault.jpg`;}setLoaded(true);}}/>
  {!failed&&p.videoUrl&&near&&p.videoType!=='youtube'&&<video src={p.videoUrl} poster={home?p.homeThumbnail||p.thumbnail:p.thumbnail} autoPlay={!reduced} muted loop playsInline controls={!!reduced} onError={()=>setFailed(true)}/>}
  {home&&id&&<YouTubeBackground id={id} title={p.title}/>}
 </div>;
}
export function ProjectCard({project:p,variant='work'}:{project:Project;variant?:'home'|'work'}) {
 const home=variant==='home';
 const media=<><ProjectMedia project={p} home={home}/>{!home&&<div className="work-overlay"><div><p>{p.category}</p><h2>{p.title}</h2><p>{p.description}</p></div></div>}</>;
 return <article className={`project-card ${variant}-card`} style={home?{'--start':p.gridColumn,'--span':p.gridSpan} as React.CSSProperties:undefined}>
  <div className="media-wrap">{!home&&p.detailUrl?<a href={p.detailUrl} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} — YouTube에서 보기`}>{media}</a>:media}</div>
  {home?<div className="project-meta"><span className="project-type">Work</span><div className="project-copy"><h2>{p.title}</h2><p>{p.description}</p></div></div>:<h2 className="work-title">{p.title}</h2>}
 </article>;
}
