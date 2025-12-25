
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  isDark: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, isDark }) => {
  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-zinc-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {children}
    </div>
  );
};
