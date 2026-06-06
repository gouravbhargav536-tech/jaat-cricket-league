import React from 'react';

interface TeamLogoProps {
  seed: string;
  className?: string;
  size?: number;
}

export const TeamLogo: React.FC<TeamLogoProps> = ({ seed, className = '', size = 80 }) => {
  const renderLogo = () => {
    switch (seed) {
      case 'hurricanes':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="hurr-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
            </defs>
            <polygon points="50,5 92,20 82,75 50,95 18,75 8,20" fill="#0f172a" stroke="url(#hurr-grad)" strokeWidth="4" />
            {/* Hurricane spiral rays */}
            <path d="M50,25 C30,25 30,50 50,50 C70,50 70,75 50,75" stroke="url(#hurr-grad)" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
            <path d="M50,30 C35,30 35,50 50,50 C65,50 65,70 50,70" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            {/* Crossed Cricket Bats */}
            <path d="M35,65 L55,30" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
            <path d="M40,65 L57,33" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
            <path d="M35,65 L31,69" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
            {/* Crimson Cricket Ball */}
            <circle cx="58" cy="30" r="6" fill="#dc2626" />
            <circle cx="56" cy="28" r="1.5" fill="#ffffff" />
            <path d="M54,32 Q58,34 62,30" stroke="#ffffff" strokeWidth="0.8" fill="none" />
          </svg>
        );

      case 'dynamites':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="dyna-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="45" fill="#0e0717" stroke="url(#dyna-grad)" strokeWidth="4" />
            {/* Exploding sparks */}
            <path d="M50,15 L50,5 M85,50 L95,50 M15,50 L5,50 M50,85 L50,95 M25,25 L15,15 M75,25 L85,15 M25,75 L15,85 M75,75 L85,85" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
            {/* Exploding Red Cricket Ball */}
            <circle cx="50" cy="50" r="22" fill="url(#dyna-grad)" stroke="#ffffff" strokeWidth="1.5" />
            <path d="M32,44 C42,42 42,58 68,56" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="3 2" fill="none" />
            {/* Explosion cracks */}
            <path d="M28,50 L10,50 M72,50 L90,50 M50,28 L50,10" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
            <polygon points="50,20 53,28 61,23 55,30 62,35 53,35" fill="#facc15" />
          </svg>
        );

      case 'rangers':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="rang-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
            </defs>
            <path d="M50,5 C75,5 90,20 90,55 C90,75 50,95 50,95 C50,95 10,75 10,55 C10,20 25,5 50,5 Z" fill="#0f172a" stroke="url(#rang-grad)" strokeWidth="4" />
            {/* Crossed Bats */}
            <path d="M30,70 L70,30" stroke="url(#rang-grad)" strokeWidth="6" strokeLinecap="round" />
            <path d="M70,70 L30,30" stroke="url(#rang-grad)" strokeWidth="6" strokeLinecap="round" />
            {/* Centered Golden Wickets */}
            <rect x="42" y="32" width="3" height="34" rx="1.5" fill="#ffffff" />
            <rect x="49" y="32" width="3" height="34" rx="1.5" fill="#ffffff" />
            <rect x="56" y="32" width="3" height="34" rx="1.5" fill="#ffffff" />
            <rect x="39" y="29" width="22" height="3" rx="1" fill="#facc15" />
            {/* Red seam cricket ball */}
            <circle cx="50" cy="74" r="8" fill="#dc2626" stroke="#ffffff" strokeWidth="1" />
            <path d="M44,74 Q50,78 56,74" stroke="#ffffff" strokeWidth="1" fill="none" />
          </svg>
        );

      case 'united':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="unit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
            <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="#0a0525" stroke="url(#unit-grad)" strokeWidth="4" />
            {/* Crown of Stars */}
            <path d="M32,32 L40,38 L50,28 L60,38 L68,32 L64,48 L36,48 Z" fill="#eab308" />
            <circle cx="50" cy="22" r="3" fill="#ffffff" />
            {/* Three Wickets */}
            <rect x="40" y="48" width="4" height="32" fill="url(#unit-grad)" rx="2" />
            <rect x="48" y="48" width="4" height="32" fill="url(#unit-grad)" rx="2" />
            <rect x="56" y="48" width="4" height="32" fill="url(#unit-grad)" rx="2" />
            {/* Star in center */}
            <polygon points="50,54 52,58 57,58 53,61 55,66 50,63 45,66 47,61 43,58 48,58" fill="#ffffff" />
            {/* Wicket bail */}
            <rect x="36" y="45" width="28" height="3" rx="1" fill="#ffffff" />
          </svg>
        );

      case 'panthers':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="pant-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
            <polygon points="50,5 92,15 82,75 50,95 18,75 8,15" fill="#0f0720" stroke="url(#pant-grad)" strokeWidth="4" />
            {/* Roaring wild panther profile */}
            <path d="M30,55 Q35,35 55,30 Q65,28 72,35 Q78,40 70,50 Q66,54 58,52 Q50,55 45,63 Q38,68 30,55 Z" fill="url(#pant-grad)" />
            {/* Fangs */}
            <polygon points="68,50 67,46 72,47" fill="#ffffff" />
            <polygon points="56,28 62,22 61,31" fill="#0f0720" />
            {/* Golden Cricket Ball placed near panther paw level */}
            <circle cx="72" cy="70" r="10" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
            <path d="M64,70 Q72,74 80,70" stroke="#ffffff" strokeWidth="1.2" fill="none" />
            <circle cx="70" cy="68" r="1.5" fill="#ffffff" />
          </svg>
        );

      case 'monarchs':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="mon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
            </defs>
            <path d="M50,5 C78,5 90,20 90,50 C90,75 50,95 50,95 C50,95 10,75 10,50 C10,20 22,5 50,5 Z" fill="#070a1e" stroke="url(#mon-grad)" strokeWidth="4" />
            {/* Crown */}
            <path d="M25,35 L38,48 L50,30 L62,48 L75,35 L68,66 L32,66 Z" fill="url(#mon-grad)" />
            {/* Crown pearls */}
            <circle cx="25" cy="32" r="3.5" fill="#fbbf24" />
            <circle cx="50" cy="27" r="4.5" fill="#fbbf24" />
            <circle cx="75" cy="32" r="3.5" fill="#fbbf24" />
            {/* Wickets inside crown base */}
            <rect x="42" y="55" width="2" height="15" fill="#ffffff" />
            <rect x="49" y="55" width="2" height="15" fill="#ffffff" />
            <rect x="56" y="55" width="2" height="15" fill="#ffffff" />
            {/* Imperial stars */}
            <polygon points="50,76 52,80 57,80 53,83 55,88 50,85 45,88 47,83 43,80 48,80" fill="#fbbf24" />
          </svg>
        );

      case 'jaguars':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="jag-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
            </defs>
            <rect x="12" y="12" width="76" height="76" rx="16" fill="#080214" stroke="url(#jag-grad)" strokeWidth="4" />
            {/* Jaguar face silhouette representing pink city agility */}
            <path d="M32,44 C30,32 40,26 50,32 C60,26 70,32 68,44 L64,65 C64,65 36,65 36,65 Z" fill="url(#jag-grad)" />
            <polygon points="32,34 26,22 38,28" fill="#fbbf24" />
            <polygon points="68,34 74,22 62,28" fill="#fbbf24" />
            {/* Glowing cyan eyes */}
            <polygon points="41,43 45,44 43,48" fill="#06b6d4" />
            <polygon points="59,43 55,44 57,48" fill="#06b6d4" />
            {/* Bat crossing below jag */}
            <path d="M22,76 L78,76" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
            {/* Center ball */}
            <circle cx="50" cy="76" r="5" fill="#db2777" />
          </svg>
        );

      case 'warriors':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="warr-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="#0f0a28" stroke="url(#warr-grad)" strokeWidth="4" />
            {/* Roman style war helmet made of cricket stumps */}
            <path d="M35,35 C35,22 65,22 65,35 L65,58 L35,58 Z" fill="url(#warr-grad)" />
            {/* Visor slots showing cricket bails */}
            <rect x="40" y="44" width="20" height="4" fill="#0f0a28" />
            <rect x="44" y="40" width="12" height="2" fill="#ffffff" />
            {/* Crossed heavy bats in golden */}
            <path d="M25,72 L75,32" stroke="#ea580c" strokeWidth="4.5" strokeLinecap="round" opacity="0.6" />
            <path d="M75,72 L25,32" stroke="#ea580c" strokeWidth="4.5" strokeLinecap="round" opacity="0.6" />
            {/* Central cricket star ball */}
            <circle cx="50" cy="72" r="8" fill="#fc8c03" stroke="#ffffff" strokeWidth="1.5" />
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="80" height="80" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="4" />
            <text x="50" y="55" dominantBaseline="middle" textAnchor="middle" fill="#94a3b8" fontSize="20" fontWeight="bold">JCL</text>
          </svg>
        );
    }
  };

  return (
    <div className={`p-1 select-none flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {renderLogo()}
    </div>
  );
};
