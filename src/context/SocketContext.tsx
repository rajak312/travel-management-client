import { useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
};

const Context = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export enum SocketEvents {
  Package_Created = "PackageCreated",
  Package_Updated = "PackageUpdated",
  Package_Deleted = "PackageDeleted",
  Package_Booked = "PackageBooked",
}

export const SocketContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [_socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const queryClient = useQueryClient();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;
    const socket = io(
      import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
      {
        // withCredentials: true,
        // transports: ["websocket"],
        auth: { token },
      }
    );
    setSocket(socket);

    const handleConnect = () => {
      console.info("🟢 Socket connected:", socket.id);
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      console.warn("🔴 Socket disconnected");
      setIsConnected(false);
    };

    const handlePackageCreated = (data: unknown) => {
      console.info("📦 Package created:", data);
      queryClient.invalidateQueries({
        queryKey: ["packages"],
      });
    };

    const handlePackageUpdated = (data: unknown) => {
      console.info("✏️ Package updated:", data);
      queryClient.invalidateQueries({
        queryKey: ["packages"],
      });
    };

    const handlePackageDeleted = (data: unknown) => {
      console.info("🗑️ Package deleted:", data);
      queryClient.invalidateQueries({
        queryKey: ["packages"],
      });
    };

    const handlePackageBooked = (data: unknown) => {
      console.info("📅 Package booked:", data);
      queryClient.invalidateQueries({
        queryKey: ["usersAndBookings", "bookings", "myBookings"],
      });
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on(SocketEvents.Package_Created, handlePackageCreated);
    socket.on(SocketEvents.Package_Updated, handlePackageUpdated);
    socket.on(SocketEvents.Package_Deleted, handlePackageDeleted);
    socket.on(SocketEvents.Package_Booked, handlePackageBooked);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off(SocketEvents.Package_Created, handlePackageCreated);
      socket.off(SocketEvents.Package_Updated, handlePackageUpdated);
      socket.off(SocketEvents.Package_Deleted, handlePackageDeleted);
      socket.off(SocketEvents.Package_Booked, handlePackageBooked);
      socket.disconnect();
    };
  }, [token]);

  return (
    <Context.Provider value={{ socket: _socket, isConnected }}>
      {children}
    </Context.Provider>
  );
};

export const useSocket = () => useContext(Context);
