
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
      <nav className="glass-nav px-6 py-3 rounded-2xl shadow-2xl flex items-center justify-between w-full max-w-5xl gap-4">
        <div className="flex items-center gap-8">
          <button 
            onClick={() => setView('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white rotate-3 group-hover:rotate-0 transition-transform">
              <Zap size={22} fill="white" />
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent">
              عبدو ويب
            </span>
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
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              isDark 
                ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100' 
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900'
            }`}
          >
            <LayoutDashboard size={16} />
            <span>لوحة الإدارة</span>
          </button>
          
          <button 
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl transition-all ${
              isDark 
                ? 'bg-zinc-800 text-yellow-400' 
                : 'bg-zinc-100 text-zinc-600'
            }`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>
    </div>
  );
};
