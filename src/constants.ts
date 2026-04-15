export const TRANSLATIONS = {
  appName: 'مشواري',
  rider: 'راكب',
  driver: 'سائق',
  requestRide: 'طلب مشوار',
  waiting: 'قيد الانتظار',
  accepted: 'تم القبول',
  acceptRide: 'قبول الطلب',
  pickup: 'موقع الانطلاق',
  destination: 'الوجهة',
  home: 'الرئيسية',
  requests: 'الطلبات',
  noRequests: 'لا توجد طلبات حالياً',
  newRequest: 'طلب جديد',
  price: 'السعر',
  currency: 'ر.ي',
  selectDistrict: 'اختر المنطقة',
  from: 'من',
  to: 'إلى',
  currentLocation: 'موقعي الحالي',
  chooseDistrict: 'اختيار منطقة',
  detectingLocation: 'جاري تحديد موقعك...',
  locationError: 'يرجى تفعيل الموقع للسماح بتحديد موقعك',
};

export const SANAA_DISTRICTS = [
  { name: 'صنعاء الجديدة' },
  { name: 'التحرير' },
  { name: 'معين' },
  { name: 'السبعين' },
  { name: 'آزال' },
  { name: 'الثورة' },
  { name: 'الوحدة' },
  { name: 'بني الحارث' },
];

export const MOCK_LOCATIONS = SANAA_DISTRICTS.map(d => d.name);
