// Import necessary modules and components
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid"; // Import DataGrid component from Material-UI
import api from "../../util/api"; // Import an API utility for making HTTP requests
import "./index.css"; // Import CSS styles
//import Dashboard from "../Header/Dashboard"; // Import the Dashboard component for navigation

function AllOffering() {
  // Define state variables using the useState hook
  const navigate = useNavigate();
  const [dat, setDat] = useState([]);
  const [offeringData, setOfferingData] = useState([]);
  const [offeringList, setOfferingList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedRow, setSelectedRow] = useState("");
  // Use the useEffect hook to fetch data when the component mounts
  useEffect(() => {
    try {
      const fetchUsers = () => {
        // Send a GET request to retrieve offering data from the API
        api
          .get("/OfferingController/get_all_offering")
          .then((res) => {
            // Update state variables with the fetched data
            setOfferingData(res.data);
            setOfferingList(res.data);
            // console.log(res.data)
          })
          .catch((err) => console.log(err.message));
      };
      // Call the fetchUsers function to load offering data
      fetchUsers();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  // Define a function to handle date filtering
  const handleFilter = () => {
    const filtered = offeringList.filter((item) => {
      const itemDate = new Date(item.validTillDate);
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1);
      return itemDate >= start && itemDate < end;
    });
    // set filter data array to setFilterData function
    setOfferingData(filtered);
  };

  // Map and add unique IDs to the offering data for rendering in the table
  let data = offeringData.map((item, index) => ({ ...item, id: index + 1 }));
  // Define columns for the DataGrid component
  const columns = [
    // Define columns with field names, header names, and widths
    {
      width: 60,
      headerClassName: "table-header",
      cellClassName: "table-cell",
      // Render radio buttons in cells to indicate selection
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
      headerName: "Offer Id",
      width: 70,
      cellClassName: "table-cell",
      headerClassName: "table-header",
    },
    {
      field: "offeringCategory",
      headerName: "Offering Category",
      width: 130,
      cellClassName: "table-cell",
      headerClassName: "table-header",
    },
    {
      field: "offeringType",
      headerName: "Offering Type",
      width: 130,
      cellClassName: "table-cell",
      headerClassName: "table-header",
    },
    {
      field: "offeringName",
      headerName: "Offering  Name",
      width: 150,
      cellClassName: "table-cell",
      headerClassName: "table-header",
    },
    {
      field: "ctc",
      headerName: "CTC",
      width: 90,
      cellClassName: "table-cell",
      headerClassName: "table-header",
    },
    {
      field: "ceilingPrice",
      headerName: "Ceiling Price",
      width: 130,
      cellClassName: "table-cell",
      headerClassName: "table-header",
    },
    {
      field: "floorPrice",
      headerName: "Floor Price",
      width: 130,
      cellClassName: "table-cell",
      headerClassName: "table-header",
    },
    {
      field: "currency",
      headerName: "Currency",
      width: 130,
      cellClassName: "table-cell",
      headerClassName: "table-header",
    },
    {
      field: "validTillDate",
      headerName: "Valid Till Date",
      width: 130,
      cellClassName: "table-cell",
      headerClassName: "table-header",
    },
  ];
  const onRowHandleClick = (params) => {
    setSelectedRow(params.id);
    setDat(params?.row);
  };
  // JSX code for rendering the OfferingModule component
  return (
    <div>
      <Dashboard />
      <div className="offerings-container">
        <div className="buttons">
          <button
            style={{ backgroundColor: "#1d1a69" }}
            className="offeringbtn"
            onClick={() => navigate("/create_offering")}
          >
            Create Offering
          </button>
          <button
            style={{ backgroundColor: "#1d1a69" }}
            className="offeringbtn"
            onClick={() => {
              selectedRow
                ? navigate("/update_offering", { state: dat })
                : alert("please select one offering to update?");
            }}
          >
            Update Offering
          </button>
        </div>
        <div className="offering-container">
          <div className="offering-headings">
            <h1 className="offering-main-heading">All Offerings</h1>
          </div>
          <div className="test-report-date-filter">
            <div className="test-report-display-between">
              Start Date:{"   "}
              <input
                type="date"
                className="test-report-date-input"
                onChange={(e) => setStartDate(new Date(e.target.value))}
                max={new Date().toISOString().split("T")[0]}
                style={{ marginLeft: "5px" }}
              />
            </div>
            <div className="test-report-display-between">
              End Date:{" "}
              <input
                type="date"
                className="test-report-date-input"
                onChange={(e) => setEndDate(new Date(e.target.value))}
                style={{ marginLeft: "5px" }}
              />
            </div>
            <button
              style={{
                padding: "1px",
                width: "60px",
                backgroundColor: "#004461",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "5px",
              }}
              onClick={handleFilter}
            >
              Filter
            </button>
          </div>
          {endDate < startDate && endDate && (
            <p className="error">*End Date Should Be Greater Than Start Date</p>
          )}
          <div className="offering-table-container">
            {data.length > 0 ? (
              <div className="offering-table">
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

export default AllOffering;
