
import React, { useState } from 'react';
import { X, Lock, ShieldAlert } from 'lucide-react';

interface ManagerLoginProps {
  onSuccess: () => void;
  onClose: () => void;
}

const ManagerLogin: React.FC<ManagerLoginProps> = ({ onSuccess, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'FideliGuedes26#') {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-[#111] border border-gray-800 w-full max-w-md rounded-3xl p-8 shadow-2xl space-y-6 animate-scaleIn">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Acesso Restrito</h2>
            <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Apenas Administradores</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest ml-1">Senha do Gestor</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Insira a senha mestra"
                className={`w-full bg-black border ${error ? 'border-red-600' : 'border-gray-800'} rounded-2xl py-4 pl-12 pr-4 font-bold outline-none focus:border-[#fecb0a] transition-all`}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-xs font-bold bg-red-500/10 p-3 rounded-xl">
              <ShieldAlert size={14} />
              Senha incorreta. Tente novamente.
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-[#fecb0a] text-black py-4 rounded-2xl font-black text-lg hover:bg-[#eec00a] transition-all uppercase tracking-tighter"
          >
            Entrar no Sistema
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManagerLogin;
