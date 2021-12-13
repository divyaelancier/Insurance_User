import React,{useState,useEffect} from 'react'
import Cardbody from '../../Components/Card/CardWrapper'
import Labelbox  from '../../Components/labelbox/labelbox'
import Grid from "@material-ui/core/Grid";
import CustomButton from '../../Components/Butttons/button'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import ValidationLibrary from '../../Components/validationfunction'
import { Get_Customers_List } from '../../redux/actions/AddcustomersActions'
import { useDispatch,connect } from 'react-redux'
import { BASIC_INFO } from '../../redux/StateDetails/Constants'
 function BasicInformation(props){
  let history=useHistory()

  const Details=props?.location?.state?.Details?.Termin
  console.log("Details",Details)
  const LoginData=JSON.parse(localStorage.getItem("data"))
  const [CustomerData,setCustomerData]=useState([])
  let dispatch=useDispatch()
  const Basic_Detail=props.LoginDetails[0]?.role==="user"?props.Basic_Detail:""
  const [BasicInformation,setBasicInformation]=useState({
    proposer_name:{
         value:Details?.customers?.value || Basic_Detail?.insured_name?.value || "",
         validation: [{ name: "required" }],
         error: null,
         errmsg: null,
    },
    fathers_name:{
         value:Basic_Detail?.fathers_name?.value || "",
         validation: [{ name: "required" }],
         error: null,
         errmsg: null,
    },
    grand_fathers_name:{
        value:Basic_Detail?.grand_fathers_name?.value || "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
   },
   house_no:{
        value:Basic_Detail?.grand_fathers_name?.value || "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
   },
   building_name:{
        value:Basic_Detail?.building_name?.value || "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
   },
   
   woreda:{
    value:Basic_Detail?.woreda?.value || "",
    validation: [{ name: "required" }],
    error: null,
    errmsg: null,
   },
   kebele:{
    value:Basic_Detail?.kebele?.value || "",
    validation: [{ name: "required" }],
    error: null,
    errmsg: null,
   },
   phone_number:{
    value:Basic_Detail?.phone_number?.value || "",
    validation: [{ name: "required" },{ name: "mobile" }],
    error: null,
    errmsg: null,
   },
   mobile_number:{
    value:Basic_Detail?.mobile_number?.value || "",
    validation: [{ name: "required" },{ name: "mobile" }],
    error: null,
    errmsg: null,
   },
})
const CheckValidation=(data,key)=>{
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
  dispatch({type:BASIC_INFO,payload:BasicInformation})

   history.push({
    pathname:"/Review",
    state:{Details:BasicInformation,Props:props.location.state}
   })  
}
setBasicInformation((prevState) => ({
  ...prevState,
}));
}
useEffect(()=>{
  dispatch(Get_Customers_List())
},[])
useEffect(()=>{
  if(LoginData?.role==="agent"){
    const Details=props?.location?.state?.Details?.Termin || props?.location?.state?.Termin
console.log(Details,"dddddddddd")
 var Data= props.Customers_list.length>0&&props.Customers_list.filter((data)=>{
        return(data.name===Details?.customers?.value)  
    })
    setCustomerData(Data)
    BasicInformation.mobile_number.value=Data[0]?.phone 
    BasicInformation.proposer_name.value=Data[0]?.name 
    setBasicInformation((prevState) => ({
      ...prevState,
    }));
 }

 

//  const EditData=props.EditData
//   if(props.EditData.length>0){
//     var Data= props.Customers_list.length>0&&props.Customers_list.filter((data)=>{
//       return(data.name===EditData?.basic_info?.proposer_name )  
//     })
//     BasicInformation.mobile_number.value=Data[0]?.phone ||  ""
//     BasicInformation.proposer_name.value=EditData?.basic_info?.proposer_name || ""
//     setBasicInformation((prevState) => ({
//       ...prevState,
//     }));
//   }else{
//   BasicInformation.mobile_number.value= ""
//   BasicInformation.proposer_name.value=""
//   setBasicInformation((prevState) => ({
//     ...prevState,
//   }));
//  }
  
},[props.Customers_list,props.EditData,props.location])

    return(
        <div className="basic_infm_parent">
         
           <Grid container xs={12} spacing={2}> 
                   <Grid item md={12} xs={12} lg={12}>
           <Cardbody Customcardcss="Custom_basic" variant>
           <h3 style={{textAlign:"center",fontSize:"25px"}}>Basic Information</h3>
           <h4>Proposer Details</h4>
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
                      <h4>Address</h4>
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
            <Grid item md={12} xs={12} lg={12} style={{textAlign:"end"}}>      
              <div className="bs_btn">
              {/* <CustomButton btnName="Next" custombtnCSS="btn_nxt_props"/> */}
              <a  class="next" onClick={Submit}>Next &raquo;</a>
              </div>
            </Grid>  
           </Grid>   
          
       </div>
    )
}       
const mapStateToProps = (state) =>
({
    Customers_list:state.Reducer.Customers_list || [],
    EditData:state.MobileReducer.EditData || [],
    Basic_Detail: state.StateReducer.Basic_Info || [],
    LoginDetails:state.Reducer.ProfileGetData || []
});
export default connect(mapStateToProps)(BasicInformation);