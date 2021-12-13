import React from 'react'
import Grid from '@material-ui/core/Grid';
export default function Myquotes(props){
    const ViewData=props.ViewData
    console.log("viewdata",ViewData)
    return(
        <div>
              <Grid container spacing={3}>
              {ViewData.product_name==="Motor Insurance"?
                   <>
                    <Grid item xs={12} md={6} lg={6} className="view_product">
                        <div>Plate Number Type</div>
                        <p>{ViewData.plate_number_type}</p> 
                    </Grid>
                      <Grid item xs={12} md={6} lg={6} className="view_product">
                      <div>Purpose</div>
                      <p>{ViewData.purpose}</p> 
                     </Grid>
                     <Grid item xs={12} md={6} lg={6} className="view_product">
                      <div>Vechicle Type</div>
                      <p>{ViewData.vehicle_type}</p> 
                     </Grid>
                     </>
                    : ViewData.product_name==="Travel Insurance"?
                    <>
                     <Grid item xs={12} md={6} lg={6} className="view_product">
                         <div>Traveller Type</div>
                         <p>{ViewData.traveller_type}</p> 
                     </Grid>
                       <Grid item xs={12} md={6} lg={6} className="view_product">
                       <div>Traveller Country</div>
                       <p>{ViewData.travel_country}</p> 
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} className="view_product">
                       <div>No.of Days Travel</div>
                       <p>{ViewData.no_of_days_travel}</p> 
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} className="view_product">
                       <div>Sum Assured</div>
                       <p>{ViewData.sum_assured}</p> 
                      </Grid>
                      </>:
                     
                      <>
                       <Grid item xs={12} md={6} lg={6} className="view_product">
                           <div>Life Assured Type</div>
                           <p>{ViewData.life_assured_type}</p> 
                       </Grid>
                         <Grid item xs={12} md={6} lg={6} className="view_product">
                         <div>Plan Period</div>
                         <p>{ViewData.plan_period}</p> 
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} className="view_product">
                         <div>Age/DOB</div>
                         <p>{ViewData.age_dob}</p> 
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} className="view_product">
                         <div>Sum Assured</div>
                         <p>{ViewData.sum_assured}</p> 
                        </Grid>

                        <Grid item xs={12} md={6} lg={6} className="view_product">
                         <div>Additional Check</div>
                         <p>{ViewData.additional_cover}</p> 
                        </Grid>
                        </>
                      }
                
               </Grid>     
        </div>
    )
}