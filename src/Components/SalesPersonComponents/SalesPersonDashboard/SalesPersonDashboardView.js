// YourRouteComponent.js
import React from "react";
import Dashboard from "../../Dashboard";
import SalesPersonDashboardMetrics from "./Dashboard";
function SalesPersonDashboardPage() {
  return <Dashboard contentComponent={SalesPersonDashboardMetrics} />;
}

export default SalesPersonDashboardPage;
