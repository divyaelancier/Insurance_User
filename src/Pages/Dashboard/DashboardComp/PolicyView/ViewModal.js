import React from 'react'
import Grid from '@material-ui/core/Grid';
import moment from 'moment'
import './ViewModal.scss'
export default function ViewModal(props){
    console.log("props",props)
    const ViewData=props?.location?.state || props.ViewData 
    return(
        <div className={props?.location?.state && "View_modal_cont"}>
            {props?.location?.state &&<div style={{textAlign:"center",margin:"10px 0px"}}> <h3>View Policies</h3></div>}
              <Grid container spacing={3}>
              {ViewData?.product_name==="Motor Insurance"?
                     <>
                      <Grid item xs={12} md={6} lg={6} className="view_product">
                        <div>Basic Info Details</div>
                        <ul>
                        <li>Proposer Name : {ViewData?.basic_info?.insured_name}</li>
                        <li>Father Name : {ViewData?.basic_info?.father_name}</li>
                        <li>GrantFather's Name : {ViewData?.basic_info?.grand_father_name}</li>
                        <li>House No : {ViewData?.basic_info?.houser_no}</li>
                        <li>Building Name : {ViewData?.basic_info?.building_name}</li>
                        <li>Kebele : {ViewData?.basic_info.kebele}</li>
                        <li>Woreda : {ViewData?.basic_info?.woreda}</li>
                        <li>Phone Number : {ViewData?.basic_info?.phone_number}</li>
                        <li>Mobile Number : {ViewData?.basic_info?.mobile_number}</li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} className="view_product">
                        <div>Insured's Personal Identification Details</div>
                        <ul>
                        <li>Identification Type : {ViewData.personal_identification_details.identification_type}</li>
                        <li>Id Card Number : {ViewData.personal_identification_details.id_card_number}</li>
                        <li>Issued By : {ViewData.personal_identification_details.id_issue_by}</li>
                        <li>Issued Date : {moment(ViewData.personal_identification_details.id_issue_date).format("DD-MM-YYYY")}</li>
                        <li>Expiry Date : {moment(ViewData.personal_identification_details.id_expiry_date).format("DD-MM-YYYY")}</li>
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
                        </ul>)}
                        
                    </Grid>:null}
                    {ViewData?.paytype==="Offline"&&
                    <>
                    <Grid item xs={12} md={4} lg={4} className="view_product">
                    <div>Payment Details</div>
                        {ViewData?.paydetails?.map((data)=>
                        <ul>
                              <li>Amount : {data.amount}</li>
                              <li>Branch Name : {data.bankname}</li>
                              <li>Branch : {data.branch}</li>
                        </ul>
                      )}
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} className="view_product">
                    <div>Reference Number</div>
                    <div>{ViewData?.refno}</div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} className="view_product">
                    <div>Image</div>
                    <div><img src={"http://161.97.72.249:3001/uploads/" + ViewData?.pay_attachment} style={{width:"300px",height:"100%"}}/></div>
                    </Grid>
                    </>
}
                     </>:ViewData?.product_name==="Travel Insurance"?
                     <>
                     <Grid item xs={12} md={6} lg={6} className="view_product">
                        <div>Basic Info Details</div>
                        <ul>
                        <li>Proposer Name : {ViewData.basic_info.insured_name}</li>
                        <li>Father Name : {ViewData.basic_info.father_name}</li>
                        <li>GrantFather's Name : {ViewData.basic_info.grand_father_name}</li>
                        <li>House No : {ViewData.basic_info.houser_no}</li>
                        <li>Building Name : {ViewData.basic_info.building_name}</li>
                        <li>Kebele : {ViewData.basic_info.kebele}</li>
                        <li>Woreda : {ViewData.basic_info.woreda}</li>
                        <li>Phone Number : {ViewData.basic_info.phone_number}</li>
                        <li>Mobile Number : {ViewData.basic_info.mobile_number}</li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} className="view_product">
                        <div>Address(Travelling Country)</div>
                        <ul>
                        <li>Address Line 1 : {ViewData.travelling_country.address1}</li>
                        <li>Address Line 2 : {ViewData.travelling_country.address2}</li>
                        <li>Address Line 3 : {ViewData.travelling_country.address3}</li>
                        <li>Phone Number : {ViewData.travelling_country.tphone_number}</li>
                        <li>Mobile Number : {ViewData.travelling_country.tmobile_number}</li>
                        <li>Passport Number : {ViewData.travelling_country.tmobile_number}</li>
                        <li>Place of Issue : {ViewData.travelling_country.place_of_issue}</li>
                        <li>Date of Issue : {ViewData.travelling_country.date_of_issue}</li>
                        <li>Date of Expiry : {ViewData.travelling_country.date_of_expiry}</li>
                        </ul>
                    </Grid>
                    {ViewData?.nominee?.length>0 ?<Grid item xs={12} md={6} lg={6} className="view_product">
                        <div>Nomminee Details</div>
                        {ViewData.nominee.map((data)=>
                        <ul>
                         <li>Nomminee Name : {data.name}</li>
                        <li>Age/Dob : {data.n_dob}</li>
                        <li>RelationShip : {data.assured}</li>
                        <li>Percentage : {data.percent}</li>
                        <li>Mobile No : {data.mobile}</li>
                        </ul>
                        )}
                    </Grid>:null}
                    {ViewData?.paytype==="Offline"&&
                    <>
                    <Grid item xs={12} md={4} lg={4} className="view_product">
                    <div>Payment Details</div>
                        {ViewData?.paydetails?.map((data)=>
                        <ul>
                              <li>Amount : {data.amount}</li>
                              <li>Branch Name : {data.bankname}</li>
                              <li>Branch : {data.branch}</li>
                        </ul>
                      )}
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} className="view_product">
                    <div>Reference Number</div>
                    <div>{ViewData?.refno}</div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} className="view_product">
                    <div>Image</div>
                    <div><img src={"http://161.97.72.249:3001/uploads/" + ViewData?.pay_attachment} style={{width:"300px",height:"100%"}}/></div>
                    </Grid>
                    </>}
                     </>:
                     <>
                   
                    <Grid item xs={12} md={4} lg={4} className="view_product">
                        <div>Basic Info Details</div>
                        <ul>
                        <li>Proposer Name : {ViewData?.basic_info?.proposer_name}</li>
                        <li>Father Name : {ViewData?.basic_info?.father_name}</li>
                        <li>GrantFather's Name : {ViewData?.basic_info?.grand_father_name}</li>
                        <li>House No : {ViewData?.basic_info?.houser_no}</li>
                        <li>Building Name : {ViewData?.basic_info?.building_name}</li>
                        <li>Kebele : {ViewData?.basic_info?.kebele}</li>
                        <li>Woreda : {ViewData?.basic_info?.woreda}</li>
                        <li>Phone Number : {ViewData?.basic_info?.phone_number}</li>
                        <li>Mobile Number : {ViewData?.basic_info?.mobile_number}</li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4} className="view_product">
                        <div>Life Assured Details</div>
                        <ul>
                        <li>Assured Name : {ViewData?.life_assured_details?.life_assured_name}</li>
                        <li>Father Name : {ViewData?.life_assured_details?.lfather_name}</li>
                        <li>GrantFather's Name : {ViewData?.life_assured_details?.lgrand_father_name}</li>
                        <li>Age/Dob : {ViewData?.life_assured_details?.lage_dob}</li>
                        <li>Sum Assured : {ViewData?.life_assured_details?.lsum_assured}</li>
                        <li>Policy Period : {ViewData?.life_assured_details?.lpolicy_period}</li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4} className="view_product">
                        <div>Address Details</div>
                        <ul>
                        <li>House No : {ViewData?.address?.ahouser_no}</li>
                        <li>Building Name : {ViewData?.address?.abuilding_name}</li>
                        <li>Kebele : {ViewData?.address?.akebele}</li>
                        <li>Woreda : {ViewData?.address?.aworeda}</li>
                        <li>Phone Number : {ViewData?.address?.aphone_number}</li>
                        <li>Mobile Number : {ViewData?.address?.amobile_number}</li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4} className="view_product">
                        <div>Personal Identification Details</div>
                        <ul>
                        <li>Identification Type : {ViewData?.personal_identification_details?.identification_type}</li>
                        <li>Id Card Number : {ViewData?.personal_identification_details?.id_card_number}</li>
                        <li>Issued By : {ViewData?.personal_identification_details?.id_issue_by}</li>
                        <li>Issued Date : {moment(ViewData?.personal_identification_details?.id_issue_date).format("DD-MM-YYYY")}</li>
                        <li>Expiry Date : {moment(ViewData?.personal_identification_details?.id_expiry_date).format("DD-MM-YYYY")}</li>
                        </ul>
                    </Grid>
                    {ViewData?.nominee?.length>0 ? <Grid item xs={12} md={4} lg={4} className="view_product">
                        <div>Nomminee Details</div>
                        { ViewData?.nominee?.map((data)=>
                        <ul>
                         <li>Nomminee Name : {data.name}</li>
                        <li>Age/Dob : {data.n_dob}</li>
                        <li>RelationShip : {data.assured}</li>
                        <li>Percentage : {data.percent}</li>
                        <li>Mobile No : {data.mobile}</li>
                        </ul>
                        )}
                    </Grid>:null}
                    
                    {ViewData?.question?.length>0?<Grid item xs={12} md={4} lg={4} className="view_product">
                        <div>Medical History</div>
                        {ViewData.questions.map((data)=>
                        <ul>
                           <li>{data.answer} : {data.question}</li>
                        </ul>
                        )}
                    </Grid>:null}
                    <Grid item xs={12} md={4} lg={4} className="view_product">
                    <div>Additional Check</div>
                      <ul>
                       <li>{ViewData?.additional_cover}</li>
                     </ul>
                     </Grid>
                     {ViewData?.paytype==="Offline"&&
                    <>
                    <Grid item xs={12} md={4} lg={4} className="view_product">
                    <div>Payment Details</div>
                        {ViewData?.paydetails?.map((data)=>
                        <ul>
                              <li>Amount : {data.amount}</li>
                              <li>Branch Name : {data.bankname}</li>
                              <li>Branch : {data.branch}</li>
                        </ul>
                      )}
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} className="view_product">
                    <div>Reference Number</div>
                    <div>{ViewData?.refno}</div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} className="view_product">
                    <div>Image</div>
                    <div><img src={"http://161.97.72.249:3001/uploads/" + ViewData?.pay_attachment} style={{width:"300px",height:"100%"}}/></div>
                    </Grid>
                     </>}
                    </>

                   }
               </Grid>     
        </div>
    )
}