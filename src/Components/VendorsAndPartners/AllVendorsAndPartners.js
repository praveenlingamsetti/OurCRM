import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../util/api";
import { DataGrid } from "@mui/x-data-grid";

import toast from "react-hot-toast";
import "./index.css";

function AllVendorsPartners() {
  const navigate = useNavigate();
  // Define and initialize state variables using the useState hook
  const [dat, setDat] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [contactId, setContactId] = useState(null);
  const [selectedRow, setSelectedRow] = useState("");

  // Function to handle contact deletion
  const deleteHandler = () => {
    if (window.confirm("Are you sure you want to delete the contact?")) {
      // Send a delete request to the API to remove the contact
      api
        .delete(`/app/vendorpartners/deletevendorpartner/${contactId}`)
        .then((res) => {
          toast.success("Contact deleted successfully");
          window.location.reload();
        })
        .catch((err) => toast.error("Error while deleting, Please try again!"));
    }
  };
  // useEffect hook to fetch contact data when the component mounts
  useEffect(() => {
    api
      .get(`/app/vendorpartners/getallvendorpartner`)
      .then((res) => {
        // console.log(res.data);
        setContacts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Map contact data to the desired format for rendering in the DataGrid
  const data = contacts.map((item, index) => ({
    ...item,
    id: index + 1,
    name: item?.firstName + " " + item?.lastName,
  }));

  // Define the columns configuration for the DataGrid
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
      headerName: "Name",
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
      field: "department",
      headerName: "Department",
      width: 120,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "designation",
      headerName: "Designation",
      width: 120,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "type",
      headerName: "Contact Type",
      width: 120,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "vendorType",
      headerName: "Vendor Type",
      width: 120,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "vendorDescription",
      headerName: "Vendor Description",
      width: 120,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "partnerType",
      headerName: "Partner Type",
      width: 120,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "partnerSkills",
      headerName: "Partner Skills",
      width: 120,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "partnerDescription",
      headerName: "Partner Description",
      width: 120,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
  ];

  // Function to handle row click events
  const onRowHandleClick = (params) => {
    // console.log(params.row)
    setSelectedRow(params.id);
    setDat(params?.row);
    setContactId(params?.row?.vendorPartnerId);
  };
  return (
    <div>
      <Dashboard />
      <div className="vendors-container">
        <div className="buttons">
          <button
            style={{ backgroundColor: "#1d1a69", height: "60px" }}
            className="vendorbtn"
            onClick={() => navigate("/create_vendor_partner")}
          >
            Create Vendor/Partner
          </button>
          <button
            style={{ backgroundColor: "#1d1a69", height: "60px" }}
            className="vendorbtn"
            onClick={() => {
              selectedRow
                ? navigate("/update_vendor_partner", { state: dat })
                : alert("Please select one vendor/partner to update?");
            }}
          >
            Update Vendor/Partner
          </button>
        </div>
        <div className="vendor-container">
          <div>
            <div className="vendor-headings">
              <h1 className="vendor-main-heading">All Vendors/Partners</h1>
              <button
                className="vendor-delete-btn"
                onClick={() => {
                  selectedRow
                    ? deleteHandler()
                    : alert("Please select one to delete!");
                }}
              >
                Delete
              </button>
            </div>
            <div className="vendor-table-container">
              {data.length > 0 ? (
                <div className="vendor-table">
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
    </div>
  );
}

export default AllVendorsPartners;
