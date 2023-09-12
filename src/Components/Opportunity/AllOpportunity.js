import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Dashboard from "../Header/Dashboard";
import api from "../../util/api";
import "./index.css";

function AllOpportunities() {
  // React hooks to manage state and navigation
  const navigate = useNavigate();
  const [opportunitiesData, setOpportunitiesData] = useState([]);
  const [selectedRow, setSelectedRow] = useState("");

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    try {
      // Function to fetch opportunities data from an API
      const fetchUsers = () => {
        api
          .get("/app/getAllOpportunities")
          .then((res) => {
            setOpportunitiesData(res.data);
            // console.log(res.data)
          })
          .catch((err) => console.log(err.message));
      };
      // Call the fetchOpportunities function
      fetchUsers();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const data = opportunitiesData.map((item, index) => ({
    ...item,
    id: index + 1,
    contactName:
      item?.contactSub?.contactId?.firstName +
      " " +
      item?.contactSub?.contactId?.lastName,
    opportunityType: item?.status?.statusValue,
    contactEmail: item?.contactSub?.contactId?.email,
    offeringName: item?.offering?.offeringName,
    offeringValidDate: item?.offering?.validTillDate,
  }));
  // Configuration for columns in the DataGrid
  const columns = [
    {
      width: 60,
      headerClassName: "table-header",
      cellClassName: "table-cell",
      renderCell: (params) => (
        <input
          name="poo"
          type="radio"
          checked={params.row.id === selectedRow}
          className="button1"
        />
      ),
    },
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
      field: "contactEmail",
      headerName: "Contact Email",
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
      field: "offeringValidDate",
      headerName: "Offering Valid Date",
      width: 120,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
  ];

  const onRowHandleClick = (params) => {
    setSelectedRow(params.id);
    localStorage.setItem("oppId", params?.row?.opportunityId);
  };

  return (
    <div>
      <Dashboard />
      <div className="opportunities-container">
        <div className="buttons">
          <button
            className="sub-btn"
            onClick={() => {
              selectedRow
                ? navigate("/all_subopportunities")
                : alert(
                    "please select one opportunity to see subopportunities?"
                  );
            }}
          >
            All Sub Opportunities
          </button>
        </div>
        <div className="opportunity-container">
          <h1 className="opportunity-main-heading">All Opportunities</h1>
          <div style={{ height: "400px" }}>
            {data.length > 0 ? (
              <div className="opportunity-table">
                <DataGrid
                  rows={data}
                  columns={columns}
                  onRowClick={onRowHandleClick}
                />
              </div>
            ) : (
              "No Data Found"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllOpportunities;
