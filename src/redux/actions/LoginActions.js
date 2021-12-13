import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import moment from 'moment'
import { notification } from 'antd'
import { ProfileGet_Api } from './DashboardActions'
import { USER_SIGN_UP,USER_SIGN_IN,PROFILE_UPDATE } from '../constants/constants' 
export const User_signin_Details=(data)=>async (dispatch)=>{
    try{
        const response=await axios({
            method:"POST",
            url:baseUrl+"users/signin",
            data:{
                "email":data.username || data.email.value,
                "password":data.password || JSON.parse(localStorage.getItem("data")).password
            }
        });
        console.log("response",response)
        return dispatch({type:USER_SIGN_IN,payload:response.data})
    }
    catch (err) {
  
    }
  }

  export const User_SignUp_Details=(data,type)=>async (dispatch)=>{
    try{
        const response=await axios({
            method:"POST",
            url:baseUrl+"users/signup",
            data:{
                "email":data.username,
                "password":data.password,
                "role": type==1?"agent":type==2?"user":0
            }
        });
        return dispatch({type:USER_SIGN_UP,payload:response.data})
    }
    catch (err) {
  
    }
  }



  export const ProfileUpdate = (data,upload) => async dispatch => {
    try {
        axios({
            method: 'post',
            url: baseUrl + 'users/profileupdate',
            data:{
                "id":localStorage.getItem("userId") || 0,
                "name":data.name.value,
                "dob":moment(data.dob.value).format("YYYY-MM-DD"),
                "income":data.income.value,
                "marital_status":data.marital_status.value,
                "city":data.city.value,
                "mobileno":data.phone_number.value,
                "phoneno":data.c_mobile_number.value,
                "email1":data.email1.value,
                "email2":data.email2.value,
                "state":data.state.value,
                "profile":upload || ""        
            },
        })
        .then((response) => {
            dispatch({type:PROFILE_UPDATE,payload:response.data.response})
            if(response.data.status==="Success"){
                notification.success({
                    message:response.data.message,
                  });
                  dispatch(User_signin_Details(data))
                  dispatch(ProfileGet_Api())
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
            message: 'Something wrong,Not Updated User Details',
          });
    }
}
