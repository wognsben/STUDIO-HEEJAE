import { useLayoutEffect,useRef } from 'react';
import { useLocation,useNavigation } from 'react-router-dom';
import { useReducedMotion } from 'motion/react';
import { gsap } from 'gsap';
import './PageLoadingProgressBar.css';

export function PageLoadingProgressBar({pagePending,activity=0}:{pagePending:boolean;activity?:number}){
 const navigation=useNavigation(),location=useLocation(),reduced=useReducedMotion();
 const bar=useRef<HTMLDivElement>(null),shown=useRef(false);
 const routeKey=location.pathname+location.search;
 const previousRoute=useRef(routeKey),previousActivity=useRef(activity);
 const destination=navigation.location;
 const routePending=navigation.state!=='idle'&&!!destination&&
  (destination.pathname!==location.pathname||destination.search!==location.search);
 const pending=routePending||pagePending;
 useLayoutEffect(()=>{
  const node=bar.current!;
  const localAction=previousActivity.current!==activity;
  const changed=localAction||previousRoute.current!==routeKey;
  previousActivity.current=activity;previousRoute.current=routeKey;
  let timer:ReturnType<typeof setTimeout>|undefined;
  let animation:gsap.core.Tween|gsap.core.Timeline|undefined;
  function show(){shown.current=true;gsap.set(node,{visibility:'visible',opacity:1,width:reduced?'24%':'32%',xPercent:0});}
  if(pending){
   show();node.dataset.state='loading';
   if(!reduced)animation=gsap.to(node,{xPercent:320,duration:1.3,ease:'none',repeat:-1});
  }else if(shown.current||changed){
   // Even a same-commit filter update or instant route commit is presented.
   // This only animates the indicator; the content is already free to render.
   if(!shown.current||localAction)show();
   node.dataset.state='completing';
   const finish=()=>{clearTimeout(timer);shown.current=false;node.dataset.state='idle';};
   animation=gsap.timeline({onComplete:finish})
    .to(node,{width:'100%',xPercent:0,opacity:1,duration:reduced?0:.22,ease:'power2.out'})
    .to(node,{opacity:0,duration:reduced?0:.26,delay:reduced?.16:.10})
    .set(node,{visibility:'hidden'});
   timer=setTimeout(()=>{
    animation?.kill();gsap.set(node,{width:'100%',xPercent:0,opacity:0,visibility:'hidden'});finish();
   },900);
  }else{
   node.dataset.state='idle';gsap.set(node,{visibility:'hidden',opacity:0});
  }
  return()=>{clearTimeout(timer);animation?.kill();};
 },[pending,reduced,activity,routeKey]);
 return <div ref={bar} className="page-loading-bar" data-state="idle" data-mode="indeterminate" role="progressbar" aria-label="콘텐츠 전환 중" aria-hidden={!pending}/>;
}
