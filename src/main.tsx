import { LogoAnimationContext } from './components/LogoAnimationContext';
import { PageProgressContext } from './components/PageProgressContext';
import React,{useCallback,useEffect,useMemo,useState} from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter,RouterProvider,Link,useLocation,useOutlet } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PageTransition } from './components/PageTransition';
import { PageLoadingProgressBar } from './components/PageLoadingProgressBar';
import './styles/tokens.css';import './styles/global.css';
function App(){
 const location=useLocation(),outlet=useOutlet();
 const [displayedPath,setDisplayedPath]=useState(location.pathname);
 const [activity,setActivity]=useState(0);const notifyProgress=useCallback(()=>setActivity(n=>n+1),[]);
 const [logoRevision,setLogoRevision]=useState(0);const requestLogo=useCallback(()=>setLogoRevision(n=>n+1),[]);const logoContext=useMemo(()=>({revision:logoRevision,request:requestLogo}),[logoRevision,requestLogo]);
 useEffect(()=>{window.scrollTo(0,0);document.title=location.pathname==='/work'?'WORK — STUDIO HEEJAE':location.pathname==='/about'?'ABOUT — STUDIO HEEJAE':'STUDIO HEEJAE';},[location.pathname]);
 return <LogoAnimationContext.Provider value={logoContext}><PageProgressContext.Provider value={notifyProgress}><PageLoadingProgressBar pagePending={displayedPath!==location.pathname} activity={activity}/><a className="skip-link" href="#content">콘텐츠로 이동</a><Header/>
  <div id="content" tabIndex={-1}><AnimatePresence mode="wait"><PageTransition key={location.pathname} path={location.pathname} onReady={setDisplayedPath}>{outlet}</PageTransition></AnimatePresence></div><Footer/>
 </PageProgressContext.Provider></LogoAnimationContext.Provider>;
}
function NotFound(){return <main className="page-padding empty-state">페이지를 찾을 수 없습니다. <Link to="/">HOME</Link></main>;}
// Future route loaders and lazy modules automatically participate in useNavigation().
const router=createBrowserRouter([{element:<App/>,HydrateFallback:()=>null,children:[
 {path:'/',lazy:async()=>({Component:(await import('./pages/HomePage')).HomePage})},
 {path:'/work',lazy:async()=>({Component:(await import('./pages/WorkPage')).WorkPage})},
 {path:'/about',lazy:async()=>({Component:(await import('./pages/AboutPage')).AboutPage})},
 {path:'*',element:<NotFound/>},
]}]);
createRoot(document.getElementById('root')!).render(<React.StrictMode><RouterProvider router={router}/></React.StrictMode>);
