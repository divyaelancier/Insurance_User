import React,{useEffect,useState} from 'react'
import Cardbody from '../../Components/Card/CardWrapper'
import Grid from "@material-ui/core/Grid";
import Poster from '../../Images/poster2.png'
import star from '../../Images/star.png'
import Labelbox from '../../Components/labelbox/labelbox'
import Radio from '@material-ui/core/Radio';
import {Link} from 'react-router-dom'
import { connect,useDispatch } from 'react-redux'
import { useLocation,useHistory } from 'react-router-dom';
import { ProposalData } from '../../redux/StateDetails/Stateaction'
import { Motor_Get_Quote,Travel_Get_Quote } from '../../redux/actions/PolicyStore'
function Review(props){
   let location=useLocation()
   let dispatch = useDispatch()
   // const Summary=props.location.state.Product==="Travel Insurance"? props.location.state.Details : props.location.state.Details.Details
   const history=useHistory()
   const LoginData=JSON.parse(localStorage.getItem("data"))
   const [StateDetail,setStateDetail]=useState()
   const Submit=()=>{
      if(props.location.state.Title==="Travel Insurance" || props.location.state.Product==="Travel Insurance" || props.EditData.product_name==="Travel Insurance"){
         history.push({
            pathname:"/travel_policy_informations",
            state:{
               State:props.location.state,
               Details:props.location.Props
             }
         })
      }
      else if(props.location.state.Title==="Motor Insurance" || props.location.state.Product==="Motor Insurance" || props.EditData.product_name==="Motor Insurance"){
         history.push({
            pathname:"/motorinsurance_informations",
            state:props.location.state
         })
      }
      else{
      history.push({
         pathname:"/informationdetails",
         state:props.location.state
      })
     }
   }
 useEffect(() => {
   setStateDetail(props.proposal)
   if(props.location.state.login==="motor"){
      dispatch(Motor_Get_Quote(props.proposal,props.location.state.Title))
    }else if(props.location.state.login==="travel"){
      dispatch(Travel_Get_Quote(props.proposal,props.location.state.Title))
    }
}, [props.proposal])
console.log("propssss",props.EditData)
 
    return(
        <div className="review_parent">
            <h3>Review</h3>
                   <Grid container spacing={3}>
                   <Grid item md={6} xs={12} lg={6} className="img_review_divs">
                   {/* <div className="img_cont_div"> */}
                      <div>
                     <img src={Poster} style={{width:"100%",height:"100%"}}/>
                     </div>
                     {/* </div> */}
                   </Grid>  
                   <Grid item md={6} xs={12} lg={6} >
                     <Cardbody Customcardcss="card_inner_body" variant>
                         <div className="m_h_div">
                          <div>Summary</div>
                         <div className="motor_tex">{props?.location?.state?.Props?.Details?.Title || props?.location?.state?.Product || props.EditData.product_name}</div>
                        </div>
                        {/* {props.location.state.Title==="Travel Insurance" || props.location.state.Product==="Travel Insurance" && */}
                          <>
                          {/* <div>Cover Amount :Rs.{props?.location?.state?.Props?.Details?.Termin?.amount?.value || props?.location?.state?.Details?.sum_assured?.value || StateDetail?.amount?.value || "---"}</div>
                         <div>Base Plan Rs. /-</div>
                         {/* <div>Cover Amount Rs. 5 Lakhs</div> */}
                         {/* <div>Policy Period {props?.location?.state?.Props?.Details?.Termin?.plan_period?.value || StateDetail?.plan_period?.value || "---"} Year</div> */} 
                       
                         </>
    {/* } */}
                      {props.location.state.Title==="Motor Insurance" || props.EditData.product_name==="Motor Insurance"  || props.location.state.Product==="Motor Insurance" || props.EditData.product_name==="Motor Insurance" ?
                      <>
                         {LoginData?.role==="agent"&&<div>Customer Name : {StateDetail?.customers?.value}</div>}
                         <div>Plate Number Type : {StateDetail?.plate_number_type?.value}</div>
                         <div>Purpose : {StateDetail?.purpose?.value}</div>
                         <div>Vehicle Type  : {StateDetail?.vehicle_type?.value}</div>
                         <div>Driver Type : {StateDetail?.driver_type?.value}</div>

                      </>:props.location.state.Title==="Travel Insurance" || props.EditData.product_name==="Travel Insurance" || props.location.state.Product==="Travel Insurance"?
                      <>
                      {LoginData?.role==="agent"&&<div>Customer Name : {StateDetail?.customers?.value}</div>}
                       <div>Travel Type : {StateDetail?.travel_type?.value}</div>
                       <div>Travel Country : {StateDetail?.travel_country?.value}</div>
                       <div>Number of days of Travel : {StateDetail?.noof_travel?.value}</div>
                       <div>Sum Assured : {StateDetail?.sum_assured?.value}</div>
                       
                       
                      </>:
                      <>
                        {LoginData?.role==="agent"&&
                        <div>Customer Name : {StateDetail?.customers?.value}</div>}
                        <div>Assured Type : {StateDetail?.assured_type?.value}</div>
                        {/* <div>Date : {StateDetail?.date?.value}</div> */}
                        <div>Policy Period {StateDetail?.plan_period?.value}</div>
                        <div>Age : {StateDetail?.age?.value}</div>
                        <div>Cover Amount : {StateDetail?.amount?.value}</div>
                        </>
                      }

                     
                     </Cardbody>
                   </Grid> 
                   <Grid item md={12} xs={12} lg={12} className="_tet_div_btn" style={{textAlign:"center"}}>
                                <div className="custm_quote" >
                                 {/* <CustomButton btnName="Next"/> */}
                                 <a  class="next" onClick={Submit}>Next &raquo;</a>
                                 </div>
                  </Grid>
          </Grid>    
         
        </div>
    )
}
const mapStateToProps = (state) =>
({
     proposal: state.StateReducer.ProposalData || [],
     EditData:state.MobileReducer.EditData || []
});
export default connect(mapStateToProps)(Review);

{/* <Grid container  spacing={3} className=""> 
<Grid item md={8} xs={12} lg={8} >
<Grid container xs={12}> 
<Grid item md={12} xs={12} lg={12} >
  <Cardbody Customcardcss="card-fst_div" variant>
     <div className="re_img_div">
     <img src={Poster} style={{width:"200px"}}/>
     </div>
     <div>
        <div className="star_div"><img src={star}/>Young Star Plan</div>
        <div>Cover Amount</div>
        <Labelbox type="select" placeholder="5 Lakhs"/>
     </div>
  </Cardbody>
  <Grid item md={12} xs={12} lg={12}>
  <Cardbody Customcardcss="card_snd_items" variant>
     <h3>Policy Period</h3>
     <p>Choosing a multi-year plan saves your money and the trouble of remembering yearly renewals.</p>
     <div className="card_itm_div">
         <div className="card card_texts_in">
            <div><Radio size="small" checked/><label>1 Year</label></div>
            <div>Premium Rs. 6631/-</div>
         </div>
         <div className="card card_texts_in">
            <div><Radio size="small" checked={false}/><label>2 Year</label></div>
            <div>Premium</div>
         </div>
         <div className="card card_texts_in">
            <div><Radio size="small" checked={false}/><label>3 Year</label></div>
            <div>Premium</div>
         </div>
         
     </div> 

  </Cardbody>
  </Grid> 
  </Grid> 
  </Grid> 
</Grid>  */}