import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SocketContext } from "./context/SocketContext.tsx";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <SocketContext>
          <AuthProvider>
            <App />
          </AuthProvider>
        </SocketContext>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
