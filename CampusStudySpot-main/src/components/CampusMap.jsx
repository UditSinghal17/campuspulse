import React, { useState } from 'react';
import { 
  MapPin, 
  Building2, 
  Users, 
  ArrowRight, 
  Sparkles, 
  Navigation,
  Compass,
  Info,
  Layers
} from 'lucide-react';
import { CAMPUS_BUILDINGS } from '../data/mockData';

export default function CampusMap({ onSelectSpaceById }) {
  const [selectedBuilding, setSelectedBuilding] = useState(CAMPUS_BUILDINGS[0]);

  const getCrowdBadge = (crowd) => {
    switch (crowd.toLowerCase()) {
      case 'low': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'moderate': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'high': return 'bg-rose-100 text-rose-800 border-rose-300';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Interactive Campus Navigation
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Campus Study Spot Map
          </h2>
          <p className="text-slate-500 text-sm mt-0.5">
            Click any building pin to inspect available rooms, real-time crowd levels, and facilities.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-indigo-600" />
            North Campus Grid
          </span>
        </div>
      </div>

      {/* Main Map Container & Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Illustrated Campus Map (2 cols) */}
        <div className="lg:col-span-2 relative bg-gradient-to-br from-emerald-50/70 via-slate-50 to-indigo-50/50 rounded-3xl border border-slate-200/90 p-4 sm:p-6 overflow-hidden shadow-inner min-h-[460px] flex items-center justify-center">
          
          {/* Subtle SVG Landscape Roads & Green Zones Background */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="campus-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.75" strokeDasharray="3 3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#campus-grid)" opacity="0.6" />

            {/* University Central Walkway / Boulevard */}
            <path
              d="M 50 450 Q 200 320 400 240 T 750 80"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="24"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Inner path line */}
            <path
              d="M 50 450 Q 200 320 400 240 T 750 80"
              fill="none"
              stroke="#ffffff"
              strokeWidth="6"
              strokeDasharray="8 8"
              strokeLinecap="round"
            />

            {/* Cross Avenue */}
            <path
              d="M 200 50 Q 300 220 500 450"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="16"
              strokeLinecap="round"
            />

            {/* Botanical Garden Lake / Green Pond */}
            <ellipse cx="25%" cy="70%" rx="90" ry="50" fill="#a7f3d0" fillOpacity="0.4" stroke="#6ee7b7" strokeWidth="2" strokeDasharray="4 4" />
            
            {/* Library Lawn */}
            <rect x="36%" y="26%" width="120" height="90" rx="20" fill="#c7d2fe" fillOpacity="0.3" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="6 6" />
          </svg>

          {/* Map Compass Rose */}
          <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col items-center">
            <span className="text-[10px] font-black text-indigo-600">N</span>
            <div className="w-4 h-4 text-slate-400">▲</div>
          </div>

          {/* Interactive Building Pins */}
          {CAMPUS_BUILDINGS.map((b) => {
            const isSelected = selectedBuilding.id === b.id;
            return (
              <div
                key={b.id}
                onClick={() => setSelectedBuilding(b)}
                style={{ top: `${b.y}%`, left: `${b.x}%` }}
                className={`
                  absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20 transition-all duration-300
                  ${isSelected ? 'scale-115 z-30' : 'hover:scale-110'}
                `}
              >
                {/* Floating Ping ring */}
                {isSelected && (
                  <span className="absolute -inset-2 rounded-full bg-indigo-500/25 animate-ping"></span>
                )}

                {/* Marker Body */}
                <div className={`
                  relative flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border shadow-lg backdrop-blur-md transition-all
                  ${isSelected
                    ? 'bg-slate-900 border-indigo-500 text-white shadow-indigo-500/30 ring-2 ring-indigo-400/50'
                    : 'bg-white/95 border-slate-200 text-slate-800 hover:border-indigo-300'
                  }
                `}>
                  <div className={`
                    w-6 h-6 rounded-xl flex items-center justify-center font-black text-[11px]
                    ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}
                  `}>
                    {b.code}
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-extrabold leading-none tracking-tight">
                      {b.shortName}
                    </p>
                    <span className={`text-[9px] font-bold ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                      {b.occupancy}% full
                    </span>
                  </div>
                </div>

                {/* Pin Tip */}
                <div className={`
                  w-2 h-2 mx-auto rotate-45 -mt-1
                  ${isSelected ? 'bg-slate-900' : 'bg-white'}
                `}></div>
              </div>
            );
          })}

          {/* Bottom Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3 text-xs">
            <span className="font-bold text-slate-500 text-[10px] uppercase">Occupancy:</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[11px] text-slate-600 font-medium">Low</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="text-[11px] text-slate-600 font-medium">Moderate</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span className="text-[11px] text-slate-600 font-medium">High</span>
            </div>
          </div>
        </div>

        {/* Selected Building Details Sidebar (1 col) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" /> Building Info
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${getCrowdBadge(selectedBuilding.crowdLevel)}`}>
                {selectedBuilding.crowdLevel} Crowd
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-1">
              {selectedBuilding.name}
            </h3>
            <p className="text-xs text-slate-500 font-medium mb-4">
              Building Code: <span className="font-mono font-bold text-indigo-600">{selectedBuilding.code}</span> &bull; {selectedBuilding.type}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Study Spaces
                </span>
                <span className="text-lg font-black text-slate-800">
                  {selectedBuilding.spacesCount} Available
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Average Occupancy
                </span>
                <span className="text-lg font-black text-indigo-600">
                  {selectedBuilding.occupancy}%
                </span>
              </div>
            </div>

            {/* Capacity status note */}
            <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 mb-6 flex items-start gap-3">
              <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <p className="text-xs text-indigo-900 leading-relaxed font-medium">
                {selectedBuilding.occupancy < 50
                  ? 'Plenty of desks open right now. Highly recommended for productive sessions.'
                  : selectedBuilding.occupancy < 80
                  ? 'Moderate activity. Individual cubicles filling steadily.'
                  : 'Near peak capacity. We recommend booking or heading to west wing annex.'}
              </p>
            </div>
          </div>

          {/* Action button: inspect space directly */}
          <button
            onClick={() => onSelectSpaceById(selectedBuilding.topSpaceId)}
            className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
          >
            <span>Explore Spaces in {selectedBuilding.shortName}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

