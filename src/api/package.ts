import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchPackages,
  fetchPackageById,
  createPackage,
  updatePackage,
  deletePackage,
} from "./api";
import { TravelPackage } from "../types/Package";

export const usePackages = () => {
  return useQuery<TravelPackage[]>({
    queryKey: ["packages"],
    queryFn: fetchPackages,
  });
};

export const usePackage = (id: string) => {
  return useQuery<TravelPackage>({
    queryKey: ["package", id],
    queryFn: () => fetchPackageById(id),
    enabled: !!id,
  });
};

export const useCreatePackage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPackage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["packages"],
      });
    },
  });
};

export const useUpdatePackage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TravelPackage> }) =>
      updatePackage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["packages"],
      });
    },
  });
};

export const useDeletePackage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePackage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["packages"],
      });
    },
  });
};
