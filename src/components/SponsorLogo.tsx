import React from 'react';

interface SponsorLogoProps {
  id: string;
  className?: string;
}

export const SponsorLogo: React.FC<SponsorLogoProps> = ({ id, className = '' }) => {
  const renderLogoContent = () => {
    switch (id) {
      case 'dainik-bhaskar':
        return (
          <div className="flex items-center space-x-1 justify-center">
            {/* Orange Sun Icon */}
            <div className="w-5 h-5 bg-orange-500 rounded-full flex-shrink-0 flex items-center justify-center relative shadow-sm">
              <span className="absolute w-6 h-0.5 bg-orange-500 rotate-0"></span>
              <span className="absolute w-6 h-0.5 bg-orange-500 rotate-45"></span>
              <span className="absolute w-6 h-0.5 bg-orange-500 rotate-90"></span>
              <span className="absolute w-6 h-0.5 bg-orange-500 rotate-135"></span>
              <span className="absolute w-3 h-3 bg-white rounded-full"></span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-xs tracking-tight text-slate-800 font-sans leading-none">ದೈನಿಕ ಭಾಸ್ಕರ್</span>
              <span className="text-[10px] text-orange-500 font-semibold tracking-widest leading-none">दैनिक भास्कर</span>
            </div>
          </div>
        );

      case 'defined-group':
        return (
          <div className="flex items-center space-x-1 justify-center">
            {/* Styled green roof house outline */}
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 40 24" className="w-8 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 18 L18 4 L34 18" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
                <rect x="10" y="11" width="16" height="11" fill="#ea580c" opacity="0.3" />
                <rect x="12" y="14" width="4" height="8" fill="#15803d" />
                <rect x="20" y="14" width="4" height="4" fill="#a1a1aa" />
              </svg>
              <span className="text-[7px] text-zinc-500 font-medium leading-none mt-0.5">We Build Your Dreams</span>
            </div>
            <div className="flex flex-col text-left justify-center">
              <span className="font-bold text-xs tracking-tight text-zinc-800 leading-none">Defined</span>
              <span className="text-[9px] font-black text-rose-700 tracking-wider leading-none">GROUP</span>
            </div>
          </div>
        );

      case 'jiocinema':
        return (
          <div className="flex items-center space-x-1 justify-center">
            {/* Magenta rounded shield play button */}
            <div className="w-5 h-5 bg-pink-700 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-3 h-3 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
                <polygon points="8,5 19,12 8,19" />
              </svg>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-extrabold text-neutral-900 tracking-tighter">Jio</span>
              <span className="text-sm font-medium text-pink-700 font-sans tracking-tight">Cinema</span>
            </div>
          </div>
        );

      case 'kei-wires':
        return (
          <div className="flex flex-col items-center justify-center">
            <span className="text-base font-black text-blue-800 tracking-wider leading-none skew-x-6">KEI</span>
            <div className="w-12 h-0.5 bg-rose-600 mt-0.5"></div>
            <span className="text-[6px] uppercase tracking-widest text-blue-700 font-bold mt-0.5">Wires & Cables</span>
          </div>
        );

      case 'myteam11':
        return (
          <div className="flex items-center space-x-1 justify-center">
            <div className="w-4 h-4 bg-sky-700 rounded-sm flex items-center justify-center text-white text-[10px] font-black">M</div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-black text-sky-800 tracking-tighter leading-none">MYTEAM11</span>
              <span className="text-[6px] tracking-widest text-zinc-500 font-medium leading-none">FANTASY SPORTS</span>
            </div>
          </div>
        );

      case 'nutriorg':
        return (
          <div className="flex items-center space-x-1 justify-center">
            {/* Organic green leaf circle */}
            <div className="w-5 h-5 rounded-full border border-green-600 flex items-center justify-center">
              <span className="text-[8px] font-bold text-green-600">✓</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-black text-green-700 tracking-tight leading-none">nutriorg</span>
              <span className="text-[6px] text-zinc-500 font-medium leading-none">100% Organic & Pure</span>
            </div>
          </div>
        );

      case 'polytag':
        return (
          <div className="flex items-center space-x-1 justify-center">
            <div className="w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center relative">
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-extrabold text-slate-800 tracking-tight leading-none font-mono">PolyTag</span>
              <span className="text-[6px] text-emerald-600 tracking-wider font-semibold leading-none">GLOBAL HYGIENE</span>
            </div>
          </div>
        );

      case 'shiv-naresh':
        return (
          <div className="flex flex-col items-center justify-center">
            {/* Red leaping leopard silhouette outline */}
            <svg viewBox="0 0 60 16" className="w-14 h-4 text-red-600 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M5,10 Q20,3 40,8 Q50,3 55,10" stroke="currentColor" strokeWidth="2" fill="none" />
              <polygon points="40,8 44,4 42,9" />
            </svg>
            <span className="text-[9px] font-extrabold text-slate-900 tracking-tight select-none">SHIV-NARESH</span>
          </div>
        );

      case 'zee-studios':
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center space-x-0.5">
              <span className="text-sm font-black text-amber-600 tracking-tighter">ZEE</span>
              <span className="text-xs font-light text-zinc-700 tracking-wider border-l border-zinc-300 pl-1">STUDIOS</span>
            </div>
            <span className="text-[5px] uppercase tracking-widest text-zinc-400">No. 1 Entertainment</span>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full w-full">
            <span className="text-xs font-bold text-slate-400 capitalize">{id.replace('-', ' ')}</span>
          </div>
        );
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-md p-3 h-14 w-full flex items-center justify-center border border-zinc-200 hover:border-zinc-300 hover:scale-105 transition-all duration-300 ${className}`}>
      {renderLogoContent()}
    </div>
  );
};
