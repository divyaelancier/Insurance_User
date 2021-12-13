import React,{useEffect, useState} from 'react'
import Labelbox from '../../../Components/labelbox/labelbox'
import Grid from "@material-ui/core/Grid";
import ValidationLibrary from '../../../Components/validationfunction'
import { ProfileUpdate } from '../../../redux/actions/LoginActions'
import { useDispatch,connect } from 'react-redux';
import { User_signin_Details} from '../../../redux/actions/LoginActions'
import { ProfileGet_Api } from '../../../redux/actions/DashboardActions'

import user from '../../../Images/user.jpg'
import { Edit } from '@material-ui/icons';
import { CommonUpload } from '../../../redux/actions/AllAction'
import { useAuth } from "../../../context/auth"
import moment from 'moment'
 function Myprofile(props){
   let dispatch=useDispatch()
   const Details=useState(JSON.parse(localStorage.getItem("data")))
   const Marital_Status=[{id:1,value:"Married"},{id:2,value:"Un-Married"}]
   const [Image,setImage]=useState()
   const [UploadFiles,setUploadFiles]=useState("")
   const  { setAuthTokens }  = useAuth();
   const [MyProfile,setMyProfile]=useState({
      name:{
         value: "",
         validation: [],
         error: null,
         errmsg: null,
       },
       dob:{
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      income:{
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      state:{
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      marital_status:{
          value: "",
          validation: [],
          error: null,
          errmsg: null,
        },
        city:{
          value: "",
          validation: [],
          error: null,
          errmsg: null,
        },
        phone_number:{
         value: "",
         validation:[{name:"mobile"}],
         error: null,
         errmsg: null,
       },
       email:{
         value: "",
         validation: [{name:"email"}],
         error: null,
         errmsg: null,
       },
       email1:{
        value: "",
        validation: [{name:"email"}],
        error: null,
        errmsg: null,
      },
      email2:{
        value: "",
        validation: [{name:"email"}],
        error: null,
        errmsg: null,
      },
      c_mobile_number:{
        value: "",
        validation: [{name:"mobile"}],
        error: null,
        errmsg: null,
      },
      })
     function checkValidation(data, key) {
    
      var errorcheck = ValidationLibrary.checkValidation(
          data,
          MyProfile[key].validation
      );
      let dynObj = {
          value: data,
          error: !errorcheck.state,
          errmsg: errorcheck.msg,
          validation: MyProfile[key].validation,
      };
      setMyProfile((prevState) => ({
          ...prevState,
          [key]: dynObj,
      }));
  }
  console.log(props.LoginDetails[0]?.role,"aluuuuu")
    
  const Submit=(e)=>{
      e.preventDefault()
      var mainvalue = {};
  var targetkeys = Object.keys(MyProfile);
  for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
         MyProfile[targetkeys[i]].value,
         MyProfile[targetkeys[i]].validation
      );
      MyProfile[targetkeys[i]].error = !errorcheck.state;
      MyProfile[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = MyProfile[targetkeys[i]].value;
  }
  var filtererr = targetkeys.filter((obj) => MyProfile[obj].error == true);
  console.log("MyProfile",MyProfile)
  if(filtererr.length>0){
      
  }else{
       dispatch(ProfileUpdate(MyProfile,UploadFiles)).then((res)=>{
         // HandleCancel()
         setImage("")
        //  if(res.response.status==="Success")
        //  dispatch(User_signin_Details(MyProfile))
        //  setAuthTokens(res.paylaod.response[0])
       })
  }
  setMyProfile(prevState =>({
      ...prevState,
    }))  
  }
  useEffect(()=>{
    dispatch(User_signin_Details())
    dispatch(ProfileGet_Api())
  },[])
  useEffect(() => {
    if(props.LoginDetails[0]?.role=="user"){
      MyProfile.name.validation.push({name:"required"})
      MyProfile.phone_number.validation.push({name:"required"})
    }
  }, [MyProfile])
  useEffect(()=>{
    const LoginData=props.LoginDetails
     MyProfile.name.value=LoginData[0]?.name || ""
     MyProfile.dob.value=moment(LoginData[0]?.dob).format("YYYY-MM-DD") || ""
     MyProfile.income.value=LoginData[0]?.income || ""
     MyProfile.marital_status.value=LoginData[0]?.marital_status || ""
     MyProfile.city.value=LoginData[0]?.city || ""
     MyProfile.email.value=LoginData[0]?.email || ""
     MyProfile.email1.value=LoginData[0]?.email1 || ""
     MyProfile.email2.value=LoginData[0]?.email2 || ""
     MyProfile.phone_number.value=LoginData[0]?.mobileno || ""
     MyProfile.c_mobile_number.value=LoginData[0]?.phoneno || ""
     MyProfile.state.value=LoginData[0]?.state || ""
     
     setUploadFiles(LoginData[0]?.profile)
     setMyProfile(prevState =>({
      ...prevState,
      }))  
     
  },[props.LoginDetails])
  console.log("detailsddd",props.LoginDetails)

  useEffect(()=>{
     
  },[]) 
  const HandleCancel=()=>{
     let Key=["name","dob","income","marital_status","city","phone_number","email"]
     Key.map((data)=>{
      MyProfile[data].value=""
     })
     setMyProfile(prevState =>({
      ...prevState,
     })) 
  }
const onChangeFile=(e)=>{
  dispatch(CommonUpload(e.target.files[0])).then((res)=>{
    setUploadFiles(res.payload[0].filename)
    setImage(res.payload[0].filename)
 })
}
console.log(UploadFiles,"setUploadFiles")
    return(
        <div>
            <h3>Personal Details</h3>
             <Grid container xs={12} spacing={2} className="grid_container_myprofile"> 
               <Grid item md={12} xs={12} lg={12}>
                           <div className="user_profile">
                            <div className="profile_sub_div">
                                <label htmlFor="upload">
                                    {!Image?<img src={user} alt="placeholder" />:
                                    <img src={"http://161.97.72.249:3001/uploads/"+Image} alt="placeholder" />}
                                </label>    
                            </div>
                            <input id="upload" type="file" name="pic" onChange={onChangeFile}/>
                           <div style={{textAlign:"center",fontWeight:"600",marginTop:"5px"}}>Upload Photo</div>

                            </div>
                               
                      </Grid>      
                   <Grid item md={4} xs={12} lg={4}>
                      <Labelbox type="text" labelname="Your Full Name"
                       changeData={(data) =>checkValidation(data, "name")}
                       value={MyProfile.name.value}
                       error={MyProfile.name.error}
                       errmsg={MyProfile.name.errmsg}
                      />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                      <Labelbox type="text" labelname="Your Mobile Number"
                           changeData={(data) =>checkValidation(data, "phone_number")}
                           value={MyProfile.phone_number.value}
                           error={MyProfile.phone_number.error}
                           errmsg={MyProfile.phone_number.errmsg}
                      />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                      <Labelbox type="text" labelname="Your Email ID"
                        changeData={(data) =>checkValidation(data, "email")}
                        value={MyProfile.email.value}
                        error={MyProfile.email.error}
                        errmsg={MyProfile.email.errmsg}
                      />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                      <Labelbox type="datepicker" labelname="Date of Birth"
                          changeData={(data) =>checkValidation(data, "dob")}
                          value={MyProfile.dob.value}
                          error={MyProfile.dob.error}
                          errmsg={MyProfile.dob.errmsg}
                      />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                      <Labelbox type="text" labelname="Annual Income"
                        changeData={(data) =>checkValidation(data, "income")}
                        value={MyProfile.income.value}
                        error={MyProfile.income.error}
                        errmsg={MyProfile.income.errmsg}
                      />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                      <Labelbox type="select" labelname="Marital Status"
                        changeData={(data) =>checkValidation(data, "marital_status")}
                        value={MyProfile.marital_status.value}
                        error={MyProfile.marital_status.error}
                        errmsg={MyProfile.marital_status.errmsg}
                        dropdown={Marital_Status}
                      />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                      <Labelbox type="text" labelname="City"
                        changeData={(data) =>checkValidation(data, "city")}
                        value={MyProfile.city.value}
                        error={MyProfile.city.error}
                        errmsg={MyProfile.city.errmsg}
                      />
                   </Grid>  
                   <Grid item md={4} xs={12} lg={4}>
                      <Labelbox type="text" labelname="State"
                        changeData={(data) =>checkValidation(data, "state")}
                        value={MyProfile.state.value}
                        error={MyProfile.state.error}
                        errmsg={MyProfile.state.errmsg}
                      />
                   </Grid>     
                      
                   <Grid item md={3} xs={12} lg={12} style={{alignItems:"center",justifyContent:"flex-end",display:"flex"}}>
                        <a  onClick={Submit} class="next">Submit</a>
                          {/* <CustomButton btnName="Next" custombtnCSS="btn_nxt_props"/> */}
                  </Grid>
            </Grid>  
            {/* <h3>Contact Details</h3> */}
             {/* <Grid container xs={12} spacing={2} className=""> 
                   <Grid item md={4} xs={12} lg={4}>
                      <Labelbox type="text" labelname="Mobile Number"
                         changeData={(data) =>checkValidation(data, "c_mobile_number")}
                         value={MyProfile.c_mobile_number.value}
                         error={MyProfile.c_mobile_number.error}
                         errmsg={MyProfile.c_mobile_number.errmsg}
                      />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                      <Labelbox type="text" labelname="Email Address1"
                         changeData={(data) =>checkValidation(data, "email1")}
                         value={MyProfile.email1.value}
                         error={MyProfile.email1.error}
                         errmsg={MyProfile.email1.errmsg}
                      />
                   </Grid>
                   <Grid item md={4} xs={12} lg={4}>
                      <Labelbox type="text" labelname="Email Address2"
                         changeData={(data) =>checkValidation(data, "email2")}
                         value={MyProfile.email2.value}
                         error={MyProfile.email2.error}
                         errmsg={MyProfile.email2.errmsg}
                      />
                   </Grid>
                   <Grid item md={3} xs={12} lg={12} style={{alignItems:"center",justifyContent:"flex-end",display:"flex"}}>
                        <a href="#" onClick={Submit} class="next">Submit</a>
                  </Grid>
             </Grid>     */}
        </div>
    )
}
const mapStateToProps = (state) =>
({
  LoginDetails:state.Reducer.ProfileGetData || []
});
export default connect(mapStateToProps)(Myprofile);