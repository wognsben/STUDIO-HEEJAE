import { useRef,useState,type PointerEvent } from 'react';
import { motion,useReducedMotion } from 'motion/react';
import type { AboutSlide } from '../../data/about';

function Arrow({direction}:{direction:'left'|'right'}){
 return <svg viewBox="0 0 28 20" aria-hidden="true"><path d={direction==='left'?'M26 10H3m6-6-6 6 6 6':'M2 10h23m-6-6 6 6-6 6'}/></svg>;
}
export function AboutCarousel({slides,label,variant}:{slides:AboutSlide[];label:string;variant:'production'|'approach'}){
 const [index,setIndex]=useState(0),reduced=useReducedMotion();
 const pointer=useRef<{x:number;y:number;id:number;type:string}|null>(null);
 const multiple=slides.length>1;
 const move=(direction:number)=>{if(multiple)setIndex(current=>(current+direction+slides.length)%slides.length);};
 function pointerDown(event:PointerEvent<HTMLDivElement>){if(!multiple||!event.isPrimary||event.button!==0)return;pointer.current={x:event.clientX,y:event.clientY,id:event.pointerId,type:event.pointerType};event.currentTarget.setPointerCapture(event.pointerId);}
 function pointerUp(event:PointerEvent<HTMLDivElement>){const start=pointer.current;pointer.current=null;if(!start||event.pointerId!==start.id)return;if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);const dx=event.clientX-start.x,dy=event.clientY-start.y;if(Math.abs(dx)>=40&&Math.abs(dx)>Math.abs(dy)){move(dx<0?1:-1);}else if(start.type==='mouse'&&Math.abs(dx)<8&&Math.abs(dy)<8){const r=event.currentTarget.getBoundingClientRect();move(event.clientX<r.left+r.width/2?-1:1);}}
 if(!slides.length)return null;
 return <section className={`about-carousel about-carousel--${variant}`} aria-roledescription="캐러셀" aria-label={label}>
  <div className="about-carousel-viewport" tabIndex={multiple?0:-1} aria-label={`${label}: 좌우 방향키로 전환`} onPointerDown={pointerDown} onPointerUp={pointerUp} onPointerCancel={()=>{pointer.current=null;}} onKeyDown={event=>{if(event.key==='ArrowLeft'){event.preventDefault();move(-1);}else if(event.key==='ArrowRight'){event.preventDefault();move(1);}}}>
   <motion.div className="about-carousel-track" initial={false} animate={{x:`${-index*100}%`}} transition={reduced?{duration:0}:{type:'spring',stiffness:170,damping:28,mass:.9}}>
    {slides.map((slide,i)=><div className="about-carousel-slide" key={slide.id} aria-hidden={i!==index}><img src={slide.image} alt={slide.alt} loading="lazy" decoding="async" draggable={false} width="1280" height="720" style={{objectPosition:slide.objectPosition||'center'}}/></div>)}
   </motion.div>
  </div>
  <div className="about-carousel-controls"><span className="about-carousel-counter" aria-live="polite" aria-atomic="true">{String(index+1).padStart(2,'0')} / {String(slides.length).padStart(2,'0')}</span><button type="button" aria-label={`${label} 이전 슬라이드`} onClick={()=>move(-1)} disabled={!multiple}><Arrow direction="left"/></button><button type="button" aria-label={`${label} 다음 슬라이드`} onClick={()=>move(1)} disabled={!multiple}><Arrow direction="right"/></button></div>
 </section>;
}
