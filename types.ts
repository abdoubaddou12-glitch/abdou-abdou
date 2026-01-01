
export type View = 'home' | 'admin' | 'login';

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

// Added Post interface to fix import errors in PostCard and PostEditor
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

// Added AnalyticsData interface to fix import errors in AdminPanel
export interface AnalyticsData {
  totalViews: number;
  liveVisitors: number;
  dailyEarnings: number[];
  ctr: string;
  cpc: string;
}
