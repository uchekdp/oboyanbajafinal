import { motion } from 'motion/react';
import { ShieldCheck, Zap, BarChart3, HelpCircle, HardHat, FileCheck, MapPin, Handshake } from 'lucide-react';

const benefits = [
  { icon: ShieldCheck, title: 'Integrity & Transparency', desc: 'No hidden charges or grey areas. We provide full disclosures on all property transactions.' },
  { icon: FileCheck, title: 'Verified Properties', desc: 'Every property in our portfolio undergoes rigorous legal verification and title checks.' },
  { icon: MapPin, title: 'Prime Locations', desc: 'We only offer properties in areas with proven historical and projected high appreciation.' },
  { icon: HardHat, title: 'Professional Management', desc: 'Our dedicated management team ensures your property remains in impeccable condition.' },
  { icon: BarChart3, title: 'High ROI Opportunities', desc: 'Strategic investment packages tailored to maximize your wealth through real estate.' },
  { icon: Zap, title: 'Expert Support', desc: '24/7 client support to guide you through acquisition, development, or management.' },
  { icon: Handshake, title: 'Trusted Legal Documentation', desc: 'Seamless processing of C of O, Governor Consent, and other vital documentations.' },
  { icon: HelpCircle, title: 'End-to-End Service', desc: 'From initial consultation to final keys and ongoing management, we handle it all.' }
];

export default function WhyChooseUs() {
  return (
    <div>
      <section className="bg-charcoal text-white pt-40 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1920')] bg-cover opacity-10" />
        <div className="container-custom relative z-10 px-6 text-center">
          <span className="text-sage text-[10px] uppercase tracking-[0.4em] font-bold block mb-6">The Difference</span>
          <h1 className="text-5xl md:text-7xl mb-10">Why Clients Trust Us</h1>
          <p className="text-gray-400 max-w-2xl mx-auto font-light leading-relaxed text-lg">
            At OBOYANBAJA INVESTMENTS, we don't just sell properties; we build lasting relationships anchored on trust, 
            value, and professional excellence.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20">
            {benefits.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="w-16 h-16 border border-gray-100 flex items-center justify-center mb-8 group-hover:bg-sage group-hover:border-sage transition-all duration-500">
                  <item.icon className="text-charcoal group-hover:text-white transition-colors" size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-4 h-12 leading-tight">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="section-padding bg-charcoal text-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
           <div className="order-2 lg:order-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {[
                   { label: 'Asset Security', val: '100%', sub: 'Verified Documentation' },
                   { label: 'Client Retention', val: '95%', sub: 'Lifetime Support' },
                   { label: 'Property Appreciation', val: '25%+', sub: 'Average Annual ROI' },
                   { label: 'Response Time', val: '< 2hrs', sub: 'Dedicated Consultants' }
                 ].map((stat, i) => (
                   <div key={i} className="p-8 border border-gray-800">
                      <span className="text-3xl font-serif text-sage block mb-2">{stat.val}</span>
                      <span className="text-xs uppercase tracking-widest font-bold block mb-1">{stat.label}</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest">{stat.sub}</span>
                   </div>
                 ))}
              </div>
           </div>
           
           <div className="order-1 lg:order-2">
              <span className="text-sage text-[10px] uppercase tracking-[0.4em] font-bold block mb-6">Execution Excellence</span>
              <h2 className="text-4xl md:text-5xl mb-8 leading-tight">Data-Driven Success <br /> Built for Your Growth.</h2>
              <p className="text-gray-400 font-light leading-relaxed mb-10">
                We utilize advanced market analytics and deep local expertise to identify opportunities before they hit 
                the mainstream market, giving our clients a distinct competitive advantage.
              </p>
              <ul className="space-y-4">
                 {['Proprietary Market Research', 'Direct Developer Relationships', 'Advanced Asset Portfolios'].map(item => (
                   <li key={item} className="flex items-center gap-3 text-sm">
                      <div className="w-1.5 h-1.5 bg-sage rounded-full" />
                      {item}
                   </li>
                 ))}
              </ul>
           </div>
        </div>
      </section>
    </div>
  );
}
