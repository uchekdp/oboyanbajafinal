import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Coins, Building2, Handshake } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function Investment() {
  const { content } = useStore();
  
  return (
    <div>
      <section className="bg-charcoal text-white pt-40 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920')] bg-cover opacity-10" />
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sage text-[10px] uppercase tracking-[0.4em] font-bold block mb-6">Wealth Creation</span>
            <h1 className="text-5xl md:text-7xl mb-10 leading-[1.1]">Grow Your Wealth Through Real Estate.</h1>
            <p className="text-gray-400 font-light leading-relaxed text-lg">
              We provide profitable real estate investment opportunities for individuals, 
              cooperatives, and organizations. Our strategies are designed for long-term 
              capital appreciation and secure returns.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-luxury-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                icon: TrendingUp, 
                title: 'Land Banking', 
                desc: 'Acquire land in strategic, fast-developing locations and hold for significant capital appreciation.' 
              },
              { 
                icon: Handshake, 
                title: 'Joint Ventures', 
                desc: 'Partner with us on property development projects to share in the development profits and equity.' 
              },
              { 
                icon: Coins, 
                title: 'Buy and Resell', 
                desc: 'Invest in undervalued properties, improve them (or wait for appreciation), and resell for immediate profit.' 
              },
              { 
                icon: Building2, 
                title: 'Rental Income Properties', 
                desc: 'Build or buy residential and commercial properties that generate consistent monthly or annual cash flow.' 
              }
            ].map((option, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-12 border border-gray-100 bg-white hover:card-shadow transition-all duration-500"
              >
                <div className="w-16 h-16 border border-sage/20 flex items-center justify-center mb-8">
                  <option.icon className="text-sage" size={32} strokeWidth={1} />
                </div>
                <h3 className="text-2xl mb-4 font-serif">{option.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed">{option.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-charcoal py-24 text-white">
        <div className="container-custom px-6 text-center">
          <h2 className="text-4xl md:text-5xl mb-10 font-serif">Ready to start your <br /> investment journey?</h2>
          <p className="text-gray-400 mb-12 max-w-xl mx-auto font-light">
            Consult with our financial and real estate experts to find the best 
            investment plan tailored to your goals.
          </p>
          <a 
            href={content.socials?.whatsapp || "https://wa.me/2348055982094"} 
            className="inline-flex items-center gap-3 bg-white text-charcoal px-8 py-4 rounded-none transition-all duration-300 hover:bg-[#25D366] hover:text-white hover:scale-105 active:scale-95 uppercase tracking-widest text-xs font-bold"
            target="_blank"
            rel="noopener noreferrer"
          >
            Connect with an Expert
          </a>
        </div>
      </section>
    </div>
  );
}
