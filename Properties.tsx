import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'OBOYANBAJA2026') {
      localStorage.setItem('oboyanbaja_admin_auth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid Access Credentials');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-white p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white p-12 shadow-2xl border border-gray-100"
      >
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-charcoal text-white rounded-none flex items-center justify-center mx-auto mb-8 shadow-xl">
            <Shield size={32} />
          </div>
          <h1 className="text-4xl mb-4">Command Center</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Secure Admin Authentication</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Access Password</label>
            <div className="relative">
              <input 
                required
                type={showPassword ? 'text' : 'password'} 
                className="w-full border-b border-gray-200 py-4 pr-12 focus:outline-none focus:border-sage transition-colors bg-transparent text-sm tracking-widest font-bold"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-charcoal p-2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-2">{error}</p>}
          </div>

          <button 
            type="submit" 
            className="w-full btn-primary h-16 flex items-center justify-center gap-4 group"
          >
            Authenticate <Lock size={16} className="group-hover:rotate-12 transition-transform" />
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
           <button 
             onClick={() => navigate('/')}
             className="text-[10px] uppercase tracking-widest font-bold text-ash hover:text-charcoal transition-colors"
           >
             ← Return to Website
           </button>
        </div>
      </motion.div>
    </div>
  );
}
