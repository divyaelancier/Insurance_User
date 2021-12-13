import React,{useState,useEffect} from 'react'
import Labelbox from '../../../Components/labelbox/labelbox'
import Grid from "@material-ui/core/Grid";
import EnhancedTable from '../../../Components/Table/Table'
import ValidationLibrary from '../../../Components/validationfunction'
import { useDispatch } from 'react-redux'
import { User_Life_Policy,Motor_Policy,Travel_Policy } from '../../../redux/actions/DashboardActions'
import { Get_Products,CommonUpload } from '../../../redux/actions/AllAction'
import { MYClaimes_GetApi,Update_Myclaimes } from '../../../redux/actions/DashboardActions'
import DynModel from '../../../Components/Model/model'
import { connect } from 'react-redux'
import moment from 'moment'
 function NonLifeClaimes(props){
   const [TableData,setTableData]=useState([])
   const[ProductList,setProductList]=useState([])
   const [UploadFiles,setUploadFiles]=useState()
   const [ViewData,setViewData]=useState([])
   const [EditData,setEditData]=useState()
   const [Modalopen,setModalopen]=useState(false)
   const [uploadError,setuploadError]=useState("")
   const [VechicleData,setVechicleData]=useState([])
   const [ParticularViewData,setParticularViewData]=useState()
   const LoginData=JSON.parse(localStorage.getItem("data"))
   let dispatch=useDispatch()
   const header = [
    { id: 'type', label: 'Policy Type' },
    { id: 'name', label: 'Policy Name' },
    { id: 'number', label: 'Policy Number' },
    { id: 'status', label: 'Status' },
    { id: '', label: 'Action' },
   ]
   const FileOnchange=(e)=>{
    dispatch(CommonUpload(e.target.files[0])).then((res)=>{
       setuploadError("")
       setUploadFiles(res.payload[0].filename) 
    })
  }   
   const [MyPolicyState,setMyPolicyState]=useState({
    customers:{value: "", validation: [],  error: null, errmsg: null},
    policy_name:{value: "", validation: [{ name: "required"}],  error: null, errmsg: null},
    risk:{value: "", validation: [{ name: "required"}],  error: null, errmsg: null},
    risk_item:{value: "", validation: [{ name: "required"}],  error: null, errmsg: null},
    place_of_accient:{value: "", validation: [{ name: "required"}],  error: null, errmsg: null},
    // place_of_accient:{value: "", validation: [{ name: "required"}],  error: null, errmsg: null},
    date_of_incident:{value: "", validation: [{ name: "required"}],  error: null, errmsg: null},
    time_of_accient:{value: "", validation: [{ name: "required"}],  error: null, errmsg: null},
    date_reportof_incident:{value: "", validation: [{ name: "required"}],  error: null, errmsg: null},
    time_reportof_accient:{value: "", validation: [{ name: "required"}],  error: null, errmsg: null},
    incident_report_by:{value: "", validation: [{ name: "required"}],  error: null, errmsg: null},
    report_received_by:{value: "", validation: [{ name: "required"}],  error: null, errmsg: null},
    mode_of_report:{value: "", validation: [{ name: "required"}],  error: null, errmsg: null},
    nature_of_loss:{value: "", validation: [{ name: "required"}],  error: null, errmsg: null},
    proximate_loss:{value: "", validation: [{ name: "required"}],  error: null, errmsg: null},
    estimated_loss:{value: "", validation: [{ name: "required"}],  error: null, errmsg: null},
    brief_description:{value: "", validation: [{ name: "required"}],  error: null, errmsg: null},
    peril_type:{value: "", validation: [{ name: "required"}],  error: null, errmsg: null},
    peril_name:{value: "", validation: [{ name: "required"}],  error: null, errmsg: null},
    beneficiary :{value: "", validation: [{ name: "required"}],  error: null, errmsg: null},
    v_number :{value: "", validation: [{ name: "required"}],  error: null, errmsg: null},
     })
    function checkValidation(data, key) {
     if(props.Product[0]?.product_name==="Travel Insurance"){
          MyPolicyState.v_number.validation=[]
          MyPolicyState.v_number.error=false
     }
     var errorcheck = ValidationLibrary.checkValidation(
         data,
         MyPolicyState[key].validation
     );
     let dynObj = {
         value: data,
         error: !errorcheck.state,
         errmsg: errorcheck.msg,
         validation: MyPolicyState[key].validation,
     };
     setMyPolicyState((prevState) => ({
         ...prevState,
         [key]: dynObj,
     }));
 }
  
 const Submit=(e)=>{
     e.preventDefault();
     if(UploadFiles===undefined || UploadFiles===""){setuploadError("Please Upload Image")}
     var mainvalue = {};
 var targetkeys = Object.keys(MyPolicyState);
 for (var i in targetkeys) {
     var errorcheck = ValidationLibrary.checkValidation(
        MyPolicyState[targetkeys[i]].value,
        MyPolicyState[targetkeys[i]].validation
     );
     MyPolicyState[targetkeys[i]].error = !errorcheck.state;
     MyPolicyState[targetkeys[i]].errmsg = errorcheck.msg;
     mainvalue[targetkeys[i]] = MyPolicyState[targetkeys[i]].value;
 }
 var filtererr = targetkeys.filter((obj) => MyPolicyState[obj].error == true);
 if(filtererr.length>0 || UploadFiles===undefined){
     
 }else{
      const PolicyNo=props.Product.length>0?props.Product[0]?.policy_no:props.EditData
      dispatch(Update_Myclaimes(MyPolicyState,UploadFiles,PolicyNo,props.EditData?.id,LoginData?.role)).then(()=>{
        HandleCancel()
        setuploadError("")
      })
 }
 setMyPolicyState(prevState =>({
     ...prevState,
   }))  
 }

 useEffect(()=>{
  dispatch(MYClaimes_GetApi())
 },[])
useEffect(()=>{
  let Data=[]
  let Claimes=[]
  let viewdata=[]
  props.Product_list.map((data)=>{
     Data.push({id:data.id,value:data.category_title})
  })
  setProductList(Data)
  props.MyClaimes_Data.map((data)=>{
    viewdata.push(data)
    Claimes.push({type:data.policy,name:data.policy_name,number:data.policy_no,status:data.status==1?"Active":"In-Active",id:data.id,row:data})
 })
 setTableData(Claimes)
 setViewData(viewdata)

},[props.Product_list,props.MyClaimes_Data])
const HandleCancel=()=>{
  let Key=Object.keys(MyPolicyState)
  Key.map((data)=>{
    MyPolicyState[data].value=""
  })
  setMyPolicyState(prevState =>({
     ...prevState,
   }))  
}
const [ReportIncient,setReportIncient]=useState([{id:1,value:"E-Mail "},{id:2,value:"Fax"},{id:3,value:"In Person"},{id:4,value:"Letter"},{id:5,value:"Phone Message"}])
const [NatureofLoss,setNatureofLoss]=useState([])
const [Proximate,setProximate]=useState()
const [PerilType ,setPerilType]=useState()
const [PerilName,setPerilName]=useState()
useEffect(()=>{
 if(props.Product[0]?.product_name=="Motor Insurance" || props.Product[0]?.product_name!="Travel Insurance"){
    setNatureofLoss([{id:1,value:"Fire"},{id:2,value:"Motor - Collision"},{id:3,value:"Motor Cause of loss "},{id:4,value:"Others "},
    {id:5,value:"Overturning "}, {id:6,value:"Passenger Injury-death"}, {id:7,value:"Pedestrian Injury-death"},
    {id:8,value:"Theft"},{id:9,value:"Wind Shield"},{id:10,value:"Over turning"},{id:11,value:"Self Ignition"},{id:12,value:"Steering wheel failure"},
{id:13,value:"Swivel table failure"},{id:14,value:"Theft"},{id:15,value:"Tyre damage"},{id:16,value:"Tyre flattening"},{id:17,value:"Windshield"}]) 
    setProximate([{id:1,value:"Animal "},{id:2,value:"Break failure"},{id:3,value:"Collision"},{id:4,value:"Distance"},
    {id:5,value:"Drawbar separation"}, {id:6,value:"Eyebolt "}, {id:7,value:"Malicious Damage "},
    {id:8,value:"Others"},{id:9,value:"Over turning"},{id:10,value:"Road condition"}])
    setPerilType([{id:1,value:"Grouped Perils"},{id:2,value:"Perils"}])
    setPerilName([{id:1,value:"Property Damage"},{id:2,value:"Death or Bodily Injury"},{id:3,value:"Number of Passengers"}]) 
 }else{
    setNatureofLoss([{id:1,value:"Insured perils"}])
    setProximate([{id:1,value:"Accident resulting from external, violent means"}])
    setPerilType([{id:1,value:"Perils"}])
    setPerilName([{id:1,value:"Accident Peril"}])
 }
 props?.Product.map((data)=>{
 MyPolicyState.policy_name.value=data?.product_name
//  MyPolicyState.customers.value=Editdata?.acustomer || ""
MyPolicyState.customers.value=data?.basic_info.insured_name ||""
 setMyPolicyState(prevState =>({
     ...prevState,
  })) 
})
var Vechicle_No=[]
props.Product.length>0 && props.Product[0]?.vehicle_details?.filter((data,index)=>{
     Vechicle_No.push({id:index+1,value:data.platenumber})
})
setVechicleData(Vechicle_No)
},[props.Product])
useEffect(()=>{
     if(props.EditData){
     const Editdata=props.EditData
     MyPolicyState.customers.value=Editdata?.acustomer || ""
     MyPolicyState.policy_name.value=Editdata?.policy_name || ""
     MyPolicyState.risk.value=Editdata?.risk || ""
     MyPolicyState.risk_item.value=Editdata?.risk_item || ""
     MyPolicyState.place_of_accient.value=Editdata?.place_of_accident || ""
     MyPolicyState.date_of_incident.value=moment(Editdata?.incident_date).format("YYYY-MM-DD") || ""
     MyPolicyState.time_of_accient.value=moment(Editdata?.incident_time).format("HH:MM A") || ""
     MyPolicyState.date_reportof_incident.value=moment(Editdata?.report_of_incident_date).format("YYYY-MM-DD") || ""
     MyPolicyState.time_reportof_accient.value=moment(Editdata?.report_of_incident_time).format("HH:MM A") || ""
     MyPolicyState.incident_report_by.value=Editdata?.incident_reported_by || ""
     MyPolicyState.report_received_by.value=Editdata?.report_received_by ||""
     MyPolicyState.mode_of_report.value=Editdata?.mode_of_report || ""
     MyPolicyState.nature_of_loss.value=Editdata?.nature_of_loss || ""
     MyPolicyState.proximate_loss.value=Editdata?.proximate_cause_of_loss || ""
     MyPolicyState.estimated_loss.value=Editdata?.estimated_loss || ""
     MyPolicyState.peril_type.value=Editdata?.basic_peril_type ||  ""
     MyPolicyState.peril_name.value=Editdata?.peril_name || ""
     MyPolicyState.beneficiary.value=Editdata?.beneficiary || ""
     MyPolicyState.brief_description.value=Editdata?.brief_description || ""
     setUploadFiles(Editdata?.files)
     setMyPolicyState(prevState =>({
          ...prevState,
       })) 
     }
},[props.EditData])
    return(
        <>
                  {console.log(MyPolicyState,"MyPolicyState")}
                  {LoginData?.role==="agent" &&   
                   <Grid item md={3} xs={12} lg={3}>
                        <Labelbox type="text" labelname="Customer Name"
                         changeData={(data) =>checkValidation(data, "customers")}
                         value={MyPolicyState.customers.value}
                         error={MyPolicyState.customers.error}
                         errmsg={MyPolicyState.customers.errmsg}
                         disabled={true}
                        />
                   </Grid>
                     }
                    
                   <Grid item md={3} xs={12} lg={3}>
                        <Labelbox type="text" labelname="Product Name"
                         changeData={(data) =>checkValidation(data, "policy_name")}
                         value={MyPolicyState.policy_name.value}
                         error={MyPolicyState.policy_name.error}
                         errmsg={MyPolicyState.policy_name.errmsg}
                         disabled={true}
                        />
                   </Grid>

                   {props.Product[0]?.product_name=="Motor Insurance" && <Grid item md={3} xs={12} lg={3}>
                        <Labelbox type="select" labelname="Vechicle Number"
                         changeData={(data) =>checkValidation(data, "v_number")}
                         value={MyPolicyState.v_number.value}
                         error={MyPolicyState.v_number.error}
                         errmsg={MyPolicyState.v_number.errmsg}
                         // disabled={true}
                         dropdown={VechicleData}
                        />
                   </Grid>}

                   <Grid item md={3} xs={12} lg={3}>
                        <Labelbox type="text" labelname="Risk"
                         changeData={(data) =>checkValidation(data, "risk")}
                         value={MyPolicyState.risk.value}
                         error={MyPolicyState.risk.error}
                         errmsg={MyPolicyState.risk.errmsg}
                        />
                   </Grid>

                

                   <Grid item md={3} xs={12} lg={3}>
                        <Labelbox type="text" labelname="Risk Item"
                         changeData={(data) =>checkValidation(data, "risk_item")}
                         value={MyPolicyState.risk_item.value}
                         error={MyPolicyState.risk_item.error}
                         errmsg={MyPolicyState.risk_item.errmsg}
                         // dropdown={[{id:1,value:"Life Assured - Death Claim Due to Accident"},{id:2,value:"Life Assured - Natural Death Claim"},{id:3,value:"Medical Expense due to Accident"},
                         // {id:4,value:"Partial Total Disability "},{id:5,value:"Temporary Partial Disability"},{id:6,value:"Temporary Total Disability"}
                         // ]}
                        />
                   </Grid>
                   <Grid item md={3} xs={12} lg={3}>
                        <Labelbox type="text" labelname="Place of Accident"
                         changeData={(data) =>checkValidation(data, "place_of_accient")}
                         value={MyPolicyState.place_of_accient.value}
                         error={MyPolicyState.place_of_accient.error}
                         errmsg={MyPolicyState.place_of_accient.errmsg}
                        />
                   </Grid>

                   <Grid item md={3} xs={12} lg={3}>
                        <Labelbox type="datepicker" labelname="Date of Incident"
                         changeData={(data) =>checkValidation(data, "date_of_incident")}
                         value={MyPolicyState.date_of_incident.value}
                         error={MyPolicyState.date_of_incident.error}
                         errmsg={MyPolicyState.date_of_incident.errmsg}
                         dropdown={[{id:1,value:"Basic Perils"},{id:2,value:"Comprehensive Accident Insurance (CAI)"},{id:3,value:"Supplementary Accident Insurance (SAI)"},
                         {id:4,value:"Waiver of Premium (WP)"}
                         ]}
                        />
                   </Grid>

                   <Grid item md={3} xs={12} lg={3}>
                        <Labelbox type="timepicker" labelname="Time of Incident"
                         changeData={(data) =>checkValidation(data, "time_of_accient")}
                         value={MyPolicyState.time_of_accient.value}
                         error={MyPolicyState.time_of_accient.error}
                         errmsg={MyPolicyState.time_of_accient.errmsg}
                        />
                   </Grid>
                   
                   <Grid item md={3} xs={12} lg={3}>
                        <Labelbox type="datepicker" labelname="Date of Report Incident"
                         changeData={(data) =>checkValidation(data, "date_reportof_incident")}
                         value={MyPolicyState.date_reportof_incident.value}
                         error={MyPolicyState.date_reportof_incident.error}
                         errmsg={MyPolicyState.date_reportof_incident.errmsg}
                        />
                   </Grid>
                   <Grid item md={3} xs={12} lg={3}>
                        <Labelbox type="timepicker" labelname="Time of Report Incident"
                         changeData={(data) =>checkValidation(data, "time_reportof_accient")}
                         value={MyPolicyState.time_reportof_accient.value}
                         error={MyPolicyState.time_reportof_accient.error}
                         errmsg={MyPolicyState.time_reportof_accient.errmsg}
                        />
                   </Grid>
                   <Grid item md={3} xs={12} lg={3}>
                        <Labelbox type="text" labelname="Incident Reported by"
                         changeData={(data) =>checkValidation(data, "incident_report_by")}
                         value={MyPolicyState.incident_report_by.value}
                         error={MyPolicyState.incident_report_by.error}
                         errmsg={MyPolicyState.incident_report_by.errmsg}
                        />
                   </Grid>
                   <Grid item md={3} xs={12} lg={3}>
                        <Labelbox type="text" labelname="Report Received by"
                         changeData={(data) =>checkValidation(data, "report_received_by")}
                         value={MyPolicyState.report_received_by.value}
                         error={MyPolicyState.report_received_by.error}
                         errmsg={MyPolicyState.report_received_by.errmsg}
                        />
                   </Grid>
                   <Grid item md={3} xs={12} lg={3}>
                        <Labelbox type="select" labelname="Mode of Report of the incident"
                         changeData={(data) =>checkValidation(data, "mode_of_report")}
                         value={MyPolicyState.mode_of_report.value}
                         error={MyPolicyState.mode_of_report.error}
                         errmsg={MyPolicyState.mode_of_report.errmsg}
                         dropdown={ReportIncient}

                        />
                   </Grid>
                   <Grid item md={3} xs={12} lg={3}>
                        <Labelbox type="select" labelname="Nature of Loss / Cause of Loss"
                         changeData={(data) =>checkValidation(data, "nature_of_loss")}
                         value={MyPolicyState.nature_of_loss.value}
                         error={MyPolicyState.nature_of_loss.error}
                         errmsg={MyPolicyState.nature_of_loss.errmsg}
                         dropdown={NatureofLoss}
                        />
                   </Grid>
                   <Grid item md={3} xs={12} lg={3}>
                        <Labelbox type="select" labelname="Proximate Cause of loss / Nature of Illness"
                         changeData={(data) =>checkValidation(data, "proximate_loss")}
                         value={MyPolicyState.proximate_loss.value}
                         error={MyPolicyState.proximate_loss.error}
                         errmsg={MyPolicyState.proximate_loss.errmsg}
                         dropdown={Proximate}
                        />
                   </Grid>
                   <Grid item md={3} xs={12} lg={3}>
                        <Labelbox type="text" labelname="Estimated Loss "
                         changeData={(data) =>checkValidation(data, "estimated_loss")}
                         value={MyPolicyState.estimated_loss.value}
                         error={MyPolicyState.estimated_loss.error}
                         errmsg={MyPolicyState.estimated_loss.errmsg}
                        />
                   </Grid>
                   <Grid item md={3} xs={12} lg={3}>
                        <Labelbox type="select" labelname="Basic Peril Type"
                         changeData={(data) =>checkValidation(data, "peril_type")}
                         value={MyPolicyState.peril_type.value}
                         error={MyPolicyState.peril_type.error}
                         errmsg={MyPolicyState.peril_type.errmsg}
                         dropdown={PerilType}
                        />
                   </Grid>
                   {props.Product[0]?.product_name=="Motor Insurance" && MyPolicyState.peril_type.value==="Grouped Perils" ||props.EditData?.product_name=="Motor Insurance" && MyPolicyState.peril_type.value==="Grouped Perils" || props.Product[0]?.product_name=="Travel Insurance"?<Grid item md={3} xs={12} lg={3}>
                        <Labelbox type="select" labelname="Basic Peril Name"
                         changeData={(data) =>checkValidation(data, "peril_name")}
                         value={MyPolicyState.peril_name.value}
                         error={MyPolicyState.peril_name.error}
                         errmsg={MyPolicyState.peril_name.errmsg}
                         dropdown={PerilName}
                        />
                   </Grid>:""}
                   <Grid item md={3} xs={12} lg={3}>
                        <Labelbox type="text" labelname="Beneficiary"
                         changeData={(data) =>checkValidation(data, "beneficiary")}
                         value={MyPolicyState.beneficiary.value}
                         error={MyPolicyState.beneficiary.error}
                         errmsg={MyPolicyState.beneficiary.errmsg}
                        />
                   </Grid>
                   <Grid item md={12} xs={12} lg={12} className="text_area_comp">
                     <div>Upload Photo</div>
                   <div style={{marginTop:"6px"}}><input type="file" id="myfile" name="myfile" onChange={(e)=>FileOnchange(e)}/></div>
                   <div style={{color:"red",fontSize:"13px",marginTop:"3px"}}>{uploadError}</div>
                   </Grid>
                   <Grid item md={6} xs={12} lg={6} className="textarea_div_claimes">

                        <Labelbox type="text" labelname="Brief Description of the Accident at Reporting Time"
                         changeData={(data) =>checkValidation(data, "brief_description")}
                         value={MyPolicyState.brief_description.value}
                         error={MyPolicyState.brief_description.error}
                         errmsg={MyPolicyState.brief_description.errmsg}
                        />
                   </Grid>
                   <Grid item md={12} xs={12} lg={12} style={{display:"flex",justifyContent:"flex-end"}}>
                        <div className="submit_css_das">
                        <a onClick={Submit} class="next">Submit</a>
                        <a className="clear_btn" onClick={HandleCancel}>Cancel</a>
                        </div>
                   </Grid>
                
                

         </>
    )
}
const mapStateToProps = (state) =>
({
   PolicyData:state.Reducer.UserPolicy || [],
   Product_list:state.Reducer.Product_list || [],
   MyClaimes_Data:state.Reducer.MyClaimes_Data || []
});
export default connect(mapStateToProps)(NonLifeClaimes);