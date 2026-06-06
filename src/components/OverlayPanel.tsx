import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  ArrowLeft,
  Trophy, 
  MapPin, 
  Calendar, 
  Star, 
  Users, 
  Shield, 
  Info, 
  Phone, 
  Mail, 
  Zap, 
  Award,
  TrendingUp,
  Ticket,
  ChevronRight,
  Eye
} from 'lucide-react';
import { TEAMS, MATCHES, SPONSORS } from '../data';
import { Team, Match } from '../types';

// @ts-ignore
import vipGuestsImg from '../assets/images/vip_guests_1780658272891.png';

interface OverlayPanelProps {
  isOpen: boolean;
  onClose: () => void;
  tabName: string | null;
}

export function OverlayPanel({ isOpen, onClose, tabName }: OverlayPanelProps) {
  const [selectedOverlayTeam, setSelectedOverlayTeam] = useState<Team | null>(null);
  const [matchFilter, setMatchFilter] = useState<'all' | 'live' | 'upcoming' | 'completed'>('all');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({ name: '', email: '', message: '' });

  if (!isOpen || !tabName) return null;

  // Normalise tab names
  const normalizedTab = tabName.toLowerCase();

  const handleFeedbackSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (feedbackForm.name && feedbackForm.email && feedbackForm.message) {
      setFeedbackSent(true);
      setTimeout(() => {
        setFeedbackSent(false);
        setFeedbackForm({ name: '', email: '', message: '' });
      }, 4000);
    }
  };

  // Leading Batsmen Static Data for visual layout
  const TOP_RAIDERS = [
    { rank: 1, name: 'Lakshay Chaudhary', team: 'Jaipur Jaguars', points: 454, successRate: '148.5' },
    { rank: 2, name: 'Amit Khrinta', team: 'Haryana Hurricanes', points: 412, successRate: '152.0' },
    { rank: 3, name: 'Vikram Godara', team: 'Rajasthan Rangers', points: 388, successRate: '139.6' },
    { rank: 4, name: 'Pankaj Khrinta', team: 'Delhi Dynamites', points: 367, successRate: '144.2' },
    { rank: 5, name: 'Gaurav Kahlon', team: 'Punjab Panthers', points: 335, successRate: '141.0' },
  ];

  // Leading Bowlers Static Data for visual layout
  const TOP_DEFENDERS = [
    { rank: 1, name: 'Rahul Chaudhary', team: 'UP United', tackles: 18, strikeRate: '6.45' },
    { rank: 2, name: 'Jaideep Gill', team: 'Haryana Hurricanes', tackles: 16, strikeRate: '7.10' },
    { rank: 3, name: 'Nihal Grewal', team: 'Delhi Dynamites', tackles: 14, strikeRate: '6.80' },
    { rank: 4, name: 'Mahesh Saran', team: 'Rajasthan Rangers', tackles: 13, strikeRate: '7.55' },
    { rank: 5, name: 'Kapil Poonia', team: 'Jaipur Jaguars', tackles: 12, strikeRate: '6.90' },
  ];

  // Standings computer
  const sortedStandings = [...TEAMS].sort((a, b) => b.stats.points - a.stats.points);

  const filteredMatches = MATCHES.filter(m => {
    if (matchFilter === 'all') return true;
    return m.status === matchFilter;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Dark backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
      />

      {/* Main Full-Screen Overlay panel sliding from right */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        id="sliding-overlay-inner"
        className="relative w-full max-w-2xl h-full bg-[#0F172A] border-l border-slate-800 shadow-2xl flex flex-col overflow-hidden text-slate-100 z-10"
      >
        {/* Glow decoration in background */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        {/* Header bar of sliding overlay panel */}
        <div className="relative sticky top-0 bg-[#0F172A]/90 backdrop-blur-md px-6 py-5 border-b border-slate-800 flex items-center justify-between z-20">
          <button
            onClick={onClose}
            className="flex items-center space-x-2 text-slate-400 hover:text-cyan-400 transition-colors py-1 cursor-pointer"
          >
            <ArrowLeft size={18} />
            <span className="text-xs font-black uppercase tracking-wider font-mono">BACK</span>
          </button>

          <div className="text-center">
            <span className="text-[10px] text-cyan-400 font-extrabold tracking-widest uppercase block mb-0.5">EXPLORE HUB</span>
            <h2 className="text-sm font-black tracking-widest text-white uppercase font-sans">
              {tabName === 'about us' ? 'ABOUT FOUNDER' : tabName}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all border border-transparent hover:border-slate-805 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable container */}
        <div className="flex-1 overflow-y-auto px-6 py-8 relative z-10 space-y-8">
          
          {/* 1. HOME SECTION */}
          {normalizedTab === 'home' && (
            <div className="space-y-6">
              <div className="relative bg-gradient-to-br from-indigo-950/70 to-slate-900/40 rounded-2xl p-6 border border-indigo-900/30 overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-indigo-500/10 blur-2xl" />
                <span className="text-[9px] font-bold text-[#facc15] uppercase tracking-widest bg-yellow-950/40 px-2 py-0.5 rounded-md border border-yellow-500/10 inline-block mb-3">JCL Broadcast Arena</span>
                <h3 className="text-lg font-black text-white uppercase tracking-wide leading-snug">Jaat Cricket League Overview</h3>
                <p className="text-xs text-slate-350 leading-relaxed mt-2.5">
                  Welcome to the ultimate digital companion for the premier Jaat Cricket League (JCL). Championed to identify, nurture, and represent emerging cricketing skills, JCL offers ambitious cricketers state-of-the-art facilities and nationwide visibility.
                </p>
                <div className="grid grid-cols-3 gap-3 mt-5">
                  <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                    <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider font-mono">DIGITAL REACH</span>
                    <span className="text-base font-black text-yellow-500 font-mono">10M+</span>
                  </div>
                  <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                    <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider font-mono">STADIUMS</span>
                    <span className="text-base font-black text-rose-500 font-mono">8 Venues</span>
                  </div>
                  <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                    <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider font-mono">FRANCHISES</span>
                    <span className="text-base font-black text-cyan-400 font-mono">8 Elite</span>
                  </div>
                </div>
              </div>

              {/* JCL Live Highlights Ticker card */}
              <div className="bg-slate-900/60 rounded-xl p-5 border border-slate-800">
                <h4 className="text-xs font-black text-white tracking-widest uppercase mb-3 flex items-center space-x-2">
                  <Zap size={14} className="text-yellow-400 animate-pulse" />
                  <span>JCL SEASON HIGHLIGHT ACTIONS</span>
                </h4>
                <ul className="space-y-3 font-sans text-xs">
                  <li className="flex items-start space-x-3 text-slate-300">
                    <span className="text-yellow-500 font-mono font-bold mt-0.5">▷</span>
                    <span>Haryana Hurricanes showcased explosive batting during pre-league practice matches, setting a giant target of 210 runs.</span>
                  </li>
                  <li className="flex items-start space-x-3 text-slate-300">
                    <span className="text-yellow-500 font-mono font-bold mt-0.5">▷</span>
                    <span>Delhi Dynamites spinner unit dominated technical nets, accomplishing a remarkable series of death-overs dot balls.</span>
                  </li>
                  <li className="flex items-start space-x-3 text-slate-300">
                    <span className="text-yellow-500 font-mono font-bold mt-0.5">▷</span>
                    <span>Organising partner SNEXGEN Sports Foundation guarantees fully live-streamed coverage of every single league match.</span>
                  </li>
                </ul>
              </div>

              {/* Quick stats grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800 flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-lg bg-yellow-550/20 flex items-center justify-center text-yellow-400 border border-yellow-500/10">
                    <Trophy size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono uppercase block font-bold leading-none mb-1">FOUNDER</span>
                    <span className="text-xs font-bold text-slate-100 leading-none">Akshay Khrinta</span>
                  </div>
                </div>
                <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800 flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-lg bg-cyan-550/20 flex items-center justify-center text-cyan-400 border border-cyan-500/10">
                    <Users size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono uppercase block font-bold leading-none mb-1">PRO ATHLETES</span>
                    <span className="text-xs font-bold text-slate-100 leading-none">56+ Star Roster</span>
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* 2. TEAMS SECTION */}
          {normalizedTab === 'teams' && (
            <div className="space-y-6">
              {!selectedOverlayTeam ? (
                <div className="pt-2 text-left">
                  <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#00A3FF]/10 text-[#00A3FF] border border-[#00A3FF]/20 text-[10px] uppercase font-bold tracking-widest font-mono mb-2">
                    JCL FRANCHISES
                  </span>
                  <h3 className="text-base font-black uppercase tracking-wider text-white">Championship Squads</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    Discover our professional JCL franchises below. Click on any squad to explore their complete team description, administrative leads, and detailed roster of Batsmen, Bowlers, Wicket-keepers, and All-rounders.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {TEAMS.map((team) => (
                      <button
                        key={team.id}
                        onClick={() => setSelectedOverlayTeam(team)}
                        className="w-full text-left bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 hover:border-yellow-500/30 rounded-2xl p-4 transition-all duration-300 flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${team.logoColor} flex items-center justify-center text-slate-950 font-black text-sm shadow-sm`}>
                            {team.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="text-xs font-black text-white block group-hover:text-yellow-400 transition-colors uppercase leading-tight">{team.name}</span>
                            <span className="text-[9px] text-slate-450 font-mono block mt-0.5 font-bold uppercase tracking-wider">JCL Squad</span>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-slate-500 group-hover:text-yellow-500 transform group-hover:translate-x-1 transition-all animate-none shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-5 space-y-6">
                  {/* Team details Header with Back action */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <button
                      onClick={() => setSelectedOverlayTeam(null)}
                      className="text-xs font-bold text-slate-400 hover:text-white transition-colors flex items-center space-x-1.5 cursor-pointer"
                    >
                      <ArrowLeft size={14} />
                      <span>Back to list</span>
                    </button>
                    <span className="text-[9px] font-mono font-black text-yellow-500 uppercase tracking-widest">JCL FRANCHISE</span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${selectedOverlayTeam.logoColor} flex items-center justify-center text-slate-950 font-black text-lg`}>
                      {selectedOverlayTeam.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-base font-black text-white">{selectedOverlayTeam.fullName}</h3>
                      <p className="text-[11px] text-yellow-500 font-medium font-mono">{selectedOverlayTeam.tagline}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-900">
                    {selectedOverlayTeam.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                      <span className="text-[9px] text-indigo-400 block uppercase font-bold tracking-wider font-mono">HEAD COACH</span>
                      <span className="text-xs font-bold text-white font-sans block mt-1">{selectedOverlayTeam.coach}</span>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                      <span className="text-[9px] text-cyan-400 block uppercase font-bold tracking-wider font-mono">DRAFT CAPTAIN</span>
                      <span className="text-xs font-bold text-white font-sans block mt-1">{selectedOverlayTeam.captain}</span>
                    </div>
                  </div>

                  {/* Player Squad table */}
                  <div>
                    <h4 className="text-xs font-black text-white uppercase tracking-widest mb-3 flex items-center space-x-2">
                      <Users size={14} className="text-cyan-400" />
                      <span>OFFICIAL SQUAD SQUAD LIST ({selectedOverlayTeam.roster.length})</span>
                    </h4>
                    <div className="overflow-hidden rounded-xl border border-slate-800">
                      <table className="w-full text-left font-mono text-xs">
                        <thead>
                          <tr className="bg-slate-950 text-slate-400 uppercase text-[9px] tracking-widest border-b border-slate-800">
                            <th className="py-2.5 px-3">JN</th>
                            <th className="py-2.5 px-3">Player</th>
                            <th className="py-2.5 px-3">Role</th>
                            <th className="py-2.5 px-3">Region</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 bg-slate-950/15">
                          {selectedOverlayTeam.roster.map((player) => (
                            <tr key={player.jerseyNo} className="hover:bg-slate-900/20">
                              <td className="py-2 px-3 font-semibold text-yellow-500">#{player.jerseyNo}</td>
                              <td className="py-2 px-3 font-sans text-xs font-bold text-white">{player.name}</td>
                              <td className="py-2 px-3">
                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                                  player.role === 'Batsman' ? 'bg-cyan-950/40 text-cyan-400 border border-cyan-500/10' :
                                  player.role === 'Bowler' ? 'bg-red-950/40 text-rose-450 border border-red-500/10' :
                                  'bg-indigo-950/40 text-indigo-300 border border-indigo-500/10'
                                }`}>
                                  {player.role}
                                </span>
                              </td>
                              <td className="py-2 px-3 text-slate-400 font-sans text-xs">{player.nationality}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}


          {/* 3. MATCHES SECTION */}
          {normalizedTab === 'matches' && (
            <div className="space-y-6 text-left">
              <div className="relative bg-[#0B0F19] rounded-2xl border border-slate-800/80 p-5 overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#22D3EE] font-mono">Live Broadcast & Highlights</h3>
                  <div className="flex items-center space-x-1.5 bg-red-650/10 text-red-550 border border-red-500/25 px-2 py-0.5 rounded font-mono text-[9px] font-bold uppercase tracking-wider animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span>BROADCAST LIVE</span>
                  </div>
                </div>

                {/* Styled Video Player web container */}
                <div className="relative aspect-video rounded-xl bg-black border border-slate-900 overflow-hidden shadow-2xl">
                  <iframe 
                    src="https://www.youtube.com/embed/iau7CZ-iBV0" 
                    title="Jaat Cricket League Launch Highlights" 
                    className="absolute inset-0 w-full h-full border-none" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>

                <div className="mt-4">
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">Jaat Cricket League Inaugural Launch</h4>
                  <p className="text-[11px] font-bold text-[#EA580C] mt-1 font-mono uppercase tracking-tight">Highlights: JCL Ceremony & Launch Jaipur</p>
                </div>

                {/* Sub-thumbnail track slider / options selection list */}
                <div className="mt-4 p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center space-x-3.5 hover:border-slate-705 transition cursor-pointer">
                  <div className="relative aspect-video w-18 rounded bg-slate-950 overflow-hidden shrink-0">
                    <img 
                      src="https://img.youtube.com/vi/iau7CZ-iBV0/mqdefault.jpg" 
                      alt="Match Highlights" 
                      className="w-full h-full object-cover brightness-[0.7]" 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="w-5 h-5 rounded-full bg-[#00A3FF] flex items-center justify-center">
                        <span className="text-[8px] text-white font-black">▷</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-[11px] font-bold text-white leading-tight truncate">JCL Season Announcement & Training</h5>
                    <span className="text-[9px] text-[#00A3FF] block mt-0.5 font-bold tracking-tight uppercase font-mono">Net Practise Leg</span>
                  </div>
                </div>
              </div>

              {/* TACTICAL MATCH CENTER */}
              <div className="pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between pb-3">
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider font-mono">SEASON MATRIX:</span>
                  <div className="flex space-x-1.5 bg-slate-950 p-0.5 rounded-lg border border-slate-850">
                    {(['all', 'live', 'upcoming', 'completed'] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setMatchFilter(mode)}
                        className={`px-2.5 py-1 rounded text-[9px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                          matchFilter === mode
                            ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredMatches.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl bg-slate-950/20">
                    <span className="text-xs text-slate-500 font-mono">No matches found matching filter "{matchFilter}"</span>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {filteredMatches.map((m) => (
                      <div 
                        key={m.id}
                        className={`relative overflow-hidden rounded-2xl p-5 border transition-all ${
                          m.status === 'live' 
                            ? 'bg-cyan-950/15 border-cyan-500/30' 
                            : 'bg-slate-900/50 border-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3 text-[9px] font-mono font-bold tracking-widest">
                          <span className="text-slate-400 uppercase">{m.round}</span>
                          {m.status === 'live' ? (
                            <span className="text-red-500 font-black bg-red-950/40 border border-red-500/20 px-2 py-0.5 rounded animate-pulse">● LIVE COVERAGE</span>
                          ) : m.status === 'upcoming' ? (
                            <span className="text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded">UPCOMING</span>
                          ) : (
                            <span className="text-slate-400 bg-slate-950 border border-slate-850 px-2 py-0.5 rounded">COMPLETED</span>
                          )}
                        </div>

                        <div className="flex items-center justify-between bg-slate-950/40 p-4 rounded-xl border border-slate-900">
                          <div className="flex items-center space-x-3 w-[45%]">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${m.teamALogoColor} flex items-center justify-center text-slate-950 font-black text-xs`}>
                              {m.teamAName.substring(0, 2).toUpperCase()}
                            </div>
                            <span className="text-xs font-black text-white truncate font-sans">{m.teamAName}</span>
                          </div>

                          {m.status === 'upcoming' ? (
                            <div className="text-center px-2">
                              <span className="text-[10px] font-bold text-yellow-500 font-mono tracking-tight block">{m.time}</span>
                              <span className="text-[8px] text-slate-400 block uppercase font-bold tracking-wider mt-0.5">{m.date}</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2 font-mono text-base font-black px-3 py-1 bg-slate-900/80 rounded border border-slate-800">
                              <span className={m.scoreA! >= m.scoreB! ? 'text-cyan-400' : 'text-slate-400'}>{m.scoreA}</span>
                              <span className="text-slate-600 font-bold">:</span>
                              <span className={m.scoreB! >= m.scoreA! ? 'text-cyan-400' : 'text-slate-400'}>{m.scoreB}</span>
                            </div>
                          )}

                          <div className="flex items-center justify-end space-x-3 w-[45%] text-right">
                            <span className="text-xs font-black text-white truncate font-sans">{m.teamBName}</span>
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${m.teamBLogoColor} flex items-center justify-center text-slate-950 font-black text-xs`}>
                              {m.teamBName.substring(0, 2).toUpperCase()}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1.5 mt-3 text-[10px] text-slate-400 font-sans">
                          <MapPin size={12} className="text-slate-500" />
                          <span>{m.venue}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}


          {/* 4. STATS SECTION */}
          {normalizedTab === 'stats' && (
            <div className="space-y-8 text-left">
              {/* JCL Live Stats Grid Summary Counters */}
              <div>
                <h4 className="text-xs font-black text-[#2e1aa7] dark:text-yellow-500 uppercase tracking-widest mb-3 flex items-center space-x-2 font-sans">
                  <span>JCL In Stats</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="bg-slate-900 border border-slate-800/80 p-5 rounded-xl text-center">
                    <span className="text-2xl font-black text-yellow-500 font-mono block">+10M</span>
                    <span className="text-[10px] text-slate-400 font-bold tracking-wider font-mono uppercase mt-1.5 block">DIGITAL REACH</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800/80 p-5 rounded-xl text-center">
                    <span className="text-2xl font-black text-cyan-400 font-mono block">+4.5M</span>
                    <span className="text-[10px] text-slate-400 font-bold tracking-wider font-mono uppercase mt-1.5 block">EST. VIEWERSHIP</span>
                  </div>
                  <div className="bg-slate-905 border border-slate-800/80 p-5 rounded-xl text-center">
                    <span className="text-2xl font-black text-rose-500 font-mono block">28</span>
                    <span className="text-[10px] text-slate-400 font-bold tracking-wider font-mono uppercase mt-1.5 block">PROPOSED MATCHES</span>
                  </div>
                </div>
              </div>

              {/* Top Players Highlight Cards Block */}
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                  <span>PREMIUM LEADERBOARDS</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* TOP BATSMAN CARD */}
                  <a 
                    href="https://www.instagram.com/jaat_cricket_league?igsh=M3pvMm9vdmhiMzM0" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex bg-[#0B0A5C]/90 border border-indigo-900/40 rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 group shadow-md min-h-[140px]"
                  >
                    <div className="w-[35%] bg-gradient-to-b from-[#05043B] to-[#04032a] relative flex items-end justify-center overflow-hidden shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=70&w=260" 
                        alt="Lakshay Chaudhary" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-slate-950 to-transparent" />
                    </div>
                    <div className="flex-1 p-4 flex flex-col justify-center text-left">
                      <span className="inline-block self-start bg-[#00A3FF] text-[8px] text-white font-mono font-black tracking-widest uppercase px-2 py-0.5 rounded-sm mb-1">
                        LEADING BATSMAN
                      </span>
                      <h5 className="text-xs font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight font-sans">
                        LAKSHAY CHAUDHARY
                      </h5>
                      <div className="mt-1 flex items-baseline space-x-1 leading-none">
                        <span className="text-2xl font-black text-white">454</span>
                        <span className="text-[9px] font-bold text-yellow-500 font-mono">RUNS SCORED</span>
                      </div>
                    </div>
                  </a>

                  {/* TOP BOWLER CARD */}
                  <a 
                    href="https://www.instagram.com/jaat_cricket_league?igsh=M3pvMm9vdmhiMzM0" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex bg-[#0B0A5C]/90 border border-indigo-900/40 rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 group shadow-md min-h-[140px]"
                  >
                    <div className="w-[35%] bg-gradient-to-b from-[#05043B] to-[#04032a] relative flex items-end justify-center overflow-hidden shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=70&w=260" 
                        alt="Rahul Chaudhary" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-slate-950 to-transparent" />
                    </div>
                    <div className="flex-1 p-4 flex flex-col justify-center text-left">
                      <span className="inline-block self-start bg-rose-500 text-[8px] text-white font-mono font-black tracking-widest uppercase px-2 py-0.5 rounded-sm mb-1">
                        LEADING BOWLER
                      </span>
                      <h5 className="text-xs font-black text-white group-hover:text-rose-400 transition-colors uppercase tracking-tight font-sans">
                        RAHUL CHAUDHARY
                      </h5>
                      <div className="mt-1 flex items-baseline space-x-1 leading-none">
                        <span className="text-2xl font-black text-white">18</span>
                        <span className="text-[9px] font-bold text-yellow-500 font-mono">WICKETS TAKEN</span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Table of Standings */}
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-widest mb-3.5 flex items-center space-x-2">
                  <Trophy size={14} className="text-yellow-400" />
                  <span>CHAMPIONSHIP STANDINGS LEAGUE TABLE</span>
                </h4>
                <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/20">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 uppercase text-[9px] tracking-widest border-b border-slate-800">
                        <th className="py-2.5 px-3 text-center">Pos</th>
                        <th className="py-2.5 px-3">Club Team</th>
                        <th className="py-2.5 px-3 text-center">PL</th>
                        <th className="py-2.5 px-3 text-center">W</th>
                        <th className="py-2.5 px-3 text-center">L</th>
                        <th className="py-2.5 px-3 text-center font-bold text-cyan-400">PTS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-sans">
                      {sortedStandings.map((team, idx) => {
                        const isTop = idx < 2;
                        return (
                          <tr key={team.id} className="hover:bg-slate-900/10">
                            <td className="py-2.5 px-3 text-center">
                              <span className={`inline-flex items-center justify-center w-5 h-5 rounded font-mono text-[10px] font-bold ${
                                isTop ? 'bg-yellow-500 text-slate-950 font-black' : 'text-slate-400'
                              }`}>
                                {idx + 1}
                              </span>
                            </td>
                            <td className="py-2.5 px-3">
                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-white text-xs">{team.name}</span>
                                {isTop && <span className="text-[8px] bg-indigo-950 text-indigo-400 font-extrabold px-1 rounded uppercase tracking-wider font-mono">Elite</span>}
                              </div>
                            </td>
                            <td className="py-2.5 px-3 text-center font-mono text-xs text-slate-400">{team.stats.played}</td>
                            <td className="py-2.5 px-3 text-center font-mono text-xs text-slate-350">{team.stats.won}</td>
                            <td className="py-2.5 px-3 text-center font-mono text-xs text-slate-350">{team.stats.lost}</td>
                            <td className="py-2.5 px-3 text-center font-mono text-xs font-black text-cyan-400">{team.stats.points}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Leading Batsmen Grid Leaderboard */}
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-widest mb-3.5 flex items-center space-x-2">
                  <TrendingUp size={14} className="text-cyan-400" />
                  <span>MOST POWERFUL RUNS IN CHAMPIONSHIP</span>
                </h4>
                <div className="space-y-2 bg-slate-950/15 border border-slate-800/85 p-4 rounded-xl">
                  {TOP_RAIDERS.map((r) => (
                    <div key={r.rank} className="flex items-center justify-between py-2 border-b border-slate-850 last:border-b-0 text-xs">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono font-bold text-slate-500">#{r.rank}</span>
                        <div>
                          <span className="font-bold text-white block font-sans">{r.name}</span>
                          <span className="text-[10px] text-slate-400 font-medium block font-mono uppercase">{r.team}</span>
                        </div>
                      </div>
                      <div className="text-right font-mono text-xs">
                        <span className="font-black text-yellow-500 font-mono block">{r.points} Runs</span>
                        <span className="text-[9px] text-cyan-400 block">Strike Rate: {r.successRate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leading Bowlers Grid Leaderboard */}
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-widest mb-3.5 flex items-center space-x-2">
                  <Shield size={14} className="text-rose-400" />
                  <span>MOST POWERFUL WICKETS IN CHAMPIONSHIP</span>
                </h4>
                <div className="space-y-2 bg-slate-950/15 border border-slate-800/85 p-4 rounded-xl">
                  {TOP_DEFENDERS.map((d) => (
                    <div key={d.rank} className="flex items-center justify-between py-2 border-b border-slate-850 last:border-b-0 text-xs">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono font-bold text-slate-500">#{d.rank}</span>
                        <div>
                          <span className="font-bold text-white block font-sans">{d.name}</span>
                          <span className="text-[10px] text-slate-400 font-medium block font-mono uppercase">{d.team}</span>
                        </div>
                      </div>
                      <div className="text-right font-mono text-xs">
                        <span className="font-black text-rose-500 font-mono block">{d.tackles} Wkts</span>
                        <span className="text-[9px] text-indigo-400 block">Economy Rate: {d.strikeRate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}


          {/* 5. SPONSORS SECTION */}
          {normalizedTab === 'sponsors' && (
            <div className="space-y-6 text-left">
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Jaat Cricket League sponsors and corporate alliance partners facilitate the growth of grassroots cricket, funding regional training centers and high-standards matchday broadsheets.
              </p>

              {/* White sponsor cards layout from prompt snippet */}
              <div className="grid grid-cols-2 gap-3.5">
                {['SNEXGEN Sports', 'JioCinema', 'Dafanews', 'MyTeam11', 'Care Health'].map((sponsor, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-xl px-4 py-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow transition-all group h-22">
                    <span className="text-[10px] font-bold text-slate-950 font-sans tracking-wide leading-none">{sponsor}</span>
                    <span className="text-[7.5px] font-mono text-slate-450 block uppercase tracking-wider font-bold mt-1.5">Official Brand Partner</span>
                  </div>
                ))}
              </div>

              {/* Fan Zone Promos Giveaway */}
              <div className="relative bg-gradient-to-tr from-cyan-950/20 via-indigo-950/25 to-slate-900/10 border border-cyan-500/20 rounded-2xl p-5 overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-cyan-400/5 rounded-full blur-xl pointer-events-none" />
                <h4 className="text-xs font-black text-white tracking-widest uppercase flex items-center space-x-2 mb-2">
                  <Ticket size={14} className="text-yellow-400 animate-pulse" />
                  <span>EXCLUSIVE FAN ZONE TICKET OFFER</span>
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Jaat Cricket League is offering special match pass discounts! Gain a special 20% discount on first-category seats at the upcoming JCL Season T20 matches.
                </p>
                <div className="mt-4 bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div className="font-mono">
                    <span className="text-[8px] text-slate-400 block font-bold tracking-wider">REDEEM CODE Coupon:</span>
                    <span className="text-sm font-black tracking-widest text-[#22D3EE]">JCLSEASON1</span>
                  </div>
                  <span className="text-[9px] font-mono font-black border border-yellow-500/30 text-yellow-500 bg-yellow-500/5 px-2 py-1 rounded uppercase animate-pulse">Save 20%</span>
                </div>
              </div>
            </div>
          )}


          {/* 6. ABOUT US SECTION */}
          {normalizedTab === 'about us' && (
            <div className="space-y-4 text-center">
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950/40 p-1">
                <img 
                  src="https://i.postimg.cc/k4w0M8sW/Whats-App-Image-2026-06-06-at-15-00-47.jpg" 
                  alt="Akshay Khrinta — JCL Founder & Operations Head" 
                  className="w-full h-auto object-contain rounded-lg shadow-lg" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-[11px] text-slate-400 uppercase tracking-widest font-mono">
                Akshay Khrinta — Founder & Operations Head
              </p>
            </div>
          )}


          {/* 7. CONTACT SECTION */}
          {normalizedTab === 'contact' && (
            <div className="space-y-6 text-left">
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Get in touch with the Jaat Cricket League administration, submit athlete inquiries, or partner with us for sponsorships, brand promotions, and matchday activations.
              </p>

              {/* Real Admin Contact details layout matching screen spec */}
              <div className="space-y-3 text-left font-sans text-xs">
                <div className="bg-slate-900 p-4.5 rounded-xl border border-slate-805">
                  <span className="text-amber-500 font-bold block mb-1 font-mono text-[10px] uppercase">📞 Phone Number:</span>
                  <a href="tel:8239955063" className="text-sm font-semibold text-white hover:text-yellow-400 transition-colors">+91 82399 55063</a>
                </div>
                
                <div className="bg-slate-900 p-4.5 rounded-xl border border-slate-805">
                  <span className="text-amber-500 font-bold block mb-1 font-mono text-[10px] uppercase">✉️ Official Email:</span>
                  <a href="mailto:jaatcricketleague@gmail.com" className="text-sm font-semibold text-white hover:text-yellow-400 transition-colors">jaatcricketleague@gmail.com</a>
                </div>

                <div className="bg-slate-900 p-4.5 rounded-xl border border-slate-805">
                  <span className="text-amber-500 font-bold block mb-1 font-mono text-[10px] uppercase">📍 Organizing Association:</span>
                  <p className="text-xs leading-relaxed text-slate-200">SNEXGEN SPORTS FOUNDATION in association with International Jaat Parliament</p>
                </div>
              </div>

              {/* Interactive Ticket support form */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <span className="text-[9px] font-mono font-black text-cyan-400 uppercase tracking-widest block mb-4 text-left">DIRECT JCL INQUIRY TICKET</span>
                
                {feedbackSent ? (
                  <div className="text-center py-8 space-y-3">
                    <span className="inline-flex items-center justify-center w-12 h-12 bg-cyan-950 text-cyan-400 border border-cyan-500/20 rounded-full">
                       <Zap size={22} className="animate-bounce" />
                    </span>
                    <h5 className="text-sm font-bold text-white uppercase font-sans">INQUIRY RECEIVED</h5>
                    <p className="text-[11px] text-slate-400 max-w-sm mx-auto leading-relaxed">
                      Thank you for contacting the Jaat Cricket League (JCL) team. An administration representative will respond to you within 24 business hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFeedbackSubmit} className="space-y-3.5">
                    <div className="text-left">
                      <label className="block text-[10px] text-slate-400 uppercase tracking-wider font-mono font-bold mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Gourav Bhargav"
                        value={feedbackForm.name}
                        onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all font-sans"
                      />
                    </div>
                    <div className="text-left">
                      <label className="block text-[10px] text-slate-400 uppercase tracking-wider font-mono font-bold mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. user@domain.com"
                        value={feedbackForm.email}
                        onChange={(e) => setFeedbackForm({ ...feedbackForm, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all font-sans"
                      />
                    </div>
                    <div className="text-left">
                      <label className="block text-[10px] text-slate-400 uppercase tracking-wider font-mono font-bold mb-1">Inquiry Message</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="How can our league team assist your corporate sponsorship or tickings requirements?"
                        value={feedbackForm.message}
                        onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all font-sans"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-extrabold text-xs uppercase py-2.5 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer"
                    >
                      SUBMIT ENQUIRY
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
