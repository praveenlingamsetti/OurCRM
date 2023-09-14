// YourRouteComponent.js
import React from "react";
import SelectedTask from "../../Task/SelectedTask";
import Dashboard from "../../Dashboard";
function SalesPersonSelectedTaskPage() {
  return <Dashboard contentComponent={SelectedTask} />;
}

export default SalesPersonSelectedTaskPage;
