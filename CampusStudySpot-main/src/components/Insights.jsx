import React from 'react';
import { 
  BarChart3, 
  Clock, 
  Users, 
  TrendingUp, 
  Sparkles, 
  Award,
  Zap,
  Info
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { HOURLY_OCCUPANCY, CROWD_DISTRIBUTION } from '../data/mockData';

export default function Insights({ spaces = [] }) {
  // Sort popular spaces by reviews and rating
  const popularSpaces = [...spaces]
    .sort((a, b) => b.reviewsCount * b.rating - a.reviewsCount * a.rating)
    .slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Real-Time Analytics
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Campus Insights
        </h2>
        <p className="text-slate-500 text-sm mt-0.5">
          Data-backed trends, occupancy distributions, and optimal study schedules.
        </p>
      </div>

      {/* Best Time to Study Highlight Card (Prominent Card) */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl shadow-indigo-950/20">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-200">
                Optimal Productivity Recommendation
              </span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-2">
              Best time to study: <span className="text-amber-300">8:00 AM – 10:00 AM</span>
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Most campus study spaces average under <span className="font-bold text-white">28% occupancy</span> during this morning window. 
              Desk availability is at its peak and background acoustic interference is practically zero.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-medium text-slate-300">
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Early Morning: Lowest Crowd
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span> Afternoon: Moderate Traffic
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400"></span> Evening: Peak Cramming
              </span>
            </div>
          </div>

          {/* Quick Stat Highlight */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-center">
            <Clock className="w-8 h-8 text-indigo-300 mx-auto mb-2" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Average Morning Noise
            </span>
            <div className="text-3xl font-black text-white my-1">
              &lt; 32 dB
            </div>
            <span className="text-xs text-emerald-300 font-semibold">
              Whisper / Silent Quietude
            </span>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hourly Occupancy Distribution Bar Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-600" /> Hourly Campus Occupancy Rate (%)
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Historical aggregate pattern across all academic facilities.
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
              Today's Trend
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={HOURLY_OCCUPANCY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="hour" 
                  tick={{ fontSize: 11, fill: '#64748b' }} 
                  axisLine={{ stroke: '#e2e8f0' }} 
                  tickLine={false} 
                />
                <YAxis 
                  domain={[0, 100]} 
                  tick={{ fontSize: 11, fill: '#64748b' }} 
                  axisLine={{ stroke: '#e2e8f0' }} 
                  tickLine={false} 
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-xl text-xs shadow-lg border border-slate-700">
                          <p className="font-bold">{data.hour} — {data.label}</p>
                          <p className="text-indigo-300 font-semibold">{data.occupancy}% occupancy</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="occupancy" 
                  radius={[6, 6, 0, 0]} 
                  fill="#6366f1"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Crowd Level Breakdown Donut Chart (1 col) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600" /> Crowd Level Breakdown
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Proportion of active campus study spots.
              </p>
            </div>

            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CROWD_DISTRIBUTION}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {CROWD_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Legend */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            {CROWD_DISTRIBUTION.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }}></span>
                  <span className="font-medium text-slate-700">{c.name}</span>
                </div>
                <span className="font-bold text-slate-900">{c.value} spaces</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Most Popular Study Spaces Leaderboard */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" /> Most Popular Study Spaces
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Ranked by student engagement, repeat visits, and verified ratings.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularSpaces.map((s, idx) => (
            <div 
              key={s.id} 
              className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-indigo-200 transition-colors flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm shrink-0">
                #{idx + 1}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  {s.name}
                </h4>
                <p className="text-[11px] text-slate-500 truncate">{s.building}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] font-extrabold text-amber-600">★ {s.rating}</span>
                  <span className="text-[10px] text-slate-400">({s.reviewsCount} reviews)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

