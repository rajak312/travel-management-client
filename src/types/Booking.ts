import { TravelPackage } from "./Package";

export interface Booking {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  travelPackage: TravelPackage;
  selectedOptions: {
    food: boolean;
    accommodation: boolean;
  };
  totalPrice: number;
  createdAt: string;
}

export interface BookingPayload extends Pick<Booking, "selectedOptions"> {
  packageId: string;
}

export interface UserWithBookings {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  bookings: Booking[];
}
