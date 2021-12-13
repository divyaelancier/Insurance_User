import React from 'react'
export default function ViewClaimes(props){
    const ViewData=props.ViewData
    console.log("viewData",ViewData)
    const LoginData=JSON.parse(localStorage.getItem("data"))
    return(
        <div>
            { ViewData.policy_name==="Motor Insurance" || ViewData.policy_name==="Travel Insurance"?
            <>
                    {LoginData?.role==="agent"&&<div className="view_product">
                        <div>Customer Name</div><p>{ViewData.acustomer}</p> 
                    </div>
                    }
                    <div className="view_product"> <div>Product Name</div><p>{ViewData.policy_name}</p></div>
                    {ViewData.policy_name==="Motor Insurance" && <div className="view_product"> <div>Vechicle Number</div><p>{ViewData.vechicle_numer}</p></div>}

                    <div className="view_product"> <div>Risk</div><p>{ViewData.risk}</p></div>
                    <div className="view_product"> <div>Risk Item</div><p>{ViewData.risk_item}</p></div>
 
                    <div className="view_product"> <div>Place of Accident</div><p>{ViewData.place_of_accident}</p></div>
                    <div className="view_product"> <div>Date of Incident</div><p>{ViewData.incident_date}</p></div>
                    <div className="view_product"> <div>Date of Report Incident</div><p>{ViewData.report_of_incident_date}</p></div>
                    <div className="view_product"> <div>Time of Report Incident</div><p>{ViewData.report_of_incident_time}</p></div>

                    <div className="view_product"> <div>Incident Reported by</div><p>{ViewData.incident_reported_by}</p></div>
                    <div className="view_product"> <div>Report Received by</div><p>{ViewData.report_received_by}</p></div>
                    <div className="view_product"> <div>Mode of Report of the incident</div><p>{ViewData.mode_of_report}</p></div>
                    <div className="view_product"> <div>Nature of Loss / Cause of Loss</div><p>{ViewData.nature_of_loss}</p></div>

                    <div className="view_product"> <div>Proximate Cause of loss / Nature of Illness</div><p>{ViewData.proximate_cause_of_loss}</p></div>
                    <div className="view_product"> <div>Estimated Loss</div><p>{ViewData.estimated_loss}</p></div>
                    <div className="view_product"> <div>Brief Description of the Accident at Reporting Time</div><p>{ViewData.brief_description}</p></div>
                    <div className="view_product"> <div>Basic Peril Type</div><p>{ViewData.basic_peril_type}</p></div>
                    <div className="view_product"> <div>Basic Peril Name</div><p>{ViewData.peril_name}</p></div>
                    <div className="view_product"> <div>Beneficiary</div><p>{ViewData.beneficiary}</p></div>
                     <div style={{fontSize:"15px",fontWeight:"600"}}>Image</div>
                      <img src={"http://161.97.72.249:3001/uploads/" + ViewData?.files} style={{width:"300px",height:"100%"}}/>
                      </>:
                      <>
                       {LoginData?.role==="agent"&&<div className="view_product">
                        <div>Customer Name</div><p>{ViewData.acustomer}</p> 
                    </div>
                    }
                        <div className="view_product">
                        <div>Policy Number</div><p>{ViewData.policy_no}</p> 
                    </div>
                    <div className="view_product"> <div>Product Name</div><p>{ViewData.policy_name}</p></div>
                    <div className="view_product"> <div>Life Assured Name</div><p>{ViewData.life_assured_name}</p></div>
                    <div className="view_product"> <div>Notification Date / Time </div><p>{ViewData.notification_date_time}</p></div>
                    <div className="view_product"> <div>Claimant Type</div><p>{ViewData.claimant_type || "---"}</p></div>
                    <div className="view_product"> <div>Peril Name</div><p>{ViewData.peril_name}</p></div>
                    {/* <div className="view_product"> <div>Estimated Claim Amount</div><p>{ViewData.policy_name}</p></div> */}
                      <div style={{fontSize:"15px",fontWeight:"600"}}>Image</div>
                      <img src={"http://161.97.72.249:3001/uploads/" + ViewData?.files} style={{width:"300px",height:"100%"}}/>
                      </>
}

                   


        </div>
    )
}