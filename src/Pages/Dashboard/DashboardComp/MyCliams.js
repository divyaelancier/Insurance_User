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
import LifePolicyClaimes from './LifeClaims'
import NonLifeClaimes from './MotorClaimes'
import ViewClaimes from './ViewClaimes'
 function MyClaimes(props){
   const [type,settype]=useState("Life")
   const [TableData,setTableData]=useState([])
   const[ProductList,setProductList]=useState([])
   const [UploadFiles,setUploadFiles]=useState()
   const [ViewData,setViewData]=useState([])
   const [EditData,setEditData]=useState()
   const [Modalopen,setModalopen]=useState(false)
   const [ClaimesData,setClaimesData]=useState([])
   const [FilterItem,setFilterItem]=useState([])
   const [ParticularViewData,setParticularViewData]=useState()
   const LoginData=JSON.parse(localStorage.getItem("data"))
   let dispatch=useDispatch() 
   const [header,setheader] = useState([
    { id: 'name', label: 'Policy Name' },
    { id: 'number', label: 'Policy Number' },
    { id: 'status', label: 'Status' },
    { id: '', label: 'Action' },
   ])
  
   const [MyPolicyState,setMyPolicyState]=useState({
     type:{
        value: "",
        validation: [{ name: "required"}],
        error: null,
        errmsg: null,
      },
      policy:{
       value: "",
       validation: [{ name: "required"}],
       error: null,
       errmsg: null,
     },
     number:{
       value: "",
       validation: [{ name: "required"}],
       error: null,
       errmsg: null,
     },
     status:{
         value: "",
         validation: [{ name: "required"}],
         error: null,
         errmsg: null,
       },
       description:{
         value: "",
         validation: [{ name: "required"}],
         error: null,
         errmsg: null,
       },
     })
    function checkValidation(data, key) {
      if(data&&key==="policy")  {
        setEditData()
        var Data = ClaimesData.length > 0 && ClaimesData.filter((item, index) => {
          return (item.policy_no===data )  
      })
       setFilterItem(Data) 
       console.log("datadddddddddddddddd",Data)
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
  


 useEffect(()=>{
  dispatch(MYClaimes_GetApi())
  dispatch(User_Life_Policy("myclaimes")) 
  dispatch(Motor_Policy("myclaimes"))
  dispatch(Travel_Policy("myclaimes"))
 },[])
useEffect(()=>{
  let Data=[]
  let Claimes=[]
  let viewdata=[]
  props.Product_list.map((data)=>{
     Data.push({id:data.id,value:data.category_title})
  })
  props.MyClaimes_Data.map((data)=>{
    if(LoginData?.role==="user"){
    viewdata.push(data)
    Claimes.push({name:data.policy_name,number:data.policy_no,status:data.status===1?"Approved":data.status===0?"Rejected":"Pending",id:data.id,row:data})
    }
    else if(LoginData?.role==="agent"){
      viewdata.push(data)
      Claimes.push({customer:data.acustomer,name:data.policy_name,number:data.policy_no,status:data.status==1?"Approved":data.status==0?"Rejected":"Pending",id:data.id,row:data})
  }
 })
 setTableData(Claimes)
 setViewData(viewdata)

},[props.Product_list,props.MyClaimes_Data])

useEffect(() => {

  let Data = []
  let Travel = []
  let Motor = []
  let viewData=[]
  props.PolicyData.length > 0 && props.PolicyData.map((data, index) => {
      if (data.completed == 1 && data.status_type==="Approve ") {
          viewData.push(data)
          Data.push({id:data.id,value:data.policy_no,product:data.product_name})
      }
   
  })
  props.MotorData.length > 0 && props.MotorData.map((data, index) => {
      if ( data.completed == 1 && data.status_type==="Approve " ) {
        viewData.push(data)
        Data.push({id:data.id,value:data.policy_no,product:data.product_name})
      }
     
  })
  props.TravelData.length > 0 && props.TravelData.map((data, index) => {

    if ( data.completed == 1 && data.status_type==="Approve " ) {

      viewData.push(data)
      Data.push({id:data.id,value:data.policy_no,product:data.product_name})
    }
  })
  var array = [...Data, ...Motor, ...Travel]
  setProductList(Data)
  setClaimesData(viewData)
}, [props.PolicyData, props.TravelData, props.MotorData])
const modelopen=(data,id)=>{
  if(data==="view"){
      setModalopen(true)
      var Data=ViewData.length>0&&ViewData.find((data,index)=>{
          return (data.id==id)
      })
      setParticularViewData(Data)
  }else if(data==="edit"){
    var Data=ViewData.length>0&&ViewData.find((data,index)=>{
      return (data.id==id)
    })
    setEditData(Data)
  }
}

useEffect(()=>{
  // MyPolicyState.type.value=EditData?.policy || ""
  MyPolicyState.policy.value=EditData?.policy_no || ""
  setMyPolicyState(prevState =>({
    ...prevState,
  }))  

},[EditData])

useEffect(()=>{
  if(LoginData?.role==="agent"){
    setheader([
        { id: 'customer', label: 'Customer Name' },
        { id: 'name', label: 'Policy Name' },
        { id: 'number', label: 'Policy Number' },
        // { id: 'amount', label: 'Amount' },
        { id: 'status', label: 'Status' },
        { id: 'action', label: 'Action' },
    ])  
  }
},[])
console.log("setFilterItem",TableData)
    return(
        <div>
              <div>
                   <h3>{LoginData?.role==="agent"?"Customer Claims":"My Claims"}</h3>
              <Grid container xs={12} spacing={2} className=""> 
                   {/* <Grid item md={3} xs={12} lg={3} >
                        <Labelbox type="select" labelname="Select the policy"
                          changeData={(data) =>checkValidation(data, "type")}
                          value={MyPolicyState.type.value}
                          error={MyPolicyState.type.error}
                          errmsg={MyPolicyState.type.errmsg}
                          dropdown={[{id:1,value:"Life Policies"},{id:2,value:"Non Life Policies"}]}
                        />
                   </Grid> */}
                   <Grid item md={3} xs={12} lg={3} >
                        <Labelbox type="select" labelname="Policy Number"
                         changeData={(data) =>checkValidation(data, "policy")}
                         value={MyPolicyState.policy.value}
                         error={MyPolicyState.policy.error}
                         errmsg={MyPolicyState.policy.errmsg}
                         dropdown={ProductList}
                        />
                   </Grid>
                   {/* <Grid item md={3} xs={12} lg={3}>
                        <Labelbox type="text" labelname="Policy Number"
                         changeData={(data) =>checkValidation(data, "number")}
                         value={MyPolicyState.number.value}
                         error={MyPolicyState.number.error}
                         errmsg={MyPolicyState.number.errmsg}
                        //  disabled={true}
                        />
                   </Grid> */}

                  { FilterItem[0]?.product_name==="Motor Insurance" || FilterItem[0]?.product_name==="Travel Insurance" || EditData?.policy_name==="Motor Insurance" ||  FilterItem[0]?.product_name==="Travel Insurance" ?<NonLifeClaimes  Product={FilterItem} EditData={EditData} />:
                  <LifePolicyClaimes Product={FilterItem} EditData={EditData}/>}
                   {/* <Grid item md={3} xs={12} lg={3} >
                        <Labelbox type="select" labelname="Policy Status"
                        changeData={(data) =>checkValidation(data, "status")}
                        value={MyPolicyState.status.value}
                        error={MyPolicyState.status.error}
                        errmsg={MyPolicyState.status.errmsg}
                        dropdown={[{id:1,value:"Active"},{id:2,value:"In-Active"}]}
                        // disabled={true}
                        />
                   </Grid>
                  
                   <Grid item md={5} xs={12} lg={5} className="text_area_comp">
                        <Labelbox type="textarea" labelname="Tell us what about happing?"
                          changeData={(data) =>checkValidation(data, "description")}
                          value={MyPolicyState.description.value}
                          error={MyPolicyState.description.error}
                          errmsg={MyPolicyState.description.errmsg}
                        />
                   </Grid>
                   <Grid item md={5} xs={12} lg={5} className="text_area_comp">
                     <div style={{marginBottom:"10px"}}>Upload Photo</div>
                   <div style={{marginTop:"20px"}}><input type="file" id="myfile" name="myfile" onChange={(e)=>FileOnchange(e)}/></div>
                   </Grid>
                   <Grid item md={12} xs={12} lg={12} style={{justifyContent:"flex-end"}} className="submit_css_das">
                        <a  onClick={Submit} class="next">Submit</a>
                         
                  </Grid> */}
                   <Grid item md={12} xs={12} lg={12}>
                       <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                   <h3>List of {LoginData?.role==="agent"?"Customer":"My"} Claims</h3>
                    </div>
                   
                    <div className="policies_contain">
                   <EnhancedTable headCells={header} rows={TableData}
                       modelopen={(e,id)=>modelopen(e,id)}
                          DeleteIcon="close"
                          EditIcon="close"
                    />  
                   </div> 
                   </Grid>
                    </Grid>
                    </div > 
                    <DynModel  handleChangeModel={Modalopen} modelTitle={"View Claimes"}
                       modalchanges="recruit_modal_css" handleChangeCloseModel={() =>setModalopen(false)} width={600} content={
                    <>
                    <ViewClaimes ViewData={ParticularViewData}/>
                    </>   
                }
                >  
                </DynModel>
               
         
             {/* mobile card view */}
             <div className="card_view">
                {TableData.length>0 && TableData.map((data, index) => {
                    const Index = index + 1
                    return (
                        <Card sx={{}} className="paper_card">
                            <Box sx={{ width: "100%" }}>
                                <CardContent sx={{ flex: '1 0 auto'}} className="view_content_div">
                                {LoginData?.role==="agent" &&
                                <div className="inner_div">
                                        <Typography component="div" variant="h7">
                                            Customer Name
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            {data.customer || "-"}
                                        </Typography>
                                    </div>
                                     }
                                    <div className="inner_div">
                                        <Typography component="div" variant="h7">
                                            Policy Name
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            {data.name}
                                        </Typography>
                                    </div>
                                    <div className="inner_div">
                                        <Typography component="div" variant="h7">
                                            Policy Number
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            {data.number ? data.number : "---"}
                                        </Typography>
                                    </div>
                                  
                                    <div className="inner_div">
                                        <Typography component="div" variant="h7">
                                            Status
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                        <span className="card_icons_div">{data.status || "--"}
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                    <VisibilityIcon className="tableeye_icon" onClick={() => modelopen("view", data.id)} />
                                    {/* <EditIcon className="tableedit_icon" onClick={() => modelopen("edit", data.id)} /> */}
                                    <DownloadIcon className="tabledelete_icon" onClick={() => modelopen("download", data.id)} />
                                </Typography>
                                         </span>
                                        </Typography>
                                    </div>

                                </CardContent>
                            </Box>
                         
                        </Card>
                    )
                })}
                {/* <Pagination count={TableData.length} /> */}
            </div>     
        </div>
    )
}
const mapStateToProps = (state) =>
({
   PolicyData:state.Reducer.UserPolicy || [],
   TravelData: state.Reducer.Travelpolicy || [],
   MotorData: state.Reducer.Motorpolicy || [],
   Product_list:state.Reducer.Product_list || [],
   MyClaimes_Data:state.Reducer.MyClaimes_Data || []
});
export default connect(mapStateToProps)(MyClaimes);