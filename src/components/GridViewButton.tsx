import { useLayoutEffect,useRef } from 'react';
import { gsap } from 'gsap';
import { GridViewIcon } from './GridViewIcon';
import './GridViewButton.css';

export function GridViewButton({columns,selected,onSelect}:{columns:2|4;selected:boolean;onSelect:()=>void}){
 const button=useRef<HTMLButtonElement>(null);
 useLayoutEffect(()=>{
  const root=button.current!,layers=root.querySelectorAll('.grid-icon-layer');
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  let hovered=false,focused=false;
  gsap.set(layers[0],{y:0,yPercent:0});gsap.set(layers[1],{y:0,yPercent:110,visibility:"visible"});
  const timeline=gsap.timeline({paused:true,defaults:{duration:.55,ease:'power3.inOut'}})
   .to(layers[0],{yPercent:-110},0).to(layers[1],{yPercent:0},0);
  function sync(){if(reduce.matches){timeline.pause(0,true);return;}if(hovered||focused)timeline.play();else timeline.reverse();}
  function enter(){hovered=true;sync();}function leave(){hovered=false;sync();}
  function focus(){focused=root.matches(':focus-visible');sync();}function blur(){focused=false;sync();}
  root.addEventListener('mouseenter',enter);root.addEventListener('mouseleave',leave);root.addEventListener('focus',focus);root.addEventListener('blur',blur);reduce.addEventListener('change',sync);sync();
  return()=>{timeline.kill();root.removeEventListener('mouseenter',enter);root.removeEventListener('mouseleave',leave);root.removeEventListener('focus',focus);root.removeEventListener('blur',blur);reduce.removeEventListener('change',sync);gsap.set(layers,{clearProps:'transform,visibility'});};
 },[]);
 return <button ref={button} aria-label={`${columns}열 보기`} aria-pressed={selected} onClick={onSelect}>
  <span className="grid-icon-mask" aria-hidden="true"><span className="grid-icon-layer"><GridViewIcon columns={columns}/></span><span className="grid-icon-layer grid-icon-copy"><GridViewIcon columns={columns}/></span></span>
 </button>;
}
