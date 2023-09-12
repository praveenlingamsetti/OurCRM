// YourRouteComponent.js
import React from "react";
import Dashboard from "../Dashboard";
import UpdateOppSub from "./UpdateSubOpportunity";

function UpdateOppSubPage() {
  return <Dashboard contentComponent={UpdateOppSub} />;
}

export default UpdateOppSubPage;
