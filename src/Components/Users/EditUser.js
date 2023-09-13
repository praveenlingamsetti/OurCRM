import React, { useState, useEffect } from "react";
import api from "../../util/api";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
//import Dashboard from '../Header/Dashboard';
import "./index.css";

// Define the initial state for user data
const initialState = {
  userId: "",
  userName: "",
  role: "",
  statusValue: "",
  reportingUsrId: "",
  reportingUsrName: "",
};

const EditUser = () => {
  const location = useLocation();
  const [dat] = useState(location.state);

  // Define states using the useState hook
  const [user, setUser] = useState(initialState);
  const [reportingToUsers, setReportingToUsers] = useState(null);
  const [extUsers, setExtUsers] = useState(null);

  const navigate = useNavigate();
  // useEffect is used for performing side effects in function components
  useEffect(() => {
    const initialFetch = async () => {
      try {
        // Fetch user data from an API and update the user state
        await api
          .get(`/api/getDtoById/${dat?.userId}`)
          .then((res) => {
            const {
              userId,
              role,
              statusValue,
              userName,
              reportingUsrId,
              reportingUsrName,
            } = res.data;
            setUser({
              ...user,
              userName,
              role,
              statusValue,
              reportingUsrId,
              reportingUsrName,
              userId,
            });
            // console.log(res.data);
          })
          .catch((err) => console.log(err));

        // Fetch all users and update external users and reporting users states
        await api
          .get("/api/getAllUsersNDtos")
          .then((res) => {
            // console.log(res.data);
            setExtUsers(res.data);
            setReportingToUsers(res.data);
          })
          .catch((err) => console.log(err.message));
      } catch (error) {
        console.log(error.message);
      }
    };
    // Call the initialFetch function when the component mounts
    initialFetch();
  }, []);

  // Function to update user details in state
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    // Depending on the selected role, update the reportingToUsers state
    if (value !== "SalesPerson") {
      setReportingToUsers(
        extUsers?.filter((item) => item.role !== "SalesPerson")
      );
    } else setReportingToUsers(extUsers);
  };

  // Function to clear all fields
  const clearHandler = () => {
    if (window.confirm("Are you sure you want to clear all fields?")) {
      setUser([]);
    }
  };

  // Function to handle form submission and update user data
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      // Send a PUT request to update user details and status
      await api.put(
        `/api/updateByAdmin/${dat?.userId}/${user?.role}/${user?.reportingUsrId}`
      );
      await api.put(`/api/updateStatus/${dat?.userId}/${user?.statusValue}`);
      toast.success("User Updated successfully");
      navigate("/all_users");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="users-container">
        <div className="buttons">
          <button
            style={{ backgroundColor: "#1d1a69" }}
            className="userbtn"
            onClick={() => navigate("/all_users")}
          >
            All Users
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
                  <h2 className="text-dark">Update User </h2>
                </div>
                <p className="text-center">User ID: {user.userId}</p>
                <div className="card-body mx-5 pt-0">
                  <form className="user_form" onSubmit={submitHandler}>
                    <div className="row">
                      <div className="col-md-6 mt-3">
                        <div className="form-group">
                          <label htmlFor="userName">
                            User Name <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            name="userName"
                            id="userName"
                            value={user.userName}
                            onChange={changeHandler}
                            className="form-control"
                            pattern="[A-Z a-z]{3,}"
                            title="Name should contain alphabets only and minimum three characters"
                          />
                        </div>
                        <div className="form-group mt-3">
                          <label htmlFor="statusValue">
                            Status <span className="required">*</span>
                          </label>
                          <select
                            value={
                              user.statusValue === "active" ||
                              user.statusValue === "Active"
                                ? "Active"
                                : "DeActive"
                            }
                            onChange={changeHandler}
                            name="statusValue"
                            className="form-select"
                            required
                          >
                            <option hidden>
                              {user.statusValue === "active" ||
                              user.statusValue === "Active"
                                ? "Active"
                                : "DeActive"}
                            </option>
                            <option value="active">Active</option>
                            <option value="deactive">DeActive</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mt-3">
                          <label htmlFor="reportingUsrId">
                            Reporting_To <span className="required">*</span>
                          </label>
                          <select
                            onChange={changeHandler}
                            className="form-select"
                            name="reportingUsrId"
                            id="reportingUsrId"
                            required
                          >
                            <option value="" hidden>
                              {user.reportingUsrName} -- {user.reportingUsrId}
                            </option>
                            {reportingToUsers &&
                              reportingToUsers.map((user) => {
                                return (
                                  <option key={user.userId} value={user.userId}>
                                    {user.userName} -- {user.userId} --{" "}
                                    {user.role}{" "}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                        <div className="form-group mt-3">
                          <label htmlFor="role">
                            Role <span className="required">*</span>
                          </label>
                          <select
                            onChange={changeHandler}
                            name="role"
                            className="form-select"
                            required
                          >
                            <option value="" hidden>
                              {user.role}
                            </option>
                            <option value="Administrator">Administrator</option>
                            <option value="Marketing User">
                              Marketing User
                            </option>
                            <option value="Marketing Manager">
                              Marketing Manager
                            </option>
                            <option value="SalesPerson">Sales Person</option>
                            <option value="Sales Manager">Sales Manager</option>
                            <option value="Supporting Manager">
                              Supporting Manager
                            </option>
                            <option value="Restricted User">
                              Restricted User
                            </option>
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

export default EditUser;
