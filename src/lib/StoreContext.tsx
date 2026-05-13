import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property, Testimonial, ContactMessage, SiteContent } from '@/types';
import { supabase } from './supabaseClient';

// Mock Initial Data
const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'golden-park-estate',
    title: '4 Bedroom Semi Detached Duplex',
    description: 'A beautiful 4 Bedroom Semi Detached Duplex.',
    price: 230000000,
    location: 'Golden Park Estate, Sangotedo',
    type: 'house',
    status: 'available',
    features: ['4 Bedrooms', 'Semi-Detached'],
    bedrooms: 4,
    bathrooms: 4,
    area: '',
    images: ['https://i.ibb.co/4gjmsNRQ/Whats-App-Image-2026-05-08-at-1-39-17-AM.jpg'],
    featured: true,
    createdAt: Date.now(),
  },
  {
    id: 'royal-gardens-estate',
    title: 'State-of-Art 5Bed Detached Duplex with a maid room Swimming pool, Gym, Elevator, Rooftop & Cinema Room',
    description: 'State-of-Art 5Bed Detached Duplex with a maid room Swimming pool, Gym, Elevator, Rooftop & Cinema Room in Royal Gardens.',
    price: 1000000000,
    location: 'Royal Gardens, Ajah, Lekki',
    type: 'house',
    status: 'available',
    features: ['5 Bedrooms', 'Swimming Pool', 'Gym', 'Elevator', 'Rooftop', 'Cinema Room', 'Maid Room'],
    bedrooms: 5,
    bathrooms: 6,
    area: '',
    images: ['https://i.ibb.co/Kc7sYM85/Whats-App-Image-2026-05-08-at-8-53-40-AM.jpg'],
    featured: true,
    createdAt: Date.now(),
  },
  {
    id: 'ibafo-land',
    title: 'IBAFO LAND',
    description: 'A genuine plot of land located in Ibafo.',
    price: 7000000,
    location: 'Ibafo',
    type: 'land',
    status: 'available',
    features: ['Land'],
    area: '',
    images: ['https://i.ibb.co/QFk4F0gK/Whats-App-Image-2026-05-08-at-8-48-43-AM.jpg'],
    featured: true,
    createdAt: Date.now(),
  }
];

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Chief Emeka Okafor',
    role: 'Real Estate Investor',
    content: 'Oboyanbaja Investments exceeded my expectations. Their professional approach to property management is unmatched in Nigeria.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=emeka'
  },
  {
    id: '2',
    name: 'Mrs. Funke Adeyemi',
    role: 'Homeowner',
    content: 'I found my dream home through them. The documentation process was seamless and transparent. Highly recommended!',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=funke'
  }
];

const INITIAL_CONTENT: SiteContent = {
  logo: 'https://i.ibb.co/twrktVdQ/Whats-App-Image-2026-04-29-at-6-51-43-AM.jpg',
  hero: {
    headline: 'Own Genuine Property With Confidence',
    subheadline: 'At OBOYANBAJA INVESTMENTS NIGERIA LIMITED, we help individuals, families, and investors acquire genuine landed properties and profitable real estate opportunities across Nigeria.',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1920'
  },
  about: {
    story: 'OBOYANBAJA INVESTMENTS NIGERIA LIMITED is a registered Nigerian real estate and investment company dedicated to helping clients own genuine properties and grow wealth through smart investments. We understand the importance of trust in real estate transactions.',
    mission: 'To provide trusted, transparent, and profitable real estate solutions that help people build wealth through property ownership.',
    vision: 'To become one of Nigeria’s most respected and reliable real estate brands.',
    founderName: 'Sunday Stephen Oyewo',
    founderStory: 'The company was founded by Sunday Stephen Oyewo, a highly experienced professional with a strong background in business management and real estate operations. He holds a Master’s degree from the University of Ibadan and has worked with several reputable organizations in Nigeria.',
    founderImage: 'https://i.ibb.co/svPCprKx/Whats-App-Image-2026-05-06-at-5-16-56-PM.jpg'
  },
  socials: {
    facebook: 'https://www.facebook.com/share/14agtpU4ydX/',
    instagram: 'https://www.instagram.com/oboyanbaja_24?utm_source=qr&igsh=N2lpcHM2dnU1MjJk',
    tiktok: 'https://tiktok.com/@oboyanbaja',
    youtube: 'https://www.youtube.com/@OBOYANBAJAINVESTMENTSNIGLTD',
    whatsapp: 'https://wa.me/2348055982094'
  },
  contactInfo: {
    email1: 'oboyanbaja@gmail.com',
    email2: '',
    phone: '+234 706 381 2428'
  }
};

