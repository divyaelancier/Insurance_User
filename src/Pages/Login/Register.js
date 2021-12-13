import React, { forwardRef, createRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
// import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'
// import 'react-phone-input-2/lib/material.css'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CustomButton from '../../Components/Butttons/button'
import loginlogo from '../../Images/loginimg.webp'
import './Login.scss'
export default function Register(props){
  const [phone,setphone]=useState("")
  const [error,seterror]=useState("")
  const [otp,setotp]=useState(false)
  const OnchangeInput=(value)=>{

    setphone(value)
    if(phone){
        seterror("")
    }
  }
  const SentOtp=()=>{
    seterror("Please fill this field")
  
  }
  const OTPfuction=()=>{
    if(phone){
      setotp(true)
    }
  }
    return(
    <div className="login_page_ins">
     <div style={{fontSize:"20px",textAlign:"center",marginBottom:"15px",fontWeight:"600"}}>Awash Insurance</div>   
     <div className="log_h_txt" ><img   src={loginlogo} style={{width:"50px",marginRight:"20px"}}/><label>To sign up, please enter your <br/> mobile number</label></div>
     <div className="ins_clos_ic"><HighlightOffIcon onClick={()=>props.CloseModal(false)}/></div>

    <div className="ph_input"> {!otp? 
    <>
   {/* <PhoneInput
 country={'in'}
 value={phone}
 onChange={OnchangeInput}
  inputProps={{
    name: 'Mobile Number',
    required: true,
    autoFocus: false
  }}
/> */}
<p style={{color:"red",fontSize:"13px"}}>{error}</p>
</>:
         <TextField
         
          id="outlined-required"
          // label="Enter OTP"
          // defaultValue="Hello World"
          placeholder="Enter OTP"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
}

    </div>
    <div className="sign_div_btn">
      <CustomButton btnName={otp?"Verify Mobile Number":"Proceed"} custombtnCSS="sign_custom_css" onBtnClick={phone?OTPfuction:SentOtp}/>
    </div>
  </div>
    )
}