import React from 'react'
import Grid from "@material-ui/core/Grid";
import CustomButton from '../../Components/Butttons/button'
import Cardbody from '../../Components/Card/CardWrapper'
import Blood from '../../Images/blood.png'
import lipid from '../../Images/lipid.png'
import routine from '../../Images/routine.png'
import kidney from '../../Images/kidney.png'
import fasting from '../../Images/fasting.png'
import liver from '../../Images/liver.png'
import hiv from '../../Images/hiv.png'
import { Link,useHistory } from 'react-router-dom' 
export default function MedicalTest(props){
     console.log("props",props)
     let history=useHistory()
     const Submit=()=>{
          history.push({
               pathname:"/Review",
               state:{
                    State:props.location.state,
                    Details:props.location.Props
               }
          })
     }
    return(
        <div className="medi_tst_parent">
              <Grid container xs={12} spacing={3}> 
                   <Grid item md={12} xs={12} lg={12} >
                     <Cardbody Customcardcss="medical_basic_tet" variant>
                         <div>Medical Examination Required</div>
                         <div><div>The following medical tests are to be taken</div></div>
                         <Grid container spacing={2}> 
                          <Grid item md={4} xs={12} lg={4} className="_tet_div">
                              <img src={Blood}/>
                              <div>Complete blood count.</div> 
                         </Grid>

                         <Grid item md={4} xs={12} lg={4} className="_tet_div">
                              <img src={lipid}/>
                              <div>Lipid Profile.</div> 
                         </Grid>

                         <Grid item md={4} xs={12} lg={4} className="_tet_div">
                              <img src={routine}/>
                              <div>Routine Urine test.</div> 
                         </Grid>

                         <Grid item md={4} xs={12} lg={4} className="_tet_div">
                              <img src={kidney}/>
                              <div>Kidney function test.</div> 
                         </Grid>

                         <Grid item md={4} xs={12} lg={4} className="_tet_div">
                              <img src={fasting}/>
                              <div>Fasting Plasma Glucose.</div> 
                         </Grid>
                         <Grid item md={4} xs={12} lg={4} className="_tet_div"></Grid>
                         <Grid item md={4} xs={12} lg={4} className="_tet_div">
                              <img src={liver}/>
                              <div>Liver function test.</div> 
                         </Grid>

                         <Grid item md={4} xs={12} lg={4} className="_tet_div">
                              <img src={hiv}/>
                              <div>HIV.</div> 
                         </Grid>

                         <Grid item md={12} xs={12} lg={12} className="_tet_para">
                            <div>You will receive an email with appointment in a medical center to take up these tests</div>
                         </Grid>

                         <Grid item md={12} xs={12} lg={12} className="_tet_div_btn" style={{textAlign:"center"}}>
                            <div className="custm_quote" >
                                 {/* <CustomButton btnName="Next"/> */}
                                 <a  class="next" onClick={Submit}>Next &raquo;</a>
                                 </div>
                    
                         </Grid>

                         </Grid>
                     </Cardbody>    
                   </Grid>
              </Grid>
        </div>
    )
}