import React from 'react';
import { 
  Filter, 
  RotateCcw, 
  ArrowUpDown, 
  Wifi, 
  Zap, 
  Wind,
  Search,
  Sparkles
} from 'lucide-react';

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  crowdFilter,
  setCrowdFilter,
  noiseFilter,
  setNoiseFilter,
  amenitiesFilter,
  toggleAmenity,
  sortBy,
  setSortBy,
  onResetFilters,
  totalResults
}) {
  const crowdOptions = ['All', 'Low', 'Moderate', 'High'];
  const noiseOptions = ['All', 'Silent', 'Quiet', 'Moderate', 'Collaborative'];

  const hasActiveFilters = 
    searchQuery.trim() !== '' ||
    crowdFilter !== 'All' ||
    noiseFilter !== 'All' ||
    amenitiesFilter.wifi ||
    amenitiesFilter.charging ||
    amenitiesFilter.ac ||
    sortBy !== 'highest-rated';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 mb-6 shadow-2xs">
      {/* Top row: search & sorting */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        {/* Search input in filters */}
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by space name, building, or category..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Sort selector & reset */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
            >
              <option value="highest-rated">Highest Rated ⭐</option>
              <option value="lowest-crowd">Lowest Crowd Level 🟢</option>
              <option value="most-seats">Most Available Seats 🪑</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-xs font-bold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom row: Multi-select pill filters */}
      <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Crowd Pill Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              Crowd:
            </span>
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl">
              {crowdOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setCrowdFilter(opt)}
                  className={`
                    px-2.5 py-1 rounded-lg text-xs font-bold transition-all
                    ${crowdFilter === opt 
                      ? 'bg-white text-indigo-700 shadow-2xs' 
                      : 'text-slate-500 hover:text-slate-800'
                    }
                  `}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Noise Pill Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              Noise:
            </span>
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl">
              {noiseOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setNoiseFilter(opt)}
                  className={`
                    px-2.5 py-1 rounded-lg text-xs font-bold transition-all
                    ${noiseFilter === opt 
                      ? 'bg-white text-indigo-700 shadow-2xs' 
                      : 'text-slate-500 hover:text-slate-800'
                    }
                  `}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities Toggles */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              Amenities:
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => toggleAmenity('wifi')}
                className={`
                  px-2.5 py-1 rounded-xl text-xs font-bold border flex items-center gap-1 transition-all
                  ${amenitiesFilter.wifi 
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-700' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }
                `}
              >
                <Wifi className="w-3 h-3 text-indigo-500" />
                <span>Wi-Fi</span>
              </button>

              <button
                onClick={() => toggleAmenity('charging')}
                className={`
                  px-2.5 py-1 rounded-xl text-xs font-bold border flex items-center gap-1 transition-all
                  ${amenitiesFilter.charging 
                    ? 'bg-amber-50 border-amber-300 text-amber-700' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }
                `}
              >
                <Zap className="w-3 h-3 text-amber-500" />
                <span>Charging</span>
              </button>

              <button
                onClick={() => toggleAmenity('ac')}
                className={`
                  px-2.5 py-1 rounded-xl text-xs font-bold border flex items-center gap-1 transition-all
                  ${amenitiesFilter.ac 
                    ? 'bg-blue-50 border-blue-300 text-blue-700' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }
                `}
              >
                <Wind className="w-3 h-3 text-blue-500" />
                <span>AC</span>
              </button>
            </div>
          </div>
        </div>

        {/* Total results indicator */}
        <div className="text-xs font-semibold text-slate-500 self-end md:self-center">
          Showing <span className="font-extrabold text-slate-900">{totalResults}</span> {totalResults === 1 ? 'space' : 'spaces'}
        </div>
      </div>
    </div>
  );
}

