import React, { useState,useEffect,useRef } from 'react'
import Cardbody from '../../Components/Card/CardWrapper'
import Labelbox  from '../../Components/labelbox/labelbox'
import Grid from "@material-ui/core/Grid";
import CustomButton from '../../Components/Butttons/button'
import { Link,useHistory } from 'react-router-dom'
import { notification, Switch,Radio,Space } from 'antd';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ValidationLibrary from '../../Components/validationfunction'
import moment from 'moment'
import { LifePolicyFormCreate } from '../../redux/actions/FormActions'
import { UserLeave_LifePolicyCreate } from '../../redux/actions/PolicyStore'
import { useDispatch,connect } from 'react-redux';
import Item from 'antd/lib/list/Item';
import {  EDIT_POLICY_DATA } from '../../redux/constants/constants'
import DynModel from '../../Components/Model/model'
import {CommonUpload } from '../../redux/actions/AllAction'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import ReactToPrint from "react-to-print";
import { BASIC_INFO } from '../../redux/StateDetails/Constants'
 function InformationDetails(props){
    // function onChange(checked) {
    //     console.log(`switch to ${checked}`);
    //   }
    let dispatch =useDispatch()
const divprint=useRef(null)

    let history=useHistory()
   const [Basic_detail,setBasic_detail]=useState(props?.location?.state?.Details)
   const [toggle,settoggle]=useState(true)
  const [count,setcount]=useState(0)
  const [Nommiee,setNommiee]=useState([])
  const [Itemkeys, setItemKeys] = useState([])
  const [disble,setdisble]=useState(true)
  const [Total,setTotal]=useState()
  const [StateDetail,setStateDetail]=useState()
  const LoginData=JSON.parse(localStorage.getItem("data"))
  const [Modalopen,setModalopen]=useState(false)
  const [Value,setValue]=useState("")
  const [UploadFiles,setUploadFiles]=useState("")
  const [BasicInformation,setBasicInformation]=useState({
    proposer_name:{
         value:Basic_detail?.proposer_name?.value,
         validation: [{ name: "required" }],
         error: null,
         errmsg: null,
    },
    fathers_name:{
         value:Basic_detail?.fathers_name?.value,
         validation: [{ name: "required" }],
         error: null,
         errmsg: null,
    },
    grand_fathers_name:{
        value:Basic_detail?.grand_fathers_name?.value,
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
   },
   house_no:{
        value:Basic_detail?.house_no?.value,
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
   },
   building_name:{
        value:Basic_detail?.building_name?.value,
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
   },
   woreda:{
    value:Basic_detail?.woreda?.value,
    validation: [{ name: "required" }],
    error: null,
    errmsg: null,
   },
   kebele:{
    value:Basic_detail?.kebele?.value,
    validation: [{ name: "required" }],
    error: null,
    errmsg: null,
   },
   phone_number:{
    value:Basic_detail?.phone_number?.value,
    validation: [{ name: "required" },{name:"mobile"}],
    error: null,
    errmsg: null,
   },
   mobile_number:{
    value:Basic_detail?.mobile_number?.value,
    validation: [{ name: "required" },{name:"mobile"}],
    error: null,
    errmsg: null,
   },
   l_assured_name:{
    value:"",
    validation: [{ name: "required" }],
    error: null,
    errmsg: null,
   },
   l_fathers_name:{
    value:"",
    validation: [{ name: "required" }],
    error: null,
    errmsg: null,
   },
   l_grandfathers_name:{
    value:"",
    validation: [{ name: "required" }],
    error: null,
    errmsg: null,
   },
   dob:{
    value:"",
    validation: [{ name: "required" }],
    error: null,
    errmsg: null,
   },
   sum_assured:{
    value:"",
    validation: [{ name: "required" }],
    error: null,
    errmsg: null,
   },
   policy_period:{
    value:"",
    validation: [{ name: "required" }],
    error: null,
    errmsg: null,
   },
   a_house_no:{
    value:"",
    validation: [{ name: "required" }],
    error: null,
    errmsg: null,
   },
   a_building_name:{
    value:"",
    validation: [{ name: "required" }],
    error: null,
    errmsg: null,
   },
   a_kebele:{
    value:"",
    validation: [{ name: "required" }],
    error: null,
    errmsg: null,
   },
   a_woreda:{
    value:"",
    validation: [{ name: "required" }],
    error: null,
    errmsg: null,
   },
   a_phone_number:{
    value:"",
    validation: [{ name: "required" },{ name: "mobile" }],
    error: null,
    errmsg: null,
   },
   a_mobile_number:{
    value:"",
    validation: [{ name: "required" },{name:"mobile"}],
    error: null,
    errmsg: null,
   },
   identify_type:{
    value:"",
    validation: [{ name: "required" }],
    error: null,
    errmsg: null,
   },
   card_number:{
    value:"",
    validation: [{ name: "required" }],
    error: null,
    errmsg: null,
   },
   issued_by:{
    value:"",
    validation: [{ name: "required" }],
    error: null,
    errmsg: null,
   },
   issued_date:{
    value:"",
    validation: [{ name: "required" }],
    error: null,
    errmsg: null,
   },
   expiry_date:{
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

const [value,setvalue]=useState()
const [Percentage,setPercentage]=useState([])
const CheckValidation=(data,key)=>{
      setdisble(false)
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
 let data=[]
 let newarr =[];

  setPercentage(newarr)
  m.forEach(element => {
      var errorcheck = ValidationLibrary.checkValidation(
        Nommiee[o][element].value,
        Nommiee[o][element].validation
      )
      Nommiee[o][element].error = !errorcheck.state
      Nommiee[o][element].errmsg = errorcheck.msg
  });
  var filtererr = m.filter((ele) => Nommiee[o][ele].error === true)

  setNommiee(prevState => ({
      ...prevState,
  }))
  if (filtererr.length > 0) { 

  }
  else {
    let sum = 0;
    Object.values(Nommiee).forEach(n => sum+=parseInt(n.percent.value));
    setTotal(sum)
      if(sum>100){
        notification.error({
          message:"Nommiee Percentage Total Should Greater than 100 only"
        })
      }else{
      setcount(count + 1)
      CancelDynObjs2()
      let noofnomin =Itemkeys.length+1;
      let divvalue = value/noofnomin;
      let newarr =[];
      }

  }


}

console.log(props,"props")
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
          BasicInformation[data].validation = [];
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
// let noofnomin =Itemkeys.length-1;
// let divvalue = value/noofnomin;
// let newarr =[];
// for(let i=0; i<noofnomin;i++){
//   newarr.push(divvalue)
// }
// setPercentage(newarr)
};
useEffect(() => {
  let obj = Object.keys(Nommiee);
  setItemKeys(obj)
 
}, [Nommiee,disble])
useEffect(() => {
  setNommiee(
      prevState => ({
          ...prevState,
          ["obj" + count]: dynObjs,
      })
  )
 
}, [count,disble])



function OnChangeNommiee(item,key,data,index){
  CheckValidation(item, key);

  if(data==="obj0"  &&key==="percent"){
    setvalue(item)
  }
  
  Nommiee[data][key].value = item
  var errorcheck = ValidationLibrary.checkValidation(
      item,
      Nommiee[data][key].validation
  );
  Nommiee[data][key].error = !errorcheck.state
  Nommiee[data][key].errmsg = errorcheck.msg
  Nommiee[data][key].validation = Nommiee[data][key].validation

}

const Submit=()=>{  
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
console.log("Total",Total)

const PaymentSubmit=()=>{
  let pay=true
  const Details=props?.location?.state?.Props?.Details?.Termin || props?.location?.state?.Props?.Termin
  const ProductName=props?.location?.state?.Props?.Details?.Title || props?.location?.state?.Props?.Title
  const Basic_Details=props.location.state  
  const Additonal_check=props?.location?.state?.Props?.Details?.Additinal_Check || props?.location?.state?.Props?.Additinal_Check || ""
  const Question=props.location.state.Props.Medical || ""
  let Question_Data=[]
  if(Question.length>0){
  for(let i=1;i<Question.length;i++){
     let Data={
        "qid":i,
        "answer":Question[i].question
     }
     Question_Data.push(Data)
  }
  }
  
 
  if(Value){
  
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
      dispatch(LifePolicyFormCreate(BasicInformation,Value,Details?Details:StateDetail,Basic_Details,Nommiee_data,Additonal_check,Question,ProductName,props.quoteId,pay,props.EditData.id)).then(()=>{
        history.push({
          pathname:"dashboard/mypolicyrequest"
        })
        dispatch({type:EDIT_POLICY_DATA,payload:""}) 
       Value==="Online"&& openPayModal()
      })
    
  }
    
}
useEffect(()=>{
  if(toggle==true){
    const Basic_detail=props?.location?.state?.Details 
    const Details=props?.location?.state?.Props?.Details?.Termin || props?.location?.state?.Props?.Termin
    BasicInformation.l_grandfathers_name.value=BasicInformation.grand_fathers_name.value
    BasicInformation.l_fathers_name.value= BasicInformation.fathers_name.value
    BasicInformation.dob.value=Details?.age?.value?Details?.age?.value:StateDetail?.age?.value
    BasicInformation.sum_assured.value=Details?.amount?.value?Details?.amount?.value:StateDetail?.amount?.value
    BasicInformation.policy_period.value=Details?.plan_period?.value?Details?.plan_period?.value:StateDetail?.plan_period?.value
    BasicInformation.l_assured_name.value=Basic_detail?.proposer_name.value

    BasicInformation.a_house_no.value=BasicInformation.house_no.value
    BasicInformation.a_building_name.value= BasicInformation.building_name.value
    BasicInformation.a_kebele.value=BasicInformation.kebele.value
    BasicInformation.a_woreda.value=BasicInformation.woreda.value
    BasicInformation.a_phone_number.value=BasicInformation.phone_number.value
    BasicInformation.a_mobile_number.value=BasicInformation.mobile_number.value
    setBasicInformation((prevState) => ({
      ...prevState,
    }));

  }else{
    BasicInformation.l_grandfathers_name.value=""
    BasicInformation.l_fathers_name.value=""
    BasicInformation.dob.value=""
    BasicInformation.sum_assured.value=""
    BasicInformation.policy_period.value=""
    BasicInformation.l_assured_name.value=""
    BasicInformation.a_house_no.value=""
    BasicInformation.a_building_name.value="" 
    BasicInformation.a_kebele.value=""
    BasicInformation.a_woreda.value=""
    BasicInformation.a_phone_number.value=""
    BasicInformation.a_mobile_number.value=""
    setBasicInformation((prevState) => ({
      ...prevState,
    }));

  }

},[toggle]) 
useEffect(() => {
  setStateDetail(props.proposal)
  setBasic_detail(props.proposal)
}, [props.proposal])

const FileOnchange=(e)=>{
  dispatch(CommonUpload(e.target.files[0])).then((res)=>{
    //  setuploadError("")
     setUploadFiles(res.payload[0].filename) 
  })
}  
console.log("proposal",props.quoteId[0])

// useEffect(() => {
//   if(props.quoteId){
//   PaymentDetails.ref_no.value=props.quoteId[0]?.refno
//   PaymentDetails.amount.value=StateDetail?.amount?.value
//   setPaymentDetails((prevState) => ({
//     ...prevState,
//   }));
// }
// }, [props.quoteId])

const options = {
  key: 'rzp_test_VyjrBb8Sl4Nb05',
  amount:StateDetail?.amount?.value, //  = INR 1
  currency:"INR",
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
console.log("check",props)
    return(

        <div className="basic_infm_form_parent">
            {/* basic information */}
        
           <h3 className="main_head">Basic Information</h3>
           <div className="b_sub_h">Proposer Details</div>
           <Grid container> 
                   <Grid item md={12} xs={12} lg={12}>
           <Cardbody Customcardcss="Custom_basic" variant>
              <Grid container spacing={2}>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Proposer Name"
                      changeData={(data)=>CheckValidation(data,"proposer_name")} 
                      value={BasicInformation.proposer_name.value}
                      error={BasicInformation.proposer_name.error}
                      errmsg={BasicInformation.proposer_name.errmsg}
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
                      changeData={(data)=>CheckValidation(data,"grand_fathers_name")} 
                      value={BasicInformation.grand_fathers_name.value}
                      error={BasicInformation.grand_fathers_name.error}
                      errmsg={BasicInformation.grand_fathers_name.errmsg}
                     />
                   </Grid>
                   <Grid item md={12} xs={12} lg={12} className="addres_section">
                      <div className="b_sub_h">Address</div>
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
              </Grid>     
           </Cardbody>
                  
            </Grid> 
           </Grid> 
              {/*basic information end */}
           <h3  className="main_head">Life Assured Details</h3>
           <div className="b_sub_h">Same as Proposer <Switch defaultChecked onChange={()=>settoggle(!toggle)} checked={toggle} checkedChildren="Yes"/></div>
           <Grid container> 
                   <Grid item md={12} xs={12} lg={12}>
           <Cardbody Customcardcss="Custom_basic" variant>
              <Grid container spacing={2}>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Life Assured Name"
                         changeData={(data)=>CheckValidation(data,"l_assured_name")} 
                         value={BasicInformation.l_assured_name.value}
                         error={BasicInformation.l_assured_name.error}
                         errmsg={BasicInformation.l_assured_name.errmsg}
                         disabled={LoginData?.role==="agent"?true:false}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Father's Name"
                     changeData={(data)=>CheckValidation(data,"l_fathers_name")} 
                     value={BasicInformation.l_fathers_name.value}
                     error={BasicInformation.l_fathers_name.error}
                     errmsg={BasicInformation.l_fathers_name.errmsg}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Grand Father's Name"
                       changeData={(data)=>CheckValidation(data,"l_grandfathers_name")} 
                       value={BasicInformation.l_grandfathers_name.value}
                       error={BasicInformation.l_grandfathers_name.error}
                       errmsg={BasicInformation.l_grandfathers_name.errmsg}
                     />
                   </Grid>
               
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Age/DOB"
                      changeData={(data)=>CheckValidation(data,"dob")} 
                      value={BasicInformation.dob.value}
                      error={BasicInformation.dob.error}
                      errmsg={BasicInformation.dob.errmsg}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Sum Assured"
                     changeData={(data)=>CheckValidation(data,"sum_assured")} 
                     value={BasicInformation.sum_assured.value}
                     error={BasicInformation.sum_assured.error}
                     errmsg={BasicInformation.sum_assured.errmsg}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Policy Period(in Years)"
                     changeData={(data)=>CheckValidation(data,"policy_period")} 
                     value={BasicInformation.policy_period.value}
                     error={BasicInformation.policy_period.error}
                     errmsg={BasicInformation.policy_period.errmsg}
                     />
                   </Grid>
                  
              </Grid>     
           </Cardbody>
                  
            </Grid>   
            </Grid>
            {/* address */}
            <h3  className="main_head">Address</h3>
           <Grid container> 
                   <Grid item md={12} xs={12} lg={12}>
           <Cardbody Customcardcss="Custom_basic" variant>
              <Grid container spacing={2}>
              
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="House No"
                       changeData={(data)=>CheckValidation(data,"a_house_no")} 
                       value={BasicInformation.a_house_no.value}
                       error={BasicInformation.a_house_no.error}
                       errmsg={BasicInformation.a_house_no.errmsg}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Building Name"
                       changeData={(data)=>CheckValidation(data,"a_building_name")} 
                       value={BasicInformation.a_building_name.value}
                       error={BasicInformation.a_building_name.error}
                       errmsg={BasicInformation.a_building_name.errmsg}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Kebele"
                      changeData={(data)=>CheckValidation(data,"a_kebele")} 
                      value={BasicInformation.a_kebele.value}
                      error={BasicInformation.a_kebele.error}
                      errmsg={BasicInformation.a_kebele.errmsg}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Woreda"
                        changeData={(data)=>CheckValidation(data,"a_woreda")} 
                        value={BasicInformation.a_woreda.value}
                        error={BasicInformation.a_woreda.error}
                        errmsg={BasicInformation.a_woreda.errmsg}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Phone Number"
                       changeData={(data)=>CheckValidation(data,"a_phone_number")} 
                       value={BasicInformation.a_phone_number.value}
                       error={BasicInformation.a_phone_number.error}
                       errmsg={BasicInformation.a_phone_number.errmsg}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Mobile Number"
                      changeData={(data)=>CheckValidation(data,"a_mobile_number")} 
                      value={BasicInformation.a_mobile_number.value}
                      error={BasicInformation.a_mobile_number.error}
                      errmsg={BasicInformation.a_mobile_number.errmsg}
                      disabled={LoginData?.role==="agent"?true:false}
                     />
                   </Grid>
              </Grid>     
           </Cardbody>
                  
            </Grid> 
           </Grid> 
           {/* lifeassured */}
           <h3 className="main_head">Life Assured's Personal Identification Details</h3>
           <Grid container  spacing={3}> 
                   <Grid item md={12} xs={12} lg={12}>
           <Cardbody Customcardcss="Custom_basic" variant>
              <Grid container spacing={2}>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="Identification Type"
                       changeData={(data)=>CheckValidation(data,"identify_type")} 
                       value={BasicInformation.identify_type.value}
                       error={BasicInformation.identify_type.error}
                       errmsg={BasicInformation.identify_type.errmsg}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="ID Card Number"
                       changeData={(data)=>CheckValidation(data,"card_number")} 
                       value={BasicInformation.card_number.value}
                       error={BasicInformation.card_number.error}
                       errmsg={BasicInformation.card_number.errmsg}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="text" labelname="ID Issued By"
                       changeData={(data)=>CheckValidation(data,"issued_by")} 
                       value={BasicInformation.issued_by.value}
                       error={BasicInformation.issued_by.error}
                       errmsg={BasicInformation.issued_by.errmsg}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="datepicker" labelname="ID Issue Date"
                      changeData={(data)=>CheckValidation(data,"issued_date")} 
                      value={BasicInformation.issued_date.value}
                      error={BasicInformation.issued_date.error}
                      errmsg={BasicInformation.issued_date.errmsg}
                     />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                     <Labelbox type="datepicker" labelname="ID Expiry Date"
                       changeData={(data)=>CheckValidation(data,"expiry_date")} 
                       value={BasicInformation.expiry_date.value}
                       error={BasicInformation.expiry_date.error}
                       errmsg={BasicInformation.expiry_date.errmsg}
                       disablePast={true}
                     />
                   </Grid>
                  
              </Grid>     
           </Cardbody>
                  
            </Grid> 
           </Grid> 
     
            {/*  */}
           
            <Grid container  spacing={3}> 
            {Itemkeys.length>0&&Itemkeys.map((item,index)=>{
              // if(disble){
              // Nommiee[item]["percent"].value=Percentage[index] 
              // }
              // console.log("disble",Object.values(Nommiee))
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
                        maxlength={3}
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
                        <div>Product Name : {props?.location?.state?.Props?.Details?.Title}</div>
                        <div>Assured Type : {StateDetail?.assured_type?.value}</div>
                        <div>Policy Period : {StateDetail?.plan_period?.value}</div>
                        <div>Age : {StateDetail?.age?.value}</div>
                        <div>Premium Amount: {20000}</div>
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
   quoteId:state.Reducer.Lifepolicyquote || [],
   proposal: state.StateReducer.ProposalData || [],
   EditData:state.MobileReducer.EditData || []
});
export default connect(mapStateToProps)(InformationDetails);
