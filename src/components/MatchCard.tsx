import React from 'react';
import { Match } from '../types';

interface MatchCardProps {
  match: Match;
  onClickTeam: (teamId: string) => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, onClickTeam }) => {
  return (
    <div className="bg-slate-900/85 backdrop-blur-md rounded-2xl border border-slate-800 p-5 hover:border-yellow-500/40 transition-all duration-350 relative z-30 pointer-events-auto shadow-lg hover:shadow-[0_0_20px_rgba(234,179,8,0.05)]">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[10px] font-mono font-bold tracking-wider text-yellow-400 uppercase bg-yellow-500/10 px-2.5 py-1 rounded-full border border-yellow-500/25">
          {match.round}
        </span>
        <span className="px-2.5 py-1 bg-slate-805/50 text-slate-400 text-[10px] font-bold tracking-widest uppercase rounded-full border border-slate-700/40">
          LEAGUE MATCH • TBD
        </span>
      </div>

      <div className="grid grid-cols-7 items-center my-4">
        {/* Team A */}
        <button
          onClick={() => onClickTeam(match.teamAId)}
          className="col-span-3 flex flex-col items-center group cursor-pointer text-center"
        >
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${match.teamALogoColor} p-0.5 shadow-sm group-hover:scale-105 transition-transform duration-300`}>
            <div className="bg-slate-950 rounded-[10px] w-full h-full flex items-center justify-center text-xs font-black text-white">
              {match.teamAName.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          <span className="text-xs font-semibold text-white mt-2 group-hover:text-yellow-450 transition-colors line-clamp-1">
            {match.teamAName}
          </span>
          <span className="text-[10px] text-slate-500 font-mono font-medium mt-1">TBD/TBD <span className="text-[8px] opacity-70">(0.0 Ov)</span></span>
        </button>

        {/* VS / Score */}
        <div className="col-span-1 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono font-black text-yellow-400 uppercase tracking-widest">VS</span>
            <span className="text-[7.5px] font-bold text-slate-500 mt-0.5 uppercase tracking-wide">TBD</span>
          </div>
        </div>

        {/* Team B */}
        <button
          onClick={() => onClickTeam(match.teamBId)}
          className="col-span-3 flex flex-col items-center group cursor-pointer text-center"
        >
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${match.teamBLogoColor} p-0.5 shadow-sm group-hover:scale-105 transition-transform duration-300`}>
            <div className="bg-slate-950 rounded-[10px] w-full h-full flex items-center justify-center text-xs font-black text-white">
              {match.teamBName.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          <span className="text-xs font-semibold text-white mt-2 group-hover:text-yellow-400 transition-colors line-clamp-1">
            {match.teamBName}
          </span>
          <span className="text-[10px] text-slate-500 font-mono font-medium mt-1">TBD/TBD <span className="text-[8px] opacity-70">(0.0 Ov)</span></span>
        </button>
      </div>

      <div className="border-t border-slate-800/80 pt-3 flex flex-col space-y-1 text-[11px] text-slate-400">
        <div className="flex justify-between">
          <span className="font-medium text-slate-500">Date & Time</span>
          <span className="text-slate-200 font-mono">{match.date} | {match.time}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-slate-500">Venue</span>
          <span className="text-slate-300 font-sans truncate max-w-[150px]">{match.venue}</span>
        </div>
      </div>
    </div>
  );
};
