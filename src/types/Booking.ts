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
