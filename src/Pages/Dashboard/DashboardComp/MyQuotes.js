import React,{useEffect, useState} from 'react'
import Labelbox from '../../../Components/labelbox/labelbox'
import Grid from "@material-ui/core/Grid";
import EnhancedTable from '../../../Components/Table/Table'
import PaymentIcon from '@material-ui/icons/Payment';
import GetAppIcon from '@material-ui/icons/GetApp';
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import DynModel from '../../../Components/Model/model'
import Myquotes from './PolicyView/Myquotes'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from "@material-ui/icons/Delete";
import DownloadIcon from '@mui/icons-material/Download';
import { useHistory } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import Pagination from '../../../Components/Pagination/pagination'
import { Get_Products } from '../../../redux/actions/AllAction'
import ValidationLibrary from '../../../Components/validationfunction'
import { User_Life_Policy,Travel_Policy,Motor_Policy } from '../../../redux/actions/DashboardActions'
import {  EDIT_POLICY_DATA } from '../../../redux/constants/constants'
import { Get_Customers_List} from '../../../redux/actions/AddcustomersActions'
 function MyQuotes(props){
    const [type,settype]=useState("Life")
    const [TableData,setTableData]=useState([])
    const [ViewData,setViewData]=useState([])
    const [Modalopen,setModalopen]=useState(false)
    const [ParticularViewData,setParticularViewData]=useState({})
    const LoginData=JSON.parse(localStorage.getItem("data"))
    const[ProductList,setProductList]=useState([])
    const [Customers,setCustomers]=useState([])
    let history=useHistory()
    const [MyPolicyState,setMyPolicyState]=useState({
     name:{
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      customer: {
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
      product_name:{
       value: "",
       validation: [],
       error: null,
       errmsg: null,
     },
     policy_number:{
       value: "",
       validation: [],
       error: null,
       errmsg: null,
     },
     amount:{
         value: "",
         validation: [],
         error: null,
         errmsg: null,
       },
      
     })
    let dispatch=useDispatch()
    // const checkValidation=(data)=>{
    //     settype(data)
    // }
    const [header,setheader] = useState([
        { id: 'type', label: 'Policy Type' },
        { id: 'name', label: 'Policy Name' },
        // { id: 'number', label: 'Policy Number' },
        { id: 'amount', label: 'Amount' },
        // { id: 'status', label: 'Status' },
        { id:"action",label:"Action"}

   ])

// useEffect(()=>{
//    dispatch(User_Life_Policy(type))
// },[])
useEffect(()=>{
    dispatch(User_Life_Policy("myquotes",MyPolicyState))
    dispatch(Motor_Policy("myquotes",MyPolicyState))
    dispatch(Travel_Policy("myquotes",MyPolicyState))
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
      
    let Data=[]
    let Travel=[]
    let Motor=[]
    let viewData=[]
    props.PolicyData.length > 0 && props.PolicyData.map((data, index) => {
        if (props.LoginDetails[0]?.role==="user" && data.completed == 0 ) {
            viewData.push(data)
            Data.push({ type: data.product_type, name: data.product_name,  amount: data.sum_assured, id:data.id,row:data })
        }
        else if(props.LoginDetails[0]?.role==="agent" && data.completed == 0){
            viewData.push(data)
            Data.push({ type: data.product_type,customer:data.basic_info.proposer_name, name: data.product_name,  amount: data.sum_assured, id:data.id,row:data })
        }
    })
    props.MotorData.length > 0 && props.MotorData.map((data, index) => {
        if (props.LoginDetails[0]?.role==="user" && data.completed == 0) {
            viewData.push(data)
            Motor.push({ type: data.product_type, name: data.product_name, amount: data.premium,  id:data.id,row:data})
        }
        else if(props.LoginDetails[0]?.role==="agent" && data.completed == 0){

            viewData.push(data)
            Motor.push({ type: data.product_type,customer:data.basic_info.insured_name, name: data.product_name,amount: data.premium, id:data.id,row:data })
        }
    })
    props.TravelData.length > 0 && props.TravelData.map((data, index) => {

        if (props.LoginDetails[0]?.role==="user" && data.completed == 0) {
            viewData.push(data)
            Travel.push({ type: data.product_type, name: data.product_name, amount: data.premium,  id:data.id,row:data })
        }
        else if(props.LoginDetails[0]?.role==="agent" && data.completed == 0){
            viewData.push(data)
            Travel.push({ type: data.product_type,customer:data.basic_info.insured_name, name: data.product_name,amount: data.premium, id:data.id,row:data })
        }
    })
    var array=[...Data,...Motor,...Travel]
    setTableData(array)
    setViewData(viewData)
},[props.PolicyData,props.TravelData,props.MotorData])
const modelopen=(data,id,row_data)=>{
    if(data==="view"){
        setModalopen(true)
        var Data=ViewData.filter((data, index) => {
            return(data.id==id)  
        })
        setParticularViewData(Data[0])
    }
    if(data==="edit"){
    const Product=row_data.row.product_name
    if(Product==="Motor Insurance"){
        history.push({
            pathname:"/motorinsurance"
        })
        dispatch({type:EDIT_POLICY_DATA,payload:row_data.row})
    }
    else if(Product==="Travel Insurance"){
        history.push({
            pathname:"/travelpolicy_insurance"
        })
        dispatch({type:EDIT_POLICY_DATA,payload:row_data.row}) 
    }
    else{
        history.push({
            pathname:"/terminsurance"
        })
        dispatch({type:EDIT_POLICY_DATA,payload:row_data.row}) 
    }
  }
  }
  function checkValidation(data, key) {
    if(key==="name")  {
        dispatch(Get_Products(data))
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
   dispatch(User_Life_Policy("myquotes",MyPolicyState)) 
   dispatch(Motor_Policy("myquotes",MyPolicyState))
   dispatch(Travel_Policy("myquotes",MyPolicyState))
 
}
setMyPolicyState(prevState =>({
   ...prevState,
 }))  
}
useEffect(()=>{
    let Data=[]
    props.Product_list.map((data)=>{
       Data.push({id:data.id,value:data.category_title})
    })
    setProductList(Data)
},[props.Product_list])
useEffect(()=>{
    if(LoginData?.role==="agent"){
      setheader([
          {id:"type",label: 'Policy Type'},{ id: 'customer', label: 'Customer Name' },
          { id: 'name', label: 'Policy Name' },
        //   { id: 'number', label: 'Policy Number' },
          { id: 'amount', label: 'Amount' },
        //   { id: 'status', label: 'Status' },
          { id: 'action', label: 'Action' },
      ])  
    }
    
  },[])
  const HandleCancel=()=>{
    let key=Object.keys(MyPolicyState)
    key.map((data)=>{
     MyPolicyState[data].value=""
    })
    setMyPolicyState(prevState =>({
        ...prevState,
      })) 
 }
console.log("checkdata", TableData.sort())

    return(
        <div>
            <h3>{LoginData?.role==="agent"?"Customer":"My"} Quotes</h3>
            <Grid container xs={12} spacing={2} className=""> 
            {LoginData?.role==="agent" &&
               <Grid item md={3} xs={12} lg={3} >
                       <Labelbox type="select" labelname="Customer Name"
                        changeData={(data) =>checkValidation(data, "customer")}
                        value={MyPolicyState.customer.value}
                        error={MyPolicyState.customer.error}
                        errmsg={MyPolicyState.customer.errmsg}
                        dropdown={Customers}
                       />
                   </Grid> 
                }
               <Grid item md={3} xs={12} lg={3} >
                       <Labelbox type="select" labelname="Policy Type"
                        changeData={(data) =>checkValidation(data, "name")}
                        value={MyPolicyState.name.value}
                        error={MyPolicyState.name.error}
                        errmsg={MyPolicyState.name.errmsg}
                        dropdown={[{id:1,value:"Life Policies"},{id:2,value:"Non Life Policies"}]}
                       />
                   </Grid>  
                   <Grid item md={3} xs={12} lg={3} >
                       <Labelbox type="select" labelname="Product Name"
                        changeData={(data) =>checkValidation(data, "product_name")}
                        value={MyPolicyState.product_name.value}
                        error={MyPolicyState.product_name.error}
                        errmsg={MyPolicyState.product_name.errmsg}
                        dropdown={ProductList}
                       />
                   </Grid>  
                   {/* <Grid item md={3} xs={12} lg={3} >
                       <Labelbox type="text" labelname= "Policy Number"
                        changeData={(data) =>checkValidation(data, "policy_number")}
                        value={MyPolicyState.policy_number.value}
                        error={MyPolicyState.policy_number.error}
                        errmsg={MyPolicyState.policy_number.errmsg}
                       />
                   </Grid>
                   {LoginData?.role==="user" &&
                   <Grid item md={3} xs={12} lg={3} >
                   </Grid>
                    } */}
                   <Grid item md={3} xs={12} lg={3} >
                       <Labelbox type="text" labelname="Amount"
                           changeData={(data) =>checkValidation(data, "amount")}
                           value={MyPolicyState.amount.value}
                           error={MyPolicyState.amount.error}
                           errmsg={MyPolicyState.amount.errmsg}
                       />
                   </Grid> 
                   
                   <Grid item md={12} xs={12} lg={12} style={{justifyContent:"flex-start",display:"flex"}}>
                       {/* <CustomButton  btnName="Search"/> */}
                       <div className="submit_css_das">
                        <a onClick={Submit} class="next">Search</a>
                        <a className="clear_btn" onClick={HandleCancel}>Reset</a>
                        </div>
                   </Grid>
                   <Grid item md={12} xs={12} lg={12} className="policies_contain">
                       <h3>List of {LoginData?.role==="agent"?"Customer":"My"} Quotes</h3>
                   <EnhancedTable headCells={header} rows={TableData}
                     DeleteIcon="close"
                    //  EditIcon="close"
                     modelopen={(e,id,row)=>modelopen(e,id,row)}
                   />   
                   </Grid>
            </Grid>  
            <DynModel  handleChangeModel={Modalopen} modelTitle={"View Policies"}
                modalchanges="recruit_modal_css" handleChangeCloseModel={() =>setModalopen(false)} width={800} content={
                    <>
                    <Myquotes  ViewData={ParticularViewData}/>
                    </>   
                }
                >
                   
                </DynModel>        
                 {/* mobile card view */}
                 <div className="card_view" style={{marginTop:"10px"}}>
                {TableData.map((data,index)=>{ 
                    const Index=index+1
                    return( 
                <Card sx={{}} className="paper_card">
                    <Box sx={{width:"100%"}}>
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
                          Ploicy Type
                        </Typography>
                       <Typography variant="subtitle1" color="text.secondary" component="div">
                          {data.type}
                       </Typography>
                       </div>
                       <div  className="inner_div">
                        <Typography component="div" variant="h7">
                         Policy Name
                        </Typography>
                       <Typography variant="subtitle1" color="text.secondary" component="div">
                          {data.name}
                       </Typography>
                       </div>
                      
                       <div  className="inner_div">
                        <Typography component="div" variant="h7">
                         Amount
                        </Typography>
                       <Typography variant="subtitle1" color="text.secondary" component="div">
                       <span className="card_icons_div"> {data.amount}
                       <Typography variant="subtitle1" color="text.secondary" component="div">
                      <VisibilityIcon className="tableeye_icon"  onClick={()=>modelopen("view",data.id,data)}/>
                      <EditIcon className="tableedit_icon" onClick={()=>modelopen("edit",data.id,data)}/>
                      <DownloadIcon className="tabledelete_icon" onClick={() =>modelopen("download",data.id,data)}/>  
                       </Typography>
                       </span>
                       </Typography>
                       </div>
                 
                    </CardContent>
                    </Box>
                   
                </Card>
                )})} 

              <Pagination count={TableData.length}/>
              </div>
           
               
        </div>
    )
}
const mapStateToProps = (state) =>
({
   PolicyData:state.Reducer.UserPolicy || [],
   TravelData:state.Reducer.Travelpolicy || [],
   MotorData:state.Reducer.Motorpolicy || [],
   Product_list:state.Reducer.Product_list || [],
   Customers_list:state.Reducer.Customers_list || [],
   LoginDetails:state.Reducer.ProfileGetData || []
});
export default connect(mapStateToProps)(MyQuotes);