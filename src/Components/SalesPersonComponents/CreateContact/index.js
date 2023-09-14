import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
// Initialize the data object with default values
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
  //contactCreatedBy:""
  source: {
    statusValue: "",
  },
  otherSourcetype: "",
  contactCreatedBy: {
    userId: "",
  },
};
const CreateContact = () => {
  // Retrieve the user ID from local storage
  const userId = localStorage.getItem("userId");
  // State to store the form data
  const [formStatus, setFormStatus] = useState(dat);
  // State to manage visibility of "Other" input field

  const [otherInputVisible, setOtherInputVisible] = useState(false);
  // State to store the value of the "Other" input field
  const [otherInputValue, setOtherInputValue] = useState("");
  // State to store all users
  const [allUsers, setAllUsers] = useState([]);

  // Handle changes in form input fields
  const handleChange = (e) => {
    // Check if the selected source is "Other" and show the input field accordingly
    if (e.target.value === "Other") {
      setOtherInputVisible(true);
    } else {
      setOtherInputVisible(false);
    }
    const { name, value } = e.target;
    setFormStatus({ ...formStatus, [name]: value });
  };

  // Handle changes in the "Other" source input field
  const handleOtherInputChange = (event) => {
    setOtherInputValue(event.target.value);
  };
  // Function to create a new contact
  const createContact = (newContact) => {
    const apiUrl = "/ContactController/create_contact";
    // Retrieve the token from local storage
    const authToken = localStorage.getItem("token");

    // Send a POST request to create a new contact
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(newContact),
    })
      .then((response) => {
        // Show a success toast notification
        toast("Contact Created Successfully");
        // Reload the page to reflect changes
        window.location.reload();
      })
      .then((data) => {
        // Additional logic if needed
      })
      .catch((error) => {
        if (error.response.status === 503 || error.response.status === 500) {
          toast.error("Server is busy. Please try again after sometime.");
        }
      });
  };
  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
  };
  // Handle the creation of a new contact
  const handleSendContact = () => {
    // Prepare the data for creating a new contact
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
    // Set the source and otherSourcetype fields based on the source selection
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
    // Call the createContact function to create the contact
    createContact(newContact);
  };
  // Clear form fields
  const clearHandler = () => {
    if (window.confirm("Are you sure to clear fields?")) {
      setFormStatus(dat);
    }
  };
  // Render the component's UI
  return (
    <div>
      {/* Include the SalesPersonDashboard component */}

      <div>
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-12 ">
              <div
                className="card mt-5"
                style={{ height: "70vh", overflowY: "scroll" }}
              >
                <div className="card-header">
                  <h2 className="text-dark">Add Contact </h2>
                </div>
                <div className="card-body mx-5 pt-0">
                  {/* Contact creation form */}
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
                            Contact Destination{" "}
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
                            <option value={"Social Media"}>Social Media</option>
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
                            Social Media URL<span className="required">*</span>
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
      </div>
    </div>
  );
};
export default CreateContact;
