// YourRouteComponent.js
import React from "react";
import Dashboard from "../Dashboard";
import AllOpportunities from "./AllOpportunity";
function AllOpportunitiesPage() {
  return <Dashboard contentComponent={AllOpportunities} />;
}

export default AllOpportunitiesPage;
