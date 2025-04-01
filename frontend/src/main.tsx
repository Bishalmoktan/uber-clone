import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "./context/socket-context.tsx";
import { UserProvider } from "./context/user-context.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <SocketProvider>
          <App />
          <Toaster />
        </SocketProvider>
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>
);
