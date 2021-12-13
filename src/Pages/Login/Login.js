import React, { forwardRef, createRef, useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
// import 'react-phone-input-2/lib/material.css'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CustomButton from '../../Components/Butttons/button'
import loginlogo from '../../Images/loginimg.webp'
import Labelbox from '../../Components/labelbox/labelbox'
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from "@material-ui/icons/Visibility";
import axios from 'axios'
import { useAuth } from "../../context/auth"
import { useHistory,useLocation,useParams } from "react-router-dom"
import { Radio,notification } from 'antd'
import { useDispatch } from 'react-redux';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { User_signin_Details , User_SignUp_Details } from '../../redux/actions/LoginActions'
import './Login.scss'
export default function Login(props){
  let history=useHistory()
  let location=useLocation()
  const [phone,setphone]=useState("")
  const [otp,setotp]=useState(false)
  const [sign,setsign]=useState(false)
  const [value, setValue] = useState("");
  const loginparams=props.location?.state
  const [error,setError]=useState("")
  const [p_error,setp_error]=useState(false)
  const [hidden,sethidden]=useState(true)
  const  { setAuthTokens }  = useAuth();
  const { id } = useParams();
  let dispatch=useDispatch()
  const [UserDetail,setUserDetail]=useState({
    username:"",
    password:""
  })

  const SignupTrue=()=>{
    setsign(!sign)
  }
  const onChangeFields=(data,key)=>{
    const values =data.target.value;
    setUserDetail((prevState) => ({
      ...prevState,
      [key]: values
     }));
  }
  const Submit=()=>{
    if(!sign){
    dispatch(User_signin_Details(UserDetail)).then((res)=>{
      console.log(res.payload.response,"resdata")

      if (res.payload.status === "Success") {
       
          setAuthTokens(res.payload.response[0])
         !loginparams && props.CloseModal(false)
         notification.success({
          message:res.payload.message,
        });

        if(!loginparams){
        if(res.payload.response[0].role=="agent"){ history.push("dashboard/mypolicies")}
        else if(res.payload.response[0].role=="user"){ history.push("/")}
         }
         else{
            if(loginparams.State==="life"){
              history.push({
                pathname:"/medicalhistory",
                state:{Title:loginparams.Product,login:true}
              })
            }
            else if(loginparams.State==="motor"){ history.push({
              pathname:"/Review",
              state:{Title:loginparams.Product,login:"motor"}
            })}
            else if(loginparams.State==="travel"){ history.push({
              pathname:"/Review",
              state:{Title:loginparams.Product,login:"travel"}
            })}
         }
        }   
         else if(res.payload.status === "Failure"){
          notification.error({
            message:res.payload.message,
          });
         }
    })
    .catch(e => {
      notification.error({
          message: 'Email and Password Does Not Match',
        });
    });
  }
    // dispatch(User_Sign_Details()).then((res)=>{

    // })
    else{
    dispatch(User_SignUp_Details(UserDetail,value)).then((res)=>{
      console.log(res.payload.status,"resdata")
      if (res.payload.status === "Success") {
         setsign(false)
         notification.success({
          message:res.payload.message,
        });
         }
         else if(res.payload.status === "Failure"){
          notification.error({
            message:res.payload.message,
          });
         }
    })
    .catch(e => {
      notification.error({
          message: 'Email and Password Does Not Match',
        });
    });
  }
  }

    return(
      <div className={loginparams&&"login_parent_div"}>
        <div className={loginparams&&"login_child_div"}>
    <div className="login_page_ins">

     <div style={{fontSize:"20px",textAlign:"center",marginBottom:"15px",fontWeight:"600"}}>Awash Insurance</div>   
     <div className="log_h_txt" ><img   src={loginlogo} style={{width:"50px",marginRight:"15px"}}/>
     {sign?<label>To sign up, please enter your Email <br/> and Password</label>:<label>To sign in, please enter your Email<br/> and Password</label>}
     </div>
     <div className="ins_clos_ic">{!loginparams ?<HighlightOffIcon onClick={()=>props.CloseModal(false)}/>:null}</div>

                 <TextField
                    type="text"
                    placeholder="Email"
                    variant="outlined"
                    value={UserDetail.username}
                    error={error}
                    helperText={error}
                    id="outlined-basic"
                    onChange={(data)=>onChangeFields(data,"username")}
                  />
                  <TextField
                    type={hidden ? "password" : "text"}
                    // onChange={this.onchange}
                    // value={this.state.password}
                    error={p_error}
                    helperText={p_error}
                    placeholder=""
                    className=""
                    variant="outlined"
                    placeholder="Password"
                    value={UserDetail.password}
                    id="outlined-basic"
                    onChange={(data)=>onChangeFields(data,"password")}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment onClick={()=>sethidden(!hidden)}>
                          <IconButton>
                             {hidden?<VisibilityOff
                              className="logineye_icon"/>:
                              <Visibility
                              className="logineye_icon"/>
                             }
                    
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {sign&&
                  <div className="radio_btn_div">
                    <Radio.Group onChange={(e)=>setValue(e.target.value)} value={value}>
                       <Radio value={1}>Agent</Radio>
                       <Radio value={2}>User</Radio>
                     </Radio.Group>
                     </div>}
  

  
    <div className="sign_div_btn">
      <CustomButton btnName={sign?"Sign Up ":"Sign In "} custombtnCSS="sign_custom_css" onBtnClick={Submit}/>
      <label className="fst_user" onClick={SignupTrue}>{sign?"Already Signed Up? ":"First Time user? " }<span>{sign?"Sign In ":"Sign Up"}</span></label>
    </div>
  </div>
  </div>
  </div>
    )
}