import React from 'react';
import { 
  LayoutDashboard, 
  Compass, 
  Heart, 
  MapPin, 
  BarChart3, 
  GraduationCap,
  Sparkles,
  ChevronRight,
  X
} from 'lucide-react';

export default function Sidebar({ currentView, setCurrentView, favoritesCount, isMobileOpen, setIsMobileOpen }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'explore', label: 'Explore Spaces', icon: Compass },
    { 
      id: 'favorites', 
      label: 'My Favorites', 
      icon: Heart, 
      badge: favoritesCount > 0 ? favoritesCount : null 
    },
    { id: 'campus-map', label: 'Campus Map', icon: MapPin },
    { id: 'insights', label: 'Insights', icon: BarChart3 },
  ];

  const handleNavClick = (viewId) => {
    setCurrentView(viewId);
    if (isMobileOpen && setIsMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-100 flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-sm
        lg:translate-x-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top Brand & Navigation */}
        <div className="p-6">
          {/* Logo / Brand */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('dashboard')}>
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
                <MapPin className="w-5 h-5 absolute" />
                <GraduationCap className="w-3.5 h-3.5 absolute -top-1 -right-1 text-amber-300 transform rotate-12" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1">
                  Campus<span className="text-indigo-600 font-extrabold">Pulse</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block -mt-0.5">
                  Study Smart
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden"
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick status badge */}
          <div className="mb-6 p-3 rounded-xl bg-gradient-to-r from-indigo-50/80 to-purple-50/80 border border-indigo-100/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-slate-700">Live Campus Feed</span>
            </div>
            <span className="text-[11px] font-medium text-indigo-700 bg-white/80 px-2 py-0.5 rounded-md border border-indigo-100 shadow-2xs">
              Active
            </span>
          </div>

          {/* Nav Links */}
          <div className="space-y-1">
            <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Navigation
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                    ${isActive 
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== null && item.badge !== undefined && (
                    <span className={`
                      text-xs px-2 py-0.5 rounded-full font-bold
                      ${isActive ? 'bg-white text-indigo-600' : 'bg-indigo-50 text-indigo-600'}
                    `}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Profile Card */}
        <div className="p-4 border-t border-slate-100">
          <div className="p-3 rounded-2xl bg-slate-50/80 hover:bg-slate-100/70 border border-slate-100 transition-colors flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-inner ring-2 ring-white">
                  HS
                </div>
                <div className="w-3 h-3 bg-emerald-500 border-2 border-white rounded-full absolute bottom-0 right-0"></div>
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-slate-800 leading-tight">Harsh Sharma</h4>
                <p className="text-xs text-slate-500 font-medium">CS &bull; Student</p>
              </div>
            </div>
            <div className="text-slate-400 group-hover:text-slate-600 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

