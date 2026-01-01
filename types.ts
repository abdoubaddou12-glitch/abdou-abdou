
export type View = 'home' | 'admin' | 'login' | 'policies';

export interface AdSenseConfig {
  isEnabled: boolean;
  publisherId: string;
  slotId: string;
}

export interface AdsterraConfig {
  isEnabled: boolean;
  banner728x90: string; // كود البانر العلوي
  banner300x250: string; // كود البانر الجانبي
  socialBar: string; // كود السوشيال بار (Script)
  popUnder: string; // كود البوب آندر (Script)
}

export interface AnalyticsData {
  totalViews: number;
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
