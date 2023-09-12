// YourRouteComponent.js
import React from "react";
import Dashboard from "../Dashboard";
import UpdateContact from "../Contacts/UpdateContact";
function UpdateVendorOrPartnerPage() {
  return <Dashboard contentComponent={UpdateContact} />;
}

export default UpdateVendorOrPartnerPage;
