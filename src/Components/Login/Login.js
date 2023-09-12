import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Define initial state for the user object
const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  // Initialize state variables using the useState hook
  const [user, setUser] = useState(initialState);
  //const navigate = useNavigate();

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
    await axios
      .post("/auth/login", user)
      .then((response) => {
        // console.log(response.data);
        localStorage.setItem("token", response.data.jwtToken);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userId", response.data.userId);
        toast.success("Login successful");
        if (response.status === 200) {
          // Redirect to the home page with user email in the state
          // navigate("/home", { state: user.email });
        }
        // Reset the user state to the initial state
        setUser(initialState);
        toast.success("login in");
      })
      .catch((error) => {
        console.log(error.message);
        // toast.error(error.response.data)
      });
  };
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
