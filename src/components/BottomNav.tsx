import React from 'react';
import { motion } from 'motion/react';
import { Home, List, User, Car } from 'lucide-react';
import { AppView, UserRole } from '../types';
import { TRANSLATIONS } from '../constants';

interface BottomNavProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ 
  activeView, 
  setActiveView, 
  userRole, 
  setUserRole 
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-xl border-t border-border-light pb-safe-area-inset-bottom z-50">
      <div className="flex justify-around items-center h-[75px] max-w-md mx-auto px-6">
        <button
          onClick={() => setActiveView('home')}
          className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
            activeView === 'home' ? 'text-primary scale-110' : 'text-text-muted hover:text-text-main'
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-colors ${activeView === 'home' ? 'bg-primary/10' : ''}`}>
            <Home size={20} strokeWidth={activeView === 'home' ? 2.5 : 2} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">{TRANSLATIONS.home}</span>
        </button>

        <button
          onClick={() => setActiveView('requests')}
          className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
            activeView === 'requests' ? 'text-primary scale-110' : 'text-text-muted hover:text-text-main'
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-colors ${activeView === 'requests' ? 'bg-primary/10' : ''}`}>
            <List size={20} strokeWidth={activeView === 'requests' ? 2.5 : 2} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">{TRANSLATIONS.requests}</span>
        </button>

        <button
          onClick={() => setUserRole(userRole === 'rider' ? 'driver' : 'rider')}
          className="flex flex-col items-center gap-1.5 text-text-muted hover:text-primary transition-all duration-300 active:scale-90"
        >
          <div className="p-1.5 rounded-xl bg-background border border-border-light">
            {userRole === 'rider' ? <Car size={20} /> : <User size={20} />}
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">
            {userRole === 'rider' ? TRANSLATIONS.driver : TRANSLATIONS.rider}
          </span>
        </button>
      </div>
    </div>
  );
};
