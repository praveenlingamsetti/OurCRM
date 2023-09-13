// Import necessary modules and components
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast"; // Import a toast notification library
import { useNavigate } from "react-router-dom";
import "./index.css";
//import Dashboard from "../Header/Dashboard";
//import axios from "axios";
const Offering = () => {
  // Initialize a default data object for the form
  let dat = {
    offeringCategory: {
      statusValue: "",
    },
    offeringType: {
      statusValue: "",
    },
    offeringName: "",
    ctc: "",
    ceilingPrice: "",
    floorPrice: "",
    currency: "",
    validTillDate: "",
  };
  // Define state variables using the useState hook
  const [formData, setFormData] = useState(dat);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  // Define a function to handle changes in form input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Function to create and send an offering to the server
  const createOffer = (newOffer) => {
    const apiUrl = "OfferingController/create_offering";
    let token = localStorage.getItem("token");
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newOffer),
    })
      .then((response) => {
        if (response.status === 200) {
          // Display a success toast notification upon successful creation
          toast("Offering Created successfully");
          navigate("/all_offerings");
        }
      })
      .then((data) => {
        // Reset the form data after submission
        setData(dat);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // Function to handle sending the offering data to the server
  const handleSendOffer = () => {
    const offeringObj = {
      offeringCategory: {
        statusValue: formData.offeringCategory,
      },
      offeringType: {
        statusValue: formData.offeringType,
      },
      offeringName: formData.offeringName,
      ctc: formData.ctc,
      floorPrice: formData.floorPrice,
      ceilingPrice: formData.ceilingPrice,
      currency: formData.currency,
      validTillDate: formData.validTillDate,
    };
    // Call the createOffer function to send the offering data to the server
    createOffer(offeringObj);
  };
  // Function to handle the form submission
  const onSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  };
  // Function to clear form fields with confirmation
  const clearHandler = () => {
    if (window.confirm("Are you sure to clear fields?")) {
      setFormData(dat); // Reset the form data
    }
  };
  // JSX code for rendering the OfferingModule component
  return (
    <div>
      <div className="offerings-container">
        <div className="buttons">
          <button
            style={{ backgroundColor: "#1d1a69" }}
            className="offeringbtn"
            onClick={() => navigate("/all_offerings")}
          >
            All Offerings
          </button>
        </div>
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-12 ">
              <div
                className="card mt-5"
                style={{ height: "70vh", overflowY: "scroll" }}
              >
                <div className="card-header">
                  <h2 className="text-info">Add Offering</h2>
                </div>
                <div className="card-body mx-5 pt-0">
                  <form className="user_form" onSubmit={onSubmit}>
                    <div className="row">
                      <div className="col-md-6 mt-3">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="offeringCategory"
                          >
                            Offering Category{" "}
                            <span className="required">*</span>
                          </label>
                          <select
                            className="form-control"
                            type="text"
                            id="offeringCategory"
                            name="offeringCategory"
                            value={formData.offeringCategory.statusValue}
                            onChange={handleChange}
                            placeholder="Offering Category"
                            required
                          >
                            <option value={""}>Select option</option>
                            <option value={"Variable Bid Project"}>
                              Variable Bid Project
                            </option>
                            <option value={"Fixed Bid Project"}>
                              Fixed Bid Project
                            </option>
                          </select>
                        </div>
                        <div className="form-group mt-3">
                          <label className="form-label" htmlFor="offeringName">
                            Offering Name<span className="required">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="offeringName"
                            name="offeringName"
                            value={formData.offeringName}
                            onChange={handleChange}
                            placeholder="Offering Name"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mt-3">
                        <div className="form-group">
                          <label className="form-label" htmlFor="floorPrice">
                            Floor Price<span className="required">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            id="floorPrice"
                            name="floorPrice"
                            value={formData.floorPrice}
                            onChange={handleChange}
                            placeholder="Floor Price"
                            required
                          />
                        </div>
                        <div className="form-group mt-3">
                          <label className="form-label" htmlFor="validTillDate">
                            Valid Till Date<span className="required">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="date"
                            id="validTillDate"
                            name="validTillDate"
                            value={formData.validTillDate}
                            onChange={handleChange}
                            placeholder="Valid Till Date"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mt-3">
                          <label className="form-label" htmlFor="ceilingPrice">
                            Ceiling Price<span className="required">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            id="ceilingPrice"
                            name="ceilingPrice"
                            value={formData.ceilingPrice}
                            onChange={handleChange}
                            placeholder="Ceiling Price"
                            required
                          />
                        </div>
                        <div className="form-group mt-3">
                          <label className="form-label" htmlFor="ctc">
                            CTC<span className="required">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            id="ctc"
                            name="ctc"
                            value={formData.ctc}
                            onChange={handleChange}
                            placeholder="CTC"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mt-3">
                          <label className="form-label" htmlFor="currency">
                            Currency<span className="required">*</span>
                          </label>
                          <select
                            className="form-control"
                            type="text"
                            id="currency"
                            name="currency"
                            value={formData.currency}
                            onChange={handleChange}
                            placeholder="Cost Type"
                            required
                          >
                            <option value={""}>Select Currency</option>
                            <option value={"INR"}>INR "Indian Rupee"</option>
                            <option value={"USD"}>USD "US Dollar"</option>
                            <option value={"EUR"}>EUR "EURO"</option>
                            <option value={"AUD"}>
                              AUD "Australia Dollar"
                            </option>
                            <option value={"CAD"}>CAD "Canadian Dollar"</option>
                            <option value={"JPY"}>JPY "Japanese Yen" </option>
                            <option value={"CHF"}>CHF "Swiss Franc" </option>
                            <option value={"CNY"}>
                              CNY "China Yuan Renminbi"{" "}
                            </option>
                            <option value={"BZR"}>BZR "Brazilian Real" </option>
                            <option value={"SEK"}>SEK "Swedish Krona" </option>
                            <option value={"ZAR"}>
                              ZAR "South African Rand"{" "}
                            </option>
                            <option value={"HKD"}>
                              HKD "Hong Kong Dollar"{" "}
                            </option>
                          </select>
                        </div>
                        <div className="form-group mt-3">
                          <label className="form-label" htmlFor="offeringType">
                            Offering Type<span className="required">*</span>
                          </label>
                          <select
                            className="form-control"
                            type="text"
                            id="offeringType"
                            name="offeringType"
                            value={formData.offeringType.statusValue}
                            onChange={handleChange}
                            placeholder="offering Type"
                            required
                          >
                            <option value={""}>Select option</option>
                            <option value={"Product"}>Product</option>
                            <option value={"Service"}>Service</option>
                          </select>
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
                            onClick={handleSendOffer}
                          >
                            Submit
                          </button>
                          <button
                            type="button"
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
export default Offering;
