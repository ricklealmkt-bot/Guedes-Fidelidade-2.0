
import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { getCarCareTip } from '../geminiService';

const TipsSection: React.FC = () => {
  const [tip, setTip] = useState<string>('Carregando dicas valiosas...');
  const [loading, setLoading] = useState(false);

  const fetchTip = async () => {
    setLoading(true);
    const newTip = await getCarCareTip();
    setTip(newTip);
    setLoading(false);
  };

  useEffect(() => {
    fetchTip();
  }, []);

  return (
    <div className="bg-black border border-gray-800 p-6 rounded-3xl space-y-4 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Sparkles size={64} className="text-[#fecb0a]" />
      </div>
      
      <div className="flex items-center justify-between">
        <h4 className="text-[10px] font-black text-[#fecb0a] uppercase tracking-[0.2em] flex items-center gap-2">
          <Sparkles size={14} /> Guedes Dicas
        </h4>
        <button 
          onClick={fetchTip}
          disabled={loading}
          className="text-gray-500 hover:text-white disabled:opacity-50 transition-colors"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="min-h-[80px]">
        {loading ? (
          <div className="space-y-2">
            <div className="h-4 bg-gray-900 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-900 rounded w-4/5 animate-pulse"></div>
          </div>
        ) : (
          <p className="text-sm text-gray-300 leading-relaxed font-medium italic">
            "{tip}"
          </p>
        )}
      </div>

      <p className="text-[8px] text-gray-600 uppercase font-bold tracking-widest pt-2">
        Powered by Guedes AI
      </p>
    </div>
  );
};

export default TipsSection;
