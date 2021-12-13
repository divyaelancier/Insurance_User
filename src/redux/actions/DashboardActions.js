import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import moment from 'moment'
import { notification } from 'antd'
import { POLICY_ENQUIRY,SERVICE_REQUEST,TRAVEL_POLICY,MOTOR_POLICY,PROFILE_GET_API } from '../constants/constants'
import {  MYCLAIMES_GET__API,DELETE_SERVICE_REQUEST } from '../constants/constants'
const LoginData=JSON.parse(localStorage.getItem("data"))
export const User_Life_Policy=(request,search)=>async (dispatch)=>{
    // try{
        const response=await axios({
            method:"POST",
            url:baseUrl+"users/getlifeinsurance",
            data:{
                "cus_id":localStorage.getItem("userId"),
                "type":"Life",
                "policy_type":request==="myclaimes"?"":search?.name?.value || "",
                "policy_name":request==="myclaimes"?"":search?.product_name?.value || "",
                "policy_no":request==="myclaimes"?"":search?.policy_number?.value || "",
                "amount":request==="myclaimes"?"":search?.amount?.value || "",
                "acustomer":request==="myclaimes"?"":search?.customer?.value || ""
            }
        });
        return dispatch({type:POLICY_ENQUIRY,payload:response.data.response})
    // }
    // catch (err) {

    // }
}

export const Travel_Policy=(request,search)=>async (dispatch)=>{
    try{
        const response=await axios({
            method:"POST",
            url:baseUrl+"users/gettravelinsurance",
            data:{
                "cus_id":localStorage.getItem("userId"),
                "type": "Travel",
                "policy_type":request==="myclaimes"?"":search?.name?.value || "",
                "policy_name":request==="myclaimes"?"":search?.product_name?.value || "",
                "policy_no":request==="myclaimes"?"":search?.policy_number?.value || "",
                "amount":request==="myclaimes"?"":search?.amount?.value  || "",
                "acustomer":request==="myclaimes"?"":search?.customer?.value || ""
                 
            }
        });
        return dispatch({type:TRAVEL_POLICY,payload:response.data.response})
    }
    catch (err) {

    }
}

export const Motor_Policy=(request,search)=>async (dispatch)=>{
    try{
        const response=await axios({
            method:"POST",
            url:baseUrl+"users/getmotorinsurance",
            data:{
                "cus_id":localStorage.getItem("userId"),
                "type":"Motor",
                "policy_type":request==="myclaimes"?"":search?.name?.value || "",
                "policy_name":request==="myclaimes"?"":search?.product_name?.value || "",
                "policy_no":request==="myclaimes"?"":search?.policy_number?.value || "",
                "amount":request==="myclaimes"?"":search?.amount?.value || "",
                "acustomer":request==="myclaimes"?"":search?.customer?.value || ""    
            }
        });
        return dispatch({type:MOTOR_POLICY,payload:response.data.response})
    }
    catch (err) {

    }
}





export const Service_Request = (data,id,proflie) => async dispatch => {
    try {
        axios({
            method: 'post',
            url: baseUrl + 'users/serviceReqadd',
            data:{
                "id":id || "",
                "cus_id": localStorage.getItem("userId"),
                "name":data.name.value || proflie[0]?.name,
                "email":data.email.value || proflie[0]?.email,
                "mobile_no":data.mobile_number.value || proflie[0]?.phoneno,
                "detailed_complaint":data.complaint.value  
            },
        })
        .then((response) => {
            dispatch({type:SERVICE_REQUEST,payload:response})
            if(response.data.status==="Success"){
                notification.success({
                    message:response.data.message,
                  });
                  dispatch(Get_Service_Request())
                }
                if(response.data.status==="Failure"){
                    notification.success({
                        message:response.data.message,
                      });
                    }
            return Promise.resolve();
        })
        
    } catch (err) {
        notification.error({
            message: 'Something wrong,Not Added',
          });
    }
}



