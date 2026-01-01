
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
