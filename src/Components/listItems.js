import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Person2Icon from "@mui/icons-material/Person2";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AttributionIcon from "@mui/icons-material/Attribution";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import HandshakeIcon from "@mui/icons-material/Handshake";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { Link } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <Link style={{ textDecoration: "none", color: "black" }} to="/">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link style={{ textDecoration: "none", color: "black" }} to="/customers">
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItemButton>
    </Link>
    <Link to="/reports" style={{ textDecoration: "none", color: "black" }}>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>
    </Link>
    <Link to="/all_users" style={{ textDecoration: "none", color: "black" }}>
      <ListItemButton>
        <ListItemIcon>
          <Person2Icon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
    </Link>
    <Link
      to="/all_salespersons"
      style={{ textDecoration: "none", color: "black" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <AttributionIcon />
        </ListItemIcon>
        <ListItemText primary="Sales Person" />
      </ListItemButton>
    </Link>
    <Link style={{ textDecoration: "none", color: "black" }} to="/all_contacts">
      <ListItemButton>
        <ListItemIcon>
          <PermContactCalendarIcon />
        </ListItemIcon>
        <ListItemText primary="Contact" />
      </ListItemButton>
    </Link>
    <Link style={{ textDecoration: "none", color: "black" }} to="/all_tasks">
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Tasks" />
      </ListItemButton>
    </Link>
    <Link
      style={{ textDecoration: "none", color: "black" }}
      to="/all_vendors_partners"
    >
      <ListItemButton>
        <ListItemIcon>
          <HandshakeIcon />
        </ListItemIcon>
        <ListItemText primary="Partners & vendors" />
      </ListItemButton>
    </Link>
    <Link
      to="/all_offerings"
      style={{ textDecoration: "none", color: "black" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <LocalOfferIcon />
        </ListItemIcon>
        <ListItemText primary="Offering" />
      </ListItemButton>
    </Link>
    <Link
      to="/all_opportunities"
      style={{ textDecoration: "none", color: "black" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <TipsAndUpdatesIcon />
        </ListItemIcon>
        <ListItemText primary="Opportunity" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
