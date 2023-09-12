// YourRouteComponent.js
import React from "react";
import Dashboard from "../Dashboard";
import AdminDashboardMetrics from "./dashboard";

function AdminDashboardPage() {
  return <Dashboard contentComponent={AdminDashboardMetrics} />;
}

export default AdminDashboardPage;
