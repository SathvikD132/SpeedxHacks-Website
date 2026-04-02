import React, { useEffect, useState, useCallback, useRef } from 'react';
import { STAFF, COURSES, Course } from './constants';
import GeminiAdvisor from './components/GeminiAdvisor';

const HackathonsLogo = () => (
  <span className="material-symbols-outlined text-primary text-2xl group-hover:scale-110 transition-transform duration-300">
    campaign
  </span>
);

const AcademyLogo = () => (
  <span className="material-symbols-outlined text-primary text-2xl group-hover:scale-110 transition-transform duration-300">
    school
  </span>
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
  return (
    <div className={`min-h-screen relative animate-fade-in pb-32 px-6 md:px-20 overflow-visible transition-colors duration-500 pt-24 md:pt-32 bg-background`}>
      <div className="max-w-7xl mx-auto py-12 relative z-10 overflow-visible">
        <button 
          onClick={onBack}
          className={`flex items-center gap-2 transition-all duration-300 mb-8 md:mb-12 group font-medium text-text-body hover:text-primary active:scale-95`}
        >
          <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Back to Main
        </button>

        <div className="grid lg:grid-cols-5 gap-10 md:gap-16 items-start overflow-visible">
          <div className="lg:col-span-3 overflow-visible">
            <div className="flex items-center gap-3 mb-6 overflow-visible">
              {icon && (
                <div className={`flex items-center justify-center text-primary`}>
                  <span className="material-symbols-outlined text-3xl md:text-4xl leading-none">{icon}</span>
                </div>
              )}
              {category && <span className={`text-[12px] md:text-sm font-semibold tracking-wider text-text-body uppercase leading-none`}>{category}</span>}
            </div>
            <h1 className={`text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight leading-tight text-text-main`}>
              {title}
            </h1>
            <p className={`text-lg md:text-xl mb-8 md:mb-12 leading-relaxed max-w-2xl font-normal text-text-body`}>
              {description}
            </p>
            {prize && (
              <div className={`mb-8 md:mb-12 flex items-center gap-4 bg-surface p-6 md:p-8 rounded-[24px] border border-gray-100 shadow-sm`}>
                <span className="material-symbols-outlined text-3xl md:text-4xl text-primary">payments</span>
                <div>
                  <p className={`text-[11px] font-semibold uppercase tracking-wider text-text-body`}>Main Prize</p>
                  <p className={`text-xl md:text-2xl font-bold text-text-main mt-1`}>{prize}</p>
                </div>
              </div>
            )}
            <div className={`glass-card p-8 md:p-10 `}>
              <h3 className={`text-xl md:text-2xl font-bold mb-8 font-display tracking-tight text-text-main`}>Key Objectives</h3>
              <div className="grid grid-cols-1 gap-4 md:gap-5">
                {items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 group/item">
                    <span className={`material-symbols-outlined text-[20px] flex-shrink-0 text-primary bg-primary/10 p-1.5 rounded-full`}>check</span>
                    <span className={`font-medium tracking-wide text-sm md:text-base text-text-body`}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className={`sticky top-32 glass-card p-8 md:p-12`}>
              <h2 className={`text-2xl md:text-3xl font-bold mb-3 font-display tracking-tight text-text-main`}>Join Now</h2>
              <p className={`font-normal mb-8 md:mb-10 leading-relaxed text-sm text-text-body`}>Secure your spot for the upcoming event. Limited space available!</p>
              <a 
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full block text-center btn-primary py-4 text-base md:text-lg mb-6`}
              >
                Registration Form
              </a>
              <p className={`text-xs text-center font-medium text-text-body/80`}>Open to all skill levels. Free entry.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BoardSection: React.FC<{ title: string; theme: 'hacks' | 'speed' }> = ({ title, theme }) => {
  return (
    <section className="py-20 md:py-24" id="staff">
      <div className="max-w-7xl mx-auto px-4">
        <div className="reveal text-center mb-16 md:mb-20 px-4 overflow-visible">
          <h2 className={`text-3xl md:text-5xl font-display font-bold tracking-tight text-text-main mb-4`}>
            {title}
          </h2>
          <p className={`font-medium tracking-wide text-sm md:text-base text-text-body`}>Leadership & Vision</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STAFF.map((member, idx) => (
            <div key={idx} className={`reveal glass-card p-8 md:p-10 text-center group`}>
              <div className="relative size-20 mx-auto mb-6 flex items-center justify-center bg-gray-50 rounded-full border border-gray-100 group-hover:bg-primary/5 transition-colors duration-300">
                <span className={`material-symbols-outlined text-3xl text-gray-400 group-hover:text-primary transition-colors duration-300`}>person</span>
              </div>
              <h4 className={`text-lg font-bold font-display mb-1 tracking-tight text-text-main`}>{member.name}</h4>
              <p className={`text-xs font-semibold uppercase tracking-wider text-primary`}>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InternshipsSection: React.FC<{ theme: 'hacks' | 'speed' }> = ({ theme }) => {
  const internshipLink = "https://docs.google.com/forms/d/e/1FAIpQLSdp_XZ1l4AJOnmyChApDzFlxdB0wrzAASjJyZ7PAv5Tnxe7vg/viewform?usp=publish-editor";
  
  return (
    <section className="py-20 md:py-24" id="internships">
      <div className="max-w-7xl mx-auto px-4">
        <div className="reveal text-center mb-16 md:mb-20 px-4">
          <h2 className={`text-3xl md:text-5xl font-display font-bold tracking-tight text-text-main mb-4`}>
            PROMETHEUS Internships
          </h2>
          <p className={`font-medium tracking-wide text-sm md:text-base text-text-body`}>Bridge to the Tech Industry</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
              className={`reveal glass-card p-8 md:p-10 flex flex-col group`}
            >
              <div className="mb-8 p-4 bg-gray-50 rounded-2xl w-fit group-hover:bg-primary/5 transition-colors duration-300">
                 <span className={`material-symbols-outlined text-3xl text-primary`}>{intern.icon}</span>
              </div>
              <h4 className={`text-xl font-bold font-display mb-3 tracking-tight text-text-main`}>{intern.title}</h4>
              <p className={`text-sm font-normal text-text-body mb-8 flex-grow leading-relaxed`}>{intern.desc}</p>
              <div className={`mt-auto flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-300`}>
                Apply Now <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const BackgroundMesh = () => (
  <div className="fixed inset-0 pointer-events-none z-[-5] overflow-hidden bg-background">
    <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] rounded-full bg-primary/5 blur-[120px] mix-blend-multiply"></div>
    <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-300/10 blur-[100px] mix-blend-multiply"></div>
  </div>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentView, setCurrentView] = useState<'hacks' | 'speed'>('hacks');
  const [showContact, setShowContact] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showHackathonDetail, setShowHackathonDetail] = useState(false);

  useEffect(() => {
    const handleScrollHeader = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) setScrolled(isScrolled);
    };

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
      const offset = 100;
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

  const renderNav = () => (
    <nav className={`fixed top-0 left-0 right-0 z-[200] w-full transition-all duration-300 px-6 md:px-12 flex items-center h-20 ${scrolled ? 'glass-panel h-16 shadow-soft' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        
        {/* Brand Label */}
        <div className="flex items-center gap-8">
          <div className="text-xl md:text-2xl font-display font-bold text-text-main flex items-center gap-2">
            <img src="/logo.png" alt="Prometheus Logo" className="w-10 h-10 object-contain" />
            Prometheus
          </div>
          
          {/* Switchers */}
          <div className="hidden md:flex items-center gap-2 bg-gray-100/50 p-1 rounded-full border border-gray-200">
            <button 
              onClick={() => handleSwitchView('hacks')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${currentView === 'hacks' ? 'bg-white shadow-sm text-text-main' : 'text-text-body hover:text-text-main'}`}
            >
              HACKATHONS
            </button>
            <button 
              onClick={() => handleSwitchView('speed')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${currentView === 'speed' ? 'bg-white shadow-sm text-text-main' : 'text-text-body hover:text-text-main'}`}
            >
              ACADEMY
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => navigateToSection('hacks', 'hackathons-section')}
              className="text-sm font-medium text-text-body hover:text-primary transition-colors duration-200"
            >
              Events
            </button>
            <button 
              onClick={() => navigateToSection('speed', 'curriculum')}
              className="text-sm font-medium text-text-body hover:text-primary transition-colors duration-200"
            >
              Classes
            </button>
            <button 
              onClick={() => scrollToSection('internships')}
              className="text-sm font-medium text-text-body hover:text-primary transition-colors duration-200"
            >
              Internships
            </button>
          </div>
          <button onClick={() => setShowContact(true)} className="btn-primary text-sm py-2 px-5 hidden sm:block">Let's Talk</button>
          {/* Mobile Switchers */}
          <div className="md:hidden flex items-center gap-2">
             <button onClick={() => handleSwitchView(currentView === 'hacks' ? 'speed' : 'hacks')} className="btn-secondary text-xs py-1.5 px-3">
               Switch to {currentView === 'hacks' ? 'Academy' : 'Hacks'}
             </button>
          </div>
        </div>
      </div>
    </nav>
  );

  if (selectedCourse) {
    return (
      <div className={`min-h-screen relative overflow-x-hidden bg-background`}>
        <BackgroundMesh />
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
      <div className={`min-h-screen relative overflow-x-hidden bg-background`}>
        <BackgroundMesh />
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
    <div className={`min-h-screen relative overflow-x-hidden pt-24 md:pt-32 animate-fade-in bg-background`}>
      <BackgroundMesh />
      
      {renderNav()}

      <div className="px-6 md:px-12 max-w-full">
        {currentView === 'hacks' ? (
          <section className="py-12 md:py-20 animate-fade-in overflow-visible" id="hackathons-section">
            <div className="max-w-7xl mx-auto">
              <div className="reveal text-center mb-20 md:mb-32 pt-10 md:pt-16 relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest mb-6">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  Impact • Speed • Community
                </div>
                <h1 className="text-5xl md:text-[6rem] lg:text-[7rem] font-bold text-text-main tracking-tight font-display leading-[1.1] max-w-5xl mx-auto">
                  Build the future at <span className="text-primary">Prometheus Hackathons.</span>
                </h1>
                <p className="text-lg md:text-xl text-text-body font-medium mt-8 max-w-2xl mx-auto leading-relaxed">
                  Join hundreds of youth innovators shaping the next wave of technology. Participate in high-impact sprints and showcase your talent.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center mb-20 md:mb-32">
                <div className="reveal space-y-8">
                  <h3 className="text-3xl md:text-5xl font-bold text-text-main font-display leading-tight tracking-tight">Beyond Classrooms.</h3>
                  
                  {/* METRIC CARD */}
                  <div className="glass-card p-10 md:p-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full transition-transform duration-500 group-hover:scale-110"></div>
                    <div className="flex items-center gap-6 mb-4 relative z-10">
                      <div className="text-6xl md:text-7xl font-bold text-text-main font-display tracking-tighter leading-none">100+</div>
                      <div className="flex flex-col text-[11px] font-bold text-text-body tracking-wider">
                        <span>SINCE JAN</span>
                        <span>2026</span>
                      </div>
                    </div>
                    <h4 className="text-xl md:text-2xl font-semibold text-text-main tracking-tight relative z-10">Youth Empowered</h4>
                  </div>

                  {/* EVENT CARD */}
                  <div className="glass-card p-10 md:p-12 border-l-4 border-l-primary relative overflow-hidden">
                    <div className="flex justify-between items-center mb-8">
                       <div className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary">Next Event</div>
                       <span className="material-symbols-outlined text-gray-300 text-3xl">calendar_today</span>
                    </div>
                    <h4 className="text-3xl md:text-4xl font-bold text-text-main font-display mb-4 tracking-tight">MARCH HACKATHON '26</h4>
                    <p className="text-base text-text-body mb-8 leading-relaxed">Start building impactful software projects in a 48-hour sprint.</p>
                    <button 
                      onClick={() => setShowHackathonDetail(true)}
                      className="btn-primary w-fit"
                    >
                      View Details
                    </button>
                  </div>
                </div>
                
                <div className="reveal relative h-[450px] md:h-[750px] rounded-[32px] overflow-hidden shadow-card group">
                  <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Hackathon Event" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-10 left-10 right-10">
                    <h4 className="text-3xl md:text-5xl font-bold text-white font-display leading-tight mb-3">December AI Challenge.</h4>
                    <p className="text-white/80 font-medium text-sm md:text-base">Igniting Innovation Through Intelligence.</p>
                  </div>
                </div>
              </div>
              
              <section className="py-16 md:py-24">
                <div className="reveal glass-card p-10 md:p-16">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col gap-6">
                      <div className="text-xs font-bold tracking-widest text-primary uppercase">Past Events</div>
                      <h2 className="text-3xl md:text-5xl font-bold text-text-main font-display leading-tight tracking-tight">December AI Challenge Results</h2>
                      <p className="text-base text-text-body font-medium leading-relaxed">
                        Check out the incredible submissions from our most recent competition. Students tackled real-world problems using ML and AI to deliver impactful solutions.
                      </p>
                    </div>
                    <div className="relative group">
                      <div className="absolute -inset-4 bg-primary/5 rounded-[32px] transition-colors duration-500 group-hover:bg-primary/10"></div>
                      <img 
                        src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop" 
                        alt="December AI Challenge Collage"
                        className="relative w-full rounded-[24px] shadow-soft border border-gray-100 hover:-translate-y-1 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <InternshipsSection theme="hacks" />
              <BoardSection title="Prometheus Board" theme="hacks" />
            </div>
          </section>
        ) : (
          <>
            <header className="relative w-full min-h-[60vh] md:min-h-[80vh] flex flex-col items-center justify-center text-center">
              <div className="reveal max-w-4xl mx-auto px-4 mt-12 md:mt-0">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest mb-8">
                  <span className="material-symbols-outlined text-[14px]">school</span>
                  Prometheus Academy
                </div>
                <h1 className="text-5xl md:text-[6.5rem] font-bold text-text-main tracking-tight leading-[1.05] font-display mb-8">
                  Master software at <span className="text-primary">light speed.</span>
                </h1>
                <p className="text-lg md:text-xl text-text-body font-medium leading-relaxed max-w-2xl mx-auto mb-10">
                  Professional grade computer science curriculum for youth learners. Completely free. Education is the ultimate multiplier for human potential.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button onClick={() => document.getElementById('curriculum')?.scrollIntoView({behavior:'smooth'})} className="btn-primary text-base px-8 py-3.5">
                    View Course Catalog
                  </button>
                  <button onClick={() => setShowContact(true)} className="btn-secondary text-base px-8 py-3.5">
                    Contact Admissions
                  </button>
                </div>
              </div>
            </header>

            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 py-10 px-4 mb-20 relative z-10">
              <div className="glass-card p-10 md:p-12 hover:-translate-y-2">
                <div className="flex items-center gap-6 mb-6">
                  <div className="text-6xl md:text-7xl font-bold text-primary font-display tracking-tighter leading-none">120+</div>
                  <div className="flex flex-col text-[11px] font-bold text-text-body tracking-wider uppercase">
                    <span>Students</span>
                    <span>Impacted</span>
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-text-main font-display tracking-tight">January & August Code Camps</h4>
              </div>

              <div className="glass-card p-10 md:p-12 border-t-4 border-t-primary hover:-translate-y-2 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <span className="material-symbols-outlined text-primary text-5xl bg-primary/5 p-3 rounded-2xl">workspace_premium</span>
                  <div className="flex flex-col text-[11px] font-bold text-text-body tracking-wider uppercase">
                    <span>Elite Level</span>
                    <span>Experience</span>
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-text-main font-display tracking-tight">Enterprise Quality Learning</h4>
              </div>
            </div>

            <section className="py-20" id="curriculum">
              <div className="max-w-7xl mx-auto px-4">
                <div className="reveal mb-16 px-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-text-main font-display tracking-tight leading-tight">
                      Current & Upcoming <br /> Course Catalog
                    </h2>
                  </div>
                  <p className="text-text-body font-medium text-base">Professional Grade Curriculum</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {COURSES.map(course => {
                    const shownTags = course.tags.slice(0, 2);
                    const remainingTags = course.tags.length - shownTags.length;
                    const isActive = course.status === 'active' && !course.isDisabled;
                    
                    return (
                      <div key={course.id} className={`reveal group p-8 rounded-[24px] bg-surface border border-gray-100 flex flex-col shadow-sm hover:shadow-hover hover:-translate-y-1 transition-all duration-300 relative ${course.isDisabled ? 'opacity-60 grayscale' : ''}`}>
                        {isActive && (
                          <div className="absolute top-4 right-4 z-10">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                              Active
                            </span>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center mb-5">
                          <div className="text-[10px] font-bold text-text-body uppercase tracking-wider">LEVEL {course.level}</div>
                          <div className="flex items-center gap-1.5 text-[11px] font-medium text-text-body">
                             <span className="material-symbols-outlined text-[16px]">schedule</span>
                             {getTimeRemaining(course.startDate)}
                          </div>
                        </div>
                        
                        <h4 className={`text-xl font-bold text-text-main font-display leading-tight mb-3`}>
                          {course.title}
                        </h4>
                        
                        <p className={`text-sm text-text-body mb-6 flex-grow leading-relaxed`}>
                          {course.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-8 items-center">
                          {shownTags.map((tag, idx) => (
                            <span key={idx} className="px-3 py-1.5 rounded-lg bg-gray-50 text-text-main text-[11px] font-medium border border-gray-100">{tag}</span>
                          ))}
                          {remainingTags > 0 && (
                            <span className="text-[11px] font-medium text-text-body ml-1">+{remainingTags} more</span>
                          )}
                        </div>
                        
                        <button 
                          onClick={() => !course.isDisabled && setSelectedCourse(course)} 
                          className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${course.isDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-dark active:scale-[0.98]'}`}
                        >
                          Join Class
                          {!course.isDisabled && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            <InternshipsSection theme="speed" />
            <BoardSection title="Prometheus Board" theme="speed" />
          </>
        )}

        <section className={`py-20 md:py-24 border-t border-gray-200 mt-10`}>
          <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-center px-4">
            {['school', 'dynamic_form', 'public'].map((icon, i) => (
              <div key={i} className="reveal group flex flex-col items-center">
                <span className={`material-symbols-outlined text-4xl mb-5 text-text-body group-hover:text-primary transition-colors duration-300`}>{icon}</span>
                <h4 className={`text-lg font-bold mb-2 font-display text-text-main`}>{['Commitment to Learning', 'Bridging the Gap', 'High Impact Scale'][i]}</h4>
                <p className={`text-sm text-text-body leading-relaxed max-w-xs mx-auto`}>Elite technical mastery made wonderfully accessible.</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className={`bg-white border-t border-gray-200 pt-16 pb-12 px-6 mt-10`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center gap-6 mb-8 text-text-main">
            <img src="/logo.png" alt="Prometheus Logo" className="w-16 h-16 object-contain" />
          </div>
          <h2 className="text-2xl font-bold font-display mb-4 text-text-main">Prometheus</h2>
          <p className="text-sm text-text-body mb-8">Empowering youth in technology and computer science.</p>
          <p className="text-xs font-semibold uppercase tracking-widest text-text-body/60">© 2026 Prometheus Education. All rights reserved.</p>
        </div>
      </footer>

      {showContact && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 transition-all duration-300">
          <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-colors duration-300`} onClick={() => setShowContact(false)}></div>
          <div className={`relative bg-surface w-full max-w-lg p-10 rounded-[32px] shadow-2xl animate-fade-in`}>
            <button onClick={() => setShowContact(false)} className={`absolute top-6 right-6 text-gray-400 hover:text-text-main transition-colors duration-300 active:scale-95`}>
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
            <h2 className={`text-3xl font-bold mb-8 font-display text-text-main`}>Let's Talk</h2>
            <div className="space-y-8">
              <div className="flex flex-col gap-2">
                <p className={`text-[11px] font-bold uppercase tracking-wider text-text-body`}>Email Address</p>
                <a href="mailto:contact@prometheus.edu" className={`text-lg font-medium text-text-main hover:text-primary transition-colors duration-300`}>contact@prometheus.edu</a>
              </div>
              <div className="flex flex-col gap-2">
                <p className={`text-[11px] font-bold uppercase tracking-wider text-text-body`}>Partnerships</p>
                <a href="mailto:partners@prometheus.edu" className={`text-lg font-medium text-text-main hover:text-primary transition-colors duration-300`}>partners@prometheus.edu</a>
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
