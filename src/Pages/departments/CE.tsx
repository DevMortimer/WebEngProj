import { useEffect, useMemo, useState, useRef, type ReactNode } from "react";
import Navbar from "../../components/CEnavbar";
import SectionTitle from "../../components/CEsectiontitle";
import Footer from "../../components/CEfooter";
import { mergeDeptWithOverrides } from "../../lib/departmentAdmin";
import { CE } from "../../data/department/CE";
import CEIcon from "../../assets/CEicon.svg";
import "../../styles/departments/CE.css";

function FadeInSection({ children, className = "", delay = "" }: { children: ReactNode, className?: string, delay?: string }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const current = domRef.current;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, []);

  return (
    <div
      className={`${className} ${isVisible ? 'ce-animate-fade-in' : 'opacity-0'} ${delay}`}
      ref={domRef}
    >
      {children}
    </div>
  );
}

function ImageStack({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 1500); // Switches every 1.5 seconds for a smooth but quick feel
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[600px] mt-16">
      {images.map((img, idx) => {
        // Calculate position relative to current index
        const position = (idx - currentIndex + images.length) % images.length;
        const isVisible = position < 3; // Show top 3 layers

        return (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
              !isVisible ? "opacity-0 scale-95 translate-y-8" : ""
            }`}
            style={{
              zIndex: images.length - position,
              transform: `translateY(${position * 20}px) scale(${1 - position * 0.05})`,
              opacity: isVisible ? 1 - position * 0.3 : 0,
            }}
          >
            <div className="w-full h-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white ce-border-gold">
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PEOSlider({ objectives }: { objectives: any[] }) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSetCurrent = (idx: number) => {
    if (isAnimating || idx === current) return;
    setIsAnimating(true);
    setCurrent(idx);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Blueprint Grid Background Decoration */}
      <div className="absolute -inset-10 opacity-[0.03] pointer-events-none -z-10 overflow-hidden">
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#1F3A4D 1px, transparent 1px), linear-gradient(90deg, #1F3A4D 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        {/* Left Side: Vertical Tabs */}
        <div className="lg:w-1/3 flex flex-col gap-4">
          {objectives.map((obj, idx) => (
            <button
              key={obj.id}
              onClick={() => handleSetCurrent(idx)}
              className={`group relative p-6 rounded-2xl text-left transition-all duration-500 border-l-4 ${
                current === idx 
                ? "ce-bg-navy ce-border-gold shadow-xl -translate-x-2" 
                : "bg-white border-transparent hover:bg-gray-50 text-gray-400"
              }`}
            >
              <div className={`text-[10px] font-black tracking-[0.2em] mb-1 ${current === idx ? "ce-text-gold" : "text-gray-300"}`}>
                {obj.id}
              </div>
              <div className={`font-black text-sm uppercase tracking-tight ${current === idx ? "text-white" : "ce-text-navy"}`}>
                {obj.title}
              </div>
              {current === idx && (
                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gold-400 ce-animate-fade-in">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </div>
              )}
            </button>
          ))}
          
          <div className="mt-auto p-6 ce-bg-gold/10 rounded-2xl border border-gold-200/20 hidden lg:block">
            <div className="text-[10px] font-black ce-text-navy/40 uppercase tracking-widest mb-2">Core Vision</div>
            <p className="text-xs font-bold ce-text-navy/60 italic leading-relaxed">
              "Engineering solutions that bridge the gap between imagination and reality."
            </p>
          </div>
        </div>

        {/* Right Side: Main Content Card */}
        <div className="lg:w-2/3">
          <div className="h-full overflow-hidden bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-gray-100 relative flex flex-col justify-center min-h-[450px]">
            {/* Technical Detail Elements */}
            <div className="absolute top-10 right-10 flex gap-1">
              {[1, 2, 3].map(i => <div key={i} className={`w-1 h-1 rounded-full ${i <= current + 1 ? 'ce-bg-gold' : 'bg-gray-200'}`}></div>)}
            </div>
            
            <div className="absolute bottom-0 right-0 w-48 h-48 opacity-[0.03] select-none -z-10 translate-x-10 translate-y-10">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-current ce-text-navy">
                <path d="M0 0h100v100H0zM10 10h80v80H10z"/>
                <path d="M20 20h60v60H20zM30 30h40v40H30z"/>
              </svg>
            </div>

            <div className={`transition-all duration-500 transform ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              <div className="inline-block px-4 py-1 ce-bg-navy rounded-full text-[10px] font-black ce-text-gold uppercase tracking-[0.3em] mb-8">
                Detailed Objective
              </div>
              <h3 className="text-3xl md:text-5xl font-black ce-text-navy mb-8 leading-tight uppercase tracking-tighter">
                {objectives[current].title}
              </h3>
              <div className="w-20 h-1.5 ce-bg-gold mb-8 rounded-full"></div>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                {objectives[current].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CEPage() {
  const [baseDept] = useState<typeof CE>(CE);
  const [activeId, setActiveId] = useState<string>("home");

  const dept = useMemo(
    () => mergeDeptWithOverrides(baseDept),
    [baseDept]
  );

  const heroImages = useMemo(() => dept.images.heroCarousel, [dept.images.heroCarousel]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ["home", "about", "cele", "peo", "so", "curriculum", "laboratories", "faculty", "careers"];
    
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!dept) return;

    document.title = `${dept.code} | BULSU COE`;

    const link =
      (document.querySelector("link[rel='icon']") as HTMLLinkElement | null) ??
      (document.querySelector("link[rel~='icon']") as HTMLLinkElement | null);

    if (link) {
      link.href = `/icons/${dept.code.toLowerCase()}.svg`;
    }
  }, [dept]);

  const onNav = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-white ce-text-dark selection:bg-gold-200 overflow-x-hidden">
      <Navbar onNav={onNav as any} activeId={activeId as any} />

      {/* Hero Section - Initial Entrance */}
      <section id="home" className="max-w-6xl mx-auto px-6 pt-16">
        <div className="text-center">
          <div className="mb-8 flex justify-center group ce-animate-scale-in">
             <img src={CEIcon} alt="CE Logo" className="w-40 h-40 object-contain transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
          </div>
          <div className="text-sm font-black ce-text-gold tracking-[0.3em] uppercase mb-4 ce-animate-fade-in ce-delay-2">
            {dept.subtitle}
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight ce-text-navy uppercase ce-animate-fade-in ce-delay-4">
            {dept.title}
          </h1>

          <div className="mt-12 relative ce-animate-fade-in ce-delay-6 flex flex-col items-center">
            {/* Decorative background glow */}
            <div className="absolute inset-0 bg-gold-400/5 blur-3xl rounded-full -z-10 scale-150"></div>
            
            <div className="relative py-10 px-6 md:px-16 flex flex-col items-center">
              {/* Architectural Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 ce-border-gold/30"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 ce-border-gold/30"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 ce-border-gold/30"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 ce-border-gold/30"></div>

              <div className="text-lg md:text-2xl font-black ce-text-navy tracking-[0.2em] uppercase text-center leading-relaxed">
                Bounded by <span className="ce-text-gold">Synergy</span>
                <span className="mx-6 hidden md:inline opacity-20 text-navy/30">|</span>
                <br className="md:hidden" />
                Committed to <span className="ce-text-gold">Excellence</span>
              </div>
              
              <div className="mt-10 relative group">
                {/* Animated glow on hover */}
                <div className="absolute -inset-4 bg-gold-400/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative flex items-center gap-4 md:gap-8">
                   <div className="h-[1px] w-8 md:w-16 ce-bg-gold/40"></div>
                   <div className="text-[10px] md:text-xs font-black ce-text-navy tracking-[0.8em] uppercase flex items-center whitespace-nowrap bg-white px-4 py-1">
                     PRIDE <span className="mx-3 md:mx-5 text-[6px] ce-text-gold">■</span> 
                     HONOR <span className="mx-3 md:mx-5 text-[6px] ce-text-gold">■</span> 
                     DIGNITY
                   </div>
                   <div className="h-[1px] w-8 md:w-16 ce-bg-gold/40"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FadeInSection delay="ce-delay-8">
          <ImageStack images={heroImages} />
        </FadeInSection>
      </section>

      {/* 1. Program Overview */}
      <section id="about" className="ce-bg-light mt-32 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-start">
            <div className="lg:w-1/2">
              <FadeInSection delay="ce-delay-1">
                <div className="text-sm font-black ce-text-gold tracking-[0.3em] uppercase mb-6">
                  {dept.programOverview.heading}
                </div>
                <h2 className="text-4xl md:text-5xl font-black ce-text-navy leading-tight">
                  {dept.programOverview.subheading}
                </h2>
                <div className="mt-8 text-xl text-gray-600 leading-relaxed font-medium space-y-6">
                  {dept.programOverview.text.split("\n\n").map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </FadeInSection>
            </div>
            
            <div className="lg:w-1/2 w-full space-y-8">
              {/* Performance Card */}
              <FadeInSection delay="ce-delay-3" className="bg-white p-10 rounded-[2.5rem] shadow-xl border-t-8 ce-border-gold">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-12 rounded-xl ce-bg-navy flex items-center justify-center text-white">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
                   </div>
                   <h3 className="text-xl font-black ce-text-navy uppercase tracking-tight">Licensure Performance</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="relative pt-2">
                    <div className="flex justify-between mb-2">
                      <span className="text-xs font-bold ce-text-navy uppercase tracking-widest">BulSU Average</span>
                      <span className="text-xs font-black ce-text-gold">70-76%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full ce-bg-gold rounded-full w-[74%] transition-all duration-1000 ce-delay-10"></div>
                    </div>
                  </div>
                  <div className="relative pt-2">
                    <div className="flex justify-between mb-2">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">National Average</span>
                      <span className="text-xs font-black text-gray-400">30-40%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-300 rounded-full w-[35%] transition-all duration-1000 ce-delay-10"></div>
                    </div>
                  </div>
                </div>
                
                <p className="mt-8 text-xs font-bold text-gray-400 italic">
                  * Consistently performing above the national passing rate for over a decade.
                </p>
              </FadeInSection>

              {/* Accreditation Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FadeInSection delay="ce-delay-4" className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100">
                  <div className="text-[10px] font-black ce-text-gold uppercase tracking-[0.2em] mb-2">Accreditation</div>
                  <div className="text-lg font-black ce-text-navy leading-tight">{dept.programOverview.stats.accreditation}</div>
                  <div className="mt-4 text-[10px] text-gray-400 font-bold uppercase">AACCUP Accredited</div>
                </FadeInSection>
                <FadeInSection delay="ce-delay-5" className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100">
                  <div className="text-[10px] font-black ce-text-gold uppercase tracking-[0.2em] mb-2">CHED Recognition</div>
                  <div className="text-lg font-black ce-text-navy leading-tight">{dept.programOverview.stats.ched}</div>
                  <div className="mt-4 text-[10px] text-gray-400 font-bold uppercase">Program Compliance</div>
                </FadeInSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1.5 Licensure Examination Section */}
      {dept.licensureExam && (
        <section id="cele" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <FadeInSection delay="ce-delay-1">
              <SectionTitle 
                center 
                eyebrow={dept.licensureExam.eyebrow} 
                title={dept.licensureExam.title} 
                subtitle={dept.licensureExam.subtitle} 
              />
            </FadeInSection>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
              {dept.licensureExam.results.map((result, rIdx) => (
                <FadeInSection 
                  key={rIdx} 
                  delay={`ce-delay-${rIdx + 2}`}
                  className="bg-gray-50 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-all"
                >
                  <h3 className="text-2xl font-black ce-text-navy mb-8 flex items-center gap-4">
                    <span className="w-12 h-0.5 ce-bg-gold"></span>
                    {result.period}
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    {result.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="flex justify-between items-center border-b border-gray-200 pb-4">
                        <span className="text-gray-500 font-bold uppercase text-xs tracking-wider">{stat.label}</span>
                        <span className="text-2xl font-black ce-text-gold">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2. Program Educational Objectives */}
      <section id="peo" className="max-w-6xl mx-auto px-6 py-32 overflow-hidden">
        <FadeInSection delay="ce-delay-1">
          <SectionTitle 
            center 
            eyebrow={dept.peo.eyebrow} 
            title={dept.peo.title} 
            subtitle={dept.peo.subtitle} 
          />
        </FadeInSection>

        <div className="mt-20">
          <PEOSlider objectives={dept.peo.objectives} />
        </div>
      </section>

      {/* 3. Student Outcomes */}
      <section id="so" className="ce-bg-navy py-32 text-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-navy-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeInSection delay="ce-delay-1" className="text-center">
            <div className="text-sm font-black ce-text-gold tracking-[0.4em] uppercase mb-6">{dept.so.eyebrow}</div>
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase italic">
              {dept.so.title.split(' ')[0]} <span className="ce-text-gold">{dept.so.title.split(' ')[1]}</span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-xl mb-24 font-medium leading-relaxed">
              {dept.so.subtitle}
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dept.so.outcomes.map((o: any, idx: number) => (
              <FadeInSection 
                key={idx} 
                delay={`ce-delay-${(idx % 4) + 1}`} 
                className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/[0.08] hover:border-gold-500/30 transition-all duration-500 flex flex-col h-full"
              >
                {/* Letter Indicator */}
                <div className="absolute top-6 right-8 text-6xl font-black text-white/5 group-hover:text-gold-500/10 transition-colors duration-500 select-none">
                  {o.title}
                </div>

                <div className="mb-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl ce-bg-gold flex items-center justify-center text-navy font-black text-xl group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-gold-500/20">
                    {o.title.toUpperCase()}
                  </div>
                  <h3 className="text-lg font-black text-white uppercase tracking-tight leading-tight group-hover:ce-text-gold transition-colors">
                    {o.subtitle}
                  </h3>
                </div>

                <div className="h-[2px] w-12 ce-bg-gold/30 mb-6 group-hover:w-full transition-all duration-700"></div>

                <p className="text-gray-400 group-hover:text-gray-200 leading-relaxed font-medium transition-colors">
                  {o.text}
                </p>

                {/* Corner Accent */}
                <div className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden rounded-br-[2.5rem]">
                   <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[40px] border-r-[40px] border-transparent group-hover:border-r-gold-500/20 transition-all duration-500"></div>
                </div>
              </FadeInSection>
            ))}
          </div>

          <div className="mt-24 p-12 rounded-[3rem] border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent text-center">
             <p className="text-gray-500 font-bold italic text-lg max-w-4xl mx-auto">
               "These outcomes ensure that our graduates are not only technically proficient but also socially responsible and ready to lead the global infrastructure landscape."
             </p>
          </div>
        </div>
      </section>

      {/* 4. Curriculum Overview */}
      <section id="curriculum" className="max-w-6xl mx-auto px-6 py-32">
        <div className="grid grid-cols-12 gap-20 items-center">
          <div className="col-span-12 md:col-span-6">
            <FadeInSection delay="ce-delay-1">
              <div className="text-sm font-black ce-text-gold tracking-[0.3em] uppercase mb-6">{dept.curriculumOverview.eyebrow}</div>
              <h2 className="text-4xl md:text-6xl font-black ce-text-navy leading-tight">{dept.curriculumOverview.title}</h2>
              <p className="mt-8 text-xl text-gray-600 leading-relaxed">{dept.curriculumOverview.text}</p>
            </FadeInSection>

            <ul className="mt-12 space-y-5">
              {dept.curriculumOverview.bullets.map((b, idx) => (
                <FadeInSection key={idx} delay={`ce-delay-${idx + 3}`} className="flex items-center gap-6 text-gray-700 font-bold group">
                  <div className="w-4 h-4 rounded-full ce-bg-gold transition-transform group-hover:scale-125" />
                  <span className="text-lg">{b}</span>
                </FadeInSection>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-6">
            <FadeInSection delay="ce-delay-4" className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#D4AF37] to-[#1F3A4D] rounded-[3rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative h-[450px] md:h-[550px] rounded-[3rem] bg-white border border-gray-100 flex items-center justify-center overflow-hidden shadow-2xl">
                <img src={dept.images.watermark} alt="" className="w-[85%] opacity-5 select-none grayscale transition-all duration-1000 group-hover:scale-110 group-hover:rotate-6" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[12rem] font-black text-gray-100/30 tracking-tighter transition-all duration-700 group-hover:text-gray-200/50">CE</span>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 5. Program Curriculum */}
      <section id="program-curriculum" className="ce-bg-light py-32">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection delay="ce-delay-1">
            <SectionTitle 
              center 
              eyebrow={dept.programCurriculum.eyebrow} 
              title={dept.programCurriculum.title} 
              subtitle="Explore our comprehensive 4-year curriculum designed for future civil engineers." 
            />
          </FadeInSection>
          
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dept.programCurriculum.years.map((y, idx) => (
              <FadeInSection key={idx} delay={`ce-delay-${idx + 2}`} className="group bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 border-t-[10px] ce-border-gold hover:-translate-y-3">
                <h3 className="text-2xl font-black ce-text-navy mb-6 uppercase tracking-tight">{y.year}</h3>
                <div className="space-y-4">
                  {y.semesters.map((s, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-4 text-gray-500 font-bold group-hover:ce-text-gold transition-colors">
                      <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:ce-bg-gold transition-colors" />
                      <span className="text-sm">{s}</span>
                    </div>
                  ))}
                </div>
                  <button className="mt-10 text-xs font-black ce-text-gold hover:ce-text-navy transition-all uppercase tracking-widest flex items-center gap-2 group/btn">
                    Course Details 
                    <span className="transition-transform group-hover/btn:translate-x-1">&rarr;</span>
                  </button>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Career Opportunities */}
      <section id="careers" className="max-w-6xl mx-auto px-6 py-32">
        <FadeInSection delay="ce-delay-1">
          <SectionTitle 
            center 
            eyebrow={dept.careers.eyebrow} 
            title={dept.careers.title} 
            subtitle={dept.careers.subtitle} 
          />
        </FadeInSection>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          {dept.careers.cards.map((card, idx) => (
            <FadeInSection key={idx} delay={`ce-delay-${idx + 2}`} className="group bg-white p-12 rounded-[2.5rem] border-2 border-gray-50 text-center hover:border-gold-300 ce-card-hover shadow-sm">
              <div className="w-24 h-24 ce-bg-light rounded-3xl flex items-center justify-center text-5xl mx-auto group-hover:ce-bg-gold transition-all duration-500 group-hover:rotate-6 shadow-sm" aria-hidden="true">
                {card.icon}
              </div>
              <h3 className="mt-10 text-2xl font-black ce-text-navy uppercase tracking-tight">{card.title}</h3>
              <p className="mt-6 text-gray-500 leading-relaxed font-medium text-lg">{card.text}</p>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* Laboratories */}
      <section id="laboratories" className="ce-bg-light py-32">
         <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <FadeInSection delay="ce-delay-1" className="text-left">
                     <div className="text-sm font-black ce-text-gold tracking-[0.3em] uppercase mb-6">{dept.laboratories.eyebrow}</div>
                    <h2 className="text-4xl md:text-6xl font-black ce-text-navy uppercase tracking-tight">{dept.laboratories.title}</h2>
                </FadeInSection>
                <FadeInSection delay="ce-delay-2" className="text-gray-500 max-w-md text-lg font-medium italic">{dept.laboratories.description}</FadeInSection>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dept.laboratories.items.map((lab, idx) => (
                <FadeInSection key={idx} delay={`ce-delay-${idx + 2}`} className="bg-white p-8 rounded-3xl shadow-sm hover:ce-bg-navy group transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gray-50">
                <div className="text-[10px] font-black ce-text-gold group-hover:text-white/40 mb-4 tracking-[0.2em] uppercase">LABORATORY {idx + 1}</div>
                <h3 className="text-xl font-bold ce-text-navy group-hover:text-white transition-colors leading-snug">{lab}</h3>
                <div className="mt-6 w-8 h-1 ce-bg-gold group-hover:w-full transition-all duration-500"></div>
                </FadeInSection>
            ))}
            </div>
        </div>
      </section>

      {/* Faculty */}
      <section id="faculty" className="max-w-6xl mx-auto px-6 py-32">
        <FadeInSection delay="ce-delay-1">
          <SectionTitle center eyebrow={dept.faculty.eyebrow} title={dept.faculty.title} />
        </FadeInSection>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10">
          {dept.faculty.members.map((member, idx) => (
            <FadeInSection key={`${member.name}-${idx}`} delay={`ce-delay-${idx + 2}`} className="group flex items-center gap-8 bg-white p-10 rounded-[2.5rem] border-2 border-gray-50 hover:border-gold-300 transition-all hover:shadow-2xl hover:-translate-y-1">
                <div className="w-20 h-20 rounded-2xl ce-bg-navy flex items-center justify-center text-white font-black text-3xl transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-xl">
                    {member.name.split(" ").pop()?.charAt(0)}
                </div>
                <div>
                    <h3 className="font-black text-2xl ce-text-navy tracking-tight">{member.name}</h3>
                    <div className="mt-2 flex items-center gap-3">
                        <span className="w-6 h-0.5 ce-bg-gold"></span>
                        <p className="text-xs font-black ce-text-gold uppercase tracking-widest">{member.role}</p>
                    </div>
                </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Stat({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: string;
}) {
  return (
    <div className="text-center md:text-left group">
      <div className="text-5xl font-black transition-transform group-hover:scale-110" style={{ color }}>
        {value}+
      </div>
      <div className="mt-3 text-xs font-black text-gray-400 uppercase tracking-[0.2em] group-hover:ce-text-gold transition-colors">{label}</div>
    </div>
  );
}
