import { motion } from 'motion/react';
import { useStore } from '@/lib/store';
import { CheckCircle2, History, Target, Users } from 'lucide-react';

export default function About() {
  const { content } = useStore();

  return (
    <div>
      {/* Hero Header */}
      <section className="bg-charcoal text-white pt-40 pb-24 relative overflow-hidden">
        <div className="container-custom px-6 text-center relative z-10">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sage text-[10px] uppercase tracking-[0.4em] font-bold block mb-6"
          >
            Our Story
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl mb-8"
          >
            Legacy of Trust
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto font-light leading-relaxed text-lg"
          >
            {content.about.story}
          </motion.p>
        </div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920')] bg-cover opacity-10" />
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sage text-[10px] uppercase tracking-[0.4em] font-bold block mb-6">Who We Are</span>
            <h2 className="text-4xl md:text-5xl mb-10 leading-tight">Driven by Integrity, <br /> Defined by Value.</h2>
          </div>
          
          <div className="space-y-12">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-luxury-white flex items-center justify-center shrink-0">
                <Target className="text-sage" size={24} />
              </div>
              <div>
                <h4 className="text-xl mb-3 uppercase tracking-wider text-[10px] font-bold text-gray-400">Our Mission</h4>
                <p className="text-gray-500 font-light leading-relaxed">{content.about.mission}</p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-luxury-white flex items-center justify-center shrink-0">
                <Users className="text-sage" size={24} />
              </div>
              <div>
                <h4 className="text-xl mb-3 uppercase tracking-wider text-[10px] font-bold text-gray-400">Our Vision</h4>
                <p className="text-gray-500 font-light leading-relaxed">{content.about.vision}</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-luxury-white flex items-center justify-center shrink-0">
                <History className="text-sage" size={24} />
              </div>
              <div>
                <h4 className="text-xl mb-3 uppercase tracking-wider text-[10px] font-bold text-gray-400">Our Core Values</h4>
                <p className="text-gray-500 font-light leading-relaxed mb-4">Integrity, Excellence, Transparency, Innovation, Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section-padding bg-charcoal text-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1">
            <span className="text-sage text-[10px] uppercase tracking-[0.4em] font-bold block mb-6">Our Leadership</span>
            <h2 className="text-4xl md:text-5xl mb-8 leading-tight">The Visionary Behind <br /> OBOYANBAJA</h2>
            <div className="space-y-6 text-gray-400 font-light leading-relaxed text-lg">
              {content.about.founderStory && (
                <p className="border-l-4 border-sage pl-8 italic">
                  "{content.about.founderStory}"
                </p>
              )}
              <h4 className="text-white font-serif text-2xl mt-8">— {content.about.founderName || 'Sunday Stephen Oyewo'}</h4>
              <p className="text-sage uppercase tracking-widest text-xs font-bold">Founder / CEO</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700"
            >
              <img 
                src={content.about.founderImage} 
                alt={content.about.founderName} 
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
