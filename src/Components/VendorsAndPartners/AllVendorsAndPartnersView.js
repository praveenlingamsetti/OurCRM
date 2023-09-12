// YourRouteComponent.js
import React from "react";
import Dashboard from "../Dashboard";
import AllVendorsPartners from "./AllVendorsAndPartners";
function AllVendorsAndPartnersPage() {
  return <Dashboard contentComponent={AllVendorsPartners} />;
}

export default AllVendorsAndPartnersPage;
