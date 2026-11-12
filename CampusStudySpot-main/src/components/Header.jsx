import React, { useState } from 'react';
import { Search, Bell, Menu, Sparkles, CheckCheck } from 'lucide-react';

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  onOpenMobileMenu, 
  onQuickSearchFocus,
  activeFilterCount 
}) {
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Central Library Seats Dropping', text: 'Floor 3 occupancy now at 72%. Consider Silent Zone.', time: '10m ago', unread: true },
    { id: 2, title: 'Quiet Hour Alert', text: 'Innovation Hub quiet sprint beginning at 3:00 PM.', time: '45m ago', unread: false },
    { id: 3, title: 'Wi-Fi Maintenance Done', text: 'Learning Lab upgraded to Wi-Fi 6 with gigabit speeds.', time: '2h ago', unread: false }
  ]);

  // Dynamic formatted date
  const today = new Date();
  const dateFormatted = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 sm:px-8 py-3.5 flex items-center justify-between transition-all">
      {/* Left Greeting & Mobile Toggle */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onOpenMobileMenu}
          className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Good afternoon, Harsh <span className="inline-block animate-wave origin-bottom-right">👋</span>
            </h1>
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100/80 px-2 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 text-indigo-500" /> Exam Week Mode
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium hidden sm:block">
            Find your ideal space to focus today.
          </p>
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative group">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={onQuickSearchFocus}
            placeholder="Search spaces by name, building, or category..."
            className="w-full pl-10 pr-10 py-2 bg-slate-50/80 hover:bg-slate-100/70 focus:bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 border border-slate-200/80 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Right Controls: Date, Notifications, Profile */}
      <div className="flex items-center gap-3">
        {/* Dynamic Date badge */}
        <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200/70 rounded-xl text-xs font-medium text-slate-600">
          <span>📅</span>
          <span>{dateFormatted || 'Wednesday, November 4'}</span>
        </div>

        {/* Notification dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowNotificationMenu(!showNotificationMenu)}
            className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {showNotificationMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800">Campus Alerts</span>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllRead}
                    className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                  >
                    <CheckCheck className="w-3 h-3" /> Mark all read
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {notifications.map(n => (
                  <div key={n.id} className={`p-2.5 rounded-xl text-xs transition-colors ${n.unread ? 'bg-indigo-50/50 border border-indigo-100/50' : 'hover:bg-slate-50'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-slate-800">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{n.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-1 sm:pl-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs ring-2 ring-indigo-100 shadow-xs cursor-pointer">
            HS
          </div>
        </div>
      </div>
    </header>
  );
}

