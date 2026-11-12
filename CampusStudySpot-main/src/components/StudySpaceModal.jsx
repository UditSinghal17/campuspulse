import React, { useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Users, 
  Volume2, 
  Wifi, 
  Zap, 
  Wind, 
  Star, 
  Heart, 
  Compass, 
  Check, 
  ShieldCheck,
  Share2
} from 'lucide-react';

export default function StudySpaceModal({ 
  space, 
  onClose, 
  isFavorite, 
  onToggleFavorite, 
  onFindSimilar 
}) {
  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!space) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden z-10 my-8">
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Large Visual Area */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-100 overflow-hidden">
          <img
            src={space.image}
            alt={space.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

          {/* Badges on hero image */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-600 text-white shadow-md">
              {space.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-slate-800">
              {space.crowdLevel} Crowd
            </span>
          </div>

          {/* Title & Location over image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-1.5 text-xs text-indigo-200 mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{space.building} &bull; {space.floor}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {space.name}
              </h2>
              <div className="flex items-center gap-1 bg-amber-400 text-slate-950 px-2.5 py-1 rounded-xl font-extrabold text-sm shadow-sm shrink-0">
                <Star className="w-4 h-4 fill-slate-950" />
                <span>{space.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Real-time stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Crowd Level
              </span>
              <p className="text-sm font-extrabold text-slate-800 mt-0.5">
                {space.crowdLevel}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Live Occupancy
              </span>
              <p className="text-sm font-extrabold text-indigo-600 mt-0.5">
                {space.occupancy}%
              </p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Available Seats
              </span>
              <p className="text-sm font-extrabold text-emerald-600 mt-0.5">
                {space.availableSeats} of {space.totalSeats}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Noise Policy
              </span>
              <p className="text-sm font-extrabold text-slate-800 mt-0.5">
                {space.noiseLevel}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              About this Space
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {space.description}
            </p>
          </div>

          {/* Amenities & Facility Specifications */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Features & Amenities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                  <Wifi className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-800 block">Wi-Fi Connection</span>
                  <span className="text-slate-500">{space.wifi}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-800 block">Power Charging</span>
                  <span className="text-slate-500">{space.charging}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Wind className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-800 block">Air Conditioning</span>
                  <span className="text-slate-500">{space.ac ? 'Central Climate Controlled' : 'Natural Ventilation'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-800 block">Opening Hours</span>
                  <span className="text-slate-500 truncate max-w-[180px] block">{space.hours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Add to Favorites button */}
            <button
              onClick={() => onToggleFavorite(space.id)}
              className={`
                flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border
                ${isFavorite 
                  ? 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }
              `}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{isFavorite ? 'Saved in Favorites' : 'Add to Favorites'}</span>
            </button>

            {/* Find Similar Spaces button */}
            <button
              onClick={() => {
                onFindSimilar(space);
                onClose();
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>Find Similar Spaces</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer text-center"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

