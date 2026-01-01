
export type View = 'home' | 'admin' | 'login' | 'policies';

export interface AdSenseConfig {
  isEnabled: boolean;
  publisherId: string;
  slotId: string;
}

export interface ImageConversion {
  id: string;
  timestamp: number;
  format: string;
  originalSize: number;
  resultSize: number;
}

export interface Post {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  status: string;
}

export interface AnalyticsData {
  totalViews: number;
  liveVisitors: number;
  dailyEarnings: number[];
  ctr: string;
  cpc: string;
}
