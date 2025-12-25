
import React from 'react';
import { View } from '../types.ts';
import { Moon, Sun, LayoutDashboard, Zap, Users, RefreshCw } from 'lucide-react';

interface NavigationProps {
  isDark: boolean;
  toggleTheme: () => void;
  setView: (view: View) => void;
  currentView: View;
  liveVisitors?: number;
  isAuthenticated?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  isDark, toggleTheme, setView, currentView, liveVisitors = 0, isAuthenticated = false 
}) => {
  return (
    <div className="fixed top-8 left-0 right-0 z-50 px-6 flex justify-center">
      <nav className="glass-nav px-8 py-4 rounded-[2.5rem] shadow-2xl flex items-center justify-between w-full max-w-7xl gap-8 border border-white/10">
        <div className="flex items-center gap-12">
          <button 
            onClick={() => setView('home')}
            className="flex items-center gap-3 group shrink-0"
          >
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-black transition-all duration-500 group-hover:rotate-[360deg] shadow-lg shadow-emerald-500/20">
              <Zap size={26} fill="black" />
            </div>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-2xl font-black bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600 bg-clip-text text-transparent tracking-tighter">
                عبدو ويب
              </span>
              <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${isDark ? 'text-emerald-400' : 'text-zinc-900 opacity-60'}`}>
                ABDOUWEB
              </span>
            </div>
          </button>
          
          <div className="hidden lg:flex items-center gap-8">
            {[
              { id: 'home', label: 'الرئيسية' },
              { id: 'morocco', label: 'أخبار المغرب' },
              { id: 'tech', label: 'تقنية' },
              { id: 'self', label: 'تطوير الذات' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setView('home')}
                className={`text-[15px] font-bold transition-all relative group ${
                  currentView === 'home' && item.id === 'home' ? 'text-emerald-500' : 'opacity-60 hover:opacity-100'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 right-0 h-0.5 bg-emerald-500 transition-all duration-300 ${currentView === 'home' && item.id === 'home' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-black text-emerald-500 uppercase tracking-widest">
              {liveVisitors} متصل الآن
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button 
                onClick={() => { window.location.reload(); }}
                className={`p-3 rounded-2xl transition-all border hidden sm:flex ${
                  isDark 
                    ? 'bg-zinc-900 border-zinc-800 text-emerald-400 hover:bg-zinc-800' 
                    : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                }`}
                title="تحديث الصفحة"
              >
                <RefreshCw size={22} />
              </button>
            )}

            <button 
              onClick={() => setView('admin')}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[13px] font-black transition-all ${
                isDark 
                  ? 'bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-emerald-500/20' 
                  : 'bg-black hover:bg-zinc-800 text-white shadow-xl shadow-black/20'
              }`}
            >
              <LayoutDashboard size={18} />
              <span className="hidden sm:inline">الإدارة</span>
            </button>
            
            <button 
              onClick={toggleTheme}
              className={`p-3 rounded-2xl transition-all border ${
                isDark 
                  ? 'bg-zinc-900 border-zinc-800 text-emerald-400 hover:bg-zinc-800' 
                  : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              {isDark ? <Sun size={22} /> : <Moon size={22} />}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};
