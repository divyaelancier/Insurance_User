import React, { useState, useEffect,useRef } from 'react'
import Cardbody from '../../Components/Card/CardWrapper'
import Labelbox from '../../Components/labelbox/labelbox'
import Grid from "@material-ui/core/Grid";
import CustomButton from '../../Components/Butttons/button'
import { Link, useHistory } from 'react-router-dom'
import { Switch } from 'antd';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { MotorFormCreate } from '../../redux/actions/FormActions'
import ValidationLibrary from '../../Components/validationfunction'
import { useDispatch, connect } from 'react-redux';
import { Get_Customers_List } from '../../redux/actions/AddcustomersActions'
import {  EDIT_POLICY_DATA } from '../../redux/constants/constants'
import DynModel from '../../Components/Model/model'
import { Space, Radio } from 'antd'
import {CommonUpload } from '../../redux/actions/AllAction'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import ReactToPrint from "react-to-print";
import {BASIC_INFO } from '../../redux/StateDetails/Constants'
import axios from "axios";
function InformationDetails(props) {
  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }
  let dispatch = useDispatch()
  const [Details, setDetails] = useState({ name: "" })
  const divprint=useRef(null)
  let history = useHistory()
  const [VechicleData, setVechicleData] = useState([])
  const [count, setcount] = useState(0)
  const [Nommiee, setNommiee] = useState([])
  const [Itemkeys, setItemKeys] = useState([])
  const LoginData=JSON.parse(localStorage.getItem("data"))
  const [Modalopen,setModalopen]=useState(false)
  const [UploadFiles,setUploadFiles]=useState("")
  const [StateDetail,setStateDetail]=useState()
  const [Value,setValue]=useState()
  const BasicInfo=props.Basic_Detail
  const dynObjs = {
    platenumber: { value:"", validation: [{ name: "required" }], error: null, errmsg: null },
    engine_number: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
    chassis_number: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
    noof_passengers: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
    phone: { value: "", validation: [{ name: "required" }, { name: "mobile" }], error: null, errmsg: null },
    vechicle_make: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
    vechicle_model: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
    manufacture: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
    capcity_in_liters: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
    capacity_in_quintals: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
    noof_seats: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
    driver_type: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
  }

  const [BasicInformation, setBasicInformation] = useState({
    insured_name: {
      value:"",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    fathers_name: {
      value:"",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    grand_fathers_name: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    house_no: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    building_name: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    building_name: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    woreda: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    kebele: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    phone_number: {
      value: "",
      validation: [{ name: "required" }, { name: "mobile" }],
      error: null,
      errmsg: null,
    },
    mobile_number: {
      value: "",
      validation: [{ name: "required" }, { name: "mobile" }],
      error: null,
      errmsg: null,
    },
    identify_type: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    card_number: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    issued_by: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    issued_date: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    expiry_date: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    platenumber: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
    engine_number: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
    chassis_number: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
    noof_passengers: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
    phone: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
    vechicle_make: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
    vechicle_model: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
    manufacture: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
    capcity_in_liters: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
    capacity_in_quintals: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
    noof_seats: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
    driver_type: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
  })
  
  const CheckValidation = (data, key) => {
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      BasicInformation[key].validation
    );
    let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: BasicInformation[key].validation,
    };
    setBasicInformation((prevState) => ({
      ...prevState,
      [key]: dynObj,
    }));
  }
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
      CancelDynObjs2()
      setcount(count + 1)
    }

  }
  const CancelDynObjs = () => {
    let key_Data = ["capacity_in_quintals", "chassis_number", "driver_type", "vechicle_model", "capcity_in_liters",
      "engine_number", "manufacture", "noof_passengers", "noof_seats", "phone", "platenumber", "vechicle_make"]
    key_Data.map((data) => {
      try {
        dynObjs[data].value = "";
        dynObjs[data].validation = [];
        dynObjs[data].error = null;
        dynObjs[data].errmsg = null
        BasicInformation[data].value = "";
        BasicInformation[data].validation = []
      }
      catch (err) {
        throw err;
      }
    })
  }
  const CancelDynObjs2 = () => {
    let key_Data = ["capacity_in_quintals", "chassis_number", "driver_type", "vechicle_model", "capcity_in_liters",
      "engine_number", "manufacture", "noof_passengers", "noof_seats", "phone", "platenumber", "vechicle_make"]
    key_Data.map((data) => {
      try {
        dynObjs[data].value = "";
        dynObjs[data].validation = [];
        dynObjs[data].error = null;
        dynObjs[data].errmsg = null
        BasicInformation[data].value = "";
        BasicInformation[data].validation = [{name:"required"}]
      }
      catch (err) {
        throw err;
      }
    })
  }
  const handleRemoveClick = (data, id) => {

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

  function OnChangeNommiee(item, key, data, index) {
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
        address: LoginData?.city
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

   const PaymentSubmit=()=>{
    const Details = props.location.state.Details
    
    if (Value){
      dispatch({type:BASIC_INFO,payload:BasicInformation})
      let vechile_Data = []
      Itemkeys.forEach((data) => {
        vechile_Data.push({
          platenumber: Nommiee[data]["platenumber"].value,
          engine_number: Nommiee[data]["engine_number"].value,
          chassis_number: Nommiee[data]["chassis_number"].value,
          noof_passengers: Nommiee[data]["noof_passengers"].value,
          phone: Nommiee[data]["phone"].value,
          vechicle_make: Nommiee[data]["vechicle_make"].value,
          vechicle_model: Nommiee[data]["vechicle_model"].value,
          manufacture: Nommiee[data]["manufacture"].value,
          capcity_in_liters: Nommiee[data]["capcity_in_liters"].value,
          capacity_in_quintals: Nommiee[data]["capacity_in_quintals"].value,
          noof_seats: Nommiee[data]["noof_seats"].value,
          driver_type: Nommiee[data]["driver_type"].value,

        })
      })
      dispatch(MotorFormCreate(BasicInformation,Value,Details, vechile_Data, props.quoteId,props?.EditData?.id)).then(() => {
        history.push({
          pathname: "/dashboard/mypolicyrequest"
        })
        dispatch({type:EDIT_POLICY_DATA,payload:""}) 
        Value==="Online" && openPayModal()
      })
    }
  
  }

  const Submit = () => {

    // var Data=[]

    const Details = props.location.state.Details
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
    if (filtererr.length > 0) {

    } else {
      setModalopen(true)
    }
    setBasicInformation((prevState) => ({
      ...prevState,
    }));
  }
useEffect(()=>{
  dispatch(Get_Customers_List())
},[])
  useEffect(() => {
    if(props.LoginDetails[0]?.role==="user"){
    const Edit_Data=props.EditData
    const Personal_Data=props.EditData.personal_identification_details
    BasicInformation.insured_name.value=Edit_Data?.basic_info?.insured_name || BasicInfo?.proposer_name?.value || ""
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
  }, [])
  useEffect(() => {
    dispatch(Get_Customers_List())
  }, [])
  useEffect(()=>{
    if(LoginData?.role==="agent"){
   const Name = props?.location?.state?.Details?.customers.value
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
     
   },[props.Customers_list,props.EditData])
 
  useEffect(() => {
    setStateDetail(props.proposal)
  }, [props.quoteId,props.proposal])
console.log(props.Basic_Detail,"Basic_Detail")
  return (
    <div className="basic_infm_form_parent">
      {/* basic information */}
      <h3 className="main_head">Basic Information</h3>
      <div className="b_sub_h" style={{ fontWeight: "bold" }}>Insured Details</div>
      <Grid container xs={12} spacing={3}>
        <Grid item md={12} xs={12} lg={12}>
          <Cardbody Customcardcss="Custom_basic" variant>
            <Grid container spacing={2}>
              <Grid item md={4} xs={12} lg={4}>
                <Labelbox type="text" labelname="Insured Name"
                  changeData={(data) => CheckValidation(data, "insured_name")}
                  value={BasicInformation.insured_name.value}
                  error={BasicInformation.insured_name.error}
                  errmsg={BasicInformation.insured_name.errmsg}
                  disabled={LoginData?.role==="agent"?true:false}
                />
              </Grid>
              <Grid item md={4} xs={12} lg={4}>
                <Labelbox type="text" labelname="Father's Name"
                  changeData={(data) => CheckValidation(data, "fathers_name")}
                  value={BasicInformation.fathers_name.value}
                  error={BasicInformation.fathers_name.error}
                  errmsg={BasicInformation.fathers_name.errmsg}
                />
              </Grid>
              <Grid item md={4} xs={12} lg={4}>
                <Labelbox type="text" labelname="Grand Father's Name"
                  changeData={(data) => CheckValidation(data, "grand_fathers_name")}
                  value={BasicInformation.grand_fathers_name.value}
                  error={BasicInformation.grand_fathers_name.error}
                  errmsg={BasicInformation.grand_fathers_name.errmsg}
                />
              </Grid>
              <Grid item md={12} xs={12} lg={12} className="addres_section">
                <div style={{ fontWeight: "bold" }}>Address</div>
              </Grid>
              <Grid item md={4} xs={12} lg={4}>
                <Labelbox type="text" labelname="House No"
                  changeData={(data) => CheckValidation(data, "house_no")}
                  value={BasicInformation.house_no.value}
                  error={BasicInformation.house_no.error}
                  errmsg={BasicInformation.house_no.errmsg}
                />
              </Grid>
              <Grid item md={4} xs={12} lg={4}>
                <Labelbox type="text" labelname="Building Name"
                  changeData={(data) => CheckValidation(data, "building_name")}
                  value={BasicInformation.building_name.value}
                  error={BasicInformation.building_name.error}
                  errmsg={BasicInformation.building_name.errmsg}
                />
              </Grid>
              <Grid item md={4} xs={12} lg={4}>
                <Labelbox type="text" labelname="Kebele"
                  changeData={(data) => CheckValidation(data, "kebele")}
                  value={BasicInformation.kebele.value}
                  error={BasicInformation.kebele.error}
                  errmsg={BasicInformation.kebele.errmsg}
                />
              </Grid>
              <Grid item md={4} xs={12} lg={4}>
                <Labelbox type="text" labelname="Woreda"
                  changeData={(data) => CheckValidation(data, "woreda")}
                  value={BasicInformation.woreda.value}
                  error={BasicInformation.woreda.error}
                  errmsg={BasicInformation.woreda.errmsg}
                />
              </Grid>
              <Grid item md={4} xs={12} lg={4}>
                <Labelbox type="text" labelname="Phone Number"
                  changeData={(data) => CheckValidation(data, "phone_number")}
                  value={BasicInformation.phone_number.value}
                  error={BasicInformation.phone_number.error}
                  errmsg={BasicInformation.phone_number.errmsg}
                />
              </Grid>
              <Grid item md={4} xs={12} lg={4}>
                <Labelbox type="text" labelname="Mobile Number"
                  changeData={(data) => CheckValidation(data, "mobile_number")}
                  value={BasicInformation.mobile_number.value}
                  error={BasicInformation.mobile_number.error}
                  errmsg={BasicInformation.mobile_number.errmsg}
                  disabled={LoginData?.role==="agent"?true:false}
                />
              </Grid>
            </Grid>
          </Cardbody>

        </Grid>
      </Grid>
      {/*basic information end */}
      <h3 className="main_head">Insured's Personal Identification Details</h3>
      {/* <div className="b_sub_h">Same as Proposer <Switch defaultChecked onChange={onChange} checkedChildren="Yes"/></div> */}
      <Grid container xs={12} spacing={3}>
        <Grid item md={12} xs={12} lg={12}>
          <Cardbody Customcardcss="Custom_basic" variant>
            <Grid container spacing={2}>
              <Grid item md={4} xs={12} lg={4}>
                <Labelbox type="text" labelname="Identification Type"
                  changeData={(data) => CheckValidation(data, "identify_type")}
                  value={BasicInformation.identify_type.value}
                  error={BasicInformation.identify_type.error}
                  errmsg={BasicInformation.identify_type.errmsg}
                />
              </Grid>
              <Grid item md={4} xs={12} lg={4}>
                <Labelbox type="text" labelname="ID Card Number"
                  changeData={(data) => CheckValidation(data, "card_number")}
                  value={BasicInformation.card_number.value}
                  error={BasicInformation.card_number.error}
                  errmsg={BasicInformation.card_number.errmsg}
                />
              </Grid>
              <Grid item md={4} xs={12} lg={4}>
                <Labelbox type="text" labelname="ID Issued By"
                  changeData={(data) => CheckValidation(data, "issued_by")}
                  value={BasicInformation.issued_by.value}
                  error={BasicInformation.issued_by.error}
                  errmsg={BasicInformation.issued_by.errmsg}
                />
              </Grid>

              <Grid item md={4} xs={12} lg={4}>
                <Labelbox type="datepicker" labelname="ID Issue Date"
                  changeData={(data) => CheckValidation(data, "issued_date")}
                  value={BasicInformation.issued_date.value}
                  error={BasicInformation.issued_date.error}
                  errmsg={BasicInformation.issued_date.errmsg}
                />
              </Grid>
              <Grid item md={4} xs={12} lg={4}>
                <Labelbox type="datepicker" labelname="ID Expiry Date"
                  changeData={(data) => CheckValidation(data, "expiry_date")}
                  value={BasicInformation.expiry_date.value}
                  error={BasicInformation.expiry_date.error}
                  errmsg={BasicInformation.expiry_date.errmsg}
                />
              </Grid>
            </Grid>
          </Cardbody>

        </Grid>
      </Grid>
      {/* address */}
      <h3 className="main_head">Vehicle Details</h3>
      <Grid container xs={12} spacing={3}>
        {Itemkeys.length > 0 && Itemkeys.map((item, index) => {
          return (
            <>
              <Grid item md={12} xs={12} lg={12}>
                <Cardbody Customcardcss="Custom_basic" variant>
                  <Grid container spacing={2}>

                    <Grid item md={4} xs={12} lg={4}>
                      <Labelbox type="text" labelname="Plate Number"
                        changeData={(data) => OnChangeNommiee(data, "platenumber", item, index)}
                        value={Nommiee[item]["platenumber"].value == "" ? BasicInformation.platenumber.value : Nommiee[item]["platenumber"].value}
                        error={Nommiee[item]["platenumber"].error == null ? BasicInformation.platenumber.error : Nommiee[item]["platenumber"].error}
                        errmsg={Nommiee[item]["platenumber"].errmsg == null ? BasicInformation.platenumber.errmsg : Nommiee[item]["platenumber"].errmsg}
                      />
                    </Grid>
                    <Grid item md={4} xs={12} lg={4}>
                      <Labelbox type="text" labelname="Engine Number"
                        changeData={(data) => OnChangeNommiee(data, "engine_number", item, index)}
                        value={Nommiee[item]["engine_number"].value == "" ? BasicInformation.engine_number.value : Nommiee[item]["engine_number"].value}
                        error={Nommiee[item]["engine_number"].error == null ? BasicInformation.engine_number.error : Nommiee[item]["engine_number"].error}
                        errmsg={Nommiee[item]["engine_number"].errmsg == null ? BasicInformation.engine_number.errmsg : Nommiee[item]["engine_number"].errmsg}
                      />
                    </Grid>
                    <Grid item md={4} xs={12} lg={4}>
                      <Labelbox type="text" labelname="Chassis Number"
                        changeData={(data) => OnChangeNommiee(data, "chassis_number", item, index)}
                        value={Nommiee[item]["chassis_number"].value == "" ? BasicInformation.chassis_number.value : Nommiee[item]["chassis_number"].value}
                        error={Nommiee[item]["chassis_number"].error == null ? BasicInformation.chassis_number.error : Nommiee[item]["chassis_number"].error}
                        errmsg={Nommiee[item]["chassis_number"].errmsg == null ? BasicInformation.chassis_number.errmsg : Nommiee[item]["chassis_number"].errmsg}
                      />
                    </Grid>
                    <Grid item md={4} xs={12} lg={4}>
                      <Labelbox type="text" labelname="No.of Passengers"
                        changeData={(data) => OnChangeNommiee(data, "noof_passengers", item, index)}
                        value={Nommiee[item]["noof_passengers"].value == "" ? BasicInformation.noof_passengers.value : Nommiee[item]["noof_passengers"].value}
                        error={Nommiee[item]["noof_passengers"].error == null ? BasicInformation.noof_passengers.error : Nommiee[item]["noof_passengers"].error}
                        errmsg={Nommiee[item]["noof_passengers"].errmsg == null ? BasicInformation.noof_passengers.errmsg : Nommiee[item]["noof_passengers"].errmsg}
                      />
                    </Grid>
                    <Grid item md={4} xs={12} lg={4}>
                      <Labelbox type="text" labelname="Phone Number"
                        changeData={(data) => OnChangeNommiee(data, "phone", item, index)}
                        value={Nommiee[item]["phone"].value == "" ? BasicInformation.phone.value : Nommiee[item]["phone"].value}
                        error={Nommiee[item]["phone"].error == null ? BasicInformation.phone.error : Nommiee[item]["phone"].error}
                        errmsg={Nommiee[item]["phone"].errmsg == null ? BasicInformation.phone.errmsg : Nommiee[item]["phone"].errmsg}
                      />
                    </Grid>
                    <Grid item md={4} xs={12} lg={4}>
                      <Labelbox type="text" labelname="Vehicle Make"
                        changeData={(data) => OnChangeNommiee(data, "vechicle_make", item, index)}
                        value={Nommiee[item]["vechicle_make"].value == "" ? BasicInformation.vechicle_make.value : Nommiee[item]["vechicle_make"].value}
                        error={Nommiee[item]["vechicle_make"].error == null ? BasicInformation.vechicle_make.error : Nommiee[item]["vechicle_make"].error}
                        errmsg={Nommiee[item]["vechicle_make"].errmsg == null ? BasicInformation.vechicle_make.errmsg : Nommiee[item]["vechicle_make"].errmsg}
                      />
                    </Grid>
                    <Grid item md={4} xs={12} lg={4}>
                      <Labelbox type="text" labelname="Vehicle Model"
                        changeData={(data) => OnChangeNommiee(data, "vechicle_model", item, index)}
                        value={Nommiee[item]["vechicle_model"].value == "" ? BasicInformation.vechicle_model.value : Nommiee[item]["vechicle_model"].value}
                        error={Nommiee[item]["vechicle_model"].error == null ? BasicInformation.vechicle_model.error : Nommiee[item]["vechicle_model"].error}
                        errmsg={Nommiee[item]["vechicle_model"].errmsg == null ? BasicInformation.vechicle_model.errmsg : Nommiee[item]["vechicle_model"].errmsg}
                      />
                    </Grid>
                    <Grid item md={4} xs={12} lg={4}>
                      <Labelbox type="text" labelname="Year of Manufacture"
                        changeData={(data) => OnChangeNommiee(data, "manufacture", item, index)}
                        value={Nommiee[item]["manufacture"].value == "" ? BasicInformation.manufacture.value : Nommiee[item]["manufacture"].value}
                        error={Nommiee[item]["manufacture"].error == null ? BasicInformation.manufacture.error : Nommiee[item]["manufacture"].error}
                        errmsg={Nommiee[item]["manufacture"].errmsg == null ? BasicInformation.manufacture.errmsg : Nommiee[item]["manufacture"].errmsg}
                      />
                    </Grid>
                    <Grid item md={4} xs={12} lg={4}>
                      <Labelbox type="text" labelname="Carrying Capacity in Litres"
                        changeData={(data) => OnChangeNommiee(data, "capcity_in_liters", item, index)}
                        value={Nommiee[item]["capcity_in_liters"].value == "" ? BasicInformation.capcity_in_liters.value : Nommiee[item]["capcity_in_liters"].value}
                        error={Nommiee[item]["capcity_in_liters"].error == null ? BasicInformation.capcity_in_liters.error : Nommiee[item]["capcity_in_liters"].error}
                        errmsg={Nommiee[item]["capcity_in_liters"].errmsg == null ? BasicInformation.capcity_in_liters.errmsg : Nommiee[item]["capcity_in_liters"].errmsg}
                      />
                    </Grid>
                    <Grid item md={4} xs={12} lg={4}>
                      <Labelbox type="text" labelname="Carrying Capacity in Quintals"
                        changeData={(data) => OnChangeNommiee(data, "capacity_in_quintals", item, index)}
                        value={Nommiee[item]["capacity_in_quintals"].value == "" ? BasicInformation.capacity_in_quintals.value : Nommiee[item]["capacity_in_quintals"].value}
                        error={Nommiee[item]["capacity_in_quintals"].error == null ? BasicInformation.capacity_in_quintals.error : Nommiee[item]["capacity_in_quintals"].error}
                        errmsg={Nommiee[item]["capacity_in_quintals"].errmsg == null ? BasicInformation.capacity_in_quintals.errmsg : Nommiee[item]["capacity_in_quintals"].errmsg}
                      />
                    </Grid>
                    <Grid item md={4} xs={12} lg={4}>
                      <Labelbox type="text" labelname="Number of seats"
                        changeData={(data) => OnChangeNommiee(data, "noof_seats", item, index)}
                        value={Nommiee[item]["noof_seats"].value == "" ? BasicInformation.noof_seats.value : Nommiee[item]["noof_seats"].value}
                        error={Nommiee[item]["noof_seats"].error == null ? BasicInformation.noof_seats.error : Nommiee[item]["noof_seats"].error}
                        errmsg={Nommiee[item]["noof_seats"].errmsg == null ? BasicInformation.noof_seats.errmsg : Nommiee[item]["noof_seats"].errmsg}
                      />
                    </Grid>
                    <Grid item md={4} xs={12} lg={4}>
                      <Labelbox type="text" labelname="Driver Type"
                        changeData={(data) => OnChangeNommiee(data, "driver_type", item, index)}
                        value={Nommiee[item]["driver_type"].value == "" ? BasicInformation.driver_type.value : Nommiee[item]["driver_type"].value}
                        error={Nommiee[item]["driver_type"].error == null ? BasicInformation.driver_type.error : Nommiee[item]["driver_type"].error}
                        errmsg={Nommiee[item]["driver_type"].errmsg == null ? BasicInformation.driver_type.errmsg : Nommiee[item]["driver_type"].errmsg}
                      />
                    </Grid>
                    <Grid item md={4} xs={12} lg={4}>
                      {index ? <button
                        className="mr10 btn_remove" onClick={() => handleRemoveClick(item, index)}>Remove</button> : null}
                    </Grid>
                  </Grid>
                </Cardbody>

              </Grid>
            </>
          )
        }
        )}

        {/* add nommiee */}

        <Grid item md={12} xs={12} lg={12}>
          <div className="last_text_div">
            <label></label>
            <div>Add Vehicle Details<AddCircleIcon onClick={AddNommiee} /></div>
          </div>
        </Grid>
        <Grid item md={12} xs={12} lg={12} style={{ textAlign: "end" }}>
          <div className="bs_btn_custom"><CustomButton btnName="Pay" onBtnClick={Submit} /></div>
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
                       {Value==="Offline"&&
                       <>
                         <h3>Summary Details</h3>
                       <div className="sum_details_infm"  ref={divprint}>
                       {LoginData?.role==="agent"&&<div>Customer Name : {StateDetail?.customers?.value}</div>}
                         <div>Plate Number Type : {StateDetail?.plate_number_type?.value}</div>
                         <div>Purpose : {StateDetail?.purpose?.value}</div>
                         <div>Vehicle Type  : {StateDetail?.vehicle_type?.value}</div>
                         <div>Driver Type : {StateDetail?.driver_type?.value}</div>
                         <div>Premium Amount : {1500}</div>
                         <div>Reference Number : {props.quoteId[0]?.refno}</div>
                         {/* <div>Print Details :  {" "}
                          <LocalPrintshopIcon onClick={window.print}  className="printdata"/></div> */}
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
  quoteId: state.Reducer.MotorQuote || [],
  proposal: state.StateReducer.ProposalData || [],
  EditData:state.MobileReducer.EditData || [],
  Customers_list:state.Reducer.Customers_list || [],
  Basic_Detail: state.StateReducer.Basic_Info || [],
  LoginDetails:state.Reducer.ProfileGetData || []
});
export default connect(mapStateToProps)(InformationDetails);