// YourRouteComponent.js
import React from "react";
import Dashboard from "../Dashboard";
import AllTasks from "./AllTasks"; // Import the component you want to render

function AllTaskPage() {
  return <Dashboard contentComponent={AllTasks} />;
}

export default AllTaskPage;
