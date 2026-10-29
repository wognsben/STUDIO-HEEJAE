import { Link } from 'react-router-dom';
import { AboutCarousel } from '../components/about/AboutCarousel';
import { productionSlides,approachSlides,clientLogos } from '../data/about';
import './AboutPage.css';

function SectionLabel({number,children}:{number:string;children:string}){
 return <div className="about-section-label"><span>{number}</span><h2>{children}</h2></div>;
}
export function AboutPage(){
 return <main className="about-page">
  <section className="about-intro about-grid" aria-labelledby="about-heading"><div className="about-intro-copy"><h1 id="about-heading">We make<br/>stories move.</h1><div className="about-copy about-intro-body"><p>스튜디오 희재는 영상과 모션그래픽을 통해 브랜드의 이야기를 시각적으로 전달하는 크리에이티브 스튜디오입니다.</p><p>좋은 이야기가 더 멀리, 더 깊이 닿을 수 있도록 기획부터 제작까지 함께합니다.</p></div></div></section>

  <section className="about-section about-grid about-services-section" aria-label="What we do"><SectionLabel number="01">What we do</SectionLabel><div className="about-copy about-section-copy"><p>브랜드의 목표와 메시지에 맞는 다양한 형태의 시각 콘텐츠를 제작합니다.</p><p>아이디어를 구체적인 결과물로 만드는 전 과정을 유연하게 함께합니다.</p></div><ul className="about-services about-copy"><li>브랜드 필름</li><li>모션그래픽</li><li>광고·홍보 영상</li><li>디지털 콘텐츠</li></ul></section>
  <AboutCarousel label="작업 비주얼" variant="production" slides={productionSlides}/>

  <section className="about-section about-grid about-approach-section" aria-label="Our approach"><SectionLabel number="02">Our approach</SectionLabel><div className="about-copy about-section-copy"><p>좋은 결과물은 작은 아이디어에서 시작됩니다.<br/>우리는 브랜드와 긴밀히 소통하며, 기획·연출·디자인·후반 작업까지 각 단계에서 최적의 방식을 고민합니다.</p><p>감각적인 비주얼과 탄탄한 스토리텔링을 바탕으로, 오래 기억되는 콘텐츠를 만듭니다.</p></div></section>
  <AboutCarousel label="접근 방식 비주얼" variant="approach" slides={approachSlides}/>

  <section className="about-clients" aria-labelledby="clients-heading"><div className="about-clients-heading"><div><span className="about-section-number">03</span><h2 id="clients-heading">CLIENTS</h2></div><p>(Our partners)</p></div><div className="about-client-grid">{clientLogos.map(logo=><div className="about-client-cell" key={logo.file}><img src={logo.src} alt={logo.alt} loading="lazy" decoding="async"/></div>)}</div></section>

  <section className="about-cta about-grid" aria-label="Let's work together"><SectionLabel number="04">Let’s work together</SectionLabel><div className="about-cta-copy"><h2>함께 만들어갈<br/>프로젝트가 있으신가요?</h2><div className="about-copy"><p>새로운 아이디어, 브랜드의 다음 이야기.<br/>스튜디오 희재가 함께 고민하고 만들어가겠습니다.</p></div><Link to="/contact" className="about-contact-link">문의하기 <span aria-hidden="true">→</span></Link></div></section>
 </main>;
}
