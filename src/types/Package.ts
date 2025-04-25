export interface TravelPackage {
  _id?: string;
  from: string;
  to: string;
  startDate: string;
  endDate: string;
  basePrice: number;
  includedServices: {
    food: boolean;
    accommodation: boolean;
  };
}
