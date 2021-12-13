import React from 'react'
import Grid from '@material-ui/core/Grid';
export default function TravelViewModal(props){
    const ViewData=props.ViewData
    return(
        <div>
              <Grid container spacing={3}>
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
                        <li>Passport Number : {ViewData.travelling_country.passport_number}</li>
                        <li>Place of Issue : {ViewData.travelling_country.place_of_issue}</li>
                        <li>Date of Issue : {ViewData.travelling_country.date_of_issue}</li>
                        <li>Date of Expiry : {ViewData.travelling_country.date_of_expiry}</li>
                        </ul>
                    </Grid>
                    {ViewData?.nominee?.length>0 ? <Grid item xs={12} md={6} lg={6} className="view_product">
                        <div>Nomminee Details</div>
                        { ViewData.nominee.map((data)=>
                        <ul>
                         <li>Nomminee Name : {data.name}</li>
                        <li>Age/Dob : {data.dob}</li>
                        <li>RelationShip : {data.assured}</li>
                        <li>Percentage : {data.percent}</li>
                        <li>Mobile No : {data.mobile}</li>
                        </ul>
                        )}
                    </Grid>:null}
                    <Grid item xs={12} md={6} lg={6} className="view_product">
                    <div>Payment Details</div>
                        {ViewData?.paydetails?.map((data)=>
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