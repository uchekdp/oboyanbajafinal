import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Shield, Phone, Mail, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/lib/store';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Properties', path: '/properties' },
  { name: 'Investment', path: '/investment' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { content } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled ? 'bg-white border-b border-charcoal/5 py-4' : 'bg-transparent py-6'
      )}
    >
      <div className="container-custom px-6 flex justify-between items-center">
        <Link to="/" className="flex flex-col items-start group">
          {content.logo ? (
            <img src={content.logo} alt="OBOYANBAJA" className="h-16 md:h-24 object-contain" />
          ) : (
            <>
              <span className={cn(
                "font-serif text-xl md:text-2xl font-bold leading-tight transition-colors",
                isScrolled ? "text-charcoal" : "text-white"
              )}>
                OBOYANBAJA
              </span>
              <span className={cn(
                "text-[10px] md:text-[11px] tracking-[0.2em] font-sans uppercase",
                isScrolled ? "text-ash" : "text-sage"
              )}>
                Investments Nig Ltd
              </span>
            </>
          )}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-xs font-semibold uppercase tracking-widest transition-all hover:text-sage relative group',
                location.pathname === link.path 
                  ? 'text-sage' 
                  : isScrolled ? 'text-charcoal' : 'text-white'
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-1 left-0 w-0 h-[1px] bg-sage transition-all duration-300 group-hover:w-full",
                location.pathname === link.path && "w-full"
              )} />
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "p-1",
              isScrolled ? "text-charcoal" : "text-white"
            )}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 py-8 px-6"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'text-sm font-bold uppercase tracking-[0.2em] transition-colors',
                    location.pathname === link.path ? 'text-sage' : 'text-charcoal'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Phone size={16} />
                  <span>{content.contactInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <MessageCircle size={16} />
                  <span>+234 805 598 2094 (WhatsApp Only)</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-400">
                  <Mail size={16} className="mt-1" />
                  <div className="flex flex-col">
                    {content.contactInfo.email1 && <span>{content.contactInfo.email1}</span>}
                    {content.contactInfo.email2 && <span>{content.contactInfo.email2}</span>}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
