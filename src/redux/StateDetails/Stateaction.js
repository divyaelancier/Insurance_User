import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import moment from 'moment'
import { notification } from 'antd'
import { PROPOSAL_DATA,TRAVEL_PROPOSAL_DATA,MOTOR_PROPOSAL_DATA,PRODUCT_DATA_NAME} from './Constants'
export const ProposalData=(Data)=>async (dispatch)=>{
        const Proposal=Data || ""
        return dispatch({type:PROPOSAL_DATA,payload:Proposal})
    }
    
export const Travel_Proposal_Data=(Data)=>async (dispatch)=>{
        const Travel_Proposal=Data || ""
        return dispatch({type:TRAVEL_PROPOSAL_DATA,payload:Travel_Proposal})
 }

 export const Motor_Proposal_Data=(Data)=>async (dispatch)=>{
    const Motor_Proposal=Data || ""
    return dispatch({type:MOTOR_PROPOSAL_DATA,payload:Motor_Proposal})
}

// export const ProductData=(Data)=>async (dispatch)=>{
//     const Products_Name=Data || ""
//     return dispatch({type:PRODUCT_DATA_NAME,payload:Products_Name})
// }


