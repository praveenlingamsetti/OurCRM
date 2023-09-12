// YourRouteComponent.js
import React from "react";
import Dashboard from "../Dashboard";
import OpportunitySubList from "./AllSubOpportunity"; // Import the component you want to render

function OpportunitySubListPage() {
  return <Dashboard contentComponent={OpportunitySubList} />;
}

export default OpportunitySubListPage;
