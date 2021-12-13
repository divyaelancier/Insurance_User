import { CREATE_CONTACT_US,CREATE_NEWSLETTER } from '../constants/constants'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import {notification} from 'antd'
export const Create_ContactUs = (data) => async dispatch => {
    try {
        axios({
            method: 'post',
            url: baseUrl + 'contactUs/updatecontactUs',
            data:{

                "id": "",
                "name":data.name,
                "email":data.email,
                "phone":data.phone_number
            },
        })
        .then((response) => {
            dispatch({type:CREATE_CONTACT_US,payload:response})
            if(response.data.status==="Success"){
                notification.success({
                    message:response.data.message,
                  });
                //   dispatch(Get_Branch_Locator(EditData.id))
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

export const Subscribe_NewsLetter = (data) => async dispatch => {
    try {
        axios({
            method: 'post',
            url: baseUrl + 'newsLetter/updatenewsLetter',
            data:{
                "id": "",
                "email":data.email
            },
        })
        .then((response) => {
            dispatch({type:CREATE_NEWSLETTER,payload:response})
            if(response.data.status==="Success"){
                notification.success({
                    message:response.data.message,
                  });
                //   dispatch(Get_Branch_Locator(EditData.id))
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