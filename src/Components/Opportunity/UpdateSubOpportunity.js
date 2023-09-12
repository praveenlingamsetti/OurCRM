import React, { useState, useEffect } from "react";
import api from "../../util/api";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

// Define initial states for opportunity and opportunitySub
const initialOpportunity = { opportunityName: "", opportunitySize: "" };
const initialOpportunitySub = {
  noOfInstallements: "",
  price: "",
  duration: "",
  currency: "",
};

const UpdateOppSub = () => {
  const location = useLocation();
  // Define state variables using useState
  const [opportunitySub, setOpportunitySub] = useState(initialOpportunitySub);
  const [opportunity, setOpportunity] = useState(initialOpportunity);
  const [contactId, setContactId] = useState(null);
  const [offeringId, setOfferingId] = useState(null);
  const { state } = useLocation();
  const { oppId, oppSubId } = state;

  // Initialize the navigate function from React Router
  const navigate = useNavigate();

  // Function to get the current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const currentDate = `${year}-${month}-${day}`;
    return currentDate;
  };

  // Event handler to update opportunitySub state
  const opportunitySubHandler = (e) => {
    const { name, value } = e.target;
    setOpportunitySub({ ...opportunitySub, [name]: value });
  };
  // Event handler to update opportunity state
  const opportunityHandler = (e) => {
    const { name, value } = e.target;
    setOpportunity({ ...opportunity, [name]: value });
  };
  // Event handler to clear form fields
  const clearHandler = () => {
    if (window.confirm("Are you sure to clear fields?")) {
      setOpportunity(initialOpportunity);
      setOpportunitySub(initialOpportunitySub);
    }
  };
  // Event handler for form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    // Update opportunity data using an API PUT request
    await api
      .put(`/app/${oppId}/${contactId}/${offeringId}`, opportunity)
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
    // Update opportunitySub data using an API PUT request
    await api
      .put(`/app/latestUpdate/${oppSubId}/${oppId}`, opportunitySub)
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => console.log(err));

    toast.success("OpportunitySub updated successfully");
    navigate("/all_subopportunities", { state: localStorage.getItem("oppId") });
    setOpportunity(initialOpportunity);
    setOpportunitySub(initialOpportunitySub);
  };
  // useEffect hook to fetch initial data when the component mounts
  useEffect(() => {
    const initialFetch = async () => {
      // Fetch opportunity data using an API GET request
      await api
        .get(`/app/${oppId}`)
        .then((res) => {
          // console.log(res.data);
          const { opportunityName, opportunitySize } = res.data;
          setOpportunity({ ...opportunity, opportunityName, opportunitySize });
          setContactId(res.data.contactSub.contactSubId);
          setOfferingId(res.data.offering.offeringId);
        })
        .catch((err) => console.log(err));

      // Fetch opportunitySub data using an API GET request
      await api
        .get(`/app/getOpportunitySub/${oppSubId}`)
        .then((res) => {
          console.log(res.data);
          const { noOfInstallements, price, duration, currency } = res.data;
          setOpportunitySub({
            ...opportunitySub,
            noOfInstallements,
            price,
            duration,
            currency,
          });
        })
        .catch((err) => console.log(err));
    };
    // Call the initialFetch function when the component mounts
    initialFetch();
  }, []);

  // Render the component's UI
  return (
    <div>
      <Dashboard />
      <div className="opportunities-container">
        <div className="buttons">
          <button
            className="opportunity-list-button"
            onClick={() =>
              navigate("/all_subopportunities", {
                state: localStorage.getItem("oppId"),
              })
            }
          >
            All Subopportunities
          </button>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card mt-3">
                <div className="card-header">
                  <h2 className="text-dark">OpportunitySub Update</h2>
                </div>
                <div className="card-body pt-0">
                  <form onSubmit={submitHandler}>
                    <div className="row">
                      <div className="form-group mt-3">
                        <label htmlFor="opportunityName">
                          Opportunity Name <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          name="opportunityName"
                          id="opportunityName"
                          value={opportunity.opportunityName}
                          onChange={opportunityHandler}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-group mt-3">
                        <label htmlFor="opportunitySize">
                          Opportunity Size <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          name="opportunitySize"
                          id="opportunitySize"
                          value={opportunity.opportunitySize}
                          onChange={opportunityHandler}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-group mt-3">
                        <label htmlFor="noOfInstallments">
                          No Of Installments <span className="required">*</span>
                        </label>
                        <input
                          type="number"
                          name="noOfInstallements"
                          id="noOfInstallements"
                          value={opportunitySub.noOfInstallements}
                          onChange={opportunitySubHandler}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-group mt-3">
                        <label htmlFor="price">
                          Price<span className="required">*</span>
                        </label>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          value={opportunitySub.price}
                          onChange={opportunitySubHandler}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-group mt-3">
                        <label htmlFor="duration">
                          Duration <span className="required">*</span>
                        </label>
                        <input
                          type="date"
                          min={
                            opportunitySub.duration
                              ? opportunitySub.duration
                              : getCurrentDate()
                          }
                          name="duration"
                          id="duration"
                          value={
                            opportunitySub.duration
                              ? opportunitySub.duration
                              : getCurrentDate()
                          }
                          onChange={opportunitySubHandler}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group mt-3">
                        <label htmlFor="currency">
                          Currency <span className="required">*</span>
                        </label>
                        <select
                          className="form-control"
                          name="currency"
                          id="currency"
                          onChange={opportunitySubHandler}
                        >
                          {opportunitySub.currency ? (
                            <option value={opportunitySub.currency} hidden>
                              {opportunitySub.currency}
                            </option>
                          ) : (
                            <option value="" hidden>
                              Select
                            </option>
                          )}
                          <option value="INR : Indian rupee">
                            INR : Indian rupee
                          </option>
                          <option value="USD : United States dollar">
                            USD : United States dollar
                          </option>
                          <option value="GBP : British pound">
                            GBP : British pound
                          </option>
                          <option value="EUR : Euro">EUR : Euro</option>
                          <option value="CNY : Chinese yuan">
                            CNY : Chinese yuan
                          </option>
                          <option value="EGP : Egyptian pound">
                            EGP : Egyptian pound
                          </option>
                          <option value="CAD : Canadian dollar">
                            CAD : Canadian dollar
                          </option>
                          <option value="AUD : Australian dollar">
                            AUD : Australian dollar
                          </option>
                          <option value="BZR : Brazilian real">
                            BZR : Brazilian real
                          </option>
                          <option value="KWD : Kuwaiti dinar">
                            KWD : Kuwaiti dinar
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="input-group mt-4 d-flex justify-content-center">
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
                        Clear <i className="fa-solid fa-rotate"></i>
                      </button>
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
export default UpdateOppSub;
