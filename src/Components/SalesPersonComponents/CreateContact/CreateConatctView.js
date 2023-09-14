// YourRouteComponent.js
import React from "react";
import CreateContact from "./index";
import Dashboard from "../../Dashboard";
function CreateContactBySP() {
  return <Dashboard contentComponent={CreateContact} />;
}

export default CreateContactBySP;
