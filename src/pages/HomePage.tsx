import { useEffect,useRef,useState } from 'react';
import { projects,studio } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
export function HomePage(){const items=projects.filter(p=>p.featured).sort((a,b)=>a.homeOrder!-b.homeOrder!);const [count,setCount]=useState(4),sentinel=useRef<HTMLDivElement>(null);
 useEffect(()=>{const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setCount(n=>n+4);},{threshold:.25,rootMargin:'1000px'});if(sentinel.current)obs.observe(sentinel.current);return()=>obs.disconnect();},[count]);
 return <main className="home-page page-padding"><p className="home-introduction">{studio.introduction}</p><div className="grid-8 home-feed">{items.slice(0,count).map(p=><ProjectCard key={p.id} project={p} variant="home"/>)}</div>{count<items.length&&<div ref={sentinel} className="sentinel" aria-hidden="true"/>}</main>;
}
