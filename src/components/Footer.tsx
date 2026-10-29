import { Link } from 'react-router-dom';
import { FooterWordmark } from './FooterWordmark';
import './Footer.css';
export function Footer(){
 function backToTop(){window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 return <footer className="site-footer"><FooterWordmark/>
  <div className="footer-information">
   <nav aria-label="회사 정보"><h2>COMPANY</h2><button disabled title="준비 중">About <span className="footer-pending">준비 중</span></button><button disabled title="준비 중">Services <span className="footer-pending">준비 중</span></button><button disabled title="준비 중">Contact <span className="footer-pending">준비 중</span></button></nav>
   <nav aria-label="작업물"><h2>WORK</h2><Link to="/work" onClick={backToTop}>Portfolio</Link><Link to="/work" onClick={backToTop}>Projects</Link></nav>
   <section><h2>GET IN TOUCH</h2><a href="tel:01064064660">010.6406.4660</a><a href="mailto:ceo@doproject-lab.com">ceo@doproject-lab.com</a><address>부산광역시 부산진구 전포대로209번길 7</address></section>
  </div>
  <div className="footer-bottom"><p>© 2026 STUDIO HEEJAE. All rights reserved.</p><button onClick={backToTop}>BACK TO TOP <span aria-hidden="true">↑</span></button></div>
 </footer>;
}
