import React from "react";
import ReactDOM from "react-dom/client";
import AuthProvider from "./providers/AuthProvider";
import { RouterProvider } from "react-router";
import router from "./routers/Router";
import "./index.css";
import { Toaster } from "react-hot-toast";

// 🟡 Import React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 🟢 Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 🟢 Wrap with QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
