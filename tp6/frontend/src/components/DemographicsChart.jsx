import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';
import { BarChart3, PieChart as PieIcon, Database, RefreshCw, Calendar, TrendingUp } from 'lucide-react';

export const DemographicsChart = ({ byYearData = [], totalCount = 0, isLoading, onRefresh }) => {
  // Compute chart metrics
  const chartData = useMemo(() => {
    return byYearData.map((item) => ({
      year: String(item.year),
      count: item.count,
      percentage: totalCount > 0 ? ((item.count / totalCount) * 100).toFixed(1) : 0,
    }));
  }, [byYearData, totalCount]);

  const COLORS = [
    '#0ea5e9', '#6366f1', '#a855f7', '#ec4899', 
    '#f43f5e', '#f97316', '#eab308', '#10b981', '#14b8a6'
  ];

  // Custom Tooltip for Bar Chart
  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-3 rounded-xl bg-slate-900/95 border border-white/[0.1] shadow-2xl backdrop-blur-md">
          <p className="text-xs font-semibold text-slate-400">Birth Cohort</p>
          <p className="text-base font-extrabold text-white mt-0.5">Year {label}</p>
          <div className="mt-2 flex items-center justify-between gap-4 text-xs">
            <span className="text-brand-400 font-medium">{data.count} {data.count === 1 ? 'student' : 'students'}</span>
            <span className="text-slate-400 font-mono">({data.percentage}%)</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner explaining backend utility */}
      <div className="p-5 rounded-2xl glass-panel border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 flex-shrink-0">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
              Birth Year Demographics & Analytics
            </h2>
            <p className="text-xs text-slate-400">
              Visualizing data aggregated via endpoint <code className="text-brand-300 font-mono">GET /students/byYear</code>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-white/[0.08] rounded-xl transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-brand-400' : ''}`} />
            <span>Refresh Analytics</span>
          </button>
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="p-12 text-center glass-panel rounded-2xl border border-white/[0.08]">
          <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-white">No Demographic Data Available</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Once students with birth dates are added to the database, cohorts and distribution statistics will render here automatically.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Bar Chart (2 columns on lg) */}
          <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/[0.08]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Students per Birth Year
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Cohort frequency analysis
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />
                <span>Student Volume</span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis 
                    dataKey="year" 
                    stroke="#64748b" 
                    fontSize={12} 
                    tickLine={false} 
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={12} 
                    tickLine={false}
                    allowDecimals={false} 
                  />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Donut Distribution Chart (1 column on lg) */}
          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Cohort Distribution
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Proportional share (%)
                  </p>
                </div>
                <PieIcon className="w-4 h-4 text-slate-500" />
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="count"
                      nameKey="year"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`donut-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(val, name, props) => [`${val} students (${props.payload.percentage}%)`, `Year ${name}`]}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/[0.06] text-center">
              <span className="text-xs text-slate-400">Total Analyzed:</span>{' '}
              <span className="text-xs font-bold text-white font-mono">{totalCount} Students</span>
            </div>
          </div>

          {/* Full Cohort Breakdown Table */}
          <div className="lg:col-span-3 glass-panel rounded-2xl border border-white/[0.08] overflow-hidden">
            <div className="p-4 sm:px-6 border-b border-white/[0.08] bg-slate-900/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-brand-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Demographic Breakdown Table
                </h3>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">
                SELECT YEAR(s.dateNaissance), COUNT(s) FROM Student s GROUP BY YEAR(s.dateNaissance)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-slate-950/40 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4 sm:px-6">Birth Year</th>
                    <th className="py-3 px-4">Students Enrolled</th>
                    <th className="py-3 px-4">Percentage of Total</th>
                    <th className="py-3 px-4 sm:pr-6">Relative Density</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {chartData.map((item, idx) => (
                    <tr key={item.year} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 sm:px-6 font-mono font-bold text-white">
                        {item.year}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-200">
                        {item.count} {item.count === 1 ? 'student' : 'students'}
                      </td>
                      <td className="py-3 px-4 font-mono text-brand-300">
                        {item.percentage}%
                      </td>
                      <td className="py-3 px-4 sm:pr-6">
                        <div className="w-full max-w-xs h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500" 
                            style={{ 
                              width: `${item.percentage}%`,
                              backgroundColor: COLORS[idx % COLORS.length]
                            }} 
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
