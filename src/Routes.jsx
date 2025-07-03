import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import ClientDashboard from "pages/client-dashboard";
import SessionBooking from "pages/session-booking";
import AdminDashboard from "pages/admin-dashboard";
import TrainerProfile from "pages/trainer-profile";
import TrainerDiscovery from "pages/trainer-discovery";
import TrainerDashboard from "pages/trainer-dashboard";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<ClientDashboard />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/session-booking" element={<SessionBooking />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/trainer-profile" element={<TrainerProfile />} />
        <Route path="/trainer-discovery" element={<TrainerDiscovery />} />
        <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;