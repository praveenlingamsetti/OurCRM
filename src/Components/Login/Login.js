import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import CrmContext from "../../CrmContext";

// Define initial state for the user object
const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const { role, setRole } = useContext(CrmContext);
  // Initialize state variables using the useState hook
  const [user, setUser] = useState(initialState);
  const [userRole, setUserRole] = useState(role);

  const navigate = useNavigate();

  // Function to handle input changes and update the user state
  const changeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  // Function to clear form fields with confirmation
  const clearHandler = () => {
    if (window.confirm("Are you sure you want to clear all fields?"))
      setUser(initialState);
  };
  // Function to show/hide the password input
  const showPassword = (inputId) => {
    const input = document.getElementById(inputId);
    const eye = document.getElementById("eye-symbol");
    // alert(input)
    if (input.type === "password") {
      input.type = "text";
      eye.classList.remove("bi-eye-fill");
      eye.classList.add("bi-eye-slash-fill");
    } else {
      input.type = "password";
      eye.classList.remove("bi-eye-slash-fill");
      eye.classList.add("bi-eye-fill");
    }
  };

  // Function to handle form submission and call login API
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", user);
      localStorage.setItem("token", response.data.jwtToken);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userId", response.data.userId);
      toast.success("Login successful");
      if (response.status === 200) {
        // Fetch the user's role after successful login
        const roleResponse = await axios.get(
          `/api/getRoleValueAndReportingTo/${user.email}`
        );
        console.log(roleResponse);
        // console.log(response);
        //setUserRole(roleResponse.data); // Store the user's role in state
        setRole(roleResponse.data.role);
        navigate("/all_tasks");
      }
      // Reset the user state to the initial state
      setUser(initialState);
      toast.success("Login in");
    } catch (error) {
      console.log(error.message);
      // Handle login error and display appropriate messages
      if (error.response) {
        // Handle error response from the login API
        toast.error(error.response.data);
      } else {
        // Handle network or other errors
        toast.error(
          "An error occurred while logging in. Please try again later."
        );
      }
    }
  };

  useEffect(() => {
    if (user.email) {
      const fetchUserRole = async () => {
        try {
          const roleResponse = await axios.get(
            `/api/getRoleValueAndReportingTo/${user.email}`
          );

          setUserRole(roleResponse.data); // Store the user's role in state
        } catch (error) {
          console.log(error.message);
          // Handle error or display an error message if needed
        }
      };

      fetchUserRole();
    }
  }, [user.email]); // Only fetch the user's role when the email changes

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-6 col-10 ">
          <div className="card mt-5">
            <div className="card-header">
              <h2 className="text-info">Login</h2>
            </div>
            <div className="card-body">
              <form onSubmit={submitHandler} className="user_form">
                <div className="form-group mt-3">
                  <label htmlFor="email">
                    Email
                    <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={user.email}
                    onChange={changeHandler}
                    className="form-control"
                    pattern="[a-z0-9._%+\-]+@[a-z0-9\-]+\.(in|com)$"
                    title="Please enter valid email address"
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="password">
                    Password
                    <span className="required">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={user.password}
                    onChange={changeHandler}
                    className="form-control"
                    required
                  />
                  <span type="button" onClick={() => showPassword("password")}>
                    <i id="eye-symbol" className="bi bi-eye-fill"></i>
                  </span>
                </div>
                <div
                  className="forgot_password"
                  type="button"
                  //  onClick={() => navigate("/forgot_password")}
                >
                  Forgot Password
                </div>
                <div className="col-12 mt-5 text-center">
                  <div className="input-group d-flex justify-content-center">
                    <button
                      type="submit"
                      style={{
                        marginRight: "20px",
                        marginBottom: "10px",
                        width: "80px",
                      }}
                      value={"Submit"}
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
