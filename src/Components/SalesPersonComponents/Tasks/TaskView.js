// YourRouteComponent.js
import React from "react";
import SalesPersonTasks from "./Tasks";
import Dashboard from "../../Dashboard";
function SalesPersonTasksPage() {
  return <Dashboard contentComponent={SalesPersonTasks} />;
}

export default SalesPersonTasksPage;
