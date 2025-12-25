
import React, { useState, useEffect } from 'react';
import { View } from '../types.ts';
import { LayoutDashboard, Zap, Menu, Shield } from 'lucide-react';

interface NavigationProps {
  isDark: boolean;
  toggleTheme: () => void;
  setView: (view: View) => void;
  currentView: View;
  liveVisitors?: number;
  isAuthenticated?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  setView, liveVisitors = 0, isAuthenticated = false 
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-6 ${scrolled ? 'pt-4' : 'pt-10'}`}>
      <div className={`mx-auto max-w-5xl flex items-center justify-between px-10 py-4 rounded-[2rem] transition-all duration-700 ${
        scrolled 
          ? 'bg-black/70 backdrop-blur-2xl border border-emerald-500/30 shadow-2xl scale-95' 
          : 'bg-transparent border border-transparent'
      }`}>
        <button onClick={() => setView('home')} className="flex items-center gap-4 group">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(16,185,129,0.5)]">
            <Zap size={20} fill="black" />
          </div>
          <span className="text-2xl font-black tracking-tighter italic">عبدو <span className="text-emerald-500">ويب</span></span>
        </button>

        <div className="hidden lg:flex items-center gap-12">
          {['الرئيسية', 'المغرب', 'تقنية'].map((link, idx) => (
            <button 
              key={idx}
              onClick={() => setView('home')}
              className="text-[10px] font-black opacity-30 hover:opacity-100 transition-all uppercase tracking-[0.3em] hover:text-emerald-500"
            >
              {link}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{liveVisitors} لايف</span>
          </div>

          <button 
            onClick={() => setView('admin')}
            className="p-3 rounded-xl bg-black border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-black transition-all"
          >
            {isAuthenticated ? <LayoutDashboard size={18} /> : <Shield size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};
