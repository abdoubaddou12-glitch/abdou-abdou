
import React from 'react';
import { View } from '../types';
import { Moon, Sun, LayoutDashboard, Home } from 'lucide-react';

interface NavigationProps {
  isDark: boolean;
  toggleTheme: () => void;
  setView: (view: View) => void;
  currentView: View;
}

export const Navigation: React.FC<NavigationProps> = ({ isDark, toggleTheme, setView, currentView }) => {
  return (
    <nav className={`sticky top-0 z-50 px-6 py-4 shadow-sm border-b transition-colors duration-300 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-reverse space-x-8">
          <button 
            onClick={() => setView('home')}
            className="text-2xl font-black text-indigo-600 hover:scale-105 transition-transform"
          >
            مدونتي.
          </button>
          
          <div className="hidden md:flex items-center space-x-reverse space-x-6 font-bold">
            <button 
              onClick={() => setView('home')}
              className={`flex items-center gap-2 ${currentView === 'home' ? 'text-indigo-600' : 'hover:text-indigo-500 opacity-60 hover:opacity-100'}`}
            >
              <Home size={18} /> الرئيسية
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-reverse space-x-4">
          <button 
            onClick={() => setView('admin')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border transition-all ${isDark ? 'border-zinc-700 bg-zinc-800 hover:bg-zinc-700' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}`}
          >
            <LayoutDashboard size={18} /> لوحة التحكم
          </button>
          
          <button 
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl transition-all ${isDark ? 'bg-zinc-800 text-yellow-400 hover:bg-zinc-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};
