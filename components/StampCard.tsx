
import React from 'react';
import { Check, Trophy, Star } from 'lucide-react';

interface StampCardProps {
  currentStamps: number;
}

const StampCard: React.FC<StampCardProps> = ({ currentStamps }) => {
  const slots = Array.from({ length: 10 });

  return (
    <div className="grid grid-cols-5 gap-3 sm:gap-4 md:gap-6">
      {slots.map((_, index) => {
        const isStamped = index < currentStamps;
        const isGold = index === 9; // 10th stamp

        if (isGold) {
          return (
            <div 
              key={index}
              className={`aspect-square flex items-center justify-center rounded-2xl border-4 transition-all duration-500 relative ${
                isStamped 
                ? 'bg-gradient-to-br from-[#fecb0a] to-[#ff9900] border-white text-black shadow-[0_0_25px_rgba(254,203,10,0.6)] scale-110 z-10' 
                : 'bg-black border-dashed border-gray-800 text-gray-800'
              }`}
            >
              {isStamped && (
                <>
                  <div className="absolute inset-0 bg-white/20 rounded-xl animate-ping opacity-20"></div>
                  <div className="absolute -top-1 -right-1">
                    <Star size={12} fill="currentColor" className="text-white animate-pulse" />
                  </div>
                </>
              )}
              <div className="flex flex-col items-center">
                <Trophy size={32} strokeWidth={isStamped ? 3 : 2} className={isStamped ? 'animate-bounce' : ''} />
                <span className={`text-[8px] font-black uppercase mt-1 ${isStamped ? 'text-black' : 'text-gray-700'}`}>GOLD</span>
              </div>
            </div>
          );
        }

        return (
          <div 
            key={index}
            className={`aspect-square flex items-center justify-center rounded-2xl border-2 transition-all duration-300 ${
              isStamped 
              ? 'bg-[#fecb0a] border-white text-black scale-105' 
              : 'bg-black border-gray-900 text-gray-800'
            }`}
          >
            {isStamped ? (
              <Check size={24} strokeWidth={4} />
            ) : (
              <span className="text-sm font-black">{index + 1}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StampCard;
