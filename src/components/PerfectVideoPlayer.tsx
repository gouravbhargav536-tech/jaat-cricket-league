import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Tv, 
  Sliders, 
  Flame, 
  FileText, 
  Eye, 
  Calendar, 
  Sparkles, 
  Film, 
  HelpCircle,
  Play, 
  Activity, 
  Check, 
  Share2, 
  ThumbsUp, 
  ChevronRight 
} from 'lucide-react';
import { VIDEOS } from '../data';
import { Video } from '../types';
import { VideoSimulationPlayer } from './VideoSimulationPlayer';

interface PerfectVideoPlayerProps {
  onBackToHome: () => void;
  selectedVideoId?: string;
}

export default function PerfectVideoPlayer({ onBackToHome, selectedVideoId }: PerfectVideoPlayerProps) {
  // Set first video in data as default, or searched/selected video from parent UI if active
  const [selectedVideo, setSelectedVideo] = useState<Video>(() => {
    if (selectedVideoId) {
      const match = VIDEOS.find(v => v.id === selectedVideoId);
      if (match) return match;
    }
    return VIDEOS[0];
  });
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  const [isShareAlertOpen, setIsShareAlertOpen] = useState(false);

  // Video categorization
  const categories = ['All', 'Highlights', 'Match Replays', 'Behind The Scenes', 'Masterclass'];

  const filteredVideos = VIDEOS.filter((v) => {
    if (activeCategory === 'All') return true;
    return v.category === activeCategory;
  });

  const toggleLike = (id: string) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const triggerShare = () => {
    setIsShareAlertOpen(true);
    setTimeout(() => {
      setIsShareAlertOpen(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans selection:bg-yellow-400 selection:text-slate-900 overflow-x-hidden antialiased">
      {/* Background decorations for depth */}
      <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50rem] h-[50rem] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Header / Top navigation bar */}
      <header className="sticky top-0 z-40 bg-[#0F172A]/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="group flex items-center space-x-3 text-slate-450 hover:text-cyan-400 transition-all font-mono text-xs font-black tracking-widest cursor-pointer py-2 px-4 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-850"
          >
            <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO HOME</span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-yellow-400 to-amber-500 flex items-center justify-center p-0.5">
              <div className="bg-slate-950 w-full h-full rounded-[6px] flex items-center justify-center">
                <span className="font-sans font-black text-white text-sm tracking-tighter">JCL</span>
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-sans font-black text-white text-xs leading-none tracking-wider">JCL LIVE</span>
              <span className="text-[9px] text-yellow-400 font-bold tracking-widest leading-none mt-1 uppercase">Broadcast center</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2 bg-slate-950/80 border border-slate-850 rounded-xl px-3.5 py-1.5 font-mono text-[10px] text-yellow-400 font-bold uppercase tracking-wider">
            <Activity size={12} className="animate-pulse text-red-500" />
            <span>STREAMING UHD 4K</span>
          </div>
        </div>
      </header>

      {/* Main Layout Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Toast alert on sharing */}
        <AnimatePresence>
          {isShareAlertOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#22D3EE] text-slate-950 font-black text-xs font-mono tracking-widest px-6 py-3 rounded-full shadow-2xl flex items-center space-x-2 border border-cyan-300"
            >
              <Check size={14} />
              <span>STADIUM STREAM LINK COPIED!</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: Broadcaster Simulator Column (2/3 size) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-950 rounded-3xl border border-slate-800/80 overflow-hidden shadow-2xl flex flex-col">
              
              {/* Header metadata row */}
              <div className="px-6 py-5 bg-slate-900/40 border-b border-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3 text-left">
                  <span className="bg-yellow-400 text-slate-950 font-sans font-black text-[9px] tracking-widest uppercase px-2.5 py-1 rounded transform -skew-x-12 shrink-0 shadow-sm shadow-yellow-400/15">
                    {selectedVideo.category}
                  </span>
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 font-mono font-bold tracking-wider uppercase block">{selectedVideo.date}</span>
                    <h2 className="text-sm sm:text-base font-extrabold text-white truncate max-w-sm sm:max-w-xl transition-colors">{selectedVideo.title}</h2>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 self-start sm:self-auto shrink-0 font-mono">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] text-slate-450 font-black uppercase tracking-widest">PRO SIMULATOR</span>
                </div>
              </div>

              {/* The simulation/embed engine itself */}
              <div className="relative bg-slate-950">
                <VideoSimulationPlayer video={selectedVideo} />
              </div>

              {/* Control Panel / Engagement buttons below player */}
              <div className="p-6 bg-slate-900/20 border-t border-slate-900 text-left">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-900">
                  <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono">
                    <span className="font-bold text-yellow-400">{selectedVideo.views}</span>
                    <span>•</span>
                    <span>HD Broadcast</span>
                    <span>•</span>
                    <span className="text-cyan-400">FPS: 60hz</span>
                  </div>

                  <div className="flex items-center space-x-2.5 text-xs font-mono font-bold">
                    <button 
                      onClick={() => toggleLike(selectedVideo.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all cursor-pointer border ${
                        likes[selectedVideo.id] 
                          ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                          : 'bg-slate-900/60 border-slate-800 text-slate-350 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <ThumbsUp size={14} className={likes[selectedVideo.id] ? 'fill-current' : ''} />
                      <span>{likes[selectedVideo.id] ? 'LIKED' : 'LIKE'}</span>
                    </button>
                    <button 
                      onClick={triggerShare}
                      className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-350 hover:border-slate-700 hover:text-white transition cursor-pointer"
                    >
                      <Share2 size={14} />
                      <span>SHARE</span>
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-2">Broadcaster Insights</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {selectedVideo.description}
                </p>

                {/* Simulated Stadium HUD specs for professional feel */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-900 text-slate-400 font-mono text-[10px]">
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-900">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold tracking-wider">LATENCY</span>
                    <span className="text-slate-205 font-bold">14 ms (Direct UAE Ingress)</span>
                  </div>
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-900">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold tracking-wider">CODEC PROFILE</span>
                    <span className="text-slate-205 font-bold">VP09 UltraHigh-Fidelity</span>
                  </div>
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-900">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold tracking-wider">AUDIO ENGINE</span>
                    <span className="text-[#22D3EE] font-bold">Dolby Atmos Stereo</span>
                  </div>
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-900">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold tracking-wider">BROADCASTER</span>
                    <span className="text-yellow-400 font-bold">StarSports & JioCinema</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* RIGHT: Video Playlist Column (1/3 size) */}
          <div className="space-y-6">
            
            {/* Playlists Box Header with Category Filters */}
            <div className="bg-slate-950 rounded-3xl border border-slate-800/80 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <div className="flex items-center space-x-2.5">
                  <Film size={16} className="text-cyan-400" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-white font-sans">MAT PLAYLISTS</h3>
                </div>
                <span className="text-[9px] font-mono bg-cyan-950/40 text-cyan-400 border border-cyan-500/10 px-2 py-0.5 rounded-md font-bold text-slate-350">
                  {filteredVideos.length} REELS
                </span>
              </div>

              {/* Category pill slider */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-[9px] font-bold tracking-widest uppercase transition-all duration-300 block select-none cursor-pointer ${
                      cat === activeCategory
                        ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-850 hover:border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Scrollable list of other video items */}
              <div className="space-y-2.5 max-h-[30rem] lg:max-h-[35rem] overflow-y-auto pr-1">
                {filteredVideos.map((video) => {
                  const isActive = video.id === selectedVideo.id;
                  return (
                    <button
                      key={video.id}
                      onClick={() => {
                        setSelectedVideo(video);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full text-left bg-slate-900/30 hover:bg-slate-900/80 border rounded-2xl p-3 flex gap-3 transition-all duration-300 group cursor-pointer ${
                        isActive
                          ? 'border-cyan-500/40 bg-slate-900/90 shadow-md shadow-cyan-500/5'
                          : 'border-slate-900 hover:border-slate-800'
                      }`}
                    >
                      {/* Video clip preview thumbnail on playlist */}
                      <div className="relative aspect-video w-[6.5rem] rounded-lg overflow-hidden bg-slate-950 shrink-0">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover brightness-[0.7] group-hover:scale-105 transition duration-500"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                        
                        {/* Interactive Play glyph inline */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`w-6 h-6 rounded-full bg-slate-950/70 border border-white/10 group-hover:border-white flex items-center justify-center transition-transform scale-90 ${isActive ? 'bg-cyan-500 border-cyan-500' : ''}`}>
                            <Play size={10} className={`text-white fill-current translate-x-0.5 ${isActive ? 'text-slate-950' : ''}`} />
                          </span>
                        </div>

                        {/* Duration banner */}
                        <span className="absolute bottom-1 right-1 bg-slate-950/90 text-[8px] font-mono px-1 py-0.5 rounded border border-slate-850 text-slate-350">
                          {video.duration}
                        </span>
                      </div>

                      {/* Video metadata texts */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 className={`text-xs font-extrabold font-sans leading-snug line-clamp-2 transition-colors ${
                            isActive ? 'text-cyan-400 font-extrabold' : 'text-slate-200 group-hover:text-cyan-400'
                          }`}>
                            {video.title}
                          </h4>
                          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wide block mt-1">
                            {video.category}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 font-bold mt-1.5">
                          <span>{video.views}</span>
                          <span>•</span>
                          <span>{video.date}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Simulated Live Ticket Banner directly in dashboard */}
            <div className="bg-gradient-to-tr from-cyan-950/20 to-indigo-950/30 border border-cyan-500/10 rounded-3xl p-5 text-left relative overflow-hidden">
              <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="text-[9px] font-extrabold font-mono tracking-widest text-[#22D3EE] uppercase">LIVE STADIOM EXPERIENCE</div>
              <h4 className="text-xs font-black text-white mt-1.5 uppercase">GET SEASON MATCH DISCOUNTS</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Unlock 20% off JCL league and showcase match tickets. Apply coupon code <span className="font-mono text-yellow-500 font-black">JCLSEASON1</span> at checkout today.
              </p>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
