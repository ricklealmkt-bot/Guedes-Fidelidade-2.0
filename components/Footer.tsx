
import React from 'react';
import { MessageCircle, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-500 py-8 border-t border-gray-900 mt-12">
      <div className="container mx-auto px-4 text-center space-y-6">
        <div className="uppercase tracking-widest text-xs font-bold text-gray-400">
          Guedes Lava Jato e Estética Automotiva
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-sm">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[#fecb0a]" />
            <span>Rua Batista Carneiro, 113 - Salgado Filho – BH/MG</span>
          </div>
        </div>

        <div className="flex justify-center">
          <a 
            href="https://wa.me/5531982077291" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#121212] border border-gray-800 px-6 py-3 rounded-full hover:bg-gray-900 transition-all group"
          >
            <div className="bg-green-600 p-2 rounded-full text-white group-hover:scale-110 transition-transform">
              <MessageCircle size={20} />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-gray-500 font-bold uppercase">Contato - Agende seu serviço</p>
              <p className="text-white font-bold">(31) 98207-7291</p>
            </div>
          </a>
        </div>

        <div className="text-[10px] pt-4">
          © 2024 GUEDES FIDELIDADE DIGITAL • Seu carro com brilho de novo, sua fidelidade premiada.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