export const Get_Service_Request=(data)=>async (dispatch)=>{
    try{
        const response=await axios({
            method:"POST",
            url:baseUrl+"users/serviceReqlist",
            data:{
                "type":"User",
                "cus_id":localStorage.getItem("userId")   
            }
        });
        return dispatch({type:SERVICE_REQUEST,payload:response.data.response})
    }
    catch (err) {

    }
}



export const Delete_Service_Request = (id) => async dispatch => {
    try {
        axios({
            method: 'post',
            url: baseUrl + 'users/serviceReqdelete',
            data:{
                "id":id,
            },
        })
        .then((response) => {
            dispatch({type:DELETE_SERVICE_REQUEST,payload:response})
            if(response.data.status==="Success"){
                notification.success({
                    message:response.data.message,
                  });
                  dispatch(Get_Service_Request(id))
                }
               
            return Promise.resolve();
        })
        
    } catch (err) {
      
    }
}




export const ProfileGet_Api=(data)=>async (dispatch)=>{
    try{
        const response=await axios({
            method:"POST",
            url:baseUrl+"users/getprofile",
            data:{
                "id":localStorage.getItem("userId")   
            }
        });
        return dispatch({type:PROFILE_GET_API,payload:response.data.response})
    }
    catch (err) {

    }
}




// my claims
export const MYClaimes_GetApi=()=>async (dispatch)=>{
    try{
        const response=await axios({
            method:"POST",
            url:baseUrl+"users/allclaimes",
            data:{
                "cus_id":localStorage.getItem("userId")   
            }
        });
        return dispatch({type:MYCLAIMES_GET__API,payload:response.data.response})
    }
    catch (err) {

    }
}



export const Update_Myclaimes = (data,upload,policy_numer,id,Role) => async dispatch => {
    // try {
        axios({
            method: 'post',
            url: baseUrl + 'users/updateMyClaimes',
            data:{
                "id":id || "",
                "cus_id":localStorage.getItem("userId"),
                "policy_name":data?.policy_name?.value || "",
                "policy_no":policy_numer || "",
                "risk":data?.risk?.value || "",
                "risk_item":data?.risk_item?.value || "",
                "place_of_accident":data?.place_of_accient?.value || "",
                "incident_date":moment(data?.date_of_incident?.value).format("YYYY-MM-DD") || "",
                "incident_time":moment(data?.time_of_accient?.value).format("HH:MM A") || "",
                "report_of_incident_date":moment(data?.date_reportof_incident?.value).format("YYYY-MM-DD") || "",
                "report_of_incident_time": moment(data?.time_reportof_accient?.value).format("HH:MM A")|| "",
                "incident_reported_by":data?.incident_report_by?.value || "",
                "report_received_by":data?.report_received_by?.value || "",
                "mode_of_report":data?.mode_of_report?.value || "",
                "nature_of_loss":data?.nature_of_loss?.value || "",
                "proximate_cause_of_loss":data?.proximate_loss?.value || "",
                "estimated_loss":data?.estimated_loss?.value || "",
                "brief_description":data?.brief_description?.value || "",
                "basic_peril_type":data?.peril_type?.value || "",
                "peril_name":data?.peril_name?.value || "",
                "beneficiary":data?.beneficiary?.value || "",
                "description":data?.brief_description?.value || "",
                "files":upload || "",
                "acustomer":data?.customers?.value || "",
                "life_assured_name":data?.assured_name?.value || "",
                "notification_date_time":moment(data?.date?.value).format("YYYY-MM-DD") || "",
                "claimant_type ":data?.claime_type?.value || "",
                "estimated_claim":data?.benefit?.value || "",
                "vechicle_numer":data?.v_number?.value || "",
                "role":Role==="agent"?"Agent":"User"
            },
        })
        .then((response) => {
            dispatch({type:SERVICE_REQUEST,payload:response})
            if(response.data.status==="Success"){
                notification.success({
                    message:response.data.message,
                  });
                  dispatch(MYClaimes_GetApi())
                }
                if(response.data.status==="Failure"){
                    notification.success({
                        message:response.data.message,
                      });
                    }
            return Promise.resolve();
        })
        
    // } catch (err) {
    //     notification.error({
    //         message: 'Something wrong,Not Added',
    //       });
    // }
}