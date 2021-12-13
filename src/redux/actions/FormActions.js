import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import moment from 'moment'
import { notification } from 'antd'
import { User_Life_Policy,Travel_Policy,Motor_Policy } from './DashboardActions'
import { LIFE_POLICY_CREATE,TRAVEL_POLICY_CREATE,MOTOR_POLICY_CREATE, GET_QUESTIONS } from '../constants/constants' 
const LoginData=JSON.parse(localStorage.getItem("data"))

  export const LifePolicyFormCreate = (Inform_Detail,payment_type,Details,Basic_Details,Nommiee,Additonal_check,Question_Data,ProductName,Quote,pay,EditId,Payment,upload,Store) => async dispatch => {
    try {
        axios({
            method: 'post',
            url: baseUrl + 'users/updateLifeinsurance',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
            data:{
                "id":EditId?EditId:Store? Store.id :Quote[0]?.id || 0,  
                "cus_id": Store?Store?.cus_id:localStorage.getItem("userId") || "",
                "agent_id":Store?Store?.agent_id:LoginData?.role==="agent"?localStorage.getItem("userId"):"",
                "life_assured_type":Details?.assured_type?.value || Store?.life_assured_type,
                "plan_period":Details?.plan_period?.value || Store?.plan_period || "",
                "age_dob":Details?.age?.value || Store?.age_dob || "",
                "sum_assured":Details?.amount?.value || Store?.sum_assured || "",
                "product_type":"Life Policies",
                "product_name":ProductName?ProductName:Store?.product_name,
                "frequency":"Yearly",
                "premium":"20000",
                "additional_cover":Additonal_check.toString() || Store.additional_cover,
                "basic_info" : {
                    "proposer_name":Inform_Detail?.proposer_name?.value || Store.basic_info.proposer_name,
                    "father_name":Inform_Detail?.fathers_name?.value || Store.basic_info.father_name,
                    "grand_father_name":Inform_Detail?.grand_fathers_name?.value || Store.basic_info.grand_father_name,
                    "houser_no":Inform_Detail?.house_no?.value || Store.basic_info.houser_no,
                    "building_name":Inform_Detail?.building_name?.value || Store.basic_info.building_name,
                    "kebele":Inform_Detail?.kebele?.value || Store.basic_info.kebele,
                    "woreda":Inform_Detail?.woreda?.value || Store.basic_info.woredaworeda,
                    "phone_number":Inform_Detail?.phone_number?.value || Store.basic_info.phone_number ,
                    "mobile_number":Inform_Detail?.mobile_number?.value || Store.basic_info.mobile_number 
                },
                "life_assured_details":{
                    "life_assured_name":Inform_Detail?.l_assured_name?.value || Store.life_assured_details.life_assured_name,
                    "lfather_name":Inform_Detail?.l_fathers_name?.value || Store.life_assured_details.lfather_name,
                    "lgrand_father_name":Inform_Detail?.l_grandfathers_name?.value || Store.life_assured_details.lgrand_father_name,
                    "lage_dob":moment(Inform_Detail?.dob?.value).format("YYYY-MM-DD") || moment(Store.life_assured_details.lage_dob).format("YYYY-MM-DD"),
                    "lsum_assured":Inform_Detail?.sum_assured?.value || Store.life_assured_details.lsum_assured,
                    "lpolicy_period":Inform_Detail?.policy_period?.value || Store.life_assured_details.lpolicy_period
                },
                "address" : {
                    "ahouser_no":Inform_Detail?.a_house_no?.value || Store.address.ahouser_no,
                    "abuilding_name":Inform_Detail?.a_building_name?.value || Store.address.abuilding_name,
                    "akebele":Inform_Detail?.a_kebele?.value || Store.address.akebele,
                    "aworeda":Inform_Detail?.a_woreda?.value || Store.address.aworeda,
                    "aphone_number":Inform_Detail?.a_phone_number?.value || Store.address.aphone_number,
                    "amobile_number":Inform_Detail?.a_mobile_number?.value || Store.address.amobile_number
                },
                "personal_identification_details": {
                    "identification_type":Inform_Detail?.identify_type?.value || Store.personal_identification_details.identification_type,
                    "id_card_number":Inform_Detail?.card_number?.value || Store.personal_identification_details.id_card_number,
                    "id_issue_by":Inform_Detail?.issued_by?.value || Store.personal_identification_details.id_issue_by,
                    "id_issue_date":moment(Inform_Detail?.issued_date?.value).format("YYYY-MM-DD") || moment(Store?.personal_identification_details?.id_issue_date).format("YYYY-MM-DD"),
                    "id_expiry_date":moment(Inform_Detail?.expiry_date?.value).format("YYYY-MM-DD") || moment(Store?.personal_identification_details?.id_expiry_date).format("YYYY-MM-DD")
                },
                "nominee":Nommiee || Store?.nominee,
                "questions" : Question_Data || Store?.questions,
                "paytype":payment_type || Store?.paytype,
                "refno":Quote[0]?.refno || Payment?.ref_no?.value,
                "paydetails" : [
                      {
                        "bankname":Payment?.bank_name?.value || "",
                        "branch":Payment?.branch?.value || "",
                        "amount":Payment?.amount?.value || "",
                      }
                  ],
                "payamt":"20000",
                "date_of_transfer":moment().format("YYYY-MM-DD"),
                "pay_attachment":upload  || ""   
            },
        })
        .then((response) => {
            dispatch({type:LIFE_POLICY_CREATE,payload:response.data.response})
            if(response.data.status==="Success"){
                notification.success({
                    message:response.data.message,
                  });
                  dispatch(User_Life_Policy())
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


export const TravelFormCreate = (Details,payment_type,Basic_Details,NommieData,Quote,EditId,Payment,upload,Store) => async dispatch => {
    try {
        axios({
            method: 'post',
            url: baseUrl + 'users/updateTravelinsurance',
            data:{
         "id":EditId?EditId:Quote[0]?.id || Store.id,      
         "cus_id":Store?Store?.cus_id:localStorage.getItem("userId"),
         "agent_id":LoginData?.role==="agent"?localStorage.getItem("userId"):Store?Store?.agent_id:"",
        "traveller_type":Basic_Details?.travel_type?.value || Store?.traveller_type,
        "travel_country":Basic_Details?.travel_country?.value || Store?.travel_country,
         "no_of_days_travel":Basic_Details?.noof_travel?.value || Store?.no_of_days_travel,
         "product_type":"Non Life Policies" || 0,
         "product_name":"Travel Insurance" || 0,
         "frequency":"Yearly" || 0,
         "premium":"25000" || 0,
        "sum_assured":Basic_Details?.sum_assured?.value || Store?.sum_assured,
        "basic_info": {
        "insured_name":Details?.insured_name?.value || Store?.basic_info.insured_name,
        "father_name":Details?.fathers_name?.value || Store?.basic_info.father_name,
        "grand_father_name":Details?.grand_father_name?.value || Store?.basic_info.grand_father_name,
        "houser_no":Details?.house_no?.value || Store?.basic_info.houser_no,
        "building_name":Details?.building_name?.value || Store?.basic_info.building_name,
        "kebele":Details?.kebele?.value || Store?.basic_info.kebele,
        "woreda":Details?.woreda?.value || Store?.basic_info.woreda,
        "phone_number":Details?.phone_number?.value || Store?.basic_info.phone_number,
        "mobile_number":Details?.mobile_number?.value || Store?.basic_info.mobile_number
    },
    "travelling_country": {
        "address1":Details?.address1?.value ||  Store?.travelling_country.address1,
        "address2":Details?.address2?.value ||  Store?.travelling_country.address2,
        "address3":Details?.address3?.value ||  Store?.travelling_country.address3,
        "tphone_number":Details?.travel_phone_number?.value ||  Store?.travelling_country.tphone_number,
        "tmobile_number":Details?.travel_mobile_number?.value ||  Store?.travelling_country.tmobile_number,
		"passport_number":Details?.passport_number?.value ||  Store?.travelling_country.passport_number,
		"place_of_issue":Details?.passport_number?.value ||  Store?.travelling_country.place_of_issue,
		"date_of_issue":moment(Details?.date_of_issue?.value).format("YYYY-MM-DD") || moment(Store?.travelling_country.date_of_issue).format("YYYY-MM-DD") || 0,
		"date_of_expiry":moment(Details?.date_of_expiry?.value).format("YYYY-MM-DD") || moment(Store?.travelling_country.date_of_expiry).format("YYYY-MM-DD") || 0
    },
    "nominee": NommieData || [],
           "paytype":payment_type || Store?.paytype,
                "refno":Quote[0]?.refno || Payment?.ref_no?.value,
                "paydetails" : [
                      {
                        "bankname":Payment?.bank_name?.value || "",
                        "branch":Payment?.branch?.value || "",
                        "amount":Payment?.amount?.value || "",
                      }
                  ],
                "payamt":"1500",
                "date_of_transfer":moment().format("YYYY-MM-DD"),
                "pay_attachment":upload || "" 
    
            },
        })
        .then((response) => {
            dispatch({type:TRAVEL_POLICY_CREATE,payload:response.data.response})
            if(response.data.status==="Success"){
                notification.success({
                    message:response.data.message,
                  });
                  dispatch(Motor_Policy())
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


export const MotorFormCreate = (Details,payment_type,BasicDetails,VechicleData,Quote,EditId,Payment,upload,Store) => async dispatch => {
    try {
        axios({
            method: 'post',
            url: baseUrl + 'users/updateMotorinsurance',
            
            data:{
                "id":EditId?EditId:Quote[0]?.id || Store.id,
                "agent_id":Store?Store?.agent_id:LoginData?.role==="agent"?localStorage.getItem("userId"):"",
                "cus_id":Store?Store?.cus_id:localStorage.getItem("userId"),
                "plate_number_type":BasicDetails?.plate_number_type?.value ||  Store.plate_number_type,
                "purpose":BasicDetails?.purpose?.value || Store.purpose,
                "vehicle_type":BasicDetails?.vehicle_type?.value || Store?.vehicle_type,
                "product_type":"Non Life Policies",
                "product_name":"Motor Insurance",
                "frequency": "Yeary",
                "premium":1500,
                "number_of_nameplate_drivers": 0,
                "basic_info": {
                    "insured_name":Details?.insured_name?.value || Store.basic_info.insured_name,
                    "father_name":Details?.fathers_name?.value ||  Store.basic_info.father_name,
                    "grand_father_name":Details?.grand_fathers_name?.value ||  Store.basic_info.grand_father_name,
                    "houser_no":Details?.house_no?.value ||  Store.basic_info.houser_no,
                    "building_name":Details?.building_name?.value ||  Store.basic_info.building_name,
                    "kebele":Details?.kebele?.value ||  Store.basic_info.kebele,
                    "woreda":Details?.woreda?.value ||  Store.basic_info.woreda,
                    "phone_number":Details?.phone_number?.value ||  Store.basic_info.phone_number,
                    "mobile_number":Details?.mobile_number?.value ||  Store.basic_info.mobile_number
                },
                "personal_identification_details": {
                    "identification_type":Details?.identify_type?.value || Store.personal_identification_details.identification_type,
                    "id_card_number":Details?.card_number?.value || Store.personal_identification_details.id_card_number,
                    "id_issue_by":Details?.issued_by?.value || Store.personal_identification_details.id_issue_by,
                    "id_issue_date":moment(Details?.issued_date?.value).format("YYYY-MM-DD") || moment(Store.personal_identification_details.id_issue_date).format("YYYY-MM-DD"),
                    "id_expiry_date":moment(Details?.issued_date?.value).format("YYYY-MM-DD") || moment(Store.personal_identification_details.id_expiry_date).format("YYYY-MM-DD")
                },
                "vehicle_details": VechicleData || Store?.vehicle_details,
                "paytype":payment_type ||  Store?.paytype,
                "refno":Quote[0]?.refno || Payment?.ref_no?.value,
                "paydetails" : [
                      {
                        "bankname":Payment?.bank_name?.value || "",
                        "branch":Payment?.branch?.value || "",
                        "amount":Payment?.amount?.value || "",
                      }
                  ],
                "payamt":"1500",
                "date_of_transfer":moment().format("YYYY-MM-DD"),
                "pay_attachment":upload || "" 
            },
        })
        .then((response) => {
            dispatch({type:MOTOR_POLICY_CREATE,payload:response.data.response})
            if(response.data.status==="Success"){
                notification.success({
                    message:response.data.message,
                  });
                  dispatch(Travel_Policy())
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
            message: 'Something wrong,Record not added',
          });
    }
}


export const Get_Questions=(data)=>async (dispatch)=>{
    try{
        const response=await axios({
            method:"POST",
            url:baseUrl+"questions/getQuestions",
            data:{
                "id":"",
                "policy_type":"Life Policies",
                "category_type":data
            }
        });
        return dispatch({type:GET_QUESTIONS,payload:response.data.response})
    }
    catch (err) {

    }
}
