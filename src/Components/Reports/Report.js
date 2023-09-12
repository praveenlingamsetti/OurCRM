import React, { useState } from "react";
import Dashboard from "../Header/Dashboard";
import CustomerReport from "./CustomerReport";
import SalesPersonReport from "./SalesPersonReport";
import OpportunityReport from "./OpportunityReport";
import TaskReport from "./TaskReport";
import "./index.css";

function Report() {
  // Initialize state variables to manage which report to display
  const [isCustomerReport, setIsCustomerReport] = useState(false);
  const [isSalesPersonReport, setIsSalesPersonReport] = useState(false);
  const [isOpportunityReport, setIsOpportunityReport] = useState(false);
  const [isTaskReport, setIsTaskReport] = useState(false);

  // Event handler for displaying the Opportunity Report
  const handleIsOpportunityReport = () => {
    setIsCustomerReport(false);
    setIsSalesPersonReport(false);
    setIsOpportunityReport(true);
    setIsTaskReport(false);
  };

  // Event handler for displaying the Task Report
  const handleIsTaskReport = () => {
    setIsCustomerReport(false);
    setIsSalesPersonReport(false);
    setIsOpportunityReport(false);
    setIsTaskReport(true);
  };

  // Event handler for displaying the Customer Report
  const handleIsCustomerReport = () => {
    setIsCustomerReport(true);
    setIsSalesPersonReport(false);
    setIsOpportunityReport(false);
    setIsTaskReport(false);
  };

  // Event handler for displaying the SalesPerson Report
  const handleIsSalesPersonReport = () => {
    setIsCustomerReport(false);
    setIsSalesPersonReport(true);
    setIsOpportunityReport(false);
    setIsTaskReport(false);
  };
  return (
    <div>
      {/* Render the Dashboard component for navigation */}
      <Dashboard />
      <div className="report-users-container">
        <div className="report-buttons">
          <div className="btns">
            {/* Button to trigger the Opportunity Report */}
            <button
              style={{ backgroundColor: "#1d1a69", height: "60px" }}
              className="reportbtn"
              onClick={handleIsOpportunityReport}
            >
              Opportunity Report
            </button>
            {/* Button to trigger the Task Report */}
            <button
              style={{ backgroundColor: "#1d1a69", height: "60px" }}
              className="reportbtn"
              onClick={handleIsTaskReport}
            >
              Task Report
            </button>
          </div>
          <div className="btns">
            {/* Button to trigger the Customer Report */}
            <button
              style={{ backgroundColor: "#1d1a69", height: "60px" }}
              className="reportbtn"
              onClick={handleIsCustomerReport}
            >
              Customer Report
            </button>
            {/* Button to trigger the SalesPerson Report */}
            <button
              style={{ backgroundColor: "#1d1a69", height: "60px" }}
              className="reportbtn"
              onClick={handleIsSalesPersonReport}
            >
              SalesPerson Report
            </button>
          </div>
        </div>
        {/* Render the Opportunity Report component if isOpportunityReport is true */}
        {isOpportunityReport && <OpportunityReport />}
        {/* Render the Task Report component if isTaskReport is true */}
        {isTaskReport && <TaskReport />}
        {/* Render the Customer Report component if isCustomerReport is true */}
        {isCustomerReport && <CustomerReport />}
        {/* Render the SalesPerson Report component if isSalesPersonReport is true */}
        {isSalesPersonReport && <SalesPersonReport />}
      </div>
    </div>
  );
}

export default Report;
