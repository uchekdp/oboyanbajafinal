import { motion } from 'motion/react';
import { Property } from '@/types';
import { MapPin, Bed, Bath, Maximize, ArrowRight, Play } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface PropertyCardProps {
  property: Property;
  key?: string | number;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Helper to extract YouTube ID
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  const ytId = getYouTubeId(property.videoUrl || '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white border border-light-sage/50 overflow-hidden transition-all duration-500 hover:card-shadow flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-light-sage/30">
        {!isPlaying ? (
          <>
            <img
              src={property.images[0]}
              alt={property.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {property.videoUrl && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors cursor-pointer z-10"
                onClick={() => setIsPlaying(true)}
              >
                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center pl-1 text-sage hover:scale-110 transition-transform shadow-lg">
                  <Play size={24} fill="currentColor" />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-black z-20 absolute inset-0">
            {ytId ? (
              <iframe
                src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=0`}
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={property.videoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            )}
          </div>
        )}
        
        {!isPlaying && (
          <>
            <div className="absolute top-4 left-4 pointer-events-none z-10">
              <span className="bg-charcoal/80 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1">
                {property.type}
              </span>
            </div>
            <div className="absolute top-4 right-4 pointer-events-none z-10">
              <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 ${
                property.status === 'available' ? 'bg-sage text-white' : 'bg-red-500 text-white'
              }`}>
                {property.status}
              </span>
            </div>
          </>
        )}
      </div>

      <div className="p-8 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-sage mb-2">
            <MapPin size={14} />
            <span className="text-[10px] uppercase tracking-widest font-bold">{property.location}</span>
          </div>
          <h3 className="text-xl mb-4 group-hover:text-sage transition-colors">{property.title}</h3>
          
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
            <div className="flex gap-3 flex-wrap">
              {property.bedrooms && (
                <div className="flex items-center gap-1 text-gray-400">
                  <Bed size={16} />
                  <span className="text-xs">{property.bedrooms}</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center gap-1 text-gray-400">
                  <Bath size={16} />
                  <span className="text-xs">{property.bathrooms}</span>
                </div>
              )}
              {property.area && (
                <div className="flex items-center gap-1 text-gray-400">
                  <Maximize size={16} />
                  <span className="text-xs">{property.area}</span>
                </div>
              )}
            </div>
            <span className="text-lg font-serif font-bold text-charcoal whitespace-nowrap pl-2">
              {formatPrice(property.price)}
            </span>
          </div>
        </div>

        <Link 
          to="/contact" 
          className="flex items-center justify-between group/link"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 group-hover/link:text-charcoal transition-colors">
            Inquire Now
          </span>
          <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center transition-all group-hover/link:bg-charcoal group-hover/link:text-white group-hover/link:translate-x-1">
            <ArrowRight size={14} />
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
