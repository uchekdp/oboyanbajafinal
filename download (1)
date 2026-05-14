import { motion } from 'motion/react';
import { useStore } from '@/lib/store';
import { Eye, Rocket, Globe, Sparkles } from 'lucide-react';

export default function Vision() {
  const { content } = useStore();

  return (
    <div>
      {/* Hero */}
      <section className="bg-charcoal text-white pt-40 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888047466-9ab7ebed78e3?auto=format&fit=crop&q=80&w=1920')] bg-cover opacity-10" />
        <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <span className="text-sage text-[10px] uppercase tracking-[0.4em] font-bold block mb-6">Looking Ahead</span>
            <h1 className="text-5xl md:text-7xl mb-10 leading-tight">Mastering the Architecture <br /> of Tomorrow.</h1>
            <div className="p-8 border-l-4 border-sage bg-white/5 backdrop-blur-sm shadow-xl">
              <p className="text-2xl font-serif italic text-white leading-relaxed">
                "{content.about.vision}"
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 relative hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="aspect-square bg-white/5 backdrop-blur-md relative overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&q=80&w=1200" 
                alt="Architecture" 
                loading="lazy"
                className="w-full h-full object-cover mix-blend-overlay opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Eye className="text-white" size={100} strokeWidth={0.5} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strategic Pillars */}
      <section className="section-padding bg-charcoal text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { icon: Globe, title: 'Global Standards', desc: 'Implementing international best practices in architectural design and urban planning for every project.' },
              { icon: Rocket, title: 'Sustainable Growth', desc: 'Focusing on developments that balance modern luxury with environmental responsibility and long-term value.' },
              { icon: Sparkles, title: 'Innovation', desc: 'Leveraging smart technology and creative engineering to redefine how we build and manage properties.' }
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center md:text-left"
              >
                <div className="w-16 h-16 border border-gray-700 flex items-center justify-center mb-8 mx-auto md:mx-0">
                  <pillar.icon className="text-sage" size={30} />
                </div>
                <h3 className="text-2xl mb-6 font-serif">{pillar.title}</h3>
                <p className="text-gray-400 font-light leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Roadmap */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-20">
             <h2 className="text-4xl md:text-5xl mb-6">Our Future Roadmap</h2>
             <p className="text-gray-500">We are not just building houses; we are designing the future of community living in Africa.</p>
          </div>

          <div className="space-y-24 relative">
             <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-100 -translate-x-1/2 hidden md:block" />
             
             {[
               { side: 'left', title: 'Smart Cities', period: '2026 - 2028', desc: 'Development of fully integrated smart residential hubs with renewable energy systems.' },
               { side: 'right', title: 'Global Portfolio', period: '2028 - 2030', desc: 'Expanding OBOYANBAJA footprint to major international real estate markets.' },
               { side: 'left', title: 'AI-Driven Management', period: '2030 & Beyond', desc: 'Revolutionizing property management through proprietary AI maintenance systems.' }
             ].map((task, i) => (
               <div key={i} className={`flex flex-col md:flex-row items-center gap-12 ${task.side === 'right' ? 'md:flex-row-reverse' : ''}`}>
                 <div className="w-full md:w-1/2 flex justify-center">
                    <div className={`p-10 border border-gray-100 bg-luxury-white w-full max-w-sm relative ${task.side === 'left' ? 'text-right' : 'text-left'}`}>
                       <span className="text-sage font-bold text-xs tracking-widest mb-2 block">{task.period}</span>
                       <h4 className="text-2xl mb-4 font-serif">{task.title}</h4>
                       <p className="text-gray-500 text-sm leading-relaxed">{task.desc}</p>
                    </div>
                 </div>
                 <div className="w-8 h-8 rounded-full border-4 border-white bg-sage shadow-md z-10 hidden md:block" />
                 <div className="w-full md:w-1/2" />
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}
