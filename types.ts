
export type View = 'home' | 'admin' | 'login' | 'policies' | 'security' | 'ads';

export interface AnalyticsData {
  totalViews: number;
  totalVisitors: number;
  dailyEarnings: number[];
  ctr: string;
  cpc: string;
}

export interface AdSenseConfig {
  isEnabled: boolean;
  publisherId: string;
  slotId: string;
}

export interface AdsterraConfig {
  isEnabled: boolean;
  socialBar: string;
  popUnder: string;
  banner728x90: string;
  banner300x250: string;
}

// Fix: Added missing Post interface definition to resolve import errors in components/PostCard.tsx and components/PostEditor.tsx
export interface Post {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  status: 'draft' | 'published';
  image: string;
  date: string;
}
