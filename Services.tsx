import { motion } from 'motion/react';
import { useStore } from '@/lib/store';
import { ArrowRight, CheckCircle, Home as HomeIcon, Map, Key, Building2, TrendingUp, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropertyCard from '@/components/PropertyCard';
import { formatPrice } from '@/lib/utils';

export default function Home() {
  const { properties, content } = useStore();
  const featuredProperties = properties.filter(p => p.featured).slice(0, 3);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {content.hero.videoUrl && !content.hero.videoUrl.includes('youtube') && !content.hero.videoUrl.includes('youtu.be') ? (
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover filter brightness-50"
            >
              <source src={content.hero.videoUrl} type="video/mp4" />
            </video>
          ) : (
            <img 
              src={content.hero.imageUrl || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1920'} 
              alt="Luxury Property Background" 
              className="w-full h-full object-cover filter brightness-50"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 to-transparent" />
        </div>
        
        <div className="container-custom px-6 relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-center md:text-left mx-auto md:mx-0"
          >
            <span className="inline-block text-sage text-[11px] uppercase tracking-[0.2em] font-semibold mb-6">
              
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl mb-8 leading-[1.1] font-serif">
              {content.hero.headline}
            </h1>
            <p className="text-lg md:text-xl text-ash mb-10 max-w-xl font-light leading-relaxed">
              {content.hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 items-center justify-center md:justify-start">
              <Link to="/properties" className="btn-primary w-full sm:w-auto text-center">
                View Properties
              </Link>
              
              <div className="hidden sm:block">
                <motion.div 
                  animate={{ y: [0, 10, 0] }} 
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2 shrink-0 cursor-default"
                >
                  <div className="w-1 h-2 bg-white rounded-full" />
                </motion.div>
              </div>

              <Link to="/contact" className="btn-outline border-ash text-white hover:border-white w-full sm:w-auto text-center">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>







      {/* CTA Section */}
      <section className="py-24 bg-sage">
        <div className="container-custom px-6 text-center text-white">
          <h2 className="text-4xl md:text-6xl mb-8 leading-tight">Ready to Secure Your Piece <br className="hidden md:block" /> of the Future?</h2>
          <p className="text-xl mb-12 font-light opacity-90">Our consultants are ready to guide you through your next investment.</p>
          <div className="flex justify-center gap-6">
            <Link to="/contact" className="bg-white text-charcoal px-10 py-4 font-bold uppercase tracking-widest text-xs hover:bg-charcoal hover:text-white transition-all shadow-xl">
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
