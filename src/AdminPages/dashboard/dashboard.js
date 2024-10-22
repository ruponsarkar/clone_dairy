import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import RedeemIcon from "@mui/icons-material/Redeem";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { InputBase, styled, Menu, MenuItem } from "@mui/material";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import LeaderboardSharpIcon from "@mui/icons-material/LeaderboardSharp";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ClassIcon from "@mui/icons-material/Class";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { useNavigate, Outlet } from "react-router-dom";
import AuthUser from "../../API/token";
import SummarizeIcon from "@mui/icons-material/Summarize";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import TopicIcon from '@mui/icons-material/Topic';

const drawerWidth = 240;

const SearchBar = styled("div")(({ theme }) => ({
  backgroundColor: "#ffffff",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

// const settings = ["Profile", "Account", "Dashboard", "Logout"];
const settings = ["Logout"];
const pages = [];

const Dashboard = (props) => {
  const { token, logout } = AuthUser();

  const logoutuser = () => {
    // if (token != undefined) {
    //   logout();
    // }
  };
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    console.log("Clicked");
    setAnchorElUser(null);
  };

  // ***************

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const [openBlog, setBlogOpen] = React.useState(false);
  const [openPay, setOpenPay] = React.useState(false);
  const [role, setRole] = useState();
  const [user, setUser] = useState();

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick1 = () => {
    setOpen1(!open1);
  };

  const blogClick = () => {
    setBlogOpen(!openBlog);
  };

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Format date to dd/mm/yyyy
  const formattedDate = `${currentDateTime
    .getDate()
    .toString()
    .padStart(2, "0")}/${(currentDateTime.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${currentDateTime.getFullYear()}`;

  // Format time to hh:mm:ss
  const formattedTime = `${currentDateTime
    .getHours()
    .toString()
    .padStart(2, "0")}:${currentDateTime
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${currentDateTime
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);

  useEffect(() => {
    // if (JSON.parse(sessionStorage.getItem('user')).role === 'Admin') {
    setRole(JSON.parse(sessionStorage.getItem("user")).role);
    // }
  }, []);
  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  const drawer = (
    <div>
      <Toolbar className="shadow text-center p-1">
        <a className="text-dark header-name text-center" href="javascript:;" onClick={() => navigate("/admin/dashboard")}>
          <h4>{role} Panel</h4>
        </a>
      </Toolbar>
      <Divider />

      {/* DCS ADMIN SIDES  */}
      {role === "DCS" && (
        <List>
          <ListItem disablePadding onClick={() => navigate("/admin/dashboard")}>
            <ListItemButton>
              <ListItemIcon>
                <LeaderboardSharpIcon />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItemButton onClick={handleClick1}>
            <ListItemIcon>
              <FolderSharedOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Farmer" />
            {open1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => navigate("/admin/AddFarmer")}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="Farmer details" />
                </ListItemButton>

                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => navigate("/admin/ApprovalTable")}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add milk amount" />
                </ListItemButton>
              </>

              {/* <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate("/admin/DLCApproval")}
              >
                <ListItemIcon>
                  <SubdirectoryArrowRightIcon />
                </ListItemIcon>
                <ListItemText primary={`DLC Approval`} />
              </ListItemButton> */}

              {/* <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate("/admin/SLSCApproval")}
              >
                <ListItemIcon>
                  <SubdirectoryArrowRightIcon />
                </ListItemIcon>
                <ListItemText primary="SLSC Approval" />
              </ListItemButton> */}
            </List>
          </Collapse>

          <ListItem disablePadding onClick={() => navigate("/admin/report")}>
            <ListItemButton>
              <ListItemIcon>
                <ContentPasteOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Reports</ListItemText>
            </ListItemButton>
          </ListItem>

          {/* <ListItem disablePadding onClick={() => navigate("/admin/Grievance")}>
            <ListItemButton>
              <ListItemIcon>
                <LiveHelpOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Grievance</ListItemText>
            </ListItemButton>
          </ListItem> */}

          <ListItem disablePadding onClick={logout}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutRoundedIcon />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      )}

      {/* DLC ADMIN SIDES  */}
      {role === "DLC" && (
        <List>
          <ListItem disablePadding onClick={() => navigate("/admin/dashboard")}>
            <ListItemButton>
              <ListItemIcon>
                <LeaderboardSharpIcon />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItemButton onClick={handleClick1}>
            <ListItemIcon>
              <FolderSharedOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Farmer" />
            {open1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => navigate("/admin/AddFarmer")}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="Farmer details" />
                </ListItemButton>

                {/* <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => navigate("/admin/ApprovalTable")}
                  >
                    <ListItemIcon>
                      <SubdirectoryArrowRightIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add milk amount" />
                  </ListItemButton> */}
              </>

              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate("/admin/DLCApproval")}
              >
                <ListItemIcon>
                  <SubdirectoryArrowRightIcon />
                </ListItemIcon>
                <ListItemText primary={`DLC Approval`} />
              </ListItemButton>

              {/* <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate("/admin/SLSCApproval")}
              >
                <ListItemIcon>
                  <SubdirectoryArrowRightIcon />
                </ListItemIcon>
                <ListItemText primary="SLSC Approval" />
              </ListItemButton> */}
            </List>
          </Collapse>

          <ListItem disablePadding onClick={() => navigate("/admin/report")}>
            <ListItemButton>
              <ListItemIcon>
                <ContentPasteOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Reports</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => navigate("/admin/documents")}>
            <ListItemButton>
              <ListItemIcon>
                <TopicIcon />
              </ListItemIcon>
              <ListItemText>Documents/Minutes</ListItemText>
            </ListItemButton>
          </ListItem>

          {/* <ListItem disablePadding onClick={() => navigate("/admin/DCSData")}>
            <ListItemButton>
              <ListItemIcon>
                <ContentPasteOutlinedIcon />
              </ListItemIcon>
              <ListItemText>DCS Data</ListItemText>
            </ListItemButton>
          </ListItem> */}

          <ListItemButton onClick={blogClick}>
            <ListItemIcon>
              <AdminPanelSettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Admin" />
            {openBlog ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openBlog} timeout="auto" unmountOnExit>
            {role === "Super Admin" && (
              <>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => navigate("/admin/adminManagement")}
                  >
                    <ListItemIcon>
                      <SubdirectoryArrowRightIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Admin" />
                  </ListItemButton>
                </List>
              </>
            )}

            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate("/admin/AddDCS")}
              >
                <ListItemIcon>
                  <SubdirectoryArrowRightIcon />
                </ListItemIcon>
                <ListItemText primary="Add DCS" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* <ListItem disablePadding onClick={() => navigate("/admin/Grievance")}>
            <ListItemButton>
              <ListItemIcon>
                <LiveHelpOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Grievance</ListItemText>
            </ListItemButton>
          </ListItem> */}

          <ListItem disablePadding onClick={logout}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutRoundedIcon />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      )}

      {/* SLSC ADMIN SIDES  */}
      {role === "SLSC" && (
        <List>
          <ListItem disablePadding onClick={() => navigate("/admin/dashboard")}>
            <ListItemButton>
              <ListItemIcon>
                <LeaderboardSharpIcon />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItemButton onClick={handleClick1}>
            <ListItemIcon>
              <FolderSharedOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Farmer" />
            {open1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => navigate("/admin/AddFarmer")}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="Farmer details" />
                </ListItemButton>
              </>

              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate("/admin/SLSCApproval")}
              >
                <ListItemIcon>
                  <SubdirectoryArrowRightIcon />
                </ListItemIcon>
                <ListItemText primary="SLSC Approval" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItem disablePadding onClick={() => navigate("/admin/report")}>
            <ListItemButton>
              <ListItemIcon>
                <ContentPasteOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Reports</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => navigate("/admin/documents")}>
            <ListItemButton>
              <ListItemIcon>
                <TopicIcon />
              </ListItemIcon>
              <ListItemText>Documents/Minutes</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => navigate("/admin/DCSData")}>
            <ListItemButton>
              <ListItemIcon>
                <ContentPasteOutlinedIcon />
              </ListItemIcon>
              <ListItemText>DCS Data</ListItemText>
            </ListItemButton>
          </ListItem>

          {/* <ListItem disablePadding onClick={() => navigate("/admin/Grievance")}>
            <ListItemButton>
              <ListItemIcon>
                <LiveHelpOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Grievance</ListItemText>
            </ListItemButton>
          </ListItem> */}

          <ListItem disablePadding onClick={logout}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutRoundedIcon />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      )}

      {/* FINANCE ADMIN SIDES  */}
      {role === "Finance" && (
        <List>
          <ListItem disablePadding onClick={() => navigate("/admin/dashboard")}>
            <ListItemButton>
              <ListItemIcon>
                <LeaderboardSharpIcon />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItemButton onClick={handleClick1}>
            <ListItemIcon>
              <FolderSharedOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Farmer" />
            {open1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => navigate("/admin/AddFarmer")}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="Farmer details" />
                </ListItemButton>
              </>
            </List>
          </Collapse>

          <ListItem disablePadding onClick={() => navigate("/admin/report")}>
            <ListItemButton>
              <ListItemIcon>
                <ContentPasteOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Reports</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => navigate("/admin/documents")}>
            <ListItemButton>
              <ListItemIcon>
                <TopicIcon />
              </ListItemIcon>
              <ListItemText>Documents/Minutes</ListItemText>
            </ListItemButton>
          </ListItem>

          {/* <ListItem disablePadding onClick={() => navigate("/admin/Grievance")}>
            <ListItemButton>
              <ListItemIcon>
                <LiveHelpOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Grievance</ListItemText>
            </ListItemButton>
          </ListItem> */}

          <ListItem disablePadding onClick={logout}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutRoundedIcon />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      )}

      {/* Super Admin ADMIN SIDES  */}
      {role === "Super Admin" && (
        <List>
          <ListItem disablePadding onClick={() => navigate("/admin/dashboard")}>
            <ListItemButton>
              <ListItemIcon>
                <LeaderboardSharpIcon />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItemButton onClick={handleClick1}>
            <ListItemIcon>
              <FolderSharedOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Farmer" />
            {open1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => navigate("/admin/AddFarmer")}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="Farmer details" />
                </ListItemButton>

                {/* <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => navigate("/admin/ApprovalTable")}
                  >
                    <ListItemIcon>
                      <SubdirectoryArrowRightIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add milk amount" />
                  </ListItemButton> */}
              </>

              {/* <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate("/admin/DLCApproval")}
              >
                <ListItemIcon>
                  <SubdirectoryArrowRightIcon />
                </ListItemIcon>
                <ListItemText primary={`DLC Approval`} />
              </ListItemButton> */}

              {/* <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate("/admin/SLSCApproval")}
              >
                <ListItemIcon>
                  <SubdirectoryArrowRightIcon />
                </ListItemIcon>
                <ListItemText primary="SLSC Approval" />
              </ListItemButton> */}
            </List>
          </Collapse>

          <ListItem disablePadding onClick={() => navigate("/admin/report")}>
            <ListItemButton>
              <ListItemIcon>
                <ContentPasteOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Reports</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => navigate("/admin/documents")}>
            <ListItemButton>
              <ListItemIcon>
                <TopicIcon />
              </ListItemIcon>
              <ListItemText>Documents/Minutes</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItemButton onClick={blogClick}>
            <ListItemIcon>
              <AdminPanelSettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Admins" />
            {openBlog ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openBlog} timeout="auto" unmountOnExit>
            {role === "Super Admin" && (
              <>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => navigate("/admin/adminManagement")}
                  >
                    <ListItemIcon>
                      <SubdirectoryArrowRightIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Admin" />
                  </ListItemButton>
                </List>
              </>
            )}

            {/* <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate("/admin/AddDCS")}
              >
                <ListItemIcon>
                  <SubdirectoryArrowRightIcon />
                </ListItemIcon>
                <ListItemText primary="Add DCS" />
              </ListItemButton>
            </List> */}
          </Collapse>

          {/* <ListItem disablePadding onClick={() => navigate("/admin/Grievance")}>
            <ListItemButton>
              <ListItemIcon>
                <LiveHelpOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Grievance</ListItemText>
            </ListItemButton>
          </ListItem> */}

          <ListItem disablePadding onClick={logout}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutRoundedIcon />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      )}

      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            {/* <Typography display={{xs: "none", sm: "none", md: "none", lg: "flex"}}>{role}</Typography> */}

            <Typography variant="h6" noWrap component="div">
            <img
              src="https://dairy.assam.gov.in/sites/all/themes/swf/images/emblem-dark.png"
              alt="Logo"
              style={{ width: '30px', marginRight: '10px' }}
            />
            </Typography>
            <Typography>
            ONLINE MILK COLLECTION & TRACKING MANAGEMENT SYSTEM
            <br />
            Directorate of Dairy Development, Assam
          </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "none" } }}>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                  <Typography display={{xs: "none", sm: "none", md: "none", lg: "flex"}}
                    className="p-2 rounded"
                    color={"white"}
                    backgroundColor={"#0a56a1"}
                  >
                    {formattedDate} - {formattedTime}
                  </Typography>
                  &nbsp;
                  <AccountCircleIcon
                    fontSize="large"
                    style={{ color: "white" }}
                  />
                  <Typography color={"white"}> {user?.name}</Typography>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={
                      setting === "Logout" ? logout : handleCloseUserMenu
                    }
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
