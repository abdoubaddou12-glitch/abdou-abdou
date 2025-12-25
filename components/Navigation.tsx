
import React from 'react';
import { View } from '../types.ts';
import { Moon, Sun, LayoutDashboard, Zap } from 'lucide-react';

interface NavigationProps {
  isDark: boolean;
  toggleTheme: () => void;
  setView: (view: View) => void;
  currentView: View;
}

export const Navigation: React.FC<NavigationProps> = ({ isDark, toggleTheme, setView, currentView }) => {
  return (
    <div className="fixed top-8 left-0 right-0 z-50 px-6 flex justify-center">
      <nav className="glass-nav px-8 py-4 rounded-[2.5rem] shadow-2xl flex items-center justify-between w-full max-w-7xl gap-8 border border-white/10">
        <div className="flex items-center gap-12">
          <button 
            onClick={() => setView('home')}
            className="flex items-center gap-3 group shrink-0"
          >
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white transition-all duration-500 group-hover:rotate-[360deg] shadow-lg shadow-indigo-600/20">
              <Zap size={26} fill="white" />
            </div>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-400 bg-clip-text text-transparent tracking-tighter">
                عبدو ويب
              </span>
              <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${isDark ? 'text-indigo-400' : 'text-indigo-600 opacity-60'}`}>
                ABDOUWEB
              </span>
            </div>
          </button>
          
          <div className="hidden lg:flex items-center gap-8">
            {[
              { id: 'home', label: 'الرئيسية' },
              { id: 'morocco', label: 'أخبار المغرب' },
              { id: 'tech', label: 'تقنية' },
              { id: 'self', label: 'تطوير الذات' },
              { id: 'reviews', label: 'تقييم المنتجات' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setView('home')}
                className={`text-[15px] font-bold transition-all relative group ${
                  currentView === 'home' && item.id === 'home' ? 'text-indigo-600' : 'opacity-60 hover:opacity-100'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 right-0 h-0.5 bg-indigo-600 transition-all duration-300 ${currentView === 'home' && item.id === 'home' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView('admin')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[13px] font-black transition-all ${
              isDark 
                ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-600/20'
            }`}
          >
            <LayoutDashboard size={18} />
            <span className="hidden sm:inline">لوحة الإدارة</span>
          </button>
          
          <button 
            onClick={toggleTheme}
            className={`p-3 rounded-2xl transition-all border ${
              isDark 
                ? 'bg-zinc-800 border-zinc-700 text-yellow-400 hover:bg-zinc-700' 
                : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'
            }`}
          >
            {isDark ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </div>
      </nav>
    </div>
  );
};
