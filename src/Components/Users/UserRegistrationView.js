// YourRouteComponent.js
import React from "react";
import Dashboard from "../Dashboard";
import UserRegister from "./UserRegistration";

function UserRegisterPage() {
  return <Dashboard contentComponent={UserRegister} />;
}

export default UserRegisterPage;
