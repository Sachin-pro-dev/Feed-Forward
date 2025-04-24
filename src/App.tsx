
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import FoodMap from "./pages/FoodMap";
import FoodDetail from "./pages/FoodDetail";
import DonatePage from "./pages/DonatePage";
import NotificationCenter from "./pages/NotificationCenter";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import WalletPage from "./pages/WalletPage";
import MarketplacePage from "./pages/MarketplacePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/map" element={<Layout><FoodMap /></Layout>} />
              <Route path="/food/:id" element={<Layout><FoodDetail /></Layout>} />
              <Route path="/donate" element={<Layout><DonatePage /></Layout>} />
              <Route path="/notifications" element={<Layout><NotificationCenter /></Layout>} />
              <Route path="/login" element={<Layout><Login /></Layout>} />
              <Route path="/signup" element={<Layout><SignUp /></Layout>} />
              
              {/* Protected Routes */}
              <Route path="/wallet" element={
                <Layout>
                  <ProtectedRoute>
                    <WalletPage />
                  </ProtectedRoute>
                </Layout>
              } />
              <Route path="/marketplace" element={
                <Layout>
                  <ProtectedRoute>
                    <MarketplacePage />
                  </ProtectedRoute>
                </Layout>
              } />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
