// YourRouteComponent.js
import React from "react";
import Dashboard from "../Dashboard";
import Offering from "./CreateOffering";

function CreateOfferingPage() {
  return <Dashboard contentComponent={Offering} />;
}

export default CreateOfferingPage;
