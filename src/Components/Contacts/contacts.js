// Import necessary modules and components
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid"; // Import DataGrid component from Material-UI
//import Dashboard from "../Header/Dashboard";
import { useNavigate } from "react-router-dom";
// Import CSS styles for the component
import "./index.css";

// Define a functional component called AllContacts
function AllContacts() {
  const navigate = useNavigate();
  // Initialize state variables using the useState hook
  const [dat, setDat] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [selectedRow, setSelectedRow] = useState("");

  // useEffect hook to perform side effects when the component mounts
  useEffect(() => {
    // Call the getAllContacts function when the component mounts
    getAllContacts();
  }, []);

  // Function to fetch all contacts from the server
  const getAllContacts = () => {
    const apiUrl = "/ContactController/get_all_contact";
    const authToken = localStorage.getItem("token");
    // Replace this with your actual authentication token
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`, // Adding the authentication header
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server here
        setContactData(data);
        // console.log(data);
      })
      .catch((error) => {
        // Handle any error that occurred during the fetch request
        console.error("Error:", error);
      });
  };

  // Map contactData to a new array with additional fields
  let data = contactData.map((item, index) => ({
    ...item,
    id: index + 1,
    name: item.firstName + " " + item.lastName,
    sourceVal:
      item.otherSourcetype === null ? item.source : item.otherSourcetype,
  }));

  // Define columns for the DataGrid component
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
      field: "name",
      headerName: "User Name",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "email",
      headerName: "Email",
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
      field: "mobileNumber",
      headerName: "Mobile Number",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
      renderCell: (params) => (
        <div style={{ whiteSpace: "wrap", lineHeight: "1" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "address",
      headerName: "Address",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
      renderCell: (params) => (
        <div style={{ whiteSpace: "wrap", lineHeight: "1" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "company",
      headerName: "Company",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "country",
      headerName: "Country",
      width: 120,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "sourceVal",
      headerName: "Source",
      width: 120,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "contactDepartment",
      headerName: "Contact Department",
      width: 120,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "contactDesignation",
      headerName: "Contact Designation",
      width: 120,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "websiteURL",
      headerName: "Website URL",
      width: 120,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "socialMediaLink",
      headerName: "Social Media Link",
      width: 120,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "date",
      headerName: "Date",
      width: 120,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "contactCreatedByName",
      headerName: "Contact Created By",
      width: 120,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
  ];

  // Function to handle row click event
  const onRowHandleClick = (params) => {
    setSelectedRow(params.id);
    setDat(params?.row);
  };

  // Render the component's JSX content
  return (
    <div>
      <div className="contacts-container">
        <div className="buttons">
          <button
            style={{ backgroundColor: "#1d1a69" }}
            className="contactbtn"
            onClick={() => navigate("/create_contact")}
          >
            Create Contact
          </button>
          <button
            style={{ backgroundColor: "#1d1a69" }}
            className="contactbtn"
            onClick={() => {
              selectedRow
                ? navigate("/update_contact", { state: dat })
                : alert("Please select one contact to update?");
            }}
          >
            Update Contact
          </button>
        </div>
        <div className="contact-container">
          <div className="contact-headings">
            <h1 className="contact-main-heading">All Contacts</h1>
          </div>
          <div className="contact-table-container">
            {data.length > 0 ? (
              <div className="contact-table">
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

export default AllContacts;
