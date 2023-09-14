import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../../middleware/ProtectedRoute";
import AllTaskPage from "../Task/AllTaskView";
import UserRegisterPage from "../Users/UserRegistrationView";
import EditUserPage from "../Users/EditUserView";
import AllUsersPage from "../Users/AllUserView";
import AdminDashboardPage from "../dashboard/DashboardView";
import CreateOfferingPage from "../Offering/CreateOfferingView";
import AllOfferingPage from "../Offering/OfferingView";
import UpdateOfferingPage from "../Offering/UpdateOfferingView";
import CreateTaskPage from "../Task/CreateTaskView";
import Login from "../Login/Login";
import CreateContactBySP from "../SalesPersonComponents/CreateContact/CreateConatctView";
import SalesPersonSelectedTaskPage from "../SalesPersonComponents/Tasks/SpSelectedTaskView";
import SalesPersonTasksPage from "../SalesPersonComponents/Tasks/TaskView";
import SalesPersonDashboardPage from "../SalesPersonComponents/SalesPersonDashboard/SalesPersonDashboardView";
import SelectedTask from "../Task/SelectedTask";
import UpdateContactPage from "../Contacts/UpdateContactView";
import CreateContactPage from "../Contacts/CreateContactView";
import AllContactsPage from "../Contacts/contactView";
import OpportunitySubListPage from "../Opportunity/AllSubOpportunityView";
import AllOpportunitiesPage from "../Opportunity/AllOpportunityView";
import UpdateOppSubPage from "../Opportunity/UpdateSubOppertunityView";
import AllSalesPersonPage from "../SalesPerson/AllSalesPersonView";
import UpdateSalesPersonPage from "../SalesPerson/UpdateSalesPersonView";
import ReportPage from "../Reports/ReportsView";
import AllVendorsAndPartnersPage from "../VendorsAndPartners/AllVendorsAndPartnersView";
import CreateVendorOrPartnerPage from "../VendorsAndPartners/CreateVendorAndPartnerView";
import UpdateVendorOrPartnerPage from "../VendorsAndPartners/UpdateVendorOrPartnerView";
import AllCustomersPage from "../Customers/CustomersView";
import NotFound from "../NotFound";

export const AdminRoutes = (
  <>
    <Route path="/login" element={<Login />} />
    <Route exact element={<ProtectedRoute />}>
      <Route path="/all_tasks" element={<AllTaskPage />} />
      <Route path="/customers" element={<AllCustomersPage />} />

      <Route path="/update_user" element={<EditUserPage />} />
      <Route path="/all_users" element={<AllUsersPage />} />
      <Route path="/admin_dashboard_metrics" element={<AdminDashboardPage />} />
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
      <Route path="/update_salesperson" element={<UpdateSalesPersonPage />} />
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
      <Route path="/selected-task" element={<SelectedTask />} />
    </Route>
    <Route path="*" element={<NotFound />}></Route>
  </>
);

export const SalesPersonRoutes = (
  <>
    <Route exact element={<ProtectedRoute />}>
      <Route path="/selected-task" element={<SelectedTask />} />
      <Route
        path="/salesperson_dashboard_metrics"
        element={<SalesPersonDashboardPage />}
      />
      <Route path="/salesperson_tasks" element={<SalesPersonTasksPage />} />
      <Route
        path="/sales-person-selected-task"
        element={<SalesPersonSelectedTaskPage />}
      />
      <Route
        path="/create_contact_by_salesperson"
        element={<CreateContactBySP />}
      />
    </Route>
    <Route path="*" element={<NotFound />}></Route>
  </>
);
