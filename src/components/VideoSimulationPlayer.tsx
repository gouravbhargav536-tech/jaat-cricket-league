import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Video } from '../types';
import { Play, Pause, RotateCcw, Volume2, Maximize, AlertCircle } from 'lucide-react';

interface VideoSimulationProps {
  video: Video;
}

const COMMENTS = [
  "Batsman steps up to the crease, guarding their wicket...",
  "Bowler completes a roaring run-up, aiming for the off-stump...",
  "Pristine cover drive! Finding the gap with elegant timing for a boundary! +4 Runs!",
  "SUDDEN OUTSWINGER! Leading edge flies dangerously into the slips!",
  "GORGEOUS DIRECT HIT! High stakes review goes up to the third umpire!",
  "CAUGHT BEHIND! Dynamic alert wicket-keeper takes a sensational dive! Wicket!",
  "Next over starts. Bowler variations putting batsman under pressure...",
  "MAXIMUM STRIKE! Clean lofted shot goes straight over the bowler! +6 Runs!",
  "SUPERB BOUNDARY! Quick outfield carries the ball past the line!",
  "TACTICAL DISCUSSIONS! The captain readjusts fielders inside the 30-yard circle."
];

function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  if (url.includes('youtube.com/embed/')) {
    return url;
  }
  if (url.includes('youtube.com/watch')) {
    try {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get('v');
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    } catch (e) {
      const match = url.match(/[?&]v=([^&#]+)/);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
      }
    }
  }
  if (url.includes('youtu.be/')) {
    const parts = url.split('youtu.be/');
    const idAndQuery = parts[1];
    if (idAndQuery) {
      const videoId = idAndQuery.split(/[?#]/)[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }
  return null;
}

export function VideoSimulationPlayer({ video }: VideoSimulationProps) {
  const embedUrl = getYouTubeEmbedUrl(video.videoUrl);
  const [activePlayerMode, setActivePlayerMode] = useState<'broadcast' | 'simulation'>(embedUrl ? 'broadcast' : 'simulation');
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(15);
  const [commentaryIndex, setCommentaryIndex] = useState(0);
  const [scoreA, setScoreA] = useState(24);
  const [scoreB, setScoreB] = useState(21);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);

  useEffect(() => {
    const newEmbed = getYouTubeEmbedUrl(video.videoUrl);
    setActivePlayerMode(newEmbed ? 'broadcast' : 'simulation');
  }, [video]);
  const [batsmanPos, setBatsmanPos] = useState({ x: 50, y: 70 });
  const [fielderPos, setFielderPos] = useState([
    { x: 30, y: 30, color: 'bg-cyan-500' },
    { x: 45, y: 25, color: 'bg-cyan-500 animate-pulse' },
    { x: 60, y: 20, color: 'bg-yellow-400' },
    { x: 70, y: 35, color: 'bg-cyan-500' }
  ]);

  // Audio equalizer bars
  const [eqHeights, setEqHeights] = useState([40, 60, 30, 70, 50, 80, 45, 90, 60, 40]);

  // Handle slide/progress effect and interactive simulation loops
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        // Increment progress
        setProgress((prev) => {
          if (prev >= 100) {
            return 0; // Loop progress
          }
          return prev + 0.4;
        });

        // Rotate commentaries
        if (Math.random() < 0.12) {
          setCommentaryIndex((prev) => (prev + 1) % COMMENTS.length);
          
          // Randomly trigger score updates
          if (Math.random() < 0.5) {
            if (Math.random() < 0.5) {
              setScoreA(s => s + 1);
            } else {
              setScoreB(s => s + 1);
            }
          }
        }

        // Move the batsman on crease dynamically
        setBatsmanPos({
          x: 50 + Math.sin(Date.now() / 600) * 15,
          y: 65 + Math.cos(Date.now() / 700) * 15
        });

        // Perturb fielders slightly
        setFielderPos(prev => prev.map(def => ({
          ...def,
          x: def.x + (Math.random() - 0.5) * 3,
          y: def.y + (Math.random() - 0.5) * 2
        })));

        // Randomize visual Eq heights
        setEqHeights(prev => prev.map(() => Math.floor(Math.random() * 75) + 15));

      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const handleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProgress(parseFloat(e.target.value));
  };

  const handleRestart = () => {
    setProgress(0);
    setScoreA(18);
    setScoreB(16);
    setCommentaryIndex(0);
    setIsPlaying(true);
  };

  // Convert progress into simple simulated countdown game timer (Simulated T20 / T10 Match Progress)
  const elapsedMinutes = Math.floor((progress / 100) * 20);
  const elapsedSeconds = Math.floor(((progress / 100) * 200) % 60);
  const formattedGameTime = `${String(elapsedMinutes).padStart(2, '0')}:${String(elapsedSeconds).padStart(2, '0')}`;

  return (
    <div className="w-full flex flex-col bg-slate-950 font-sans">
      
      {embedUrl && (
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-slate-900 select-none">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Stream Quality:</span>
            <span className="text-[10px] text-yellow-500 font-mono font-bold">1080p Ultra HD</span>
          </div>
          <div className="flex bg-slate-900 p-0.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActivePlayerMode('broadcast')}
              className={`px-3 py-1 rounded-lg text-[10px] font-extrabold tracking-wider uppercase transition-all duration-300 pointer-events-auto cursor-pointer flex items-center space-x-1 ${
                activePlayerMode === 'broadcast'
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>📺 BROADCAST TV</span>
            </button>
            <button
              onClick={() => setActivePlayerMode('simulation')}
              className={`px-3 py-1 rounded-lg text-[10px] font-extrabold tracking-wider uppercase transition-all duration-300 pointer-events-auto cursor-pointer flex items-center space-x-1 ${
                activePlayerMode === 'simulation'
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>⚡ LIVE 2D COURT</span>
            </button>
          </div>
        </div>
      )}

      {/* 1. Main Interactive Player Canvas */}
      <div className="relative aspect-video w-full bg-[#05021a] overflow-hidden flex flex-col items-center justify-center border-b border-slate-900 group">
        
        {activePlayerMode === 'broadcast' && embedUrl ? (
          <iframe
            src={`${embedUrl}?autoplay=1&mute=${isMuted ? 1 : 0}`}
            title={video.title}
            className="absolute inset-0 w-full h-full border-0 z-20 bg-black block"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <>
            {/* Ambient Thumbnail Reflection Background */}
            <div className="absolute inset-0 z-0">
              <img 
                src={video.thumbnail} 
                alt="" 
                className="w-full h-full object-cover opacity-15 blur-[6px] scale-110 pointer-events-none transition-all duration-750" 
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#05021a]/60 bg-gradient-to-t from-[#05021a] via-transparent to-[#05021a]" />
            </div>

            {/* Decorative Grid Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0a35_1px,transparent_1px),linear-gradient(to_bottom,#0f0a35_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30 z-1" />

            {/* Stadium Background Blur Visual */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-b from-cyan-500/20 to-transparent blur-md pointer-events-none z-1" />

            {/* ================= SIMULATED HUD HEADER SCOREBOARD ================= */}
            <div className="absolute top-4 inset-x-6 flex items-center justify-between z-25 pointer-events-none">
              {/* Live broadcast badge */}
              <div className="flex items-center space-x-2 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-red-500/35">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest font-mono">SIM-LIVE</span>
              </div>

              {/* Golden League Scoreboard */}
              <div className="flex items-center bg-slate-950/90 backdrop-blur-md px-4 py-1.5 rounded-2xl border border-slate-800 shadow-xl font-mono text-center">
                <div className="flex flex-col items-end pr-3">
                  <span className="text-[8px] font-sans font-extrabold text-slate-400">TEAM A</span>
                  <span className="text-xl font-black text-yellow-450">JCL</span>
                </div>
                
                <div className="bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 flex items-center space-x-2 text-white font-black text-lg">
                  <span className="text-yellow-400">{scoreA}</span>
                  <span className="text-slate-650 opacity-40">:</span>
                  <span className="text-yellow-400">{scoreB}</span>
                </div>

                <div className="flex flex-col items-start pl-3">
                  <span className="text-[8px] font-sans font-extrabold text-slate-400">TEAM B</span>
                  <span className="text-xl font-black text-rose-500 font-mono">OPP</span>
                </div>
              </div>

              {/* Time Counter */}
              <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 font-mono text-xs text-yellow-400 font-bold">
                {formattedGameTime}
              </div>
            </div>

            {/* ================= SIMULATED CRICKET GROUND PITCH ================= */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[65%] border-2 border-yellow-500/10 rounded-2xl relative bg-yellow-950/5 z-2">
              {/* Pitch Midline */}
              <div className="absolute inset-x-0 top-1/2 h-0.5 bg-[#eab308]/30 border-t border-dashed border-[#eab358]/20 z-10" />
              
              {/* Pitch Crease Lines */}
              <div className="absolute inset-x-0 top-1/4 h-px bg-yellow-500/15 border-dashed" />
              <div className="absolute inset-x-0 bottom-1/4 h-px bg-yellow-500/15 border-dashed" />

              {/* Ambient center circle logo */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-yellow-500/10 flex items-center justify-center">
                <span className="text-[8px] font-black text-yellow-550/25 font-mono tracking-widest uppercase">JCL TURF</span>
              </div>

              {/* FIELDERS (Blue Dots) */}
              {fielderPos.map((def, idx) => (
                <div
                  key={idx}
                  style={{ left: `${def.x}%`, top: `${def.y}%` }}
                  className={`absolute w-3 h-3 rounded-full ${def.color} shadow-lg shadow-cyan-550/55 flex items-center justify-center border border-white/20 transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2`}
                >
                  <div className="w-1 h-1 bg-white rounded-full opacity-60" />
                </div>
              ))}

              {/* ACTIVE BATSMAN (Golden Pulsing Dot) */}
              <div
                style={{ left: `${batsmanPos.x}%`, top: `${batsmanPos.y}%` }}
                className="absolute w-4.5 h-4.5 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-500 shadow-[0_0_15px_rgba(234,179,8,0.7)] flex items-center justify-center border-2 border-white transition-all duration-100 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              >
                <span className="w-1.5 h-1.5 bg-slate-950 rounded-full animate-ping" />
              </div>
            </div>

            {/* Live dynamic ticker text on the screen wrapper */}
            <div className="absolute bottom-16 inset-x-8 text-center bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-900 pointer-events-none transition-all z-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#22D3EE] mr-2 block sm:inline-block uppercase">STADIUM COMMENTARY:</span>
              <span className="text-xs sm:text-sm font-semibold text-white tracking-wide transition-opacity duration-300">
                {COMMENTS[commentaryIndex]}
              </span>
            </div>

            {/* Quick big toggle button on screen hover with thumbnail image reflection cover */}
            {!isPlaying && (
              <div 
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-[3px] flex flex-col items-center justify-center cursor-pointer select-none z-10" 
                onClick={togglePlay}
              >
                {/* Thumbnail reflection on pause overlay */}
                <div className="absolute inset-0 -z-10 bg-black">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover opacity-35 blur-sm scale-105" 
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-slate-950/70" />
                </div>

                <div className="relative z-10 flex flex-col items-center text-center px-6">
                  <div className="w-16 h-16 rounded-full bg-yellow-400 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 mb-3.5 border-2 border-yellow-300/40">
                    <Play size={28} className="fill-current translate-x-0.5" />
                  </div>
                  <span className="text-[10px] text-yellow-400 tracking-widest font-mono font-black uppercase mb-1.5 drop-shadow">RESUME MATCH STREAM</span>
                  <p className="text-xs font-bold font-sans text-slate-100 max-w-md line-clamp-1 opacity-90">{video.title}</p>
                </div>
              </div>
            )}
          </>
        )}

      </div>

      {/* 2. Interactive Media Playback Toolbar (Play, scrubber, volume) */}
      <div className="px-5 py-4 bg-slate-950 border-t border-slate-900 flex flex-col space-y-4">
        
        {/* Custom Scrubber Control */}
        <div className="flex items-center space-x-3 w-full">
          <span className="text-[10px] font-mono text-slate-500">00:00</span>
          <div className="relative flex-1 group">
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-1.5 rounded-full bg-slate-800 accent-yellow-400 cursor-pointer overflow-hidden group-hover:h-2 transition-all outline-none"
            />
          </div>
          <span className="text-[10px] font-mono text-slate-400">{video.duration}</span>
        </div>

        {/* Buttons and volume row */}
        <div className="flex items-center justify-between">
          
          {/* Play/Pause controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlay}
              className="p-2.5 rounded-full bg-slate-900 text-white hover:bg-yellow-400 hover:text-slate-950 transition cursor-pointer"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="translate-x-0.5 fill-current" />}
            </button>
            <button
              onClick={handleRestart}
              className="p-2.5 rounded-full bg-slate-900 text-slate-400 hover:text-white transition cursor-pointer"
              title="Restart Broadcast"
            >
              <RotateCcw size={16} />
            </button>

            {/* EQ Frequency analyzer animation visual */}
            <div className="hidden sm:flex items-end space-x-0.5 h-6 opacity-85 px-2">
              {eqHeights.map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${isPlaying ? h : 15}%` }}
                  className="w-1 bg-[#22D3EE] rounded-t transition-all duration-100"
                />
              ))}
            </div>
          </div>

          {/* Mute and custom volume slider */}
          <div className="flex items-center space-x-3 text-slate-400">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 hover:text-white transition cursor-pointer"
            >
              <Volume2 size={18} className={isMuted ? 'text-red-500 opacity-60' : 'text-slate-300'} />
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseInt(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="w-20 sm:w-24 h-1 bg-slate-800 accent-slate-350 rounded-full cursor-pointer"
            />
            <span className="text-[10px] font-mono w-8 hidden sm:inline-block text-slate-500">{isMuted ? 'Muted' : `${volume}%`}</span>
            <button className="p-1.5 hover:text-white transition cursor-pointer hidden md:block" title="Theater Mode">
              <Maximize size={18} />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
