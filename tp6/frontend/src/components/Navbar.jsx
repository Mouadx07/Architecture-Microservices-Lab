import React from 'react';
import { 
  GraduationCap, 
  Activity, 
  ExternalLink, 
  Sparkles, 
  UserPlus, 
  BarChart3, 
  Database, 
  Terminal,
  RefreshCw
} from 'lucide-react';

export const Navbar = ({ 
  activeTab, 
  setActiveTab, 
  health, 
  onAddStudent, 
  onSeedData, 
  isSeeding,
  onRefresh,
  isRefreshing
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 shadow-glow">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white font-['Plus_Jakarta_Sans']">
                  STUDENT<span className="text-brand-400">LY</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-brand-500/10 text-brand-300 border border-brand-500/20 rounded-md">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Spring Boot REST & Swagger UI Client
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-white/[0.06]">
            <button
              onClick={() => setActiveTab('directory')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'directory'
                  ? 'bg-brand-500 text-white shadow-sm shadow-brand-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              Students Directory
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'analytics'
                  ? 'bg-brand-500 text-white shadow-sm shadow-brand-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Birth Demographics
            </button>
            <button
              onClick={() => setActiveTab('api')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'api'
                  ? 'bg-brand-500 text-white shadow-sm shadow-brand-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              Swagger API Console
            </button>
          </nav>

          {/* Right Header Utilities: Health Status, Swagger Link, Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Backend Health Badge */}
            <div 
              title={health.online ? `Backend connected • Latency: ${health.latency}ms` : 'Backend connection error (check port 8080)'}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
                health.online 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${health.online ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
              <span className="hidden sm:inline font-sans font-medium text-[11px]">
                {health.online ? 'API Online' : 'API Offline'}
              </span>
              {health.online && health.latency !== null && (
                <span className="text-[10px] opacity-75">{health.latency}ms</span>
              )}
            </div>

            {/* Swagger UI direct link */}
            <a
              href="http://localhost:8080/swagger-ui/index.html#/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-white/[0.08] rounded-lg transition-all"
              title="Open Swagger UI documentation in new tab"
            >
              <span>Swagger UI</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              title="Refresh all data"
              className="p-2 text-slate-400 hover:text-white hover:bg-white/[0.06] rounded-lg border border-white/[0.06] transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-brand-400' : ''}`} />
            </button>

            {/* Seed Demo Data Button */}
            <button
              onClick={onSeedData}
              disabled={isSeeding}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-300 hover:text-indigo-200 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-lg transition-all"
              title="Generate sample student records across varied birth years"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isSeeding ? 'animate-spin' : ''}`} />
              <span>{isSeeding ? 'Seeding...' : 'Seed Data'}</span>
            </button>

            {/* New Student Primary CTA */}
            <button
              onClick={onAddStudent}
              className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 rounded-lg shadow-glow hover:shadow-brand-500/40 transition-all active:scale-[0.98]"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Student</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Tabs */}
        <div className="flex md:hidden border-t border-white/[0.06] py-2 gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('directory')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${
              activeTab === 'directory'
                ? 'bg-brand-500 text-white'
                : 'text-slate-400 hover:bg-white/[0.04]'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            Students
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'bg-brand-500 text-white'
                : 'text-slate-400 hover:bg-white/[0.04]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Demographics
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${
              activeTab === 'api'
                ? 'bg-brand-500 text-white'
                : 'text-slate-400 hover:bg-white/[0.04]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            Swagger API
          </button>
        </div>

      </div>
    </header>
  );
};
