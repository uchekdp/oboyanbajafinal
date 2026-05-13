import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useStore } from '@/lib/store';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import { Property } from '@/types';

export default function Properties() {
  const { properties } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [hasVideoFilter, setHasVideoFilter] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const locations = useMemo(() => {
    return ['all', ...new Set(properties.map(p => p.location))];
  }, [properties]);

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             p.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || p.type === typeFilter;
      const matchesLocation = locationFilter === 'all' || p.location === locationFilter;
      const matchesVideo = !hasVideoFilter || !!p.videoUrl;
      return matchesSearch && matchesType && matchesLocation && matchesVideo;
    });
  }, [properties, searchTerm, typeFilter, locationFilter, hasVideoFilter]);

  return (
    <div>
      {/* Header */}
      <section className="bg-charcoal text-white pt-40 pb-24 relative overflow-hidden mb-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1920')] bg-cover opacity-10" />
        <div className="container-custom px-6 text-center relative z-10">
          <span className="text-sage text-[10px] uppercase tracking-[0.4em] font-bold block mb-4">Discover</span>
          <h1 className="text-4xl md:text-6xl mb-6">Our Premium Listings</h1>
          <p className="text-gray-300 max-w-xl mx-auto font-light leading-relaxed">
            From expansive lands to luxury urban residences, find the perfect investment that fits your vision.
          </p>
        </div>
      </section>

      <div className="container-custom px-6 pb-20">
        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center">
          <div className="relative flex-grow w-full lg:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by title, location..."
              className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 focus:outline-none focus:border-sage transition-all text-sm uppercase tracking-wider h-16"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 px-6 h-16 bg-white border border-gray-100 uppercase tracking-widest text-[10px] font-bold"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>

          <div className={`flex flex-col lg:flex-row gap-4 w-full lg:w-auto ${showFilters ? 'flex' : 'hidden lg:flex'}`}>
            <select
              title="Property Type"
              className="h-16 px-6 bg-white border border-gray-100 focus:outline-none focus:border-sage text-[10px] uppercase tracking-widest font-bold"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">ANY TYPE</option>
              <option value="land">LAND</option>
              <option value="house">HOUSE</option>
              <option value="rental">RENTAL</option>
              <option value="commercial">COMMERCIAL</option>
              <option value="development">DEVELOPMENT</option>
            </select>

            <select
              title="Location"
              className="h-16 px-6 bg-white border border-gray-100 focus:outline-none focus:border-sage text-[10px] uppercase tracking-widest font-bold"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="all">ANY LOCATION</option>
              {locations.filter(l => l !== 'all').map(loc => (
                <option key={loc} value={loc}>{loc.toUpperCase()}</option>
              ))}
            </select>
            
            <label className="flex items-center gap-2 cursor-pointer h-16 px-6 bg-white border border-gray-100 uppercase tracking-widest text-[10px] font-bold">
              <input
                type="checkbox"
                checked={hasVideoFilter}
                onChange={(e) => setHasVideoFilter(e.target.checked)}
                className="w-4 h-4 text-sage border-gray-300 rounded focus:ring-sage"
              />
              WITH VIDEO
            </label>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8 flex justify-between items-center text-xs text-gray-400 uppercase tracking-widest font-bold">
          <span>Found {filteredProperties.length} Properties</span>
          {(searchTerm || typeFilter !== 'all' || locationFilter !== 'all' || hasVideoFilter) && (
            <button 
              onClick={() => {
                setSearchTerm('');
                setTypeFilter('all');
                setLocationFilter('all');
                setHasVideoFilter(false);
              }}
              className="flex items-center gap-1 text-sage hover:text-charcoal transition-colors"
            >
              <X size={14} /> Clear Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProperties.length > 0 ? (
            filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-400 font-serif text-2xl italic">
              No properties found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
