// YourRouteComponent.js
import React from "react";
import Dashboard from "../Dashboard";
import SelectedTask from "./SelectedTask";

function SelectedTaskPage() {
  return <Dashboard contentComponent={SelectedTask} />;
}

export default SelectedTaskPage;
