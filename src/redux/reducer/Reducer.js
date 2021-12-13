import {GET_PRODUCTS,GET_FAQ,GET_SLIDER,GET_BRANCH_LOCATOR,GET_TESTIMONIAL,
       GET_PRODUCTS_LIST,GET_QUESTIONS,GET_NEWSLETTER,GET_CONTACTUS,
       GET_OFFLINE_POLICY,GET_SETTINGS_CONTACT,GET_OFFLINE_PRODUCTS,USER_SIGN_IN,
       POLICY_ENQUIRY,SERVICE_REQUEST,USER_GET_QUOTE,PROFILE_GET_API} from '../constants/constants'
import { MOTOR_POLICY,TRAVEL_POLICY,GET_PRODUCT_SLIDER,TRAVEL_GET_QUOTE,MOTOR_GET_QUOTE} from '../constants/constants'

import { MYCLAIMES_GET__API,GET_CUSTOMERS_LIST,GET_CUSTOMERS } from '../constants/constants'       
const initialState ={
    Get_FAQ:[],
    Get_Products:[],
    SliderData:[],
    BranchData:[],
    TestimonailData:[],
    Product_list:[],
    QuestionData:[],
    ContactUsData:[],
    NewsLetterData:[],
    ContactDetails:[],
    OfflinePolicy:[],
    OfflineProducts:[],
    LoginData:[],
    UserPolicy:[],
    Service_Request:[],
    Motorpolicy:[],
    Travelpolicy:[],
    ProductSlider:[],
    ProfileGetData:[],
    MyClaimes_Data:[],
    Customers_list:[],
    Lifepolicyquote:[],
    Travelquote:[],
    MotorQuote:[],
    AllCustomers:[]
}
export default function(state=initialState,action){
    const {type,payload} = action;
    console.log("payload",state)
    switch (type) {
        case GET_FAQ:
            return {...state,Get_FAQ:payload} 
        case GET_PRODUCTS:
            return {...state,Get_Products:payload} 
        case GET_SLIDER:
            return {...state,SliderData:payload} 
        case GET_BRANCH_LOCATOR:
            return {...state,BranchData:payload}
        case GET_TESTIMONIAL:
            return {...state,TestimonailData:payload}  
        case GET_PRODUCTS_LIST:
            return {...state, Product_list:payload}  
        case GET_QUESTIONS:
           return {...state,QuestionData:payload}  
        case GET_NEWSLETTER:
           return {...state,NewsLetterData:payload} 
        case GET_SETTINGS_CONTACT:
            return {...state,ContactDetails:payload}
        case GET_OFFLINE_POLICY:
            return {...state,OfflinePolicy:payload} 
        case GET_OFFLINE_PRODUCTS:
            return {...state,OfflineProducts:payload} 
        case USER_SIGN_IN:
            return {...state,LoginData:payload}
        case POLICY_ENQUIRY:
           return {...state,UserPolicy:payload}
        case MOTOR_POLICY:
            return { ...state, Motorpolicy:payload}   
        case TRAVEL_POLICY:
            return { ...state, Travelpolicy:payload}    
        case SERVICE_REQUEST:
            return {...state,Service_Request:payload}
        case GET_PRODUCT_SLIDER:
            return { ...state,ProductSlider:payload} 
         case PROFILE_GET_API:
                return { ...state,ProfileGetData:payload}
        case MYCLAIMES_GET__API:
            return { ...state,MyClaimes_Data:payload}        
        case USER_GET_QUOTE:
            return { ... state,Lifepolicyquote:payload} 
        case TRAVEL_GET_QUOTE:
            return { ...state,Travelquote:payload}   
        case MOTOR_GET_QUOTE:
            return { ...state,MotorQuote:payload} 
        case GET_CUSTOMERS_LIST:
            return { ...state,Customers_list:payload}  
        case GET_CUSTOMERS:
            return {...state,AllCustomers:payload}                                                    
        default:
            return state;
    }

}