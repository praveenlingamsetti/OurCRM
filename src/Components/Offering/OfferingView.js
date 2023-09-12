// YourRouteComponent.js
import React from "react";
import Dashboard from "../Dashboard";
import AllOffering from "./Offering"; // Import the component you want to render

function AllOfferingPage() {
  return <Dashboard contentComponent={AllOffering} />;
}

export default AllOfferingPage;
