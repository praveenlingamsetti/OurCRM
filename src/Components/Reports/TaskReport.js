import React, { useEffect, useState } from "react";
import api from "../../util/api";
import { DataGrid } from "@mui/x-data-grid";
import "./index.css";

function TaskReport() {
  // Initialize state variables
  const [taskData, setTaskData] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [selectedContact, setSelectedContact] = useState(""); // Stores the selected conatct name

  // Fetch task data from the API when the component mounts
  useEffect(() => {
    try {
      const fetchUsers = () => {
        api
          .get("/task/getAllTask")
          .then((res) => {
            setTaskList(res.data);
            console.log(res.data);
          })
          .catch((err) => console.log(err.message));
      };
      fetchUsers();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  // Event handler for fetching Task data for the selected contact
  const handleTask = () => {
    try {
      const fetchUsers = () => {
        api
          .get(`task/getAllTaskByContactId/${selectedContact}`)
          .then((res) => {
            setTaskData(res?.data); // Store Task data
            console.log(res.data);
          })
          .catch((err) => console.log(err.message));
      };
      fetchUsers();
    } catch (error) {
      console.log(error.message);
    }
  };
  const contactNames = taskList.map((item) => [
    item?.contactSub?.contactId?.contactId,
    item?.contactSub?.contactId?.firstName +
      " " +
      item?.contactSub?.contactId?.lastName,
  ]);
  const data = taskData.map((item, index) => ({
    ...item,
    id: index + 1,
    salesPersonName: item?.salesPerson?.user?.userName,
    lifeCycleStage: item?.contactSub?.lifeCycleStage?.statusValue,
  }));

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
      field: "salesPersonName",
      headerName: "SalesPerson Name",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "taskDescription",
      headerName: "Task Description",
      width: 300,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "lifeCycleStage",
      headerName: "LifeCycle Stage",
      width: 200,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
  ];

  return (
    <div className="customer-report">
      <h3>Task Report</h3>
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
        <button className="icon" type="button" onClick={handleTask}>
          <i class="fa fa-search" aria-hidden="true"></i>{" "}
          {/* Using class instead of className for font-awesome icon */}
        </button>
      </div>
      {taskData.length !== 0 && (
        <div className="user-table-container">
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

export default TaskReport;
