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
import DownloadIcon from '@mui/icons-material/Download';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Pagination from '../../../Components/Pagination/pagination'
import VisibilityIcon from '@material-ui/icons/Visibility';
import moment from 'moment'
 function LifePolicyClaimes(props){
   const [TableData,setTableData]=useState([])
   const[ProductList,setProductList]=useState([])
   const [UploadFiles,setUploadFiles]=useState()
   const [ViewData,setViewData]=useState([])
   const [EditData,setEditData]=useState()
   const [uploadError,setuploadError]=useState("")
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
  
   const [MyPolicyState,setMyPolicyState]=useState({
    customers:{
        value: "",
        validation: [],
        error: null,
        errmsg: null,
        },
    assured_name:{
       value: "",
       validation: [{ name: "required"}],
       error: null,
       errmsg: null,
     },
    date:{
       value: "",
       validation: [{ name: "required"}],
       error: null,
       errmsg: null,
     },
     claime_type:{
         value: "",
         validation: [{ name: "required"}],
         error: null,
         errmsg: null,
       },
       peril_name:{
         value: "",
         validation: [{ name: "required"}],
         error: null,
         errmsg: null,
       },
       amount:{
        value: "",
        validation: [{ name: "required"}],
        error: null,
        errmsg: null,
      },
      benefit:{
        value: "",
        validation: [{ name: "required"}],
        error: null,
        errmsg: null,
      },
      policy_name:{
        value: "",
        validation: [{ name: "required"}],
        error: null,
        errmsg: null,
      },
     })
    function checkValidation(data, key) {
      if(data&&key==="claime_type"){
        const string=props?.Product[0]?.additional_cover
        console.log("checkkk",props.Product[0]?.additional_cover)
       if(data==="Life Assured - Death Claim Due to Accident" && string.includes("CAI")){MyPolicyState.benefit.value="200% of SA"}
       else if(data=="Life Assured - Death Claim Due to Accident" || data=="Life Assured - Natural Death Claim"){MyPolicyState.benefit.value="100% of SA"}
       else{MyPolicyState.benefit.value="based on Medical board % of SA"}
       MyPolicyState.benefit.error=false
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
 const FileOnchange=(e)=>{
  dispatch(CommonUpload(e.target.files[0])).then((res)=>{
     setuploadError("")
     setUploadFiles(res.payload[0].filename) 
  })
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
 console.log(uploadError,UploadFiles,"uploadError")
 if(filtererr.length>0 || UploadFiles===undefined){
     
 }else{
      dispatch(Update_Myclaimes(MyPolicyState,UploadFiles,props.Product[0]?.policy_no,props.EditData?.id,LoginData?.role)).then(()=>{
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

useEffect(()=>{
       props?.Product.map((data)=>{
        MyPolicyState.customers.value=data.basic_info?.proposer_name ||""
       MyPolicyState.policy_name.value=data.product_name || ""
       MyPolicyState.assured_name.value=data.life_assured_details?.life_assured_name || ""
       MyPolicyState.amount.value=data?.premium || "0"
       setMyPolicyState((prevState) => ({
        ...prevState,
       }));
      })
   },[props.Product])
   useEffect(()=>{
     if(props.EditData){
    MyPolicyState.policy_name.value=props?.EditData?.policy_name || ""
    MyPolicyState.assured_name.value=props?.EditData?.life_assured_name || ""
    MyPolicyState.date.value=moment(props?.EditData?.date).format("YYYY-MM-DD") || ""
    MyPolicyState.claime_type.value=props?.EditData?.claimant_type || ""
    MyPolicyState.benefit.value=props?.EditData?.estimated_claim || ""
    MyPolicyState.peril_name.value=props?.EditData?.peril_name || ""
    MyPolicyState.amount.value=0
    setUploadFiles(props?.EditData?.files)
    setMyPolicyState((prevState) => ({
      ...prevState,
     }));
    }
   },[props.EditData])
   console.log("EditData",props.EditData)
    return(
      <>           {LoginData?.role==="agent" &&   
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
                   <Grid item md={3} xs={12} lg={3}>
                        <Labelbox type="text" labelname="Life Assured Name "
                         changeData={(data) =>checkValidation(data, "assured_name")}
                         value={MyPolicyState.assured_name.value}
                         error={MyPolicyState.assured_name.error}
                         errmsg={MyPolicyState.assured_name.errmsg}
                        />
                   </Grid>
                   <Grid item md={3} xs={12} lg={3}>
                        <Labelbox type="datepicker" labelname="Notification Date / Time"
                         changeData={(data) =>checkValidation(data, "date")}
                         value={MyPolicyState.date.value}
                         error={MyPolicyState.date.error}
                         errmsg={MyPolicyState.date.errmsg}
                        />
                   </Grid>
                   <Grid item md={3} xs={12} lg={3}>
                        <Labelbox type="select" labelname="Claimant Type"
                         changeData={(data) =>checkValidation(data, "claime_type")}
                         value={MyPolicyState.claime_type.value}
                         error={MyPolicyState.claime_type.error}
                         errmsg={MyPolicyState.claime_type.errmsg}
                         dropdown={[{id:1,value:"Life Assured - Death Claim Due to Accident"},{id:2,value:"Life Assured - Natural Death Claim"},{id:3,value:"Medical Expense due to Accident"},
                         {id:4,value:"Partial Total Disability "},{id:5,value:"Temporary Partial Disability"},{id:6,value:"Temporary Total Disability"}
                         ]}
                        />
                   </Grid>
                   {MyPolicyState.claime_type.value&&
                   <Grid item md={3} xs={12} lg={3}>
                        <Labelbox type="text" labelname="Benefit"
                         changeData={(data) =>checkValidation(data, "benefit")}
                         value={MyPolicyState.benefit.value}
                         error={MyPolicyState.benefit.error}
                         errmsg={MyPolicyState.benefit.errmsg}
                         disabled={true}
                        />
                   </Grid>
                    }

                   <Grid item md={3} xs={12} lg={3}>
                        <Labelbox type="select" labelname="Peril Name"
                         changeData={(data) =>checkValidation(data, "peril_name")}
                         value={MyPolicyState.peril_name.value}
                         error={MyPolicyState.peril_name.error}
                         errmsg={MyPolicyState.peril_name.errmsg}
                         dropdown={[{id:1,value:"Basic Perils"},{id:2,value:"Comprehensive Accident Insurance (CAI)"},{id:3,value:"Supplementary Accident Insurance (SAI)"},
                         {id:4,value:"Waiver of Premium (WP)"}
                         ]}
                        />
                   </Grid>

                   <Grid item md={3} xs={12} lg={3}>
                        <Labelbox type="text" labelname="Estimated Claim Amount"
                         changeData={(data) =>checkValidation(data, "amount")}
                         value={MyPolicyState.amount.value}
                         error={MyPolicyState.amount.error}
                         errmsg={MyPolicyState.amount.errmsg}
                         disabled={MyPolicyState.amount.value?true:false}
                        />
                   </Grid>
                   <Grid item md={3} xs={12} lg={3} className="text_area_comp">
                     <div>Upload Photo</div>
                   <div style={{marginTop:"6px"}}><input type="file" id="myfile" name="myfile" onChange={(e)=>FileOnchange(e)}/></div>
                   <div style={{color:"red",fontSize:"13px",marginTop:"3px"}}>{uploadError}</div>
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
export default connect(mapStateToProps)(LifePolicyClaimes);