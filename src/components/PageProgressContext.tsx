import { createContext,useContext } from 'react';

export const PageProgressContext=createContext<()=>void>(()=>{});
/** Signal a committed local content action without delaying the action itself. */
export function usePageProgress(){return useContext(PageProgressContext);}
