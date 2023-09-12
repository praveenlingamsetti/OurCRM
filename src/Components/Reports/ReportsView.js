// YourRouteComponent.js
import React from "react";
import Dashboard from "../Dashboard";
import Report from "./Report";
function ReportPage() {
  return <Dashboard contentComponent={Report} />;
}

export default ReportPage;
