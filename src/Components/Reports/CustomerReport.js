import React, { useState, useEffect } from "react";
import api from "../../util/api";

function CustomerReport() {
  // Initialize state variables
  const [customersData, setCustomersData] = useState([]); // Stores all customer data
  const [customersList, setCustomersList] = useState([]); // Stores a list of customer names
  const [opportunityId, setOpportunityId] = useState(""); // Stores the selected opportunity ID
  const [selectedCustomer, setSelectedCustomer] = useState(""); // Stores the selected customer name
  const [customer, setCustomer] = useState([]); // Stores customer data
  const [opportunity, setOpportunity] = useState([]); // Stores opportunity data

  // Fetch customer data from the API when the component mounts
  useEffect(() => {
    try {
      const fetchUsers = () => {
        api
          .get("/app/getAllCustomers")
          .then((res) => {
            setCustomersData(res.data);
            setCustomersList(res.data); // Extract customer names from data
          })
          .catch((err) => console.log(err.message));
      };
      fetchUsers();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const customerNames = customersList.map((item) => item?.customerId);

  // Event handler for selecting a customer from the dropdown
  const handleChange = (e) => {
    const customerId = e.target.value;
    try {
      const fetchUsers = () => {
        api
          .get(`app/getCustomer/${customerId}`)
          .then((res) => {
            setOpportunityId(res?.data?.opportunityId);
            setCustomer(res?.data[0]); // Store selected customer data
          })
          .catch((err) => console.log(err.message));
      };
      fetchUsers();
    } catch (error) {
      console.log(error.message);
    }
  };

  // Event handler for fetching opportunity data for the selected customer
  const handleCustomer = () => {
    try {
      const fetchUsers = () => {
        api
          .get(`/app/${opportunityId}`)
          .then((res) => {
            setOpportunity(res?.data[0]); // Store opportunity data
            // console.log(res.data)
          })
          .catch((err) => console.log(err.message));
      };
      fetchUsers();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="customer-report">
      <h3>Customer Report</h3>
      <div className="select-container">
        <select
          className="select"
          value={selectedCustomer}
          onChange={handleChange}
        >
          <option key="nam">Select Name</option>
          {customerNames.map((item, index) => (
            <option key={index}>{item}</option>
          ))}
        </select>
        <button className="icon" type="button" onClick={handleCustomer}>
          <i class="fa fa-search" aria-hidden="true"></i>{" "}
          {/* Using class instead of className for font-awesome icon */}
        </button>
      </div>
      {opportunity.length !== 0 && (
        <div className="customer-card-container">
          <div>
            <p>Customer Name</p>
            <p>{customer?.customerId}</p>
          </div>
          <div>
            <p>Opportunity Name</p>
            <p>{opportunity?.opportunityName}</p>
          </div>
          <div>
            <p>Opportunity Size</p>
            <p>{opportunity?.opportunitySize}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerReport;
