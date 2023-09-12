// import necessary packages
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import Dashboard from "../Header/Dashboard";
import Button from "@mui/joy/Button";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import toast from "react-hot-toast";
import { Autocomplete, Card, Radio, TextField } from "@mui/joy";
import Stack from "@mui/joy/Stack";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import api from "../../util/api";
import "./index.css";

function AllTasks() {
  //const navigate = useNavigate();
  const [contactData, setContactData] = useState([]);
  const [data, setData] = useState([]);
  const [latestTaskStatus, setLatestTaskStatus] = useState([]);
  const [openSalesperson, setOpenSalesPerson] = React.useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openSalesPersonAndContact, setOpenSalesPersonAndContact] =
    useState(false);
  const [activeSalesPerson, setActiveSalesPerson] = useState("");
  const [allSalesPersons, setAllSalespersons] = useState([]);
  const [allContacts, setAllContact] = useState([]);
  const [activeContact, setActiveContact] = useState("");
  const [dat, setDat] = useState([]);
  const [error, setError] = useState(null); // State for storing error messages
  const [open, setOpen] = React.useState(false);
  const [allStatus, setAllStatus] = useState([]);
  const [layout, setLayout] = React.useState(undefined);
  const [taskId, setTaskId] = useState("");
  const [activeDropDownStatus, setActiveDropDownStatus] = useState("");
  const [allActiveStatus, setAllActiveStatus] = useState([]);
  const [selectedRow, setSelectedRow] = useState("");
  // startDate usestate to store start date
  const [startDate, setStartDate] = useState("");
  // startDate usestate to store start date
  const [endDate, setEndDate] = useState("");
  // console.log(activeDropDownStatus)

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
      throw new Error(
        "Failed to fetch latest task status. Please try again later."
      );
    }
  };

  useEffect(() => {
    if (activeDropDownStatus !== "") {
      // console.log(activeDropDownStatus)
      fetch(`/task/getAllTaskByStatus/${activeDropDownStatus}`)
        .then((response) => response.json())
        .then((data) => {
          // Add an "id" field to each object and start with 1
          const dataWithIds = data.map((item, index) => ({
            ...item,
            id: index + 1,
          }));
          // Update the state with the modified data
          filteringRequiredData(dataWithIds);
        })
        .catch((error) => console.error("Error fetching data:", error));
    } else {
      getAllTasks();
    }
  }, [activeDropDownStatus]);

  const filteringRequiredData = (dataa) => {
    // Here we are modifying the dataa to our requried patter and add id field to the each item in a list due to material ui table component  is using here, so id show be in each object of a list to identify the uniquely
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
    if (contactData.length > 0) {
      filteringRequiredData(contactData);
    }
  }, [contactData]);

  const getAllTasks = () => {
    try {
      const fetchUsers = () => {
        api
          .get("/task/getAllTask")
          .then((res) => {
            setContactData(res.data);
            // console.log(res.data)
          })
          .catch((err) => console.log(err.message));
      };
      fetchUsers();
    } catch (error) {
      console.log(error.message);
    }
  };
  const getAllSalesPersonByRole = async () => {
    const apiUrl = `/app/getAllSalesPerson`;
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
      let salespersonss = data.map(
        (each) => `${each.user.userName}-${each.salespersonId.slice(-4)}`
      );
      setAllSalespersons(salespersonss, "sppp");
      setError(null); // Clear any previous errors if the request succeeds
    } catch (error) {
      // Handle any error that occurred during the fetch request
      console.error("Error:", error);
      setError("Failed to fetch tasks. Please try again later.");
    }
  };

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
        const contactNames = data.map(
          (each) => `${each?.firstName}-${each.contactId.slice(-5)}`
        );
        //console.log(data);
        setAllContact(contactNames);
      })
      .catch((error) => {
        // Handle any error that occurred during the fetch request
        console.error("Error:", error);
      });
  };

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
        //setIsStatusLoading(false);
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      //console.log(data);
      setAllActiveStatus(data);
      //setError(null); // Clear any previous errors if the request succeeds
    } catch (error) {
      // Handle any error that occurred during the fetch request
      console.error("Error:", error);
      //setError("Failed to fetch tasks. Please try again later.");
    }
  };

  // this useEffect is for get all respective for first rendering of application
  useEffect(() => {
    getAllActiveStatus();
    getAllSalesPersonByRole();
    getAllContacts();
  }, []);

  const handleFilter = () => {
    // this function is for filter the tasks between two dates //date here is start date of each task
    const filtered = contactData.filter((item) => {
      const itemDate = new Date(item.startDate); // taking start date of each task
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1); // Added one day to the end date
      return itemDate >= start && itemDate < end;
    });
    // set filter data array to setFilterData function
    filteringRequiredData(filtered);
  };

  // get all previous task status for respective task
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
      setError(null); // Clear any previous errors if the request succeeds
    } catch (error) {
      // Handle any error that occurred during the fetch request
      console.error("Error:", error);
      setError("Failed to fetch tasks. Please try again later.");
    }
  };
  //latest task status by task and i called in onRowHandleClick

  const handleAllStatus = (id) => {
    getAllStatusByTask(id || selectedRow);
    //latestStatusByTask(id || selectedRowId);
  };
  const handleChangeContact = async () => {
    const apiUrl = `/task/updateTaskByContactId/${
      dat.taskId
    }/contact_${activeContact.slice(-5)}`; // Eg: praveen_0001 is name  in contact so i slice the form 5digits and put it in api
    const authToken = localStorage.getItem("token");
    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      toast.success("Successfully changed Contact");
      setError(null); // Clear any previous errors if the request succeeds
    } catch (error) {
      // Handle any error that occurred during the fetch request
      setError("Failed to fetch tasks. Please try again later.");
    }
  };
  const handleChangeSalesPersonAndContact = async () => {
    const apiUrl = `/task/updateTaskBySalesPersonAndContactId/${
      dat.taskId
    }/Sp_${activeSalesPerson.slice(-4)}/contact_${activeContact.slice(-5)}`; // Eg: praveen_0001 is name  in activeSalesPerson so i slice the form 4 digits and put it in api and similar way for contacts also
    const authToken = localStorage.getItem("token");
    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      toast.success("Successfully Changes Made");
      setError(null); // Clear any previous errors if the request succeeds
    } catch (error) {
      // Handle any error that occurred during the fetch request
      setError("Failed to fetch tasks. Please try again later.");
    }
  };

  const handleChangeSalespersons = async () => {
    const apiUrl = `/task/updateTaskBySalesPersonId/${
      dat.taskId
    }/Sp_${activeSalesPerson.slice(-4)}`; // Eg: praveen_0001 is name  in activeSalesPerson so i slice the form 4 digits and put it in api

    const authToken = localStorage.getItem("token");
    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      toast.success("successfully changed SalesPerson");
      setError(null); // Clear any previous errors if the request succeeds
    } catch (error) {
      // Handle any error that occurred during the fetch request
      // console.error("Error:", error);
      setError("Failed to fetch tasks. Please try again later.");
    }
    //post method will be written
    //navigate("/update-task", { state: params.row });
  };

  // this below columns is for material ui components
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
          // onChange={()=>handleRowSelected(params)}
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
      field: "contactName",
      headerName: "Contact Name",
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
      field: "assignedManager",
      headerName: "Assigned Manager",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
  ];

  //below function is trigger when we click select the row
  const onRowHandleClick = (params) => {
    setSelectedRow(params.id);
    setDat(params.row);
    setTaskId(params.row.taskId);
    //    navigate("/selected-task", {
    //       state: {
    //         dat: params.row,

    //         id: params.row.taskId,
    //         allSalesPersons: allSalesPersons,
    //         allContacts: allContacts,
    //       },
    //     });
    setTimeout(() => {
      // after selecting the row this code will run after one second
      latestStatusByTask(params.row.taskId) // based on the selected task  latestStatusByTask will call and then latest task status set into state
        .then((latestStatusData) => {
          setLatestTaskStatus(latestStatusData);
        })
        .catch((error) => {
          console.error("Error fetching latest task status:", error);
        });
    }, 1000);
  };

  return (
    <div>
      <div className="users-container">
        <div className="buttons">
          <button
            style={{ backgroundColor: "#1d1a69" }}
            className="userbtn"
            //onClick={() => navigate("/create_task")}
          >
            Create Task
          </button>
        </div>
        <div className="">
          <div className="headings">
            <h1 className="main-heading">All Tasks</h1>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            ></div>
          </div>
          {selectedRow !== "" && (
            <div>
              <h4 className="text-center"> Selected Task</h4>
              <div className="selectedTask-container">
                <div className="details-container">
                  <div style={{ marginLeft: "20px" }}>
                    <p>
                      <b>Sales Person : </b> {dat.salesPersonName}
                    </p>
                    <p>
                      <b>Contact : </b>{" "}
                      {dat?.contactSub?.contactId?.firstName +
                        " " +
                        dat?.contactSub?.contactId?.lastName}
                    </p>
                    <p>
                      <b>Assigned By : </b> {dat?.assignedManager}
                    </p>
                    <p>
                      <b>Description : </b> {dat?.taskDescription}
                    </p>
                  </div>
                  <div style={{ marginLeft: "20px" }}>
                    <p>
                      <b>Task Status : </b>
                      {latestTaskStatus.taskStatus?.statusValue}
                    </p>
                    <p>
                      <b>Task Outcome : </b>
                      {latestTaskStatus.taskOutcome?.statusValue}
                    </p>
                    <p>
                      <b>Start Date : </b>
                      {dat?.startDate}
                    </p>
                    <p>
                      <b>Due Date : </b>
                      {dat?.dueDate}
                    </p>
                  </div>
                </div>

                <div>
                  <Stack
                    spacing={2}
                    marginRight="10px"
                    direction="row"
                    flexWrap="wrap"
                    padding="10px"
                  >
                    <React.Fragment>
                      <Stack direction="row" spacing={1} margin="10px">
                        <Button
                          style={{ marginBottom: "10px", marginLeft: "14px" }}
                          variant="outlined"
                          color="neutral"
                          onClick={() => {
                            handleAllStatus(dat.taskId);
                          }}
                        >
                          History
                        </Button>
                      </Stack>
                      <Modal
                        open={!!layout}
                        onClose={() => {
                          setLayout(undefined);
                        }}
                      >
                        <ModalDialog
                          aria-labelledby="dialog-vertical-scroll-title"
                          layout={layout}
                        >
                          <ModalClose />
                          <div>
                            <p>
                              <b>Sales Person :</b> {dat.salesPersonName}
                            </p>
                            <p>
                              <b>Contact :</b>{" "}
                              {dat?.contactSub?.contactId?.firstName +
                                " " +
                                dat?.contactSub?.contactId?.lastName}
                            </p>
                            <p>
                              <b>Assigned By :</b> {dat?.assignedManager}
                            </p>
                            <p>
                              <b>Description :</b> {dat.taskDescription}
                            </p>
                            <p>
                              <b>Task Status : </b>
                              {latestTaskStatus.taskStatus?.statusValue}
                            </p>
                            <p>
                              <b>Task Outcome : </b>
                              {latestTaskStatus.taskOutcome?.statusValue}
                            </p>
                            <p>
                              <b>Start Date : </b>
                              {dat?.startDate}
                            </p>
                            <p>
                              <b>Due Date : </b>
                              {dat?.dueDate}
                            </p>
                          </div>
                          <List
                            sx={{
                              overflow: "scroll",
                              mx: "calc(-1 * var(--ModalDialog-padding))",
                              px: "var(--ModalDialog-padding)",
                            }}
                          >
                            {allStatus.map((item, index) => (
                              <ListItem key={index}>
                                <Card variant="soft">
                                  <Typography>
                                    OutCome : {item?.taskOutcome?.statusValue}
                                  </Typography>
                                  <Typography>
                                    Task Status: {item?.taskStatus?.statusValue}
                                  </Typography>
                                  <Typography>
                                    Task Feedback :{item.taskFeedback}
                                  </Typography>
                                  <Typography>
                                    Feedback Date : {item.feedbackDate}
                                  </Typography>
                                  <Typography>
                                    followUpDate :{item.followUpDate}
                                  </Typography>
                                  <Typography>
                                    LeadFeedback :{item.leadFeedback}
                                  </Typography>
                                  <Typography>
                                    Status Date :{item.statusDate}
                                  </Typography>
                                </Card>
                              </ListItem>
                            ))}
                          </List>
                        </ModalDialog>
                      </Modal>
                    </React.Fragment>
                    <React.Fragment>
                      <Button
                        style={{ marginBottom: "10px" }}
                        variant="outlined"
                        color="neutral"
                        onClick={() => setOpenSalesPerson(true)}
                      >
                        Change SalesPerson
                      </Button>
                      <Modal
                        open={openSalesperson}
                        onClose={() => setOpenSalesPerson(false)}
                      >
                        <ModalDialog
                          aria-labelledby="basic-modal-dialog-title"
                          aria-describedby="basic-modal-dialog-description"
                          sx={{ maxWidth: 500 }}
                        >
                          <ModalClose onClick={() => setOpen(false)} />
                          <Typography id="basic-modal-dialog-title" level="h2">
                            Change SalesPerson
                          </Typography>
                          <Stack spacing={2}>
                            <Autocomplete
                              //className="add-task-dropdown"
                              size="small"
                              disablePortal
                              id="combo-box-demo"
                              options={allSalesPersons}
                              value={activeSalesPerson}
                              onChange={(event, newValue) =>
                                setActiveSalesPerson(newValue)
                              }
                              isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                              }
                              sx={{ width: 300 }}
                              renderInput={(params) => (
                                <TextField {...params} label="Sales Person" />
                              )}
                            />
                            <Button
                              onClick={() => {
                                handleChangeSalespersons(dat);
                                setOpen(false);
                              }}
                            >
                              Submit
                            </Button>
                          </Stack>
                        </ModalDialog>
                      </Modal>
                    </React.Fragment>
                    <React.Fragment>
                      <Button
                        style={{ marginBottom: "10px" }}
                        variant="outlined"
                        color="neutral"
                        onClick={() => setOpenContact(true)}
                      >
                        Change Contact
                      </Button>
                      <Modal
                        open={openContact}
                        onClose={() => setOpenContact(false)}
                      >
                        <ModalDialog
                          aria-labelledby="basic-modal-dialog-title"
                          aria-describedby="basic-modal-dialog-description"
                          sx={{ maxWidth: 500 }}
                        >
                          <ModalClose onClick={() => setOpen(false)} />
                          <Typography id="basic-modal-dialog-title" level="h2">
                            Change Contact
                          </Typography>
                          <Stack spacing={2}>
                            <Autocomplete
                              //className="add-task-dropdown"
                              size="small"
                              disablePortal
                              id="combo-box-demo"
                              options={allContacts}
                              value={activeContact}
                              onChange={(event, newValue) =>
                                setActiveContact(newValue)
                              }
                              isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                              }
                              sx={{ width: 300 }}
                              renderInput={(params) => (
                                <TextField {...params} label="Sales Person" />
                              )}
                            />
                            <Button
                              onClick={() => {
                                handleChangeContact(dat);
                                setOpen(false);
                              }}
                            >
                              Submit
                            </Button>
                          </Stack>
                        </ModalDialog>
                      </Modal>
                    </React.Fragment>
                    <React.Fragment>
                      <Button
                        style={{ marginBottom: "10px" }}
                        variant="outlined"
                        color="neutral"
                        onClick={() => setOpenSalesPersonAndContact(true)}
                      >
                        Change Contact & SalesPerson
                      </Button>
                      <Modal
                        open={openSalesPersonAndContact}
                        onClose={() => setOpenSalesPersonAndContact(false)}
                      >
                        <ModalDialog
                          aria-labelledby="basic-modal-dialog-title"
                          aria-describedby="basic-modal-dialog-description"
                          sx={{ maxWidth: 500 }}
                        >
                          <ModalClose onClick={() => setOpen(false)} />
                          <Typography id="basic-modal-dialog-title" level="h2">
                            Change Contact & SalesPerson
                          </Typography>
                          <Stack spacing={2}>
                            <p>Sales Persons</p>
                            <Autocomplete
                              //className="add-task-dropdown"
                              size="small"
                              disablePortal
                              id="combo-box-demo"
                              options={allSalesPersons}
                              value={activeSalesPerson}
                              onChange={(event, newValue) =>
                                setActiveSalesPerson(newValue)
                              }
                              isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                              }
                              sx={{ width: 300 }}
                              renderInput={(params) => (
                                <TextField {...params} label="Sales Person" />
                              )}
                            />
                            <p>Contacts</p>
                            <Autocomplete
                              //className="add-task-dropdown"
                              size="small"
                              disablePortal
                              id="combo-box-demo"
                              options={allContacts}
                              value={activeContact}
                              onChange={(event, newValue) =>
                                setActiveContact(newValue)
                              }
                              isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                              }
                              sx={{ width: 300 }}
                              renderInput={(params) => (
                                <TextField {...params} label="Contacts" />
                              )}
                            />
                            <Button
                              onClick={() => {
                                handleChangeSalesPersonAndContact();
                                setOpen(false);
                              }}
                            >
                              Submit
                            </Button>
                          </Stack>
                        </ModalDialog>
                      </Modal>
                    </React.Fragment>
                  </Stack>
                </div>
              </div>
            </div>
          )}
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
                <option key={index} value={status}>
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
          {endDate < startDate && endDate && (
            <p className="error">*End Date Should Be Greater Than Start Date</p>
          )}
          {/* <div className='search-container'>
          <div className='search-cont'>
            <select className='select' value={selectedManager} onChange={(e)=>setSelectedManager(e.target.value)}>
              <option key='manager'>Select Manager Name</option>
              {managers.map((item,index)=>
                <option value={item[0]}key={index[0]}>{item[0]}--{item[1]}</option>
              )}
            </select>
            <button className='icon' type="button" onClick={handleManagerRecords}>
              <i class="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div> */}
          <div style={{ height: "400px" }}>
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
      </div>
    </div>
  );
}

export default AllTasks;
