import React, { useState, useEffect } from "react";
import { GrFormClose } from "react-icons/gr"; // Importing an icon component
import Box from "@mui/material/Box";
import Modal from "@mui/joy/Modal";
import { DataGrid } from "@mui/x-data-grid";
import Form from "react-bootstrap/Form";
import api from "../../../util/api"; // API utility functions
import "./index.css"; // Custom CSS styles
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Styling for the modal
const style = {
  position: "absolute",
  height: 500,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function SalesPersonTasks() {
  const navigate = useNavigate();
  // State variables initialization
  const [dat, setDat] = useState([]);
  const [taskId, setTaskId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [dataa, setDataa] = useState(null);
  const salesPersonId = localStorage.getItem("salesPersonId");
  const [tasksData, setTasksData] = useState([]);
  const [data, setData] = useState([]);
  const [latestTaskStatus, setLatestTaskStatus] = useState([]);
  const [allStatus, setAllStatus] = useState([]);
  const [layout, setLayout] = React.useState(undefined);
  const [activeDropDownStatus, setActiveDropDownStatus] = useState("");
  const [allActiveStatus, setAllActiveStatus] = useState([]);
  const [selectedRow, setSelectedRow] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // useEffect to fetch tasks based on the selected status
  useEffect(() => {
    // Fetch data when the activeDropDownStatus changes
    if (activeDropDownStatus !== "") {
      fetch(
        `task/getAllTaskBySalespersonIdAndStatus/${salesPersonId}/${activeDropDownStatus}`
      )
        .then((response) => response.json())
        .then((data) => {
          const dataWithIds = data.map((item, index) => ({
            ...item,
            id: index + 1,
          }));
          filteringRequiredData(dataWithIds);
        })
        .catch((error) => {
          if (error.response.status === 503 || error.response.status === 500) {
            toast.error("Server is busy. Please try again after sometime.");
          }
        });
    } else {
      // If activeDropDownStatus is empty, fetch all tasks
      getAllTasks();
    }
  }, [activeDropDownStatus]);
  console.log(salesPersonId);
  // Function to fetch all tasks for the salesperson
  const getAllTasks = () => {
    try {
      const fetchUsers = () => {
        api
          .get(`task/getAllTaskBySalesPersonId/${salesPersonId}`) // this url is for all fetching all the tasks assigned for sales person
          .then((res) => {
            setTasksData(res.data);
            // console.log(res.data)
          })
          .catch((err) => {
            if (err.response.status === 503 || err.response.status === 500) {
              toast.error("Server is busy. Please try again after sometime.");
            }
          });
      };
      fetchUsers();
    } catch (error) {
      if (error.response.status === 503 || error.response.status === 500) {
        toast.error("Server is busy. Please try again after sometime.");
      }
    }
  };
  // Function to fetch all active statuses
  const getAllActiveStatus = async () => {
    const apiUrl = `/app/statuses/Task_Status/Task`;
    const authToken = localStorage.getItem("token");
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAllActiveStatus(data);
    } catch (error) {
      if (error.response.status === 503 || error.response.status === 500) {
        toast.error("Server is busy. Please try again after sometime.");
      }
    }
  };

  useEffect(() => {
    getAllActiveStatus();
  }, []);
  // Function to handle filtering tasks based on date range
  const handleFilter = () => {
    const filtered = tasksData.filter((item) => {
      const itemDate = new Date(item.startDate);
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1);
      return itemDate >= start && itemDate < end;
    });
    filteringRequiredData(filtered);
  };

  // Function to filter and format the data for display
  const filteringRequiredData = (dataa) => {
    const requiredData = dataa.map((item, index) => ({
      ...item,
      id: index + 1,
      salesPersonName: item?.salesPerson?.user?.userName,
      assignedManager: item?.assignedManager?.userName,
      contactName:
        item?.contactSub?.contactId?.firstName +
        " " +
        item?.contactSub?.contactId?.lastName,
    }));
    setData(requiredData);
  };

  useEffect(() => {
    if (tasksData.length > 0) {
      filteringRequiredData(tasksData);
    }
  }, [tasksData]);

  // Function to fetch all statuses for a task
  const getAllStatusByTask = async (id) => {
    if (id === undefined) return;
    const apiUrl = `/task/getAllTaskStatusByTaskId/${id}`;
    const authToken = localStorage.getItem("token");
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAllStatus(data.reverse());
      setLayout("center");
    } catch (error) {
      if (error.response.status === 503 || error.response.status === 500) {
        toast.error("Server is busy. Please try again after sometime.");
      }
    }
  };
  // Function to fetch the latest status of a task
  const latestStatusByTask = async (taskId) => {
    if (!taskId) {
      return null;
    }
    const apiUrl = `/task/getLatestTaskStatusByTaskId/${taskId}`;
    const authToken = localStorage.getItem("token");
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data; // Return the fetched data
    } catch (error) {
      if (error.response.status === 503 || error.response.status === 500) {
        toast.error("Server is busy. Please try again after sometime.");
      }
      throw new Error(
        "Failed to fetch latest task status. Please try again later."
      );
    }
  };
  // Columns configuration for the DataGrid
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
      field: "salesPersonName",
      headerName: "SalesPerson Name",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "taskDescription",
      headerName: "Task Description",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "contactName",
      headerName: "Contact Name",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "assignedManager",
      headerName: "Assigned Manager",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
  ];
  // Function to handle row click in the DataGrid
  const onRowHandleClick = (params) => {
    setSelectedRow(params.id);
    setTaskId(params?.row?.taskId);
    setDat(params?.row);
    localStorage.setItem(
      "contactId",
      params?.row?.contactSub?.contactId?.contactId
    );
    setTimeout(() => {
      latestStatusByTask(params.row.taskId)
        .then((latestStatusData) => {
          setLatestTaskStatus(latestStatusData);
          // console.log(latestStatusData)
        })
        .catch((error) => {
          console.error("Error fetching latest task status:", error);
          if (error.response.status === 503 || error.response.status === 500) {
            toast.error("Server is busy. Please try again after sometime.");
          }
        });
    }, 1000);
  };
  // Function to view contact details in a modal
  const viewDetails = () => {
    let contactId = localStorage.getItem("contactId");
    if (taskId) {
      api
        .get(`ContactController/get_contact_by_contactId/${contactId}`)
        .then((res) => {
          setDataa(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          if (err.response.status === 503 || err.response.status === 500) {
            toast.error("Server is busy. Please try again after sometime.");
          }
        });
      setIsOpen(!isOpen);
    } else {
      alert("Please select one task to view contact details?");
    }
  };
  const handleClose = () => {
    setIsOpen(!isOpen);
  };
  const viewStatus = () => {
    if (taskId) {
      navigate("/sales-person-selected-task", {
        state: {
          dat: dat,
          id: taskId,
        },
      });
    } else {
      alert("Please select one task to view status?");
    }
  };
  console.log(dataa);
  // dataa['lifecyclestage']=dataa?.lifeCycleStage[0]?.lifeCycleStage

  return (
    <div>
      <div className="salesperson-task-container">
        <div className="salesperson-task-headings">
          <h1 className="salesperson-task-main-heading">All Tasks</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <button className="salesperson-view-button" onClick={viewStatus}>
              Status
            </button>
            <button className="salesperson-view-button" onClick={viewDetails}>
              View
            </button>
          </div>
        </div>
        <br />
        <div className="test-report-date-filter">
          <select
            className="status-select"
            value={activeDropDownStatus}
            onChange={(e) => setActiveDropDownStatus(e.target.value)}
            required
          >
            <option value="">Active Status</option>
            {allActiveStatus.map((status, index) => (
              <option className="" key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
          <div></div>
          <div className="test-report-display-between">
            Start Date:{"   "}
            <input
              type="date"
              // value={startDate}
              className="test-report-date-input"
              onChange={(e) => setStartDate(new Date(e.target.value))}
              max={new Date().toISOString().split("T")[0]}
              style={{ marginLeft: "10px" }}
            />
          </div>
          <div className="test-report-display-between">
            End Date:{" "}
            <input
              type="date"
              // value={endDate}
              className="test-report-date-input"
              onChange={(e) => setEndDate(new Date(e.target.value))}
              max={new Date().toISOString().split("T")[0]}
              style={{ marginLeft: "10px" }}
            />
          </div>
          <button
            style={{
              padding: "3px",
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
        {/* below condition is for displayng the errot message if the enddate is less than the start date */}
        {endDate < startDate && endDate && (
          <p className="error">*End Date Should Be Greater Than Start Date</p>
        )}
        <div style={{ width: "90%", height: "400px", margin: "auto" }}>
          {data.length > 0 ? (
            <div className="table">
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
      {/*  Call handleClose when the modal is closed  */}
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p style={{ textAlign: "right" }} onClick={handleClose}>
            <GrFormClose size={20} />
          </p>
          <Form.Group>
            <Form.Label>Name </Form.Label>
            <Form.Control
              readOnly
              type="text"
              value={dataa?.firstName + " " + dataa?.lastName}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email Id </Form.Label>
            <Form.Control readOnly type="text" value={dataa?.email} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mobile Number </Form.Label>
            <Form.Control readOnly type="text" value={dataa?.mobileNumber} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Company </Form.Label>
            <Form.Control readOnly type="text" value={dataa?.company} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Designation </Form.Label>
            <Form.Control
              readOnly
              type="text"
              value={dataa?.contactDesignation}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Department </Form.Label>
            <Form.Control
              readOnly
              type="text"
              value={dataa?.contactDepartment}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address </Form.Label>
            <Form.Control readOnly type="text" value={dataa?.address} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Country </Form.Label>
            <Form.Control readOnly type="text" value={dataa?.country} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Website URL </Form.Label>
            <Form.Control readOnly type="text" value={dataa?.websiteURL} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Social Media Link</Form.Label>
            <Form.Control readOnly type="text" value={dataa?.socialMediaLink} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contact Created By</Form.Label>
            <Form.Control
              readOnly
              type="text"
              value={dataa?.contactCreatedByName}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Source</Form.Label>
            <Form.Control
              type="text"
              readOnly
              value={
                dataa?.otherSourcetype === null
                  ? dataa?.source
                  : dataa?.otherSourcetype
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>LifeCycle Stage</Form.Label>
            <Form.Control
              type="text"
              value={dataa && dataa["lifeCycleStage"][0]["lifeCycleStage"]}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control readOnly type="text" value={dataa?.date} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Stage Date</Form.Label>

            <Form.Control
              readOnly
              type="text"
              value={dataa && dataa["lifeCycleStage"][0]["stageDate"]}
            />
          </Form.Group>
        </Box>
      </Modal>
    </div>
  );
}

export default SalesPersonTasks;
