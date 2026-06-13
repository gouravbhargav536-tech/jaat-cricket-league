import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, User, Shield, Info, RefreshCcw, Zap, Target, Award } from 'lucide-react';
import { TEAMS } from '../data';
import { Team } from '../types';

// @ts-ignore
import playerHaryana from '../assets/images/jcl_player_haryana_png_1781347817999.jpg';
// @ts-ignore
import playerDelhi from '../assets/images/jcl_player_delhi_png_1781347834701.jpg';
// @ts-ignore
import playerRajasthan from '../assets/images/jcl_player_rajasthan_png_1781347848035.jpg';

interface PlayerStat {
  label: string;
  value: string | number;
  icon: any;
}

const TEAM_IMAGES: Record<string, string> = {
  'haryana-hurricanes': playerHaryana,
  'delhi-dynamites': playerDelhi,
  'rajasthan-rangers': playerRajasthan,
  'up-united': playerDelhi, // Generic fallback
  'punjab-panthers': playerHaryana,
  'mewar-monarchs': playerRajasthan,
  'jaipur-jaguars': playerHaryana,
  'jodhana-warriors': playerRajasthan,
};

export function PlayerSpotlight() {
  const [spotlightData, setSpotlightData] = useState<{
    player: { name: string; role: string; nationality: string; jerseyNo: number };
    team: Team;
    bio: string;
    stats: PlayerStat[];
    image: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const getRandomPlayer = () => {
    const randomTeam = TEAMS[Math.floor(Math.random() * TEAMS.length)];
    const randomPlayer = randomTeam.roster[Math.floor(Math.random() * randomTeam.roster.length)];
    
    // Generate fun random stats
    const stats: PlayerStat[] = [
      { label: 'Runs', value: Math.floor(Math.random() * 200) + 50, icon: Award },
      { label: 'Wickets', value: Math.floor(Math.random() * 10), icon: Zap },
      { label: 'Strike Rate', value: (Math.random() * 40 + 120).toFixed(1), icon: Target },
    ];

    return { player: randomPlayer, team: randomTeam, stats, image: TEAM_IMAGES[randomTeam.id] || playerHaryana };
  };

  const fetchBio = async (playerName: string, teamName: string, role: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-bio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName, teamName, role }),
      });
      
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          return "Our scouts are busy analyzing thousands of players. This athlete remains a key pillar of their team's strategy and community pride.";
        }
        throw new Error(data.error || 'Failed to generate bio');
      }
      
      return data.bio;
    } catch (err) {
      console.warn("Bio generation failed, using fallback:", err);
      return "An elite athlete representing their community with pride and skill in the JCL. Known for their dedication and exceptional performance on the big stage.";
    } finally {
      setLoading(false);
    }
  };

  const updateSpotlight = async () => {
    const { player, team, stats, image } = getRandomPlayer();
    const bio = await fetchBio(player.name, team.name, player.role);
    setSpotlightData({ player, team, bio, stats, image });
  };

  useEffect(() => {
    updateSpotlight();
  }, []);

  if (!spotlightData) return (
    <div className="flex justify-center items-center py-24 bg-[#07031e]">
      <RefreshCcw className="animate-spin text-cyan-500" />
    </div>
  );

  return (
    <section className="py-24 relative overflow-hidden bg-[#07031e]">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br ${spotlightData.team.logoColor} blur-[120px] rounded-full opacity-40`} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500 blur-[120px] rounded-full opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-yellow-500/10 text-yellow-500 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase border border-yellow-500/20 mb-4 shadow-lg shadow-yellow-500/5"
          >
            <Star size={12} className="fill-current" />
            <span>PLAYER PRIDE SPOTLIGHT</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase text-center leading-none">
            EMPOWERING THE <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">STARS OF JAAT SAMAJ</span>
          </h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={spotlightData.player.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-[#0b062b]/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 p-8 md:p-14 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] relative overflow-hidden group">
              {/* Subtle grid pattern overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                <div className="lg:col-span-7 space-y-10 order-2 lg:order-1">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-cyan-400">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${spotlightData.team.logoColor} p-0.5 shadow-lg`}>
                        <div className="w-full h-full bg-[#0b062b] rounded-md flex items-center justify-center">
                          <Shield size={12} className="text-white" />
                        </div>
                      </div>
                      <span className="uppercase font-black tracking-widest text-xs opacity-80">{spotlightData.team.name}</span>
                    </div>
                    
                    <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                      {spotlightData.player.name}
                    </h3>
                    
                    <div className="flex items-center gap-4">
                      <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black tracking-widest uppercase text-slate-300">
                        {spotlightData.player.role}
                      </span>
                      <div className="h-4 w-px bg-white/10" />
                      <span className="font-mono text-cyan-400 font-bold text-lg">#{spotlightData.player.jerseyNo}</span>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-transparent rounded-full opacity-50" />
                    <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed italic pr-8">
                      {loading ? (
                        <span className="flex items-center gap-3">
                          <RefreshCcw className="animate-spin text-cyan-500" size={20} />
                          <span className="animate-pulse">Analyzing player performance...</span>
                        </span>
                      ) : spotlightData.bio}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-8 items-center pt-4">
                    {spotlightData.stats.map((stat, idx) => (
                      <div key={idx} className="flex flex-col">
                        <div className="flex items-center gap-2 text-slate-500 uppercase font-black text-[9px] tracking-[0.2em] mb-2">
                          <stat.icon size={12} className="text-indigo-400" />
                          <span>{stat.label}</span>
                        </div>
                        <span className="text-3xl font-black text-white">{stat.value}</span>
                      </div>
                    ))}
                    
                    <div className="ml-auto">
                      <button
                        onClick={updateSpotlight}
                        disabled={loading}
                        className="group/btn relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-700 text-white rounded-2xl font-black text-xs tracking-widest uppercase shadow-xl shadow-indigo-900/40 hover:shadow-cyan-500/20 hover:-translate-y-1 transition-all active:translate-y-0 disabled:opacity-50"
                      >
                        <div className="relative flex items-center space-x-3">
                          <RefreshCcw size={16} className={loading ? 'animate-spin' : 'group-hover/btn:rotate-180 transition-transform duration-500'} />
                          <span>Discover More Talent</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 order-1 lg:order-2">
                  <div className="relative">
                    {/* Glowing ring */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${spotlightData.team.logoColor} opacity-30 blur-3xl rounded-full scale-90 group-hover:scale-110 transition-transform duration-1000`} />
                    
                    <div className="relative aspect-[4/5] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl bg-slate-950">
                      <img 
                        src={spotlightData.image} 
                        alt={spotlightData.player.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                      
                      {/* Team Floating Badge */}
                      <div className="absolute top-6 right-6 p-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${spotlightData.team.logoColor} p-0.5`}>
                          <div className="w-full h-full bg-slate-950 rounded-lg flex items-center justify-center font-black text-[10px] text-white">
                            {spotlightData.team.mascot.substring(0, 3).toUpperCase()}
                          </div>
                        </div>
                        <div className="text-left leading-none">
                          <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">TEAM PRIDE</span>
                          <span className="block text-[10px] font-black text-white uppercase">{spotlightData.team.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

