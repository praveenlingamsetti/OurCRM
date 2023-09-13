// Import necessary modules and components
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // Import a library for displaying toast notifications
import axios from "axios"; // Import Axios for making HTTP requests
import "./index.css";
//import Dashboard from '../Header/Dashboard';
import UploadFile from "./UploadFile";
// Initial data structure for a new contact
let dat = {
  firstName: "",
  lastName: "",
  email: "",
  mobileNumber: "",
  company: "",
  address: "",
  country: "",
  date: "",
  stageDate: "",
  websiteURL: "",
  socialMediaURL: "",
  contactDesignation: "",
  contactDepartment: "",
  source: {
    statusValue: "",
  },
  otherSourcetype: "",
  contactCreatedBy: {
    userId: "",
  },
};
// Define the functional component called ContactForm
const ContactForm = () => {
  const userId = localStorage.getItem("userId"); // Retrieve user ID from local storage
  const [formStatus, setFormStatus] = useState(dat); // State for storing form data
  const [otherInputVisible, setOtherInputVisible] = useState(false); // State for showing an additional input
  const [otherInputValue, setOtherInputValue] = useState(""); // State for storing the value of the additional input
  const navigate = useNavigate(); // A function for programmatic navigation
  const [allUsers, setAllUsers] = useState([]); // State for storing a list of users
  const [isUploadFile, setIsUploadFile] = useState(false);
  const [isCreateContact, setIsCreateContact] = useState(true);
  // Fetch all users using an Axios GET request
  useEffect(() => {
    try {
      const fetchUsers = () => {
        axios
          .get("/api/getAllUsers")
          .then((res) => {
            setAllUsers(res.data);
          })
          .catch((err) => console.log(err.message));
      };
      fetchUsers();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  // Handle changes in form inputs
  const handleChange = (e) => {
    if (e.target.value === "Other") {
      setOtherInputVisible(true);
    } else {
      setOtherInputVisible(false);
    }
    const { name, value } = e.target;
    setFormStatus({ ...formStatus, [name]: value });
  };
  // Handle changes in the additional input field
  const handleOtherInputChange = (event) => {
    setOtherInputValue(event.target.value);
  };
  // Function to create a new contact by making a POST request
  const createContact = (newContact) => {
    const apiUrl = "/ContactController/create_contact"; // API endpoint for creating a contact
    const authToken = localStorage.getItem("token"); // Retrieve the authentication token from local storage
    fetch(apiUrl, {
      // Send a POST request to create a new contact
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(newContact),
    })
      .then((response) => {
        toast("Contact Created Successfully"); // Display a success toast notification
        navigate("/all_contacts");
      })
      .then((data) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // Prevent the default form submission behavior
  const onSubmit = (e) => {
    e.preventDefault();
  };

  // Handle sending contact data when the submit button is clicked
  const handleSendContact = () => {
    // Prepare the new contact object
    const newContact = {
      firstName: formStatus.firstName,
      lastName: formStatus.lastName,
      email: formStatus.email,
      mobileNumber: formStatus.mobileNumber,
      company: formStatus.company,
      address: formStatus.address,
      country: formStatus.country,
      websiteURL: formStatus.websiteURL,
      socialMediaURL: formStatus.socialMediaURL,
      contactDesignation: formStatus.contactDesignation,
      contactDepartment: formStatus.contactDepartment,
      contactCreatedBy: {
        userId,
      },
    };
    // Check if the source is "Other" and set the source and otherSourcetype fields accordingly
    if (formStatus.source !== "Other") {
      newContact.source = {
        statusValue: formStatus.source,
      };
      newContact.otherSourcetype = "";
    } else {
      newContact.source = {
        statusValue: formStatus.source,
      };
      newContact.otherSourcetype = otherInputValue;
    }
    // Call the createContact function to send the contact data
    createContact(newContact);
  };
  // Function to clear all form fields with confirmation
  const clearHandler = () => {
    if (window.confirm("Are you sure to clear fields?")) {
      setFormStatus(dat); // Reset form fields to the initial state
    }
  };

  const handleUploadFile = () => {
    setIsUploadFile(true);
    setIsCreateContact(false);
  };

  const handleCreateContact = () => {
    setIsUploadFile(false);
    setIsCreateContact(true);
  };
  // JSX code for rendering the ContactForm component
  return (
    <div>
      <div className="contacts-container">
        <div className="buttons">
          <button
            style={{ backgroundColor: "#1d1a69" }}
            className="contactbtn"
            onClick={handleUploadFile}
          >
            Upload File
          </button>
          <button
            style={{ backgroundColor: "#1d1a69" }}
            className="contactbtn"
            onClick={handleCreateContact}
          >
            Create Contact
          </button>
          <button
            style={{ backgroundColor: "#1d1a69" }}
            className="contactbtn"
            onClick={() => navigate("/all_contacts")}
          >
            All Contacts
          </button>
        </div>
        {isUploadFile && <UploadFile />}
        {isCreateContact && (
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-12 ">
                <div
                  className="card mt-5"
                  style={{ height: "70vh", overflowY: "scroll" }}
                >
                  <div className="card-header">
                    <h2 style={{ color: "#1d1a69" }}>Add Contact </h2>
                  </div>
                  <div className="card-body mx-5 pt-0">
                    <form className="user_form" onSubmit={onSubmit}>
                      <div className="row">
                        <div className="col-md-6 mt-3">
                          <div className="form-group">
                            <label className="form-label" htmlFor="firstName">
                              First Name<span className="required">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="firstName"
                              name="firstName"
                              value={formStatus.firstName}
                              onChange={handleChange}
                              placeholder="First Name"
                              required
                            />
                          </div>
                          <div className="form-group mt-3">
                            <label className="form-label" htmlFor="lastName">
                              Last Name<span className="required">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="lastName"
                              name="lastName"
                              value={formStatus.lastName}
                              onChange={handleChange}
                              placeholder="Last Name"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mt-3">
                            <label className="form-label" htmlFor="email">
                              Email<span className="required">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="email"
                              id="email"
                              name="email"
                              value={formStatus.email}
                              onChange={handleChange}
                              placeholder="Email"
                              required
                            />
                          </div>
                          <div className="form-group mt-3">
                            <label className="form-label" htmlFor="address">
                              Address<span className="required">*</span>
                            </label>
                            <textarea
                              className="form-control"
                              type="address"
                              id="address"
                              name="address"
                              value={formStatus.address}
                              onChange={handleChange}
                              placeholder="Address"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mt-3">
                            <label
                              className="form-label"
                              htmlFor="mobileNumber"
                            >
                              Mobile Number<span className="required">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              id="mobileNumber"
                              name="mobileNumber"
                              value={formStatus.mobileNumber}
                              onChange={handleChange}
                              placeholder="Mobile Number"
                              required
                            />
                          </div>
                          <div className="form-group mt-3">
                            <label
                              className="form-label"
                              htmlFor="contactDesignation"
                            >
                              {" "}
                              Contact Designation{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="contactDesignation"
                              name="contactDesignation"
                              value={formStatus.contactDesignation}
                              onChange={handleChange}
                              placeholder="Contact Designation"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mt-3">
                            <label className="form-label" htmlFor="company">
                              {" "}
                              Company<span className="required">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="company"
                              name="company"
                              value={formStatus.company}
                              onChange={handleChange}
                              placeholder="Company"
                              required
                            />
                          </div>
                          <div className="form-group mt-3">
                            <label className="form-label" htmlFor="country">
                              Country<span className="required">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="country"
                              name="country"
                              value={formStatus.country}
                              onChange={handleChange}
                              placeholder="Country"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mt-3">
                            <label className="form-label" htmlFor="source">
                              Source<span className="required">*</span>
                            </label>
                            <select
                              className="form-control dropdown-toggle bi bi-chevron-down"
                              type="text"
                              id="source"
                              name="source"
                              value={formStatus.source}
                              onChange={(e) => handleChange(e)}
                              placeholder="Source"
                              required
                            >
                              <option value={""}>Select option</option>
                              <option value={"Website"}>Website</option>
                              <option value={"Social Media"}>
                                Social Media
                              </option>
                              <option value={"Advertisements"}>
                                Advertisements
                              </option>
                              <option value={"Other"}>Other</option>
                            </select>
                            {otherInputVisible && (
                              <div>
                                <label
                                  className="form-label"
                                  htmlFor="otherInput"
                                >
                                  Please specify:
                                </label>
                                <textarea
                                  className="form-control"
                                  type="text"
                                  id="otherInput"
                                  value={otherInputValue}
                                  onChange={handleOtherInputChange}
                                />
                              </div>
                            )}
                          </div>
                          <div className="form-group mt-3">
                            <label className="form-label" htmlFor="websiteURL">
                              {" "}
                              URL<span className="required">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="websiteURL"
                              name="websiteURL"
                              value={formStatus.websiteURL}
                              onChange={handleChange}
                              placeholder="URL"
                              required
                            />
                          </div>
                          <div className="form-group mt-3">
                            <label
                              className="form-label"
                              htmlFor="socialMediaURL"
                            >
                              Social Media URL
                              <span className="required">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="socialMediaURL"
                              name="socialMediaURL"
                              value={formStatus.socialMediaURL}
                              onChange={handleChange}
                              placeholder="Social Media URL"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mt-3">
                            <label
                              className="form-label"
                              htmlFor="contactDepartment"
                            >
                              Contact Department
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="contactDepartment"
                              name="contactDepartment"
                              value={formStatus.contactDepartment}
                              onChange={handleChange}
                              placeholder="Contact Department"
                            />
                          </div>
                          <div className="form-group mt-3">
                            <label
                              className="form-label"
                              htmlFor="contactCreatedBy"
                            >
                              Contact Created By
                              <span className="required">*</span>{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="contactCreatedBy"
                              name="contactCreatedBy"
                              value={userId}
                              placeholder="Contact Created By"
                            />
                          </div>
                        </div>
                        <div className="col-12 mt-4">
                          <div className="input-group d-flex justify-content-center">
                            <button
                              type="submit"
                              onClick={handleSendContact}
                              style={{
                                marginRight: "20px",
                                marginBottom: "10px",
                                width: "80px",
                              }}
                            >
                              Submit
                            </button>
                            <button
                              style={{
                                marginRight: "20px",
                                marginBottom: "10px",
                                width: "80px",
                              }}
                              onClick={clearHandler}
                            >
                              Clear
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ContactForm;
