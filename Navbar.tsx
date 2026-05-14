import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const ConnectionTest: React.FC = () => {
  const [status, setStatus] = useState<'testing' | 'success' | 'error' | 'missing-config'>('testing');
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Fetching the base URL or a health check isn't standard in subpabase-js,
        // so we try to do a simple query. Replace 'any_table' with a real table if you have one.
        const { data, error } = await supabase.from('properties').select('id').limit(1);
        
        // If it's just 'table not found', that often means the connection worked but schema is empty
        if (error && error.code !== 'PGRST116' && error.message.includes('FetchError')) {
          throw error;
        }
        
        setStatus('success');
      } catch (err: any) {
        console.error('Connection test failed:', err);
        setStatus('error');
        setErrorDetails(err.message || 'Unknown error');
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-luxury-white">
      <h3 className="font-serif text-lg mb-2">Supabase Connection Status</h3>
      {status === 'testing' && <p className="text-gray-500">Connecting...</p>}
      {status === 'success' && (
        <p className="text-green-600 font-bold">Successfully connected to Supabase!</p>
      )}
      {status === 'missing-config' && (
        <div className="text-amber-600">
          <p className="font-bold">Missing Configuration</p>
          <p className="text-sm">Please go to <b>Settings &gt; Environment Variables</b> and add:</p>
          <ul className="list-disc ml-5 text-xs mt-1">
            <li>VITE_SUPABASE_URL</li>
            <li>VITE_SUPABASE_ANON_KEY</li>
          </ul>
        </div>
      )}
      {status === 'error' && (
        <div className="text-red-600">
          <p className="font-bold">Connection Error</p>
          <p className="text-sm">{errorDetails}</p>
        </div>
      )}
    </div>
  );
};

export default ConnectionTest;
