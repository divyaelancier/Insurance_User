import React from 'react'
import Grid from '@material-ui/core/Grid';
import moment from 'moment'
export default function MotorViewModal(props){
    const ViewData=props.ViewData && props.ViewData
    console.log("props",props)
    return(
        <div>
              <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={6} className="view_product">
                        <div>Basic Info Details</div>
                        <ul>
                        <li>Proposer Name : {ViewData.basic_info.insured_name===null?"":ViewData.basic_info.insured_name}</li>
                        <li>Father Name : {ViewData.basic_info.father_name===null?"":ViewData.basic_info.father_name}</li>
                        <li>GrantFather's Name : {ViewData.basic_info.grand_father_name===null?"":ViewData.basic_info.grand_father_name}</li>
                        <li>House No : {ViewData.basic_info.houser_no===null?"":ViewData.basic_info.houser_no}</li>
                        <li>Building Name : {ViewData.basic_info.building_name===null?"":ViewData.basic_info.building_name}</li>
                        <li>Kebele : {ViewData.basic_info.kebele===null?"":ViewData.basic_info.kebele}</li>
                        <li>Woreda : {ViewData.basic_info.woreda===null?"":ViewData.basic_info.woreda}</li>
                        <li>Phone Number : {ViewData.basic_info.phone_number===null?"":ViewData.basic_info.phone_number}</li>
                        <li>Mobile Number : {ViewData.basic_info.mobile_number===null?"":ViewData.basic_info.mobile_number}</li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} className="view_product">
                        <div>Personal Identification Details</div>
                        <ul>
                        <li>Identification Type : {ViewData.personal_identification_details.identification_type===null?"":ViewData.personal_identification_details.identification_type}</li>
                        <li>Id Card Number : {ViewData?.personal_identification_details?.id_card_number===null?"":ViewData?.personal_identification_details?.id_card_number}</li> 
                         <li>Issued By : {ViewData?.personal_identification_details?.id_issue_by===null?"":ViewData?.personal_identification_details?.id_issue_by}</li>
                        <li>Issued Date : {moment(ViewData?.personal_identification_details?.id_issue_date===null?"":ViewData?.personal_identification_details?.id_issue_date).format("DD-MM-YYYY")}</li>
                        <li>Expiry Date : {moment(ViewData?.personal_identification_details?.id_expiry_date===null?"":ViewData?.personal_identification_details?.id_expiry_date).format("DD-MM-YYYY")}</li> 
                        </ul>
                    </Grid>
                    {ViewData?.vehicle_details?.length>0?<Grid item xs={12} md={6} lg={6} className="view_product">
                        <div>Vehicle Details</div>
                        {ViewData.vehicle_details.map((data)=>
                        <ul>
                        <li>Plate Number : {data.platenumber}</li>
                        <li>Engine Number : {data.engine_number}</li>
                        <li>Chassis Number : {data.chassis_number}</li>
                        <li>No.of Passengers : {data.noof_passengers}</li>
                        <li>Phone Number : {data.phone}</li>
                        <li>Vehicle Make : {data.vechicle_make}</li>
                        <li>Vehicle Modal : {data.vechicle_model}</li>
                        <li>Year of Manufacture : {data.manufacture}</li>
                        <li>Carring Capacity in Litres : {data.capcity_in_liters}</li>
                        <li>Carring Capacity in Quintals : {data.capacity_in_quintals}</li>
                        <li>Number of Seats : {data.noof_seats}</li>
                        <li>Driver Type : {data.driver_type}</li>
                        </ul>
                        )}
                    </Grid>:null}  
                    <Grid item xs={12} md={6} lg={6} className="view_product">
                    <div>Pay Details</div>
                        {ViewData?.paydetails.map((data)=>
                        <ul>
                              <li>Amount : {data.amount}</li>
                              <li>Branch Name : {data.bankname}</li>
                              <li>Branch : {data.branch}</li>
                        </ul>
                      )}
                    </Grid>
                   
                   

                    
                
               </Grid>     
        </div>
    )
}