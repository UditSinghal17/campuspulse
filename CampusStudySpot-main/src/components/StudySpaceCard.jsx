import React from 'react';
import { 
  Heart, 
  MapPin, 
  Wifi, 
  Zap, 
  Star, 
  Volume2, 
  Users, 
  ArrowRight,
  Wind
} from 'lucide-react';

export default function StudySpaceCard({ 
  space, 
  isFavorite, 
  onToggleFavorite, 
  onViewDetails 
}) {
  // Crowd badge style helper
  const getCrowdBadge = (level) => {
    switch (level?.toLowerCase()) {
      case 'low':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500',
          label: 'Low Crowd'
        };
      case 'moderate':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500',
          label: 'Moderate'
        };
      case 'high':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          dot: 'bg-rose-500',
          label: 'High Crowd'
        };
      default:
        return {
          bg: 'bg-slate-50 text-slate-700 border-slate-200',
          dot: 'bg-slate-400',
          label: level
        };
    }
  };

  const crowd = getCrowdBadge(space.crowdLevel);

  // Noise level icon badge
  const getNoiseBadge = (noise) => {
    switch (noise?.toLowerCase()) {
      case 'silent':
        return 'text-indigo-600 bg-indigo-50 border-indigo-100';
      case 'quiet':
        return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'collaborative':
        return 'text-purple-600 bg-purple-50 border-purple-100';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top Image & Floating Badges */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={space.image}
          alt={space.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Subtle gradient overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-md text-slate-800 shadow-sm">
            {space.category}
          </span>
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 backdrop-blur-md ${crowd.bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${crowd.dot} animate-pulse`}></span>
            {crowd.label}
          </span>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(space.id);
          }}
          className={`
            absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md
            ${isFavorite 
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30' 
              : 'bg-white/80 text-slate-600 hover:bg-white hover:text-rose-500'
            }
          `}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Bottom Floating Stats inside Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md">
            <MapPin className="w-3 h-3 text-indigo-300" />
            <span className="font-medium truncate max-w-[170px]">{space.building}</span>
          </div>

          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md font-bold text-amber-300">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{space.rating}</span>
          </div>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title and Floor */}
          <div className="mb-2">
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight line-clamp-1">
              {space.name}
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {space.floor} &bull; {space.hours.split('(')[0]}
            </p>
          </div>

          {/* Occupancy Progress Bar */}
          <div className="my-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-600 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" /> Live Occupancy
              </span>
              <span className={`font-bold ${space.occupancy > 80 ? 'text-rose-600' : space.occupancy > 50 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {space.occupancy}% ({space.availableSeats} seats free)
              </span>
            </div>
            {/* Bar */}
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  space.occupancy > 80 
                    ? 'bg-rose-500' 
                    : space.occupancy > 50 
                    ? 'bg-amber-500' 
                    : 'bg-emerald-500'
                }`}
                style={{ width: `${space.occupancy}%` }}
              />
            </div>
          </div>

          {/* Key Amenities Pills */}
          <div className="flex items-center gap-2 flex-wrap text-[11px] font-semibold text-slate-600 mb-4">
            <span className={`px-2 py-0.5 rounded-md border flex items-center gap-1 ${getNoiseBadge(space.noiseLevel)}`}>
              <Volume2 className="w-3 h-3" />
              {space.noiseLevel}
            </span>

            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1">
              <Wifi className="w-3 h-3 text-indigo-500" />
              Wi-Fi
            </span>

            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-500" />
              Power
            </span>

            {space.ac && (
              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                <Wind className="w-3 h-3 text-blue-500" />
                AC
              </span>
            )}
          </div>
        </div>

        {/* Card Footer Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">
            {space.reviewsCount} student reviews
          </span>
          <button
            onClick={() => onViewDetails(space)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs group-hover:shadow-md cursor-pointer"
          >
            <span>View Details</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

