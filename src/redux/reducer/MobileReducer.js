import { DASHOARD_MENU,EDIT_POLICY_DATA } from '../constants/constants'    
const initialState ={
 Dashoard_menu:[],
 EditData:[]
}
export default function(state=initialState,action){
 const {type,payload} = action;
 switch (type) {
     case DASHOARD_MENU:
         return {...state,Dashoard_menu:payload}
         
      case EDIT_POLICY_DATA:
          return { ...state,EditData:payload}   
     default:
         return state;
 }

}