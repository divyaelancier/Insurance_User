import React, { useEffect, useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from "@material-ui/core/Container";
import Avatar from '@material-ui/core/Avatar';
import { Link } from "react-router-dom";
import Logo from '../../Images/ins_logo.png'
import './HomePage.scss'
import Poster from '../../Images/poster2.png'
import { Layout } from 'antd';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import Dashboard from '../Dashboard/Dashboard';
import { useHistory, useLocation } from 'react-router-dom'
import Login from '../../Pages/Login/Login'
import Dialog from '@material-ui/core/Dialog';
import Register from '../../Pages/Login/Register'
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import LockOpenIcon from '@mui/icons-material/LockOpen';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import { styled, useTheme } from '@mui/material/styles';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SvgIcon from '@mui/material/SvgIcon';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
// import ProfileHo sver from 'profile-hover';
import InfoIcon from '@mui/icons-material/Info';
import TooltipComp from './MenuList'
import { useDispatch } from 'react-redux'
import { DASHOARD_MENU } from '../../redux/constants/constants'
import { connect } from 'react-redux'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Modal } from 'antd'

import claimes from '../../Images/claims.png'
import quotes from '../../Images/quotes.png'
import service from '../../Images/service.png'
import locator from '../../Images/locator.png'
import faq from '../../Images/faq.png'
import profile from '../../Images/profile.png'
import settings from '../../Images/settings.png'
import policies from '../../Images/policies.png'
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4),

  }
}));
 function HomePageLayout(props) {
  const { window } = props;
  let dispatch=useDispatch()
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [logintrue, setlogintrue] = useState(false)
  const handleDrawerToggle = () => {
    // setdashboardView(!dashboardView)

    setMobileOpen(!mobileOpen);
    // dispatch({type:DASHOARD_MENU,payload:{isMobile:true,path:"dashboard"}})
  };
  const handleDrawerClose = () => {
    setMobileOpen(false);
  }
  const drawer = (
    <div>
      {/* <List>
          <ListItem button component={Link} to="/" selected={"/" === location.pathname}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
      </List> */}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;


  const classes = useStyles();
  let history = useHistory()
  let location = useLocation()
  const [footer_hide, setfooter_hide] = useState(true)
  function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined
    });

    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0
    });
  }


  const { Content } = Layout;
  const [modal, setmodal] = useState(false)
  const [register, setregister] = useState(false)
  const [Loginpath, setloginpath] = useState()
  const [dashboardView,setdashboardView]=useState(false)
  const [Details,setDetails]=useState([])
  const [dashboard,setdashboard]=useState(false)
  const location_path = location.pathname
  const Dashboardpush = () => {
    history.push({
      pathname:"/dashboard/mypolicies",
      state:true
    })
  }
  const DashhoardFun=()=>{
    setdashboardView(!dashboardView)
  }
  const HandleClose = () => {
    setmodal(false)
    setMobileOpen(false)
  }
  const HandleClickOpen = (data) => {
    setmodal(true)
    setMobileOpen(false)
  }
  useEffect(() => {
    if (location.pathname === "/dashboard/mypolicies" || location.pathname === "/dashboard/myclaimes" || location.pathname === "/dashboard/faq" || location.pathname === "/dashboard/myprofile" || location.pathname === "/dashboard/myquotes"
      || location.pathname === "/dashboard/servicerequest" || location.pathname === "/dashboard/branchlocator" || location.pathname === "/dashboard/mypolicyrequest") {
      setfooter_hide(false)
    } else {
      setfooter_hide(true)
    }


  // if(location.pathname === "/" || location.pathname === "/products" ||  location.pathname === "/medicalhistory" ||  location.pathname === "/terminsurance"
  // || location.pathname === "/basicinformation" || location.pathname === "/informationdetails" || location.pathname === "/medicaltest" ||
  //  location.pathname === "/Review" || location.pathname === "/travelpolicy_insurance" || location.pathname === "/motorinsurance" || location.pathname === "/motorinsurance_informations"
  // || location.pathname === "/travel_policy_informations" || location.pathname === "/Policyview"  || location.pathname === "/viewmodal"  ){
  //   setMobileOpen(true)
  // }else{
  //   setMobileOpen(false)
  // }
  
  // if(location.pathname === "/" || location.pathname === "/products" ||  location.pathname === "/medicalhistory" ||  location.pathname === "/terminsurance"
  // || location.pathname === "/basicinformation" || location.pathname === "/informationdetails" || location.pathname === "/medicaltest" ||
  //  location.pathname === "/Review" || location.pathname === "/travelpolicy_insurance" || location.pathname === "/motorinsurance" || location.pathname === "/motorinsurance_informations"
  // || location.pathname === "/travel_policy_informations" || location.pathname === "/Policyview"  || location.pathname === "/viewmodal"  ){
  //   setMobileOpen(true)
  // }else{
  //   setMobileOpen(false)
  // }

  // if(location.pathname === "/Mypolicies" || location.pathname === "/faq" || location.pathname === "/myprofile" || location.pathname === "/myclaimes"
  // || location.pathname === "/myquotes" || location.pathname === "/branchlocator" || location.pathname === "/branchlocator"
  // || location.pathname === "/servicerequest" || location.pathname === "/mypolicyrequest"){
  //   // setMobileOpen(false)
  //   setdashboard(true)
  // }
  
  }, [location, footer_hide,mobileOpen,dashboard])
