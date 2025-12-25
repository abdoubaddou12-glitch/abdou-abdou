
import React, { useState, useEffect } from 'react';
import { View } from '../types.ts';
import { Moon, Sun, LayoutDashboard, Zap, Menu } from 'lucide-react';

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-6 ${scrolled ? 'pt-4' : 'pt-10'}`}>
      <div className={`mx-auto max-w-6xl flex items-center justify-between transition-all duration-700 px-10 py-5 ${
        scrolled 
          ? 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-white/5 scale-[0.98]' 
          : 'bg-transparent'
      }`}>
        <button 
          onClick={() => setView('home')}
          className="flex items-center gap-4 group"
        >
          <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-black shadow-[0_10px_30px_-5px_rgba(16,185,129,0.5)] transition-transform group-hover:rotate-12">
            <Zap size={24} fill="black" />
          </div>
          <span className="text-3xl font-black tracking-tighter italic">
            عبدو <span className="text-emerald-500">ويب</span>
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-14">
          {['الرئيسية', 'المغرب', 'تقنية', 'كريبتو'].map((link, idx) => (
            <button 
              key={idx}
              onClick={() => setView('home')}
              className="text-xs font-black opacity-30 hover:opacity-100 transition-all uppercase tracking-[0.2em] hover:text-emerald-500"
            >
              {link}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{liveVisitors} متصل الآن</span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setView('admin')}
              className={`p-4 rounded-2xl transition-all shadow-lg ${isDark ? 'bg-zinc-800 text-white border border-white/5' : 'bg-black text-white hover:bg-emerald-500 hover:text-black'}`}
            >
              <LayoutDashboard size={20} />
            </button>
            
            <button 
              onClick={toggleTheme}
              className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 transition-all shadow-lg"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
