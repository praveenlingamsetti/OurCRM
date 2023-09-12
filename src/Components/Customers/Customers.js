import React, { useState, useEffect } from "react";
import api from "../../util/api";
//import Dashboard from "../Header/Dashboard";
import { DataGrid } from "@mui/x-data-grid";
import "./index.css";

function AllCustomers() {
  const [allCustomers, setAllCustomers] = useState([]);

  useEffect(() => {
    try {
      const fetchUsers = () => {
        api
          .get("/app/getAllCustomers")
          .then((res) => {
            setAllCustomers(res.data);
            console.log(res.data);
          })
          .catch((err) => console.log(err.message));
      };
      fetchUsers();
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  const data = allCustomers.map((item, index) => ({ ...item, id: index + 1 }));

  const columns = [
    {
      field: "id",
      headerName: "S.No",
      width: 60,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "customerDate",
      headerName: "Customer Date",
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
      field: "opportunityName",
      headerName: "Opportunity Name",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
      renderCell: (params) => (
        <div style={{ whiteSpace: "wrap", lineHeight: "1" }}>
          {params.value}
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* <Dashboard /> */}
      <div className="customer-container">
        <div className="customer-headings">
          <h1 className="customer-main-heading">All Customers</h1>
        </div>
        <div className="customer-table-container">
          {data?.length > 0 ? (
            <div className="customer-table">
              <DataGrid rows={data} columns={columns} />
            </div>
          ) : (
            "No Data Found"
          )}
        </div>
      </div>
    </div>
  );
}

export default AllCustomers;
