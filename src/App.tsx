/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, RefObject, FormEvent } from 'react';
import { TEAMS, MATCHES, SPONSORS, VIDEOS } from './data';
import { Team, Match, Video } from './types';
import { TeamLogo } from './components/TeamLogo';
import { PlayerSpotlight } from './components/PlayerSpotlight';
import { SiteIntro } from './components/SiteIntro';
import { SponsorLogo } from './components/SponsorLogo';
import { MatchCard } from './components/MatchCard';
import { TeamDetailModal } from './components/TeamDetailModal';
import { VideoSimulationPlayer } from './components/VideoSimulationPlayer';
import { OverlayPanel } from './components/OverlayPanel';
import PerfectVideoPlayer from './components/PerfectVideoPlayer';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  ChevronLeft, 
  Trophy, 
  Calendar, 
  Info, 
  ExternalLink, 
  Menu, 
  X, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Youtube,
  Send,
  CheckCircle2,
  AlertCircle,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// @ts-ignore
import championsTrophyImg from './assets/images/champions_trophy_1780658255360.png';
// @ts-ignore
import vipGuestsImg from './assets/images/vip_guests_1780658272891.png';
// @ts-ignore
import exhibitionMatchImg from './assets/images/jcl_cricket_match_1780733167283.png';
// @ts-ignore
import jclLogoImg from './assets/images/jcl_royal_logo_1780737202442.png';

