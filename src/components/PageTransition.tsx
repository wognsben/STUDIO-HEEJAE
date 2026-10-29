import { useLayoutEffect,type ReactNode } from 'react';
import { motion,useReducedMotion } from 'motion/react';

/** Report the actual new screen mount after AnimatePresence's existing exit. */
export function PageTransition({path,onReady,children}:{path:string;onReady:(path:string)=>void;children:ReactNode}){
 const reduced=useReducedMotion();
 useLayoutEffect(()=>onReady(path),[path,onReady]);
 return <motion.div initial={{y:reduced?0:15,opacity:0}}
  animate={{y:0,opacity:1,transition:{duration:reduced?0:.45,ease:[.29,.01,.14,1]}}}
  exit={{opacity:0,transition:{duration:reduced?0:.4,ease:[.91,.01,.67,1]}}}>
  {children}
 </motion.div>;
}
