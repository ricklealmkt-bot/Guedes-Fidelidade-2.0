
import React, { useEffect, useState } from 'react';
import { Customer } from '../types';
import StampCard from './StampCard';
import TipsSection from './TipsSection';
import { Calendar, User, Car, Heart, PartyPopper, Trophy, Star } from 'lucide-react';

interface CustomerDashboardProps {
  customer: Customer;
}

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ customer }) => {
  const [isBirthday, setIsBirthday] = useState(false);
  const hasPrize = customer.stamps === 10;

  useEffect(() => {
    if (customer.birthDate) {
      const today = new Date();
      const birth = new Date(customer.birthDate);
      if (today.getDate() === birth.getDate() && today.getMonth() === birth.getMonth()) {
        setIsBirthday(true);
      }
    }
  }, [customer]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Prize Notification */}
      {hasPrize && (
        <div className="bg-gradient-to-r from-[#fecb0a] via-[#ff9900] to-[#fecb0a] p-6 rounded-3xl flex flex-col md:flex-row items-center gap-6 shadow-[0_0_30px_rgba(254,203,10,0.3)] animate-pulse border-2 border-white/20">
          <div className="bg-white/20 p-4 rounded-full text-black">
            <Trophy size={48} strokeWidth={2.5} />
          </div>
          <div className="text-center md:text-left flex-grow">
            <h4 className="font-black text-black text-2xl uppercase tracking-tighter">VOCÊ GANHOU O SELO GOLD!</h4>
            <p className="text-black/80 font-bold text-sm uppercase tracking-wide">
              Sua <span className="underline italic">Geral Completa</span> está disponível para resgate. 
              <br className="hidden md:block"/> Agende agora mesmo e aproveite seu prêmio!
            </p>
          </div>
          <div className="flex gap-2">
            <Star className="text-black animate-bounce delay-75" size={24} fill="currentColor" />
            <Star className="text-black animate-bounce delay-150" size={24} fill="currentColor" />
            <Star className="text-black animate-bounce delay-300" size={24} fill="currentColor" />
          </div>
        </div>
      )}

      {/* Birthday Notification */}
      {isBirthday && !hasPrize && (
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-4 rounded-2xl flex items-center gap-4 shadow-lg">
          <PartyPopper className="text-white" size={32} />
          <div>
            <h4 className="font-bold text-white uppercase tracking-tighter">Parabéns, {customer.name}!</h4>
            <p className="text-white/80 text-xs font-medium">A equipe Guedes te deseja um feliz aniversário! Hoje o brilho é todo seu!</p>
          </div>
        </div>
      )}

      {/* Profile Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#111] p-6 rounded-3xl border border-gray-800 flex items-start gap-4">
          <div className="bg-[#fecb0a] p-3 rounded-2xl text-black">
            <User size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Cliente</p>
            <h3 className="text-xl font-bold">{customer.name}</h3>
            <p className="text-xs text-gray-500">{customer.whatsapp}</p>
          </div>
        </div>
        <div className="bg-[#111] p-6 rounded-3xl border border-gray-800 flex items-start gap-4">
          <div className="bg-gray-800 p-3 rounded-2xl text-gray-400">
            <Car size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Veículo</p>
            <h3 className="text-xl font-bold">{customer.vehicleModel}</h3>
            <p className="text-xs text-[#fecb0a] font-black">{customer.plate}</p>
          </div>
        </div>
      </div>

      {/* Stamp Card */}
      <div className="bg-[#111] p-8 rounded-3xl border border-gray-800 shadow-xl space-y-6 relative overflow-hidden">
        {hasPrize && (
           <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-[#fecb0a] opacity-5 rotate-45 pointer-events-none"></div>
        )}
        <div className="flex justify-between items-end">
          <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
             Seu Cartão Fidelidade
             {hasPrize && <span className="text-xs bg-[#fecb0a] text-black px-2 py-0.5 rounded italic">RECOMPENSA ATIVA</span>}
          </h2>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Progresso {customer.stamps}/10</span>
        </div>
        <StampCard currentStamps={customer.stamps} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* History */}
        <div className="lg:col-span-2 bg-[#111] p-6 rounded-3xl border border-gray-800 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black uppercase tracking-tighter">Histórico de Serviços</h3>
            <span className="bg-gray-800 px-3 py-1 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Total: {customer.totalServicesCount}
            </span>
          </div>
          
          <div className="space-y-3">
            {customer.services.length === 0 ? (
              <p className="text-gray-600 text-sm text-center py-8 italic">Nenhum serviço registrado ainda.</p>
            ) : (
              customer.services.slice().reverse().map((service, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-black border border-gray-900 rounded-2xl hover:border-gray-800 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-900 p-2 rounded-xl text-gray-500">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{service.type}</p>
                      <p className="text-[10px] text-gray-600">{new Date(service.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[#fecb0a] font-black">R$ {service.price.toFixed(2)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Extra Info & Tips */}
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-[#111] to-black p-6 rounded-3xl border border-gray-800 space-y-4">
             <div className="flex items-center gap-3 text-red-500">
               <Heart size={20} fill="currentColor" />
               <p className="text-[10px] font-bold uppercase tracking-widest">Time do Coração</p>
             </div>
             <p className="text-xl font-black italic">{customer.favoriteTeam || "Não informado"}</p>
          </div>
          
          <TipsSection />
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
