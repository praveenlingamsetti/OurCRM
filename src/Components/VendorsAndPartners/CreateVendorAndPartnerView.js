// YourRouteComponent.js
import React from "react";
import Dashboard from "../Dashboard";
import ContactCreate from "./CreateVendorsAndPartners";
function CreateVendorOrPartnerPage() {
  return <Dashboard contentComponent={ContactCreate} />;
}

export default CreateVendorOrPartnerPage;
