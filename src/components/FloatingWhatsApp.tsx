import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function FloatingWhatsApp() {
  const { content } = useStore();
  const whatsappLink = content.socials?.whatsapp || 'https://wa.me/2348055982094';

  return (
    <a 
      href={whatsappLink} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={32} />
      <span className="absolute right-full mr-4 px-4 py-2 bg-charcoal text-white text-[10px] uppercase tracking-widest font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us
      </span>
    </a>
  );
}
