
import React from 'react';
import { UserRole } from '../types';
import { LogOut, ShieldCheck, User, Home } from 'lucide-react';

interface HeaderProps {
  role: UserRole;
  onManagerClick: () => void;
  onLogout: () => void;
  onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ role, onManagerClick, onLogout, onHomeClick }) => {
  return (
    <header className="bg-black border-b border-gray-800 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo & Name - Only visible if not on Home Page (Guest) */}
        <div 
          className={`flex items-center gap-3 cursor-pointer transition-opacity duration-300 ${role === UserRole.GUEST ? 'opacity-0 pointer-events-none md:flex' : 'opacity-100'}`}
          onClick={onHomeClick}
          style={{ visibility: role === UserRole.GUEST ? 'hidden' : 'visible' }}
        >
          <img 
            src="https://raw.githubusercontent.com/Lava-Jato-Guedes/logo/main/logo.png" 
            alt="Guedes Logo" 
            className="h-14 w-auto object-contain"
            onError={(e) => {
               e.currentTarget.src = "https://picsum.photos/seed/guedes/200/200";
            }}
          />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tighter text-white">
              GUEDES LAVA JATO
            </h1>
            <span className="text-[10px] text-gray-400 tracking-widest uppercase">
              Estética Automotiva
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {role === UserRole.GUEST ? (
            <>
              <button 
                onClick={onHomeClick}
                className="flex items-center gap-2 bg-[#fecb0a] text-black px-4 py-2 rounded-full font-bold text-sm hover:opacity-90 transition-all"
              >
                <User size={16} /> CLIENTE
              </button>
              <button 
                onClick={onManagerClick}
                className="flex items-center gap-2 bg-gray-900 text-gray-300 px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-800 border border-gray-700 transition-all"
              >
                <ShieldCheck size={16} /> GESTOR
              </button>
            </>
          ) : (
            <>
               <button 
                onClick={onHomeClick}
                className="p-2 text-gray-400 hover:text-white transition-all"
                title="Voltar ao início"
              >
                <Home size={20} />
              </button>
              <span className="text-xs text-[#fecb0a] font-bold mr-2 uppercase tracking-widest">
                {role === UserRole.MANAGER ? 'Área do Gestor' : 'Seu Cartão'}
              </span>
              <button 
                onClick={onLogout}
                className="flex items-center gap-2 bg-red-600/20 text-red-500 border border-red-600/30 px-3 py-1.5 rounded-full font-bold text-xs hover:bg-red-600/30 transition-all"
              >
                <LogOut size={14} /> SAIR
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
