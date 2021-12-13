import { combineReducers } from "redux";
import Reducer from './Reducer'
import StateReducer from '../StateDetails/StateReducer'
import MobileReducer from './MobileReducer'
export default  combineReducers({
  Reducer,
  StateReducer,
  MobileReducer
})