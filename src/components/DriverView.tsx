import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RideRequest } from '../types';
import { RideCard } from './RideCard';
import { TRANSLATIONS } from '../constants';
import { Inbox } from 'lucide-react';

interface DriverViewProps {
  rides: RideRequest[];
  onAcceptRide: (id: string) => void;
}

export const DriverView: React.FC<DriverViewProps> = ({ rides, onAcceptRide }) => {
  const pendingRides = rides.filter(r => r.status === 'قيد الانتظار');

  return (
    <div className="p-6 pb-24 bg-background h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[12px] font-bold text-text-muted uppercase tracking-wider">{TRANSLATIONS.requests}</h2>
        <span className="bg-[#DCFCE7] text-[#16A34A] px-3 py-1 rounded-full text-[10px] font-bold">
          {pendingRides.length} {TRANSLATIONS.newRequest}
        </span>
      </div>

      <AnimatePresence mode="popLayout">
        {pendingRides.length > 0 ? (
          pendingRides.map((ride) => (
            <RideCard 
              key={ride.id} 
              ride={ride} 
              onAccept={onAcceptRide} 
              showAcceptButton 
            />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-gray-400"
          >
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Inbox size={40} />
            </div>
            <p>{TRANSLATIONS.noRequests}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
