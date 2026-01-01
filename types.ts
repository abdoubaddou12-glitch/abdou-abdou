
export interface ImageFile {
  id: string;
  name: string;
  size: number;
  type: string;
  preview: string;
}

export interface ConversionSettings {
  format: 'webp' | 'jpeg' | 'png';
  quality: number;
  width?: number;
  height?: number;
}

export type ConversionStatus = 'idle' | 'processing' | 'completed' | 'error';

/**
 * Types for Abdou Web Admin and Navigation
 */

export type View = 'home' | 'admin' | 'editor' | 'adsense' | 'security';

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

export interface AdSenseConfig {
  isEnabled: boolean;
  publisherId: string;
  slotId: string;
}
