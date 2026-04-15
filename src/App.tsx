import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BottomNav } from './components/BottomNav';
import { RiderView } from './components/RiderView';
import { DriverView } from './components/DriverView';
import { RideCard } from './components/RideCard';
import { RideRequest, AppView, UserRole } from './types';
import { TRANSLATIONS, SANAA_DISTRICTS } from './constants';
import { Bell, User as UserIcon } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('home');
  const [userRole, setUserRole] = useState<UserRole>('rider');
  const [rides, setRides] = useState<RideRequest[]>([]);
  const [isRequesting, setIsRequesting] = useState(false);

  // Handle ride request
  const handleRequestRide = (pickup: string, destination: string) => {
    setIsRequesting(true);
    
    // Simulate network delay
    setTimeout(() => {
      const newRide: RideRequest = {
        id: Math.random().toString(36).substr(2, 9),
        riderName: 'مستخدم',
        pickupLocation: pickup,
        destination: destination || SANAA_DISTRICTS[Math.floor(Math.random() * SANAA_DISTRICTS.length)].name,
        status: 'قيد الانتظار',
        timestamp: Date.now(),
        price: Math.floor(Math.random() * 5000) + 3000, // Sanaa currency simulation (YER)
      };
      
      setRides(prev => [newRide, ...prev]);
      setIsRequesting(false);
      setActiveView('requests');
    }, 1500);
  };

  // Handle ride acceptance
  const handleAcceptRide = (id: string) => {
    setRides(prev => prev.map(ride => 
      ride.id === id ? { ...ride, status: 'تم القبول' } : ride
    ));
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-surface flex flex-col relative shadow-xl md:rounded-[48px] md:my-8 md:h-[800px] border-8 border-text-main overflow-hidden">
      {/* Simulated Status Bar */}
      <div className="h-11 px-8 flex justify-between items-center text-[13px] font-bold bg-surface z-50">
        <span>9:41</span>
        <div className="flex gap-1.5 items-center">
          <div className="flex gap-0.5 items-end h-3">
            <div className="w-0.5 h-1 bg-text-main rounded-full" />
            <div className="w-0.5 h-1.5 bg-text-main rounded-full" />
            <div className="w-0.5 h-2 bg-text-main rounded-full" />
            <div className="w-0.5 h-2.5 bg-text-main rounded-full" />
          </div>
          <span>5G</span>
          <div className="w-6 h-3 border border-text-main/30 rounded-sm relative flex items-center px-0.5">
            <div className="w-4 h-2 bg-text-main rounded-xs" />
            <div className="absolute -right-1 w-0.5 h-1 bg-text-main/30 rounded-r-full" />
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-surface px-6 py-4 flex items-center justify-between sticky top-0 z-40 border-b border-border-light">
        <div className="flex items-center gap-3">
          <div className="text-primary font-black text-2xl tracking-tighter">
            {TRANSLATIONS.appName}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 bg-background rounded-full flex items-center justify-center text-text-muted hover:text-primary transition-colors">
            <Bell size={18} />
          </button>
          <button className="w-9 h-9 bg-border-light rounded-full flex items-center justify-center text-text-muted">
            <UserIcon size={18} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeView === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              {userRole === 'rider' ? (
                <RiderView 
                  onRequestRide={handleRequestRide} 
                  isRequesting={isRequesting} 
                />
              ) : (
                <div className="p-6 text-center py-20">
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                    <UserIcon size={40} />
                  </div>
                  <h2 className="text-xl font-bold mb-2">لوحة تحكم السائق</h2>
                  <p className="text-gray-500">انتقل إلى قسم الطلبات لاستقبال المشاوير</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="requests"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full"
            >
              {userRole === 'rider' ? (
                <div className="p-6 pb-24">
                  <h2 className="text-xl font-bold mb-6">مشاويري</h2>
                  <AnimatePresence mode="popLayout">
                    {rides.length > 0 ? (
                      rides.map(ride => (
                        <RideCard key={ride.id} ride={ride} />
                      ))
                    ) : (
                      <div className="text-center py-20 text-gray-400">
                        <p>لا توجد مشاوير سابقة</p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <DriverView rides={rides} onAcceptRide={handleAcceptRide} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <BottomNav 
        activeView={activeView} 
        setActiveView={setActiveView} 
        userRole={userRole}
        setUserRole={setUserRole}
      />
    </div>
  );
}
