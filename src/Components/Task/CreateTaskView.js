// YourRouteComponent.js
import React from "react";
import Dashboard from "../Dashboard";
import Res from "./CreateTask";

function CreateTaskPage() {
  return <Dashboard contentComponent={Res} />;
}

export default CreateTaskPage;
