import { Grid } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import CustomButton from '../../../Components/Butttons/button'
import Labelbox from '../../../Components/labelbox/labelbox'
import EnhancedTable from '../../../Components/Table/Table'
import './Mypolicies.scss'
import AutorenewIcon from '@material-ui/icons/Autorenew';
import GetAppIcon from '@material-ui/icons/GetApp';
import ValidationLibrary from '../../../Components/validationfunction'
import { useDispatch } from 'react-redux'
import { User_Life_Policy, Travel_Policy, Motor_Policy } from '../../../redux/actions/DashboardActions'
import { connect } from 'react-redux'
import ViewModal from './PolicyView/ViewModal'
import { Get_Products } from '../../../redux/actions/AllAction'
import DynModel from '../../../Components/Model/model'
import jsPDF from "jspdf";
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from "@material-ui/icons/Delete";
import DownloadIcon from '@mui/icons-material/Download';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Pagination from '../../../Components/Pagination/pagination'
import { Get_Customers_List} from '../../../redux/actions/AddcustomersActions'

// import "jspdf-autotable";
function Mypolicies(props) {
    const [header,setheader] = useState([
        { id: 'type', label: 'Policy Type' },
        { id: 'name', label: 'Policy Name' },
        { id: 'number', label: 'Policy Number' },
        { id: 'amount', label: 'Amount' },
        { id: 'status', label: 'Status' },
        { id: 'action', label: 'Action' },

    ])

    const [type, settype] = useState("Life Policies")
    const [TableData, setTableData] = useState([])
    const [ViewData, setViewData] = useState([])
    const [ParticularViewData, setParticularViewData] = useState()
    const [Modalopen, setModalopen] = useState(false)
    const [ProductList, setProductList] = useState([])
    const LoginData=JSON.parse(localStorage.getItem("data"))
    const [Customers,setCustomers]=useState()
    let dispatch = useDispatch()
    const OnChange = (data) => {
        settype(data)

    }
    const policy = "policy"
    const [MyPolicyState, setMyPolicyState] = useState({
        name: {
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
        policy_number: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        product_name: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        amount: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        active: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
    })
    function checkValidation(data, key) {
        if (key === "name") {
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

    const Submit = (e) => {
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
        if (filtererr.length > 0) {

        } else {
            dispatch(User_Life_Policy("policy", MyPolicyState))
            dispatch(Motor_Policy("policy", MyPolicyState))
            dispatch(Travel_Policy("policy", MyPolicyState))
        }

        setMyPolicyState(prevState => ({
            ...prevState,
        }))
    }

    useEffect(() => {
        let Data = []
        props.Product_list.map((data) => {
            Data.push({ id: data.id, value: data.category_title })
        })
        setProductList(Data)
    }, [props.Product_list])
    useEffect(() => {
        dispatch(User_Life_Policy("policy", MyPolicyState))
        dispatch(Motor_Policy("policy", MyPolicyState))
        dispatch(Travel_Policy("policy", MyPolicyState))
        dispatch(Get_Customers_List())
    }, [])

    useEffect(()=>{
        var Data=[]
        props.Customers_list.length>0&&props.Customers_list.filter((data)=>{
            Data.push({id:data.id,value:data.name})
        })
        setCustomers(Data)
    },[props.Customers_list])

    useEffect(() => {

        let Data = []
        let Travel = []
        let Motor = []
        let viewData = []
        props.PolicyData.length > 0 && props.PolicyData.map((data, index) => {
            if (props.LoginDetails[0]?.role==="user"&&data.completed == 1 && data.status_type==="Approve " ) {
                viewData.push(data)
                Data.push({ type: data.product_type, name: data.product_name, number: data.policy_no, amount: data.sum_assured, status: data.status_type, id:data.id,row:data })
            }
            else if(props.LoginDetails[0]?.role==="agent" && data.completed == 1 && data.status_type==="Approve "){
                viewData.push(data)
                Data.push({ type: data.product_type,customer:data.basic_info.proposer_name, name: data.product_name, number: data.policy_no, amount: data.sum_assured, status: data.status_type, id:data.id,row:data })
            }
        })
        props.MotorData.length > 0 && props.MotorData.map((data, index) => {
            if (props.LoginDetails[0]?.role==="user" && data.completed == 1 && data.status_type==="Approve ") {
                viewData.push(data)
                Motor.push({ type: data.product_type, name: data.product_name, number: data.policy_no, amount: data.premium, status: data.status_type, id:data.id,row:data})
            }
            else if(props.LoginDetails[0]?.role==="agent" && data.completed == 1 && data.status_type==="Approve "){
                viewData.push(data)
                Motor.push({ type: data.product_type,customer:data.basic_info.insured_name, name: data.product_name,number: data.policy_no, amount: data.premium, status: data.status_type, id:data.id,row:data })
            }
        })
        props.TravelData.length > 0 && props.TravelData.map((data, index) => {
            if (props.LoginDetails[0]?.role==="user" && data.completed == 1 && data.status_type==="Approve ") {
                viewData.push(data)
                Travel.push({ type: data.product_type, name: data.product_name, number: data.policy_no, amount: data.premium, status: data.status_type, id:data.id,row:data })
            }
            else if(props.LoginDetails[0]?.role==="agent" && data.completed == 1 && data.status_type==="Approve "){
                viewData.push(data)
                Travel.push({ type: data.product_type,customer:data.basic_info.insured_name, name: data.product_name, number: data.policy_no, amount: data.premium, status: data.status_type, id:data.id,row:data })
            }
        })
        var array = [...Data, ...Motor, ...Travel]
        setTableData(array)
        setViewData(viewData)
    }, [props.PolicyData, props.TravelData, props.MotorData])
    const modelopen = (data, id) => {
        if (data === "view") {
            setModalopen(true)
            var Data=[]
            TableData.filter((data, index) => {
                if(data.row.id==id){
                    Data.push(data.row)
                } 
            })
            console.log("checkdata",id)

            setParticularViewData(Data[0])
        }

        else if (data === "download") {
            const doc = new jsPDF("a3");
            var bodydata = [];
            TableData && TableData.find((data, index) => {
                if (data.id === id) {
                    bodydata.push([index + 1, data.type, data.name, data.number ? data.number : "---", data.amount]);
                }
            });
            console.log("ddddd", bodydata)

            doc.autoTable({
                beforePageContent: function (data) {
                    doc.text("Policies", 15, 23); // 15,13 for css
                },
                margin: { top: 30 },
                showHead: "everyPage",
                theme: "striped",
                head: [["S.No", "Product Type", "Product Name", "Policy No.", "Premium Amount"]],
                body: bodydata,
            });
            doc.save("Policies.pdf");
        }
    }
useEffect(()=>{
  if(LoginData?.role==="agent"){
    setheader([
        {id:"type",label: 'Policy Type'},{ id: 'customer', label: 'Customer Name' },
        { id: 'name', label: 'Policy Name' },
        { id: 'number', label: 'Policy Number' },
        { id: 'amount', label: 'Amount' },
        { id: 'status', label: 'Status' },
        { id: 'action', label: 'Action' },
    ])  
  }
  
},[])

const handleCancel=()=>{
   let key=Object.keys(MyPolicyState)
   key.map((data)=>{
    MyPolicyState[data].value=""
   })
   setMyPolicyState(prevState =>({
    ...prevState,
  })) 
}

    return (
        <div>
            <div >
                <h3>{LoginData?.role==="agent"?"Customer":"My"} Policies</h3>
                <Grid container xs={12} spacing={1} className="">
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
                            changeData={(data) => checkValidation(data, "name")}
                            value={MyPolicyState.name.value}
                            error={MyPolicyState.name.error}
                            errmsg={MyPolicyState.name.errmsg}
                            dropdown={[{ id: 1, value: "Life Policies" }, { id: 2, value: "Non Life Policies" }]}
                        />
                    </Grid>
                    <Grid item md={3} xs={12} lg={3} >
                        <Labelbox type="select" labelname="Product Name"
                            changeData={(data) => checkValidation(data, "product_name")}
                            value={MyPolicyState.product_name.value}
                            error={MyPolicyState.product_name.error}
                            errmsg={MyPolicyState.product_name.errmsg}
                            dropdown={ProductList}
                        />
                    </Grid>
                    <Grid item md={3} xs={12} lg={3} >
                        <Labelbox type="text" labelname="Policy Number"
                            changeData={(data) => checkValidation(data, "policy_number")}
                            value={MyPolicyState.policy_number.value}
                            error={MyPolicyState.policy_number.error}
                            errmsg={MyPolicyState.policy_number.errmsg}
                        />
                    </Grid>
                    {LoginData?.role=="user"&&
                    <Grid item md={3} xs={12} lg={3} className="empty_grid">
                    </Grid>
                     }
                    <Grid item md={3} xs={12} lg={3} >
                        <Labelbox type="text" labelname="Amount"
                            changeData={(data) => checkValidation(data, "amount")}
                            value={MyPolicyState.amount.value}
                            error={MyPolicyState.amount.error}
                            errmsg={MyPolicyState.amount.errmsg}
                        />
                    </Grid>
                    <Grid item md={3} xs={12} lg={3} style={{display:"flex"}}>
                        <div className="submit_css_das">
                        <a onClick={Submit} class="next">Search</a>
                        <a className="clear_btn" onClick={handleCancel}>Reset</a>
                        </div>
                    </Grid>
                    <Grid item md={12} xs={12} lg={12} >
                        <div>
                            <h3>List of {LoginData?.role==="agent"?"Customer":"My"} Policies</h3>
                        </div>
                        <div className="policies_contain">
                        <EnhancedTable headCells={header} rows={TableData}
                            //   actionclose="close"
                            modelopen={(e, id) => modelopen(e, id)}
                            DeleteIcon="close"
                            DownLoad="open"
                            EditIcon="close"
                        />
                        </div>
                        <DynModel  handleChangeModel={Modalopen} modelTitle={"View Policies"}
                        modalchanges="recruit_modal_css" handleChangeCloseModel={() =>setModalopen(false)} width={800} content={
                    <>
                    <ViewModal  ViewData={ParticularViewData}/>
                   
                    </>   
                    }
                   >
                   
                </DynModel>  
                    </Grid>
                </Grid>

            </div>
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
                                            Ploicy Type
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            {data.type}
                                        </Typography>
                                    </div>
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
                                            Amount
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            {data.amount}
                                        </Typography>
                                    </div>
                                    <div className="inner_div">
                                        <Typography component="div" variant="h7">
                                            Status
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            <span className="card_icons_div">{data.status || "-"}
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
                            <div className="inner_icons_div">
                                <Typography component="div" variant="h7">
                                    {/* Amount */}
                                </Typography>
                               
                            </div>
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
    PolicyData: state.Reducer.UserPolicy || [],
    TravelData: state.Reducer.Travelpolicy || [],
    MotorData: state.Reducer.Motorpolicy || [],
    Product_list: state.Reducer.Product_list || [],
    Customers_list:state.Reducer.Customers_list || [],
    LoginDetails:state.Reducer.ProfileGetData || []
});
export default connect(mapStateToProps)(Mypolicies);