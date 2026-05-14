export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: 'land' | 'house' | 'rental' | 'commercial' | 'development';
  status: 'available' | 'sold' | 'rented';
  features: string[];
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  images: string[];
  videoUrl?: string;
  featured: boolean;
  createdAt: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar?: string;
  rating: number;
  videoUrl?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
  createdAt: number;
  status: 'new' | 'read' | 'replied';
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  whatsapp: string;
}

export interface SiteContent {
  logo?: string;
  hero: {
    headline: string;
    subheadline: string;
    videoUrl?: string;
    imageUrl?: string;
  };
  about: {
    story: string;
    mission: string;
    vision: string;
    founderName: string;
    founderStory: string;
    founderImage?: string;
  };
  socials: SocialLinks;
  contactInfo: {
    email1: string;
    email2: string;
    phone: string;
  };
}
