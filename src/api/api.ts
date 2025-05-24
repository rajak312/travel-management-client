import api from "../utils/api";
import { UserLoginPayload, UserSignUpPayload } from "../types/User";
import { TravelPackage } from "../types/Package";
import { Booking, BookingPayload, UserWithBookings } from "../types/Booking";

export const login = async (user: UserLoginPayload) => {
  const res = await api.post("/api/auth/login", user);
  return res.data;
};

export const signup = async (user: UserSignUpPayload) => {
  const res = await api.post("/api/auth/signup", user);
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/api/auth/logout");
  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/api/auth/me");
  return res.data;
};

export const fetchPackages = async (): Promise<TravelPackage[]> => {
  const res = await api.get("/api/packages");
  return res.data;
};

export const fetchPackageById = async (id: string): Promise<TravelPackage> => {
  const res = await api.get(`/api/packages/${id}`);
  return res.data;
};

export const createPackage = async (pkg: Partial<TravelPackage>) => {
  const res = await api.post("/api/packages", pkg);
  return res.data;
};

export const updatePackage = async (
  id: string,
  pkg: Partial<TravelPackage>
) => {
  const res = await api.put(`/api/packages/${id}`, pkg);
  return res.data;
};

export const deletePackage = async (id: string) => {
  const res = await api.delete(`/api/packages/${id}`);
  return res.data;
};

export const createBooking = async (booking: BookingPayload) => {
  const res = await api.post("/api/bookings", booking);
  return res.data;
};

export const getMyBookings = async (): Promise<Booking[]> => {
  const res = await api.get("/api/bookings/my-bookings");
  return res.data;
};
export const getAllBookings = async (): Promise<Booking[]> => {
  const res = await api.get("/api/bookings/all");
  return res.data;
};

export const getPackageAnalytics = async () => {
  const res = await api.get("/api/admin/packages/analytics");
  return res.data;
};

export const getUsersAndBookings = async (): Promise<UserWithBookings[]> =>
  (await api.get("/api/admin/users-bookings")).data;
