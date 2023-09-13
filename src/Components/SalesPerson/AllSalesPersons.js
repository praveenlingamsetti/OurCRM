import { useState, useEffect } from "react";
import api from "../../util/api";
//import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
//import Dashboard from "../Header/Dashboard";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import "./index.css";

const SalesPersonData = () => {
  // Define and initialize state variables
  const navigate = useNavigate();
  const [dat, setDat] = useState([]);
  const [SalesPeronData, SetSalesPersonData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");

  // useEffect hook runs when the component is mounted
  useEffect(() => {
    try {
      // Function to fetch all salesperson data from an API
      const fetchUsers = () => {
        api
          .get("/app/getAllSalesPerson")
          .then((res) => {
            SetSalesPersonData(res.data);
            // console.log(res.data)
          })
          .catch((err) => console.log(err.message));
      };
      fetchUsers();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  // Map salesperson data to a format suitable for the data grid
  const data = SalesPeronData?.map((item, index) => ({
    ...item,
    id: index + 1,
    UserName: item.user.userName,
    Email: item.user.email,
    MobileNumber: item.user.mobileNo,
    AltMobileNumber: item.user.altMobileNo,
  }));

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
      headerName: "SalesPerson Id",
      width: 70,
      cellClassName: "table-cell",
      headerClassName: "table-header",
    },
    {
      field: "UserName",
      headerName: "UserName",
      width: 130,
      cellClassName: "table-cell",
      headerClassName: "table-header",
    },
    {
      field: "Email",
      headerName: "Email",
      width: 150,
      cellClassName: "table-cell",
      headerClassName: "table-header",
    },
    {
      field: "MobileNumber",
      headerName: "MobileNumber",
      width: 90,
      cellClassName: "table-cell",
      headerClassName: "table-header",
    },
    {
      field: "AltMobileNumber",
      headerName: "AltMobileNumber",
      width: 130,
      cellClassName: "table-cell",
      headerClassName: "table-header",
    },
    {
      field: "maxTarget",
      headerName: "Max Target",
      width: 130,
      cellClassName: "table-cell",
      headerClassName: "table-header",
    },
    {
      field: "frequency",
      headerName: "Frequency",
      width: 130,
      cellClassName: "table-cell",
      headerClassName: "table-header",
    },
    {
      field: "threshold",
      headerName: "Threshold",
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
      field: "duration",
      headerName: "Duration",
      width: 130,
      cellClassName: "table-cell",
      headerClassName: "table-header",
    },
  ];
  // Function to handle row click event
  const onRowHandleClick = (params) => {
    setSelectedRow(params.id);
    setDat(params?.row);
  };

  console.log(selectedRow);
  // Function to toggle modal visibility
  const viewDetails = () => {
    setIsOpen(!isOpen);
  };
  // Function to close the modal
  const handleClose = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div className="users-container">
        <div className="buttons">
          <button
            style={{ backgroundColor: "#1d1a69" }}
            className="salesPersonbtn"
            onClick={() => {
              selectedRow
                ? navigate("/update_salesperson", { state: dat })
                : alert("Please select one salesperson to update?");
            }}
          >
            Update SalesPerson
          </button>
        </div>
        <div className="salesperson-container">
          <div>
            <div className="salesperson-headings">
              <h1 className="salesperson-main-heading">All SalesPersons</h1>
              <button
                className="salesperson-view-btn"
                onClick={() => {
                  selectedRow
                    ? viewDetails()
                    : alert("please select one salesperson to view?");
                }}
              >
                View
              </button>
            </div>
            <div className="salesperson-table-container">
              {data.length > 0 ? (
                <div className="salesperson-table">
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
              <Modal.Title>SalesPerson Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Name </Form.Label>
                <Form.Control type="text" value={dat?.UserName} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email Id: </Form.Label>
                <Form.Control type="text" value={dat?.Email} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Mobile Number: </Form.Label>
                <Form.Control type="text" value={dat?.MobileNumber} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Alternate Mobile Number </Form.Label>
                <Form.Control type="text" value={dat?.AltMobileNumber} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Max Target </Form.Label>
                <Form.Control type="text" value={dat?.maxTarget} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Threshold </Form.Label>
                <Form.Control type="text" value={dat?.threshold} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Frequency </Form.Label>
                <Form.Control type="text" value={dat?.frequency} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Currency </Form.Label>
                <Form.Control type="text" value={dat?.currency} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Duraction in Months </Form.Label>
                <Form.Control type="text" value={dat?.duration} />
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
};
export default SalesPersonData;
