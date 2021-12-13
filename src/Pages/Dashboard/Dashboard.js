import React,{useState,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import claimes from '../../Images/claims.png'
import quotes from '../../Images/quotes.png'
import service from '../../Images/service.png'
import locator from '../../Images/locator.png'
import faq from '../../Images/faq.png'
import profile from '../../Images/profile.png'
import settings from '../../Images/logout.png'
import Home from '../../Images/home2.png'
import policies from '../../Images/policies.png'
import pic from '../../Images/image3.png'
import Mypolicies from './DashboardComp/Mypolicies'
import {Link,Route,useLocation} from 'react-router-dom'
import './Dashboard.scss'
import { PinDropSharp } from "@material-ui/icons";
import FAQ from "./DashboardComp/FAQ";
import Myprofile from './DashboardComp/Myprofile'
import MyClaimes from './DashboardComp/MyCliams'
import MyQuotes from './DashboardComp/MyQuotes'
import BranchLocator from './DashboardComp/BranchLocator' 
import ServiceRequest from './DashboardComp/ServiceRequest'
import LineStyleIcon from '@mui/icons-material/LineStyle';
import MyPolicySRequest from './DashboardComp/MypolicyRequest'
import AddCustomers from './DashboardComp/AddCustomers'
import { ProfileGet_Api } from '../../redux/actions/DashboardActions'
import { useDispatch,connect } from "react-redux";
import { useHistory } from 'react-router-dom'
import user from '../../Images/user.jpg'
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Logo from '../../Images/ins_logo.png'
import Paper from '@mui/material/Paper';
// import AwesomeSlider from 'react-awesome-slider';
// import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    
  }
}));

 function Dashboard(props) {
  const classes = useStyles();
  const location = useLocation()
  let history=useHistory()
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [Details,setDetails]=useState([])
  const location_path = location.pathname
  const [logintrue, setlogintrue] = useState(false)
  const [modal, setmodal] = useState(false)
  let dispatch=useDispatch()
  const HandleClickOpen = (data) => {
    setmodal(true)
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
   const handleDrawerClose=()=>{
    setMobileOpen(false);
    }
    // console.log("Details",props.location.state)
    useEffect(()=>{
      dispatch(ProfileGet_Api())
    },[])
    useEffect(()=>{
      setDetails(props.LoginDetails)
      if(props.Dashoard_menu.isMobile===true){
        setMobileOpen(true)
      }
    },[props.LoginDetails,props.Dashoard_menu])

    console.log("Dashoard_menu",Details[0]?.profile)
  
  const Logout = () => {
    localStorage.clear()
    setlogintrue(false)
    history.push("/")
  }
  

  return (
    <div className={`${classes.root} dashboard_page_`}>
      <CssBaseline />
      <AppBar className={"header_parent"}
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
               
               {!localStorage.getItem("userId") ?"":<div className="icon_drawer"><Avatar alt="Remy Sharp" src={Logo} className="ava_logo" /><Typography variant="h6">Awash Insurance Company</Typography></div>}
                </div>
              <div className="sign_in_div">
                {!localStorage.getItem("userId") ?
                  <Button variant="outlined" onClick={HandleClickOpen}>Sign In</Button>
                  :""
                  // <Button variant="outlined" onClick={Logout}>Sign Out</Button>
                  // <div className="profile_name">localStorage.getItem("userId") }</div>
                }
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
                <span className="notifi"><NotificationsIcon /></span>
              </div>
            </div>


          </Toolbar>
        </AppBar>
      <div className="web_open_drawer">

      <Drawer
        className={classes.drawer}
        variant={"permanent"}
        // variant="temporary"
        open={mobileOpen}
        onClose={()=>setMobileOpen(false)}
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
        sx={{
          display: { xs: 'block', sm: 'none', md: 'none', lg: "none" },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {/* <div onClick={()=>setMobileOpen(false)}>dffghh</div> */}
        {/* <div className={classes.toolbar} /> */}
          {/* <h5 style={{textAlign:"center",color:"green",marginTop:"13px",fontWeight:"500"}}>{Details[0]?.name}</h5> */}
  
          <div style={{textAlign:"center",paddingTop:"10px"}}>
          {Details[0]?.profile==undefined || Details[0]?.profile==""?
            <img src={user} style={{width:"80px",height:"80px",borderRadius:"50px"}}/>:

            <img src={"http://161.97.72.249:3001/uploads/"+Details[0]?.profile} style={{width:"80px",height:"80px",borderRadius:"50px"}}/>
          }
          </div>
            {/* {!dashboard&&<IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>} */}
        <List>
         
            <ListItem button component={Link} to="/dashboard/mypolicies" selected={"/dashboard/mypolicies" === location.pathname}>
              <ListItemIcon><img src={policies}/></ListItemIcon><ListItemText primary={Details[0]?.role==="agent"?"Customer Policies":"My Policies"}/>
            </ListItem>
      
          
            <ListItem button component={Link} to="/dashboard/myclaimes" selected={"/dashboard/myclaimes" === location.pathname}>
              <ListItemIcon><img src={claimes}/></ListItemIcon><ListItemText primary={Details[0]?.role==="agent"?"Customer Claims":"My Claims"}/>
            </ListItem>
        
            <ListItem button component={Link} to="/dashboard/myquotes" selected={"/dashboard/myquotes" === location.pathname}>
              <ListItemIcon><img src={quotes} /></ListItemIcon><ListItemText primary={Details[0]?.role==="agent"?"Customer Quotes":"My Quotes"}/>
            </ListItem>

            <ListItem button component={Link} to="/dashboard/mypolicyrequest" selected={"/dashboard/mypolicyrequest" === location.pathname}>
              <ListItemIcon><img src={faq}/></ListItemIcon><ListItemText primary={Details[0]?.role==="agent"?"Customer Policy Request":"My Policy Request"}/>
            </ListItem>
            
            <ListItem button component={Link} to="/dashboard/servicerequest" selected={"/dashboard/servicerequest" === location.pathname}>
              <ListItemIcon><img src={service}/></ListItemIcon><ListItemText primary={"Service Request"}/>
            </ListItem>
        
            <ListItem button component={Link}  to="/dashboard/branchlocator" selected={"/dashboard/branchlocator" === location.pathname}>
              <ListItemIcon><img src={locator}/></ListItemIcon><ListItemText primary={"Branch Locator"}/>
            </ListItem>
           
            <ListItem button component={Link} to="/dashboard/faq" selected={"/dashboard/faq" === location.pathname}>
              <ListItemIcon><img src={faq}/></ListItemIcon><ListItemText primary={"FAQ"}/>
            </ListItem>

            {Details[0]?.role==="agent"&&<ListItem button component={Link} to="/dashboard/addcustomers" selected={"/dashboard/addcustomers" === location.pathname}>
              <ListItemIcon><img src={faq}/></ListItemIcon><ListItemText primary={"Add Customers"}/>
            </ListItem>}
           
            <ListItem button component={Link} to="/dashboard/myprofile"  selected={"/dashboard/myprofile" === location.pathname}>
              <ListItemIcon><img src={profile}/></ListItemIcon><ListItemText primary={"My Profile"}/>
            </ListItem>
            <ListItem button onClick={Logout}>
              <ListItemIcon><img src={settings}/></ListItemIcon><ListItemText primary={"Log Out"}/>
            </ListItem>
        </List>
      </Drawer>
      </div>
      <div className="moile_open_drawer">
      <Drawer
        className={classes.drawer}
        variant={"temporary"}
        // variant="temporary"
        open={mobileOpen}
        onClose={()=>setMobileOpen(false)}
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
        sx={{
          display: { xs: 'block', sm: 'none', md: 'none', lg: "none" },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {/* <div onClick={()=>setMobileOpen(false)}>dffghh</div> */}
        {/* <div className={classes.toolbar} /> */}
          {/* <h5 style={{textAlign:"center",color:"green",marginTop:"13px",fontWeight:"500"}}>{Details[0]?.name}</h5> */}
          {/* <div className="moile_view_logo"><div><Avatar alt="Remy Sharp" src={Logo} className="ava_logo" /></div><Typography variant="h6">Awash Insurance Company</Typography></div> */}
  
          <div style={{textAlign:"center",paddingTop:"10px"}}>
          {Details[0]?.profile==undefined || Details[0]?.profile==""?
            <img src={user} style={{width:"80px",height:"80px",borderRadius:"50px"}}/>:

            <img src={"http://161.97.72.249:3001/uploads/"+Details[0]?.profile} style={{width:"80px",height:"80px",borderRadius:"50px"}}/>
          }
          </div>

        <List>
            <ListItem button component={Link} to="/" selected={"/" === location.pathname} onClick={()=>setMobileOpen(false)}>
              <ListItemIcon><img src={Home}/></ListItemIcon><ListItemText primary={"Home"}/>
            </ListItem>

            <ListItem button component={Link} to="/dashboard/mypolicies" selected={"/dashboard/mypolicies" === location.pathname} onClick={()=>setMobileOpen(false)}>
              <ListItemIcon><img src={policies}/></ListItemIcon><ListItemText primary={Details[0]?.role==="agent"?"Customer Policies":"My Policies"}/>
            </ListItem>
      
          
            <ListItem button component={Link} to="/dashboard/myclaimes" selected={"/dashboard/myclaimes" === location.pathname} onClick={()=>setMobileOpen(false)}>
              <ListItemIcon><img src={claimes}/></ListItemIcon><ListItemText primary={Details[0]?.role==="agent"?"Customer Claims":"My Claims"}/>
            </ListItem>
        
            <ListItem button component={Link} to="/dashboard/myquotes" selected={"/dashboard/myquotes" === location.pathname} onClick={()=>setMobileOpen(false)}>
              <ListItemIcon><img src={quotes} /></ListItemIcon><ListItemText primary={Details[0]?.role==="agent"?"Customer Quotes":"My Quotes"}/>
            </ListItem>

            <ListItem button component={Link} to="/dashboard/mypolicyrequest" selected={"/dashboard/mypolicyrequest" === location.pathname} onClick={()=>setMobileOpen(false)}>
              <ListItemIcon><img src={faq}/></ListItemIcon><ListItemText primary={Details[0]?.role==="agent"?"Customer Policy Request":"My Policy Request"}/>
            </ListItem>
            
            <ListItem button component={Link} to="/dashboard/servicerequest" selected={"/dashboard/servicerequest" === location.pathname} onClick={()=>setMobileOpen(false)}>
              <ListItemIcon><img src={service}/></ListItemIcon><ListItemText primary={"Service Request"}/>
            </ListItem>
        
            <ListItem button component={Link}  to="/dashboard/branchlocator" selected={"/dashboard/branchlocator" === location.pathname} onClick={()=>setMobileOpen(false)}>
              <ListItemIcon><img src={locator}/></ListItemIcon><ListItemText primary={"Branch Locator"}/>
            </ListItem>
           
            <ListItem button component={Link} to="/dashboard/faq" selected={"/dashboard/faq" === location.pathname} onClick={()=>setMobileOpen(false)}>
              <ListItemIcon><img src={faq}/></ListItemIcon><ListItemText primary={"FAQ"}/>
            </ListItem>

            {Details[0]?.role==="agent"&&<ListItem button component={Link} to="/dashboard/addcustomers" selected={"/dashboard/addcustomers" === location.pathname} onClick={()=>setMobileOpen(false)}>
              <ListItemIcon><img src={faq}/></ListItemIcon><ListItemText primary={"Add Customers"}/>
            </ListItem>}
           
            <ListItem button component={Link} to="/dashboard/myprofile"  selected={"/dashboard/myprofile" === location.pathname} onClick={()=>setMobileOpen(false)}>
              <ListItemIcon><img src={profile}/></ListItemIcon><ListItemText primary={"My Profile"}/>
            </ListItem>
            <ListItem button  onClick={Logout}>
              <ListItemIcon><img src={settings}/></ListItemIcon><ListItemText primary={"Log Out"}/>
            </ListItem>
        </List>
      </Drawer>
      </div>
      <div className={`${classes.content} dashoad_menu_div`} >
         <Paper elevation={0} className="Dashb_paper">
           {props.children}
          {/* <div><LineStyleIcon className="dasb_ic_h"/><span>Open</span></div> */}
          <Route path={`${props.match.path}/Mypolicies`} component={Mypolicies} />
          <Route path={`${props.match.path}/faq`} component={FAQ}/>
          <Route path={`${props.match.path}/myprofile`} component={Myprofile}/>
          <Route path={`${props.match.path}/myclaimes`} component={MyClaimes}/>
          <Route path={`${props.match.path}/myquotes`} component={MyQuotes}/>
          <Route path={`${props.match.path}/branchlocator`} component={BranchLocator}/>
          <Route path={`${props.match.path}/servicerequest`} component={ServiceRequest}/> 
          <Route path={`${props.match.path}/mypolicyrequest`} component={MyPolicySRequest}/> 
          <Route path={`${props.match.path}/addcustomers`} component={AddCustomers}/>
          </Paper>

      </div>
    </div>
  );
}

const mapStateToProps = (state) =>
({
  LoginDetails:state.Reducer.ProfileGetData || [],
  Dashoard_menu:state.MobileReducer.Dashoard_menu 
});
export default connect(mapStateToProps)(Dashboard);