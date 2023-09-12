import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Header/Dashboard";
import { DataGrid } from "@mui/x-data-grid";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import api from "../../util/api";
import "./index.css";

function AllUsers() {
  const [dat, setDat] = useState([]);
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const navigate = useNavigate();

  // useEffect hook to fetch user data when the component mounts
  useEffect(() => {
    try {
      // Define a function to fetch users using the 'api' utility
      const fetchUsers = () => {
        api
          .get("/api/getAllUsersNDtos")
          .then((res) => {
            setUsers(res.data);
            // console.log(res.data)
          })
          .catch((err) => console.log(err.message));
      };
      // Call the fetchUsers function when the component mounts
      fetchUsers();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  // Map the user data to a new array, adding an 'id' property
  let data = users.map((item, index) => ({ ...item, id: index + 1 }));

  // Define column configuration for the DataGrid
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
      field: "userName",
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
      field: "mobileNo",
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
      field: "altMobileNo",
      headerName: "Alternate Mobile Number",
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
      field: "role",
      headerName: "Role",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "statusValue",
      headerName: "Status",
      width: 120,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "reportingUsrName",
      headerName: "Reporting To User Name",
      width: 120,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
  ];

  // Function to handle row click and store selected row data
  const onRowHandleClick = (params) => {
    setSelectedRow(params.id);
    setDat(params?.row);
  };

  // Function to toggle the modal visibility
  const viewDetails = () => {
    setIsOpen(!isOpen);
  };
  // Function to close the modal
  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  // Render the component's UI
  return (
    <div>
      <div className="users-container">
        <div className="buttons">
          <button
            style={{ backgroundColor: "#1d1a69" }}
            className="userbtn"
            onClick={() => navigate("/create_user")}
          >
            Create User
          </button>
          <button
            style={{ backgroundColor: "#1d1a69" }}
            className="userbtn"
            onClick={() => {
              selectedRow
                ? navigate("/update_user", { state: dat })
                : alert("Please select one user to update?");
            }}
          >
            Update User
          </button>
        </div>
        <div className="user-container">
          <div>
            <div className="user-headings">
              <h1 className="user-main-heading">All Users</h1>
              <button
                className="user-view-btn"
                onClick={() => {
                  selectedRow
                    ? viewDetails()
                    : alert("please select one user to view?");
                }}
              >
                View
              </button>
            </div>
            <div className="user-table-container">
              {data.length > 0 ? (
                <div className="user-table">
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
          <Modal show={isOpen} onRequestClose={handleClose} className="modal">
            <Modal.Header closeButton onClick={handleClose}>
              <Modal.Title>User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Name </Form.Label>
                <Form.Control type="text" value={dat?.userName} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email Id: </Form.Label>
                <Form.Control type="text" value={dat?.email} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Mobile Number: </Form.Label>
                <Form.Control type="text" value={dat?.mobileNo} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Alternate Mobile Number </Form.Label>
                <Form.Control type="text" value={dat?.altMobileNo} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Role </Form.Label>
                <Form.Control type="text" value={dat?.role} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Status </Form.Label>
                <Form.Control type="text" value={dat?.statusValue} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Reporting To</Form.Label>
                <Form.Control
                  type="text"
                  value={`${dat?.reportingUsrId} -- ${dat?.reportingUsrName}`}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <button
                style={{
                  backgroundColor: "#111359",
                  marginTop: "-7px",
                  color: "white",
                  padding: "3px",
                }}
                variant="primary"
                type="submit"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                close
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default AllUsers;
