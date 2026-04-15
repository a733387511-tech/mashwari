import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Clock, DollarSign } from 'lucide-react';
import { RideRequest } from '../types';
import { TRANSLATIONS } from '../constants';

interface RideCardProps {
  ride: RideRequest;
  onAccept?: (id: string) => void;
  showAcceptButton?: boolean;
}

export const RideCard: React.FC<RideCardProps> = ({ ride, onAccept, showAcceptButton }) => {
  const isWaiting = ride.status === 'قيد الانتظار';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-surface rounded-2xl p-5 shadow-sm border border-border-light mb-4"
    >
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-border-light rounded-full flex items-center justify-center text-text-muted font-black text-lg">
            {ride.riderName[0]}
          </div>
          <div>
            <p className="text-base font-black leading-none mb-1">{ride.riderName}</p>
            <div className="flex items-center gap-1.5 text-[11px] text-text-muted font-bold">
              <Clock size={12} />
              {new Date(ride.timestamp).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
        <div className={`px-3 py-1.5 rounded-full text-[11px] font-black tracking-tight ${
          isWaiting ? 'bg-[#FEF3C7] text-[#D97706]' : 'bg-[#DCFCE7] text-[#16A34A]'
        }`}>
          {ride.status}
        </div>
      </div>

      <div className="space-y-4 relative mb-6">
        <div className="absolute right-[11px] top-4 bottom-4 w-0.5 bg-border-light/50" />
        
        <div className="flex items-start gap-4 relative z-10">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider mb-0.5">{TRANSLATIONS.pickup}</p>
            <p className="text-sm font-bold text-text-main">{ride.pickupLocation}</p>
          </div>
        </div>

        <div className="flex items-start gap-4 relative z-10">
          <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
            <Navigation size={14} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider mb-0.5">{TRANSLATIONS.destination}</p>
            <p className="text-sm font-bold text-text-main">{ride.destination}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border-light/50">
        <div className="flex items-center gap-1">
          <span className="text-xl font-black text-text-main">{ride.price}</span>
          <span className="text-xs text-text-muted font-bold">{TRANSLATIONS.currency}</span>
        </div>

        {showAcceptButton && isWaiting && onAccept ? (
          <button
            onClick={() => onAccept(ride.id)}
            className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-primary"
          >
            {TRANSLATIONS.acceptRide}
          </button>
        ) : (
          <div className="flex items-center gap-2 text-text-muted font-bold text-sm">
            {ride.status === 'تم القبول' ? (
              <span className="flex items-center gap-1.5 text-green-600">
                <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                تم تولي الطلب
              </span>
            ) : (
              <span>{ride.status}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
