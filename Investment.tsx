import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send, MessageSquare } from 'lucide-react';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export default function Contact() {
  const { addMessage, content } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addMessage({
        id: Date.now().toString(),
        ...formData,
        createdAt: Date.now(),
        status: 'new'
      });

      const whatsappBaseUrl = content.socials?.whatsapp || 'https://wa.me/2348055982094';
      const textMessage = `Hello, I am contacting you from the company website.
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Inquiry Type: ${formData.inquiryType}
Message: ${formData.message}`;

      const whatsappUrl = whatsappBaseUrl.includes('?') 
        ? `${whatsappBaseUrl}&text=${encodeURIComponent(textMessage)}` 
        : `${whatsappBaseUrl}?text=${encodeURIComponent(textMessage)}`;

      window.open(whatsappUrl, '_blank');

      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', inquiryType: 'general', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section className="bg-charcoal text-white pt-40 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920')] bg-cover opacity-10" />
        <div className="container-custom relative z-10 text-center">
            <span className="text-sage text-[10px] uppercase tracking-[0.4em] font-bold block mb-6">Contact Us</span>
            <h1 className="text-5xl md:text-7xl mb-10 leading-tight">Let's Discuss <br className="hidden md:block" /> Your Next Asset.</h1>
            <p className="text-gray-400 font-light leading-relaxed text-lg max-w-2xl mx-auto">
              Whether you're looking to invest in land, find a luxury home, or need professional 
              property management, our experts are here to help.
            </p>
        </div>
      </section>

      <section className="section-padding bg-luxury-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <div className="space-y-10">
              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 border border-gray-100 flex items-center justify-center shrink-0 group-hover:bg-sage group-hover:border-sage transition-all duration-500">
                  <Phone className="text-charcoal group-hover:text-white transition-colors" size={24} strokeWidth={1} />
                </div>
                <div>
                   <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Call Us</h4>
                   <a href={`tel:${content.contactInfo.phone.replace(/\s+/g, '')}`} className="text-xl font-serif text-charcoal block hover:text-sage transition-colors">{content.contactInfo.phone}</a>
                   <a href={content.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="text-xl font-serif text-charcoal block hover:text-sage transition-colors mt-2">+234 805 598 2094 (WhatsApp Only)</a>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 border border-gray-100 flex items-center justify-center shrink-0 group-hover:bg-sage group-hover:border-sage transition-all duration-500">
                  <Mail className="text-charcoal group-hover:text-white transition-colors" size={24} strokeWidth={1} />
                </div>
                <div>
                   <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Email Us</h4>
                   {content.contactInfo.email1 && <a href={`mailto:${content.contactInfo.email1}`} className="text-xl font-serif text-charcoal block hover:text-sage transition-colors">{content.contactInfo.email1}</a>}
                   {content.contactInfo.email2 && <a href={`mailto:${content.contactInfo.email2}`} className="text-xl font-serif text-charcoal block hover:text-sage transition-colors mt-2">{content.contactInfo.email2}</a>}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 md:p-16 shadow-2xl border border-gray-50">
             <h3 className="text-3xl mb-10 font-serif">Send an Inquiry</h3>
             
             {isSuccess ? (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="bg-sage/10 p-10 text-center border border-sage/20"
               >
                 <Send className="mx-auto text-sage mb-6" size={50} />
                 <h4 className="text-2xl mb-4 text-sage">Message Sent Successfully</h4>
                 <p className="text-sm text-gray-500">Thank you for reaching out. One of our property consultants will contact you shortly.</p>
               </motion.div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Full Name</label>
                     <input 
                       required
                       type="text" 
                       className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-sage transition-colors bg-transparent text-sm"
                       value={formData.name}
                       onChange={(e) => setFormData({...formData, name: e.target.value})}
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Email Address</label>
                     <input 
                       required
                       type="email" 
                       className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-sage transition-colors bg-transparent text-sm"
                       value={formData.email}
                       onChange={(e) => setFormData({...formData, email: e.target.value})}
                     />
                   </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Phone Number</label>
                     <input 
                       required
                       type="tel" 
                       className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-sage transition-colors bg-transparent text-sm"
                       value={formData.phone}
                       onChange={(e) => setFormData({...formData, phone: e.target.value})}
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Inquiry Type</label>
                     <select 
                       className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-sage transition-colors bg-transparent text-sm uppercase tracking-wider font-bold"
                       value={formData.inquiryType}
                       onChange={(e) => setFormData({...formData, inquiryType: e.target.value})}
                     >
                       <option value="general">General Inquiry</option>
                       <option value="buy">Property Purchase</option>
                       <option value="land">Land Acquisition</option>
                       <option value="rent">Rental Inquiry</option>
                       <option value="management">Management Services</option>
                       <option value="development">Development Partnership</option>
                     </select>
                   </div>
                 </div>

                 <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Your Message</label>
                   <textarea 
                     rows={4}
                     className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-sage transition-colors bg-transparent text-sm resize-none"
                     value={formData.message}
                     onChange={(e) => setFormData({...formData, message: e.target.value})}
                   />
                 </div>

                 <button 
                   disabled={isSubmitting}
                   type="submit" 
                   className={cn(
                     "w-full btn-primary h-16 flex items-center justify-center gap-4",
                     isSubmitting && "opacity-70 cursor-not-allowed"
                   )}
                 >
                   {isSubmitting ? 'Sending Request...' : 'Secure Your Consultation'}
                   <Send size={16} />
                 </button>
               </form>
             )}
          </div>
        </div>
      </section>

    </div>
  );
}
