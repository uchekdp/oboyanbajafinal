import { motion } from 'motion/react';
import { Map, Home as HomeIcon, TrendingUp, Building2, Key, MessageSquare, ClipboardCheck, Briefcase } from 'lucide-react';

const services = [
  { 
    icon: Map, 
    title: 'Land Sales', 
    desc: 'Affordable residential and commercial lands in strategic locations like Lagos and regional fast-growing hubs.' 
  },
  { 
    icon: HomeIcon, 
    title: 'House Sales', 
    desc: 'Quality homes, apartments, and estates carefully curated for safety, comfort, and luxury living.' 
  },
  { 
    icon: Building2, 
    title: 'Property Development', 
    desc: 'Constructing modern, sustainable infrastructures that redefine the skyline and standard of living.' 
  },
  { 
    icon: Briefcase, 
    title: 'Property Management', 
    desc: 'Professional management services for landlords and investors, ensuring maximum yield and asset preservation.' 
  },
  { 
    icon: ClipboardCheck, 
    title: 'Documentation & Title Processing', 
    desc: 'Relieving clients of the stress of securing complete legal documents (C of O, Governor Consent, etc).' 
  },
  { 
    icon: MessageSquare, 
    title: 'Real Estate Consultancy', 
    desc: 'Professional advice for buyers and investors to make data-driven decisions in the Nigerian market.' 
  }
];

export default function Services() {
  return (
    <div>
      <section className="bg-charcoal text-white pt-40 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558236287-ba8dd56ff2f4?auto=format&fit=crop&q=80&w=1920')] bg-cover opacity-10" />
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sage text-[10px] uppercase tracking-[0.4em] font-bold block mb-6">Expertise</span>
            <h1 className="text-5xl md:text-7xl mb-10 leading-[1.1]">Our Professional Services.</h1>
            <p className="text-gray-400 font-light leading-relaxed text-lg">
              We provide comprehensive real estate solutions built on a foundation 
              of transparency and excellence.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-luxury-white">
        <div className="container-custom">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 border border-gray-100 bg-white hover:card-shadow transition-all duration-500"
              >
                <service.icon className="text-sage mb-8 transition-transform group-hover:scale-110" size={40} strokeWidth={1} />
                <h3 className="text-2xl mb-4 font-serif">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-24 bg-charcoal text-white overflow-hidden">
        <div className="container-custom px-6 relative">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
             <Briefcase size={400} strokeWidth={0.5} />
          </div>
          <div className="max-w-3xl relative z-10">
             <h2 className="text-4xl md:text-6xl font-serif mb-10 leading-tight">We understand the value of trust.</h2>
             <p className="text-gray-400 text-xl font-light leading-relaxed mb-8 border-l-4 border-sage pl-8">
               "Building wealth through property ownership shouldn't be stressful. 
               We deal in transparency, making sure every document is verified and 
               every handshake means something."
             </p>
             <p className="text-sage uppercase tracking-widest text-xs font-bold">— OBOYANBAJA Professional Promise</p>
          </div>
        </div>
      </section>
    </div>
  );
}
