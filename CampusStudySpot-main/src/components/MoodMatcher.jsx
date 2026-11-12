import React from 'react';
import { Brain, Users, Video, BookOpen, Sparkles, Check, ArrowRight } from 'lucide-react';
import { STUDY_MOODS } from '../data/mockData';

export default function MoodMatcher({ selectedMood, onSelectMood, onApplyMoodFilter }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Brain': return Brain;
      case 'Users': return Users;
      case 'Video': return Video;
      case 'BookOpen': return BookOpen;
      default: return Sparkles;
    }
  };

  const activeMoodObj = STUDY_MOODS.find(m => m.id === selectedMood);

  return (
    <section className="mb-8">
      {/* Title & Subtitle */}
      <div className="mb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Interactive Spot Finder
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            What's your study mood?
          </h2>
          <p className="text-slate-500 text-sm mt-0.5">
            Tell us what you need. We'll find your perfect spot.
          </p>
        </div>

        {selectedMood && (
          <button
            onClick={() => onSelectMood(null)}
            className="text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors self-start sm:self-auto underline decoration-dashed"
          >
            Reset Mood
          </button>
        )}
      </div>

      {/* Mood Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STUDY_MOODS.map((mood) => {
          const Icon = getIcon(mood.icon);
          const isSelected = selectedMood === mood.id;

          return (
            <div
              key={mood.id}
              onClick={() => onSelectMood(isSelected ? null : mood.id)}
              className={`
                group relative p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between
                ${isSelected 
                  ? `bg-white border-2 ${mood.colorClasses.border} shadow-lg ${mood.colorClasses.glow} ring-4 ring-indigo-50/50 scale-[1.02]` 
                  : 'bg-white/90 border-slate-200/80 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5'
                }
              `}
            >
              {/* Selected indicator check badge */}
              {isSelected && (
                <div className={`absolute top-3.5 right-3.5 w-6 h-6 rounded-full flex items-center justify-center text-white ${mood.colorClasses.border.replace('border-', 'bg-')} shadow-xs`}>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}

              <div>
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-200
                  ${isSelected ? mood.colorClasses.badge : 'bg-slate-100 text-slate-600'}
                `}>
                  <Icon className={`w-6 h-6 ${isSelected ? mood.colorClasses.text : 'text-slate-700'}`} />
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                  {mood.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {mood.description}
                </p>
              </div>

              {/* Bottom tag indicator */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400 group-hover:text-indigo-600 transition-colors">
                <span>{isSelected ? 'Mood Selected' : 'Tap to match'}</span>
                <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1 text-indigo-600' : 'group-hover:translate-x-0.5'}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Recommendation Banner when a mood is selected */}
      {activeMoodObj && (
        <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-lg shadow-indigo-950/10 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300 shrink-0 border border-white/10">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold tracking-wider text-indigo-300">
                  Mood Matcher Active
                </span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">
                  {activeMoodObj.title}
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
                Your perfect study spots: <span className="text-indigo-200 font-normal">{activeMoodObj.matchedSpaces.join(', ')}</span>
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onApplyMoodFilter(activeMoodObj.id)}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-500/20 flex items-center gap-2 cursor-pointer"
            >
              <span>View Filtered Spots</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

