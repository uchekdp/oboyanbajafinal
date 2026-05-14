import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Home as HomeIcon, 
  MessageSquare, 
  Star, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit, 
  Check,
  ChevronRight,
  ShieldCheck,
  Image as ImageIcon,
  Mail,
  Phone,
  X
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { cn, formatPrice } from '@/lib/utils';
import { Property, Testimonial, ContactMessage } from '@/types';
import ConnectionTest from '@/components/ConnectionTest';

import { supabase } from '@/lib/supabaseClient';

const ImageUploadInput = ({ value, onChange, label, className = "" }: { value: string, onChange: (val: string) => void, label?: string, className?: string }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Please upload an image under 5MB.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(null);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      if (publicUrlData && publicUrlData.publicUrl) {
         onChange(publicUrlData.publicUrl);
      }
    } catch (error: any) {
      console.error('Error uploading image to Supabase:', error);
      setErrorMsg(
        'Supabase Storage Error: ' + (error.message || 'Unknown error')
      );
      // Fallback to local Data URL
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    } finally {
      setLoading(false);
      e.target.value = '';
    }
  };

  return (
    <div className={cn("space-y-2 w-full", className)}>
       {label && <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">{label}</label>}
       <div className="flex flex-col items-start gap-2">
         <label className={cn("cursor-pointer w-full flex justify-center items-center py-4 px-6 border-2 border-dashed border-gray-300 text-xs uppercase tracking-widest font-bold hover:border-sage hover:bg-sage/5 transition-all rounded", loading && "opacity-50 cursor-not-allowed")}>
            {loading ? 'Uploading...' : 'Click to Upload Image'}
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={loading} />
         </label>
       </div>
       {errorMsg && (
         <div className="p-4 bg-red-50 border border-red-200 text-xs text-red-800 rounded">
           <p className="font-bold mb-2">{errorMsg}</p>
           <p className="mb-2">We fell back to saving the image locally in the app, but this may cause issues. To fix the cloud storage error, run this SQL in your Supabase SQL Editor:</p>
           <pre className="p-2 bg-red-100/50 rounded text-red-900 border border-red-200 mt-2 whitespace-pre-wrap select-all font-mono text-[10px]">
             {`insert into storage.buckets (id, name, public) values ('images', 'images', true) on conflict (id) do nothing;\ndrop policy if exists "Public Access" on storage.objects;\ncreate policy "Public Access" on storage.objects for all using ( bucket_id = 'images' ) with check ( bucket_id = 'images' );`}
           </pre>
         </div>
       )}
       {value && (
         <div className="mt-2 text-xs relative group inline-block w-full">
           <img src={value} alt="Preview" className="h-32 w-full object-cover rounded shadow-sm border border-gray-200" onError={(e) => (e.currentTarget.style.display = 'none')} onLoad={(e) => (e.currentTarget.style.display = 'block')} />
         </div>
       )}
    </div>
  );
};

function ConfirmModal({ isOpen, onClose, onConfirm, title, message }: { isOpen: boolean, onClose: () => void, onConfirm: () => void, title: string, message: string }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-charcoal/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 max-w-sm w-full shadow-2xl rounded-sm">
        <h3 className="text-xl font-serif text-charcoal mb-4">{title}</h3>
        <p className="text-gray-600 mb-8">{message}</p>
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 text-sm font-bold tracking-widest text-gray-500 hover:text-charcoal uppercase">Cancel</button>
          <button onClick={() => { onConfirm(); onClose(); }} className="px-4 py-2 text-sm font-bold tracking-widest text-white bg-red-600 hover:bg-red-700 transition-colors uppercase">Delete</button>
        </div>
      </div>
    </div>
  );
}

