import React from "react";
import ReactDOM from "react-dom/client";
import AuthProvider from "./providers/AuthProvider";
import { RouterProvider } from "react-router";
import router from "./routers/Router";
import "./index.css";
import { Toaster } from "react-hot-toast";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

// Import React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap with QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* Wrap RouterProvider with Elements */}
        <Elements stripe={stripePromise}>
          <RouterProvider router={router} />
        </Elements>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
