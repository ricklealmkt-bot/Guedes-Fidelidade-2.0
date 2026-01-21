
import React, { useState } from 'react';
import { Search, Crown } from 'lucide-react';

interface HomeProps {
  onLogin: (data: string) => void;
}

const Home: React.FC<HomeProps> = ({ onLogin }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onLogin(input);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-12 py-8 animate-fadeIn">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
          GUEDES FIDELIDADE
        </h2>
        <p className="text-gray-400 font-medium uppercase tracking-[0.2em] text-sm">
          Acompanhe seu brilho exclusivo
        </p>
      </div>

      <div className="bg-[#111] p-8 rounded-3xl border border-gray-800 shadow-2xl space-y-6">
        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
          Sua Placa ou Whatsapp
        </label>
        <form onSubmit={handleSubmit} className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ex: QPS-8964 ou 319..."
            className="w-full bg-black border border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-xl font-bold tracking-wider focus:border-[#fecb0a] focus:ring-1 focus:ring-[#fecb0a] outline-none transition-all placeholder:text-gray-800"
          />
          <button 
            type="submit"
            className="w-full mt-6 bg-[#fecb0a] text-black py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-[#eec00a] transition-all uppercase tracking-tighter active:scale-[0.98]"
          >
            Visualizar meu cartão
          </button>
        </form>
      </div>

      <div className="bg-[#111] p-6 rounded-3xl border border-gray-800 flex items-center gap-6">
        <div className="bg-[#fecb0a]/10 p-4 rounded-2xl text-[#fecb0a]">
          <Crown size={32} />
        </div>
        <div className="space-y-1">
          <h3 className="font-bold text-[#fecb0a] uppercase tracking-tighter text-sm">Premiação Exclusiva</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            A cada 10 serviços, você ganha uma <strong className="text-white">Geral Completa</strong>. O brilho que seu carro merece!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
