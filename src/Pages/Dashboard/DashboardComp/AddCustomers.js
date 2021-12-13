import { Grid } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import CustomButton from '../../../Components/Butttons/button'
import Labelbox from '../../../Components/labelbox/labelbox'
import EnhancedTable from '../../../Components/Table/Table'
import './Mypolicies.scss'
import AutorenewIcon from '@material-ui/icons/Autorenew';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Create_Customers,Get_Customers_List,Delete_Customers } from '../../../redux/actions/AddcustomersActions'
import ValidationLibrary from '../../../Components/validationfunction'
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch,connect } from 'react-redux'
import DynModel from '../../../Components/Model/model'
import DeleteMedia from '../../../Components/Table/DeleteMedia'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DeleteIcon from "@material-ui/icons/Delete";
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@material-ui/icons/Visibility';
 function AddCustomers(props){
    let dispatch=useDispatch()
    const header = [
        { id: 'name', label: 'Name' },
        { id: 'email', label: 'Email' },
        { id: 'mobile', label: 'Mobile Number' },
        { id:"",label:"Action"}
   ]
   const [ServiceData,setServiceData]=useState([])
   const [deleteview,setdeleteview]=useState(false)
   const [DeleteId,setDeleteId]=useState("")
   const [EditData,setEditData]=useState([])
   const [MyPolicyState,setMyPolicyState]=useState({
    name:{
       value: "",
       validation: [{ name: "required"}],
       error: null,
       errmsg: null,
     },
     email:{
      value: "",
      validation: [{ name: "required"},{name:"email"}],
      error: null,
      errmsg: null,
    },
    mobile_number:{
      value: "",
      validation: [{ name: "required"},{name:"mobile"}],
      error: null,
      errmsg: null,
    },
   
    })
    function checkValidation(data, key) {
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
         dispatch(Create_Customers(MyPolicyState,EditData)).then(()=>{
            HandleCancel()
         })
    }
    setMyPolicyState(prevState =>({
        ...prevState,
      }))  
    }
    useEffect(()=>{
      dispatch(Get_Customers_List())
    },[])
    useEffect(()=>{
        var Data=[]
        props.Customers_list.length>0&&props.Customers_list.map((data)=>{
            Data.push({name:data.name,email:data.email,mobile:data.phone,id:data.id,row:data})
        })
        setServiceData(Data)
    },[props.Customers_list])
    const modelopen=(data,id)=>{
         if(data==="edit"){
           var Data=props.Customers_list.find((data)=>{
                return(data.id==id)  
           })
           setEditData(Data)
         }
    }
    const HandleCancel=()=>{
        let Key=["name","email","mobile_number"]
        Key.map((data)=>{
            MyPolicyState[data].value=""
        })
        setMyPolicyState(prevState =>({
         ...prevState,
        })) 
     }
    const deleteMedia=(data,id)=>{
        setDeleteId(id)
        setdeleteview(true)
    }
    const DeleteRow=()=>{
        dispatch(Delete_Customers(DeleteId)).then(()=>{
            setdeleteview(false)
        })
    }

    useEffect(()=>{
        MyPolicyState.name.value=EditData?.name 
        MyPolicyState.email.value=EditData?.email
        MyPolicyState.mobile_number.value=EditData?.phone
        setMyPolicyState(prevState =>({
            ...prevState,
        })) 
    },[EditData])
    console.log("customers",EditData.name)
    return(
        <div>
           <h3>Add Customers</h3>
           <Grid container xs={12} spacing={2} className=""> 
                   <Grid item md={3} xs={12} lg={3} >
                       <Labelbox type="text" labelname="Name"
                          changeData={(data) =>checkValidation(data, "name")}
                          value={MyPolicyState.name.value}
                          error={MyPolicyState.name.error}
                          errmsg={MyPolicyState.name.errmsg}
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
                   <Grid item md={3} xs={12} lg={3} className="empty_grid">
                   </Grid>
                   
                   
                   <Grid item md={12} xs={12} lg={12} style={{display:"flex",alignItems:"center",marginTop:"10px"}}>
                       {/* <CustomButton  btnName="Search"/> */}
                       <div className="submit_css_das">
                        <a onClick={Submit} class="next">Submit</a>
                        <a className="clear_btn" onClick={HandleCancel}>Cancel</a>
                        </div>
                   </Grid>
                   <Grid item md={12} xs={12} lg={12} >
                     <h3>List of Customers</h3>
                    <div className="policies_contain">
                   <EnhancedTable headCells={header} rows={ServiceData} 
                   VisibilityIcon="close"  modelopen={(e,id)=>modelopen(e,id)}
                   deleteMedia={(e,id)=>deleteMedia(e,id)}
                   /> 
                   </div>
                   <DynModel  handleChangeModel={deleteview} modelTitle={"Delete"} handleChangeCloseModel={()=>deleteview(false)} width={400}
                content ={<DeleteMedia handleChangeCloseModel={()=>setdeleteview(false)} deleterow={DeleteRow}/> }/>   
                   </Grid>
            </Grid>   
              {/* mobile card view */}
              <div className="card_view">
                {ServiceData.length>0 && ServiceData.map((data, index) => {
                    const Index = index + 1
                    return (
                        <Card sx={{}} className="paper_card">
                            <Box sx={{ width: "100%" }}>
                                <CardContent sx={{ flex: '1 0 auto'}} className="view_content_div">
                                <div className="inner_div">
                                        <Typography component="div" variant="h7">
                                            Name
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            {data.name || "-"}
                                        </Typography>
                                    </div>
                                    <div className="inner_div">
                                        <Typography component="div" variant="h7">
                                            Email
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            {data.email}
                                        </Typography>
                                    </div>
                                    <div className="inner_div">
                                        <Typography component="div" variant="h7">
                                          Mobile Number
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            {data.mobile ? data.mobile : "---"}
                                        </Typography>
                                    </div>
                                  
                                    <div className="inner_div">
                                        <Typography component="div" variant="h7">
                                            {/* Status */}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                        <span className="card_icons_div">{""}
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                    <EditIcon className="tableedit_icon" onClick={() => modelopen("edit", data.id)} />
                                    <DeleteIcon className="tabledelete_icon" onClick={() => modelopen("delete", data.id)} />
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
    Customers_list:state.Reducer.Customers_list || []
});
export default connect(mapStateToProps)(AddCustomers);