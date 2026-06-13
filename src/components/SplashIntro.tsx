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
            {/* Stylized Batsman Icon (Moving) */}
            <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-[0_0_30px_rgba(34,211,238,0.4)]">
              {/* Batting Stance Body */}
              <motion.g
                initial={{ rotate: -5, x: -10 }}
                animate={{ rotate: 5, x: 0 }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              >
                <circle cx="12" cy="4" r="2" fill="currentColor" />
                <path d="M12 6v6l-4 4" strokeWidth="2" />
                <path d="M12 8l5-1" strokeWidth="2" />
                
                {/* Bat with swing motion */}
                <motion.path 
                  initial={{ rotate: -60, x: 2, y: 0 }}
                  animate={{ rotate: 20, x: 5, y: -2 }}
                  transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse", ease: "backOut" }}
                  d="M17 5l3 12" 
                  className="stroke-yellow-400"
                  strokeWidth="3"
                  style={{ transformOrigin: "17px 5px" }}
                />
              </motion.g>
              
              {/* Ground line */}
              <motion.path 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8 }}
                d="M4 21h16" 
                stroke="currentColor" 
                strokeWidth="1" 
                opacity="0.3" 
              />
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
