
export type View = 'home' | 'admin' | 'login' | 'policies';

export interface AnalyticsData {
  totalViews: number;
  totalVisitors: number;
  dailyEarnings: number[];
  ctr: string;
  cpc: string;
}

export interface Post {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  status: string;
  image: string;
  date: string;
}

// Fix: Added missing AdSenseConfig interface to resolve import errors in AdSense components
export interface AdSenseConfig {
  isEnabled: boolean;
  publisherId: string;
  slotId: string;
}

// Fix: Added missing AdsterraConfig interface to resolve import errors in AdSettings component
export interface AdsterraConfig {
  isEnabled: boolean;
  socialBar: string;
  popUnder: string;
  banner728x90: string;
  banner300x250: string;
}
