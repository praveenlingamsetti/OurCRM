// import index.css file for styling
import React, { useContext, useState } from "react";
import "./index.css";
// this component about score card design,downloading score card,sending scores to candidate through emails including cc
import { useNavigate, useLocation } from "react-router-dom";
const NotFound = () => {
  // useState of data to store Full Stack test data responses
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  return (
    <div>
      <div className="not-found-container">
        <img
          className="not-found-img"
          src="https://res.cloudinary.com/dahw90b2z/image/upload/v1649202458/erroring_1_wmrpgf.png"
          alt="page not found"
        />
        <h1 className="no-found-heading">Page Not Found</h1>
        <p>we are sorry, the page you requested could not be found</p>
        <p onClick={() => navigate("/login")}>
          Please go back to <span style={{ color: "blue" }}>Login page</span>
        </p>
      </div>
    </div>
  );
};
export default NotFound;
