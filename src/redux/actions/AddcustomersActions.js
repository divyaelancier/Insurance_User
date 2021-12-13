import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import moment from 'moment'
import { notification } from 'antd'
import { ADD_CUSTOMERS,GET_CUSTOMERS_LIST,DELETE_CUSTOMERS ,GET_CUSTOMERS} from '../constants/constants'
export const Create_Customers = (data,edit) => async dispatch => {
    console.log("data",data)
    // try {
        axios({
            method: 'post',
            url: baseUrl + 'agent/addcustomer',
            data:{
                "id":edit.id?edit.id: "",
                "agent_id":localStorage.getItem("userId"),
                "name":data.name.value,
                "email":data.email.value,
                "phone":data.mobile_number.value
            },
        })
        .then((response) => {
            dispatch({type:ADD_CUSTOMERS,payload:response})
            if(response.data.status==="Success"){
                notification.success({
                    message:response.data.message,
                  });
                  dispatch(Get_Customers_List(edit.id))
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



export const Get_Customers_List=(data)=>async (dispatch)=>{
    try{
        const response=await axios({
            method:"POST",
            url:baseUrl+"agent/agentcustomer",
            data:{
                "agent_id":localStorage.getItem("userId")   
            }
        });
        return dispatch({type:GET_CUSTOMERS_LIST,payload:response.data.response})
    }
    catch (err) {

    }
}

// GET apis
export const GetAllCustomers = () => async (dispatch) => {
    const response = await axios.get(baseUrl+"users/allcustomer");
    return dispatch({ type: GET_CUSTOMERS, payload: response.data.response});
};


export const Delete_Customers = (id) => async dispatch => {
    try {
        axios({
            method: 'post',
            url: baseUrl + 'agent/deleteagentcustomer',
            data:{
                "id":id,
            },
        })
        .then((response) => {
            dispatch({type:DELETE_CUSTOMERS,payload:response})
            if(response.data.status==="Success"){
                notification.success({
                    message:response.data.message,
                  });
                  dispatch(Get_Customers_List(id))
                }
               
            return Promise.resolve();
        })
        
    } catch (err) {
      
    }
}




// export const ProfileGet_Api=(data)=>async (dispatch)=>{
//     try{
//         const response=await axios({
//             method:"POST",
//             url:baseUrl+"users/getprofile",
//             data:{
//                 "id":localStorage.getItem("userId")   
//             }
//         });
//         return dispatch({type:PROFILE_GET_API,payload:response.data.response})
//     }
//     catch (err) {

//     }
// }




// my claims
// export const MYClaimes_GetApi=()=>async (dispatch)=>{
//     try{
//         const response=await axios({
//             method:"POST",
//             url:baseUrl+"users/allclaimes",
//             data:{
//                 "cus_id":localStorage.getItem("userId")   
//             }
//         });
//         return dispatch({type:MYCLAIMES_GET__API,payload:response.data.response})
//     }
//     catch (err) {

//     }
// }



