// YourRouteComponent.js
import React from "react";
import Dashboard from "../Dashboard";
import AllContacts from "./contacts";
function AllContactsPage() {
  return <Dashboard contentComponent={AllContacts} />;
}

export default AllContactsPage;
