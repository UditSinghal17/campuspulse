import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MoodMatcher from './components/MoodMatcher';
import StatsCard from './components/StatsCard';
import FilterBar from './components/FilterBar';
import StudySpaceCard from './components/StudySpaceCard';
import StudySpaceModal from './components/StudySpaceModal';
import CampusMap from './components/CampusMap';
import Insights from './components/Insights';
import FavoritesView from './components/FavoritesView';
import { STUDY_SPACES } from './data/mockData';
import { Compass, Sparkles, AlertCircle } from 'lucide-react';

export default function App() {
  // Navigation View: 'dashboard' | 'explore' | 'favorites' | 'campus-map' | 'insights'
  const [currentView, setCurrentView] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [crowdFilter, setCrowdFilter] = useState('All');
  const [noiseFilter, setNoiseFilter] = useState('All');
  const [amenitiesFilter, setAmenitiesFilter] = useState({
    wifi: false,
    charging: false,
    ac: false
  });
  const [sortBy, setSortBy] = useState('highest-rated');

  // Active modal state
  const [selectedModalSpace, setSelectedModalSpace] = useState(null);

  // Favorites state with localStorage persistence
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('campuspulse_favorites');
      return saved ? JSON.parse(saved) : ['central-library', 'silent-study-zone'];
    } catch (err) {
      console.warn('Failed reading localStorage favorites', err);
      return ['central-library', 'silent-study-zone'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('campuspulse_favorites', JSON.stringify(favorites));
    } catch (err) {
      console.warn('Failed saving localStorage favorites', err);
    }
  }, [favorites]);

  // Toggle favorite helper
  const handleToggleFavorite = (spaceId) => {
    setFavorites((prev) => 
      prev.includes(spaceId) 
        ? prev.filter((id) => id !== spaceId) 
        : [...prev, spaceId]
    );
  };

  // Toggle amenity helper
  const handleToggleAmenity = (key) => {
    setAmenitiesFilter((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedMood(null);
    setCrowdFilter('All');
    setNoiseFilter('All');
    setAmenitiesFilter({ wifi: false, charging: false, ac: false });
    setSortBy('highest-rated');
  };

  // Filter & Sort Logic
  const filteredSpaces = useMemo(() => {
    return STUDY_SPACES.filter((space) => {
      // 1. Search Query (name, building, category)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = space.name.toLowerCase().includes(query);
        const matchesBuilding = space.building.toLowerCase().includes(query);
        const matchesCategory = space.category.toLowerCase().includes(query);
        if (!matchesName && !matchesBuilding && !matchesCategory) {
          return false;
        }
      }

      // 2. Mood filter (if mood selected)
      if (selectedMood && (!space.moods || !space.moods.includes(selectedMood))) {
        return false;
      }

      // 3. Crowd Level
      if (crowdFilter !== 'All' && space.crowdLevel.toLowerCase() !== crowdFilter.toLowerCase()) {
        return false;
      }

      // 4. Noise Level
      if (noiseFilter !== 'All' && space.noiseLevel.toLowerCase() !== noiseFilter.toLowerCase()) {
        return false;
      }

      // 5. Amenities
      if (amenitiesFilter.wifi && (!space.wifi || space.wifi.length === 0)) {
        return false;
      }
      if (amenitiesFilter.charging && (!space.charging || space.charging.length === 0)) {
        return false;
      }
      if (amenitiesFilter.ac && !space.ac) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'highest-rated') {
        return b.rating - a.rating;
      }
      if (sortBy === 'lowest-crowd') {
        return a.occupancy - b.occupancy;
      }
      if (sortBy === 'most-seats') {
        return b.availableSeats - a.availableSeats;
      }
      return 0;
    });
  }, [searchQuery, selectedMood, crowdFilter, noiseFilter, amenitiesFilter, sortBy]);

  // Find similar spaces helper (from modal)
  const handleFindSimilarSpaces = (space) => {
    // Match similar category or noise level
    setSearchQuery(space.category);
    setCurrentView('explore');
  };

  // Direct select space from Campus Map
  const handleSelectSpaceById = (spaceId) => {
    const space = STUDY_SPACES.find((s) => s.id === spaceId);
    if (space) {
      setSelectedModalSpace(space);
    }
  };

  // Get list of favorited spaces objects
  const favoriteSpacesList = useMemo(() => {
    return STUDY_SPACES.filter((s) => favorites.includes(s.id));
  }, [favorites]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex">
      {/* 1. Sleek Left Sidebar */}
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        favoritesCount={favorites.length}
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* 2. Top Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onQuickSearchFocus={() => {
            if (currentView !== 'dashboard' && currentView !== 'explore') {
              setCurrentView('explore');
            }
          }}
        />

        {/* Dynamic Main View */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
          {/* VIEW: DASHBOARD */}
          {currentView === 'dashboard' && (
            <div>
              {/* 3. Study Mood Matcher */}
              <MoodMatcher
                selectedMood={selectedMood}
                onSelectMood={setSelectedMood}
                onApplyMoodFilter={(moodId) => {
                  setSelectedMood(moodId);
                  const el = document.getElementById('discovery-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />

              {/* 4. Dashboard Statistics */}
              <StatsCard spaces={STUDY_SPACES} />

              {/* 5 & 6. Discovery & Filters Section */}
              <div id="discovery-section" className="scroll-mt-20">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                      Available Study Spaces
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                      Real-time live telemetry across university branches
                    </p>
                  </div>
                </div>

                {/* Filter and Search Bar */}
                <FilterBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  crowdFilter={crowdFilter}
                  setCrowdFilter={setCrowdFilter}
                  noiseFilter={noiseFilter}
                  setNoiseFilter={setNoiseFilter}
                  amenitiesFilter={amenitiesFilter}
                  toggleAmenity={handleToggleAmenity}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  onResetFilters={handleResetFilters}
                  totalResults={filteredSpaces.length}
                />

                {/* Discovery Cards Grid */}
                {filteredSpaces.length === 0 ? (
                  <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200/80 shadow-2xs">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-3">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">
                      No study spaces match your criteria
                    </h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
                      Try relaxing your crowd filters or resetting search keywords to discover more locations.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filteredSpaces.map((space) => (
                      <StudySpaceCard
                        key={space.id}
                        space={space}
                        isFavorite={favorites.includes(space.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onViewDetails={setSelectedModalSpace}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW: EXPLORE SPACES */}
          {currentView === 'explore' && (
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    Comprehensive Directory
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Explore Campus Spaces
                </h2>
                <p className="text-slate-500 text-sm mt-0.5">
                  Filter by crowd levels, noise requirements, and desk amenities.
                </p>
              </div>

              <FilterBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                crowdFilter={crowdFilter}
                setCrowdFilter={setCrowdFilter}
                noiseFilter={noiseFilter}
                setNoiseFilter={setNoiseFilter}
                amenitiesFilter={amenitiesFilter}
                toggleAmenity={handleToggleAmenity}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onResetFilters={handleResetFilters}
                totalResults={filteredSpaces.length}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredSpaces.map((space) => (
                  <StudySpaceCard
                    key={space.id}
                    space={space}
                    isFavorite={favorites.includes(space.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onViewDetails={setSelectedModalSpace}
                  />
                ))}
              </div>
            </div>
          )}

          {/* VIEW: MY FAVORITES */}
          {currentView === 'favorites' && (
            <FavoritesView
              favoriteSpaces={favoriteSpacesList}
              onToggleFavorite={handleToggleFavorite}
              onViewDetails={setSelectedModalSpace}
              onExploreMore={() => setCurrentView('explore')}
            />
          )}

          {/* VIEW: CAMPUS MAP */}
          {currentView === 'campus-map' && (
            <CampusMap onSelectSpaceById={handleSelectSpaceById} />
          )}

          {/* VIEW: INSIGHTS */}
          {currentView === 'insights' && (
            <Insights spaces={STUDY_SPACES} />
          )}
        </main>
      </div>

      {/* 7. Study Space Details Modal */}
      {selectedModalSpace && (
        <StudySpaceModal
          space={selectedModalSpace}
          isFavorite={favorites.includes(selectedModalSpace.id)}
          onToggleFavorite={handleToggleFavorite}
          onFindSimilar={handleFindSimilarSpaces}
          onClose={() => setSelectedModalSpace(null)}
        />
      )}
    </div>
  );
}