const HERO_SLIDES = [
  {
    image: championsTrophyImg,
    tagline: 'JCL INAUGURAL SEASON 2026',
    title: 'Jaat Cricket League 2026',
    subtitle: 'Nurturing and promoting rising cricket talent from across India. A world-class sports ecosystem launched under the leadership of SNEXGEN Sports Foundation.'
  },
  {
    image: vipGuestsImg,
    tagline: 'FOUNDER & LEADERSHIP CHRONICLES',
    title: 'Founder Akshay Khrinta',
    subtitle: 'Spearheading regional sports development under the SNEXGEN Sports Foundation by delivering professional coaching programs and competitive tournament platforms directly to talented grassroot youth.'
  },
  {
    image: exhibitionMatchImg,
    tagline: 'EMPOWERING YOUTH THROUGH SPORTS',
    title: 'SNEXGEN Sports Foundation',
    subtitle: 'Committed to discipline, fitness, and building a drug-free healthy youth ecosystem by discovering talent and encouraging grassroots cricket participation.'
  }
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'HOME' | 'MATCHES'>('HOME');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedOverlayTab, setSelectedOverlayTab] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'teams' | 'matches' | 'stats' | 'sponsors' | 'about' | 'contact'>('home');
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactError, setContactError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [videoCategory, setVideoCategory] = useState<string>('All');


  // Sourced lists
  const internationalTeams = TEAMS.filter(t => t.type === 'international');
  const domesticTeams = TEAMS.filter(t => t.type === 'domestic');

  // Carousel slider refs for smooth scrolling
  const intlSliderRef = useRef<HTMLDivElement>(null);
  const domSliderRef = useRef<HTMLDivElement>(null);

  // Auto scroll to active sections
  const scrollToSection = (id: string, tabName: any) => {
    setActiveTab(tabName);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Keep track of scroll positions to change active tab in nav
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home-section', 'teams-section', 'matches-section', 'stats-section', 'sponsors-section', 'about-section', 'contact-section'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            const tab = section.replace('-section', '') as any;
            setActiveTab(tab);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleCarouselScroll = (ref: RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.75 : scrollLeft + clientWidth * 0.75;
      ref.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setContactError('Please fill in all required fields.');
      return;
    }
    setContactError('');
    setContactSuccess(true);
    setContactForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setContactSuccess(false), 5000);
  };

  // Calculate league standings ordered by points
  const sortedStandings = [...TEAMS].sort((a, b) => b.stats.points - a.stats.points);

  if (currentScreen === 'MATCHES') {
    return (
      <PerfectVideoPlayer 
        onBackToHome={() => {
          setSelectedVideo(null);
          setCurrentScreen('HOME');
        }} 
        selectedVideoId={selectedVideo?.id}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#07031e] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-900 overflow-x-hidden antialiased">
      {/* 1. Header/Nav Bar */}
      <header className="sticky top-0 z-50 bg-[#0d0935]/95 backdrop-blur-md border-b border-indigo-950/60 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Logo on Left */}
          <div className="flex items-center space-x-3 cursor-pointer select-none group" onClick={() => scrollToSection('home-section', 'home')}>
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-yellow-400 via-amber-500 to-blue-600 flex items-center justify-center p-0.5 shadow-lg shadow-yellow-500/10 group-hover:shadow-yellow-500/20 group-hover:scale-105 transition-all duration-300">
              <img 
                src={jclLogoImg} 
                alt="Jaat Cricket League Logo" 
                className="w-full h-full rounded-[10px] object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-sans font-black text-white text-base sm:text-lg tracking-tight leading-none group-hover:text-yellow-400 transition-colors">JAAT CRICKET</span>
              <span className="text-[10px] text-yellow-400 font-bold tracking-widest leading-none mt-1 uppercase">LEAGUE</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-wrap items-center justify-center gap-x-5 gap-y-2 relative z-50">
            {(['home', 'teams', 'matches', 'stats', 'sponsors', 'about us', 'contact'] as const).map((tab) => {
              const tabId = tab === 'about us' ? 'about' : tab;
              const sectionId = `${tabId}-section`;
              const isSelected = activeTab === tabId;
              return (
                <button
                  key={tab}
                  onClick={() => scrollToSection(sectionId, tabId)}
                  className={`text-xs font-bold tracking-widest uppercase cursor-pointer py-1.5 px-1 relative transition-all duration-300 z-50 hover:text-cyan-400 ${
                    isSelected ? 'text-cyan-400 font-extrabold' : 'text-slate-300 hover:scale-105'
                  }`}
                >
                  <span className="relative z-55 pointer-events-auto">
                    {tab === 'about us' ? 'about founder' : tab}
                  </span>
                  {isSelected && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* WATCH VIDEOS Playback Trigger Button */}
          <button 
            type="button"
            onClick={() => setCurrentScreen('MATCHES')}
            className="hidden md:flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-[11px] font-black tracking-widest uppercase transition-all duration-350 shadow-lg shadow-red-650/15 hover:shadow-red-500/30 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>WATCH VIDEOS ▷</span>
          </button>

          {/* Mobile hamburger icon */}
          <div className="md:hidden flex items-center justify-end">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-[#07031e]/60 transition-all duration-300 border border-transparent hover:border-indigo-950/40 cursor-pointer"
            >
              <Menu 
                size={24} 
                style={{ 
                  paddingLeft: '-4px', 
                  paddingTop: '-4px', 
                  width: '30px', 
                  height: '29px', 
                  marginLeft: '-2px', 
                  textAlign: 'justify', 
                  fontWeight: 'bold', 
                  fontFamily: 'Georgia', 
                  lineHeight: '27px', 
                  borderColor: '#e63714', 
                  borderStyle: 'groove', 
                  borderWidth: '3px', 
                  backgroundColor: '#09043b' 
                }} 
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer - Sliding from Right Side */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm md:hidden"
              />

              {/* Sidebar Content */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 26, stiffness: 190 }}
                className="fixed top-0 right-0 bottom-0 z-50 w-76 max-w-[85vw] bg-[#0d0935] shadow-2xl border-l border-indigo-950/40 p-6 flex flex-col md:hidden"
              >
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-indigo-950/40">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 p-0.5 shadow-md shadow-yellow-500/10">
                      <img 
                        src={jclLogoImg} 
                        alt="JCL Logo" 
                        className="w-full h-full rounded-[6px] object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-extrabold text-white text-xs tracking-wider font-sans uppercase">JCL NAVIGATOR</span>
                      <span className="text-[8px] text-yellow-400 font-bold tracking-widest uppercase">Jaat Cricket League</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900/40 transition-colors border border-transparent hover:border-indigo-950/40 cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-col space-y-3">
                  {(['home', 'teams', 'matches', 'stats', 'sponsors', 'about us', 'contact'] as const).map((tab, idx) => {
                    const tabId = tab === 'about us' ? 'about' : tab;
                    const sectionId = `${tabId}-section`;
                    const isSelected = activeTab === tabId;
                    return (
                      <motion.button
                        key={tab}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        onClick={() => {
                          setSelectedOverlayTab(tab);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl font-bold tracking-widest text-xs uppercase transition-all duration-300 border cursor-pointer ${
                          isSelected 
                            ? 'bg-gradient-to-r from-cyan-500/10 to-indigo-500/5 text-cyan-400 border-indigo-500/20 shadow-md shadow-cyan-500/5' 
                            : 'text-slate-300 hover:bg-slate-900/20 hover:text-white border-transparent'
                        }`}
                      >
                        {tab === 'about us' ? 'about founder' : tab}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="mt-auto pt-6 border-t border-indigo-950/40 flex flex-col items-center">
                  <span className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase">JAAT CRICKET LEAGUE</span>
                  <span className="text-[8px] text-indigo-500/60 font-mono mt-1">SNEXGEN SPORTS FOUNDATION PARTNERSHIP</span>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedOverlayTab !== null && (
            <OverlayPanel 
              isOpen={selectedOverlayTab !== null} 
              onClose={() => setSelectedOverlayTab(null)} 
              tabName={selectedOverlayTab} 
            />
          )}
        </AnimatePresence>
      </header>

      {/* 2. Hero Section Content - Featuring a Responsive 16:9 Carousel Image Slider */}
      <section id="home-section" className="relative bg-[#07031e] py-10 md:py-16 border-b border-indigo-950/80">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-gradient-to-tr from-cyan-500/10 to-indigo-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main 16:9 Carousel Wrapper */}
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-indigo-500/20 shadow-2xl bg-slate-950 group">
            
            {/* Active Class Image Slider (Uses motion for slick transitions) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Image background with modern high-performance automatic cinematic zoom on load */}
                <motion.img 
                  key={`slide-img-${currentSlide}`}
                  src={HERO_SLIDES[currentSlide].image} 
                  alt={HERO_SLIDES[currentSlide].title} 
                  initial={{ scale: 1, filter: "brightness(0.35) saturate(1.2)" }}
                  animate={{ scale: 1.06 }}
                  transition={{ duration: 7, ease: "easeOut" }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Advanced Gradient Scrim Layer for perfect text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/25" />
                
                {/* Slide content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 lg:p-16 text-left">
                  <div className="max-w-3xl space-y-3 sm:space-y-4">
                    {/* Live Badge and Slanted Category Accent */}
                    <div className="inline-flex items-center space-x-2 bg-yellow-500 text-slate-950 font-black tracking-widest text-[9px] sm:text-xs uppercase px-3 py-1 rounded transform -skew-x-12 shadow-md">
                      <span className="inline-block transform skew-x-12">{HERO_SLIDES[currentSlide].tagline}</span>
                    </div>

                    <h2 className="text-xl sm:text-4xl lg:text-5xl font-sans font-black text-white leading-tight uppercase tracking-tight">
                      {HERO_SLIDES[currentSlide].title}
                    </h2>
                    
                    <p className="text-xs sm:text-base lg:text-lg text-slate-200 font-medium leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-none">
                      {HERO_SLIDES[currentSlide].subtitle}
                    </p>

                    {/* CTAs */}
                    <div className="flex items-center gap-3 pt-2 sm:pt-4">
                      <button
                        onClick={() => scrollToSection('teams-section', 'teams')}
                        className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-yellow-500 via-amber-500 to-amber-600 rounded-xl text-[10px] sm:text-xs font-black tracking-widest text-slate-950 hover:scale-105 transition-all shadow-lg shadow-yellow-500/10 uppercase cursor-pointer"
                      >
                        Browse Squads
                      </button>
                      <button
                        onClick={() => scrollToSection('matches-section', 'matches')}
                        className="px-4 py-2 sm:px-6 sm:py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-[10px] sm:text-xs font-black tracking-widest text-slate-200 hover:bg-slate-800 hover:text-white hover:scale-105 transition-all uppercase cursor-pointer"
                      >
                        Schedule
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Navigation Arrows - Hidden on touch, revealed on desktop hover */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white hover:bg-yellow-500 hover:text-slate-950 transition opacity-0 group-hover:opacity-100 duration-300 z-20 cursor-pointer hidden sm:block"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white hover:bg-yellow-500 hover:text-slate-950 transition opacity-0 group-hover:opacity-100 duration-300 z-20 cursor-pointer hidden sm:block"
            >
              <ChevronRight size={20} />
            </button>

            {/* Slide Indicators / Navigation Dots */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-20">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? 'w-8 bg-yellow-400' : 'w-2 bg-slate-500/50 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Mini Scoreboard Widget - Directly underneath hero for extreme value */}
          <div className="mt-14 relative z-35 bg-[#0a0729]/40 border border-indigo-950/40 p-5 sm:p-6 rounded-3xl shadow-lg backdrop-blur-sm pointer-events-auto">
            <div className="flex items-center space-x-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <h3 className="text-xs font-extrabold text-[#22D3EE] font-mono uppercase tracking-widest">LIVE MATCH CENTER PREVIEW</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MATCHES.slice(0, 2).map((m) => (
                <MatchCard key={m.id} match={m} onClickTeam={(teamId) => {
                  const team = TEAMS.find(t => t.id === teamId);
                  if (team) setSelectedTeam(team);
                }} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Site Introduction Section */}
      <SiteIntro />


      {/* 3. Teams List Page Section */}
      <section id="teams-section" className="bg-[#0b062b] border-y border-indigo-950/80 py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#facc15] tracking-tight font-sans uppercase">JCL CHAMPIONSHIP SQUADS</h2>
            <p className="text-slate-400 text-sm md:text-base tracking-wide mt-2">The elite forces competing for the premier JCL 2026 Title.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {TEAMS.map((team) => (
              <div 
                key={team.id}
                onClick={() => setSelectedTeam(team)}
                className="group cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-slate-900/40 rounded-3xl border border-slate-800/80 p-5 flex flex-col items-center text-center group-hover:border-yellow-550/40 group-hover:bg-slate-900/60 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.06)] h-full transition-all duration-300">
                  <div className={`w-28 h-28 rounded-2xl bg-gradient-to-br ${team.logoColor} p-1 mb-4 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300`}>
                    <div className="bg-slate-950 rounded-xl w-full h-full flex items-center justify-center p-2.5">
                      <TeamLogo seed={team.logoSvgSeed} size={84} />
                    </div>
                  </div>
                  <h3 className="font-extrabold text-base text-white group-hover:text-yellow-400 transition-colors tracking-tight mt-1 truncate max-w-full uppercase">
                    {team.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono tracking-wider font-semibold mt-1">
                    {team.tagline}
                  </p>
                  
                  {/* View Details Hover Reveal */}
                  <div className="mt-auto pt-4 flex items-center space-x-1 text-xs text-yellow-500 opacity-60 group-hover:opacity-100 transition-opacity duration-200">
                    <span>Explore Squad</span>
                    <ChevronRight size={14} className="transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Player Spotlight Section */}
      <PlayerSpotlight />

      {/* 4. Matches Section */}
      <section id="matches-section" className="bg-[#07031e] py-24 border-b border-indigo-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase">Featured Matches</h2>
            <p className="text-slate-400 text-sm md:text-base mt-2">Catch the high stakes action live from the stadium floor.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MATCHES.map((match) => (
              <MatchCard 
                key={match.id} 
                match={match} 
                onClickTeam={(teamId) => {
                  const team = TEAMS.find(t => t.id === teamId);
                  if (team) setSelectedTeam(team);
                }} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Video section with 'Videos' tab grid layout */}
      <section id="videos-section" className="bg-[#0c0731] py-24 border-b border-indigo-950/80 relative">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gradient-to-bl from-cyan-500/5 to-transparent blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase">Videos & Highlights</h2>
            <p className="text-slate-400 text-sm md:text-base mt-2">Relive high-energy moments, training drills, and full game replays.</p>
          </div>

          {/* Videos Grid Tabs Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {['All', 'Highlights', 'Match Replays', 'Behind The Scenes', 'Masterclass'].map((cat) => (
              <button
                key={cat}
                onClick={() => setVideoCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 pointer-events-auto cursor-pointer ${
                  (cat === videoCategory)
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/10 scale-105'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Responsive Grid Setup (Desktop 3, Mobile 1 stack) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {VIDEOS
              .filter(v => videoCategory === 'All' || v.category === videoCategory)
              .map((video) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  key={video.id}
                  onClick={() => {
                    setSelectedVideo(video);
                    setCurrentScreen('MATCHES');
                  }}
                  className="bg-slate-900/30 rounded-2xl border border-slate-850 overflow-hidden cursor-pointer group hover:border-yellow-500/30 hover:bg-slate-900/55 hover:shadow-[0_0_30px_rgba(234,179,8,0.05)] transition-all duration-300"
                >
                  {/* Thumbnail Wrapper (16:9 ratio) */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-[0.7] saturate-[1.1]"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    {/* Play Button Overlay (Centered & Glowing) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-slate-950/85 group-hover:bg-yellow-400 border border-white/10 group-hover:border-yellow-400 flex items-center justify-center transition-all duration-300 scale-95 group-hover:scale-110 shadow-lg shadow-slate-950/50">
                        <Play size={20} className="text-white group-hover:text-slate-950 fill-current translate-x-0.5 transition-colors" />
                      </div>
                    </div>

                    {/* Duration pill (bottom right) */}
                    <span className="absolute bottom-3 right-3 px-2 py-1 bg-slate-950/90 text-[10px] font-mono font-bold text-slate-300 rounded-md border border-slate-850">
                      {video.duration}
                    </span>

                    {/* Category Label (top left slanted) */}
                    <span className="absolute top-3 left-3 bg-yellow-500 text-slate-950 font-black text-[9px] tracking-widest uppercase px-2 py-0.5 rounded transform -skew-x-12">
                      <span className="block transform skew-x-12">{video.category}</span>
                    </span>
                  </div>

                  {/* Text Descriptors */}
                  <div className="p-5">
                    <div className="flex items-center space-x-2 text-[10px] font-mono font-semibold text-cyan-400 uppercase tracking-widest mb-1.5">
                      <span>{video.views}</span>
                      <span>•</span>
                      <span>{video.date}</span>
                    </div>
                    <h3 className="font-extrabold text-white text-base tracking-tight leading-snug group-hover:text-yellow-400 transition-colors line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-slate-400 text-xs mt-2 leading-relaxed line-clamp-2 font-medium">
                      {video.description}
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>

        </div>
      </section>

      {/* 5. Statistics Standings Standings Section */}
      <section id="stats-section" className="bg-[#0b062b] py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-gradient-to-tr from-cyan-500/5 to-transparent blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase">League Leaderboard & Stats</h2>
            <p className="text-slate-400 text-sm md:text-base mt-2">Latest aggregate numbers and official team standings.</p>
          </div>

          {/* Golden League Digital Indicators (3 columns on desktop, 1 column on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
            {/* digital footprints counter card */}
            <div className="bg-slate-900/40 rounded-3xl p-8 border border-slate-800/80 hover:border-yellow-500/30 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-2">ENGAGEMENT IMPACT</div>
              <div className="text-4xl lg:text-5xl font-black text-white group-hover:text-yellow-400 transition-colors font-mono tracking-tight leading-none mb-3">
                +80M
              </div>
              <div className="text-sm font-extrabold text-slate-100 uppercase tracking-wide">Digital Footprints</div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">Cumulative seasonal fan interactions, video playbacks, and search trends across major streaming networks.</p>
              <div className="h-1 w-full bg-slate-950 mt-4 overflow-hidden rounded-full">
                <div className="h-full w-4/5 bg-gradient-to-r from-cyan-400 to-yellow-400 rounded-full" />
              </div>
            </div>

            {/* peak viewership counter card */}
            <div className="bg-slate-900/40 rounded-3xl p-8 border border-slate-800/80 hover:border-yellow-500/30 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="text-xs font-mono font-bold tracking-widest text-[#22D3EE] uppercase mb-2">BROADCAST AUDIENCE</div>
              <div className="text-4xl lg:text-5xl font-black text-white group-hover:text-[#22D3EE] transition-colors font-mono tracking-tight leading-none mb-3">
                +35M
              </div>
              <div className="text-sm font-extrabold text-slate-100 uppercase tracking-wide">Viewership</div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">High fidelity streaming coverage, television broadcasts, and local community view events during Season 5 championships.</p>
              <div className="h-1 w-full bg-slate-950 mt-4 overflow-hidden rounded-full">
                <div className="h-full w-[70%] bg-gradient-to-r from-yellow-400 to-cyan-400 rounded-full" />
              </div>
            </div>

            {/* JCL Matches counter card */}
            <div className="bg-slate-900/40 rounded-3xl p-8 border border-slate-800/80 hover:border-yellow-500/30 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase mb-2">COMPETITIVE TIMELINE</div>
              <div className="text-4xl lg:text-5xl font-black text-white group-hover:text-indigo-400 transition-colors font-mono tracking-tight leading-none mb-3">
                28
              </div>
              <div className="text-sm font-extrabold text-slate-100 uppercase tracking-wide">Matches Scheduled</div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">High stakes matches of boundaries, wickets, and cricket tournament action across multiple physical arenas of Jaipur.</p>
              <div className="h-1 w-full bg-slate-950 mt-4 overflow-hidden rounded-full">
                <div className="h-full w-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-amber-500 rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          {/* --- TOP STYLISH STATS CARDS GRID (खिलाड़ी के आंकड़े) --- */}
          <div className="max-w-5xl mx-auto mb-16">
            <h3 className="text-xs font-black font-mono tracking-widest text-[#22D3EE] uppercase mb-6 text-center flex items-center justify-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>CHAMPIONS TOURNAMENT READ OUT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* LEADING BATSMAN CARD */}
              <a 
                href="https://www.instagram.com/jaat_cricket_league?igsh=M3pvMm9vdmhiMzM0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex bg-[#0B0A5C]/80 border border-indigo-900/40 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 group shadow-lg hover:shadow-cyan-500/5 min-h-[160px]"
              >
                <div className="w-[35%] bg-gradient-to-b from-[#05043B] to-[#04032a] relative flex items-end justify-center overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-radial-gradient from-cyan-500/10 via-transparent to-transparent opacity-60" />
                  <img 
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=70&w=260" 
                    alt="Lakshay Chaudhary" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-slate-950 to-transparent z-1" />
                </div>
                <div className="flex-1 p-5 flex flex-col justify-center text-left">
                  <div className="inline-block self-start bg-[#00A3FF] text-white font-black tracking-widest text-[9px] uppercase px-3 py-1 rounded-sm mb-2 transform -skew-x-12">
                    <span className="block transform skew-x-12">LEADING BATSMAN</span>
                  </div>
                  <h4 className="text-sm font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight font-sans">
                    LAKSHAY CHAUDHARY
                  </h4>
                  <div className="mt-1.5 flex items-baseline space-x-1 leading-none">
                    <span className="text-3xl font-black text-white tracking-tight">454</span>
                    <span className="text-[10px] font-bold text-yellow-500 tracking-wider font-mono">RUNS SCORED</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-2 pr-2 uppercase font-medium leading-none flex items-center">
                    Jaipur Jaguars Star Batsman ↗
                  </span>
                </div>
              </a>

              {/* LEADING BOWLER CARD */}
              <a 
                href="https://www.instagram.com/jaat_cricket_league?igsh=M3pvMm9vdmhiMzM0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex bg-[#0B0A5C]/80 border border-indigo-900/40 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 group shadow-lg hover:shadow-cyan-500/5 min-h-[160px]"
              >
                <div className="w-[35%] bg-gradient-to-b from-[#05043B] to-[#04032a] relative flex items-end justify-center overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-radial-gradient from-rose-500/10 via-transparent to-transparent opacity-60" />
                  <img 
                    src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=70&w=260" 
                    alt="Rahul Chaudhary" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-slate-950 to-transparent z-1" />
                </div>
                <div className="flex-1 p-5 flex flex-col justify-center text-left">
                  <div className="inline-block self-start bg-rose-500 text-white font-black tracking-widest text-[9px] uppercase px-3 py-1 rounded-sm mb-2 transform -skew-x-12">
                    <span className="block transform skew-x-12">LEADING BOWLER</span>
                  </div>
                  <h4 className="text-sm font-black text-white group-hover:text-rose-450 transition-colors uppercase tracking-tight font-sans">
                    RAHUL CHAUDHARY
                  </h4>
                  <div className="mt-1.5 flex items-baseline space-x-1 leading-none">
                    <span className="text-3xl font-black text-white tracking-tight">18</span>
                    <span className="text-[10px] font-bold text-yellow-500 tracking-wider font-mono">WICKETS TAKEN</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-2 pr-2 uppercase font-medium leading-none flex items-center">
                    UP United Star Bowler ↗
                  </span>
                </div>
              </a>
            </div>
          </div>

            {/* --- 2. SKEWED ACTIONS GRID (नीचे के स्टाइलिश बटन) --- */}
            <div className="mt-12 text-center">
              <span className="block text-xs font-black tracking-widest text-slate-400 uppercase font-mono mb-5 italic">
                EXPLORE MORE CLINICAL SECTIONS
              </span>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto px-1.5">
                
                <button 
                  onClick={() => scrollToSection('matches-section', 'matches')}
                  className="bg-[#2470e2] hover:bg-blue-500 text-white font-black tracking-widest text-[10px] py-3.5 rounded-sm transition-all duration-300 cursor-pointer transform -skew-x-12 hover:-translate-y-0.5 active:scale-95 shadow-[0_4px_12px_rgba(36,112,226,0.15)] hover:shadow-[0_6px_18px_rgba(36,112,226,0.3)]"
                >
                  <span className="block transform skew-x-12 text-center">FIXTURES & RESULTS</span>
                </button>

                <button 
                  onClick={() => {
                    const el = document.getElementById('stats-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-[#2470e2] hover:bg-blue-500 text-white font-black tracking-widest text-[10px] py-3.5 rounded-sm transition-all duration-300 cursor-pointer transform -skew-x-12 hover:-translate-y-0.5 active:scale-95 shadow-[0_4px_12px_rgba(36,112,226,0.15)] hover:shadow-[0_6px_18px_rgba(36,112,226,0.3)]"
                >
                  <span className="block transform skew-x-12 text-center">POINTS TABLE</span>
                </button>

                <button 
                  onClick={() => setCurrentScreen('MATCHES')}
                  className="bg-[#2470e2] hover:bg-blue-500 text-white font-black tracking-widest text-[10px] py-3.5 rounded-sm transition-all duration-300 cursor-pointer transform -skew-x-12 hover:-translate-y-0.5 active:scale-95 shadow-[0_4px_12px_rgba(36,112,226,0.15)] hover:shadow-[0_6px_18px_rgba(36,112,226,0.3)]"
                >
                  <span className="block transform skew-x-12 text-center">WATCH MATCH VIDEOS</span>
                </button>

                <button 
                  onClick={() => scrollToSection('teams-section', 'teams')}
                  className="bg-[#2470e2] hover:bg-blue-500 text-white font-black tracking-widest text-[10px] py-3.5 rounded-sm transition-all duration-300 cursor-pointer transform -skew-x-12 hover:-translate-y-0.5 active:scale-95 shadow-[0_4px_12px_rgba(36,112,226,0.15)] hover:shadow-[0_6px_18px_rgba(36,112,226,0.3)]"
                >
                  <span className="block transform skew-x-12 text-center">ALL TEAMS</span>
                </button>

              </div>
            </div>

            <div className="max-w-4xl mx-auto bg-slate-900/60 rounded-3xl border border-slate-800/80 overflow-hidden shadow-xl">
            <div className="p-6 bg-slate-950/40 border-b border-slate-800/80 flex items-center space-x-3">
              <Trophy size={18} className="text-yellow-400" />
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Current Standings</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/20 text-slate-400 font-mono text-[10px] font-bold uppercase border-b border-slate-850">
                    <th className="py-4 px-6 text-center w-16">Rank</th>
                    <th className="py-4 px-6">Team</th>
                    <th className="py-4 px-4 text-center">Played</th>
                    <th className="py-4 px-4 text-center">Won</th>
                    <th className="py-4 px-4 text-center">Lost</th>
                    <th className="py-4 px-4 text-center">Draws</th>
                    <th className="py-4 px-6 text-center text-yellow-400 font-bold">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850 text-xs text-slate-300">
                  {sortedStandings.map((team, index) => (
                    <tr 
                      key={team.id}
                      onClick={() => setSelectedTeam(team)}
                      className="hover:bg-slate-900/40 transition cursor-pointer group"
                    >
                      <td className="py-4 px-6 text-center font-mono font-bold text-slate-400 group-hover:text-cyan-400">
                        {index + 1}
                      </td>
                      <td className="py-4 px-6 font-semibold text-slate-100 flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${team.logoColor} p-0.5 flex items-center justify-center`}>
                          <div className="bg-slate-950 rounded-[6px] w-full h-full flex items-center justify-center scale-95 p-1">
                            <TeamLogo seed={team.logoSvgSeed} size={20} />
                          </div>
                        </div>
                        <span className="group-hover:text-cyan-400 transition-colors">{team.name}</span>
                        <span className={`text-[8px] font-mono font-black uppercase px-2 py-0.5 rounded ${
                          team.type === 'international' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/10' : 'bg-slate-850 text-slate-400 border border-slate-800'
                        }`}>
                          {team.type[0].toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center font-mono text-slate-400">{team.stats.played}</td>
                      <td className="py-4 px-4 text-center font-mono text-emerald-400 bg-emerald-500/5">{team.stats.won}</td>
                      <td className="py-4 px-4 text-center font-mono text-rose-400">{team.stats.lost}</td>
                      <td className="py-4 px-4 text-center font-mono text-slate-400">{team.stats.draws}</td>
                      <td className="py-4 px-6 text-center font-mono font-bold text-yellow-400 bg-yellow-500/5 text-sm">{team.stats.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Partners and Sponsors Section - Exactly styled like the dark blue background banner with white tiles */}
      <section id="sponsors-section" className="bg-[#0c0434] py-24 border-y border-indigo-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase font-sans">
              Partners and Sponsors
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Structured Sponsors Grid fitting the precise catalog */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {SPONSORS.map((sponsor) => (
                <div key={sponsor.id} className="flex flex-col space-y-1">
                  <span className="text-[8px] font-mono font-semibold tracking-widest text-[#22D3EE] text-center uppercase">
                    {sponsor.category}
                  </span>
                  <SponsorLogo id={sponsor.id} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 7. About Section */}
      <section id="about-section" className="bg-[#07031e] py-20 relative overflow-hidden text-slate-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 space-y-4"
          >
            <div className="inline-flex items-center space-x-1.5 bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border border-yellow-500/20">
              <Info size={14} />
              <span>ABOUT FOUNDER</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase leading-none">
              Akshay Khrinta
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto uppercase tracking-wider">
              Founder & Operations Head — Jaat Cricket League
            </p>
          </motion.div>

          {/* Full scale image display for the provided composite image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl shadow-yellow-500/5 bg-slate-950/20 max-w-4xl mx-auto group"
          >
            <img
              src="https://i.postimg.cc/k4w0M8sW/Whats-App-Image-2026-06-06-at-15-00-47.jpg"
              alt="Akshay Khrinta — Founder & Operations Head"
              className="w-full h-auto object-contain block mx-auto group-hover:scale-[1.01] transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </motion.div>

        </div>
      </section>

      {/* 8. Interactive Contact Form Section */}
      <section id="contact-section" className="bg-[#0b062b] border-t border-indigo-950/80 py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase">Get In Touch</h2>
            <p className="text-slate-400 text-sm md:text-base mt-2">Affiliate associations, brand sponsorship queries, or press relations.</p>
          </div>

          <div className="max-w-3xl mx-auto bg-slate-900/50 rounded-3xl border border-slate-800/80 p-6 sm:p-10 shadow-xl">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5 flex flex-col text-left">
                  <label htmlFor="contact-name" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Name <span className="text-rose-500">*</span></label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={contactForm.name || ''}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Enter your name"
                    className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div className="space-y-1.5 flex flex-col text-left">
                  <label htmlFor="contact-email" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address <span className="text-rose-500">*</span></label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={contactForm.email || ''}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="Enter email address"
                    className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5 flex flex-col text-left">
                <label htmlFor="contact-subject" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  value={contactForm.subject || ''}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  placeholder="What is this regarding?"
                  className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5 flex flex-col text-left">
                <label htmlFor="contact-message" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Message <span className="text-rose-500">*</span></label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={contactForm.message || ''}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Type your message here..."
                  className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                />
              </div>

              {contactError && (
                <div className="flex items-center space-x-2 text-rose-400 text-xs bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl">
                  <AlertCircle size={16} />
                  <span>{contactError}</span>
                </div>
              )}

              {contactSuccess && (
                <div className="flex items-center space-x-2 text-emerald-400 text-xs bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl animate-fade-in">
                  <CheckCircle2 size={16} />
                  <span>Your message has been sent successfully! Our league management team will follow up soon.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-cyan-500 via-indigo-500 to-indigo-600 hover:scale-[1.01] transition-transform rounded-xl text-sm font-bold tracking-wider text-slate-950 uppercase flex items-center justify-center space-x-2 text-white cursor-pointer shadow-lg shadow-cyan-500/10"
              >
                <span>Send Message</span>
                <Send size={15} />
              </button>

            </form>
          </div>

        </div>
      </section>

      {/* 9. Footer - Matches exact links and alignments from the custom screenshot */}
      <footer className="bg-[#040117] pt-20 pb-8 border-t border-indigo-950/60 font-sans relative z-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-indigo-950/70">
            
            {/* Column A: Logo and Social Links */}
            <div className="md:col-span-4 flex flex-col items-start space-y-6">
              
              {/* Footer JCL Brand Graphic */}
              <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center p-0.5 shadow-md shadow-yellow-500/5 group-hover:scale-105 transition-all duration-300">
                  <img 
                    src={jclLogoImg} 
                    alt="JCL Royal Crest Logo" 
                    className="w-full h-full rounded-[9px] object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-black text-white text-sm tracking-tight leading-none group-hover:text-yellow-400 transition-colors">JAAT CRICKET</span>
                  <span className="text-[9px] text-yellow-400 font-bold tracking-widest leading-none mt-1 uppercase">LEAGUE</span>
                </div>
              </div>

              <div className="text-left">
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                  CONNECT WITH US
                </span>
                {/* 5 Social Networks shown in the footer with small circular badges */}
                <div className="flex items-center space-x-2.5 mt-3">
                  <a href="https://www.facebook.com/share/18YBpAyK2V/" target="_blank" rel="noopener noreferrer" aria-label="JCL Facebook" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-500/40 flex items-center justify-center transition">
                    <Facebook size={14} />
                  </a>
                  <a href="https://www.instagram.com/jaat_cricket_league?igsh=M3pvMm9vdmhiMzM0" target="_blank" rel="noopener noreferrer" aria-label="JCL Instagram" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-500/40 flex items-center justify-center transition">
                    <Instagram size={14} />
                  </a>
                  <a href="https://www.instagram.com/jaat_cricket_league?igsh=M3pvMm9vdmhiMzM0" target="_blank" rel="noopener noreferrer" aria-label="JCL LinkedIn" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-500/40 flex items-center justify-center transition">
                    <Linkedin size={14} />
                  </a>
                  <a href="https://www.instagram.com/jaat_cricket_league?igsh=M3pvMm9vdmhiMzM0" target="_blank" rel="noopener noreferrer" aria-label="JCL Twitter" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-500/40 flex items-center justify-center transition">
                    <Twitter size={14} />
                  </a>
                  <a href="https://www.instagram.com/jaat_cricket_league?igsh=M3pvMm9vdmhiMzM0" target="_blank" rel="noopener noreferrer" aria-label="JCL YouTube" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-500/40 flex items-center justify-center transition">
                    <Youtube size={14} />
                  </a>
                </div>
              </div>

            </div>

            {/* Column B: Highly requested Quick Navigation Links */}
            <div className="md:col-span-4 text-left">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#22D3EE] uppercase block mb-4">
                QUICK NAVIGATION
              </span>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-semibold text-slate-350">
                <li>
                  <button onClick={() => scrollToSection('home-section', 'home')} className="hover:text-yellow-400 transition-colors py-0.5 cursor-pointer block text-left">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('teams-section', 'teams')} className="hover:text-yellow-400 transition-colors py-0.5 cursor-pointer block text-left">
                    Teams
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('matches-section', 'matches')} className="hover:text-yellow-400 transition-colors py-0.5 cursor-pointer block text-left">
                    Matches
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('videos-section', 'home')} className="hover:text-yellow-400 transition-colors py-0.5 cursor-pointer block text-left">
                    Videos
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('stats-section', 'stats')} className="hover:text-yellow-400 transition-colors py-0.5 cursor-pointer block text-left">
                    Standings
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('sponsors-section', 'sponsors')} className="hover:text-yellow-400 transition-colors py-0.5 cursor-pointer block text-left">
                    Sponsors
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('about-section', 'about')} className="hover:text-yellow-400 transition-colors py-0.5 cursor-pointer block text-left">
                    About Founder
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('contact-section', 'contact')} className="hover:text-yellow-400 transition-colors py-0.5 cursor-pointer block text-left">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Column C: Instant clickable contact points */}
            <div className="md:col-span-4 flex flex-col justify-start text-left space-y-4">
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase block">
                OFFICIAL INQUIRIES
              </span>
              
              <div className="flex flex-col space-y-3.5 pr-4">
                
                {/* 2 Phones specified in the screenshot */}
                <div className="flex items-start space-x-3 text-xs text-slate-400">
                  <Phone size={15} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div className="flex flex-col font-mono text-slate-350">
                    <a href="tel:+918239955063" className="hover:text-[#22D3EE] transition-colors font-medium">
                      +91 82399 55063
                    </a>
                  </div>
                </div>

                {/* Email address */}
                <div className="flex items-center space-x-3 text-xs text-slate-300">
                  <Mail size={15} className="text-cyan-400 flex-shrink-0" />
                  <a href="mailto:jaatcricketleague@gmail.com" className="font-mono hover:text-[#22D3EE] font-medium transition-colors">
                    jaatcricketleague@gmail.com
                  </a>
                </div>

                {/* Physical Location Info */}
                <div className="flex items-start space-x-3 text-xs text-slate-300">
                  <MapPin size={15} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed text-slate-400 text-xs">
                    SMS Stadium, Ground Floor Area, Jaipur, Rajasthan, India
                  </span>
                </div>

              </div>

            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-650 font-mono gap-4">
            <span>&copy; {new Date().getFullYear()} Jaat Cricket League (JCL). All Rights Reserved.</span>
            <div className="flex space-x-4">
              <a href="#teams-section" className="hover:text-slate-400 transition">Terms of Service</a>
              <a href="#teams-section" className="hover:text-slate-400 transition">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 10. Selected Team detailed modal drawer */}
      <TeamDetailModal 
        team={selectedTeam} 
        onClose={() => setSelectedTeam(null)} 
      />

      {/* 11. Immersive Sports Video Playback Lightbox Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-slate-950 rounded-3xl border border-slate-850 overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Header block with close triggers */}
              <div className="p-5 border-b border-slate-900 bg-slate-950/45 flex items-center justify-between">
                <div className="flex items-center space-x-2.5 text-left">
                  <span className="bg-yellow-500 text-slate-950 text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded transform -skew-x-12">
                    {selectedVideo.category}
                  </span>
                  <h3 className="font-extrabold text-white text-sm sm:text-base leading-snug line-clamp-1 truncate max-w-[12rem] sm:max-w-[32rem]">
                    {selectedVideo.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="p-1.5 rounded-xl bg-slate-900 border border-slate-850 text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* High-Impact Match Video Simulation Display */}
              <VideoSimulationPlayer video={selectedVideo} />

              {/* Video detailed stats descriptor footer */}
              <div className="p-6 bg-slate-900/10 text-left border-t border-slate-900">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                  <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono">
                    <span className="font-bold text-yellow-500">{selectedVideo.views}</span>
                    <span>•</span>
                    <span>Released {selectedVideo.date}</span>
                    <span>•</span>
                    <span>UHD 4K</span>
                  </div>
                  
                  {/* High fidelity actions */}
                  <div className="flex items-center space-x-3 text-xs font-bold text-slate-350">
                    <button className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-cyan-400/30 hover:text-cyan-400 transition cursor-pointer">
                      <span>Like</span>
                    </button>
                    <button className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-cyan-400/30 hover:text-cyan-400 transition cursor-pointer">
                      <span>Share</span>
                    </button>
                  </div>
                </div>
                
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold">
                  {selectedVideo.description}
                </p>
                <div className="mt-4 p-3 bg-yellow-500/5 rounded-xl border border-yellow-500/10 text-[11px] text-yellow-400 leading-relaxed flex items-start space-x-2">
                  <span className="font-bold uppercase font-mono mt-0 5 bg-yellow-500 text-slate-950 px-1.5 py-0.5 rounded text-[8px]">PRO SPORTS PROMPT</span>
                  <span>This high-fidelity broadcast simulation plays live matches and strategic reviews locally without external trackers. Grab some popcorn!</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
