import  React,{useEffect, useState} from 'react'
import Grid from "@material-ui/core/Grid";
import Cardbody from '../../Components/Card/CardWrapper'
import { makeStyles } from '@material-ui/core/styles';
import Poster from '../../Images/termpng.png'
import Labelbox from '../../Components/labelbox/labelbox';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CustomButton from '../../Components/Butttons/button'
import TableComp from '../../Components/Table/Table'
import { Link } from 'react-router-dom'
import { withStyles,} from '@material-ui/core/styles';
import { SettingsBackupRestoreOutlined } from '@material-ui/icons';
import moment from 'moment';
import ValidationLibrary from '../../Components/validationfunction'
import {Checkbox} from 'antd'
import Tooltip from '@material-ui/core/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import eye from '../../Images/eye.jpg'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useHistory,useLocation } from 'react-router-dom'
import { Travel_Get_Quote } from '../../redux/actions/PolicyStore'
import { useDispatch,connect } from 'react-redux';
import { Travel_Proposal_Data,ProposalData } from '../../redux/StateDetails/Stateaction'
import { Get_Customers_List} from '../../redux/actions/AddcustomersActions'
import plus from '../../Images/plus.png'
import Agent_AddCustomers from '../TermInsurance/AddCustomer'
import DynModel from '../../Components/Model/model'

 function TravelInsurance(props){
    // let history=useLocation()
    let history=useHistory()
    let dispatch=useDispatch()
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

     const [value, setValue] = React.useState('SAI');
     const [Tableenable,setTableenable]=useState(false)
     
     const handleChange = (event) => {
       setValue(event.target.value);
     };
     const [Customers,setCustomers]=useState([])
     const LoginData=JSON.parse(localStorage.getItem("data"))
     const [GetAge,setGetAge]=useState("")
     const [customer_id,setcustomer_id]=useState()
     const [disableage,setdisableage]=useState(false)
     const [TravelDetail,setTravelDetail]=useState()
     const [Modalopen,setModalopen]=useState(false)
     const [TravelStates,setTravelStates]=useState({
          travel_type:{
                value:"",
                validation: [],
                error: null,
                errmsg: null,
           },
           travel_country:{
                value:"",
                validation: [{ name: "required" }],
                error: null,
                errmsg: null,
           },
           noof_travel:{
               value:"",
               validation: [{ name: "required" }],
               error: null,
               errmsg: null,
          },
          sum_assured:{
               value:"",
               validation: [{ name: "required" }],
               error: null,
               errmsg: null,
          },
          customers:{
            value:"",
            validation: [],
            error: null,
            errmsg: null,
        }
     })
    
     const CheckValidation=(data,key)=>{
      if(data&&key==="customers"){
        if(data){
       var Data=props.Customers_list.length>0&&props.Customers_list.filter((item)=>{
            return(item.name===data)

        })
     //  setCustomers(Data)
     console.log("custom",Data[0].id)
     setcustomer_id(Data[0].id)
        }
     }
             var errorcheck = ValidationLibrary.checkValidation(
               data,
               TravelStates[key].validation
           );
           let dynObj = {
               value: data,
               error: !errorcheck.state,
               errmsg: errorcheck.msg,
               validation: TravelStates[key].validation,
           };
           setTravelStates((prevState) => ({
               ...prevState,
               [key]: dynObj,
           }));
     }
  
     const Submit=()=>{  
      
          var mainvalue = {};
          var targetkeys = Object.keys(TravelStates);
          for (var i in targetkeys) {
              var errorcheck = ValidationLibrary.checkValidation(
               TravelStates[targetkeys[i]].value,
               TravelStates[targetkeys[i]].validation
              );
              TravelStates[targetkeys[i]].error = !errorcheck.state;
              TravelStates[targetkeys[i]].errmsg = errorcheck.msg;
              mainvalue[targetkeys[i]] = TravelStates[targetkeys[i]].value;
          }
          var filtererr = targetkeys.filter((obj) => TravelStates[obj].error == true);
          if(filtererr.length>0){
              
          }else{
            // dispatch(Travel_Proposal_Data(TravelStates))
            dispatch(ProposalData(TravelStates))
            if(localStorage.getItem("userId")){
              dispatch(Travel_Get_Quote(TravelStates,customer_id,props.EditData.id))
                history.push({
                     pathname:"/Review",
                     state:{Details:TravelStates,Product:props.location.state}
                })
          }
          else{
            history.push({
              pathname:"/login",
              state:{State:"travel",Product:props.location.state}
            })
          }
        }
          setTravelStates((prevState) => ({
              ...prevState,
          }));
     }
  useEffect(()=>{
    setTravelDetail(props.proposal)
 },[props.proposal])
 useEffect(()=>{
  TravelStates.customers.value=TravelDetail?.customers?.value ||  props.EditData?.basic_info?.insured_name || ""  
  TravelStates.noof_travel.value=TravelDetail?.noof_travel?.value || props.EditData.no_of_days_travel || ""
  TravelStates.sum_assured.value=TravelDetail?.sum_assured?.value || props.EditData.sum_assured || ""
  TravelStates.travel_country.value=TravelDetail?.travel_country?.value ||  props.EditData.travel_country || ""
  TravelStates.travel_type.value=TravelDetail?.travel_type?.value ||  props.EditData.traveller_type || ""
  setcustomer_id( props.EditData.id )
  setTravelStates((prevState) => ({
    ...prevState,
  }));
  },[TravelDetail,props.EditData])
  useEffect(() => {
    dispatch(Get_Customers_List())
}, [])

  useEffect(()=>{
      var Data=[]
      props.Customers_list.length>0&&props.Customers_list.filter((data)=>{
          Data.push({id:data.id,value:data.name})
      })
      setCustomers(Data)
  },[props.Customers_list])
  console.log(props.EditData,"EditData")
    return(
        <div>
               <Grid container  spacing={""} className="term_ins_parent"> 
                   <Grid item md={6} xs={12} lg={6} >
                     <div className="img_cont_div">
                     <img src={Poster} style={{width:"100%",height:"100%"}}/>
                     </div>
                     </Grid>
                     <Grid item  md={6} xs={12} lg={6} className="paper_term_cont">
                      
                        <div  className="paper_term_cont_child">
                        <Paper className="motor_paper_cls">
                        <h3 style={{textAlign:"center",marginBottom:"15px"}}>Travel Insurance</h3>
                       <Grid container  spacing={2}>
                       {LoginData?.role==="agent"&&
                       <>
                                   <Grid item md={6} xs={12} lg={6} >
                                                       <Labelbox type="select" labelname="Customer Name" 
                                                            changeData={(data) => CheckValidation(data, "customers")}
                                                            value={TravelStates.customers.value}
                                                            error={TravelStates.customers.error}
                                                            errmsg={TravelStates.customers.errmsg}
                                                            dropdown={Customers}
                                                       />
                                    </Grid>
                                     <Grid item md={6} xs={12} lg={6} className="agent_flow_add">
                                     <div  >
                                          Add Customer
                                          <div onClick={()=>setModalopen(!Modalopen)} style={{textAlign:"center"}}><img src={plus} style={{width:"30px",cursor:"pointer"}}/></div>
                                      </div>
                                     </Grid>
                                     </>
                                   }
                        <Grid item  md={6} xs={12} lg={6} >
                             <Labelbox type="select" labelname="Traveller Type" 
                             dropdown={[{id:1,value:"Adult Male"},{id:2,value:"Adult Female"},{id:3,value:"Student"},{id:4,value:"Minor Male"},{id:5,value:"Minor Female"}]}
                             changeData={(data)=>CheckValidation(data,"travel_type")} 
                             value={TravelStates.travel_type.value}
                             error={TravelStates.travel_type.error}
                             errmsg={TravelStates.travel_type.errmsg}
                             />
                        </Grid>    
                        <Grid item  md={6} TravelStatesxs={12} lg={6} xs={12}>   
                             <Labelbox type="select" labelname="Travel Country"
                              dropdown={[{id:1,value:"Israel"},{id:2,value:"Shengen region"},{id:3,value:"USA and Canada"},{id:4,value:"World-wide except USA and Canada"}]}
                              changeData={(data)=>CheckValidation(data,"travel_country")} 
                              value={TravelStates.travel_country.value}
                              error={TravelStates.travel_country.error}
                              errmsg={TravelStates.travel_country.errmsg}
                             />
                        </Grid>
                        <Grid item  md={6} xs={12} lg={6}>   
                             <Labelbox type="text" labelname="Number of days of Travel " 
                             changeData={(data)=>CheckValidation(data,"noof_travel")} 
                             value={TravelStates.noof_travel.value}
                             error={TravelStates.noof_travel.error}
                             errmsg={TravelStates.noof_travel.errmsg}
                             />
    
                        </Grid>
                     
                        <Grid item  md={6} xs={12} lg={6} >   
                             <Labelbox type="text" labelname="Sum Assured" placeholder="Enter Amount"
                               changeData={(data)=>CheckValidation(data,"sum_assured")} 
                               value={TravelStates.sum_assured.value}
                               error={TravelStates.sum_assured.error}
                               errmsg={TravelStates.sum_assured.errmsg}
                             />
                        </Grid>
                         
                       
                         
                       </Grid>   
                        <div className="custm_quote"><CustomButton btnName="Get Quote" onBtnClick={()=>setTableenable(!Tableenable)}/></div>
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
                  <TableCell>Yearly</TableCell>
                  <TableCell>25000/</TableCell>
                </TableRow>
          </TableBody>
        </Table>

                             </div>
                        <div className="custm_quote"><CustomButton btnName="Go to Proposal" onBtnClick={Submit}/></div>
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
   proposal:state.StateReducer.Travel_ProposalData || [],
   Customers_list:state.Reducer.Customers_list || [],
   EditData:state.MobileReducer.EditData || []
});
export default connect(mapStateToProps)(TravelInsurance);