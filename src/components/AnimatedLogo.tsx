import { useLayoutEffect,useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useLogoAnimation } from './LogoAnimationContext';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import './AnimatedLogo.css';

gsap.registerPlugin(SplitText);
const TEXT='STUDIO HEEJAE';

export function AnimatedLogo({onNavigate}:{onNavigate?:()=>void}){
 const link=useRef<HTMLAnchorElement>(null),fit=useRef<HTMLSpanElement>(null);
 const {pathname}=useLocation(),{revision}=useLogoAnimation();
 const automaticPlay=useRef<()=>void>(()=>{}),previousEvent=useRef({pathname,revision});

 useLayoutEffect(()=>{
  const root=link.current!,content=fit.current!;
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  const layers=Array.from(content.querySelectorAll<HTMLElement>('.logo-layer'));
  let splits:SplitText[]=[],timeline:gsap.core.Timeline|undefined;
  let depth=0,hovering=false,focused=false,engaged=false,automaticRunning=false;
  function rest(){
   automaticRunning=false;
   timeline?.pause(0,true);
   if(splits.length){splits.forEach((s,i)=>gsap.set(s.chars,{rotationX:0,transformOrigin:`50% 50% ${-depth}px`}));}
   gsap.set(layers,{visibility:(i)=>i===3?'visible':'hidden'});
   root.dataset.animation='idle';
  }
  function size(){
   rest();
   content.style.transform='none';
   const natural=content.getBoundingClientRect().width;
   const scale=natural?root.clientWidth/natural:1;
   content.style.transform=`scaleX(${scale})`;
   depth=Math.min(root.clientHeight*.30,14);
   rest();
  }
  function setup(){
   timeline?.kill();splits.forEach(s=>s.revert());splits=[];
   if(!media.matches){
    splits=layers.map(el=>SplitText.create(el,{type:'chars',tag:'span',charsClass:'logo-char',aria:'none'}));
    timeline=gsap.timeline({paused:true,onComplete:rest});
    splits.forEach((s,i)=>timeline!.fromTo(s.chars,{rotationX:-90},{rotationX:i===3?0:90,duration:1.1,stagger:.07,ease:i===3?'power1.out':'none',immediateRender:false},i*.55));
   }
   size();
  }
  function begin(automatic=false){if(media.matches)return;if(!automatic){if(engaged)return;engaged=true;if(automaticRunning||root.dataset.animation==='running'||timeline?.isActive())return;}automaticRunning=automatic;timeline?.pause(0,true);splits.forEach(s=>gsap.set(s.chars,{rotationX:-90}));gsap.set(layers,{visibility:'visible'});root.dataset.animation='running';root.dataset.trigger=automatic?'automatic':'interaction';root.dataset.runs=String(Number(root.dataset.runs||0)+1);timeline?.restart();}
  function enter(){hovering=true;engaged=false;begin();}
  function leave(){hovering=false;engaged=focused;}
  function focus(){focused=true;begin();}
  function blur(){focused=false;engaged=hovering;}
  automaticPlay.current=()=>begin(true);

  root.addEventListener('mouseenter',enter);root.addEventListener('mouseleave',leave);
  root.addEventListener('focus',focus);root.addEventListener('blur',blur);
  setup();const observer=new ResizeObserver(size);observer.observe(root);
  media.addEventListener('change',setup);
  return()=>{automaticPlay.current=()=>{};observer.disconnect();media.removeEventListener('change',setup);root.removeEventListener('mouseenter',enter);root.removeEventListener('mouseleave',leave);root.removeEventListener('focus',focus);root.removeEventListener('blur',blur);timeline?.kill();splits.forEach(s=>s.revert());gsap.set(layers,{clearProps:'all'});content.style.transform='';};
 },[]);
 useLayoutEffect(()=>{const previous=previousEvent.current;previousEvent.current={pathname,revision};if(previous.pathname!==pathname||previous.revision!==revision)automaticPlay.current();},[pathname,revision]);
 return <Link ref={link} id="site-logo" className="logo animated-logo" to="/" aria-label="STUDIO HEEJAE 홈" onClick={onNavigate}>
  <span className="logo-stage" aria-hidden="true"><span ref={fit} className="logo-fit">
   {[0,1,2,3].map(i=><span key={i} className="logo-layer">{TEXT}</span>)}
  </span></span>
 </Link>;
}