console.log("dashboard",dashboard)
  const LoginFunTrue = (data) => {
    // localStorage.getItem("userId")
    setlogintrue(data)
  }
  const Logout = () => {
    localStorage.clear()
    setlogintrue(false)
    history.push("/")
    handleDrawerToggle()
  }
 
  useEffect(()=>{
    setDetails(props.LoginDetails)
    if(props.Dashoard_menu.isMobile===true){
      setMobileOpen(true)
    }
  },[props.LoginDetails,props.Dashoard_menu])
  console.log("location",location)
  return (
    <div className="homepage_nav">

      <ElevationScroll {...props}>
        <AppBar className={footer_hide?"header_parent":"headparent2"}
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>


            <div className="head_div_parent">
              <div>
               <IconButton
                  // color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { xs: 'block', sm: 'none', md: 'none', lg: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
               
               {<div className="icon_drawer"><Avatar alt="Remy Sharp" src={Logo} className="ava_logo" /><Typography variant="h6">Awash Insurance Company</Typography></div>}
                </div>
              <div className="sign_in_div">
                {/* {!localStorage.getItem("userId") ?
                  <Button variant="outlined" onClick={HandleClickOpen}>Sign In</Button>
                  :""
                 
                } */}
              </div>

              <div className="btn_div">
                <a className={`${location_path.endsWith("/") && "active_color"}`} onClick={() => history.push("/")}><span>Home</span></a>
                <a onClick={() => history.push("/")}>About Us</a>
                <a onClick={() => history.push("/products")} className={`${location_path.endsWith("/products") && "active_color"}`}><span>Our Products</span></a>
                <a><span>Contact Us</span></a>
                {!localStorage.getItem("userId") ?
                  <a onClick={HandleClickOpen} className={`${modal && "active_color"}`}>Sign In</a> :
                  <a onClick={Logout}>Sign Out</a>
                }
                {localStorage.getItem("userId") &&
                  <a onClick={Dashboardpush} className={`${location_path.endsWith("/dashboard/mypolicies") && "active_color"}`}>
                    <span> Dashboard </span>
                  </a>}
                <span className="notifi"><NotificationsIcon /></span>
              </div>
            </div>


          </Toolbar>
        </AppBar>
 
      </ElevationScroll>
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
          sx={{
            display: { xs: 'block', sm: 'none', md: 'none', lg: "none" },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <DrawerHeader>
            {/* {!dashboard&&<IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>} */}
            <div className="moile_view_logo"><div><Avatar alt="Remy Sharp" src={Logo} className="ava_logo" /></div><Typography variant="h6">Awash Insurance Company</Typography></div>
          </DrawerHeader>
          <List>
            <ListItem button onClick={()=>history.push("/")} selected={"/" === location.pathname} onClick={handleDrawerToggle}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
            <ListItem button onClick={handleDrawerToggle}>
              <ListItemIcon><InfoIcon /></ListItemIcon>
              <ListItemText primary={"About Us"} />
            </ListItem>
            <ListItem button component={Link} to="/products" selected={"/products" === location.pathname} onClick={handleDrawerToggle}>
              <ListItemIcon><ProductionQuantityLimitsIcon /></ListItemIcon>
              <ListItemText primary={"Our Products"} />
            </ListItem>
            <ListItem button onClick={handleDrawerToggle}>
              <ListItemIcon><ContactMailIcon /></ListItemIcon>
              <ListItemText primary={"Contact Us"} />
            </ListItem>
            {localStorage.getItem("userId") &&
            <ListItem button component={Link} to={{pathname:"/dashboard/mypolicies",state:{modal:dashboardView}}} selected={"/dashboard/mypolicies" === location.pathname} onClick={handleDrawerToggle}>
              <ListItemIcon><LineStyleIcon /></ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItem>
             }

            {localStorage.getItem("userId") ?
            <ListItem button  onClick={Logout}>
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary={"Sign Out"} />
            </ListItem>:
         <ListItem button  onClick={HandleClickOpen}>
         <ListItemIcon><ExitToAppIcon /></ListItemIcon>
         <ListItemText primary={"Sign In"} />
       </ListItem>}
          </List>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'none', md: 'none', lg: "none" },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Toolbar id="back-to-top-anchor" />
      <div>
        <div className="site-layout">

          <Box component="main">
            {props.children}
          </Box>
        </div>

        {/* </main> */}
        {/* {footer_hide && <><div style={{ textAlign: "end", padding: "0px 15px 15px 0px" }}>
          <TwitterIcon />
          <SlideshowIcon />
          <FacebookIcon />
        </div>
          <div className="footer_div">
             Contact Us > Site Map > Privacy Policy > Terms Of Use > Insurance Guide <br />Powered by Mithra
          </div></>} */}
      </div>
    
      <Modal visible={modal} fullWidth maxWidth="xs" onCancel={HandleClose}  className="signin_modal"  footer={null}>
        <Login CloseModal={HandleClose} LoginFunTrue={(data) => LoginFunTrue(data)} loginpathname={(data) => setloginpath(data)} />
      </Modal>
   
    </div>

  )
}


const mapStateToProps = (state) =>
({
  Dashoard_menu:state.MobileReducer.Dashoard_menu,
  LoginDetails:state.Reducer.ProfileGetData || [], 
});
export default connect(mapStateToProps)(HomePageLayout);