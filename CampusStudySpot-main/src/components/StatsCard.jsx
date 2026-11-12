import React from 'react';
import { Building2, Users2, VolumeX, Wifi, TrendingDown, ArrowUpRight } from 'lucide-react';

export default function StatsCard({ spaces = [] }) {
  // Compute dynamic stats from actual spaces data
  const totalSpaces = spaces.length;
  const avgOccupancy = Math.round(
    spaces.reduce((acc, curr) => acc + curr.occupancy, 0) / (totalSpaces || 1)
  );
  const quietZonesCount = spaces.filter(s => s.noiseLevel === 'Silent' || s.noiseLevel === 'Quiet').length;
  const freeWifiCount = spaces.filter(s => s.wifi && s.wifi.length > 0).length;

  const stats = [
    {
      id: 'total',
      label: 'Study Spaces',
      value: `${totalSpaces} Live`,
      subtext: 'Across 6 campus buildings',
      icon: Building2,
      color: 'indigo',
      badge: '+2 new rooms',
      bgIcon: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    {
      id: 'occupancy',
      label: 'Average Occupancy',
      value: `${avgOccupancy}%`,
      subtext: 'Campus-wide live capacity',
      icon: Users2,
      color: 'amber',
      badge: 'Moderate',
      bgIcon: 'bg-amber-50 text-amber-600 border-amber-100',
    },
    {
      id: 'quiet',
      label: 'Quiet Zones',
      value: `${quietZonesCount} Spaces`,
      subtext: 'Low distraction rating',
      icon: VolumeX,
      color: 'purple',
      badge: 'Available',
      bgIcon: 'bg-purple-50 text-purple-600 border-purple-100',
    },
    {
      id: 'wifi',
      label: 'Free High-Speed Wi-Fi',
      value: `${freeWifiCount} Spaces`,
      subtext: 'Up to 600 Mbps coverage',
      icon: Wifi,
      color: 'emerald',
      badge: 'Gigabit fiber',
      bgIcon: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
  ];

  return (
    <section className="mb-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${stat.bgIcon}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  {stat.badge}
                </span>
              </div>

              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {stat.value}
                </p>
                <h4 className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">
                  {stat.label}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 truncate">
                  {stat.subtext}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