interface StoreContextType {
  properties: Property[];
  testimonials: Testimonial[];
  content: SiteContent;
  messages: ContactMessage[];
  loading: boolean;
  updateProperties: (newProps: Property[]) => void;
  addProperty: (prop: Property) => void;
  syncPropertyUpdate: (prop: Property) => void;
  deleteProperty: (id: string) => void;
  updateContent: (newContent: SiteContent) => void;
  addMessage: (msg: ContactMessage) => void;
  updateTestimonials: (newTestimonials: Testimonial[]) => void;
  addTestimonial: (test: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  updateMessages: (newMessages: ContactMessage[]) => void;
  syncMessageStatus: (id: string, status: string) => void;
  deleteMessage: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [content, setContent] = useState<SiteContent>(INITIAL_CONTENT);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupabaseData = async () => {
      try {
        const { data: propsData, error: propsError } = await supabase.from('properties').select('*');
        let finalProps: any[] = [...INITIAL_PROPERTIES];
        
        if (!propsError && propsData) {
          // Map snake_case from Supabase into camelCase
          const mappedProps = propsData.map((p: any) => ({
             ...p,
             videoUrl: p.video_url,
             createdAt: p.created_at ? new Date(p.created_at).getTime() : Date.now(),
             featured: p.featured
          }));
          
          // Merge based on ID so we don't duplicate
          const dbIds = new Set(mappedProps.map((p: any) => p.id));
          const onlyInitials = INITIAL_PROPERTIES.filter(p => !dbIds.has(p.id));
          finalProps = [...mappedProps, ...onlyInitials];
        }
        
        setProperties(finalProps);

        const { data: contentData, error: contentError } = await supabase.from('site_content').select('*').eq('id', 1).single();
        if (!contentError && contentData) {
          // Map flat contentData back to SiteContent structure
          const mappedContent: SiteContent = {
            logo: contentData.logo || 'https://i.ibb.co/twrktVdQ/Whats-App-Image-2026-04-29-at-6-51-43-AM.jpg',
            hero: {
              headline: contentData.hero_title || INITIAL_CONTENT.hero.headline,
              subheadline: contentData.hero_subtitle || INITIAL_CONTENT.hero.subheadline,
              imageUrl: contentData.hero_image || INITIAL_CONTENT.hero.imageUrl,
              videoUrl: contentData.hero_video || INITIAL_CONTENT.hero.videoUrl,
            },
            about: {
              story: contentData.about_story || INITIAL_CONTENT.about.story,
              mission: contentData.about_mission || INITIAL_CONTENT.about.mission,
              vision: contentData.about_vision || INITIAL_CONTENT.about.vision,
              founderName: contentData.founder_name || INITIAL_CONTENT.about.founderName,
              founderStory: contentData.founder_story || INITIAL_CONTENT.about.founderStory,
              founderImage: (!contentData.founder_image || contentData.founder_image.includes('unsplash') || contentData.founder_image.includes('sunday-1.jpg')) ? 'https://i.ibb.co/svPCprKx/Whats-App-Image-2026-05-06-at-5-16-56-PM.jpg' : contentData.founder_image,
            },
            socials: {
              facebook: contentData.social_facebook || 'https://www.facebook.com/share/14agtpU4ydX/',
              instagram: contentData.social_instagram || 'https://www.instagram.com/oboyanbaja_24?utm_source=qr&igsh=N2lpcHM2dnU1MjJk',
              tiktok: contentData.social_tiktok || 'https://tiktok.com/@oboyanbaja',
              youtube: contentData.social_youtube !== undefined ? contentData.social_youtube : (contentData.social_linkedin || 'https://www.youtube.com/@OBOYANBAJAINVESTMENTSNIGLTD'),
              whatsapp: contentData.social_whatsapp || 'https://wa.me/2348055982094',
            },
            contactInfo: {
              email1: contentData.contact_email1 || INITIAL_CONTENT.contactInfo.email1,
              email2: contentData.contact_email2 || INITIAL_CONTENT.contactInfo.email2,
              phone: contentData.contact_phone || INITIAL_CONTENT.contactInfo.phone,
            }
          };
          setContent(mappedContent);
        }

        const { data: testData, error: testError } = await supabase.from('testimonials').select('*');
        if (!testError && testData && testData.length > 0) {
          const mappedTestimonials = testData.map((t: any) => ({
             ...t,
             videoUrl: t.video_url
          }));
          setTestimonials(mappedTestimonials);
        }

        const { data: messagesData, error: messagesError } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
        if (!messagesError && messagesData) {
          const mappedMessages = messagesData.map((m: any) => ({
            ...m,
            inquiryType: m.inquiry_type,
            createdAt: m.created_at ? new Date(m.created_at).getTime() : Date.now(),
          }));
          setMessages(mappedMessages);
        }

      } catch (err) {
        console.error('Error fetching from Supabase:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSupabaseData();
  }, []);

  const updateProperties = async (newProps: Property[]) => {
    setProperties(newProps);
    // Ideally we'd map individual updates, but for adding new items from the 
    // admin dashboard, we can implement an addProperty method explicitly.
  };

  const addProperty = async (prop: Property) => {
    const updated = [prop, ...properties];
    setProperties(updated);
    
    try {
      // Convert to snake_case for Supabase
      const { error } = await supabase.from('properties').insert({
        id: prop.id,
        title: prop.title,
        description: prop.description,
        price: prop.price,
        location: prop.location,
        type: prop.type,
        status: prop.status,
        features: prop.features || [],
        bedrooms: prop.bedrooms,
        bathrooms: prop.bathrooms,
        area: prop.area,
        images: prop.images || [],
        video_url: prop.videoUrl,
        featured: prop.featured || false,
        created_at: prop.createdAt
      });
      if (error) {
        console.error('Insert property error:', error);
        alert('Failed to add property to database: ' + error.message);
      }
    } catch (err: any) {
      console.error('Insert property catch error:', err);
      alert('System Error during property insert: ' + err.message);
    }
  };

  const syncPropertyUpdate = async (prop: Property) => {
    try {
      const { id, ...rest } = prop;
      const { error } = await supabase.from('properties').update({
        title: rest.title,
        description: rest.description,
        price: rest.price,
        location: rest.location,
        type: rest.type,
        status: rest.status,
        features: rest.features || [],
        bedrooms: rest.bedrooms,
        bathrooms: rest.bathrooms,
        area: rest.area,
        images: rest.images || [],
        video_url: rest.videoUrl,
        featured: rest.featured || false,
      }).eq('id', id);

      if (error) {
         console.error('Update property error:', error);
         alert('Failed to update property in database: ' + error.message);
      }
    } catch (err: any) {
       console.error('Update property catch error:', err);
       alert('System Error during property update: ' + err.message);
    }
  };

  const deleteProperty = async (id: string) => {
    setProperties(properties.filter(p => p.id !== id));
    try {
      const { error } = await supabase.from('properties').delete().eq('id', id);
      if (error) {
        console.error('Delete property error:', error);
        alert('Failed to delete property from database: ' + error.message);
      }
    } catch (err: any) {
      console.error('Delete property catch error:', err);
      alert('System Error during property delete: ' + err.message);
    }
  };

  const updateContent = async (newContent: SiteContent) => {
    setContent(newContent);
    try {
      const { error } = await supabase.from('site_content').upsert({
        id: 1,
        hero_title: newContent.hero.headline,
        hero_subtitle: newContent.hero.subheadline,
        hero_image: newContent.hero.imageUrl,
        hero_video: newContent.hero.videoUrl,
        about_story: newContent.about.story,
        about_mission: newContent.about.mission,
        about_vision: newContent.about.vision,
        founder_name: newContent.about.founderName,
        founder_story: newContent.about.founderStory,
        founder_image: newContent.about.founderImage,
        social_facebook: newContent.socials.facebook,
        social_instagram: newContent.socials.instagram,
        social_tiktok: newContent.socials.tiktok,
        social_linkedin: newContent.socials.youtube,
        social_whatsapp: newContent.socials.whatsapp,
        contact_email1: newContent.contactInfo.email1,
        contact_email2: newContent.contactInfo.email2,
        contact_phone: newContent.contactInfo.phone,
      });

      if (error) {
        console.error('Update content error:', error);
        if (error.message.includes('contact_email1')) {
          alert("Database Error: You are missing new columns for Contact Info. Please run this SQL in your Supabase SQL Editor:\n\nALTER TABLE site_content ADD COLUMN IF NOT EXISTS contact_email1 text;\nALTER TABLE site_content ADD COLUMN IF NOT EXISTS contact_email2 text;\nALTER TABLE site_content ADD COLUMN IF NOT EXISTS contact_phone text;");
        } else {
          alert('Failed to update content in database: ' + error.message);
        }
      }
    } catch (err: any) {
      console.error('Update content catch error:', err);
      alert('System Error during content update: ' + err.message);
    }
  };

  const addMessage = async (msg: ContactMessage) => {
    const updated = [msg, ...messages];
    setMessages(updated);
    await supabase.from('contact_messages').insert({
      id: msg.id,
      name: msg.name,
      email: msg.email,
      phone: msg.phone,
      inquiry_type: msg.inquiryType,
      message: msg.message,
      status: msg.status || 'new',
    });
  };

  const updateTestimonials = async (newTestimonials: Testimonial[]) => {
    setTestimonials(newTestimonials);
  };

  const addTestimonial = async (test: Testimonial) => {
    const updated = [test, ...testimonials];
    setTestimonials(updated);
    await supabase.from('testimonials').insert({
      id: test.id,
      name: test.name,
      role: test.role,
      content: test.content,
      avatar: test.avatar,
      rating: test.rating,
      video_url: test.videoUrl,
    });
  };

  const deleteTestimonial = async (id: string) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
    await supabase.from('testimonials').delete().eq('id', id);
  };

  const updateMessages = async (newMessages: ContactMessage[]) => {
    setMessages(newMessages);
  };

  const syncMessageStatus = async (id: string, status: string) => {
    setMessages(messages.map(m => m.id === id ? { ...m, status: status as any } : m));
    await supabase.from('contact_messages').update({ status }).eq('id', id);
  };

  const deleteMessage = async (id: string) => {
    setMessages(messages.filter(m => m.id !== id));
    await supabase.from('contact_messages').delete().eq('id', id);
  };

  return (
    <StoreContext.Provider value={{
      properties,
      testimonials,
      content,
      messages,
      loading,
      updateProperties,
      addProperty,
      syncPropertyUpdate,
      deleteProperty,
      updateContent,
      addMessage,
      updateTestimonials,
      addTestimonial,
      deleteTestimonial,
      updateMessages,
      syncMessageStatus,
      deleteMessage
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
