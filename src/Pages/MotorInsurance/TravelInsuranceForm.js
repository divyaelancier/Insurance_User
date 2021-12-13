import React, { useState,useEffect,useRef} from 'react'
import Cardbody from '../../Components/Card/CardWrapper'
import Labelbox  from '../../Components/labelbox/labelbox'
import Grid from "@material-ui/core/Grid";
import CustomButton from '../../Components/Butttons/button'
import { Link,useHistory } from 'react-router-dom'
import { Switch } from 'antd';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ValidationLibrary from '../../Components/validationfunction'
import { useDispatch,connect } from 'react-redux'
import { TravelFormCreate } from '../../redux/actions/FormActions'
import { notification } from 'antd'
import { Get_Customers_List } from '../../redux/actions/AddcustomersActions'
import {  EDIT_POLICY_DATA } from '../../redux/constants/constants'
import DynModel from '../../Components/Model/model'
import { Space, Radio } from 'antd'
import {CommonUpload } from '../../redux/actions/AllAction'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
 import {BASIC_INFO } from '../../redux/StateDetails/Constants'
import ReactToPrint from "react-to-print";
 function Travel_InformationDetails(props){
    function onChange(checked) {
        console.log(`switch to ${checked}`);
      }
   const [Details,setDetails]=useState({name:""}) 
   let history=useHistory()  
   const divprint=useRef(null)
   let dispatch=useDispatch()
   const [NommieData,setNommieData]=useState([])
   const [count,setcount]=useState(0)
   const [Nommiee,setNommiee]=useState([])
   const [Itemkeys, setItemKeys] = useState([])
   const [value,setvalue]=useState()
   const [Percentage,setPercentage]=useState([])
   const LoginData=JSON.parse(localStorage.getItem("data"))
   const [Modalopen,setModalopen]=useState(false)
   const [Value,setValue]=useState()
   const [StateDetail,setStateDetail]=useState()

  const [BasicInformation,setBasicInformation]=useState({
    insured_name:{
         value:"",
         validation: [{ name: "required" }],
         error: null,
         errmsg: null,
    },
    fathers_name:{
      value:"",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    grand_father_name:{
      value:"",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    house_no:{
      value:"",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    building_name:{
      value:"",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    kebele:{
      value:"",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    woreda:{
      value:"",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    phone_number:{
      value:"",
      validation: [{ name: "required" },{ name: "mobile" }],
      error: null,
      errmsg: null,
    },
    mobile_number:{
      value:"",
      validation: [{ name: "required" },{ name: "mobile" }],
      error: null,
      errmsg: null,
    },
    address1:{
      value:"",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    address2:{
      value:"",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    address3:{
      value:"",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    travel_phone_number:{
      value:"",
      validation: [{ name: "required" },{name:"mobile"}],
      error: null,
      errmsg: null,
    },
    travel_mobile_number:{
      value:"",
      validation: [{ name: "required" },{name:"mobile"}],
      error: null,
      errmsg: null,
    },
    passport_number:{
      value:"",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    place_of_issue:{
      value:"",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    date_of_issue:{
      value:"",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    date_of_expiry:{
      value:"",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    name:{
      value:"",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
     },
     n_dob:{
      value:"",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
     },
     assured:{
      value:"",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
     },
     mobile:{
      value:"",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
     },
     percent:{
      value:"",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
     },
  })
  const dynObjs = {
    percent:{value:"",validation: [{ name: "required" }],error: null,errmsg: null},
    n_dob:{value:"",validation: [{ name: "required" }],error: null,errmsg: null},
    assured:{value:"",validation: [{ name: "required" }],error: null,errmsg: null},
    mobile:{value:"",validation: [{ name: "required" },{name:"mobile"}],error: null,errmsg: null},
    name:{value:"",validation: [{ name: "required" }],error: null,errmsg: null},
  } 

  function CheckValidation(data, key) {
  
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      BasicInformation[key].validation
    );
    let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: BasicInformation[key].validation
    }

    setBasicInformation(prevState => ({
      ...prevState,
      [key]: dynObj,
    }));

  };

  function AddNommiee() {
    let o = Object.keys(Nommiee)[Object.keys(Nommiee).length - 1]
    var m = Object.keys(Nommiee[o])
    m.forEach(element => {
        var errorcheck = ValidationLibrary.checkValidation(
          Nommiee[o][element].value,
          Nommiee[o][element].validation
        )
        Nommiee[o][element].error = !errorcheck.state
        Nommiee[o][element].errmsg = errorcheck.msg
    });
    var filtererr = m.filter((ele) => Nommiee[o][ele].error === true)
    console.log(filtererr.length, "fill")
    setNommiee(prevState => ({
        ...prevState,
    }))
    if (filtererr.length > 0) { }
    else {
      let sum = 0;
  Object.values(Nommiee).forEach(n => sum+=parseInt(n.percent.value));
  if(sum>100){
    notification.error({
      message:"Nommiee Percentage Total Should  100 only"
    })
  }else{
        CancelDynObjs2()
        setcount(count + 1)
        let noofnomin =Itemkeys.length+1;
        let divvalue = value/noofnomin;
        let newarr =[];
        for(let i=0; i<noofnomin;i++){
          newarr.push(divvalue)
        }
        setPercentage(newarr)
    }
  }
   
  }
  const CancelDynObjs = () => {
    let keys = ["name", "n_dob", "percent","assured","mobile"];
    keys.map((data) => {
        try {
            dynObjs[data].value = "";
            dynObjs[data].validation = [];
            dynObjs[data].error = null;
            dynObjs[data].errmsg = null;
            BasicInformation["name"].value = "";
            BasicInformation["n_dob"].value = "";
            BasicInformation["percent"].value = "";
            BasicInformation["assured"].value = "";
            BasicInformation["mobile"].value = "";
            BasicInformation[data].validation=[]
        }
        catch (err) {
            throw err;
        }
    })
  }
  const CancelDynObjs2 = () => {
    let keys = ["name", "n_dob", "percent","assured","mobile"];
    keys.map((data) => {
        try {
            dynObjs[data].value = "";
            dynObjs[data].validation = [];
            dynObjs[data].error = null;
            dynObjs[data].errmsg = null;
            BasicInformation["name"].value = "";
            BasicInformation["n_dob"].value = "";
            BasicInformation["percent"].value = "";
            BasicInformation["assured"].value = "";
            BasicInformation["mobile"].value = "";
            BasicInformation[data].validation = [{name:"required"}];
        }
        catch (err) {
            throw err;
        }
    })
  }
  const handleRemoveClick = (data,id) => {
    delete Nommiee[data];
    let tempkey = Itemkeys
    var x = tempkey.filter(item => item !== data)
    setItemKeys(x)
    CancelDynObjs()
   
  };
  useEffect(() => {
    let obj = Object.keys(Nommiee);
    setItemKeys(obj)
  }, [Nommiee])
  useEffect(() => {
    setNommiee(
        prevState => ({
            ...prevState,
            ["obj" + count]: dynObjs,
        })
    )
  }, [count])
  function OnChangeNommiee(item,key,data,index){
    if(key==="percent" && index===0){
      setvalue(item)
    // setdisble(false)
    }
    CheckValidation(item, key);
    Nommiee[data][key].value = item
    var errorcheck = ValidationLibrary.checkValidation(
        item,
        Nommiee[data][key].validation
    );
    Nommiee[data][key].error = !errorcheck.state
    Nommiee[data][key].errmsg = errorcheck.msg
    Nommiee[data][key].validation = Nommiee[data][key].validation
  
  }

 



   const PaymentSubmit=()=>{
    const Details = props?.location?.state?.Details || props?.location?.state?.State?.Details
    if ( Value) {
      dispatch({type:BASIC_INFO,payload:BasicInformation})
      let Nommiee_data=[]
      Itemkeys.map((data)=>{
     Nommiee_data.push({
       name:Nommiee[data]["name"].value,
       n_dob:Nommiee[data]["n_dob"].value,
       assured:Nommiee[data]["assured"].value,
       percent:Nommiee[data]["percent"].value,
       mobile:Nommiee[data]["mobile"].value
     })
     })


console.log("Details",props)
         dispatch(TravelFormCreate(BasicInformation,Value,Details,Nommiee_data,props.quoteId,props.EditData.id)).then(()=>{
           history.push({
             pathname:"dashboard/mypolicyrequest"
           })
           dispatch({type:EDIT_POLICY_DATA,payload:""}) 
           Value==="Online" && openPayModal()
         })
    }
  }


  const options = {
    key: 'rzp_test_VyjrBb8Sl4Nb05',
    amount:"5000", //  = INR 1
    name: 'Awash Insurance Company',
    description: 'some description',
    image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
    handler: function(response) {
    },
    prefill: {
        name: LoginData?.name,
        contact:LoginData?.phoneno,
        email:LoginData?.email
    },
    notes: {
        address:LoginData?.city
    },
    theme: {
        color: 'blue',
        hide_topbar: false
    }
  };
  
  const openPayModal = () => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const Submit=()=>{  
  
    const Details=props.location.state.State.Details || ""
    var mainvalue = {};
    var targetkeys = Object.keys(BasicInformation);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        BasicInformation[targetkeys[i]].value,
        BasicInformation[targetkeys[i]].validation
      );
      BasicInformation[targetkeys[i]].error = !errorcheck.state;
      BasicInformation[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = BasicInformation[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter((obj) => BasicInformation[obj].error == true);
    if(filtererr.length>0){
      
    }else{
      let sum = 0;
      Object.values(Nommiee).forEach(n => sum+=parseInt(n.percent.value));
      if(sum>100 || sum!==100){
        notification.error({
          message:"Nominee Percentage Total Should  100 only"
        })
      }else{
        setModalopen(true)
      }
    }

     setBasicInformation((prevState) => ({
      ...prevState,
     }));    
    }
    useEffect(() => {
      dispatch(Get_Customers_List())
    }, [])
    useEffect(()=>{
      if(LoginData?.role==="agent"){
     const Name = props?.location?.state?.State?.Details?.customers.value
      var Data= props.Customers_list.length>0&&props.Customers_list.filter((data)=>{
             return(data.name===Name)   
         })
        //  setCustomerData(Data)
         BasicInformation.insured_name.value=Data[0]?.name
         BasicInformation.mobile_number.value=Data[0]?.phone
         setBasicInformation((prevState) => ({
           ...prevState,
         }));
        }
        const EditData=props.EditData
         if(props.EditData.length>0){
          var Data= props.Customers_list.length>0&&props.Customers_list.filter((data)=>{
            return(data.name===EditData?.basic_info?.proposer_name )  
          })
          BasicInformation.mobile_number.value=Data[0]?.phone ||  ""
          BasicInformation.insured_name.value=EditData?.basic_info?.insured_name || ""
          setBasicInformation((prevState) => ({
            ...prevState,
          }));
        }
  
     },[props.Customers_list,props.EditData])
     useEffect(() => {
      setStateDetail(props.proposal)
    }, [props.quoteId,props.proposal])
    useEffect(() => {
      const BasicInfo=props.Basic_Detail
      const Edit_Data=props.EditData
      const Personal_Data=props.EditData.personal_identification_details
      if(props.BasicInfo&&props.LoginDetails[0]?.role==="user"){
      BasicInformation.insured_name.value=Edit_Data?.basic_info?.insured_name || BasicInfo?.insured_name?.value || ""
      BasicInformation.fathers_name.value=Edit_Data?.basic_info?.father_name || BasicInfo?.fathers_name?.value || ""
      BasicInformation.grand_fathers_name.value=Edit_Data?.basic_info?.grand_father_name || BasicInfo?.grand_fathers_name?.value || ""
      BasicInformation.house_no.value=Edit_Data?.basic_info?.houser_no || BasicInfo?.house_no?.value || ""
      BasicInformation.building_name.value=Edit_Data?.basic_info?.building_name || BasicInfo?.building_name?.value || ""
      BasicInformation.kebele.value=Edit_Data?.basic_info?.kebele || BasicInfo?.kebele?.value || ""
      BasicInformation.woreda.value=Edit_Data?.basic_info?.woreda || BasicInfo?.woreda?.value || ""
      BasicInformation.phone_number.value=Edit_Data?.basic_info?.phone_number || BasicInfo?.phone_number?.value || ""
      BasicInformation.mobile_number.value=Edit_Data?.basic_info?.mobile_number || BasicInfo?.mobile_number?.value || ""
      BasicInformation.identify_type.value=Personal_Data?.identification_type || ""
      BasicInformation.card_number.value=Personal_Data?.id_card_number || ""
      BasicInformation.issued_by.value=Personal_Data?.id_issue_by || ""
      BasicInformation.issued_date.value=Personal_Data?.id_issue_date || ""
      BasicInformation.expiry_date.value=Personal_Data?.id_expiry_date || ""
      setBasicInformation((prevState) => ({
        ...prevState,
      }));
    }
    }, [props.BasicInfo])
    return(
        <div className="basic_infm_form_parent">
            {/* basic information */}
           <h3 className="main_head" style={{textAlign:"center"}}>Travel Policies Basic Information</h3>
           <h3  style={{fontWeight:"bold"}}>Insured Details</h3>
           <Grid container xs={12} spacing={3}> 
                   <Grid item md={12} xs={12} lg={12}>
           <Cardbody Customcardcss="Custom_basic">
              <Grid container spacing={2}>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Insured Name"
                      changeData={(data)=>CheckValidation(data,"insured_name")} 
                      value={BasicInformation.insured_name.value}
                      error={BasicInformation.insured_name.error}
                      errmsg={BasicInformation.insured_name.errmsg}
                      disabled={LoginData?.role==="agent"?true:false}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Father's Name"
                      changeData={(data)=>CheckValidation(data,"fathers_name")} 
                      value={BasicInformation.fathers_name.value}
                      error={BasicInformation.fathers_name.error}
                      errmsg={BasicInformation.fathers_name.errmsg}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Grand Father's Name"
                      changeData={(data)=>CheckValidation(data,"grand_father_name")} 
                      value={BasicInformation.grand_father_name.value}
                      error={BasicInformation.grand_father_name.error}
                      errmsg={BasicInformation.grand_father_name.errmsg}
                     />
                   </Grid>
                   <Grid item md={12} xs={12} lg={12} className="addres_section">
                      <div style={{fontWeight:"bold"}}>Address(Home Country)</div>
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="House No"
                      changeData={(data)=>CheckValidation(data,"house_no")} 
                      value={BasicInformation.house_no.value}
                      error={BasicInformation.house_no.error}
                      errmsg={BasicInformation.house_no.errmsg}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Building Name"
                     changeData={(data)=>CheckValidation(data,"building_name")} 
                     value={BasicInformation.building_name.value}
                     error={BasicInformation.building_name.error}
                     errmsg={BasicInformation.building_name.errmsg}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Kebele"
                       changeData={(data)=>CheckValidation(data,"kebele")} 
                       value={BasicInformation.kebele.value}
                       error={BasicInformation.kebele.error}
                       errmsg={BasicInformation.kebele.errmsg}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Woreda"
                       changeData={(data)=>CheckValidation(data,"woreda")} 
                       value={BasicInformation.woreda.value}
                       error={BasicInformation.woreda.error}
                       errmsg={BasicInformation.woreda.errmsg}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Phone Number"
                      changeData={(data)=>CheckValidation(data,"phone_number")} 
                      value={BasicInformation.phone_number.value}
                      error={BasicInformation.phone_number.error}
                      errmsg={BasicInformation.phone_number.errmsg}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Mobile Number"
                     changeData={(data)=>CheckValidation(data,"mobile_number")} 
                     value={BasicInformation.mobile_number.value}
                     error={BasicInformation.mobile_number.error}
                     errmsg={BasicInformation.mobile_number.errmsg}
                     disabled={LoginData?.role==="agent"?true:false}
                     />
                   </Grid>
                   <Grid item md={12} xs={12} lg={12} className="addres_section">
                      <div style={{fontWeight:"bold"}}>Address (Travelling Country)</div>
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Address Line 1"
                        changeData={(data)=>CheckValidation(data,"address1")} 
                        value={BasicInformation.address1.value}
                        error={BasicInformation.address1.error}
                        errmsg={BasicInformation.address1.errmsg}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Address Line 2"
                          changeData={(data)=>CheckValidation(data,"address2")} 
                          value={BasicInformation.address2.value}
                          error={BasicInformation.address2.error}
                          errmsg={BasicInformation.address2.errmsg}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Address Line 3"
                       changeData={(data)=>CheckValidation(data,"address3")} 
                       value={BasicInformation.address3.value}
                       error={BasicInformation.address3.error}
                       errmsg={BasicInformation.address3.errmsg}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Phone Number"
                      changeData={(data)=>CheckValidation(data,"travel_phone_number")} 
                      value={BasicInformation.travel_phone_number.value}
                      error={BasicInformation.travel_phone_number.error}
                      errmsg={BasicInformation.travel_phone_number.errmsg}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Mobile Number"
                       changeData={(data)=>CheckValidation(data,"travel_mobile_number")} 
                       value={BasicInformation.travel_mobile_number.value}
                       error={BasicInformation.travel_mobile_number.error}
                       errmsg={BasicInformation.travel_mobile_number.errmsg}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Passport Number"
                     changeData={(data)=>CheckValidation(data,"passport_number")} 
                     value={BasicInformation.passport_number.value}
                     error={BasicInformation.passport_number.error}
                     errmsg={BasicInformation.passport_number.errmsg}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Place of Issue"
                          changeData={(data)=>CheckValidation(data,"place_of_issue")} 
                          value={BasicInformation.place_of_issue.value}
                          error={BasicInformation.place_of_issue.error}
                          errmsg={BasicInformation.place_of_issue.errmsg}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="datepicker" labelname="Date of Issue"
                     changeData={(data)=>CheckValidation(data,"date_of_issue")} 
                     value={BasicInformation.date_of_issue.value}
                     error={BasicInformation.date_of_issue.error}
                     errmsg={BasicInformation.date_of_issue.errmsg}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="datepicker" labelname="Date of Expiry"
                       changeData={(data)=>CheckValidation(data,"date_of_expiry")} 
                       value={BasicInformation.date_of_expiry.value}
                       error={BasicInformation.date_of_expiry.error}
                       errmsg={BasicInformation.date_of_expiry.errmsg}
                     />
                   </Grid>
              </Grid>     
           </Cardbody>
                  
            </Grid> 
           </Grid> 

          {/* add nommiee */}
            <Grid container  spacing={3}> 
            {Itemkeys.length>0&&Itemkeys.map((item,index)=>{
              
      //  Nommiee[item]["percent"].value=Percentage[index] 
return(
  
       <Grid item md={12} xs={12} lg={12}>
<Cardbody Customcardcss="Custom_basic" variant>
  <Grid container spacing={2}>
       <Grid item md={4} xs={12} lg={4}>
         <Labelbox type="text" labelname="Nominee Name"
           changeData={(data) => OnChangeNommiee(data, "name",item,index)}
           value={Nommiee[item]["name"].value == "" ? BasicInformation.name.value :Nommiee[item]["name"].value }
           error={Nommiee[item]["name"].error == null ? BasicInformation.name.error :Nommiee[item]["name"].error}
           errmsg={Nommiee[item]["name"].errmsg == null ? BasicInformation.name.errmsg :Nommiee[item]["name"].errmsg}

         />
       </Grid>
       <Grid item md={4} xs={12} lg={4}>
         <Labelbox type="datepicker" labelname="Age / DOB"
          changeData={(data) => OnChangeNommiee(data, "n_dob",item,index)}
          value={Nommiee[item]["n_dob"].value == "" ? BasicInformation.n_dob.value :Nommiee[item]["n_dob"].value }
          error={Nommiee[item]["n_dob"].error == null ? BasicInformation.n_dob.error :Nommiee[item]["n_dob"].error}
          errmsg={Nommiee[item]["n_dob"].errmsg == null ? BasicInformation.n_dob.errmsg :Nommiee[item]["n_dob"].errmsg}
         />
       </Grid>
       <Grid item md={4} xs={12} lg={4}>
         <Labelbox type="text" labelname="Relationship with the Life Assured"
          changeData={(data) => OnChangeNommiee(data, "assured",item,index)}
          value={Nommiee[item]["assured"].value == "" ? BasicInformation.assured.value :Nommiee[item]["assured"].value }
          error={Nommiee[item]["assured"].error == null ? BasicInformation.assured.error :Nommiee[item]["assured"].error}
          errmsg={Nommiee[item]["assured"].errmsg == null ? BasicInformation.assured.errmsg :Nommiee[item]["assured"].errmsg}
         />
       </Grid>
       <Grid item md={4} xs={12} lg={4}>
         <Labelbox type="number" labelname="Percentage"
            changeData={(data) => OnChangeNommiee(data, "percent",item,index)}
            value={Nommiee[item]["percent"].value == "" ? BasicInformation.percent.value :Nommiee[item]["percent"].value }
            error={Nommiee[item]["percent"].error == null ? BasicInformation.percent.error :Nommiee[item]["percent"].error}
            errmsg={Nommiee[item]["percent"].errmsg == null ? BasicInformation.percent.errmsg :Nommiee[item]["percent"].errmsg}
            // error={Nommiee.percent.error}
            // errmsg={Nommiee.percent.errmsg}
         />
       </Grid>
       <Grid item md={4} xs={12} lg={4}>
         <Labelbox type="text" labelname="Mobile No"
          changeData={(data) => OnChangeNommiee(data, "mobile",item,index)}
          value={Nommiee[item]["mobile"].value == "" ? BasicInformation.mobile.value :Nommiee[item]["mobile"].value }
          error={Nommiee[item]["mobile"].error == null ? BasicInformation.mobile.error :Nommiee[item]["mobile"].error}
          errmsg={Nommiee[item]["mobile"].errmsg == null ? BasicInformation.mobile.errmsg :Nommiee[item]["mobile"].errmsg}
         />
       </Grid>
       <Grid item md={4} xs={12} lg={4}>
       {index ?<button
        className="mr10 btn_remove"  onClick={() => handleRemoveClick(item,index)}>Remove</button>:null}
      </Grid>
  </Grid>     
</Cardbody>
      
</Grid> 
)})}
              <Grid item md={12} xs={12} lg={12}>
                     <div className="last_text_div">
                         <label></label>
                          <div>Add Nominee <AddCircleIcon onClick={AddNommiee}/></div>
                    </div>
              </Grid>
              <Grid item md={12} xs={12} lg={12} style={{textAlign:"end"}}>
              <div className="bs_btn_custom"><CustomButton btnName="Pay" onBtnClick={Submit}/></div> 
              </Grid>
           </Grid> 
           <DynModel  handleChangeModel={Modalopen} modelTitle={"Payments"}
                        modalchanges="recruit_modal_css" handleChangeCloseModel={() =>setModalopen(false)} width={600} content={
                    <>
                    <div style={{marginBottom:"10px"}}>
                      <h3>Payment Method</h3>
                       <Radio.Group onChange={(e)=>setValue(e.target.value)} value={Value}>
                       <Space direction="vertical">
                       <Radio value={"Online"}>Online</Radio>
                       <Radio value={"Offline"}>Offline</Radio>
                        </Space>
                       </Radio.Group>
                       </div>
                       {console.log("Value",Value)}
                       {Value==="Offline"&&
                       <>
                        <h3>Summary Details</h3>
                       <div className="sum_details_infm" ref={divprint}> 
                       {LoginData?.role==="agent"&& <><div>Customer Name : {StateDetail?.customers?.value}</div></>}
                       <div>Travel Type : {StateDetail?.travel_type?.value}</div>
                       <div>Travel Country : {StateDetail?.travel_country?.value}</div>
                       <div>Number of days of Travel : {StateDetail?.noof_travel?.value}</div>
                       <div>Premium Amount : {25000}</div>
                        <div>Reference Number : {props.quoteId[0]?.refno}</div>
                        </div>
                       </>
                        }
                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                             <div style={{textAlign:"end",marginRight:"20px"}}> 
                       
                         <span style={{display:"flex"}}><div style={{marginRight:"10px"}}>Print Payment Slip</div><span>
                       <ReactToPrint
           trigger={() => <LocalPrintshopIcon onClick={window.print} className="printdata"/>}
           content={() =>divprint.current}
           /></span></span>
                       </div>
                      <div className="bs_btn_custom"><CustomButton btnName="Submit" onBtnClick={PaymentSubmit}/></div>  
                      </div>
                    </>   
                    }
                   />
       </div>
    )
}       

const mapStateToProps = (state) =>
({
   quoteId:state.Reducer.Travelquote || [],
   Customers_list:state.Reducer.Customers_list || [],
   EditData:state.MobileReducer.EditData || [],
   proposal: state.StateReducer.ProposalData || [],
   Basic_Detail: state.StateReducer.Basic_Info || [],
   LoginDetails:state.Reducer.ProfileGetData || []
});
export default connect(mapStateToProps)(Travel_InformationDetails);