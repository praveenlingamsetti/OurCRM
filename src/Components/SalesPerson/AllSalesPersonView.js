// YourRouteComponent.js
import React from "react";
import Dashboard from "../Dashboard";
import SalesPersonData from "./AllSalesPersons";

function AllSalesPersonPage() {
  return <Dashboard contentComponent={SalesPersonData} />;
}

export default AllSalesPersonPage;
