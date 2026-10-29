import { createContext,useContext } from 'react';

export const LogoAnimationContext=createContext({revision:0,request:()=>{}});
export function useLogoAnimation(){return useContext(LogoAnimationContext);}
