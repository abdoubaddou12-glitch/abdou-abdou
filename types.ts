
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  status: 'published' | 'draft';
}

export interface AdSenseConfig {
  publisherId: string;
  slotId: string;
  isEnabled: boolean;
}

export type View = 'home' | 'post' | 'admin' | 'editor' | 'login' | 'adsense-settings' | 'security-settings';

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}
