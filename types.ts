

export type View = 'home' | 'admin' | 'login' | 'policies';

export interface AnalyticsData {
  totalViews: number;
  totalVisitors: number;
  dailyEarnings: number[];
  ctr: string;
  cpc: string;
}

// Fix: Added missing Post interface to resolve import errors in PostCard.tsx and PostEditor.tsx
export interface Post {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
  status: 'published' | 'draft';
}

// Fix: Added missing AdSenseConfig interface to resolve import errors in AdSense components
export interface AdSenseConfig {
  isEnabled: boolean;
  publisherId: string;
  slotId: string;
}

// Fix: Added missing AdsterraConfig interface to resolve import error in AdSettings.tsx
export interface AdsterraConfig {
  isEnabled: boolean;
  socialBar: string;
  popUnder: string;
  banner728x90: string;
  banner300x250: string;
}
