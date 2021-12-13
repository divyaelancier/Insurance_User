import { Grid } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import CustomButton from '../../../Components/Butttons/button'
import Labelbox from '../../../Components/labelbox/labelbox'
import EnhancedTable from '../../../Components/Table/Table'
import './Mypolicies.scss'
import AutorenewIcon from '@material-ui/icons/Autorenew';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Service_Request,Get_Service_Request,Delete_Service_Request } from '../../../redux/actions/DashboardActions'
import ValidationLibrary from '../../../Components/validationfunction'
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch,connect } from 'react-redux'
import DynModel from '../../../Components/Model/model'
import DeleteMedia from '../../../Components/Table/DeleteMedia'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from "@material-ui/icons/Delete";
import DownloadIcon from '@mui/icons-material/Download';
import Pagination from '../../../Components/Pagination/pagination'
import { Get_Customers_List} from '../../../redux/actions/AddcustomersActions'
 function ServiceRequest(props){
    let dispatch=useDispatch()
    const [header,setheader] = useState([
        { id: 'name', label: 'Customer Name' },
        { id: 'email', label: 'Email' },
        { id: 'mobile', label: 'Mobile Number' },
        { id: 'compliant', label: 'Detailed Complaint' },
        { id: 'status', label: 'Status' },
        { id:"",label:"Action"}
    ])
   const [ServiceData,setServiceData]=useState([])
   const [EditData,setEditData]=useState([])
   const [deleteview,setdeleteview]=useState(false)
   const [DeleteId,setDeleteId]=useState("")
   const LoginData=JSON.parse(localStorage.getItem("data"))
   const [Customers,setCustomers]=useState()
   const [MyPolicyState,setMyPolicyState]=useState({
    name:{
       value: "",
       validation: [{ name: "required"}],
       error: null,
       errmsg: null,
     },
     customer:{
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
     email:{
      value: "",
      validation: [{ name: "required"}],
      error: null,
      errmsg: null,
    },
    mobile_number:{
      value: "",
      validation: [{ name: "required"},{name:"mobile"}],
      error: null,
      errmsg: null,
    },
    complaint:{
        value: "",
        validation: [{ name: "required"}],
        error: null,
        errmsg: null,
      },
    })
    function checkValidation(data, key) {
        if(LoginData?.role==="user"){
            MyPolicyState.name.validation=[]
            MyPolicyState.email.validation=[]
            MyPolicyState.mobile_number.validation=[]
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
        e.preventDefault()
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
    if(filtererr.length>0){
        
    }else{
         dispatch(Service_Request(MyPolicyState,EditData.id,props.LoginDetails)).then(()=>{
            HandleCancel()
         })
    }
    setMyPolicyState(prevState =>({
        ...prevState,
      }))  
    }
    const deleteMedia=(data,id)=>{
        setDeleteId(id)
        setdeleteview(true)
    }
    const DeleteRow=()=>{
        dispatch(Delete_Service_Request(DeleteId)).then(()=>{
            setdeleteview(false)
        })
    }

    useEffect(()=>{
      dispatch(Get_Service_Request())
     dispatch(Get_Customers_List())
    },[])

useEffect(()=>{
   var Data=[]
   props.Customers_list.length>0&&props.Customers_list.filter((data)=>{
       Data.push({id:data.id,value:data.name})
   })
   setCustomers(Data)
},[props.Customers_list])

    useEffect(()=>{
        var Data=[]
        props.Service_RequestData.length>0&&props.Service_RequestData.map((data)=>{
            if(props.LoginDetails[0]?.role==="user"){
             Data.push({compliant:data.detailed_complaint,status:data.status,id:data.id,row:data})
            }else{
            Data.push({name:data.name,email:data.email,mobile:data.mobile_no,compliant:data.detailed_complaint,status:data.status,id:data.id,row:data})
            }
        })
        setServiceData(Data.reverse())
    },[props.Service_RequestData])
    const HandleCancel=()=>{
        let Key=["name","email","mobile_number","complaint"]
        Key.map((data)=>{
            MyPolicyState[data].value=""
        })
        setMyPolicyState(prevState =>({
            ...prevState,
          })) 
    }
    const modelopen=(data,id)=>{
         if(data==="edit"){
           var Data= props.Service_RequestData.find((item)=>{
               return (item.id==id)
           })
           setEditData(Data)
         }
    }
    useEffect(()=>{
        MyPolicyState.name.value=EditData.name || ""
        MyPolicyState.email.value=EditData.email || ""
        MyPolicyState.mobile_number.value=EditData.mobile_no || ""
        MyPolicyState.complaint.value=EditData.detailed_complaint || ""
        setMyPolicyState(prevState =>({
            ...prevState,
        })) 
    },[EditData])
    useEffect(()=>{
        if(LoginData?.role==="user"){
          setheader([
              { id: 'compalint', label: 'Detailed Complaint'},
              { id: 'status', label: 'Status' },
              { id: 'action', label: 'Action' },
          ])  
        }   
      },[])
      console.log(props.LoginDetails,"ddddd")
    return(
        <div>
           <h3>Service Request</h3>
           <Grid container xs={12} spacing={2} className="">
               {LoginData?.role=="agent" && 
               <> 
                   <Grid item md={3} xs={12} lg={3} >
                       <Labelbox type="select" labelname="Customer Name"
                          changeData={(data) =>checkValidation(data, "name")}
                          value={MyPolicyState.name.value}
                          error={MyPolicyState.name.error}
                          errmsg={MyPolicyState.name.errmsg}
                          dropdown={Customers}
                       />
                   </Grid>  
                   <Grid item md={3} xs={12} lg={3} >
                       <Labelbox type="text" labelname="Email"
                            changeData={(data) =>checkValidation(data, "email")}
                            value={MyPolicyState.email.value}
                            error={MyPolicyState.email.error}
                            errmsg={MyPolicyState.email.errmsg}
                       />
                   </Grid>  
                   <Grid item md={3} xs={12} lg={3} >
                       <Labelbox type="text" labelname= "Mobile Number"
                         changeData={(data) =>checkValidation(data, "mobile_number")}
                         value={MyPolicyState.mobile_number.value}
                         error={MyPolicyState.mobile_number.error}
                         errmsg={MyPolicyState.mobile_number.errmsg}
                       />
                   </Grid>

                   <Grid item md={3} xs={12} lg={3} >
                   </Grid>
                   </>}
                   <Grid item md={9} xs={12} lg={9} className="textarea_div_claimes">
                       <Labelbox type="text" labelname="Detailed Complaint"
                         changeData={(data) =>checkValidation(data, "complaint")}
                         value={MyPolicyState.complaint.value}
                         error={MyPolicyState.complaint.error}
                         errmsg={MyPolicyState.complaint.errmsg}
                       />
                   </Grid> 
                   
                   <Grid item md={12} xs={12} lg={12} style={{display:"flex",justifyContent:"flex-end"}} className="service">
                       <div className="submit_css_das">
                        <a onClick={Submit} class="next">Submit</a>
                        <a className="clear_btn" onClick={HandleCancel}>Cancel</a>
                        </div>
                   </Grid>
                   <Grid item md={12} xs={12} lg={12} >
                       <h3>List of Service Request</h3>
                    <div  className="policies_contain">   
                    <EnhancedTable headCells={header} rows={ServiceData} 
                     VisibilityIcon="close"  modelopen={(e,id)=>modelopen(e,id)}
                     deleteMedia={(e,id)=>deleteMedia(e,id)}
                     /> 
                   </div>  
                   </Grid>
            </Grid> 
            <DynModel  handleChangeModel={deleteview} modelTitle={"Delete"} handleChangeCloseModel={()=>deleteview(false)} width={400}
                content ={<DeleteMedia handleChangeCloseModel={()=>setdeleteview(false)} deleterow={DeleteRow}/> }
               
                /> 
                {/* mobile card view */}
                <div className="card_view">
                {ServiceData.length>0&&ServiceData.map((data,index)=>{ 
                    const Index=index+1
                    return( 
                <Card sx={{}} className="paper_card">
                    <Box sx={{width:"100%"}}>
                     <CardContent sx={{ flex: '1 0 auto'  }} className="view_content_div">
                     {LoginData?.role=="agent" && <>
                         <div className="inner_div">
                             {/* {Index} */}
                        <Typography component="div" variant="h7">
                        Customer Name
                        </Typography>
                       <Typography variant="subtitle1" color="text.secondary" component="div">
                          {data.name}
                       </Typography>
                       </div>
                       <div  className="inner_div">
                        <Typography component="div" variant="h7">
                         Email
                        </Typography>
                       <Typography variant="subtitle1" color="text.secondary" component="div">
                          {data.email}
                       </Typography>
                       </div>
                       <div  className="inner_div">
                        <Typography component="div" variant="h7">
                        Mobile Number
                        </Typography>
                       <Typography variant="subtitle1" color="text.secondary" component="div">
                          {data.mobile?data.mobile:"---"}
                       </Typography>
                       </div>
                       </>}
                       <div  className="inner_div">
                        <Typography component="div" variant="h7">
                        Detailed Complaint
                        </Typography>
                       <Typography variant="subtitle1" color="text.secondary" component="div">
                           {data.compliant}
                       </Typography>
                       </div>
                       <div  className="inner_div">
                        <Typography component="div" variant="h7">
                         Status
                        </Typography>
                       <Typography variant="subtitle1" color="text.secondary" component="div">
                           {data.status}
                       </Typography>
                       </div>
                 
                    </CardContent>
                    </Box>
                    <div  className="inner_icons_div" style={{marginBottom:"5px"}}>
                        <Typography component="div" variant="h7">
                         {/* Amount */}
                        </Typography>
                       <Typography variant="subtitle1" color="text.secondary" component="div">
              {/* <VisibilityIcon className="tableeye_icon"  onClick={()=>modelopen("view",data.id)}/> */}
             <EditIcon className="tableedit_icon" onClick={()=>modelopen("edit",data.id)}/>
              {/* <DownloadIcon className="tabledelete_icon" onClick={() =>modelopen("download",data.id)}/>   */}
                       </Typography>
                       </div>
                </Card>
                )})} 

              {/* <Pagination count={ServiceData.length}/> */}
              </div>  
        </div>
    )
}

const mapStateToProps = (state) =>
({
    Service_RequestData:state.Reducer.Service_Request || [],
    Customers_list:state.Reducer.Customers_list || [],
    LoginDetails:state.Reducer.ProfileGetData || []
});
export default connect(mapStateToProps)(ServiceRequest);