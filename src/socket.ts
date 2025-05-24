// socket.ts
import { io } from "socket.io-client";

const socket = io(
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  {
    withCredentials: true,
  }
);

socket.on("connect", () => {
  console.log("🟢 Connected to Socket.IO server", socket.id);
});

socket.on("disconnect", () => {
  console.warn("🔴 Disconnected from Socket.IO server");
});

export default socket;
