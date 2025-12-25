
import React from 'react';
import { View } from '../types';

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
            مدونتي
          </button>
          
          <div className="hidden md:flex items-center space-x-reverse space-x-6 font-medium">
            <button 
              onClick={() => setView('home')}
              className={`${currentView === 'home' ? 'text-indigo-600' : 'hover:text-indigo-500'}`}
            >
              الرئيسية
            </button>
            <button className="hover:text-indigo-500">الأقسام</button>
            <button className="hover:text-indigo-500">عن المدونة</button>
          </div>
        </div>

        <div className="flex items-center space-x-reverse space-x-4">
          <button 
            onClick={() => setView('admin')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border ${isDark ? 'border-zinc-700 bg-zinc-800 hover:bg-zinc-700' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}`}
          >
            لوحة التحكم
          </button>
          
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${isDark ? 'bg-zinc-800 text-yellow-400 hover:bg-zinc-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
