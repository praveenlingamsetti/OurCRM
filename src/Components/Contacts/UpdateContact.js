import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // Import a library for displaying toast notifications
import "./Contact.css";
import Dashboard from "../Header/Dashboard";

// Define the functional component called UpdateContact
export default function UpdateContact() {
  const navigate = useNavigate();
  const location = useLocation();
  // Retrieve the contact data from local storage
  const [contact] = useState(location.state);
  // Initialize state for the form inputs with default values from the retrieved contact data
  const [formStatus, setFormStatus] = useState({
    // Initialize with values from 'contact' or defaults to empty string if not available
    firstName: contact?.firstName,
    lastName: contact?.lastName,
    email: contact?.email,
    mobileNumber: contact?.mobileNumber,
    company: contact?.company,
    address: contact?.address,
    country: contact?.country,
    source: contact?.source,
    otherSourcetype: contact?.otherSourcetype,
    date: contact?.date,
    stageDate: contact?.stageDate, //parseDate
    websiteURL: contact?.websiteURL,
    socialMediaLink: contact?.socialMediaLink,
    contactDesignation: contact?.contactDesignation,
    contactDepartment: contact?.contactDepartment,
    contactCreatedBy: contact?.contactCreatedBy,
  });
  // Function to handle changes in form inputs
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormStatus({ ...formStatus, [name]: value });
  };

  // Function to handle the submission of the updated contact details
  const handleSendContact = (e) => {
    e.preventDefault();
    // Prepare the updated contact data
    const updateContact = {
      contactId: contact.contactId,
      firstName: formStatus.firstName,
      lastName: formStatus.lastName,
      email: formStatus.email,
      mobileNumber: formStatus.mobileNumber,
      company: formStatus.company,
      address: formStatus.address,
      country: formStatus.country,
      date: formStatus.date,
      stageDate: formStatus.stageDate,
      websiteURL: formStatus.websiteURL,
      socialMediaLink: formStatus.socialMediaLink,
      contactDesignation: formStatus.contactDesignation,
      contactDepartment: formStatus.contactDepartment,
      source: {
        statusValue: formStatus.source,
      },
      otherSourcetype: formStatus.otherSourcetype,
      contactCreatedBy: {
        userId: formStatus.contactCreatedBy,
      },
    };
    // Define the API URL for updating the contact
    const apiUrl = `/ContactController/update_contact_by_contactId/${contact.contactId}`;
    // Retrieve the authentication token from local storage
    const authToken = localStorage.getItem("token");
    fetch(apiUrl, {
      // Send a PUT request to update the contact data
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(updateContact),
    })
      .then((response) => {
        // Display a success toast notification and reload the page
        toast.success("Contact details updated successfully");
        navigate("/all_contacts");
      })
      .then((data) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Function to clear all form fields with confirmation
  const clearHandler = () => {
    if (window.confirm("Are you sure you want to clear all fields?")) {
      setFormStatus([]); // Clear all form fields
    }
  };

  // JSX code for rendering the Update Contact form
  return (
    <div>
      <Dashboard />
      <div className="contacts-container">
        <div className="buttons">
          <button
            style={{ backgroundColor: "#1d1a69" }}
            className="salesPersonbtn"
            onClick={() => navigate("/all_contacts")}
          >
            All Contacts
          </button>
        </div>
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-12">
              <div
                className="card mt-5"
                style={{ height: "70vh", overflowY: "scroll" }}
              >
                <div className="card-header">
                  <h2 className="text-info">Update Contact </h2>
                </div>
                <p className="text-center">Contact ID: {contact?.contactId}</p>
                <div className="card-body mx-5 pt-0">
                  <form className="user_form" onSubmit={handleSendContact}>
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
                            {" "}
                            Email<span className="required">*</span>{" "}
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
                          <label className="form-label" htmlFor="mobileNumber">
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
                            Contact Designation
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
                          <label
                            className="form-label"
                            htmlFor="contactCreatedBy"
                          >
                            {" "}
                            Contact Created By
                            <span className="required">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="contactCreatedBy"
                            name="contactCreatedBy"
                            disabled
                            value={formStatus.contactCreatedBy}
                            onChange={handleChange}
                            placeholder="Contact Created By"
                          />
                        </div>
                        <div className="form-group mt-3">
                          <label className="form-label" htmlFor="company">
                            {" "}
                            Company<span className="required">*</span>{" "}
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
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mt-3">
                          <label className="form-label" htmlFor="country">
                            {" "}
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
                        <div className="form-group mt-3">
                          <label className="form-label" htmlFor="source">
                            {" "}
                            Source<span className="required">*</span>
                          </label>
                          <input
                            className="form-control "
                            type="text"
                            id="source"
                            name="source"
                            disabled
                            value={formStatus.source}
                            onChange={(e) => handleChange(e)}
                            placeholder="Source"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
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
                            htmlFor="socialMediaLink"
                          >
                            Social Media Link<span className="required">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="socialMediaLink"
                            name="socialMediaLink"
                            value={formStatus.socialMediaLink}
                            onChange={handleChange}
                            placeholder="Social Media Link"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mt-3">
                          <label className="form-label" htmlFor="stageDate">
                            Stage Date<span className="required">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="date"
                            id="stageDate"
                            name="stageDate"
                            value={formStatus.stageDate}
                            onChange={handleChange}
                            placeholder="Stage Date"
                            disabled
                          />
                        </div>
                        <div className="form-group mt-3">
                          <label
                            className="form-label"
                            htmlFor="contactDepartment"
                          >
                            {" "}
                            Contact Department{" "}
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
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mt-3">
                          <label className="form-label" htmlFor="date">
                            Date<span className="required">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="date"
                            id="date"
                            name="date"
                            value={formStatus.date}
                            onChange={handleChange}
                            placeholder="Date"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-12 mt-4">
                        <div className="input-group d-flex justify-content-center">
                          <button
                            type="submit"
                            style={{
                              marginRight: "20px",
                              marginBottom: "10px",
                              width: "80px",
                            }}
                            onClick={handleSendContact}
                          >
                            Update
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
      </div>
    </div>
  );
}
