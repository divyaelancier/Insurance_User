import React,{useState,useEffect} from 'react'
import ValidationLibrary from '../../Components/validationfunction'
import {CommonUpload } from '../../redux/actions/AllAction'
import Labelbox from '../../Components/labelbox/labelbox'
import CustomButton from '../../Components/Butttons/button'
import { useDispatch } from 'react-redux'
import { LifePolicyFormCreate,MotorFormCreate,TravelFormCreate } from '../../redux/actions/FormActions'
export default function Payments(props) {
    let dispatch=useDispatch()
    const [UploadFiles,setUploadFiles]=useState()
    const [StoreData,setStoreData]=useState()
    const [PaymentDetails,setPaymentDetails]=useState({
        bank_name:{ value:"", validation: [{ name: "required" }],error: null, errmsg: null },
        branch:{ value:"", validation: [{ name: "required" }],error: null, errmsg: null },
        amount:{ value:"", validation: [{ name: "required" }],error: null, errmsg: null },
        ref_no:{ value:"", validation: [{ name: "required" }],error: null, errmsg: null },
      })
      const PaymentValidation=(data,key)=>{
        var errorcheck = ValidationLibrary.checkValidation(
          data,
          PaymentDetails[key].validation
       );
       let dynObj = {
          value: data,
          error: !errorcheck.state,
          errmsg: errorcheck.msg,
          validation: PaymentDetails[key].validation,
       };
       setPaymentDetails((prevState) => ({
          ...prevState,
          [key]: dynObj,
       }));
       }
       const PaymentSubmit=()=>{ 
        var mainvalue = {};
        var targetkeys = Object.keys(PaymentDetails);
        for (var i in targetkeys) {
          var errorcheck = ValidationLibrary.checkValidation(
            PaymentDetails[targetkeys[i]].value,
            PaymentDetails[targetkeys[i]].validation
          );
          PaymentDetails[targetkeys[i]].error = !errorcheck.state;
          PaymentDetails[targetkeys[i]].errmsg = errorcheck.msg;
          mainvalue[targetkeys[i]] = PaymentDetails[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => PaymentDetails[obj].error == true);
        if(filtererr.length>0){
          
        }else{
            if(StoreData.product_name==="Motor Insurance"){
            dispatch(MotorFormCreate("","","", "","","",PaymentDetails,UploadFiles,StoreData)).then(() => {
                props.Payment(false)
                HandleCancel()
                setUploadFiles("")
            })
        }else if(StoreData.product_name==="Travel Insurance"){
            dispatch(TravelFormCreate("","","","","","",PaymentDetails,UploadFiles,StoreData)).then(()=>{
                props.Payment(false)
                HandleCancel()
                setUploadFiles("")
              })
         }else{
        
            dispatch(LifePolicyFormCreate("","","","","","","","","","","",PaymentDetails,UploadFiles,StoreData)).then(()=>{
             props.Payment(false)
            HandleCancel()
            setUploadFiles("")
            }) 
         }
           
        }
        
        setPaymentDetails((prevState) => ({
          ...prevState,
        }));
        
      }
      const FileOnchange=(e)=>{
        dispatch(CommonUpload(e.target.files[0])).then((res)=>{
          //  setuploadError("")
           setUploadFiles(res.payload[0].filename) 
        })
      }  
  
      const HandleCancel=()=>{
          let Key=Object.keys(PaymentDetails)
          Key.map((data)=>{
            PaymentDetails[data].value=""
          })
          setPaymentDetails((prevState) => ({
            ...prevState,
          }));
      }
      console.log("payments",props.ViewData)
 useEffect(() => {
    setStoreData(props.ViewData)
 if(props.ViewData){
    props?.ViewData?.paydetails?.length>0&&props?.ViewData?.paydetails.map((data)=>{
        PaymentDetails.bank_name.value=data.bankname || ""
        PaymentDetails.branch.value=data.branch || ""
        // setPaymentDetails((prevState) => ({
        //   ...prevState,
        // }));

    })
  PaymentDetails.ref_no.value=props.ViewData?.refno || ""
  PaymentDetails.amount.value=props.ViewData?.premium || ""
  setUploadFiles(props.ViewData?.pay_attachment)
  setPaymentDetails((prevState) => ({
    ...prevState,
  }));
}
}, [props.ViewData])
    return (
               <div>
                   <Labelbox type="text" labelname="Bank Name"
                      changeData={(data)=>PaymentValidation(data,"bank_name")} 
                      value={PaymentDetails.bank_name.value}
                      error={PaymentDetails.bank_name.error}
                      errmsg={PaymentDetails.bank_name.errmsg}
                     />
                      <Labelbox type="text" labelname="Branch"
                      changeData={(data)=>PaymentValidation(data,"branch")} 
                      value={PaymentDetails.branch.value}
                      error={PaymentDetails.branch.error}
                      errmsg={PaymentDetails.branch.errmsg}
                     />
                      <Labelbox type="text" labelname="Amount"
                      changeData={(data)=>PaymentValidation(data,"amount")} 
                      value={PaymentDetails.amount.value}
                      error={PaymentDetails.amount.error}
                      errmsg={PaymentDetails.amount.errmsg}
                      // disabled={true}
                     />
                       <Labelbox type="number" labelname="Reference Number"
                      changeData={(data)=>PaymentValidation(data,"ref_no")} 
                      value={PaymentDetails.ref_no.value}
                      error={PaymentDetails.ref_no.error}
                      errmsg={PaymentDetails.ref_no.errmsg}
                      disabled={true}
                     />
                    <div>Upload Photo</div>
                    <div style={{marginTop:"6px"}}><input type="file" id="myfile" name="myfile" onChange={(e)=>FileOnchange(e)}/></div>
                    {/* <div style={{color:"red",fontSize:"13px",marginTop:"3px"}}>{uploadError}</div> */}
                    <div className="bs_btn_custom"><CustomButton btnName="Submit" onBtnClick={PaymentSubmit}/></div>  
        </div>
    )
}
