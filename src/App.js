import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
//import Dashboard from "./Components/Dashboard";
import AllCustomersView from "./Components/Customers/CustomersView";
import AllContactsPage from "./Components/Contacts/contactView";
import CreateContactPage from "./Components/Contacts/CreateContactView";
import UpdateContactPage from "./Components/Contacts/UpdateContactView";
import OpportunitySubListPage from "./Components/Opportunity/AllSubOpportunityView";
import UpdateOppSubPage from "./Components/Opportunity/UpdateSubOppertunityView";
import AllSalesPersonPage from "./Components/SalesPerson/AllSalesPersonView";
import UpdateSalesPersonPage from "./Components/SalesPerson/UpdateSalesPersonView";
import ReportPage from "./Components/Reports/ReportsView";
import AllVendorsAndPartnersPage from "./Components/VendorsAndPartners/AllVendorsAndPartnersView";
import CreateVendorOrPartnerPage from "./Components/VendorsAndPartners/CreateVendorAndPartnerView";
import UpdateVendorOrPartnerPage from "./Components/VendorsAndPartners/UpdateVendorOrPartnerView";
import CreateTaskPage from "./Components/Task/CreateTaskView";
import UpdateOfferingPage from "./Components/Offering/UpdateOfferingView";
import AllOfferingPage from "./Components/Offering/OfferingView";
import CreateOfferingPage from "./Components/Offering/CreateOfferingView";
import AdminDashboardPage from "./Components/dashboard/DashboardView";
import AllUsersPage from "./Components/Users/AllUserView";
import EditUserPage from "./Components/Users/EditUserView";
import UserRegisterPage from "./Components/Users/UserRegistrationView";
import SelectedTaskPage from "./Components/Task/SelectedTaskView";
import AllOpportunitiesPage from "./Components/Opportunity/AllOpportunityView";
import AllTaskPage from "./Components/Task/AllTaskView";
import Login from "./Components/Login/Login";
import SelectedTask from "./Components/Task/SelectedTask";
import CrmContext from "./CrmContext";

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [role, setRole] = useState("");

  return (
    <CrmContext.Provider
      value={{ isDrawerOpen, setIsDrawerOpen, role, setRole }}
    >
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="all_tasks" element={<AllTaskPage />} />
          <Route path="/customers" element={<AllCustomersView />} />

          <Route path="/create_user" element={<UserRegisterPage />} />
          <Route path="/update_user" element={<EditUserPage />} />
          <Route path="/all_users" element={<AllUsersPage />} />
          <Route
            path="/admin_dashboard_metrics"
            element={<AdminDashboardPage />}
          />
          <Route path="/create_offering" element={<CreateOfferingPage />} />
          <Route path="/all_offerings" element={<AllOfferingPage />} />
          <Route path="/update_offering" element={<UpdateOfferingPage />} />
          {/* <Route path="/selected_task" element={<SelectedTaskPage />} /> */}
          <Route path="/create_task" element={<CreateTaskPage />} />
          <Route path="/create_user" element={<UserRegisterPage />} />
          <Route
            path="/update_vendor_partner"
            element={<UpdateVendorOrPartnerPage />}
          />
          <Route
            path="/create_vendor_partner"
            element={<CreateVendorOrPartnerPage />}
          />
          <Route
            path="/all_vendors_partners"
            element={<AllVendorsAndPartnersPage />}
          />
          <Route path="/reports" element={<ReportPage />} />
          <Route
            path="/update_salesperson"
            element={<UpdateSalesPersonPage />}
          />
          <Route path="/create_user" element={<UserRegisterPage />} />
          <Route path="/all_salespersons" element={<AllSalesPersonPage />} />
          <Route path="/update_subopportunity" element={<UpdateOppSubPage />} />
          <Route path="/all_opportunities" element={<AllOpportunitiesPage />} />
          <Route
            path="/all_subopportunities"
            element={<OpportunitySubListPage />}
          />
          <Route path="/all_contacts" element={<AllContactsPage />} />
          <Route path="/create_contact" element={<CreateContactPage />} />
          <Route path="/update_contact" element={<UpdateContactPage />} />
          <Route path="selected-task" element={<SelectedTask />} />
        </Routes>
      </Router>
    </CrmContext.Provider>
  );
};

export default App;
