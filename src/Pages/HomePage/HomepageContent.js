import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import Labelbox from '../../Components/labelbox/labelbox'
import CustomButton from '../../Components/Butttons/button'
import './HomepageContent.scss'
import sun from '../../Images/sun.png'
import child from '../../Images/child.png'
import money from '../../Images/money2.png'
import travel from '../../Images/travel.png'
import pet from '../../Images/pet.png'
import car from '../../Images/car.png'
import image1 from '../../Images/image1.png'
import Grid from '@material-ui/core/Grid';
import { Switch } from 'antd';
import Poster from '../../Images/homepng.png'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import Cardbody from '../../Components/Card/CardWrapper'
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import { Link } from 'react-router-dom'
import { useDispatch, connect } from 'react-redux'
import Dialog from '@mui/material/Dialog';
import { get_Slider, get_Products, Get_Testimonials, Get_Settings_News, Get_Settings_Contact, Get_policy, Get_Branch_Locator } from '../../redux/actions/AllAction'
import CarosalComp from '../../Components/Slider/Slider'
import { Create_ContactUs, Subscribe_NewsLetter } from '../../redux/actions/HomepageActions'
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ProfileGet_Api } from '../../redux/actions/DashboardActions'
import { Carousel, Row, Col} from "antd";
import FindInPageIcon from '@mui/icons-material/FindInPage';
import {GetAllCustomers} from '../../redux/actions/AddcustomersActions'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Empty } from 'antd';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const props_data = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
function HomepageContent(props) {
  let dispatch = useDispatch()
  const [spacing, setSpacing] = useState(2);
  const [SliderDetails, setSliderDetails] = useState([])
  const [ProductDetails, setProductDetails] = useState([])
  const [TestmoniDetails, setTestmoniDetails] = useState([])
  const [NewsDetails, setNewsDetails] = useState([])
  const [checked, setChecked] = useState(true);
  const [subscribe, setsubscribe] = useState({ email: "" })
  const [AgentData, setAgentData] = useState({})
  const [storeCity, setstoreCity] = useState([])
  const [Agentsearch,setAgentsearch]=useState(false)
  const [AgentDetais,setAgentDetais]=useState([])
  const [SearchData,setSearchData]=useState({})
  const [BranchData, setBranchData] = useState({
    state: "",
    city: "",
    address: []
  })
  const [BranchLocatorState, setBranchLocatorState] = useState({
    state: { value: ""},
    city: { value: "" },
  })
  const [AgentLocatorState, setAgentLocatorState] = useState({
    state: { value: ""},
    city: { value: "" },
  })
  const BranchValidation = (data, key) => {
    if (data && key === "state") {
      let CityData = []
      var Data = props.BranchData.filter((item) => {
        return (item.state === data)
      })

      var items = Data.filter((data, index, self) =>
        index === self.findIndex((t) => (
          t.city === data.city && t.id === t.id
        ))
      )
      items.map((t) => {
        CityData.push({ id: t.id, value: t.city })
      })
      setstoreCity(CityData)
    }
    let Dynobj = {
      value: data
    }
    setBranchLocatorState(prevState => ({
      ...prevState,
      [key]: Dynobj
    }))
  }
  const BranchSubmit = () => {
    if(BranchLocatorState.city.value || BranchLocatorState.state.value){
    setOpen(true);
    }
    if(BranchLocatorState.city.value && BranchLocatorState.state.value){
    var Data = props.BranchData.filter((data) => {
      return ( data.state === BranchLocatorState.state.value && data.city === BranchLocatorState.city.value)
    })
  }
    var City = props.BranchData.filter((data) => {
      return (data.city === BranchLocatorState.city.value)
    })
    let CityData = []
    CityData.push(City)
    setBranchData({
      state: Data[0]?.state,
      city:Data[0]?.city,
      address: City?.map((data) => {
        return data.address
      })
    })

    setBranchLocatorState(prevState => ({
      ...prevState,
    }))

  }
  const AgentValidation = (data, key) => {
    let Dynobj = {
      value: data
    }
    setAgentLocatorState(prevState => ({
      ...prevState,
      [key]: Dynobj
    }))
  }
  console.log(BranchData, "ddddddd")
 

  const [StateData, setStateData] = useState()
  const [Contactus, setContactus] = useState({
    name: "",
    email: "",
    phone_number:"",
  })
  let history = useHistory()

  const OnChecked = () => {
    setChecked(!checked)
    history.push({
      pathname: "/products"
    })

  }

  const termInsuranceFun = (data) => {
    if (data === "Motor Insurance") {
      history.push({
        pathname: "/motorinsurance",
        state: data
      })
    }
    else if (data === "Travel Insurance") {
      history.push({
        pathname: "/travelpolicy_insurance",
        state: data
      })
    }
    else {
      history.push({
        pathname: "/terminsurance",
        state: data
      })
    }
  }
  const OfflinePolicysChange = (data, id) => {
    var OffLine = props.OfflinePolicy.find((item) => {

      return id === item.id
    })
    history.push({
      pathname: "/PolicyView",
      state: OffLine
    })
  }
  useEffect(() => {
    dispatch(get_Slider())
    dispatch(get_Products())
    dispatch(Get_Testimonials())
    dispatch(Get_Settings_News())
    dispatch(Get_Settings_Contact())
    dispatch(Get_policy())
    dispatch(ProfileGet_Api())
    dispatch(GetAllCustomers())
  }, [])

  useEffect(() => {
    let Data = []
    let Product = []
    let Testimonial = []
    let NewsLetter = []

    props.SliderData && props.SliderData.map((data) => {
      if (data.status == 1)
        Data.push(data)
    })
    props.ProductsData && props.ProductsData.map((data) => {
      Product.push(data)
    })
    props.TestimonailData && props.TestimonailData.map((data) => {
      Testimonial.push(data)
    })
    props.NewsLetterData.length > 0 && props.NewsLetterData.map((data) => {
      NewsLetter.push(data)
    })
    setTestmoniDetails(Testimonial)
    setProductDetails(Product)
    setSliderDetails(Data)
    setNewsDetails(NewsLetter)
  }, [props.SliderData, props.ProductsData, props.TestimonailData, props.NewsLetterData, props.ContactData])
  useEffect(()=>{
    let City=[]
    let State=[]
    let Data=[]
    props.AllCustomers.filter((data,index)=>{
      if(data.role==="agent"){
      Data.push(data)
      }
    
    })
    var items = props.AllCustomers.filter((item, Index, self) =>
    Index === self.findIndex((t) => (
        t.state === item.state && t.id === t.id && t.role==="agent"
      ))

    )
    var city_data = props.AllCustomers.filter((item, Index, self) =>
    Index === self.findIndex((t) => (
        t.city === item.city && t.id === t.id && t.role==="agent"
      ))

    )
    items.map((data)=>{
      State.push({id:data.id,value:data.state})
    })
    city_data.map((data)=>{
      City.push({id:data.id,value:data.city})
    })


    setAgentDetais(Data)
    setAgentData({City,State})
  },[props.AllCustomers])

  const AgentSearch=()=>{

    if(AgentLocatorState.city.value || AgentLocatorState.state.value){
      setAgentsearch(true)

     }
      if(AgentLocatorState.state.value&&AgentLocatorState.city.value){
      var Data=AgentDetais.filter((data,index)=>{
          return (data.state === AgentLocatorState.state.value && data.city === AgentLocatorState.city.value)

        })
      }else{
        var Data=AgentDetais.filter((data,index)=>{
          return (data.state === AgentLocatorState.state.value)

        })
      }
        console.log(Data,"ddddddddgffggggg")



    setSearchData(Data
      // name:AgentDetais?.name,
      // email:AgentDetais?.email,
      // mobileno:AgentDetais?.mobileno,
      // state:AgentLocatorState.state.value,
      // city:AgentLocatorState.city.value
    )
    setAgentLocatorState(prevState => ({
      ...prevState,
    }))
  }
  const checkValidation = (data, key) => {

    setContactus(prevState => ({
      ...prevState,
      [key]: data
    }))
  }
  const SubmitContactus = (e) => {
    e.preventDefault();
    dispatch(Create_ContactUs(Contactus)).then(() => {
      Contactus.name = ""
      Contactus.email = ""
      setContactus(prevState => ({
        ...prevState,
      }))
    })
    setContactus(prevState => ({
      ...prevState,
    }))
  }
  const OnchangeEmail = (data, key) => {
    setsubscribe(prevState => ({
      ...prevState,
      [key]: data
    }))
  }
  const NewsLetterSubscribe = (e) => {
    e.preventDefault();
    dispatch(Subscribe_NewsLetter(subscribe)).then(() => {
      subscribe.email = ""
      // setContactus(prevState =>({
      //   ...prevState,
      //  }))
    })
    setContactus(prevState => ({
      ...prevState,
    }))
  }
  const [StateDetails, setStateDetails] = useState([])
  const [CityDetail, setCityDetail] = useState([])
  const [open, setOpen] = React.useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  useEffect(() => {
    dispatch(Get_Branch_Locator())
  }, [])
  useEffect(() => {

    let Data = []
    let City = []
    props.BranchData && props.BranchData.map((data) => {
      City.push({ id: data.id, value: data.status === 1 && data.city })
    })
    setStateDetails(Data)
    setCityDetail(City)
    var items = props.BranchData.filter((data, index, self) =>
      index === self.findIndex((t) => (
        t.state === data.state && t.id === t.id
      ))
    )
    items.map((data) => {
      Data.push({ id: data.id, value: data.status === 1 && data.state })
    })

    const namesArr = props.BranchData.filter((val, id) => {
      return (
        Data.indexOf(val.id) == id
      ) // this just returns true
    });
  }, [props.BranchData])
  const handleClose = (value) => {
    setOpen(false);
    setAgentsearch(false)
  };
  return (
    <div className="parent_home_page_content">
      {/* image content */}

      {/* className="img_cont_home_div" */}
      <div className="Slider_view">
      <CarosalComp>
        {SliderDetails.map((data) => {
          return (
            <>
              <div className="home_page_cont_parent">
                <div className="img_parent_div">
                  <div className="img_div">
                    <img src={"http://161.97.72.249:3001/uploads/" + data.slider_image} style={{ width: "100%", height: "100%" }} />
                  </div>
                </div>
                <div className="tex_div">
                  {data.slider_name}
                </div>
              </div>

            </>
          )
        })}
      </CarosalComp>
    </div>
    <div className="Slider_moile_view">
    <Row justify="center">
        <Col span={16}>
    <Carousel  {...props_data}>
        {SliderDetails.map((data) => {
          return (
          
                    // <div><img src={"http://161.97.72.249:3001/uploads/" + data.slider_image} style={{ width: "100%", height: "100%" }} /></div>
                   <>
                    <div className="home_page_cont_parent">
                    <div className="img_parent_div">
                      <div className="img_div">
                     
                        <img src={"http://161.97.72.249:3001/uploads/" + data.slider_image} style={{ width: "100%", height: "100%" }} />
                  
                       </div>
                    </div> 
                    <div className="tex_div">
                      {data.slider_name} 
                    </div>
                  </div>
            </>
          )
        })}
      </Carousel>
      </Col>
      </Row>
    </div>  



      <div className="items_inner">
        <Grid container spacing={2} >
          <Grid item xs={12} md={6} sm={12} lg={6} className="branch_fea_div">

            <div>
              <h3>Branch Locator</h3>
              <div className="branch_div">

                <div className="m_view_css">
                  <Labelbox type="select" labelname="Select State"
                    value={BranchLocatorState.state.value}
                    dropdown={StateDetails}
                    changeData={(data) => BranchValidation(data, "state")}
                  />
                </div>
                <div className="m_view_css">
                  <Labelbox type="select" labelname="Select City"
                    dropdown={storeCity}
                    value={BranchLocatorState.state.value}
                    changeData={(data) => BranchValidation(data, "city")}
                  />
                </div>
                <div className="cus_btn_div_b"><CustomButton btnName="Search" onBtnClick={BranchSubmit} /></div>
                {/* <div className="seacrh_mobile_view"><FindInPageIcon/></div> */}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6} sm={12} lg={6} className="branch_fea_div">
            <div>
              <h3>Agent Search</h3>
              <div className="branch_div">
                <div className="m_view_css"><Labelbox type="select" labelname="Select State"
                  dropdown={AgentData.State}
                  value={AgentLocatorState.state.value}
                  changeData={(data) => AgentValidation(data, "state")} 
                /></div>
                <div className="m_view_css"><Labelbox type="select" labelname="Select City" 
                  dropdown={AgentData.City}
                  value={AgentLocatorState.city.value}
                  changeData={(data) => AgentValidation(data, "city")}
                /></div>
                <div className="cus_btn_div_b"><CustomButton btnName="Search" onBtnClick={AgentSearch}/></div>

                {/* <div className="seacrh_mobile_view"><FindInPageIcon/></div> */}
              </div>
            </div>
          </Grid>



        </Grid>
      </div>
      {/* ourproducts */}
      <div className="items_inner">
        <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px" }}>Our Feature Products</h3>
        <Grid container spacing={3} >
          {ProductDetails.map((data, index) =>
            <>
              {data.status === 1 && data.featured_product === 1 && <Grid item xs={12} md={4} lg={4} sm={6} className="our_fea_div">
                <div className="cont_prodct_parent">
                  <div class="containerimg" onClick={() => termInsuranceFun(data.category_title)}>
                    <img src={"http://161.97.72.249:3001/uploads/" + data.thumnail} alt="Notebook" className="img_d" style={{ width: "100%" }} />
                    <div class="heading_text"><p>{data.category_title}</p></div>
                    <div class="content"><p>Get Quote Now</p></div>
                  </div>
                  {/* </Link> */}
                </div>

              </Grid>}
            </>
          )}
          {props.OfflinePolicy.map((data, index) =>
            <>
              {data.status === 1 && data.featured_product === 1 &&
                <Grid item xs={12} md={4} lg={4} sm={6} className="our_fea_div">
                  <div className="cont_prodct_parent">
                    <div class="containerimg" onClick={() => OfflinePolicysChange(data.category_title, data.id)}>
                      <img src={"http://161.97.72.249:3001/uploads/" + data.thumnail} alt="Notebook" className="img_d" style={{ width: "100%" }} />
                      <div class="heading_text"><p>{data.category_title}</p></div>
                      <div class="content"><p>Get Quote Now</p></div>
                    </div>
                    {/* </Link> */}
                  </div>

                </Grid>}
            </>
          )}

          <Grid item xs={12} md={12} lg={12} sm={12}>
            <div className="grid_togg">
              <Switch checkedChildren="More Products" unCheckedChildren="More Products" size="large" checked={checked} onChange={OnChecked} defaultChecked />
            </div>
          </Grid>
        </Grid>
        {/* card items */}
        <Grid container spacing={3} className="testimonails_grid">
          <Grid item xs={12} md={12} lg={12} sm={12}>
            <h3>Testimonials</h3>
          </Grid>
          {TestmoniDetails.map((data) =>
            <>
              {data.status === 1 &&
                <Grid item md={4} lg={4} sm={6} className="grid_paper_cont" spacing={2}>
                  <div>
                    <Paper variant="outlined" square className="paper_testi_child">
                      <div><p>{data.description}</p></div>
                      <div className="paper_divde">
                        <div>
                          <img src={"http://161.97.72.249:3001/uploads/" + data.image} />
                          <p className="p_tet">{data.name}</p>
                        </div>
                      </div>

                    </Paper>
                  </div>
                </Grid>
              }
            </>
          )}

        </Grid>
      </div>
      {/* contact us */}
      <div className="contactus_grid">
        {/*contact us  */}
        <Grid container spacing={4} >
          <Grid item xs={12} md={4} className="h_page_content">
            <h3>Contact Us </h3>
            <form onSubmit={SubmitContactus} >
              <Labelbox type="text" placeholder="Enter Name" required
                changeData={(data) => checkValidation(data, "name")}
                value={Contactus.name}
              />
              <Labelbox type="email" placeholder="Enter Email" required
                changeData={(data) => checkValidation(data, "email")}
                value={Contactus.email}
              />
               <Labelbox type="text" placeholder="Enter Phone Number" required
               maxlength={10}
                changeData={(data) => checkValidation(data, "phone_number")}
                value={Contactus.phone_number}
              />
              <div className="custom_but"><button className="btn btn-primary submit_css" type="submit" >Submit</button></div>
            </form>
          </Grid>
          {props.ContactData.map((data) =>
            <Grid item xs={12} md={8} className="h_page_content">
              <p>{data.title}</p>
              <p>{""}</p>
              <Grid container className={"contactus_grid"} spacing={2} >
                <Grid item xs={12} md={4}>
                  <b>India</b> : {data.address1}
                </Grid>
                <Grid item xs={12} md={4}>
                  <b>USA</b>: {data.address2}
                </Grid>
                <Grid item xs={12} md={4}>
                  <b>Australia</b> : {data.address3}
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>

      </div>

      {/* contact us end */}
      <div className="product_div">

        <Cardbody Customcardcss="subscribe_comp" variant>
          {NewsDetails.map((data) => {
            return (
              <>
                {data.status === 1 &&
                  <div>
                    {data.news}
                  </div>
                }
              </>
            )
          })}
          <form onSubmit={NewsLetterSubscribe} className="news_form">
            <div className="email_submit">
              <div class="input-box">
                <span class="prefix"><EmailRoundedIcon /></span>
                <Labelbox type="email" placeholder="Email" required
                  changeData={(data) => OnchangeEmail(data, "email")}
                  value={subscribe.email}
                />
              </div>
              <button className="btn btn-primary custom_sub_btn">
                <div className="inbox_inner"><MoveToInboxIcon />Subscribe</div>
              </button>
            </div>
          </form>
        </Cardbody>
        {console.log("BranchLocatorState", BranchLocatorState.state.value)}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Branch Locator
            </Typography>
            <b>State</b>
            <div>{BranchData.state}</div>
            <b>City</b>
            <div>{BranchData.city}</div>
            <b>Address</b>
            <div>{BranchData.address}</div>

          </Box>
        </Modal>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open || Agentsearch}
          fullWidth={true}
          maxWidth={open?"xs":"md"}
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            {open?"Branch Locator":"Agent Search"}
          </BootstrapDialogTitle>
          <DialogContent dividers>
            {open?<>
            <b>State</b>
            <div>{BranchData.state}</div>
            <div style={{ marginTop: "15px" }}>
              <b>City</b>
              <div>{BranchData.city}</div>
            </div>
            <div style={{ marginTop: "15px" }}>
              <b>Address</b>
              <div className="branch_data">{BranchData.address.map((data) => {
                return (
                  <li>{data}</li>
                )
              })}
              </div>
            </div>
            </>:
            <>
             <div className="policies_contain">
             {SearchData.length>0?<Table sx={{ minWidth:800  }} aria-label="simple table">
                      <TableHead>
                <TableRow>
                <TableCell>S.No</TableCell>
               <TableCell>Name</TableCell>
               <TableCell >Email</TableCell>
               <TableCell>Mobile Number</TableCell>
               <TableCell >State</TableCell>
                <TableCell>City</TableCell>
                </TableRow>
                   </TableHead>
                   <TableBody>
          {SearchData.length>0&&SearchData.map((row,index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name || "-"}
              </TableCell>
              <TableCell align="right">{row.email || "-"}</TableCell>
              <TableCell align="right">{row.mobileno || "-"}</TableCell>
              <TableCell align="right">{row.state || "-"}</TableCell>
              <TableCell align="right">{row.city || "-"}</TableCell>
            </TableRow>
          ))}
         
        </TableBody>
                   </Table>:<Empty/>}
                   </div>

<div className="card_view">
{SearchData.length>0?
<>
{SearchData.map((data,index) => {
  return(
<div className="display_serch_view">

<div style={{ marginBottom: "15px",fontSize:"14px" }}> <b>S.No</b> <div>{index+1}</div></div>
<div style={{ marginBottom: "15px",fontSize:"14px" }}> <b>Name</b> <div>{data.name || "---"}</div></div>
<div style={{ marginBottom: "15px",fontSize:"14px" }}> <b>Email</b> <div>{data?.email || "---"}</div></div>
<div style={{ marginBottom: "15px",fontSize:"14px" }}> <b>Mobile Number</b> <div>{data?.mobileno || "---"}</div></div>
<div style={{ marginBottom: "15px",fontSize:"14px" }}> <b>State</b> <div>{data?.state || "---"}</div></div>
<div style={{ marginBottom: "15px",fontSize:"14px" }}> <b>City</b> <div>{data?.city || "---"}</div></div>
</div>
)})}
</>:
<Empty/>
}
</div>
</>

           }  
            

          </DialogContent>

        </BootstrapDialog>

      </div>
    </div>
  )
}

const mapStateToProps = (state) =>
({
  SliderData: state.Reducer.SliderData || [],
  ProductsData: state.Reducer.Get_Products || [],
  TestimonailData: state.Reducer.TestimonailData || [],
  NewsLetterData: state.Reducer.NewsLetterData || [],
  ContactData: state.Reducer.ContactDetails || [],
  OfflinePolicy: state.Reducer.OfflinePolicy || [],
  BranchData: state.Reducer.BranchData || [],
  LoginDetails:state.Reducer.ProfileGetData || [],
  AllCustomers:state.Reducer.AllCustomers || []
});
export default connect(mapStateToProps)(HomepageContent);