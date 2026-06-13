import { motion } from 'motion/react';
import { useEffect } from 'react';
import batsmanIcon from '../assets/images/cricket_batsman_icon_1781349432299.jpg';

interface SplashIntroProps {
  onEnter: () => void;
  key?: string;
}

export function SplashIntro({ onEnter }: SplashIntroProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onEnter();
    }, 1500); // Exactly 1.5 seconds as requested
    return () => clearTimeout(timer);
  }, [onEnter]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-0 z-[100] bg-[#07031e] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* High-energy background bursts */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 2, opacity: 0.1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-cyan-500 blur-[150px] rounded-full" 
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Professional Batsman Image/Icon */}
        <div className="relative mb-6">
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 12, duration: 0.6 }}
            className="relative"
          >
            {/* Swirl/Aura effect similar to IPL logo */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-10 border-2 border-dashed border-cyan-500/20 rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-16 border border-yellow-500/10 rounded-full"
            />

            <motion.div 
              animate={{ 
                y: [0, -5, 0],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-48 h-48 relative z-10"
            >
              <img 
                src={batsmanIcon} 
                alt="JCL Batsman"
                className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(34,211,238,0.6)] mix-blend-screen"
                referrerPolicy="no-referrer"
              />
            </motion.div>
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
