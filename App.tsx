
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { STAFF, COURSES, Course } from './constants';
import GeminiAdvisor from './components/GeminiAdvisor';

const SpeedLogo = () => (
  <img 
    src="https://avatars.githubusercontent.com/u/59014854?s=280&v=4" 
    alt="Speed Logo"
    className="w-full h-full object-contain p-0.5"
  />
);

const HacksLogo = () => (
  <img 
    src="https://avatars.githubusercontent.com/u/165606246?s=200&v=4" 
    alt="Hacks Logo"
    className="w-full h-full object-contain p-0.5"
  />
);

const getTimeRemaining = (startDateStr: string) => {
  const target = new Date(startDateStr);
  const now = new Date();
  const diffTime = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return "TODAY";
  return `in ${diffDays} day${diffDays > 1 ? 's' : ''}`;
};

const DetailView: React.FC<{ 
  title: string; 
  category?: string; 
  icon?: string; 
  description: string; 
  items: string[]; 
  link: string; 
  onBack: () => void;
  prize?: string;
  theme: 'hacks' | 'speed';
}> = ({ title, category, icon, description, items, link, onBack, prize, theme }) => {
  const isSpeed = theme === 'speed';
  
  return (
    <div className={`min-h-screen relative animate-in fade-in zoom-in-95 duration-700 pb-32 px-6 md:px-20 overflow-visible transition-colors duration-500 pt-24 md:pt-32 ${isSpeed ? 'bg-[#050a24]' : 'bg-wood-dark'}`}>
      <div className="max-w-7xl mx-auto py-12 relative z-10 overflow-visible">
        <button 
          onClick={onBack}
          className={`flex items-center gap-2 transition-all duration-300 mb-8 md:mb-12 group font-black uppercase tracking-widest text-xs active:scale-95 ${isSpeed ? 'text-blue-400 hover:text-green-400' : 'text-white/60 hover:text-secondary'}`}
        >
          <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Back to Main
        </button>

        <div className="grid lg:grid-cols-5 gap-10 md:gap-16 items-start overflow-visible">
          <div className="lg:col-span-3 overflow-visible">
            <div className="flex items-center gap-3 mb-6 overflow-visible">
              {icon && (
                <div className={`flex items-center justify-center overflow-visible ${isSpeed ? 'text-blue-400' : 'text-primary'}`}>
                  <span className="material-symbols-outlined text-3xl md:text-4xl leading-none">{icon}</span>
                </div>
              )}
              {category && <span className={`text-[10px] md:text-sm font-black tracking-[0.2em] uppercase leading-none ${isSpeed ? 'text-green-400' : 'text-secondary'}`}>{category}</span>}
            </div>
            <h1 className={`text-4xl md:text-7xl font-bold mb-8 tracking-tighter font-serif leading-none uppercase px-4 md:px-16 overflow-visible py-2 md:ml-[-4rem] ${isSpeed ? 'text-white' : 'text-white'}`}>
              {title}
            </h1>
            <p className={`text-lg md:text-xl mb-8 md:mb-12 leading-relaxed max-w-2xl font-medium opacity-90 ${isSpeed ? 'text-blue-100/70' : 'text-text-body'}`}>
              {description}
            </p>
            {prize && (
              <div className={`mb-8 md:mb-12 flex items-center gap-4 glass-panel px-6 md:px-8 py-4 rounded-[20px] md:rounded-[30px] border-2 shadow-sm ${isSpeed ? 'bg-blue-900/40 border-blue-400/30' : 'bg-primary/5 border-primary/20'}`}>
                <span className="material-symbols-outlined text-3xl md:text-4xl text-secondary">payments</span>
                <div>
                  <p className={`text-[9px] font-black uppercase tracking-widest ${isSpeed ? 'text-blue-200' : 'text-text-body'}`}>Main Prize</p>
                  <p className={`text-xl md:text-3xl font-black font-serif px-2 md:px-4 ${isSpeed ? 'text-white' : 'text-white'}`}>{prize}</p>
                </div>
              </div>
            )}
            <div className={`glass-card rounded-[32px] md:rounded-[48px] p-8 md:p-10 border-2 shadow-2xl ${isSpeed ? 'bg-white/5 border-white/10 shadow-black' : 'bg-white/5 border-white/10 shadow-black'}`}>
              <h3 className={`text-2xl md:text-3xl font-bold mb-8 md:mb-10 font-serif uppercase tracking-tight px-2 md:px-4 ${isSpeed ? 'text-white' : 'text-white'}`}>Key Objectives</h3>
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                {items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 md:gap-5 group/item">
                    <span className={`material-symbols-outlined text-[20px] md:text-[24px] flex-shrink-0 transition-transform duration-300 group-hover/item:scale-125 ${isSpeed ? 'text-secondary' : 'text-primary'}`}>verified</span>
                    <span className={`font-bold tracking-tight uppercase text-[11px] md:text-sm px-2 md:px-4 ${isSpeed ? 'text-blue-100' : 'text-text-body'}`}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className={`sticky top-32 glass-card rounded-[40px] md:rounded-[60px] p-8 md:p-12 border-2 shadow-2xl ${isSpeed ? 'bg-white/5 border-white/10 shadow-black' : 'bg-white/5 border-white/10 shadow-black'}`}>
              <h2 className={`text-2xl md:text-3xl font-bold mb-6 font-serif uppercase tracking-tight px-2 md:px-4 ${isSpeed ? 'text-white' : 'text-white'}`}>Join Now</h2>
              <p className={`font-medium mb-8 md:mb-10 leading-relaxed opacity-80 uppercase text-[10px] tracking-widest ${isSpeed ? 'text-blue-100/70' : 'text-text-body'}`}>Secure your spot for the upcoming event. Limited space!</p>
              <a 
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full h-16 md:h-20 rounded-2xl md:rounded-3xl text-center flex items-center justify-center text-lg md:text-xl font-black shadow-2xl hover:scale-[1.02] active:scale-95 transition-all duration-300 mb-8 uppercase tracking-widest ${isSpeed ? 'bg-blue-600 hover:bg-green-600 text-white shadow-blue-900/50' : 'btn-register text-white'}`}
              >
                Registration Form
              </a>
              <p className={`text-[9px] text-center font-black uppercase tracking-widest opacity-60 ${isSpeed ? 'text-blue-200' : 'text-text-body/60'}`}>Open to all skill levels. Free entry.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BoardSection: React.FC<{ title: string; theme: 'hacks' | 'speed' }> = ({ title, theme }) => {
  const isSpeed = theme === 'speed';
  return (
    <section className="py-20 md:py-24" id="staff">
      <div className="max-w-7xl mx-auto px-4">
        <div className="reveal text-center mb-16 md:mb-24 px-4 overflow-visible">
          <h2 className={`text-4xl md:text-7xl font-black uppercase tracking-tighter font-serif leading-none px-4 md:px-16 inline-block overflow-visible py-2 ${isSpeed ? 'text-white' : 'text-white'}`}>
            {title}
          </h2>
          <p className={`font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-xs mt-6 italic ${isSpeed ? 'text-green-400' : 'text-secondary'}`}>Leadership & Vision</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STAFF.map((member, idx) => (
            <div key={idx} className={`reveal glass-card p-8 md:p-10 rounded-[30px] md:rounded-[40px] border shadow-lg hover:translate-y-[-8px] transition-all duration-500 text-center group ${isSpeed ? 'bg-white/5 border-white/5 shadow-black/40' : 'bg-white/5 border-white/5 shadow-black/40'}`}>
              <div className="relative size-20 md:size-24 mx-auto mb-6 md:mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <div className={`absolute inset-0 rounded-[35%] rotate-12 blur-sm ${isSpeed ? 'bg-blue-600/10' : 'bg-primary/10'}`}></div>
                <div className={`absolute inset-0 rounded-[40%] -rotate-12 ${isSpeed ? 'bg-blue-600/15' : 'bg-primary/15'}`}></div>
                <div className={`absolute inset-2 backdrop-blur-sm rounded-[30%] shadow-inner flex items-center justify-center ${isSpeed ? 'bg-white/5' : 'bg-white/5'}`}>
                   <span className={`material-symbols-outlined text-3xl md:text-4xl transition-colors duration-500 ${isSpeed ? 'text-blue-400 group-hover:text-green-400' : 'text-primary group-hover:text-secondary'}`}>person_book</span>
                </div>
              </div>
              <h4 className={`text-lg md:text-xl font-bold font-serif uppercase mb-2 px-2 overflow-visible leading-tight tracking-tight ${isSpeed ? 'text-white' : 'text-white'}`}>{member.name}</h4>
              <p className={`text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${isSpeed ? 'text-green-400' : 'text-primary'}`}>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InternshipsSection: React.FC<{ theme: 'hacks' | 'speed' }> = ({ theme }) => {
  const isSpeed = theme === 'speed';
  const internshipLink = "https://docs.google.com/forms/d/e/1FAIpQLSdp_XZ1l4AJOnmyChApDzFlxdB0wrzAASjJyZ7PAv5Tnxe7vg/viewform?usp=publish-editor";
  
  return (
    <section className="py-20 md:py-32" id="internships">
      <div className="max-w-7xl mx-auto px-4">
        <div className="reveal text-center mb-16 md:mb-24 px-4 overflow-visible">
          <h2 className={`text-4xl md:text-[6rem] font-black uppercase tracking-tighter font-serif leading-none px-4 md:px-16 inline-block overflow-visible py-2 ${isSpeed ? 'text-white' : 'text-white'}`}>
            {isSpeed ? 'SPEED' : 'SMART HACKS'} <br /><span className={`${isSpeed ? 'text-green-gradient' : 'text-purple-gradient'} italic px-4 md:px-16 inline-block overflow-visible uppercase`}>Internships</span>
          </h2>
          <p className={`font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-xs mt-8 md:mt-10 ${isSpeed ? 'text-green-400' : 'text-secondary'}`}>Bridge to the Tech Industry</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {[
            { title: "Curriculum Developer", icon: "menu_book", desc: "Design high-impact coding curriculum for youth learners." },
            { title: "Web Developer", icon: "code", desc: "Maintain and evolve our digital infrastructure using modern web tools." },
            { title: "Teacher", icon: "school", desc: "Lead workshops and guide students through complex coding concepts." }
          ].map((intern, idx) => (
            <a 
              key={idx} 
              href={internshipLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`reveal glass-card p-8 md:p-12 rounded-[32px] md:rounded-[50px] border shadow-xl hover:scale-[1.03] transition-all duration-500 group block relative overflow-visible h-full flex flex-col active:scale-95 ${isSpeed ? 'bg-white/5 border-white/5 shadow-black/40' : 'bg-white/5 border-white/5 shadow-black/40'}`}
            >
              <div className="mb-8 md:mb-10 overflow-visible">
                 <span className={`material-symbols-outlined text-5xl md:text-6xl leading-none group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 ${isSpeed ? 'text-blue-400' : 'text-primary'}`}>{intern.icon}</span>
              </div>
              <h4 className={`text-2xl md:text-3xl font-bold font-serif uppercase mb-4 md:mb-6 leading-none pr-4 overflow-visible ${isSpeed ? 'text-white' : 'text-white'}`}>{intern.title}</h4>
              <p className={`text-[12px] md:text-sm font-medium uppercase tracking-tight opacity-70 mb-8 md:mb-12 flex-grow leading-relaxed pr-2 ${isSpeed ? 'text-blue-100/70' : 'text-text-body'}`}>{intern.desc}</p>
              <div className={`flex items-center gap-3 text-[10px] md:text-[11px] font-black uppercase tracking-widest group-hover:gap-5 transition-all duration-500 ${isSpeed ? 'text-green-400' : 'text-secondary'}`}>
                Apply Now <span className="material-symbols-outlined text-lg leading-none">arrow_forward</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentView, setCurrentView] = useState<'hacks' | 'speed'>('hacks');
  const [showContact, setShowContact] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showHackathonDetail, setShowHackathonDetail] = useState(false);

  useEffect(() => {
    // Dynamic Scrollbar Coloring (also affects the integrated right accent)
    const root = document.documentElement;
    if (currentView === 'speed') {
      root.style.setProperty('--accent-color', '#22c55e'); // green-500
    } else {
      root.style.setProperty('--accent-color', '#b026ff'); // primary purple
    }

    const handleScrollHeader = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) setScrolled(isScrolled);
    };

    // Use IntersectionObserver for reveals - much better than polling scrolls
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    window.addEventListener('scroll', handleScrollHeader, { passive: true });
    return () => {
        window.removeEventListener('scroll', handleScrollHeader);
        observer.disconnect();
    };
  }, [currentView, scrolled, selectedCourse, showHackathonDetail]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100; // Account for fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const handleSwitchView = useCallback((view: 'hacks' | 'speed') => {
    if (currentView !== view) {
      setCurrentView(view);
      setSelectedCourse(null);
      setShowHackathonDetail(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentView]);

  const navigateToSection = useCallback((view: 'hacks' | 'speed', sectionId: string) => {
    setSelectedCourse(null);
    setShowHackathonDetail(false);
    if (currentView !== view) {
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => scrollToSection(sectionId), 150);
    } else {
      scrollToSection(sectionId);
    }
  }, [currentView, scrollToSection]);

  const isSpeed = currentView === 'speed';

  // InfinityBackground optimized with infinity-parallax class and CSS variables
  const InfinityBackground = () => (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-[-5]">
      <div className="flex items-center justify-center infinity-parallax">
        <span className={`material-symbols-outlined text-[1500vw] select-none scale-[6] filter blur-[15px] transition-all duration-1000 ${isSpeed ? 'text-green-500 opacity-[0.08]' : 'text-primary opacity-[0.1] drop-shadow-[0_0_100px_rgba(176,38,255,0.5)]'}`}>
          all_inclusive
        </span>
      </div>
      {isSpeed && (
        <div className="absolute inset-0 z-[-4] overflow-hidden pointer-events-none transition-opacity duration-1000">
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.5] blur-[120px] transition-all duration-1000">
             <div className="absolute top-[5%] left-[5%] w-[80%] h-[80%] bg-blue-700/20 rounded-full animate-float"></div>
             <div className="absolute bottom-[10%] right-[10%] w-[90%] h-[90%] bg-green-600/20 rounded-full animate-float-delayed"></div>
          </div>
        </div>
      )}
    </div>
  );

  const renderNav = () => (
    <nav className={`fixed top-0 left-0 right-0 z-[200] w-full transition-all duration-500 px-4 md:px-16 flex items-center h-20 md:h-24 ${scrolled ? 'glass-panel h-16 md:h-20 shadow-2xl backdrop-blur-3xl' : 'bg-transparent'} ${isSpeed && scrolled ? 'bg-blue-950/40 border-blue-900 shadow-blue-900/40' : ''}`}>
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between overflow-visible">
        <div className="flex items-center gap-4 md:gap-12 overflow-visible">
          <div className="flex items-center gap-4 md:gap-8 overflow-visible">
            <button 
              onClick={() => handleSwitchView('hacks')}
              className={`flex items-center gap-2 md:gap-3 transition-all duration-500 hover:scale-105 active:scale-95 ${currentView === 'hacks' ? 'opacity-100' : 'opacity-40'} overflow-visible group`}
              title="Smart Hacks View"
            >
              <div className={`relative flex items-center justify-center size-10 md:size-12 rounded-xl shadow-xl ring-1 overflow-hidden shrink-0 transition-all duration-500 ${isSpeed ? 'bg-black text-white ring-blue-500/20' : 'bg-black text-primary ring-white/10'}`}>
                <HacksLogo />
              </div>
              <span className={`hidden lg:block text-[10px] font-black uppercase tracking-widest transition-colors duration-500 ${isSpeed ? 'text-white group-hover:text-blue-400' : 'text-white/80 group-hover:text-primary'}`}>SMART HACKS</span>
            </button>
            <button 
              onClick={() => handleSwitchView('speed')}
              className={`flex items-center gap-2 md:gap-3 transition-all duration-500 hover:scale-105 active:scale-95 ${currentView === 'speed' ? 'opacity-100' : 'opacity-40'} overflow-visible group`}
              title="Speed View"
            >
              <div className={`relative flex items-center justify-center size-10 md:size-12 rounded-xl shadow-glow ring-1 overflow-hidden shrink-0 transition-all duration-500 ${isSpeed ? 'bg-black text-white ring-blue-500/50 shadow-blue-500/50' : 'bg-black text-white ring-white/10'}`}>
                <SpeedLogo />
              </div>
              <span className={`hidden lg:block text-[10px] font-black uppercase tracking-widest transition-colors duration-500 ${isSpeed ? 'text-white group-hover:text-blue-400' : 'text-white/80 group-hover:text-primary'}`}>SPEED</span>
            </button>
          </div>

          <div className="flex items-center gap-4 md:gap-8 overflow-visible">
            <button 
              onClick={() => navigateToSection('hacks', 'hackathons-section')}
              className={`text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-500 active:scale-95 ${currentView === 'hacks' ? 'text-primary drop-shadow-sm' : isSpeed ? 'text-white/60 hover:text-blue-400' : 'text-white/60 hover:text-primary'}`}
            >
              HACKATHONS
            </button>
            <button 
              onClick={() => navigateToSection('speed', 'curriculum')}
              className={`text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-500 active:scale-95 ${currentView === 'speed' ? (isSpeed ? 'text-blue-400' : 'text-primary drop-shadow-sm') : isSpeed ? 'text-white/60 hover:text-blue-400' : 'text-white/60 hover:text-primary'}`}
            >
              CLASSES
            </button>
            <button 
              onClick={() => scrollToSection('internships')}
              className={`hidden sm:block text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-500 active:scale-95 ${isSpeed ? 'text-white/60 hover:text-blue-400' : 'text-white/60 hover:text-primary'}`}
            >
              INTERNSHIPS
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-10">
          <button onClick={() => setShowContact(true)} className={`px-3 md:px-8 py-2 md:py-2.5 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black border shadow-xl uppercase tracking-[0.2em] transition-all duration-300 active:scale-95 ${isSpeed ? 'bg-blue-600 hover:bg-green-600 text-white border-blue-400' : 'btn-gold border-white/20'}`}>Contact</button>
        </div>
      </div>
    </nav>
  );

  if (selectedCourse) {
    return (
      <div className={`min-h-screen relative overflow-x-hidden transition-colors duration-700 ${isSpeed ? 'bg-[#050a24]' : 'bg-wood-dark'}`}>
        <InfinityBackground />
        {renderNav()}
        <DetailView 
          title={selectedCourse.title}
          category={`${selectedCourse.category} • Level ${selectedCourse.level}`}
          icon={selectedCourse.categoryIcon}
          description={selectedCourse.description}
          items={selectedCourse.syllabus}
          link={selectedCourse.enrollmentLink}
          onBack={() => {
            setSelectedCourse(null);
            setTimeout(() => {
                const el = document.getElementById('curriculum');
                if (el) el.scrollIntoView({ behavior: 'instant' });
            }, 50);
          }}
          theme={currentView}
        />
        <GeminiAdvisor theme={currentView} />
      </div>
    );
  }

  if (showHackathonDetail) {
    return (
      <div className={`min-h-screen relative overflow-x-hidden transition-colors duration-700 ${isSpeed ? 'bg-[#050a24]' : 'bg-wood-dark'}`}>
        <InfinityBackground />
        {renderNav()}
        <DetailView 
          title="March Hackathon '26"
          category="Next Event • Hackathon"
          icon="event_available"
          description="Our next massive community-driven hackathon is approaching. Start building impactful software projects in a 48-hour sprint."
          items={["Earn Awards", "Compete with Peers", "Learn Advanced Technologies", "Collaborate on Real Impact"]}
          prize="$1000 Dollar Cash Prize"
          link="https://docs.google.com/forms/d/e/1FAIpQLSd-00l5aZpiVeXkBMgmnmCFe8jJdkT8gd7PCGqIHoND3LK9Rg/viewform"
          onBack={() => {
            setShowHackathonDetail(false);
            setTimeout(() => {
                const el = document.getElementById('hackathons-section');
                if (el) el.scrollIntoView({ behavior: 'instant' });
            }, 50);
          }}
          theme={currentView}
        />
        <GeminiAdvisor theme={currentView} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative overflow-x-hidden transition-colors duration-700 pt-24 md:pt-32 animate-in fade-in duration-1000 ${isSpeed ? 'bg-[#050a24]' : 'bg-wood-dark'}`}>
      <InfinityBackground />
      {/* Left side accent is fixed div */}
      <div className={`fixed left-0 top-0 bottom-0 w-1 md:w-3 z-[210] pointer-events-none transition-all duration-1000 shadow-glow ${isSpeed ? 'bg-green-500' : 'bg-primary'}`}></div>
      
      {renderNav()}

      <div className="px-6 md:px-20 max-w-full">
        {currentView === 'hacks' ? (
          <section className="py-12 md:py-24 animate-in fade-in duration-1000 overflow-visible" id="hackathons-section">
            <div className="max-w-7xl mx-auto">
              <div className="reveal text-center mb-24 md:mb-40 pt-16 md:pt-24 relative overflow-visible px-4">
                <div className="absolute inset-0 flex items-center justify-center z-[-1] pointer-events-none opacity-40">
                  <span className="material-symbols-outlined text-[300px] md:text-[800px] text-primary blur-xl leading-none">all_inclusive</span>
                </div>
                <h1 className="text-5xl md:text-[11rem] font-black text-white tracking-tighter leading-none font-display uppercase italic drop-shadow-2xl overflow-visible py-4 md:py-8 px-4 md:px-16">
                  SMART <br/><span className="text-gold px-4 md:px-16 inline-block overflow-visible">HACKS</span>
                </h1>
                <p className="text-secondary font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-[10px] md:text-sm mt-8 md:mt-12">Impact • Speed • Community</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center mb-24 md:mb-48 overflow-visible">
                <div className="reveal space-y-8 md:space-y-12 overflow-visible">
                  <h3 className="text-4xl md:text-7xl font-bold text-white font-serif leading-none uppercase px-4 md:px-16 overflow-visible py-2">Beyond <br/>Classrooms.</h3>
                  
                  {/* ULTRA GLASS IMPACT CARD */}
                  <div className="ultra-glass p-10 md:p-14 rounded-[50px] md:rounded-[70px] border border-white/5 shadow-2xl relative overflow-hidden group">
                    <div className="absolute -top-24 -right-24 size-64 bg-secondary/5 blur-[100px] rounded-full animate-float"></div>
                    <div className="flex items-center gap-8 mb-6 relative z-10">
                      <div className="text-7xl md:text-9xl font-black text-secondary tracking-tighter leading-none">100+</div>
                      <div className="flex flex-col text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] text-text-body/60 leading-tight">
                        <span>SINCE JAN</span>
                        <span>2026</span>
                      </div>
                    </div>
                    <h4 className="text-3xl md:text-5xl font-black text-white uppercase font-serif tracking-tighter relative z-10 leading-none">YOUTH EMPOWERED</h4>
                  </div>

                  {/* ULTRA GLASS REGISTRATION CARD */}
                  <div className="ultra-glass ultra-glass-border p-10 md:p-14 rounded-[50px] md:rounded-[70px] relative overflow-hidden hover:scale-[1.01] transition-transform duration-500">
                    <div className="flex justify-between items-center mb-10">
                       <div className="px-6 py-2.5 rounded-full border border-primary/40 text-[10px] md:text-[12px] font-black uppercase tracking-widest text-primary-hover bg-primary/10">Next Event</div>
                       <span className="material-symbols-outlined text-primary text-3xl md:text-4xl animate-bounce-slow">calendar_today</span>
                    </div>
                    <h4 className="text-4xl md:text-6xl font-black text-white uppercase font-serif mb-8 leading-[0.9] tracking-tighter">MARCH HACKATHON '26</h4>
                    <p className="text-base md:text-lg text-text-body font-bold mb-12 opacity-80 tracking-tight uppercase leading-snug">Start building impactful software projects in a 48-hour sprint.</p>
                    <button 
                      onClick={() => setShowHackathonDetail(true)}
                      className="px-12 py-6 rounded-[30px] btn-register text-lg active:scale-95"
                    >
                      Register
                    </button>
                  </div>
                </div>
                
                <div className="reveal relative h-[450px] md:h-[850px] rounded-[50px] md:rounded-[100px] overflow-hidden shadow-2xl border border-white/10 group">
                  <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover brightness-50 transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-wood-dark via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-10 md:bottom-20 left-8 md:left-16 right-8 md:right-16">
                    <h4 className="text-3xl md:text-6xl font-bold text-white font-serif uppercase leading-tight mb-4 px-4 overflow-visible tracking-tighter">December to <br/>January AI Challenge.</h4>
                    <p className="text-secondary font-black uppercase text-[10px] md:text-sm tracking-[0.4em]">Igniting Innovation Through Intelligence.</p>
                  </div>
                </div>
              </div>
              
              <section className="py-20 md:py-32 overflow-visible">
                <div className="max-w-7xl mx-auto px-4 overflow-visible">
                  <div className="reveal glass-card p-8 md:p-20 rounded-[40px] md:rounded-[80px] border border-white/10 shadow-2xl relative overflow-visible">
                    <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center overflow-visible">
                      <div className="flex flex-col gap-6 md:gap-8 overflow-visible">
                        <div className="text-[10px] font-black tracking-[0.3em] md:tracking-[0.5em] text-primary uppercase">Past Events</div>
                        <h2 className="text-3xl md:text-6xl font-bold text-white font-serif uppercase leading-tight px-4 md:px-16 overflow-visible py-2">December AI <br/><span className="text-gold px-4 md:px-16 inline-block overflow-visible italic">Challenge Results</span></h2>
                        <p className="text-base md:text-lg text-text-body font-bold border-l-4 border-secondary pl-4 md:pl-6 leading-relaxed uppercase tracking-tight">Check out the incredible submissions from our most recent competition. Students tackled real-world problems using ML and AI.</p>
                      </div>
                      <div className="relative group overflow-visible">
                        <div className="absolute -inset-4 bg-primary/10 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <img 
                          src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop" 
                          alt="December AI Challenge Collage"
                          className="relative w-full rounded-[24px] md:rounded-[40px] shadow-2xl border border-white/10 hover:scale-[1.02] transition-transform duration-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <InternshipsSection theme="hacks" />
              <BoardSection title="SMART HACKS BOARD" theme="hacks" />
            </div>
          </section>
        ) : (
          <>
            <header className="relative w-full min-h-[70vh] md:min-h-[90vh] flex items-center justify-center overflow-visible">
              <div className="relative z-20 text-center flex flex-col items-center gap-8 md:gap-12 px-4 overflow-visible">
                <div className="relative overflow-visible px-4 flex items-center justify-center">
                  <span className="material-symbols-outlined absolute top-[-15%] left-1/2 -translate-x-1/2 text-[450px] md:text-[1400px] text-green-500 opacity-[0.2] blur-[60px] md:blur-[100px] pointer-events-none leading-none z-[-2] transition-all duration-1000">speed</span>
                  <span className="material-symbols-outlined absolute top-[25%] left-1/2 -translate-x-1/2 text-[300px] md:text-[750px] text-blue-400 opacity-[0.35] blur-[15px] md:blur-[25px] pointer-events-none leading-none z-[-1] transition-all duration-700 animate-pulse-slow">speed</span>

                  <div className="reveal flex flex-col items-center overflow-visible">
                    <h1 className="text-7xl md:text-[11.5rem] font-black leading-none tracking-tight text-white drop-shadow-[0_0_40px_rgba(37,99,235,0.4)] font-serif uppercase py-2 md:py-4 px-4 overflow-visible relative">
                      SPEED CS
                    </h1>
                    <span className="text-green-gradient text-[2.8rem] md:text-[6.2rem] px-4 inline-block overflow-visible italic font-display font-black uppercase -mt-4 md:-mt-10 tracking-tighter scale-x-105">
                      ACADEMY
                    </span>
                  </div>
                </div>
                <p className="reveal text-xl md:text-4xl text-white font-bold glass-panel rounded-[32px] md:rounded-[50px] p-8 md:p-12 max-w-4xl border border-blue-400/30 shadow-2xl tracking-tight uppercase bg-blue-900/40 relative z-10 backdrop-blur-3xl transition-transform duration-700 hover:scale-[1.02]">
                  Coding for the youth. <br/><span className="text-green-gradient">Master software at light speed.</span>
                </p>
                <button onClick={() => document.getElementById('curriculum')?.scrollIntoView({behavior:'smooth'})} className="h-16 md:h-20 px-10 md:px-16 rounded-[30px] md:rounded-[40px] bg-blue-600 text-white hover:bg-green-600 font-black text-lg md:text-xl shadow-2xl transition-all duration-300 uppercase tracking-widest shadow-blue-900/40 relative z-10 active:scale-95">Enroll Free</button>
              </div>
            </header>

            {/* SPEED IMPACT CARDS */}
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 py-12 px-4 mb-24 relative z-10">
              <div className="bg-white/5 backdrop-blur-3xl p-10 md:p-14 rounded-[50px] md:rounded-[70px] border border-blue-400/30 shadow-2xl group hover:scale-[1.02] transition-all duration-500">
                <div className="flex items-center gap-8 mb-6">
                  <div className="text-7xl md:text-9xl font-black text-blue-400 tracking-tighter leading-none transition-colors duration-500 group-hover:text-green-400">120+</div>
                  <div className="flex flex-col text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] text-white/60 leading-tight">
                    <span>STUDENTS</span>
                    <span>IMPACTED</span>
                  </div>
                </div>
                <h4 className="text-2xl md:text-4xl font-black text-white uppercase font-serif tracking-tighter leading-none">JANUARY & AUGUST CODE CAMPS</h4>
              </div>

              <div className="bg-white/5 backdrop-blur-3xl p-10 md:p-14 rounded-[50px] md:rounded-[70px] border border-green-400/30 shadow-2xl group hover:scale-[1.02] transition-all duration-500 flex flex-col justify-center">
                <div className="flex items-center gap-6 mb-6">
                  <span className="material-symbols-outlined text-green-400 text-6xl group-hover:rotate-12 transition-transform duration-500">workspace_premium</span>
                  <div className="flex flex-col text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] text-white/60 leading-tight">
                    <span>HIGH LEVEL</span>
                    <span>EXPERIENCE</span>
                  </div>
                </div>
                <h4 className="text-2xl md:text-4xl font-black text-white uppercase font-serif tracking-tighter leading-[0.9]">QUALITY LEARNING</h4>
              </div>
            </div>

            <section className="py-20 md:py-32 relative z-10" id="curriculum">
              <div className="max-w-7xl mx-auto overflow-visible px-4">
                <div className="reveal text-center mb-16 md:mb-24 px-4 overflow-visible">
                  <h2 className="text-5xl md:text-[7rem] font-bold text-white uppercase tracking-tighter font-serif leading-[0.9] px-4 md:px-16 inline-block overflow-visible py-2">
                    CURRENT & <br />
                    <span className="text-green-gradient italic px-4 md:px-16 inline-block overflow-visible">UPCOMING</span> <br />
                    <span className="text-green-gradient italic px-4 md:px-16 inline-block overflow-visible">CLASSES</span>
                  </h2>
                  <p className="text-blue-400 font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mt-8 md:mt-10">Professional Grade Curriculum</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-8 md:gap-12 overflow-visible">
                  {COURSES.map(course => {
                    const shownTags = course.tags.slice(0, 3);
                    const remainingTags = course.tags.length - shownTags.length;
                    const isActive = course.status === 'active' && !course.isDisabled;
                    
                    return (
                      <div key={course.id} className={`reveal group p-8 md:p-10 rounded-[32px] glass-card border transition-all duration-500 flex flex-col shadow-xl overflow-visible relative ${course.isDisabled ? 'bg-[#1a1c2e]/40 border-white/5 grayscale opacity-60' : 'bg-[#1a1c2e]/80 border-white/10 hover:border-white/20 active:scale-[0.99]'}`}>
                        {isActive && (
                          <div className="absolute top-4 right-4 z-10">
                            <span className="px-4 py-1.5 rounded-full bg-[#22d3ee] text-[#050a24] text-[11px] font-black uppercase tracking-widest shadow-lg shadow-cyan-500/20">
                              Active
                            </span>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center mb-6 pr-12">
                          <div className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40">LEVEL {course.level}</div>
                          <div className="flex items-center gap-2 text-[11px] font-black text-white/40">
                             <span className="material-symbols-outlined text-[18px]">schedule</span>
                             {getTimeRemaining(course.startDate)}
                          </div>
                        </div>
                        
                        <h4 className={`text-2xl md:text-3xl font-bold text-white leading-tight mb-4 px-1 overflow-visible tracking-tight ${course.isDisabled ? 'text-white/60' : ''}`}>
                          {course.title}
                        </h4>
                        
                        <p className={`text-[13px] md:text-[14px] font-medium mb-8 opacity-60 flex-grow leading-relaxed tracking-tight ${course.isDisabled ? 'text-white/40' : 'text-blue-100'}`}>
                          {course.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-8 items-center">
                          {shownTags.map((tag, idx) => (
                            <span key={idx} className="px-4 py-2 rounded-xl bg-white/5 text-white/80 border border-white/10 text-[11px] font-black tracking-tight transition-colors duration-300 whitespace-nowrap">{tag}</span>
                          ))}
                          {remainingTags > 0 && (
                            <span className="text-[11px] font-bold text-white/30 ml-1">+{remainingTags} more</span>
                          )}
                        </div>
                        
                        <button 
                          onClick={() => !course.isDisabled && setSelectedCourse(course)} 
                          className={`w-fit h-14 px-10 rounded-[20px] font-black text-[14px] uppercase tracking-widest transition-all duration-300 flex items-center gap-3 ${course.isDisabled ? 'bg-white/5 text-white/20 border border-white/5 cursor-not-allowed' : 'bg-[#22d3ee] text-[#050a24] hover:brightness-110 shadow-lg shadow-cyan-500/30 active:scale-95'}`}
                        >
                          Join Class
                          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            <InternshipsSection theme="speed" />
            <BoardSection title="SPEED CS BOARD" theme="speed" />

            <section className="py-24 md:py-40 overflow-visible relative z-10" id="about">
              <div className="max-w-7xl mx-auto px-4 overflow-visible">
                <div className="reveal glass-card p-10 md:p-24 rounded-[40px] md:rounded-[80px] border border-blue-400/20 shadow-2xl relative overflow-visible text-center bg-white/5 transition-transform duration-700 hover:scale-[1.01]">
                  <div className="flex flex-col gap-8 md:gap-12 items-center max-w-4xl mx-auto overflow-visible">
                    <div className="text-[10px] font-black tracking-[0.3em] md:tracking-[0.5em] text-blue-400 uppercase">Academic Quality</div>
                    <h2 className="text-4xl md:text-[8rem] font-bold text-white font-serif uppercase leading-none overflow-visible py-2 px-4 md:px-16">Elite <br/><span className="text-green-gradient inline-block overflow-visible italic px-4 md:px-16">Learning</span></h2>
                    <p className="text-lg md:text-2xl text-blue-100 font-bold leading-relaxed uppercase tracking-tight max-w-2xl">SMART Hacks and Speed provide high level learning completely free. We believe education is the ultimate speed multiplier for human potential.</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        <section className={`py-20 md:py-32 border-y overflow-visible transition-colors duration-700 relative z-10 ${isSpeed ? 'border-blue-400/20' : 'border-white/10'}`}>
          <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-12 text-center px-4 overflow-visible">
            {['school', 'dynamic_form', 'public'].map((icon, i) => (
              <div key={i} className="reveal group flex flex-col items-center overflow-visible">
                <span className={`material-symbols-outlined text-5xl md:text-7xl mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500 leading-none ${isSpeed ? 'text-secondary' : 'text-primary'}`}>{icon}</span>
                <h4 className={`text-2xl md:text-3xl font-bold mb-4 md:mb-6 font-serif uppercase tracking-tight px-4 md:px-16 overflow-visible ${isSpeed ? 'text-white' : 'text-white'}`}>{['Learning', 'Bridging Gap', 'High Impact'][i]}</h4>
                <p className={`text-[12px] md:text-sm font-medium leading-relaxed uppercase tracking-wider ${isSpeed ? 'text-blue-100/70' : 'text-text-body/70'}`}>Elite technical mastery accessible to all.</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className={`transition-colors duration-1000 pt-20 md:pt-32 pb-12 md:pb-16 px-6 md:px-10 overflow-visible relative z-10 ${isSpeed ? 'bg-black text-white' : 'bg-black text-white'}`}>
        <div className="max-w-7xl mx-auto text-center opacity-80 overflow-visible">
          <div className="flex justify-center gap-6 md:gap-10 mb-8 md:mb-12 opacity-30">
             <div className="size-10 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-500 cursor-pointer"><SpeedLogo /></div>
             <div className="size-10 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-500 cursor-pointer"><HacksLogo /></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif italic mb-6 md:mb-8 uppercase tracking-widest px-4 md:px-16 inline-block overflow-visible py-2">Speed x Hacks</h2>
          <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em]">© 2026 SMART Hacks Academy</p>
        </div>
      </footer>

      {showContact && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6 transition-all duration-500 overflow-visible">
          <div className={`absolute inset-0 backdrop-blur-md transition-colors duration-500 ${isSpeed ? 'bg-blue-900/80' : 'bg-black/90'}`} onClick={() => setShowContact(false)}></div>
          <div className={`relative glass-card w-full max-w-xl p-8 md:p-16 rounded-[40px] md:rounded-[60px] border shadow-2xl text-center animate-in zoom-in-95 duration-500 overflow-visible ${isSpeed ? 'bg-[#050a24] border-white/10' : 'bg-wood-pale border-white/10'}`}>
            <button onClick={() => setShowContact(false)} className={`absolute top-6 md:top-8 right-6 md:right-8 transition-colors duration-300 ${isSpeed ? 'text-white/40 hover:text-white' : 'text-white/40 hover:text-white'} active:scale-95`}>
              <span className="material-symbols-outlined text-3xl md:text-4xl">close</span>
            </button>
            <h2 className={`text-3xl md:text-4xl font-bold mb-8 md:mb-12 font-serif uppercase tracking-tighter px-4 md:px-16 overflow-visible py-2 ${isSpeed ? 'text-white' : 'text-white'}`}>Contact Us</h2>
            <div className="space-y-8 md:space-y-12">
              <div className="flex flex-col items-center gap-3 md:gap-4">
                <p className={`text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] ${isSpeed ? 'text-green-400' : 'text-primary'}`}>Email</p>
                <a href="mailto:smarthacksorg@gmail.com" className={`text-lg md:text-2xl font-bold transition-all duration-300 underline underline-offset-8 decoration-2 break-all active:scale-95 ${isSpeed ? 'text-white hover:text-green-400 decoration-blue-400' : 'text-white hover:text-secondary decoration-primary'}`}>smarthacksorg@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      )}

      <GeminiAdvisor theme={currentView} />
    </div>
  );
};

export default App;
