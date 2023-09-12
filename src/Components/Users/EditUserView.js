// YourRouteComponent.js
import React from "react";
import Dashboard from "../Dashboard";
import EditUser from "./EditUser";
function EditUserPage() {
  return <Dashboard contentComponent={EditUser} />;
}

export default EditUserPage;
