export type EventType = 
  | 'Wedding'
  | 'Engagement'
  | 'Reception'
  | 'Birthday / Special Event'
  | 'Corporate Event'
  | 'Other';

export interface EnquiryData {
  id?: string;
  fullName: string;
  mobileNumber: string;
  eventType: EventType | string;
  notes?: string;
  eventDate?: string;
  timestamp: string;
  sourcePage: string;
  status: 'new' | 'contacted' | 'confirmed' | 'archived';
}

export interface SubmissionResponse {
  success: boolean;
  message: string;
  enquiryId?: string;
  backendConnected: boolean;
  provider: 'local_api' | 'firebase' | 'unconnected' | 'fallback_stored';
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  keyHighlights: string[];
  image: string;
  altText: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'all' | 'mandap' | 'reception' | 'decor' | 'rituals';
  categoryLabel: string;
  location: string;
  description: string;
  image: string;
  isWide?: boolean;
}

export interface TestimonialItem {
  id: string;
  coupleNames: string;
  eventType: string;
  celebrationDate: string;
  quote: string;
  venue: string;
  isVerified: boolean;
}

