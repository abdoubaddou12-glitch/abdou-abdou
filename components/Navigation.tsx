
import React from 'react';
import { View } from '../types.ts';
import { Moon, Sun, LayoutDashboard, Home, Zap } from 'lucide-react';

interface NavigationProps {
  isDark: boolean;
  toggleTheme: () => void;
  setView: (view: View) => void;
  currentView: View;
}

export const Navigation: React.FC<NavigationProps> = ({ isDark, toggleTheme, setView, currentView }) => {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-4 flex justify-center">
      <nav className="glass-nav px-6 py-3 rounded-2xl shadow-2xl flex items-center justify-between w-full max-w-5xl gap-4 border border-white/20">
        <div className="flex items-center gap-8">
          <button 
            onClick={() => setView('home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-11 h-11 bg-indigo-600 rounded-xl flex items-center justify-center text-white rotate-3 group-hover:rotate-0 transition-all duration-300 shadow-lg shadow-indigo-600/20">
              <Zap size={24} fill="white" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500 bg-clip-text text-transparent leading-none tracking-tighter">
                عبدو ويب
              </span>
              <span className={`text-[11px] font-black uppercase tracking-[0.3em] transition-opacity duration-300 ${isDark ? 'text-indigo-400' : 'text-indigo-600 opacity-80'}`}>
                Abdouweb
              </span>
            </div>
          </button>
          
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setView('home')}
              className={`text-sm font-bold transition-all ${currentView === 'home' ? 'text-indigo-600' : 'opacity-60 hover:opacity-100'}`}
            >
              الرئيسية
            </button>
            <button className="text-sm font-bold opacity-60 hover:opacity-100">التصنيفات</button>
            <button className="text-sm font-bold opacity-60 hover:opacity-100">عن المدونة</button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setView('admin')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
              isDark 
                ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20'
            }`}
          >
            <LayoutDashboard size={16} />
            <span>لوحة الإدارة</span>
          </button>
          
          <button 
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl transition-all border ${
              isDark 
                ? 'bg-zinc-800 border-zinc-700 text-yellow-400' 
                : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'
            }`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>
    </div>
  );
};
