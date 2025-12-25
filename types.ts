
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

export type View = 'home' | 'post' | 'admin' | 'editor';

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}
