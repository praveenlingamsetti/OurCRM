import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LightTooltip from "@mui/material/Tooltip";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Person2Icon from "@mui/icons-material/Person2";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AttributionIcon from "@mui/icons-material/Attribution";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import HandshakeIcon from "@mui/icons-material/Handshake";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useContext } from "react";
import CrmContext from "../CrmContext";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard({ contentComponent: ContentComponent }) {
  const { isDrawerOpen, setIsDrawerOpen, role } = useContext(CrmContext);

  const AdminListItems = [
    {
      role: "Admin",
      text: "Dashboard",
      icon: <DashboardIcon />,
      to: "/admin_dashboard_metrics",
    },
    {
      role: "Admin",
      text: "Customers",
      icon: <PeopleIcon />,
      to: "/customers",
    },
    {
      role: "Admin",
      text: "Reports",
      icon: <BarChartIcon />,
      to: "/reports",
    },
    {
      role: "Admin",
      text: "Users",
      icon: <Person2Icon />,
      to: "/all_users",
    },
    {
      role: "Admin",
      text: "Sales Persons",
      icon: <AttributionIcon />,
      to: "/all_salespersons",
    },
    {
      role: "Admin",
      text: "Contacts",
      icon: <PermContactCalendarIcon />,
      to: "/all_contacts",
    },
    {
      role: "Admin",
      text: "Tasks",
      icon: <AssignmentIcon />,
      to: "/all_tasks",
    },
    {
      role: "Admin",
      text: "Partners & vendors",
      icon: <HandshakeIcon />,
      to: "/all_vendors_partners",
    },
    {
      role: "Admin",
      text: "Opportunity",
      icon: <TipsAndUpdatesIcon />,
      to: "/all_opportunities",
    },
  ];
  const SalesPersonListItem = [
    {
      role: "SalesPerson",
      text: "Dashboard",
      icon: <DashboardIcon />,
      to: "/salesperson_dashboard_metrics",
    },
    {
      role: "SalesPerson",
      text: "Contacts",
      icon: <PermContactCalendarIcon />,
      to: "/create_contact_by_salesperson",
    },
    {
      role: "SalesPerson",
      text: "Tasks",
      icon: <AssignmentIcon />,
      to: "/salesperson_tasks",
    },
  ];

  const listItems =
    role === "SalesPerson" ? SalesPersonListItem : AdminListItems;
  console.log("r", role);
  //const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    //setOpen(!open);
  };
  console.log(listItems);
  const navigate = useNavigate();

  const handleLogout = () => {
    let token = localStorage.getItem("token");
    if (token) {
      localStorage.clear();
      navigate("/login"); // Redirect user to the login page
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={isDrawerOpen}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(isDrawerOpen && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              KLOC CRM
            </Typography>
            <LightTooltip title="profile">
              <IconButton color="inherit">
                <AccountBoxIcon />
              </IconButton>
            </LightTooltip>
            <LightTooltip title="notification">
              <IconButton color="inherit">
                <Badge badgeContent={0} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </LightTooltip>
            <LightTooltip title="logout">
              <IconButton onClick={handleLogout} color="inherit">
                <PowerSettingsNewIcon />
              </IconButton>
            </LightTooltip>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={isDrawerOpen}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {listItems.map((item, index) => (
              <LightTooltip title={item.text} placement="right">
                <Link
                  key={index}
                  style={{ textDecoration: "none", color: "black" }}
                  to={item.to}
                >
                  <ListItemButton onClick={() => navigate(item.to)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </Link>
              </LightTooltip>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <ContentComponent />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
