// YourRouteComponent.js
import React from "react";
import Dashboard from "../Dashboard";
import ContactForm from "./CreateContact";
function CreateContactPage() {
  return <Dashboard contentComponent={ContactForm} />;
}

export default CreateContactPage;
