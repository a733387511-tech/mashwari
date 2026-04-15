import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Car, MapPin, Navigation, ChevronDown, LocateFixed, AlertCircle, List } from 'lucide-react';
import { TRANSLATIONS, SANAA_DISTRICTS } from '../constants';

interface RiderViewProps {
  onRequestRide: (pickup: string, destination: string) => void;
  isRequesting: boolean;
}

export const RiderView: React.FC<RiderViewProps> = ({ onRequestRide, isRequesting }) => {
  const [pickupLocation, setPickupLocation] = useState<string>('');
  const [destinationLocation, setDestinationLocation] = useState<string>('');
  const [activeSelector, setActiveSelector] = useState<'pickup' | 'destination' | null>(null);
  const [showPickupMenu, setShowPickupMenu] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePickupClick = () => {
    setShowPickupMenu(!showPickupMenu);
    setActiveSelector(null);
    setError(null);
  };

  const handleDestinationClick = () => {
    setActiveSelector('destination');
    setShowPickupMenu(false);
    setError(null);
  };

  const handleCurrentLocation = () => {
    // Reset state before starting
    setError(null);
    setIsDetecting(true);
    setShowPickupMenu(false);

    // Check for HTTPS (required for Geolocation in most browsers including Safari)
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      setError('يجب فتح التطبيق عبر رابط آمن (https)');
      setIsDetecting(false);
      return;
    }

    if (!navigator.geolocation) {
      setError('المتصفح لا يدعم تحديد الموقع');
      setIsDetecting(false);
      return;
    }

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    // This call must be inside the click handler to trigger the browser permission popup
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locText = `موقعي الحالي (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
        setPickupLocation(locText);
        setIsDetecting(false);
      },
      (err) => {
        console.error('Geolocation error:', err);
        let errorMessage = "لا يمكن تحديد موقعك";
        
        switch(err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = "تم رفض إذن الموقع، يرجى الضغط على السماح في المتصفح";
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = "لا يمكن تحديد موقعك";
            break;
          case err.TIMEOUT:
            errorMessage = "انتهت مهلة تحديد الموقع";
            break;
        }
        
        setError(errorMessage);
        setIsDetecting(false);
      },
      options
    );
  };

  const handleDistrictSelect = (districtName: string) => {
    if (activeSelector === 'pickup') {
      setPickupLocation(districtName);
    } else if (activeSelector === 'destination') {
      setDestinationLocation(districtName);
    }
    setActiveSelector(null);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6 overflow-y-auto pb-24">
        {/* Welcome Section */}
        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-tight">أهلاً بك في صنعاء</h2>
          <p className="text-text-muted text-sm font-medium">حدد مسار رحلتك الآن</p>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl flex items-center gap-2 text-xs font-bold"
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Location Selection Cards */}
        <div className="space-y-3 relative">
          {/* Pickup Card */}
          <div className="relative">
            <button
              onClick={handlePickupClick}
              className="w-full bg-surface p-4 rounded-2xl shadow-sm border border-border-light flex items-center gap-4 text-right transition-all hover:border-primary/30"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                <MapPin size={20} />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">{TRANSLATIONS.from}</p>
                <p className="text-sm font-bold text-text-main truncate">
                  {isDetecting ? TRANSLATIONS.detectingLocation : (pickupLocation || 'من أين ستنطلق؟')}
                </p>
              </div>
            </button>

            {/* Pickup Popup Menu */}
            <AnimatePresence>
              {showPickupMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border-light rounded-2xl shadow-xl z-[100] overflow-hidden"
                >
                  <button
                    onClick={handleCurrentLocation}
                    className="w-full flex items-center gap-3 px-5 py-4 hover:bg-background transition-colors border-b border-border-light text-right"
                  >
                    <LocateFixed size={18} className="text-primary" />
                    <span className="text-sm font-bold">{TRANSLATIONS.currentLocation}</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveSelector('pickup');
                      setShowPickupMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-5 py-4 hover:bg-background transition-colors text-right"
                  >
                    <List size={18} className="text-primary" />
                    <span className="text-sm font-bold">{TRANSLATIONS.chooseDistrict}</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Vertical connector line */}
          <div className="absolute right-11 top-12 bottom-12 w-0.5 bg-border-light/50 z-0" />

          {/* Destination Card */}
          <button
            onClick={handleDestinationClick}
            className="w-full bg-surface p-4 rounded-2xl shadow-sm border border-border-light flex items-center gap-4 text-right transition-all hover:border-primary/30"
          >
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 shrink-0">
              <Navigation size={20} />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">{TRANSLATIONS.to}</p>
              <p className="text-sm font-bold text-text-main truncate">
                {destinationLocation || 'إلى أين تريد الذهاب؟'}
              </p>
            </div>
          </button>
        </div>

        {/* District Selector (Conditional) */}
        <AnimatePresence>
          {activeSelector && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 overflow-hidden bg-surface rounded-2xl border border-border-light shadow-sm p-4"
            >
              <h3 className="text-sm font-black mb-2 flex items-center gap-2">
                <List size={16} className="text-primary" />
                {TRANSLATIONS.selectDistrict} ({activeSelector === 'pickup' ? TRANSLATIONS.from : TRANSLATIONS.to})
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {SANAA_DISTRICTS.map((district) => (
                  <button
                    key={district.name}
                    onClick={() => handleDistrictSelect(district.name)}
                    className="p-3 text-sm font-bold bg-background rounded-xl border border-border-light hover:border-primary/30 hover:bg-primary/5 transition-all text-center"
                  >
                    {district.name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setActiveSelector(null)}
                className="w-full py-2 mt-2 text-xs font-bold text-text-muted hover:text-text-main transition-colors"
              >
                إلغاء
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Request Button Section */}
        <div className="bg-surface rounded-[32px] p-6 border border-border-light shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-black">{TRANSLATIONS.requestRide}</h3>
              <p className="text-xs text-text-muted font-medium">أفضل الأسعار في صنعاء</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Car size={24} />
            </div>
          </div>
          
          <button
            onClick={() => onRequestRide(pickupLocation || 'موقع غير محدد', destinationLocation || 'وجهة غير محددة')}
            disabled={isRequesting || !pickupLocation || !destinationLocation}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-primary flex items-center justify-center gap-3 ${
              isRequesting || !pickupLocation || !destinationLocation
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-primary text-white hover:opacity-90 active:scale-[0.98]'
            }`}
          >
            {isRequesting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              <span className="text-2xl">🚖</span>
            )}
            {isRequesting ? 'جاري البحث...' : 'اطلب الآن'}
          </button>
        </div>
      </div>
    </div>
  );
};
