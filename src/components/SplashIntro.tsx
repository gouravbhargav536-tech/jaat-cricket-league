import { motion } from 'motion/react';
import { useEffect } from 'react';

interface SplashIntroProps {
  onEnter: () => void;
  key?: string;
}

export function SplashIntro({ onEnter }: SplashIntroProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onEnter();
    }, 1800); // 1.5s visual + 300ms buffer for exit animation transition
    return () => clearTimeout(timer);
  }, [onEnter]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-[#07031e] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* High-energy background bursts */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 2, opacity: 0.15 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-indigo-600 blur-[150px] rounded-full" 
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Stylized Batsman Icon (Moving) */}
        <div className="relative mb-8">
          <motion.div
            initial={{ x: -200, opacity: 0, rotate: -20 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, duration: 0.8 }}
            className="relative"
          >
            {/* Simple Stylized Batsman Shape using SVG to mimic a sports logo */}
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]">
              {/* Head */}
              <circle cx="12" cy="5" r="2" />
              {/* Body and Arms in batting stance */}
              <path d="M12 7v6l-4 4" />
              <path d="M12 9l6-2" />
              <path d="M18 7l2 4" />
              {/* Bat */}
              <motion.path 
                initial={{ rotate: -45 }}
                animate={{ rotate: 10 }}
                transition={{ duration: 0.4, repeat: 3, repeatType: "reverse", ease: "easeInOut" }}
                d="M18 5l2 10" 
                className="stroke-cyan-400"
                strokeWidth="2.5"
              />
              <path d="M8 20h8" />
            </svg>
            
            {/* Speed lines behind the player */}
            <div className="absolute -left-10 top-1/2 -translate-y-1/2 flex flex-col gap-1">
              <motion.div initial={{ width: 0 }} animate={{ width: 40 }} transition={{ delay: 0.3 }} className="h-0.5 bg-cyan-500/50 rounded-full" />
              <motion.div initial={{ width: 0 }} animate={{ width: 60 }} transition={{ delay: 0.4 }} className="h-0.5 bg-yellow-500/50 rounded-full" />
              <motion.div initial={{ width: 0 }} animate={{ width: 30 }} transition={{ delay: 0.5 }} className="h-0.5 bg-indigo-500/50 rounded-full" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">JAAT CRICKET</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-rose-600">LEAGUE</span>
          </h1>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.6, duration: 1, ease: "easeInOut" }}
            className="h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-4 opacity-50"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-4 text-[10px] font-black tracking-[0.5em] text-cyan-400 uppercase"
          >
            Powering Excellence
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
