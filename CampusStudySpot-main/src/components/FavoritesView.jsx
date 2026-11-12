import React from 'react';
import { Heart, Compass, Sparkles, ArrowRight } from 'lucide-react';
import StudySpaceCard from './StudySpaceCard';

export default function FavoritesView({ 
  favoriteSpaces = [], 
  onToggleFavorite, 
  onViewDetails, 
  onExploreMore 
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
              Personalized Shortlist
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Favorite Spots
          </h2>
          <p className="text-slate-500 text-sm mt-0.5">
            Your saved rooms and study sanctuaries saved locally on your device.
          </p>
        </div>

        {favoriteSpaces.length > 0 && (
          <span className="text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1.5 rounded-xl shadow-2xs self-start sm:self-auto">
            {favoriteSpaces.length} {favoriteSpaces.length === 1 ? 'Space' : 'Spaces'} Bookmarked
          </span>
        )}
      </div>

      {/* Grid or Empty State */}
      {favoriteSpaces.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200/80 shadow-2xs">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4 border border-rose-100 shadow-sm">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            No favorite spaces saved yet
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-6">
            Click the heart icon on any study space card to bookmark it here for instant one-click access.
          </p>
          <button
            onClick={onExploreMore}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold inline-flex items-center gap-2 shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Explore All Spaces</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {favoriteSpaces.map((space) => (
            <StudySpaceCard
              key={space.id}
              space={space}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
}

