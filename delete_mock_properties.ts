import { motion } from 'motion/react';
import { useStore } from '@/lib/store';
import { Quote, Star, Play } from 'lucide-react';

export default function Testimonials() {
  const { testimonials } = useStore();

  return (
    <div>
      <section className="bg-charcoal text-white pt-40 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554200876-56c2f25224fa?auto=format&fit=crop&q=80&w=1920')] bg-cover opacity-10" />
        <div className="container-custom px-6 text-center relative z-10">
          <span className="text-sage text-[10px] uppercase tracking-[0.4em] font-bold block mb-6">Client Stories</span>
          <h1 className="text-5xl md:text-7xl mb-10">Voices of Success</h1>
          <p className="text-gray-400 max-w-2xl mx-auto font-light leading-relaxed text-lg">
            Hear from the individuals and corporations who have redefined their real estate journey and secured 
            their future with OBOYANBAJA INVESTMENTS.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            {testimonials.map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-luxury-white p-12 relative border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <Quote className="text-sage/20 absolute top-8 right-8" size={80} strokeWidth={1} />
                
                <div className="flex gap-1 mb-6">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-sage text-sage" />
                  ))}
                </div>

                <p className="text-xl font-serif leading-relaxed mb-10 text-charcoal italic">
                  "{item.content}"
                </p>

                <div className="flex items-center gap-4">
                  {item.avatar && (
                    <img 
                      src={item.avatar} 
                      alt={item.name} 
                      loading="lazy"
                      className="w-14 h-14 rounded-full grayscale hover:grayscale-0 transition-all cursor-pointer"
                    />
                  )}
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-xs mb-1">{item.name}</h4>
                    <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">{item.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Video Testimonials Preview */}
          <div className="bg-charcoal p-12 md:p-20 relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200')] bg-cover opacity-20" />
             <div className="relative z-10 text-center max-w-2xl mx-auto">
                <span className="text-sage text-[10px] uppercase tracking-[0.4em] font-bold block mb-8 text-center w-full">Impact</span>
                <h2 className="text-4xl text-white mb-8">Video Success Stories</h2>
                <div className="flex justify-center mb-12">
                   <button className="w-20 h-20 rounded-full border border-sage flex items-center justify-center text-sage hover:bg-sage hover:text-white transition-all group scale-100 hover:scale-110">
                      <Play className="translate-x-1" size={30} fill="currentColor" />
                   </button>
                </div>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                   Watch as our clients take you through their journey from initial inquiry to property handover.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-20 border-y border-gray-100 bg-luxury-white">
        <div className="container-custom px-6 overflow-hidden">
           <div className="flex flex-wrap justify-around items-center gap-12 opacity-30 grayscale contrast-125">
             <span className="font-serif text-3xl italic">LuxuryEstate</span>
             <span className="font-serif text-3xl italic">PremierGroup</span>
             <span className="font-serif text-3xl italic">LagosInv</span>
             <span className="font-serif text-3xl italic">LegacyTrust</span>
             <span className="font-serif text-3xl italic">RoyalAvenue</span>
           </div>
        </div>
      </section>
    </div>
  );
}
