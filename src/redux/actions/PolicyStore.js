import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import moment from 'moment'
import { notification } from 'antd'
import { USER_GET_QUOTE,TRAVEL_GET_QUOTE,MOTOR_GET_QUOTE } from '../constants/constants'
const LoginData=JSON.parse(localStorage.getItem("data"))


export const User_Get_Quote=(data,additional,ProductName,customer_id,Id)=>async (dispatch)=>{
    console.log("ProductName",ProductName)
    try{
        const response=await axios({
            method:"POST",
            url:baseUrl+"users/getQuote",
            data:{
                "id":Id || "",
                "cus_id":localStorage.getItem("userId"),
                "life_assured_type":data.assured_type.value || 0,
                "plan_period":data.plan_period.value || 0,
                "age_dob":data.age.value || 0,
                "sum_assured":data.amount.value || 0,
                "additional_cover":additional.toString() || 0,
                "product_type":"Life Policies",
                "product_name":ProductName || 0,
                "frequency":"Yearly",
                "premium":"20000",
                "agent_id":LoginData?.role==="agent"?localStorage.getItem("userId"):0,
                "acus_id":customer_id,
                "proposer_name":data.customers.value
            }
        });
        return dispatch({type:USER_GET_QUOTE,payload:response.data.response})
    }
    catch (err) {

    }
}


export const Travel_Get_Quote=(data,customer_id,Id )=>async (dispatch)=>{
    try{
        const response=await axios({
            method:"POST",
            url:baseUrl+"users/gettravelQuote",
            data:{
            "id":Id || "" ,
            "cus_id":localStorage.getItem("userId"),
           "traveller_type":data.travel_type.value || 0,
          "travel_country":data.travel_country.value || 0,
          "no_of_days_travel":data.noof_travel.value,
         "sum_assured": "100000",
         "product_type":"Non Life Policies" || 0,
         "product_name":"Travel Insurance" || 0,
         "frequency":"Yearly",
          "premium":"25000" ,
          "agent_id":LoginData?.role==="agent"?localStorage.getItem("userId"):0,
          "acus_id":customer_id,
          "insured_name":data.customers.value
            }
        });
        return dispatch({type:TRAVEL_GET_QUOTE,payload:response.data.response})
    }
    catch (err) {

    }
}


export const Motor_Get_Quote=(data,customer_id,edit)=>async (dispatch)=>{
    console.log(customer_id,"customer_id")
    try{
        const response=await axios({
            method:"POST",
            url:baseUrl+"users/getmotorQuote",
            data:{
                "id":edit,
                "cus_id":localStorage.getItem("userId"),
                "plate_number_type":data.plate_number_type.value || 0,
                "purpose":data.purpose.value || 0,
                "vehicle_type":data.vehicle_type.value || 0,
                "number_of_nameplate_drivers":"",
                "product_type":"Non Life Policies",
                "product_name": "Motor Insurance",
                "frequency": "Yearly",
                "premium": "10000",
                "agent_id":LoginData?.role==="agent"?localStorage.getItem("userId"):0,
                "acus_id":customer_id  ,
                 "insured_name":data.customers.value   
            }
        });
        return dispatch({type:MOTOR_GET_QUOTE,payload:response.data.response})
    }
    catch (err) {

    }
}