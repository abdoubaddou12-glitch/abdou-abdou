
export type View = 'home' | 'admin' | 'login' | 'policies';

export interface AdSenseConfig {
  isEnabled: boolean;
  publisherId: string;
  slotId: string;
}

export interface AdsterraConfig {
  isEnabled: boolean;
  banner728x90: string;
  banner300x250: string;
  socialBar: string;
  popUnder: string;
}

export interface AnalyticsData {
  totalViews: number;
  totalVisitors: number; // الحقل الجديد للزوار
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
