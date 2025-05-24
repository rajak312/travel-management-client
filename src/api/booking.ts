import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBooking,
  getAllBookings,
  getMyBookings,
  getUsersAndBookings,
} from "./api";

export const useMyBookings = () => {
  return useQuery({
    queryKey: ["myBookings"],
    queryFn: getMyBookings,
  });
};

export const useUsersAndBookings = () => {
  return useQuery({
    queryKey: ["usersAndBookings"],
    queryFn: getUsersAndBookings,
  });
};

export const useAllBookings = () => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: getAllBookings,
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myBookings"],
      });
      queryClient.fetchQuery({
        queryKey: ["bookings"],
      });
    },
  });
};
