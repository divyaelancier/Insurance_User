import React, { useEffect, useState } from 'react'
import Grid from "@material-ui/core/Grid";
import Cardbody from '../../Components/Card/CardWrapper'
import { makeStyles } from '@material-ui/core/styles';
import Poster from '../../Images/termpng.png'
import Labelbox from '../../Components/labelbox/labelbox';
import Paper from '@material-ui/core/Paper';
import './TermInsurance.scss'
import CustomButton from '../../Components/Butttons/button'
import TableComp from '../../Components/Table/Table'
import { Link } from 'react-router-dom'
import moment from 'moment';
import ValidationLibrary from '../../Components/validationfunction'
import { Checkbox } from 'antd'
import Tooltip from '@material-ui/core/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import eye from '../../Images/eye.jpg'
import { useLocation, useHistory } from 'react-router-dom'
import { LifePolicyFormCreate, Get_Questions } from '../../redux/actions/FormActions'
import { useDispatch, connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { ProposalData } from '../../redux/StateDetails/Stateaction'
import { User_Get_Quote } from '../../redux/actions/PolicyStore'
import { Get_Customers_List} from '../../redux/actions/AddcustomersActions'
import DynModel from '../../Components/Model/model'
import Agent_AddCustomers from './AddCustomer'
import plus from '../../Images/plus.png'

function TermInsurance(props) {

     const useStyles = makeStyles((theme) => ({
          root: {
               flexGrow: 1,
          },
          paper: {
               height: 140,
               width: 100,
          },
          control: {
               padding: theme.spacing(2),
          },
     }));
     const classes = useStyles();
     let dispatch = useDispatch()
     let history = useHistory()
     const [value, setValue] = React.useState('SAI');
     const [Tableenable, setTableenable] = useState(false)
     const [LifeDetail, setLifeDetail] = useState([])
     const location = useLocation()
     const [Customers,setCustomers]=useState([])
     const [Modalopen,setModalopen]=useState(false)
     const LoginData=JSON.parse(localStorage.getItem("data"))
     const handleChange = (event) => {
          setValue(event.target.value);
     };
     const [IndividualMortage, setIndividualMortage] = useState([])
     const WholeLife = [{ id: 1, value: "10" }, { id: 2, value: "15" }, { id: 3, value: "20" }, { id: 4, value: "30" }, { id: 5, value: "35" }]
     const LifeAssured = [{ id: 1, value: "Driver" }, { id: 2, value: "Driver Assistant" }]
     const LifeAssured2 = [{ id: 1, value: "Adult Male" }, { id: 2, value: "Adult Female" }]
     const Anticipate = [{ id: 1, value: "10" }, { id: 2, value: "15" }, { id: 3, value: "20" }, { id: 4, value: "25" }]
     const Endowment = [{ id: 1, value: "55" }, { id: 2, value: "60" }, { id: 3, value: "65" }]
     const termPlan = [{ id: 1, value: "5" }, { id: 2, value: "10" }, { id: 3, value: "15" }, { id: 4, value: "20" }, { id: 5, value: "25" }, { id: 6, value: "30" }, { id: 7, value: "35" }]
     const [GetAge, setGetAge] = useState("")
     const [disableage, setdisableage] = useState(false)
     const [customer_id,setcustomer_id]=useState()
     const [LifepolicyStates, setLifepolicyStates] = useState([])
     const [TerminsStates, setTerminsStates] = useState({
          date: {
               value: "",
               validation: [],
               error: null,
               errmsg: null,
          },
          customers: {
               value: "",
               validation: [],
               error: null,
               errmsg: null,
          },
          age: {
               value: "",
               validation: [{ name: "required" }, { name: "allownumeric" }],
               error: null,
               errmsg: null,
          },
          plan_period: {
               value: "",
               validation: [{ name: "required" }],
               error: null,
               errmsg: null,
          },
          assured_type: {
               value: "",
               validation: [{ name: "required" }],
               error: null,
               errmsg: null,
          },
          amount: {
               value: "",
               validation: [{ name: "required" }],
               error: null,
               errmsg: null,
          },

     })
     const header = [
          { id: 'freq', label: 'FREQUENCY' },
          { id: 'premium', label: 'PREMIUM' },
     ]
     const rows = [
          { id: 'Monthly', label: '175/-' },
          { id: 'Quarterly', label: '500/-' },
          { id: 'Half', label: '1500/' },
          { id: 'Yearly', label: '2500/' },
     ]
     const AddOpen=()=>{
          setModalopen(!Modalopen)
     }
     const CheckValidation = (data, key) => {
          if(data&&key==="customers"){
             if(data){
            var Data=props.Customers_list.length>0&&props.Customers_list.filter((item)=>{
                 return(item.name===data)

             })
          //  setCustomers(Data)
          console.log("custom",Data[0].id)
          setcustomer_id(Data[0].id)
          // dispatch({type:customer_id,payload:Data[0].id})
             }
          }
          if (data && key === "date") {
               setdisableage(true)
               var a = new Date()
               var b = new Date(data)
               var date = a.getFullYear() - b.getFullYear()
               TerminsStates.age.value = date
               TerminsStates.age.error = false
               console.log(TerminsStates, "TerminsStates")
          }
          setdisableage(false)

          var errorcheck = ValidationLibrary.checkValidation(
               data,
               TerminsStates[key].validation
          );
          let dynObj = {
               value: data,
               error: !errorcheck.state,
               errmsg: errorcheck.msg,
               validation: TerminsStates[key].validation,
          };
          setTerminsStates((prevState) => ({
               ...prevState,
               [key]: dynObj,
          }));
     }
     const Submit = () => {
          var mainvalue = {};
          var targetkeys = Object.keys(TerminsStates);
          for (var i in targetkeys) {
               var errorcheck = ValidationLibrary.checkValidation(
                    TerminsStates[targetkeys[i]].value,
                    TerminsStates[targetkeys[i]].validation
               );
               TerminsStates[targetkeys[i]].error = !errorcheck.state;
               TerminsStates[targetkeys[i]].errmsg = errorcheck.msg;
               mainvalue[targetkeys[i]] = TerminsStates[targetkeys[i]].value;
          }
          var filtererr = targetkeys.filter((obj) => TerminsStates[obj].error == true);
          if (filtererr.length > 0) {

          } else {
               dispatch(ProposalData(TerminsStates))
               if (localStorage.getItem("userId")) {
               dispatch(User_Get_Quote(TerminsStates, Check, props.location.state || props.EditData.product_name,customer_id,props.EditData.id))
                    history.push({
                         pathname: props.QuestionData.length > 0 ? "/medicalhistory" : "/basicinformation",
                         //  pathname:"/medicalhistory",
                         state: { Termin: TerminsStates, Additinal_Check: Check, store: props.quoteId, Title: props.location.state }
                    })
               } else {
                    history.push({
                         pathname: "login",
                         state:{State:"life",Product:props.location.state}
                    })
               }
          }
          setTerminsStates((prevState) => ({
               ...prevState,
          }));
     }

     useEffect(() => {
          var StoreNumber = []
          for (let i = 1; i <= 50; i++) {
               StoreNumber.push({ id: i, value: i })
          }
          setIndividualMortage(StoreNumber)
          if (disableage) {
               TerminsStates.age.value = GetAge + "/" + moment(TerminsStates.date.value).format("YYYY")
          }
     }, [TerminsStates.date.value, GetAge, disableage])
     const [Check, setCheck] = useState([])
     const OnChangeValue = (e) => {
          const value = e.target.value
          const checked = e.target.checked
          if (checked) {
               setCheck([...Check, value])
          } else {
               Check.splice(value, 1);
          }

     }
     useEffect(() => {

     }, [props.proposal])
     // const [LifeDetail,setLifeDetail]=useState([])
     useEffect(() => {
          setLifeDetail(props.proposal)
     }, [props.proposal])
     useEffect(() => {
          TerminsStates.customers.value=LifeDetail?.customers?.value || props.EditData?.basic_info?.proposer_name || ""  
          TerminsStates.age.value = LifeDetail?.age?.value || props.EditData.age_dob || ""
          TerminsStates.amount.value = LifeDetail?.amount?.value || props.EditData.sum_assured || ""
          TerminsStates.assured_type.value = LifeDetail?.assured_type?.value || props.EditData.life_assured_type ||  ""
          TerminsStates.date.value = LifeDetail?.date?.value || ""
          TerminsStates.plan_period.value = LifeDetail?.plan_period?.value || props.EditData.plan_period || ""
          // setCheck(props.EditData.additional_cover)
          setTerminsStates((prevState) => ({
               ...prevState,
          }));
console.log("editdata", TerminsStates.customers.value)
     }, [LifeDetail,props.EditData])
     useEffect(() => {
          dispatch(Get_Questions(props.location.state))
          dispatch(Get_Customers_List())
     }, [])
  
        useEffect(()=>{
            var Data=[]
            props.Customers_list.length>0&&props.Customers_list.filter((data)=>{
                Data.push({id:data.id,value:data.name})
            })
            setCustomers(Data)
        },[props.Customers_list])
     return (
          <div className={classes.root}>
               <Grid container spacing={""} className="term_ins_parent">
                    <Grid item md={6} xs={12} lg={6} >
                         <div className="img_cont_div">
                              <img src={Poster} style={{ width: "100%", height: "100%" }} />
                         </div>
                    </Grid>
                    <Grid item md={6} xs={12} lg={6} className="paper_term_cont">

                         <div className="paper_term_cont_child">
                              <Paper className="paper_cls">
                                   <h3 style={{ textAlign: "center", marginBottom: "15px" }}>{location.state || props.EditData.product_name}</h3>
                                  
                                   <Grid container spacing={2}>
                               

                                   {LoginData?.role==="agent"&&
                                   <>
                                   <Grid item md={6} xs={12} lg={6} >
                                                       <Labelbox type="select" labelname="Customer Name" 
                                                            changeData={(data) => CheckValidation(data, "customers")}
                                                            value={TerminsStates.customers.value}
                                                            error={TerminsStates.customers.error}
                                                            errmsg={TerminsStates.customers.errmsg}
                                                            dropdown={Customers}
                                                       />
                                    </Grid>
                                        <Grid item md={6} xs={12} lg={6} className="agent_flow_add">
                                          <div>
                                             Add Customer
                                             <div onClick={()=>setModalopen(!Modalopen)} style={{textAlign:"center"}}><img src={plus} style={{width:"30px",cursor:"pointer"}}/></div>
                                         </div>
                                        </Grid>
                                        </>
                                   }
                                        <Grid item md={6} xs={12} lg={6} >
                                             <Labelbox type="select" labelname="Life Assured Type"
                                                  dropdown={
                                                       location.state !== "Life Assurance Policy for Cross Border Drivers and Assistant Driver" ? LifeAssured2 : LifeAssured
                                                  }
                                                  changeData={(data) => CheckValidation(data, "assured_type")}
                                                  value={TerminsStates.assured_type.value}
                                                  error={TerminsStates.assured_type.error}
                                                  errmsg={TerminsStates.assured_type.errmsg}
                                             />
                                        </Grid>
                                        {location.state !== "Life Assurance Policy for Cross Border Drivers and Assistant Driver" &&
                                             <>
                                                  <Grid item md={6} xs={12} lg={6} >
                                                       <Labelbox type="select" labelname="Plan Period"
                                                            dropdown={
                                                                 location.state == "Term Insurance" || location.state == "Ordinary Endowment Life Insurance Policy without Profit" ? termPlan : location.state == "Anticipated Endowment Life Insurance Policy without Profit" ? Anticipate :
                                                                      location.state == "Endowment Annuity Policy without Profit" ? Endowment : location.state == "Individual Mortgage Protection Policy" ? IndividualMortage :
                                                                           location.state == "Whole Life Insurance Policy without Profit" ? WholeLife : termPlan
                                                            }
                                                            changeData={(data) => CheckValidation(data, "plan_period")}
                                                            value={TerminsStates.plan_period.value}
                                                            error={TerminsStates.plan_period.error}
                                                            errmsg={TerminsStates.plan_period.errmsg}
                                                       />
                                                  </Grid>
                                                  <Grid item md={6} xs={12} lg={6} className="date_pic_div_con">
                                                       <Labelbox type="text" labelname="Age / DOB"
                                                            changeData={(data) => CheckValidation(data, "age")}
                                                            value={TerminsStates.age.value}
                                                            error={TerminsStates.age.error || TerminsStates.date.error}
                                                            errmsg={TerminsStates.age.errmsg || TerminsStates.date.errmsg}
                                                       />
                                                       <div className="date_box">
                                                            <Labelbox type="datepicker"
                                                                 className="classes"
                                                                 changeData={(data) => CheckValidation(data, "date")}
                                                                 value={TerminsStates.date.value}
                                                                 error={TerminsStates.date.error}
                                                                 errmsg={TerminsStates.date.errmsg}
                                                            />
                                                       </div>
                                                  </Grid>
                                                  <Grid item md={6} xs={12} lg={6} >
                                                       <Labelbox type="text" labelname="Sum Assured"
                                                            changeData={(data) => CheckValidation(data, "amount")}
                                                            value={TerminsStates.amount.value}
                                                            error={TerminsStates.amount.error}
                                                            errmsg={TerminsStates.amount.errmsg}
                                                       />
                                                  </Grid>

                                             </>
                                        }
                                        <Grid item md={12} xs={12} lg={12} className="term_radio_btns">
                                             <div><div>Additional Cover(Optional)</div><Tooltip title="Additional Cover(Optional)" key={0} arrow><img src={eye} className="eye_viw" /></Tooltip></div>
                                             <div className="add_check">
                                           
                                                  <div><Tooltip title="CAI" key={0} arrow><Checkbox onChange={(e) => OnChangeValue(e)} value={"CAI"} /></Tooltip><div>CAI</div></div>
                                                  <div><Tooltip title="SAI" key={1} arrow><Checkbox onChange={(e) => OnChangeValue(e)} value={"SAI"} /></Tooltip><div>SAI</div></div>
                                                  <div><Tooltip title="WP" key={2} arrow><Checkbox onChange={(e) => OnChangeValue(e)} value={"WP"} /></Tooltip><div>WP</div></div>
                                             </div>

                                        </Grid>

                                   </Grid>
                                   <div className="custm_quote"><CustomButton btnName="Get Quote" onBtnClick={() => setTableenable(!Tableenable)} /></div>
                                   {Tableenable &&
                                        <>
                                             <div>

                                                  <Table>
                                                       <TableHead>
                                                            <TableRow style={{ 'backgroundColor': '#f5f5f5', "height": '35px' }}>
                                                                 <TableCell>FREQUENCY</TableCell>
                                                                 <TableCell>PREMIUM</TableCell>
                                                            </TableRow>
                                                       </TableHead>
                                                       <TableBody>
                                                            <TableRow>
      
                                                                 <TableCell>Monthly</TableCell>
                                                                 <TableCell>20000/-</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                 <TableCell>Yearly</TableCell>
            
                                                                 <TableCell>20000/-</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                 <TableCell>Quarterly</TableCell>
                                                                 <TableCell>1500/-</TableCell>
                                                            </TableRow>

                                                       </TableBody>
                                                  </Table>

                                             </div>
                                             <div className="custm_quote"><CustomButton btnName="Go to Proposal" onBtnClick={Submit} /></div>
                                        </>
                                   }

                              </Paper>
                         </div>
                    </Grid>
               </Grid>
               <DynModel  handleChangeModel={Modalopen} modelTitle={"Add Customer"}
                modalchanges="recruit_modal_css" handleChangeCloseModel={() =>setModalopen(false)} width={600} content={
                    <>
                        <Agent_AddCustomers CloseModal={(bln)=>setModalopen(bln)}/>
                    </>   
                }
                >  
                </DynModel>
          </div>
     )
}

const mapStateToProps = (state) =>
({
     proposal: state.StateReducer.ProposalData || [],
     QuestionData: state.Reducer.QuestionData || [],
     Customers_list:state.Reducer.Customers_list || [],
     EditData:state.MobileReducer.EditData || []
});
export default connect(mapStateToProps)(TermInsurance);