// YourRouteComponent.js
import React from "react";
import Dashboard from "../Dashboard";
import UpdateSalesPerson from "./UpdateSalesPerson";

function UpdateSalesPersonPage() {
  return <Dashboard contentComponent={UpdateSalesPerson} />;
}

export default UpdateSalesPersonPage;
