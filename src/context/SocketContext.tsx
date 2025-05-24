import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
};

const Context = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const SocketContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(
      import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
      {
        withCredentials: true,
        transports: ["websocket"],
      }
    );

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("🟢 Socket connected:", newSocket.id);
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      console.warn("🔴 Socket disconnected");
      setIsConnected(false);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return <Context value={{ socket, isConnected }}>{children}</Context>;
};

export const useSocket = () => useContext(Context);
