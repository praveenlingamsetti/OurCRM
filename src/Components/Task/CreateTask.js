import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { TextareaAutosize } from "@mui/base";
import toast from "react-hot-toast";
import "./index.css";
import { DatePicker, MobileDatePicker } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs"; // Import the Dayjs library
import { useNavigate } from "react-router-dom";
//import Dashboard from "../Header/Dashboard";
const blue = {
  100: "#DAECFF",
  200: "#B6DAFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};
const grey = {
  50: "#F6F8FA",
  100: "#EAEEF2",
  200: "#D0D7DE",
  300: "#AFB8C1",
  400: "#8C959F",
  500: "#6E7781",
  600: "#57606A",
  700: "#424A53",
  800: "#32383F",
  900: "#24292F",
};
const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
  width: 320px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px 12px 0 12px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 24px ${
    theme.palette.mode === "dark" ? blue[900] : blue[100]
  };
  &:hover {
    border-color: ${blue[400]};
  }
  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }
  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
const Res = () => {
  const navigate = useNavigate();
  const [allContacts, setAllContacts] = useState([]);
  const [allSalesPersons, setAllSalesPersons] = useState([]);
  const [allUser, setAllUsers] = useState([]);
  const [allOffers, setAllOffers] = useState([]);
  const [activeSalesPerson, setActiveSalesPerson] = useState("");
  const [activeOffering, setActiveOffering] = useState("");
  const [activeContact, setActiveContact] = useState("");
  const [activeUser, setActiveUser] = useState("");
  const [selectedContact, setSelectedContact] = useState("");
  const [selectedSalesperson, setSelectedSalesPersons] = useState("");
  const [selectedOffering, setSelectedOffering] = useState("");
  const [taskContent, setTaskContent] = useState("");
  const [startDate, setStartDate] = useState(dayjs());
  const [dueDate, setDueDate] = useState(null);
  const getAllUserExceptSalespersons = () => {
    const apiUrl = "/api/getAllUsers";
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
        const filteredUsers = data.filter((user) => {
          return !user.authorities.some(
            (authority) => authority.authority === "SalesPerson"
          );
        });
        const userNames = filteredUsers.map(
          (each) => `${each.userName}-${each.userId.slice(-4)}`
        );
        setAllUsers(userNames);
      })
      .catch((error) => {
        // Handle any error that occurred during the fetch request
        console.error("Error:", error);
      });
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
          (each) => `${each.firstName}-${each.contactId.slice(-5)}`
        );
        setAllContacts(contactNames);
      })
      .catch((error) => {
        // Handle any error that occurred during the fetch request
        console.error("Error:", error);
      });
  };
  const getAllSalesPerson = () => {
    const apiUrl = "/app/getAllSalesPerson";
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
        const salespersons = data.map(
          (each) => `${each.user.userName}-${each.salespersonId}`
        );
        setAllSalesPersons(salespersons);
      })
      .catch((error) => {
        // Handle any error that occurred during the fetch request
        console.error("Error:", error);
      });
  };
  const getAllOffers = () => {
    const apiUrl = "/OfferingController/get_all_offering";
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
        const offerNames = data.map(
          (each) => `${each.offeringName}-${each.offeringId.slice(-5)}`
        );
        setAllOffers(offerNames);
      })
      .catch((error) => {
        // Handle any error that occurred during the fetch request
        console.error("Error:", error);
      });
  };
  const handleTask = () => {
    getAllSalesPerson();
    getAllUserExceptSalespersons();
    getAllOffers();
    getAllContacts();
  };
  useEffect(() => {
    handleTask();
  }, []);
  useEffect(() => {
    if (activeContact) setSelectedContact(`contact_${activeContact.slice(-5)}`);
    if (activeOffering)
      setSelectedOffering(`offering_${activeOffering.slice(-5)}`);
    if (activeSalesPerson) setSelectedSalesPersons(activeSalesPerson.slice(-7));
  }, [activeContact, activeOffering, activeSalesPerson]);
  const onclickAddTask = () => {
    const taskBody = {
      taskDescription: taskContent,
      startDate: startDate.format("YYYY-MM-DD"), // Format the start date
      dueDate: dueDate ? dueDate.format("YYYY-MM-DD") : null, // Format the due date if it exists, otherwise set to null
    };
    const apiUrl = `/task/createTask/${selectedSalesperson}/user_${activeUser.slice(
      -4
    )}/${selectedContact}/${selectedOffering}`;
    const authToken = localStorage.getItem("token");
    // Replace this with your actual authentication token
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`, // Adding the authentication header
      },
      body: JSON.stringify(taskBody),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Task Created");
        navigate("/all_tasks");
      })
      .catch((error) => {
        // Handle any error that occurred during the fetch request
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <div className="tasks-container">
        <div className="buttons">
          <button
            style={{ backgroundColor: "#1d1a69" }}
            className="userbtn"
            onClick={() => navigate("/all_tasks")}
          >
            All Tasks
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            height: "70vh",
          }}
        >
          <h1 style={{ marginTop: "10px" }}>Add Task</h1>
          {/* DeskTop View */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <div className="AddTask-container">
              <div className="each-AddTask-container">
                <Autocomplete
                  size="small"
                  disablePortal
                  id="combo-box-demo0"
                  options={allUser}
                  value={activeUser}
                  onChange={(event, newValue) => setActiveUser(newValue)}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  sx={{ width: 290, marginRight: "20px" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Users" />
                  )}
                />
                <Autocomplete
                  size="small"
                  disablePortal
                  id="combo-box-demo"
                  options={allSalesPersons}
                  value={activeSalesPerson}
                  onChange={(event, newValue) => setActiveSalesPerson(newValue)}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  sx={{ width: 290 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Sales Person" />
                  )}
                />
              </div>
              <br />
              <div className="each-AddTask-container">
                <Autocomplete
                  size="small"
                  disablePortal
                  id="combo-box-demo2"
                  options={allOffers}
                  value={activeOffering}
                  onChange={(event, newValue) => setActiveOffering(newValue)}
                  sx={{ width: 290 }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Offers" />
                  )}
                />
                <Autocomplete
                  size="small"
                  disablePortal
                  id="combo-box-demo3"
                  options={allContacts}
                  value={activeContact}
                  onChange={(event, newValue) => setActiveContact(newValue)}
                  sx={{ width: 290 }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Contact" required />
                  )}
                />
              </div>
              <br />
              <div className="each-AddTask-container">
                <LocalizationProvider
                  style={{ width: "350px" }}
                  dateAdapter={AdapterDayjs}
                >
                  <DemoContainer components={["DatePicker"]}>
                    <DemoItem label="Start Date">
                      <MobileDatePicker
                        sx={{ width: "290px" }}
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DemoItem label="Due Date">
                      <MobileDatePicker
                        sx={{ width: "290px", height: "28px" }}
                        value={dueDate}
                        onChange={(date) => setDueDate(date)}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <br />
              <div>
                <StyledTextarea
                  sx={{ width: 350 }}
                  id="message"
                  rows="4"
                  cols="50"
                  onChange={(e) => setTaskContent(e.target.value)}
                  className="task-text-field"
                  style={{ width: "100%" }}
                  aria-label="empty textarea"
                  placeholder="Task description ....."
                />
              </div>
              <br />
              <div className="text-center">
                <button
                  style={{
                    marginRight: "20px",
                    marginBottom: "10px",
                    width: "80px",
                  }}
                  onClick={onclickAddTask}
                >
                  Add Task
                </button>
              </div>
            </div>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { md: "none", sm: "flex", xs: "none" },
              height: "60vh",
              alignSelf: "center",
            }}
          >
            <div className="AddTask-container-fold">
              <div className="each-AddTask-container-sm">
                <Autocomplete
                  size="small"
                  className="mb-2"
                  disablePortal
                  id="combo-box-demo0"
                  options={allUser}
                  value={activeUser}
                  onChange={(event, newValue) => setActiveUser(newValue)}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  sx={{ width: 400 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Users" />
                  )}
                />
                <Autocomplete
                  size="small"
                  disablePortal
                  id="combo-box-demo"
                  options={allSalesPersons}
                  value={activeSalesPerson}
                  onChange={(event, newValue) => setActiveSalesPerson(newValue)}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  sx={{ width: 400 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Sales Person" />
                  )}
                />
              </div>
              <br />
              <div className="each-AddTask-container-sm">
                <Autocomplete
                  className="mb-2"
                  size="small"
                  disablePortal
                  id="combo-box-demo2"
                  options={allOffers}
                  value={activeOffering}
                  onChange={(event, newValue) => setActiveOffering(newValue)}
                  sx={{ width: 400 }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Offers" />
                  )}
                />
                <Autocomplete
                  size="small"
                  disablePortal
                  id="combo-box-demo3"
                  options={allContacts}
                  value={activeContact}
                  onChange={(event, newValue) => setActiveContact(newValue)}
                  sx={{ width: 400 }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Contact" required />
                  )}
                />
              </div>
              <br />
              <div className="each-AddTask-container-sm">
                <LocalizationProvider
                  style={{ width: "2300px" }}
                  dateAdapter={AdapterDayjs}
                >
                  <DemoContainer components={["DatePicker"]}>
                    <DemoItem label="Start Date">
                      <MobileDatePicker
                        sx={{ width: "400px" }}
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  className="date-field"
                >
                  <DemoContainer components={["DatePicker"]}>
                    <DemoItem label="Due Date">
                      <MobileDatePicker
                        sx={{ width: "400px" }}
                        value={dueDate}
                        onChange={(date) => setDueDate(date)}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <br />
              <div>
                <StyledTextarea
                  sx={{ width: 350 }}
                  id="message"
                  rows="4"
                  cols="50"
                  onChange={(e) => setTaskContent(e.target.value)}
                  className="task-text-field"
                  style={{ width: "100%" }}
                  aria-label="empty textarea"
                  placeholder="Task description ....."
                />
              </div>
              <br />
              <div className="text-center">
                <button
                  style={{
                    marginRight: "20px",
                    marginBottom: "10px",
                    width: "80px",
                  }}
                  onClick={onclickAddTask}
                >
                  Add Task
                </button>
              </div>
            </div>
          </Box>
          {/* Mobile View */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
            <div className="AddTask-container-sm">
              <div className="each-AddTask-container-sm">
                <Autocomplete
                  size="small"
                  className="mb-2"
                  disablePortal
                  id="combo-box-demo0"
                  options={allUser}
                  value={activeUser}
                  onChange={(event, newValue) => setActiveUser(newValue)}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  style={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Users" />
                  )}
                />
                <Autocomplete
                  size="small"
                  disablePortal
                  id="combo-box-demo"
                  options={allSalesPersons}
                  value={activeSalesPerson}
                  onChange={(event, newValue) => setActiveSalesPerson(newValue)}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  style={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Sales Person" />
                  )}
                />
              </div>
              <br />
              <div className="each-AddTask-container-sm">
                <Autocomplete
                  className="mb-2"
                  size="small"
                  disablePortal
                  id="combo-box-demo2"
                  options={allOffers}
                  value={activeOffering}
                  onChange={(event, newValue) => setActiveOffering(newValue)}
                  style={{ width: "100%" }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Offers" />
                  )}
                />
                <Autocomplete
                  size="small"
                  disablePortal
                  id="combo-box-demo3"
                  options={allContacts}
                  value={activeContact}
                  onChange={(event, newValue) => setActiveContact(newValue)}
                  style={{ width: "100%" }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Contact" required />
                  )}
                />
              </div>
              <br />
              <div className="each-AddTask-container-sm">
                <LocalizationProvider
                  style={{ width: "250px" }}
                  dateAdapter={AdapterDayjs}
                >
                  <DemoContainer components={["DatePicker"]}>
                    <DemoItem label="Start Date">
                      <MobileDatePicker
                        style={{ width: "100%" }}
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  className="date-field"
                >
                  <DemoContainer components={["DatePicker"]}>
                    <DemoItem label="Due Date">
                      <MobileDatePicker
                        style={{ width: "100%" }}
                        value={dueDate}
                        onChange={(date) => setDueDate(date)}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <br />
              <div>
                <StyledTextarea
                  sx={{ width: 350 }}
                  id="message"
                  rows="4"
                  cols="50"
                  onChange={(e) => setTaskContent(e.target.value)}
                  className="task-text-field"
                  style={{ width: "100%" }}
                  aria-label="empty textarea"
                  placeholder="Task description ....."
                />
              </div>
              <br />
              <div className="text-center">
                <button
                  style={{
                    marginRight: "20px",
                    marginBottom: "10px",
                    width: "80px",
                  }}
                  onClick={onclickAddTask}
                >
                  Add Task
                </button>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};
export default Res;
