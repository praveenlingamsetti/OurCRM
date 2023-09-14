import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../util/api";
import toast from "react-hot-toast";
import "./index.css";

// SalesPersonInfo component receives the salesPersonId as a prop
function SalesPersonInfo() {
  const navigate = useNavigate();
  const salesPersonId = localStorage.getItem("salesPersonId");
  // Initialize the 'data' state variable using useState hook.
  const [data, setData] = useState([]);
  // State to store the user ID
  const [userId, setUserId] = useState("");

  // useEffect hook to fetch data when the component mounts.
  useEffect(() => {
    try {
      // Define a function 'fetchUsers' to make an API request.
      const fetchUsers = () => {
        // Fetch SalesPerson's data using their ID
        api
          .get(`/app/getSalesPerson/${salesPersonId}`)
          .then((res) => {
            // Store the fetched data in the state
            setData(res.data);
            // Extract the user ID from the data
            setUserId(res.data?.user?.userId);
          })
          .catch((err) => {
            if (err.response.status === 503 || err.response.status === 500) {
              toast.error("Server is busy. Please try again after sometime.");
            }
          });
      };
      // Call the 'fetchUsers' function to initiate the data retrieval.
      fetchUsers();
    } catch (error) {
      if (error.response.status === 503 || error.response.status === 500) {
        toast.error("Server is busy. Please try again after sometime.");
      }
    }
  }, []);

  // Extract relevant data properties from 'data' for readability.
  data["userName"] = data?.user?.userName;
  data["email"] = data?.user?.email;
  data["mobileNo"] = data?.user?.mobileNo;
  data["altMobNo"] = data?.user?.altMobileNo;
  data["role"] = data?.user?.authorities[0]?.authority;

  // Render the component's UI.
  return (
    <div>
      {/* Render the SalesPersonDashboard component */}

      <div className="users-container">
        <div className="buttons">
          {/* Button to trigger the update info section */}
          <button
            style={{ backgroundColor: "#1d1a69" }}
            className="userbtn"
            onClick={() =>
              navigate("/update_info", { state: { data, userId } })
            }
          >
            Update Profile
          </button>
        </div>
        <div className="info-details">
          <div className="info-container">
            {/* Display a greeting message with the SalesPerson's name */}
            <h1 className="head">
              Hi {data?.userName}! Here is your all personal info.
            </h1>
          </div>
          <div className="status-container">
            <div className="table-data1">
              <p className="th">Name</p>
              <p className="td">{data.userName}</p>
            </div>
            <div className="table-data1">
              <p className="th">Email</p>
              <p className="td">{data.email}</p>
            </div>
            <div className="table-data1">
              <p className="th">Mobile Number</p>
              <p className="td">{data.mobileNo}</p>
            </div>
            <div className="table-data1">
              <p className="th">Alternate Mobile Number</p>
              <p className="td">{data.altMobNo}</p>
            </div>
            <div className="table-data1">
              <p className="th">Role</p>
              <p className="td">{data.role}</p>
            </div>
            <div className="table-data1">
              <p className="th">Max Target</p>
              <p className="td">{data.maxTarget}</p>
            </div>
            <div className="table-data1">
              <p className="th">Frequency</p>
              <p className="td">{data.frequency}</p>
            </div>
            <div className="table-data1">
              <p className="th">Currency</p>
              <p className="td">{data.currency}</p>
            </div>
            <div className="table-data1">
              <p className="th">Threshold</p>
              <p className="td">{data.threshold}</p>
            </div>
            <div className="table-data1">
              <p className="th">Duration</p>
              <p className="td">{data.duration}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesPersonInfo;
