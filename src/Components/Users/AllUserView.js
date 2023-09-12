// YourRouteComponent.js
import React from "react";
import Dashboard from "../Dashboard";
import AllUsers from "./AllUsers";
function AllUsersPage() {
  return <Dashboard contentComponent={AllUsers} />;
}

export default AllUsersPage;
