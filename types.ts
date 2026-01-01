
export type View = 'home' | 'admin' | 'login' | 'policies';

export interface AdSenseConfig {
  isEnabled: boolean;
  publisherId: string;
  slotId: string;
}

export interface AnalyticsData {
  totalViews: number;
  dailyEarnings: number[];
  ctr: string;
  cpc: string;
}

// Added Post interface to resolve missing export errors in components
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
