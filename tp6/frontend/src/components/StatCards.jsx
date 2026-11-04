import React from 'react';
import { Users, Calendar, TrendingUp, Cpu } from 'lucide-react';

export const StatCards = ({ count, byYearData = [], isLoading }) => {
  // Compute analytics from byYearData
  const totalYears = byYearData.length;
  
  // Find peak cohort
  let peakCohort = null;
  if (byYearData.length > 0) {
    peakCohort = [...byYearData].sort((a, b) => b.count - a.count)[0];
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Card 1: Total Registered Students */}
      <div className="glass-card rounded-2xl p-5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl group-hover:bg-brand-500/20 transition-all pointer-events-none" />
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Total Students
          </span>
          <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          {isLoading ? (
            <div className="h-8 w-16 bg-slate-800 rounded animate-pulse" />
          ) : (
            <span className="text-3xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans']">
              {count}
            </span>
          )}
          <span className="text-xs text-emerald-400 font-medium">
            Active Records
          </span>
        </div>
        <p className="mt-2 text-[11px] text-slate-500">
          Source: <code className="text-brand-300 font-mono">GET /students/count</code>
        </p>
      </div>

      {/* Card 2: Distinct Birth Cohorts */}
      <div className="glass-card rounded-2xl p-5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all pointer-events-none" />
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Birth Cohorts
          </span>
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Calendar className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          {isLoading ? (
            <div className="h-8 w-16 bg-slate-800 rounded animate-pulse" />
          ) : (
            <span className="text-3xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans']">
              {totalYears}
            </span>
          )}
          <span className="text-xs text-slate-400">
            distinct {totalYears === 1 ? 'year' : 'years'}
          </span>
        </div>
        <p className="mt-2 text-[11px] text-slate-500">
          Source: <code className="text-indigo-300 font-mono">GET /students/byYear</code>
        </p>
      </div>

      {/* Card 3: Dominant Cohort */}
      <div className="glass-card rounded-2xl p-5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Top Birth Cohort
          </span>
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          {isLoading ? (
            <div className="h-8 w-24 bg-slate-800 rounded animate-pulse" />
          ) : peakCohort ? (
            <>
              <span className="text-2xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans']">
                {peakCohort.year}
              </span>
              <span className="text-xs text-purple-300 font-medium">
                ({peakCohort.count} {peakCohort.count === 1 ? 'student' : 'students'})
              </span>
            </>
          ) : (
            <span className="text-lg font-medium text-slate-500">No data</span>
          )}
        </div>
        <p className="mt-2 text-[11px] text-slate-500">
          Grouped via JPQL custom query
        </p>
      </div>

      {/* Card 4: Architecture & Backend */}
      <div className="glass-card rounded-2xl p-5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Architecture
          </span>
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Cpu className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-white tracking-tight font-['Plus_Jakarta_Sans']">
            Spring Boot 4.1
          </span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="px-1.5 py-0.5 text-[10px] font-mono bg-emerald-500/10 text-emerald-300 rounded border border-emerald-500/20">
            MySQL 8.0
          </span>
          <span className="px-1.5 py-0.5 text-[10px] font-mono bg-blue-500/10 text-blue-300 rounded border border-blue-500/20">
            OpenAPI 3.1
          </span>
        </div>
      </div>
    </div>
  );
};
