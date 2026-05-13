import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin, MessageCircle, Music2 } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { content } = useStore();

  const socialIcons = [
    { name: 'Facebook', Icon: Facebook, link: content.socials?.facebook || '#', color: '#1877F2' },
    { name: 'Instagram', Icon: Instagram, link: content.socials?.instagram || '#', color: '#E4405F' },
    { name: 'YouTube', Icon: Youtube, link: content.socials?.youtube || '#', color: '#FF0000' },
    { name: 'WhatsApp', Icon: MessageCircle, link: content.socials?.whatsapp || '#', color: '#25D366' },
    { name: 'TikTok', Icon: Music2, link: content.socials?.tiktok || '#', color: '#FFFFFF' }
  ];

  return (
    <footer className="bg-charcoal text-white pt-20 pb-10">
      <div className="container-custom px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <Link to="/" className="flex flex-col items-start mb-6">
            <span className="font-serif text-2xl font-bold leading-tight uppercase tracking-tighter">
              OBOYANBAJA
            </span>
            <span className="text-[10px] tracking-[0.3em] font-sans uppercase text-gray-400">
              Investments Nig Ltd
            </span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Trusted Real Estate & Investment Company in Nigeria. We help individuals and families acquire genuine landed properties with peace of mind.
          </p>
        </div>

        <div className="flex flex-col md:items-end">
          <div className="w-full md:w-auto">
            <h4 className="text-lg mb-8 font-serif md:text-left">Contact Info</h4>
            <div className="flex flex-col gap-6 text-sm text-gray-400 mb-10">
              <div className="flex items-center gap-4">
                <Phone size={20} className="text-sage shrink-0" />
                <span>{content.contactInfo.phone}</span>
              </div>
              <div className="flex items-center gap-4">
                <MessageCircle size={20} className="text-sage shrink-0" />
                <span>+234 805 598 2094 (WhatsApp Only)</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail size={20} className="text-sage shrink-0" />
                <span>
                  {content.contactInfo.email1}
                  {content.contactInfo.email2 && <><br/>{content.contactInfo.email2}</>}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              {socialIcons.map((item, i) => (
                <a 
                  key={i} 
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gray-700 flex items-center justify-center transition-transform hover:scale-110 bg-[#1A1A1A]"
                  style={{ color: item.color, borderColor: item.color }}
                  referrerPolicy="no-referrer"
                  title={item.name}
                >
                  <item.Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom px-6 pt-10 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 uppercase tracking-widest font-semibold">
        <p>© {currentYear} OBOYANBAJA INVESTMENTS NIG LTD. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
