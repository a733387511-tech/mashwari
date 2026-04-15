export type RideStatus = 'قيد الانتظار' | 'تم القبول' | 'في الطريق' | 'مكتمل';

export interface RideRequest {
  id: string;
  riderName: string;
  pickupLocation: string;
  destination: string;
  status: RideStatus;
  timestamp: number;
  price: number;
}

export type AppView = 'home' | 'requests';
export type UserRole = 'rider' | 'driver';
