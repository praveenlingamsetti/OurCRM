// YourRouteComponent.js
import React from "react";
import Dashboard from "../Dashboard";
import AllCustomers from "./Customers";
function AllCustomersPage() {
  return <Dashboard contentComponent={AllCustomers} />;
}

export default AllCustomersPage;
