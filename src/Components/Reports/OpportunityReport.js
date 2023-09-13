import React, { useEffect, useState } from "react";
import api from "../../util/api";
import { DataGrid } from "@mui/x-data-grid";
import "./index.css";

function OpportunityReport() {
  // Initialize state variables
  const [opportunityData, setOpportunityData] = useState([]);
  const [opportunityList, setopportunityList] = useState([]);
  const [selectedContact, setSelectedContact] = useState(""); // Stores the selected conatct name
  const [typeData, setTypeData] = useState([]);

  // Fetch customer data from the API when the component mounts
  useEffect(() => {
    try {
      const fetchUsers = () => {
        api
          .get("/app/getAllOpportunities")
          .then((res) => {
            setopportunityList(res.data); // Extract customer names from data
            console.log(res.data);
          })
          .catch((err) => console.log(err.message));
      };
      fetchUsers();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  // Event handler for fetching opportunity data for the selected contact
  const handleOpportunity = async () => {
    try {
      const firstApiUrl = `app/getopportunityByContactSubId/${selectedContact}`;
      const authToken = localStorage.getItem("token");

      // Fetch the first API data
      const response1 = await fetch(firstApiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data1 = await response1.json();
      setOpportunityData(data1);

      const secondData = [];

      for (let i of data1) {
        const secondApiUrl = `/app/getAllOpportunitySubByOpportunity/${i.opportunityId}`;

        // Fetch the second API data for each item from the first API
        const response2 = await fetch(secondApiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data2 = await response2.json();

        // Handle the response from the server here
        secondData.push(data2[0]?.status?.statusValue);
      }

      // Process the secondData array after all second API calls are completed
      console.log(secondData);

      // Flatten the secondData array if needed
      const flatData = secondData.flat();
      console.log(flatData);

      // Update the state variable with the collected data
      setTypeData(flatData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const contactNames = opportunityList.map((item) => [
    item?.contactSub?.contactSubId,
    item?.contactSub?.contactId?.firstName +
      " " +
      item?.contactSub?.contactId?.lastName,
  ]);
  const data = opportunityData.map((item, index) => ({
    ...item,
    id: index + 1,
    contactName:
      item?.contactSub?.contactId?.firstName +
      " " +
      item?.contactSub?.contactId?.lastName,
    offeringName: item?.offering?.offeringName,
    opportunityType: typeData[index],
  }));
  console.log(data);
  console.log(typeData);
  // Configuration for columns in the DataGrid
  const columns = [
    {
      field: "id",
      headerName: "S.No",
      width: 60,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "opportunityName",
      headerName: "Opportunity Name",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "opportunitySize",
      headerName: "Opportunity Size",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
      renderCell: (params) => (
        <div
          style={{
            wordBreak: "break-word",
            whiteSpace: "wrap",
            lineHeight: "1",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "contactName",
      headerName: "Contact Name",
      width: 200,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "offeringName",
      headerName: "Offering Name",
      width: 200,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "opportunityType",
      headerName: "Opportunity Type",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
  ];

  return (
    <div className="customer-report">
      <h3>Opportunity Report</h3>
      <div className="select-container">
        <select
          className="select"
          value={selectedContact}
          onChange={(e) => setSelectedContact(e.target.value)}
        >
          <option key="nam">Select Name</option>
          {contactNames.map((item, index) => (
            <option value={item[0]} key={index}>
              {item[0]} -- {item[1]}
            </option>
          ))}
        </select>
        <button className="icon" type="button" onClick={handleOpportunity}>
          <i class="fa fa-search" aria-hidden="true"></i>{" "}
          {/* Using class instead of className for font-awesome icon */}
        </button>
      </div>
      {opportunityData.length !== 0 && (
        <div className="user-table-container">
          <h3>Opportunity List</h3>
          {data.length > 0 ? (
            <div className="user-table">
              <DataGrid rows={data} columns={columns} />
            </div>
          ) : (
            "No Data Found"
          )}
        </div>
      )}
    </div>
  );
}

export default OpportunityReport;
