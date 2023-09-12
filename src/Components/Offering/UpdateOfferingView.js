// YourRouteComponent.js
import React from "react";
import Dashboard from "../Dashboard";
import UpdateOffering from "./UpdateOffering"; // Import the component you want to render

function UpdateOfferingPage() {
  return <Dashboard contentComponent={UpdateOffering} />;
}

export default UpdateOfferingPage;
