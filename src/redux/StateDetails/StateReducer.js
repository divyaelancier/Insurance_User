import { PROPOSAL_DATA,TRAVEL_PROPOSAL_DATA,MOTOR_PROPOSAL_DATA,BASIC_INFO } from './Constants'
const initialState ={
ProposalData:[],
Travel_ProposalData:[],
MotorTravel:[],
Basic_Info:[]
}
export default function(state=initialState,action){
 const {type,payload} = action;
 console.log("ppppppp",state)
 switch (type) {
     case PROPOSAL_DATA:
         return {...state,ProposalData:payload}
     case TRAVEL_PROPOSAL_DATA:
         return {...state,Travel_ProposalData:payload}  
     case MOTOR_PROPOSAL_DATA:
         return { ...state,MotorTravel:payload} 
     case BASIC_INFO:
         return {...state,Basic_Info:payload}                                                 
     default:
         return state;
 }

}