import { Grid } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import Labelbox from '../../../Components/labelbox/labelbox'
import EnhancedTable from '../../../Components/Table/Table'
import './Mypolicies.scss'
import ValidationLibrary from '../../../Components/validationfunction'
import EditIcon from '@mui/icons-material/Edit';
import {Switch,Input} from 'antd'
import { useDispatch,connect } from 'react-redux'
import ViewModal from './PolicyView/ViewModal'
// import MotorViewModal from './PolicyView/MotorView'
// import TravelViewModal from './PolicyView/TravelView'
import DynModel from '../../../Components/Model/model'
import moment from 'moment'
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Get_Products } from '../../../redux/actions/AllAction'
import { User_Life_Policy,Travel_Policy,Motor_Policy } from '../../../redux/actions/DashboardActions'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from "@material-ui/icons/Delete";
import DownloadIcon from '@mui/icons-material/Download';
import { useHistory } from 'react-router-dom'
import Pagination from '../../../Components/Pagination/pagination'
import {  EDIT_POLICY_DATA } from '../../../redux/constants/constants'
import Payments from '../Payments'
import PaymentsIcon from '@mui/icons-material/Payments';
import ReactToPrint from "react-to-print";
import { Get_Customers_List} from '../../../redux/actions/AddcustomersActions'
 function MyPolicySRequest(props){
    const { Search } = Input;
    const [type,settype]=useState("Life Policies")
    let history=useHistory()
    const [TableData,setTableData]=useState([])
    const [Modalopen,setModalopen]=useState(false)
    const [ViewData,setViewData]=useState([])
    const [mobileview,setmobileview]=useState(false)
    const [PaymentModal,setPaymentModal]=useState(false)
    const [ParticularViewData,setParticularViewData]=useState({})
    const LoginData=JSON.parse(localStorage.getItem("data"))
    const [Customers,setCustomers]=useState([])
    let dispatch=useDispatch()
    const Validation=(data)=>{
        console.log("datas",data)
        settype(data)
     
    }
    const [header,setheader] = useState([
        // { id: 'sno', label: 'S.No' },
        { id: 'type', label: 'Policy Type' },
        { id: 'name', label: 'Policy Name' },
        { id: 'number', label: 'Date' },
        { id: 'amount', label: 'Amount' },
        { id: 'status', label: 'Status' },
        { id: 'action', label: 'Action' },
   ])
   const[ProductList,setProductList]=useState([])
   const [Paydetails,setPaydetails]=useState({})
   const [MyPolicyState,setMyPolicyState]=useState({
    name:{
       value: "",
       validation: [],
       error: null,
       errmsg: null,
     },
     customer:{
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
    const [Width, setWidth] = useState(0);

    useEffect(() => {
      const updateWindowDimensions = () => {
        const newWidth = window.innerWidth;
        setWidth(newWidth);
      };
  
      window.addEventListener("resize", updateWindowDimensions);
  
      return () => window.removeEventListener("resize", updateWindowDimensions) 
  
    }, []);
    console.log("updating height",Width<480);

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
    dispatch(User_Life_Policy("request",MyPolicyState)) 
    dispatch(Motor_Policy("request",MyPolicyState))
    dispatch(Travel_Policy("request",MyPolicyState))
  
}
setMyPolicyState(prevState =>({
    ...prevState,
  }))  
}
// useEffect(()=>{
//     dispatch(User_Life_Policy(type,MyPolicyState))
//  },[])

 useEffect(()=>{
    dispatch(User_Life_Policy("request",MyPolicyState))
    dispatch(Motor_Policy("request",MyPolicyState))
    dispatch(Travel_Policy("request",MyPolicyState))
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
        if (props.LoginDetails[0]?.role==="user" && data.completed == 1) {
            viewData.push(data)
            Data.push({ type: data.product_type, name: data.product_name, number: moment(data.update_at).format("DD-MM-YYYY"), amount: data.sum_assured,status:data.status_type===null?"Pending":data.status_type,
                action:
                <div><VisibilityIcon className="tableeye_icon"  onClick={()=>modelopen("view",data.id,data)}/>
                <DownloadIcon className="tabledelete_icon" onClick={() =>modelopen("download",data.id)}/>
                {data.paytype==="Offline"?<PaymentsIcon className="tableedit_icon" onClick={() =>modelopen("pay",data.id,data)}/>:data.paytype==="Online"?<span className="paid_btn">Paid</span>:""
            } </div>,id:data.id,row:data })
        }
        else if(props.LoginDetails[0]?.role==="agent" && data.completed == 1){
            viewData.push(data)
            Data.push({ type: data.product_type,customer:data.basic_info.proposer_name, name: data.product_name, number:moment(data.update_at).format("DD-MM-YYYY"), amount: data.sum_assured,status:data.status_type===null?"Pending":data.status_type,action:
        
                <div><VisibilityIcon className="tableeye_icon"  onClick={()=>modelopen("view",data.id,data)}/>
                <DownloadIcon className="tabledelete_icon" onClick={() =>modelopen("download",data.id)}/>
                {data.paytype==="Offline"?<PaymentsIcon className="tableedit_icon" onClick={() =>modelopen("pay",data.id,data)}/>:data.paytype==="Online"?<span className="paid_btn">Paid</span>:""} </div>, id:data.id,row:data })
        }
    })
    props.MotorData.length > 0 && props.MotorData.map((data, index) => {
        if (props.LoginDetails[0]?.role==="user" && data.completed == 1) {
            viewData.push(data)
            Motor.push({ type: data.product_type, name: data.product_name, number:moment(data.update_at).format("DD-MM-YYYY"), amount: data.premium, status:data.status_type===null?"Pending":data.status_type,
                action:
                <div><VisibilityIcon className="tableeye_icon"  onClick={()=>modelopen("view",data.id,data)}/>
                <DownloadIcon className="tabledelete_icon" onClick={() =>modelopen("download",data.id)}/>
                {data.paytype==="Offline"?<PaymentsIcon className="tableedit_icon" onClick={() =>modelopen("pay",data.id,data)}/>:data.paytype==="Online"?<span className="paid_btn">Paid</span>:""} </div>,id:data.id,row:data
                 })
        }
        else if(props.LoginDetails[0]?.role==="agent" && data.completed == 1){

            viewData.push(data)
            Motor.push({ type: data.product_type,customer:data.basic_info.insured_name, name: data.product_name, number:moment(data.update_at).format("DD-MM-YYYY"), amount: data.premium, status:data.status_type===null?"Pending":data.status_type,action:
                <div><VisibilityIcon className="tableeye_icon"  onClick={()=>modelopen("view",data.id,data)}/>
                <DownloadIcon className="tabledelete_icon" onClick={() =>modelopen("download",data.id)}/>
               {data.paytype==="Offline"?<PaymentsIcon className="tableedit_icon" onClick={() =>modelopen("pay",data.id,data)}/>:data.paytype==="Online"?<span className="paid_btn">Paid</span>:""} </div>,id:data.id,row:data})
        }
    })
    props.TravelData.length > 0 && props.TravelData.map((data, index) => {
        if (props.LoginDetails[0]?.role==="user" && data.completed == 1) {
            viewData.push(data)
            Travel.push({ type: data.product_type, name: data.product_name, number:moment(data.update_at).format("DD-MM-YYYY"), amount: data.sum_assured,status:data.status_type===null?"Pending":data.status_type,
                action:
                <div><VisibilityIcon className="tableeye_icon"  onClick={()=>modelopen("view",data.id,data)}/>
                <DownloadIcon className="tabledelete_icon" onClick={() =>modelopen("download",data.id)}/>
                {data.paytype==="Offline"?<PaymentsIcon className="tableedit_icon" onClick={() =>modelopen("pay",data.id,data)}/>:data.paytype==="Online"?<span className="paid_btn">Paid</span>:""} </div>,id:data.id,row:data})
        }
        else if(props.LoginDetails[0]?.role==="agent" && data.completed == 1){
            viewData.push(data)
            Travel.push({ type: data.product_type,customer:data.basic_info.insured_name,  name: data.product_name,number:moment(data.update_at).format("DD-MM-YYYY"), amount: data.sum_assured,status:data.status_type===null?"Pending":data.status_type,
                action:
                <div><VisibilityIcon className="tableeye_icon"  onClick={()=>modelopen("view",data.id,data)}/>
                <DownloadIcon className="tabledelete_icon" onClick={() =>modelopen("download",data.id)}/>
                {data.paytype==="Offline"?<PaymentsIcon className="tableedit_icon" onClick={() =>modelopen("pay",data.id,data)}/>:data.paytype==="Online"?<span className="paid_btn">Paid</span>:""} </div>,id:data.id,row:data})
        }
    })
     var array=[...Data,...Motor,...Travel]
     setTableData(array)
     setViewData(viewData)

 },[props.PolicyData,props.TravelData,props.MotorData])
 const modelopen=(data,id,row_data)=>{

    if(data==="view"){
        setModalopen(true)
        setmobileview(true)
        var Data=ViewData.filter((item, index) => {
            return(item.id==id)
            
        })
        setParticularViewData(Data[0])

    }
    else if(data==="edit"){
    //  const Product=row_data.row.product_name
    //     if(Product==="Motor Insurance"){
    //         history.push({
    //             pathname:"/motorinsurance"
    //         })
    //         dispatch({type:EDIT_POLICY_DATA,payload:row_data.row})
    //     }
    }

    else if(data==="download"){
        const doc = new jsPDF("a3");
        var bodydata = [];
        TableData && TableData.find((data, index) => {
         if(data.id===id){   
          bodydata.push([index + 1, data.type,data.name,data.number?data.number:"---",data.amount]);   
         }
        });

        doc.autoTable({
            beforePageContent: function (data) {
                doc.text("Policies", 15, 23); // 15,13 for css
            },
            margin: { top: 30 },
            showHead: "everyPage",
            theme: "striped",
            head: [["S.No", "Product Type", "Product Name","Policy No.","Premium Amount"]],
            body: bodydata,
        });
        doc.save("Policies.pdf");
    }
    else if(data==="pay"){
        setPaymentModal(true)
        var Data=ViewData.filter((item, index) => {
            return(item.id==id)
        })
        setPaydetails(Data[0])
        console.log(Data,"setProductListfdsdghsfdsgfgfgfgfgfgfgfgfgfgfgf")

    }
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
          { id: 'number', label: 'Date' },
          { id: 'amount', label: 'Amount' },
          { id: 'status', label: 'Status' },
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


    return(
        <div>
           <h3>{LoginData?.role==="agent"?"Customer":"My"} Policy Request</h3>
        <div>
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
                       {/* <Labelbox type="text" labelname="Search by Policy Number"/> */}
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
                   </Grid> */}
                
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
                   <Grid item md={12} xs={12} lg={12} >
                       <div style={{marginTop:"10px"}}>
                           <h3>List of {LoginData?.role==="agent"?"Customer":"My"} Policy Request</h3>
                      </div>
                    <div  className="policies_contain">   
                   <EnhancedTable headCells={header} 
                    //   rows={
                    //    type==="Life Policies"?TableData.Data:type==="Motor Insurance"?TableData.Motor:type=="Travel Insurance"?
                    //    TableData.Travel:""}   
                       rows={TableData}
                       modelopen={(e,id,row)=>modelopen(e,id,row)}
                    //    VisibilityIcon="close" 
                       DeleteIcon="close"
                       DownLoad="open"
                       Pay="open"
                       EditIcon="close"
                       actionclose="close"
                       /> 
                       </div>  
                   </Grid>
            </Grid>  
            <DynModel  handleChangeModel={Modalopen} modelTitle={"View Policies"}
                modalchanges="recruit_modal_css" handleChangeCloseModel={() =>setModalopen(false)} width={800} content={
                    <>
                    <ViewModal  ViewData={ParticularViewData}/>
                   
                    </>   
                }
                >
                   
                </DynModel> 

                <DynModel  handleChangeModel={PaymentModal} modelTitle={"Offline Payments"}
                modalchanges="recruit_modal_css" handleChangeCloseModel={() =>setPaymentModal(false)} width={800} content={
                    <>
                    <Payments  ViewData={Paydetails} Payment={(bln)=>setPaymentModal(bln)}/>
                    </>   
                }
                >
                   
                </DynModel>    
             

               </div>

                {/* mobile card view */}
                <div className="card_view">
                {TableData.map((data,index)=>{ 
                    const Index=index+1
                    return( 
                <Card sx={{}} className="paper_card">
                    <Box sx={{width:"100%"}}>
                     <CardContent sx={{ flex: '1 0 auto'  }} className="view_content_div">
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
                           {data.action}
                       </Typography>
                       </span>
                       </Typography>
                       </div>
                 
                    </CardContent>
                    </Box>
             
                </Card>
                )})} 

              {/* <Pagination count={TableData.length}/> */}
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
export default connect(mapStateToProps)(MyPolicySRequest);