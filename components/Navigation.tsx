
import React from 'react';
import { View } from '../types.ts';
import { Moon, Sun, LayoutDashboard, Zap, RefreshCw } from 'lucide-react';

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
    <div className="fixed top-6 left-0 right-0 z-[100] px-6 flex justify-center">
      <nav className="glass-nav px-8 py-3 rounded-[2rem] shadow-2xl flex items-center justify-between w-full max-w-6xl gap-4">
        <div className="flex items-center gap-10">
          <button 
            onClick={() => setView('home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
              <Zap size={20} fill="black" />
            </div>
            <span className="text-xl font-black tracking-tighter hidden sm:block">
              عبدو <span className="text-emerald-500">ويب</span>
            </span>
          </button>
          
          <div className="hidden lg:flex items-center gap-8">
            {['الرئيسية', 'أخبار المغرب', 'تقنية', 'تطوير الذات'].map((label, idx) => (
              <button 
                key={idx}
                onClick={() => setView('home')}
                className="text-[13px] font-black opacity-60 hover:opacity-100 transition-all uppercase tracking-widest"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
              {liveVisitors} LIVE
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setView('admin')}
              className={`p-3 rounded-xl transition-all ${isDark ? 'bg-zinc-800 text-emerald-400' : 'bg-black text-white'}`}
            >
              <LayoutDashboard size={18} />
            </button>
            
            <button 
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};
