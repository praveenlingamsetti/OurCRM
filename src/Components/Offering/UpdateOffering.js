// Import necessary modules and components
import React, { useState } from "react";
import api from "../../util/api";
import toast from "react-hot-toast"; // Import library for displaying notifications
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";
//import Dashboard from '../Header/Dashboard';

export default function UpdateOffering() {
  const location = useLocation();
  const [offer] = useState(location.state); // Retrieve offering data
  const navigate = useNavigate(); // React Router's navigation function
  const parseDate = (date) => {
    // Function to parse and format date
    if (!date || isNaN(new Date(date))) {
      return new Date().toISOString().split("T")[0]; // Use current date if invalid or not provided
    }
    return new Date(date).toISOString().split("T")[0];
  };
  // State variable to store form data
  const [formData, setFormData] = useState({
    offeringCategory: offer?.offeringCategory,
    offeringType: offer?.offeringType,
    offeringName: offer?.offeringName,
    ctc: offer?.ctc,
    ceilingPrice: offer?.ceilingPrice,
    floorPrice: offer?.floorPrice,
    currency: offer?.currency,
    validTillDate: parseDate(offer?.validTillDate),
  });
  // Function to handle form input changes
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Function to handle sending the updated offering data
  const handleSendOffer = async (e) => {
    e.preventDefault();
    const updateOffer = {
      id: offer.id,
      offeringCategory: {
        statusValue: formData.offeringCategory,
      },
      offeringType: {
        statusValue: formData.offeringType,
      },
      offeringName: formData.offeringName,
      ctc: formData.ctc,
      ceilingPrice: formData.ceilingPrice,
      floorPrice: formData.floorPrice,
      currency: formData.currency,
      validTillDate: formData.validTillDate,
    };

    // Make the API call to update the contact details
    try {
      const response = await api.put(
        `/OfferingController/update_offering_by_offeringId/${offer.offeringId}`,
        updateOffer
      );
      // console.log(response)
      if (response.status === 200) {
        toast("Data Updated Successfully"); // Display a success notification
        navigate("/all_offerings");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // Function to clear form fields
  const clearHandler = () => {
    if (window.confirm("Are you sure you want to clear all fields?")) {
      setFormData({
        offeringCategory: "",
        offeringType: "",
        offeringName: "",
        ctc: "",
        ceilingPrice: "",
        floorPrice: "",
        currency: "",
      });
    }
  };
  // // Function to handle form submission
  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  // };
  // JSX code for rendering the UpdateOffering component
  return (
    <div>
      <Dashboard />
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
            <div className="col-12">
              <div
                className="card mt-5"
                style={{ height: "70vh", overflowY: "scroll" }}
              >
                <div className="card-header">
                  <h2 className="text-info">Update Offering</h2>
                </div>
                <div className="card-body mx-5 pt-0">
                  <form className="user_form" onSubmit={handleSendOffer}>
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
                            value={formData.offeringCategory}
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
                            value={formData?.offeringType}
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
                          >
                            Update
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
}
