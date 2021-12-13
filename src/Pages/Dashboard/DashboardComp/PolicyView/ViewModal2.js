import React from 'react'
import Grid from '@material-ui/core/Grid';
import moment from 'moment'
export default function ViewModal2(props){
    console.log("props",props)
    const ViewData=props.ViewData
    return(
        <div>
              <Grid container spacing={3}>
                    <Grid item xs={12} md={4} lg={4} className="view_product">
                        <div>Basic Info Details</div>
                        <ul>
                        <li>Proposer Name : {ViewData.basic_info.proposer_name}</li>
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
                    <Grid item xs={12} md={4} lg={4} className="view_product">
                        <div>Life Assured Details</div>
                        <ul>
                        <li>Assured Name : {ViewData.life_assured_details.life_assured_name}</li>
                        <li>Father Name : {ViewData.life_assured_details.lfather_name}</li>
                        <li>GrantFather's Name : {ViewData.life_assured_details.lgrand_father_name}</li>
                        <li>Age/Dob : {ViewData.life_assured_details.lage_dob}</li>
                        <li>Sum Assured : {ViewData.life_assured_details.lsum_assured}</li>
                        <li>Policy Period : {ViewData.life_assured_details.lpolicy_period}</li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4} className="view_product">
                        <div>Address Details</div>
                        <ul>
                        <li>House No : {ViewData.address.ahouser_no}</li>
                        <li>Building Name : {ViewData.address.abuilding_name}</li>
                        <li>Kebele : {ViewData.address.akebele}</li>
                        <li>Woreda : {ViewData.address.aworeda}</li>
                        <li>Phone Number : {ViewData.address.aphone_number}</li>
                        <li>Mobile Number : {ViewData.address.amobile_number}</li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4} className="view_product">
                        <div>Personal Identification Details</div>
                        <ul>
                        <li>Identification Type : {ViewData.personal_identification_details.identification_type}</li>
                        <li>Id Card Number : {ViewData.personal_identification_details.id_card_number}</li>
                        <li>Issued By : {ViewData.personal_identification_details.id_issue_by}</li>
                        <li>Issued Date : {moment(ViewData.personal_identification_details.id_issue_date).format("DD-MM-YYYY")}</li>
                        <li>Expiry Date : {moment(ViewData.personal_identification_details.id_expiry_date).format("DD-MM-YYYY")}</li>
                        </ul>
                    </Grid>
                    {ViewData?.nominee?.length>0 ? <Grid item xs={12} md={4} lg={4} className="view_product">
                        <div>Nomminee Details</div>
                   
                        <> 
                        {ViewData?.nominee?.map((data)=>
                        <ul>
                         <li>Nomminee Name : {data.name}</li>
                        <li>Age/Dob : {data.dob}</li>
                        <li>RelationShip : {data.assured}</li>
                        <li>Percentage : {data.percent}</li>
                        <li>Mobile No : {data.mobile}</li>
                        </ul>
                        )}
                                 </>
                        
                    </Grid>:null}
                    
                    <Grid item xs={12} md={4} lg={4} className="view_product">
                        <div>Medical History</div>
                        {ViewData?.questions?.length>0?
                        <>
                        {ViewData.questions.map((data)=>
                        <ul>
                        <li>{data.answer} : {data.question}</li>
                        </ul>
                        )}
                        </>:null}
                    </Grid>
               </Grid>     
        </div>
    )
}