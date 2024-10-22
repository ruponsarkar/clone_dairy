import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import StadiumIcon from '@mui/icons-material/Stadium';
import AttachmentIcon from '@mui/icons-material/Attachment';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CreateIcon from '@mui/icons-material/Create';
import TableChartIcon from '@mui/icons-material/TableChart';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CollectionsIcon from '@mui/icons-material/Collections';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { InputBase, styled, Menu, MenuItem } from '@mui/material';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import LeaderboardSharpIcon from '@mui/icons-material/LeaderboardSharp';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SendIcon from '@mui/icons-material/Send';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SmsIcon from '@mui/icons-material/Sms';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ClassIcon from '@mui/icons-material/Class';
import NewspaperIcon from '@mui/icons-material/Newspaper';

import { useNavigate, Outlet } from 'react-router-dom';
// import { useLocation } from "react-router-dom";
// import AuthUser from '../../API/token';

const drawerWidth = 240;

const SearchBar = styled("div")(({ theme }) => ({
  backgroundColor: "#ffffff",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",

}))




const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const pages = [];

const UserDashboard = (props) => {
//   const { token, logout, user } = AuthUser();
// const params = useLocation();
const [farmer, setFarmer] = useState(JSON.parse(sessionStorage.getItem('farmer')))

// console.log("==>>", farmer);


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
    setAnchorElUser(null);
  };

  const logout=()=>{
    sessionStorage.setItem('farmer', null);
    navigate('/RegisterPage')
  }



  // ***************



  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [open, setOpen] = React.useState(false);

  const [openBlog, setBlogOpen] = React.useState(false);
  const [openPublisher, setOpenPublisher] = React.useState(false);
  const [role, setRole] = useState();

  const handleClick = () => {
    setOpen(!open);
  };

  const blogClick = () => {
    setBlogOpen(!openBlog);
  }

  const publisherClick = () => {
    setOpenPublisher(!openPublisher);
  }

  useEffect(() => {
    // if (JSON.parse(sessionStorage.getItem('user')).role === 'Admin') {
    //   setRole(JSON.parse(sessionStorage.getItem('user')).role )
    // }
    console.log("farmer===>>>", JSON.parse(sessionStorage.getItem('farmer')));
    setFarmer(JSON.parse(sessionStorage.getItem('farmer')));

  }, [])

  useEffect(()=>{
    if(!JSON.parse(sessionStorage.getItem('farmer'))){
      // window.location.href = '/'
      navigate('/RegisterPage')
      console.log("not found");
    }
    else{
      console.log("found");
    }
  })




  const drawer = (



    
    <div>
      <Toolbar>
        <a href='/user-panel'>
          {/* <img src="/logo.png" className='img-fluid' /> */}
          <h2>User Panel</h2>
        </a>
      </Toolbar>
      <Divider />
      <List>
        <ListItem disablePadding onClick={() => navigate("/user-panel")}>
          <ListItemButton>
            <ListItemIcon>
              <LeaderboardSharpIcon />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => navigate("/user-panel/subsidy")}>
          <ListItemButton>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText>Apply Subsidy</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => navigate("/user-panel/download-Certificate")}>
          <ListItemButton>
            <ListItemIcon>
              <WorkspacePremiumIcon />
            </ListItemIcon>
            <ListItemText>Download Certificate</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => navigate("/user-panel/grievance")}>
          <ListItemButton>
            <ListItemIcon>
              <SmsIcon />
            </ListItemIcon>
            <ListItemText>Grievances</ListItemText>
          </ListItemButton>
        </ListItem>
        {/* <ListItem disablePadding onClick={() => navigate("/user-panel/profile")}>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>Profie</ListItemText>
          </ListItemButton>
        </ListItem> */}
        
        {role === 'Super Admin' &&
        <>

        <ListItemButton onClick={blogClick}>
          <ListItemIcon>
            <ClassIcon />
          </ListItemIcon>
          <ListItemText primary="Admin" />
          {openBlog ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openBlog} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/#/admin/adminManagement")}>
              <ListItemIcon>
                <SubdirectoryArrowRightIcon />
              </ListItemIcon>
              <ListItemText primary="Add Admin" />
            </ListItemButton>
          </List>
        </Collapse>

        </>}

       

        <ListItem disablePadding onClick={logout}>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItemButton>
        </ListItem>

       

      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

//   const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleChange = (event) => {
//     setAuth(event.target.checked);
//   };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
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
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>


            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                  <AccountCircleIcon fontSize="large" style={{ color: 'white' }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
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
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >

        <Toolbar />
        <Outlet />

      </Box>
    </Box>
  );
}

export default UserDashboard;