function DatabaseDiagnostics() {
  const sqlScript = `
-- 1. Create the bucket for image uploads if it doesn't exist
insert into storage.buckets (id, name, public) 
values ('images', 'images', true) on conflict (id) do nothing;

-- 2. Drop existing policy (if any) and recreate it to allow public uploads
drop policy if exists "Public Access" on storage.objects;
create policy "Public Access" on storage.objects 
for all using ( bucket_id = 'images' ) with check ( bucket_id = 'images' );

-- 3. Add any newly developed columns to the site_content table
ALTER TABLE site_content ADD COLUMN IF NOT EXISTS contact_email1 text;
ALTER TABLE site_content ADD COLUMN IF NOT EXISTS contact_email2 text;
ALTER TABLE site_content ADD COLUMN IF NOT EXISTS contact_phone text;
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlScript);
    alert("SQL copied to clipboard! Please open your Supabase dashboard and run it in the SQL Editor.");
  };

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl mb-2 text-red-600">Database Diagnostics & Setup</h1>
        <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Fix Image Upload & Content Errors</p>
      </header>

      <section className="bg-white p-10 border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-start gap-4">
          <ShieldCheck className="text-red-600 shrink-0" size={32} />
          <div>
            <h2 className="text-xl font-serif text-charcoal mb-4">Required Database Migration</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              If your Image Uploads are failing, or your text corrections are not saving, your connected database schema is missing required tables, storage buckets, or columns.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              To fix these errors permanently, please run the following SQL script inside your Supabase project's <strong>SQL Editor</strong>.
            </p>

            <div className="relative group">
              <pre className="bg-charcoal text-white p-6 rounded text-xs font-mono overflow-auto whitespace-pre-wrap">
                {sqlScript}
              </pre>
              <button 
                onClick={copyToClipboard}
                className="absolute top-4 right-4 bg-sage hover:bg-sage/80 text-white px-4 py-2 text-[10px] uppercase font-bold tracking-widest transition-colors"
              >
                Copy SQL
              </button>
            </div>
            
            <div className="mt-8 bg-blue-50 border border-blue-100 p-6">
              <h4 className="text-sm font-bold text-blue-900 mb-2 uppercase tracking-widest">How to run this script:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                <li>Log in to your <strong>Supabase Dashboard</strong>.</li>
                <li>Select the project connected to this website.</li>
                <li>Click <strong>SQL Editor</strong> on the left-hand menu.</li>
                <li>Click <strong>New Query</strong>.</li>
                <li>Paste the script above and hit <strong>Run</strong>.</li>
                <li>Return here and refresh the page!</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { properties, testimonials, messages, loading } = useStore();
  
  useEffect(() => {
    const isAuth = localStorage.getItem('oboyanbaja_admin_auth');
    if (!isAuth) navigate('/admin/login');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('oboyanbaja_admin_auth');
    navigate('/');
  };

  const navItems = [
    { name: 'Overview', path: '', icon: LayoutDashboard },
    { name: 'Properties', path: 'properties', icon: HomeIcon },
    { name: 'Testimonials', path: 'testimonials', icon: Star },
    { name: 'Messages', path: 'messages', icon: MessageSquare },
    { name: 'Site Content', path: 'content', icon: Settings },
    { name: 'Database Setup', path: 'database', icon: ShieldCheck },
  ];

  if (loading) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-charcoal text-white flex flex-col fixed inset-y-0 z-50">
        <div className="p-8 border-b border-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-sage flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="font-serif text-lg leading-tight uppercase">Admin</p>
              <p className="text-[10px] text-gray-500 tracking-widest font-bold uppercase">Oboyanbaja Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-grow p-6 space-y-2">
          {navItems.map((item) => {
            const absolutePath = `/admin/dashboard${item.path ? '/' + item.path : ''}`;
            const isActive = location.pathname === absolutePath;
            return (
              <Link
                key={item.path}
                to={absolutePath}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-none transition-all text-xs font-bold uppercase tracking-widest group",
                  isActive ? "bg-sage text-white" : "text-gray-400 hover:text-white hover:bg-gray-800"
                )}
              >
                <item.icon size={18} className={cn("transition-colors", isActive ? "text-white" : "text-gray-500 group-hover:text-sage")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 w-full text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-72 p-12">
        <Routes>
          <Route index element={<DashboardOverview />} />
          <Route path="properties" element={<PropertyManager />} />
          <Route path="testimonials" element={<TestimonialManager />} />
          <Route path="messages" element={<MessageManager />} />
          <Route path="content" element={<ContentEditor />} />
          <Route path="database" element={<DatabaseDiagnostics />} />
        </Routes>
      </main>
    </div>
  );
}

// Sub-components for Admin Views
function DashboardOverview() {
  const { properties, testimonials, messages } = useStore();
  
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl mb-2">Systems Overview</h1>
        <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Real-time status of your assets</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Total Properties', val: properties.length, icon: HomeIcon, color: 'text-blue-500' },
          { label: 'Active Testimonials', val: testimonials.length, icon: Star, color: 'text-yellow-500' },
          { label: 'New Messages', val: messages.filter(m => m.status === 'new').length, icon: MessageSquare, color: 'text-sage' },
          { label: 'Total Value', val: formatPrice(properties.reduce((acc, p) => acc + p.price, 0)), icon: LayoutDashboard, color: 'text-charcoal' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 border border-gray-100 shadow-sm">
             <stat.icon className={cn("mb-4", stat.color)} size={32} strokeWidth={1} />
             <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">{stat.label}</p>
             <h3 className="text-3xl font-serif">{stat.val}</h3>
          </div>
        ))}
      </div>

      <ConnectionTest />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white p-10 border border-gray-100 shadow-sm">
          <h4 className="text-xl mb-8 font-serif">Recent Listings</h4>
          <div className="space-y-4">
             {properties.slice(0, 4).map(p => (
               <div key={p.id} className="flex items-center justify-between p-4 bg-luxury-white text-xs">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 overflow-hidden">
                       <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                       <p className="font-bold uppercase tracking-wider">{p.title}</p>
                       <p className="text-gray-400">{p.location}</p>
                    </div>
                 </div>
                 <span className="font-bold text-charcoal">{formatPrice(p.price)}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-white p-10 border border-gray-100 shadow-sm">
          <h4 className="text-xl mb-8 font-serif">Latest Inquiries</h4>
          <div className="space-y-4">
             {messages.slice(0, 4).map(m => (
               <div key={m.id} className="flex items-center justify-between p-4 bg-luxury-white text-xs">
                 <div>
                    <p className="font-bold uppercase tracking-wider">{m.name}</p>
                    <p className="text-gray-400">{m.inquiryType}</p>
                 </div>
                 <div className="text-right">
                    <p className="font-bold text-sage">{new Date(m.createdAt).toLocaleDateString()}</p>
                    <Link to="messages" className="text-charcoal hover:underline">View Details</Link>
                 </div>
               </div>
             ))}
             {messages.length === 0 && <p className="text-gray-400 text-center py-10">No messages yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function PropertyManager() {
  const { properties, updateProperties, addProperty, syncPropertyUpdate, deleteProperty } = useStore();
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    description: '',
    price: 0,
    location: '',
    type: 'land',
    status: 'available',
    features: [],
    images: [''],
    videoUrl: '',
    featured: false
  });
  
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setFormData(property);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingProperty(null);
    setFormData({
      title: '',
      description: '',
      price: 0,
      location: '',
      type: 'land',
      status: 'available',
      features: [],
      images: [''],
      videoUrl: '',
      featured: false
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteProperty(deleteId);
      setDeleteId(null);
    }
  };

  const handleToggleSold = (id: string) => {
    const prop = properties.find(p => p.id === id);
    if (!prop) return;
    const updatedProp = { ...prop, status: prop.status === 'sold' ? 'available' as const : 'sold' as const };
    updateProperties(properties.map(p => p.id === id ? updatedProp : p));
    syncPropertyUpdate(updatedProp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProperty) {
      const updatedProp = { ...editingProperty, ...formData } as Property;
      updateProperties(properties.map(p => p.id === editingProperty.id ? updatedProp : p));
      syncPropertyUpdate(updatedProp);
    } else {
      const newProperty: Property = {
        ...formData,
        id: Date.now().toString(),
        createdAt: Date.now()
      } as Property;
      addProperty(newProperty);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-12">
       <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl mb-2">Inventory Control</h1>
          <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Manage your premium listings</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="btn-primary flex items-center gap-2"
        >
           <Plus size={16} /> New Asset
        </button>
      </header>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 sm:p-12">
           <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="bg-white w-full max-w-4xl max-h-full overflow-y-auto relative z-10 p-10 shadow-2xl rounded-none"
           >
              <header className="flex justify-between items-center mb-10 border-b border-gray-100 pb-6">
                 <h2 className="text-2xl font-serif">{editingProperty ? 'Edit Asset' : 'Register New Asset'}</h2>
                 <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-charcoal"><X size={24} /></button>
              </header>

              <form onSubmit={handleSubmit} className="space-y-8">
                 <section className="bg-gray-50/50 p-6 border border-gray-100">
                    <h3 className="text-sm font-serif mb-6 pb-2 border-b border-gray-200 text-charcoal">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Title</label>
                          <input 
                            required
                            className="admin-input" 
                            value={formData.title} 
                            onChange={e => setFormData({...formData, title: e.target.value})} 
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Location</label>
                          <input 
                            required
                            className="admin-input" 
                            value={formData.location} 
                            onChange={e => setFormData({...formData, location: e.target.value})} 
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Price (₦)</label>
                          <input 
                            required
                            type="number"
                            className="admin-input" 
                            value={formData.price} 
                            onChange={e => setFormData({...formData, price: parseInt(e.target.value) || 0})} 
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Type</label>
                          <select 
                            className="admin-input"
                            value={formData.type}
                            onChange={e => setFormData({...formData, type: e.target.value as any})}
                          >
                             <option value="land">Land</option>
                             <option value="house">House</option>
                             <option value="commercial">Commercial</option>
                             <option value="rental">Rental</option>
                             <option value="development">Development</option>
                          </select>
                       </div>
                    </div>
                    <div className="mt-6 space-y-2">
                       <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Description</label>
                       <textarea 
                         rows={4}
                         className="admin-input resize-none" 
                         value={formData.description} 
                         onChange={e => setFormData({...formData, description: e.target.value})} 
                       />
                    </div>
                 </section>

                 <section className="bg-gray-50/50 p-6 border border-gray-100">
                    <h3 className="text-sm font-serif mb-6 pb-2 border-b border-gray-200 text-charcoal">Configuration & Media</h3>
                    <div className="space-y-6">
                       <div className="space-y-4">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Property Images</label>
                          {(formData.images?.length ? formData.images : ['']).map((img, idx) => (
                            <div key={idx} className="flex gap-2 items-start">
                              <ImageUploadInput 
                                label={idx === 0 ? "Image URL (Primary)" : `Additional Image ${idx}`}
                                value={img}
                                onChange={val => {
                                  const newImages = [...(formData.images || [])];
                                  newImages[idx] = val;
                                  setFormData({...formData, images: newImages});
                                }} 
                              />
                              {idx > 0 && (
                                <button 
                                  type="button" 
                                  onClick={() => {
                                    const newImages = [...(formData.images || [])];
                                    newImages.splice(idx, 1);
                                    setFormData({...formData, images: newImages});
                                  }}
                                  className="mt-6 p-2 text-red-500 hover:bg-red-50 rounded shrink-0"
                                  title="Remove Image"
                                >
                                  <X size={16} />
                                </button>
                              )}
                            </div>
                          ))}
                          <button 
                            type="button" 
                            className="text-xs text-sage font-bold uppercase tracking-widest flex items-center gap-1 hover:text-charcoal transition-colors"
                            onClick={() => setFormData({...formData, images: [...(formData.images || ['']), '']})}
                          >
                            <Plus size={14} /> Add Another Image
                          </button>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Video Walkthrough (YouTube URL)</label>
                          <input 
                            className="admin-input" 
                            value={formData.videoUrl} 
                            onChange={e => setFormData({...formData, videoUrl: e.target.value})} 
                            placeholder="https://youtube.com/watch?v=..."
                          />
                       </div>
                       <div className="flex items-center gap-4 py-2 border-t border-gray-200 mt-4 pt-4">
                          <input 
                            type="checkbox" 
                            id="featured"
                            checked={formData.featured}
                            onChange={e => setFormData({...formData, featured: e.target.checked})}
                            className="w-4 h-4 accent-sage" 
                          />
                          <label htmlFor="featured" className="text-xs uppercase tracking-widest font-bold text-charcoal cursor-pointer">Feature on Landing Page</label>
                       </div>
                    </div>
                 </section>
                 
                 <button type="submit" className="w-full btn-primary h-14 mt-6">
                    {editingProperty ? 'Update Listing' : 'Publish Asset'}
                 </button>
              </form>
           </motion.div>
        </div>
      )}

      <div className="bg-white shadow-sm border border-gray-100 overflow-hidden">
         <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100">
               <tr className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                  <th className="p-6">Asset</th>
                  <th className="p-6">Location</th>
                  <th className="p-6">Value</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
               {properties.map(p => (
                 <tr key={p.id} className="hover:bg-luxury-white transition-colors">
                    <td className="p-6">
                       <div className="flex items-center gap-4">
                          <img src={p.images[0]} alt="" className="w-16 h-12 object-cover border border-gray-100" />
                          <div>
                             <p className="text-sm font-bold uppercase tracking-wider">{p.title}</p>
                             <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{p.type}</p>
                          </div>
                       </div>
                    </td>
                    <td className="p-6 text-sm text-gray-500">{p.location}</td>
                    <td className="p-6 text-sm font-bold">{formatPrice(p.price)}</td>
                    <td className="p-6">
                       <button 
                         onClick={() => handleToggleSold(p.id)}
                         className={cn(
                           "text-[10px] uppercase tracking-widest font-bold px-3 py-1",
                           p.status === 'available' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700 font-bold"
                         )}
                       >
                          {p.status}
                       </button>
                    </td>
                    <td className="p-6 text-right">
                       <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(p)}
                            className="p-2 text-gray-400 hover:text-charcoal transition-colors focus:outline-none"
                          >
                             <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(p.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
                          >
                             <Trash2 size={16} />
                          </button>
                       </div>
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
      </div>
      <ConfirmModal 
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Delete Asset"
        message="Are you sure you want to delete this asset completely? This action cannot be undone."
      />
    </div>
  );
}

function MessageManager() {
  const { messages, syncMessageStatus, deleteMessage } = useStore();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleMarkRead = (id: string) => {
    syncMessageStatus(id, 'read');
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteMessage(deleteId);
      setDeleteId(null);
    }
  };
  
  return (
    <div className="space-y-12">
       <header>
        <h1 className="text-4xl mb-2">Inquiries</h1>
        <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Manage client communications</p>
      </header>

      <div className="space-y-6">
         {messages.map(m => (
           <div key={m.id} className="bg-white p-8 border border-gray-100 shadow-sm group">
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <h4 className="text-xl font-serif mb-1 capitalize">{m.name}</h4>
                    <p className="text-[10px] text-sage uppercase tracking-[0.2em] font-bold">Interest: {m.inquiryType}</p>
                 </div>
                 <div className="text-right">
                    <p className="text-xs text-gray-400 mb-1">{new Date(m.createdAt).toLocaleString()}</p>
                    <span className={cn(
                      "text-[10px] uppercase tracking-widest font-bold px-3 py-1",
                      m.status === 'new' ? "bg-red-500 text-white" : "bg-gray-100 text-gray-500"
                    )}>
                       {m.status}
                    </span>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 pb-8 border-b border-gray-50">
                 <div className="flex items-center gap-3">
                    <Mail size={16} className="text-ash" />
                    <span className="text-sm font-light">{m.email}</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <Phone size={16} className="text-ash" />
                    <span className="text-sm font-light">{m.phone}</span>
                 </div>
              </div>

              <div className="p-6 bg-luxury-white text-sm font-light leading-relaxed italic text-gray-600 border-l-2 border-sage">
                 "{m.message}"
              </div>
              
              <div className="mt-8 flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 {m.status === 'new' && (
                   <button 
                     onClick={() => handleMarkRead(m.id)}
                     className="px-6 py-2 border border-gray-100 text-[10px] uppercase tracking-widest font-bold hover:bg-charcoal hover:text-white transition-all"
                   >
                     Mark as Read
                   </button>
                 )}
                 <a 
                   href={`mailto:${m.email}`}
                   className="px-6 py-2 bg-charcoal text-white text-[10px] uppercase tracking-widest font-bold hover:bg-sage transition-all"
                 >
                   Reply via Email
                 </a>
                 <button 
                   onClick={() => setDeleteId(m.id)}
                   className="px-6 py-2 border border-red-500 text-red-500 text-[10px] uppercase tracking-widest font-bold hover:bg-red-500 hover:text-white transition-all"
                 >
                   Delete Message
                 </button>
              </div>
           </div>
         ))}
         {messages.length === 0 && (
           <div className="py-32 text-center border-2 border-dashed border-gray-100 italic text-gray-400 font-serif text-2xl">
              No inquiries records found.
           </div>
         )}
      </div>

      <ConfirmModal 
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Delete Message"
        message="Are you sure you want to delete this message permanently? This action cannot be undone."
      />
    </div>
  );
}

function TestimonialManager() {
  const { testimonials, addTestimonial, deleteTestimonial } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: '',
    role: '',
    content: '',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150'
  });

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteTestimonial(deleteId);
      setDeleteId(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTestimonial: Testimonial = {
      ...formData,
      id: crypto.randomUUID(),
    } as Testimonial;
    addTestimonial(newTestimonial);
    setShowModal(false);
    setFormData({ name: '', role: '', content: '', rating: 5, avatar: 'https://i.pravatar.cc/150' });
  };
  
  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl mb-2">Social Proof</h1>
          <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Manage client feedback</p>
        </div>
        <button 
           onClick={() => setShowModal(true)}
           className="btn-primary flex items-center gap-2"
        >
           <Plus size={16} /> New Review
        </button>
      </header>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-charcoal/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-10 w-full max-w-xl shadow-2xl relative"
          >
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-charcoal"><X size={24} /></button>
            <h2 className="text-2xl font-serif mb-8 text-charcoal">Add Testimonial</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
               <section className="bg-gray-50/50 p-6 border border-gray-100">
                  <h3 className="text-sm font-serif mb-6 pb-2 border-b border-gray-200 text-charcoal">Client Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Client Name</label>
                        <input 
                          className="admin-input" 
                          required
                          value={formData.name || ''}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Client Role</label>
                        <input 
                          className="admin-input" 
                          required
                          value={formData.role || ''}
                          onChange={e => setFormData({...formData, role: e.target.value})}
                        />
                     </div>
                  </div>
                  <div className="mt-6">
                     <ImageUploadInput 
                       label="Client Avatar (URL or Upload)"
                       value={formData.avatar || ''}
                       onChange={val => setFormData({...formData, avatar: val})}
                     />
                  </div>
               </section>

               <section className="bg-gray-50/50 p-6 border border-gray-100">
                  <h3 className="text-sm font-serif mb-6 pb-2 border-b border-gray-200 text-charcoal">Review Content</h3>
                  <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Comment</label>
                     <textarea 
                       className="admin-input" 
                       rows={4}
                       required
                       value={formData.content || ''}
                       onChange={e => setFormData({...formData, content: e.target.value})}
                     />
                  </div>
               </section>

              <div className="flex justify-end gap-4 mt-8">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2 uppercase text-[10px] tracking-widest font-bold">Cancel</button>
                <button type="submit" className="btn-primary">Publish Review</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {testimonials.map(t => (
           <div key={t.id} className="bg-white p-10 border border-gray-100 shadow-sm relative group">
              <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button className="p-2 text-gray-400 hover:text-red-500 transition-colors" onClick={() => handleDelete(t.id)}><Trash2 size={16} /></button>
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-sm font-light text-gray-500 mb-8 italic leading-relaxed">"{t.content}"</p>
              
              <div className="flex items-center gap-4">
                 <img src={t.avatar} alt="" className="w-12 h-12 rounded-full border border-gray-100 grayscale" />
                 <div>
                    <h5 className="text-sm font-bold uppercase tracking-wider">{t.name}</h5>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">{t.role}</p>
                 </div>
              </div>
           </div>
         ))}
      </div>

      <ConfirmModal 
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Remove Review"
        message="Are you sure you want to remove this client review? This cannot be undone."
      />
    </div>
  );
}

function ContentEditor() {
  const { content, updateContent } = useStore();
  const [formData, setFormData] = useState(content);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    setFormData(content);
  }, [content]);

  const handleSave = () => {
    setSaveStatus('saving');
    updateContent(formData);
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 500);
  };

  return (
    <div className="space-y-12">
       <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl mb-2">Site Content</h1>
          <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Global brand and messaging management</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
          className={cn(
            "btn-primary min-w-[200px]",
            saveStatus === 'saved' && "bg-green-600 hover:bg-green-600"
          )}
        >
          {saveStatus === 'idle' && 'Publish All Changes'}
          {saveStatus === 'saving' && 'Syncing...'}
          {saveStatus === 'saved' && '✓ Changes Published'}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
         {/* Brand Identity */}
         <section className="bg-white p-10 border border-gray-100 shadow-sm space-y-8">
            <h4 className="text-xl font-serif flex items-center gap-2">
               <ShieldCheck size={20} className="text-sage" /> Brand Identity
            </h4>
            <div className="space-y-6">
               <ImageUploadInput 
                 label="Company Logo (URL or Upload)"
                 className="mb-4"
                 value={formData.logo || ''}
                 onChange={val => setFormData({...formData, logo: val})}
               />
               {formData.logo && (
                 <div className="p-4 border border-dashed border-gray-100 flex items-center justify-center">
                    <img src={formData.logo} alt="Logo Preview" className="h-12 object-contain" />
                 </div>
               )}
            </div>
         </section>

         {/* Contact Information & Socials */}
         <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
           <section className="bg-white p-10 border border-gray-100 shadow-sm space-y-8">
               <h4 className="text-xl font-serif flex items-center gap-2">
                  <Phone size={20} className="text-sage" /> Contact Information
               </h4>
               <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Primary Email</label>
                    <input 
                      type="text"
                      className="w-full border-b border-gray-100 py-2 focus:outline-none focus:border-sage text-sm"
                      value={formData.contactInfo?.email1 || ''}
                      onChange={e => setFormData({...formData, contactInfo: {...formData.contactInfo, email1: e.target.value}})}
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Secondary Email</label>
                    <input 
                      type="text"
                      className="w-full border-b border-gray-100 py-2 focus:outline-none focus:border-sage text-sm"
                      value={formData.contactInfo?.email2 || ''}
                      onChange={e => setFormData({...formData, contactInfo: {...formData.contactInfo, email2: e.target.value}})}
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Phone Number</label>
                    <input 
                      type="text"
                      className="w-full border-b border-gray-100 py-2 focus:outline-none focus:border-sage text-sm"
                      value={formData.contactInfo?.phone || ''}
                      onChange={e => setFormData({...formData, contactInfo: {...formData.contactInfo, phone: e.target.value}})}
                    />
                 </div>
               </div>
           </section>

           <section className="bg-white p-10 border border-gray-100 shadow-sm space-y-8">
              <h4 className="text-xl font-serif flex items-center gap-2">
                 <MessageSquare size={20} className="text-sage" /> Social Integrations
              </h4>
              <div className="grid grid-cols-1 gap-6">
                 {[
                   { key: 'whatsapp', label: 'WhatsApp Messenger (wa.me link)' },
                   { key: 'facebook', label: 'Facebook Profile URL' },
                   { key: 'instagram', label: 'Instagram Handle URL' },
                   { key: 'youtube', label: 'YouTube Channel URL' },
                   { key: 'tiktok', label: 'TikTok Profile URL' }
                 ].map((social) => (
                   <div key={social.key} className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">{social.label}</label>
                      <input 
                        type="text"
                      className="w-full border-b border-gray-100 py-2 focus:outline-none focus:border-sage text-sm text-charcoal bg-transparent"
                      value={(formData.socials as any)?.[social.key] || ''}
                      onChange={(e) => setFormData({
                        ...formData, 
                        socials: { ...(formData.socials || {}), [social.key]: e.target.value } as any
                      })}
                    />
                 </div>
               ))}
            </div>
         </section>
        </div>

         {/* Hero Section Editor */}
         <section className="bg-white p-10 border border-gray-100 shadow-sm space-y-8">
            <h4 className="text-xl font-serif flex items-center gap-2">
               <ImageIcon size={20} className="text-sage" /> Hero Section
            </h4>
            <div className="space-y-6">
               <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Headline</label>
                  <textarea 
                    className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-sage transition-colors text-lg italic leading-relaxed"
                    value={formData.hero.headline}
                    onChange={(e) => setFormData({...formData, hero: { ...formData.hero, headline: e.target.value }})}
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Subheadline</label>
                  <textarea 
                    className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-sage transition-colors text-sm font-light text-gray-500"
                    value={formData.hero.subheadline}
                    onChange={(e) => setFormData({...formData, hero: { ...formData.hero, subheadline: e.target.value }})}
                  />
               </div>
               <ImageUploadInput 
                 label="Hero Image (URL or Upload)"
                 value={formData.hero.imageUrl || ''}
                 onChange={val => setFormData({...formData, hero: { ...formData.hero, imageUrl: val }})}
               />
               <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Background Video (YouTube URL)</label>
                  <input 
                    className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-sage transition-colors text-sm font-light text-gray-500"
                    placeholder="https://youtube.com/watch?v=..."
                    value={formData.hero.videoUrl || ''}
                    onChange={(e) => setFormData({...formData, hero: { ...formData.hero, videoUrl: e.target.value }})}
                  />
               </div>
            </div>
         </section>

          {/* About Sections */}
         <section className="bg-white p-10 border border-gray-100 shadow-sm space-y-8 col-span-full">
            <h4 className="text-xl font-serif flex items-center gap-2">
               <Settings size={20} className="text-sage" /> Strategic Messaging
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Our Story (Full)</label>
                  <textarea 
                    rows={6}
                    className="w-full border border-gray-50 p-4 focus:outline-none focus:border-sage transition-colors text-sm font-light text-gray-500 leading-relaxed"
                    value={formData.about.story}
                    onChange={(e) => setFormData({...formData, about: { ...formData.about, story: e.target.value }})}
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Vision Statement</label>
                  <textarea 
                    rows={6}
                    className="w-full border border-gray-50 p-4 focus:outline-none focus:border-sage transition-colors text-sm font-light text-gray-500 leading-relaxed"
                    value={formData.about.vision}
                    onChange={(e) => setFormData({...formData, about: { ...formData.about, vision: e.target.value }})}
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Mission Statement</label>
                  <textarea 
                    rows={4}
                    className="w-full border border-gray-50 p-4 focus:outline-none focus:border-sage transition-colors text-sm font-light text-gray-500 leading-relaxed"
                    value={formData.about.mission}
                    onChange={(e) => setFormData({...formData, about: { ...formData.about, mission: e.target.value }})}
                  />
               </div>
            </div>
         </section>

         {/* Founder Profiling */}
         <section className="bg-white p-10 border border-gray-100 shadow-sm space-y-8 col-span-full">
            <h4 className="text-xl font-serif flex items-center gap-2">
               <Star size={20} className="text-sage" /> Founder Profiling
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               <div className="md:col-span-1 space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Founder Name</label>
                    <input 
                      type="text"
                      className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-sage transition-colors font-bold"
                      value={formData.about.founderName}
                      onChange={(e) => setFormData({...formData, about: { ...formData.about, founderName: e.target.value }})}
                    />
                  </div>
                  <div className="space-y-2">
                    <ImageUploadInput 
                      label="Founder Image (URL or Upload)"
                      className="mb-4"
                      value={formData.about.founderImage || ''}
                      onChange={val => setFormData({...formData, about: { ...formData.about, founderImage: val }})}
                    />
                    {formData.about.founderImage && (
                      <div className="aspect-[3/4] overflow-hidden border border-gray-100">
                         <img src={formData.about.founderImage} alt="Founder Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
               </div>
               <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Founder's Story / Bio</label>
                  <textarea 
                    rows={15}
                    className="w-full border border-gray-50 p-6 focus:outline-none focus:border-sage transition-colors text-sm font-light text-gray-500 leading-relaxed"
                    value={formData.about.founderStory}
                    onChange={(e) => setFormData({...formData, about: { ...formData.about, founderStory: e.target.value }})}
                  />
               </div>
            </div>
         </section>
      </div>
    </div>
  );
}
