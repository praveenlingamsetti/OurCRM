// YourRouteComponent.js
import React from "react";
import Dashboard from "../Dashboard";
import UpdateContact from "./UpdateContact";
function UpdateContactPage() {
  return <Dashboard contentComponent={UpdateContact} />;
}

export default UpdateContactPage;
