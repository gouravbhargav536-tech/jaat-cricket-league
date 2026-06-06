import React, { useState } from 'react';
import { Team } from '../types';
import { TeamLogo } from './TeamLogo';
import { X, Shield, Users, Award, Briefcase, Calendar, ChevronRight, UserRound } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TeamDetailModalProps {
  team: Team | null;
  onClose: () => void;
}

export const TeamDetailModal: React.FC<TeamDetailModalProps> = ({ team, onClose }) => {
  const [activeRoleFilter, setActiveRoleFilter] = useState<'All' | 'Raider' | 'Defender' | 'All-rounder'>('All');

  if (!team) return null;

  const filteredRoster = activeRoleFilter === 'All' 
    ? team.roster 
    : team.roster.filter(p => p.role === activeRoleFilter);

  // Calculate Win Rate percentage
  const totalGames = team.stats.played;
  const winRate = totalGames > 0 ? Math.round((team.stats.won / totalGames) * 100) : 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col z-10"
        >
          {/* Header Banner Background */}
          <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-r from-slate-950 to-slate-900 overflow-hidden opacity-40">
            <div className={`absolute top-0 right-0 w-80 h-80 rounded-full bg-gradient-to-br ${team.logoColor} opacity-10 blur-3xl`} />
            <div className={`absolute top-12 left-24 w-40 h-40 rounded-full bg-gradient-to-tr ${team.logoColor} opacity-10 blur-2xl`} />
          </div>

          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition"
          >
            <X size={20} />
          </button>

          {/* Content Wrapper */}
          <div className="overflow-y-auto flex-1 p-6 md:p-8 relative z-10 scrollbar-thin scrollbar-thumb-slate-800">
            {/* Team Summary Header */}
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 mb-8 mt-4">
              <div className={`w-28 h-28 rounded-2xl bg-gradient-to-br ${team.logoColor} p-1 shadow-lg shadow-black/40 flex-shrink-0`}>
                <div className="bg-slate-950 rounded-xl w-full h-full flex items-center justify-center p-2">
                  <TeamLogo seed={team.logoSvgSeed} size={84} />
                </div>
              </div>

              <div className="flex-1 mt-2">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1.5">
                  <span className={`text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white bg-gradient-to-r ${team.logoColor}`}>
                    {team.type} league
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1 bg-slate-800/60 px-3 py-1 rounded-full">
                    <Calendar size={12} className="text-cyan-400" /> Founded {team.founded}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{team.fullName}</h2>
                <p className="text-slate-300 font-medium text-sm italic mt-1 font-mono tracking-wide">
                  "{team.tagline}"
                </p>
                <p className="text-slate-400 text-sm mt-3 leading-relaxed max-w-2xl">{team.description}</p>
              </div>
            </div>

            {/* Quick Personnel Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-950/60 border border-slate-850 p-4 rounded-2xl relative overflow-hidden">
                <span className="text-xs text-slate-500 font-medium block uppercase tracking-wider mb-1">Mascot</span>
                <span className="text-base font-bold text-slate-200 block truncate">{team.mascot}</span>
                <div className="absolute right-3 bottom-2 text-slate-800">
                  <Award size={32} />
                </div>
              </div>
              <div className="bg-slate-950/60 border border-slate-850 p-4 rounded-2xl relative overflow-hidden">
                <span className="text-xs text-slate-500 font-medium block uppercase tracking-wider mb-1">Captain</span>
                <span className="text-base font-bold text-slate-200 block truncate">{team.captain}</span>
                <div className="absolute right-3 bottom-2 text-slate-800">
                  <UserRound size={32} />
                </div>
              </div>
              <div className="bg-slate-950/60 border border-slate-850 p-4 rounded-2xl relative overflow-hidden">
                <span className="text-xs text-slate-500 font-medium block uppercase tracking-wider mb-1">Head Coach</span>
                <span className="text-base font-bold text-slate-200 block truncate">{team.coach}</span>
                <div className="absolute right-3 bottom-2 text-slate-800">
                  <Briefcase size={32} />
                </div>
              </div>
              <div className="bg-slate-950/60 border border-slate-850 p-4 rounded-2xl relative overflow-hidden">
                <span className="text-xs text-slate-500 font-medium block uppercase tracking-wider mb-1">League Win Rate</span>
                <span className="text-base font-bold text-cyan-400 block">{winRate}%</span>
                <div className="absolute right-3 bottom-2 text-slate-800">
                  <Shield size={32} />
                </div>
              </div>
            </div>

            {/* Interactive Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Leaderboard Stat Box */}
              <div className="col-span-1 bg-slate-950/50 border border-slate-800/80 p-5 rounded-2xl flex flex-col justify-between">
                <h3 className="text-sm font-bold text-white tracking-wide uppercase border-b border-slate-800 pb-2 mb-4">
                  Match Statistics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 block">Played</span>
                    <span className="text-xl font-bold text-slate-200 font-mono">{team.stats.played}</span>
                  </div>
                  <div className="text-center bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
                    <span className="text-xs text-emerald-400 block">Won</span>
                    <span className="text-xl font-bold text-emerald-300 font-mono">{team.stats.won}</span>
                  </div>
                  <div className="text-center bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20">
                    <span className="text-xs text-rose-400 block">Lost</span>
                    <span className="text-xl font-bold text-rose-300 font-mono">{team.stats.lost}</span>
                  </div>
                  <div className="text-center bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 block">Points</span>
                    <span className="text-xl font-bold text-yellow-400 font-mono">{team.stats.points}</span>
                  </div>
                </div>
              </div>

              {/* Roster & Squad */}
              <div className="col-span-1 md:col-span-2 bg-slate-950/50 border border-slate-800/80 p-5 rounded-2xl flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <Users size={16} className="text-cyan-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wide">Squad Roster</h3>
                  </div>

                  {/* Filter Subtabs */}
                  <div className="flex flex-wrap gap-1">
                    {(['All', 'Raider', 'Defender', 'All-rounder'] as const).map(role => (
                      <button
                        key={role}
                        onClick={() => setActiveRoleFilter(role)}
                        className={`text-[10px] font-bold uppercase py-1 px-2.5 rounded-full border transition ${
                          activeRoleFilter === role 
                            ? 'bg-cyan-500 text-slate-950 border-cyan-500' 
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        {role === 'All' ? 'All Roles' : `${role}s`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Squad List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[190px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 pr-1">
                  {filteredRoster.map((player, idx) => (
                    <div 
                      key={idx}
                      className="bg-slate-905 border border-slate-850 p-2.5 rounded-xl flex items-center justify-between hover:border-slate-800 transition"
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <span className="w-6 h-6 rounded-md bg-slate-850 border border-slate-750 flex items-center justify-center font-mono text-xs text-cyan-400 font-bold">
                          {player.jerseyNo}
                        </span>
                        <div className="truncate flex flex-col text-left">
                          <span className="text-xs font-semibold text-white truncate">{player.name}</span>
                          <span className="text-[9px] text-slate-500">{player.nationality}</span>
                        </div>
                      </div>
                      <span className={`text-[9px] py-0.5 px-2 font-mono font-bold uppercase rounded ${
                        player.role === 'Raider' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/15' :
                        player.role === 'Defender' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/15' :
                        'bg-teal-500/10 text-teal-400 border border-teal-500/15'
                      }`}>
                        {player.role}
                      </span>
                    </div>
                  ))}
                  {filteredRoster.length === 0 && (
                    <div className="col-span-2 text-center py-6 text-xs text-slate-500 italic">
                      No squad members found for this role filter.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
