import React, { useState } from "react";
import "./App.css";
import CrmContext from "./CrmContext";
import { AdminRoutes, SalesPersonRoutes } from "./Components/routes/MainRoutes";
import Login from "./Components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./Components/NotFound";

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [role, setRole] = useState("");
  console.log("role", role);
  return (
    <CrmContext.Provider
      value={{ isDrawerOpen, setIsDrawerOpen, role, setRole }}
    >
      <Router>
        <Routes>
          {role === "SalesPerson" ? SalesPersonRoutes : AdminRoutes}
          <Route path="*" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </CrmContext.Provider>
  );
};

export default App;
