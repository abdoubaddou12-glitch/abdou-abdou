
import React, { useState, useEffect } from 'react';
import { View } from '../types.ts';
import { Moon, Sun, LayoutDashboard, Zap, Globe, Menu, X } from 'lucide-react';

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
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 ${scrolled ? 'pt-4' : 'pt-8'}`}>
      <div className={`mx-auto max-w-7xl flex items-center justify-between transition-all duration-500 px-8 py-4 ${
        scrolled 
          ? 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50 scale-95' 
          : 'bg-transparent'
      }`}>
        <button 
          onClick={() => setView('home')}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-black shadow-lg">
            <Zap size={20} fill="black" />
          </div>
          <span className="text-2xl font-black tracking-tighter">
            عبدو <span className="text-emerald-500">ويب</span>
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-10">
          {['الرئيسية', 'المغرب', 'تقنية', 'لايف'].map((link, idx) => (
            <button 
              key={idx}
              onClick={() => setView('home')}
              className="text-sm font-black opacity-40 hover:opacity-100 transition-all uppercase tracking-widest hover:text-emerald-500"
            >
              {link}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{liveVisitors} متصل</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setView('admin')}
              className={`p-3 rounded-2xl transition-all ${isDark ? 'bg-zinc-800 text-white' : 'bg-black text-white hover:bg-emerald-500 hover:text-black'}`}
            >
              <LayoutDashboard size={20} />
            </button>
            
            <button 
              onClick={toggleTheme}
              className="p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 transition-all"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
