import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  Card,
  List,
  ListItem,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  TextField,
} from "@mui/joy";
import Typography from "@mui/material/Typography";
import toast from "react-hot-toast";

import "./Task.css";
import { Link, useLocation } from "react-router-dom";
import UpdateTask from "../../SalesPerson/SalesPersonTasks/UpdateTask";
import SalesPersonDashboard from "../../SalesPerson/SalesPersonHeader/SalesPersonDashboard";
import Dashboard from "../Header/Dashboard";

const SelectedTask = (props) => {
  const location = useLocation();
  console.log(location.state);
  const [latestTaskStatus, setLatestTaskStatus] = useState("");
  const [dat, setdat] = useState(location.state.dat);
  console.log(dat);
  const [allStatus, setAllStatus] = useState([]);
  const [openSalesperson, setOpenSalesPerson] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openSalesPersonAndContact, setOpenSalesPersonAndContact] =
    useState(false);
  const [activeSalesPerson, setActiveSalesPerson] = useState("");
  const [updateLayout, setUpdateLayout] = useState(undefined);

  //   const [allSalesPersons, setAllSalespersons] = useState([]);
  //   const [allContacts, setAllContact] = useState([]);
  const [activeContact, setActiveContact] = useState("");
  const [error, setError] = useState(null); // State for storing error messages
  const [open, setOpen] = React.useState(false);
  //const [allStatus, setAllStatus] = useState([]);
  const [layout, setLayout] = React.useState(undefined);
  //const [taskId, setTaskId] = useState("");
  const [activeDropDownStatus, setActiveDropDownStatus] = useState("");
  const [allActiveStatus, setAllActiveStatus] = useState([]);

  const taskId = location.state.id;
  const IsAdmin = Object.keys(props).length === 0;
  //console.log(Object.keys(props).length === 0);
  if (IsAdmin) {
    var allSalesPersons = location.state.allSalesPersons;
    var allContacts = location.state.allContacts;
  }

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
    getAllStatusByTask(id);
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

  useEffect(() => {
    latestStatusByTask(taskId) // based on the selected task  latestStatusByTask will call and then latest task status set into state
      .then((latestStatusData) => {
        setLatestTaskStatus(latestStatusData);
      })
      .catch((error) => {
        console.error("Error fetching latest task status:", error);
      });
  }, []);

  return (
    <div>
      {!IsAdmin && <SalesPersonDashboard />}
      {IsAdmin && <Dashboard />}
      <div>
        <div className="heading-container">
          <h4> Selected Task</h4>
          {IsAdmin && (
            <Link to="/all_tasks">
              <Button style={{ backgroundColor: "#1d1a69" }}>All Tasks</Button>
            </Link>
          )}
          {!IsAdmin && (
            <Link to="/salesperson_tasks">
              <Button style={{ backgroundColor: "#1d1a69" }}>
                SalesPerson Tasks
              </Button>
            </Link>
          )}
        </div>

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
              {IsAdmin && (
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
              )}
              {!IsAdmin && (
                <React.Fragment>
                  <Stack direction="row" spacing={1}>
                    <Button
                      style={{ marginBottom: "10px" }}
                      variant="outlined"
                      color="neutral"
                      onClick={() => {
                        setUpdateLayout("fullscreen");
                      }}
                    >
                      Update Task
                    </Button>
                  </Stack>
                  <Modal
                    open={!!updateLayout}
                    onClose={() => setUpdateLayout(undefined)}
                  >
                    <ModalDialog
                      aria-labelledby="layout-modal-title"
                      aria-describedby="layout-modal-description"
                      layout={updateLayout}
                    >
                      <ModalClose />
                      <UpdateTask
                        AllStatus={latestTaskStatus}
                        selectedItem={dat}
                      />
                    </ModalDialog>
                  </Modal>
                </React.Fragment>
              )}
              {IsAdmin && (
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
              )}
              {IsAdmin && (
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
              )}
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SelectedTask;
