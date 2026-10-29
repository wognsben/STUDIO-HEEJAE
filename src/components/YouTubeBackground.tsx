import { useEffect,useRef,useState } from 'react';
import { useReducedMotion } from 'motion/react';
type Player={mute():void;playVideo():void;pauseVideo():void;seekTo(n:number,allow:boolean):void;destroy():void;getIframe():HTMLIFrameElement};
type Options={host:string;videoId:string;playerVars:Record<string,string|number>;events:{onReady(e:{target:Player}):void;onStateChange(e:{data:number;target:Player}):void;onError():void;onAutoplayBlocked():void}};
type YouTube={Player:new(el:HTMLElement,opts:Options)=>Player};
declare global {interface Window {YT?:YouTube;onYouTubeIframeAPIReady?:()=>void}}
let api:Promise<YouTube>|undefined;
function loadAPI(){
 if(window.YT?.Player)return Promise.resolve(window.YT);
 if(!api)api=new Promise<YouTube>((resolve,reject)=>{
  const previous=window.onYouTubeIframeAPIReady;
  const timeout=window.setTimeout(()=>reject(new Error('YouTube API timeout')),15000);
  window.onYouTubeIframeAPIReady=()=>{clearTimeout(timeout);previous?.();if(window.YT)resolve(window.YT);};
  const script=document.createElement('script');script.src='https://www.youtube.com/iframe_api';script.async=true;
  script.onerror=()=>{clearTimeout(timeout);reject(new Error('YouTube API unavailable'));};document.head.append(script);
 });
 return api;
}
export function YouTubeBackground({id,title}:{id:string;title:string}){
 const mount=useRef<HTMLDivElement>(null),player=useRef<Player|null>(null),active=useRef(false),ready=useRef(false);
 const [near,setNear]=useState(false),[armed,setArmed]=useState(false),[visible,setVisible]=useState(false),[eligible,setEligible]=useState(false),[failed,setFailed]=useState(false),[playing,setPlaying]=useState(false);
 const reduced=useReducedMotion();
 useEffect(()=>{
  const el=mount.current!;
  const proximity=new IntersectionObserver(([e])=>{setNear(e.isIntersecting);},{rootMargin:'250px'});
  const viewport=new IntersectionObserver(([e])=>{const on=e.isIntersecting&&e.intersectionRatio>=.25;active.current=on&&!document.hidden;setVisible(on);if(!on&&ready.current)player.current?.pauseVideo();},{threshold:[0,.25]});
  const size=new ResizeObserver(([e])=>setEligible(e.contentRect.width>=200&&e.contentRect.height>=200));
  proximity.observe(el);viewport.observe(el);size.observe(el);
  return()=>{proximity.disconnect();viewport.disconnect();size.disconnect();};
 },[]);
 useEffect(()=>{
  function sync(){active.current=visible&&!document.hidden&&!reduced;if(!ready.current)return;if(active.current){player.current?.mute();player.current?.playVideo();}else player.current?.pauseVideo();}
  sync();document.addEventListener('visibilitychange',sync);return()=>document.removeEventListener('visibilitychange',sync);
 },[visible,reduced]);
 useEffect(()=>{if(near&&eligible&&visible&&!reduced)setArmed(true);},[near,eligible,visible,reduced]);
 useEffect(()=>{
  if(!armed||!eligible||reduced||failed)return;
  let disposed=false;const root=mount.current!;let startup:number|undefined;
  loadAPI().then(YT=>{
   if(disposed)return;
   const host=document.createElement('div');root.append(host);
   player.current=new YT.Player(host,{host:'https://www.youtube-nocookie.com',videoId:id,
    playerVars:{autoplay:1,mute:1,loop:1,playlist:id,playsinline:1,controls:0,iv_load_policy:3,rel:0,origin:location.origin},
    events:{onReady:({target})=>{if(disposed)return;ready.current=true;target.getIframe().title=`${title} — 음소거 영상`;target.mute();if(active.current)target.playVideo();else target.pauseVideo();
      clearTimeout(startup);startup=window.setTimeout(()=>{if(!disposed&&active.current)setFailed(current=>current||!root.dataset.started);},12000);},
     onStateChange:({data,target})=>{if(disposed)return;root.dataset.playerState=String(data);if(data===3&&root.dataset.started&&active.current){setPlaying(true);return;}if(data===1){if(!active.current){target.pauseVideo();return;}root.dataset.started='true';clearTimeout(startup);setPlaying(true);}else{setPlaying(false);if(data===0&&active.current){target.seekTo(0,true);target.playVideo();}}},
     onError:()=>{if(!disposed)setFailed(true);},onAutoplayBlocked:()=>{if(!disposed)setFailed(true);}}});
   startup=window.setTimeout(()=>{if(!disposed&&!root.dataset.started)setFailed(true);},20000);
  }).catch(()=>{if(!disposed)setFailed(true);});
  return()=>{disposed=true;clearTimeout(startup);ready.current=false;player.current?.destroy();player.current=null;root.replaceChildren();setPlaying(false);};
 },[armed,eligible,reduced,failed,id,title]);
 return <div ref={mount} className="youtube-background" data-state={failed?'fallback':reduced?'reduced-motion':!eligible?'thumbnail-size':playing?'playing':ready.current?'paused':'loading'} style={{position:'absolute',inset:0,opacity:playing?1:0,pointerEvents:playing?'auto':'none'}}/>;
}
