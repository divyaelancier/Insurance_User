import  React,{useEffect, useState} from 'react'
import Grid from "@material-ui/core/Grid";
import Poster from '../../Images/termpng.png'
import Labelbox from '../../Components/labelbox/labelbox';
import Paper from '@material-ui/core/Paper';
import CustomButton from '../../Components/Butttons/button'
import ValidationLibrary from '../../Components/validationfunction'
import { useHistory } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import './MotorInsurance.scss'
import { Motor_Get_Quote } from '../../redux/actions/PolicyStore'
import { useDispatch,connect } from 'react-redux';
import { Motor_Proposal_Data,ProposalData } from '../../redux/StateDetails/Stateaction'
import { Get_Customers_List} from '../../redux/actions/AddcustomersActions'
import Agent_AddCustomers from '../TermInsurance/AddCustomer'
import DynModel from '../../Components/Model/model'
import plus from '../../Images/plus.png'
import { makeStyles } from '@material-ui/core/styles';
 function MotorInsurance(props){
      let dispatch=useDispatch()
        const data = ["Yearly","25000/"];
    const Private=[{id:1,value:"Private Motor Cycle Less Than 200cc",subprivate:"p1"},
    {id:2,value:"Private Motor Cycle Greater Than 200cc",subprivate:"p2"},
    {id:3,value:"Private Three Wheel Motor Cycle Less Than 200cc",subprivate:"p3"},
    {id:4,value:"Private Three Wheel Motor Cycle Greater Than 200cc",subprivate:"p4"},
    {id:5,value:"Private Automobiles",subprivate:"p5"}
   ]
   const Commerical=[{id:"C1",value:"Automobiles"},
   {id:"C2",value:"Bus"},
   {id:"C3",value:"Mini Bus"},
   {id:"C4",value:"Pickups"},
   {id:"C5",value:"Tankers"},
   {id:"C6",value:"Tankers - Half Trailer"},
   {id:"C7",value:"Tankers – Trailer"},
   {id:"C8",value:"Trucks"},
   {id:"C9",value:"Trucks - Half Trailer"},
   {id:"C10",value:"Trucks – Trailer"},
   ]
   const Carhire=[{id:"Car1",value:"Automobile"},
   {id:"Car2",value:"Big Truck or Tanker"},
   {id:"Car3",value:"Bus - Small"},
   {id:"Car4",value:"Bus - Medium and Large"},
   {id:"Car5",value:"Minibus"},
   {id:"Car6",value:"Pickups"},
   {id:"Car7",value:"Small Truck or Tanker"},
   {id:"Car8",value:"Medium Truck or Tanker"},
   {id:"Car9",value:"Station Wagon"},
   {id:"Car10",value:"Trailer"},
   ]
   const Learner=[{id:1,value:"Automobile"},
   {id:2,value:"Bus Medium and Large"},
   {id:3,value:"Bus-Small"},
   {id:4,value:"Minibus"},
   {id:5,value:"Pickups"},
   {id:6,value:"Station Wagon"},
   {id:7,value:"Big Truck or Tanker"},
   {id:8,value:"Medium Truck or Tanker"},
   {id:9,value:"Small Truck or Tanker"},
   {id:10,value:"Trailer"},
   ]
   const CommericalPublic=[{id:"cp1",value:"Agriculture Vehicle"},
   {id:"cp2",value:"Construction Machines"},
   {id:"cp3",value:"GC-Tankers"},
   {id:"cp4",value:"GC Tankers-Half Trailer"},
   {id:"cp5",value:"GC Tankers-Trailer"},
   {id:"cp6",value:"GC Tipper Trucks"},
   {id:"cp7",value:"GC Tipper Trucks - Trailer"},
   {id:"cp8",value:"GC Trucks"},
   {id:"cp9",value:"GC Trucks - Trailer"},
   {id:"cp10",value:"GC Trucks - Half Trailer"},
   {id:"cp11",value:"GC Trucks-Small and Medium (NPR, FSR, FVR)"},
   {id:"cp12",value:"Horticulture Vehicles"},
   {id:"cp13",value:"Motor Cycle Less than 200cc"},
   {id:"cp14",value:"Motor Cycle more than 200cc"},
   {id:"cp15",value:"Public Use Bus"},
   {id:"cp16",value:"Public Use MiniBus"},
   {id:"cp17",value:"Public Use Pickups"},
   {id:"cp18",value:"Taxi Less than"},
   {id:"cp19",value:"Three wheel motor less than 200cc"},
   {id:"cp20",value:"Special Vehicle - Others"},
   {id:"cp21",value:"Three wheel motor more than 200cc"},
   ]
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

     const [value, setValue] = React.useState('SAI');
     const [Tableenable,setTableenable]=useState(false)
     let history=useHistory()
     const handleChange = (event) => {
       setValue(event.target.value);
     };
     const [GetAge,setGetAge]=useState("")
     const [disableage,setdisableage]=useState(false)
     const [MotorDetails,setMotorDetails]=useState([])
     const [Customers,setCustomers]=useState([])
     const [customer_id,setcustomer_id]=useState()
     const LoginData=JSON.parse(localStorage.getItem("data"))
     const [Modalopen,setModalopen]=useState(false)
     const classes = useStyles();
     const [TerminsStates,setTerminsStates]=useState({
         purpose:{
                value:"",
                validation:[{ name: "required" }],
                error: null,
                errmsg: null,
           },
           plate_number_type:{
                value:"",
                validation:[{ name: "required" }],
                error: null,
                errmsg: null,
           },
           vehicle_type:{
            value:"",
            validation: [],
            error: null,
            errmsg: null,
           },
           driver_type:{
               value:"",
               validation: [],
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
     const header = [
          { id: 'freq', label: 'FREQUENCY' },
          { id: 'premium', label: 'PREMIUM' },
     ]
     const rows = [
          { id: 'Yearly', label: '2500/' },
     ]
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
       if(data&&key==="purpose"){
          if(data){
          TerminsStates.vehicle_type.validation=[{ name: "required" }]
          }
       }
        if(data&&key==="vehicle_type"){
          if(data){
               // TerminsStates.driver_type.validation=[{ name: "required" }]
               TerminsStates.vehicle_type.error=false
               }
          }
          // if(key==="driver_type"){
          //      if(data){
          //           TerminsStates.driver_type.error=false
          //   }
          //  }
        
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
     const [PrivateState,setPrivateState]=useState([])

    const Submit=()=>{  

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
     console.log(filtererr,"TerminsStates")
     if(filtererr.length>0){
         
     }else{
          // dispatch(Motor_Proposal_Data(TerminsStates))
           dispatch(ProposalData(TerminsStates))
          if(localStorage.getItem("userId")){
           dispatch(Motor_Get_Quote(TerminsStates,customer_id,props.EditData.id))     
           history.push({
                pathname:"/Review",
                state:{Details:TerminsStates,Product:props.location.state}
           })
          }else {
               history.push({
                    pathname:"/login",
                    state:{State:"motor",Product:props.location.state}
               }) 
          }
     }
     setTerminsStates((prevState) => ({
         ...prevState,
     }));
  }
  useEffect(()=>{
     let Data=[]
    Private.map((data,index)=>{
         Data.push({id:data.id,value:data,subprivate:data.subprivate})
    })
    setPrivateState(Data)
   },[])
 useEffect(()=>{
     setMotorDetails(props.proposal)
  },[props.proposal])
  useEffect(()=>{
       const Edit_Data=props.EditData
     TerminsStates.customers.value=MotorDetails?.customers?.value ||  props.EditData?.basic_info?.insured_name  || "" 
     TerminsStates.driver_type.value=MotorDetails?.driver_type?.value ||  ""
     TerminsStates.plate_number_type.value=MotorDetails?.plate_number_type?.value || Edit_Data.plate_number_type || ""
     TerminsStates.purpose.value=MotorDetails?.purpose?.value || Edit_Data.purpose || ""
     TerminsStates.vehicle_type.value=MotorDetails?.vehicle_type?.value || Edit_Data.vehicle_type || ""
     // setcustomer_id(Edit_Data?.cus_id)
     setTerminsStates((prevState) => ({
          ...prevState,
      }));
   console.log("check_data",props.EditData)

   },[MotorDetails,props.EditData])

   useEffect(()=>{
   dispatch(Get_Customers_List())
   }, [])

   useEffect(()=>{
       var Data=[]
       props.Customers_list.length>0&&props.Customers_list.filter((data)=>{
           Data.push({id:data.id,value:data.name})
       })
       setCustomers(Data)
   },[props.Customers_list])
    return(
        <div>
         
               <Grid container  spacing={""} className="term_ins_parent"> 
                   <Grid item md={6} xs={12} lg={6}>
                     <div className="img_cont_div">
                     <img src={Poster} style={{width:"100%",height:"100%"}}/>
                     </div>
                     </Grid>
                     <Grid item  md={6} xs={12} lg={6} className="paper_term_cont_second">
                      
                          <div  className="paper_term_cont_child">
                        <Paper className="motor_paper_cls">
                        <h3 style={{textAlign:"center",marginBottom:"15px"}}>Motor Insurance</h3>
                       <Grid container  spacing={2}>
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
                                        <div  >
                                             Add Customer
                                             <div onClick={()=>setModalopen(!Modalopen)} style={{textAlign:"center"}}><img src={plus} style={{width:"30px",cursor:"pointer"}}/></div>
                                         </div>
                                        </Grid>
                                     </>
                                   }
                        <Grid item  md={6} xs={12} lg={6} >
                             <Labelbox type="select" labelname="Plate number Type" dropdown={[{id:1,value:"White"},{id:2,value:"Yellow"}]}
                              changeData={(data)=>CheckValidation(data,"plate_number_type")} 
                              value={TerminsStates.plate_number_type.value}
                              error={TerminsStates.plate_number_type.error}
                              errmsg={TerminsStates.plate_number_type.errmsg}
                             />
                        </Grid> 
                        <Grid item  md={6} xs={12} lg={6} >
                             <Labelbox type="select" labelname="Purpose" dropdown={[{id:1,value:"Private vehicle use"},{id:2,value:"commercial own use"},{id:3,value:"commercial or public Transport"},
                             {id:4,value:"Motor Trade"},{id:5,value:"Agriculture vehicles"},{id:6,value:"Learner"},{id:7,value:"Car hire and Tour"}]}
                             changeData={(data)=>CheckValidation(data,"purpose")} 
                             value={TerminsStates.purpose.value}
                             error={TerminsStates.purpose.error}
                             errmsg={TerminsStates.purpose.errmsg}
                             />
                        </Grid>   

                        {TerminsStates.purpose.value&&<Grid item  md={6} xs={12} lg={6} >
                             <Labelbox type="select" labelname="Vehicle Type" dropdown={
                                 TerminsStates.purpose.value==="Private vehicle use"?Private:TerminsStates.purpose.value==="commercial own use"?Commerical:
                                 TerminsStates.purpose.value==="Car hire and Tour"? Carhire:TerminsStates.purpose.value==="Learner"?Learner:
                                 TerminsStates.purpose.value==="commercial or public Transport"? CommericalPublic:Private
                                 }
                                 changeData={(data)=>CheckValidation(data,"vehicle_type")} 
                                 value={TerminsStates.vehicle_type.value}
                                 error={TerminsStates.vehicle_type.error}
                                 errmsg={TerminsStates.vehicle_type.errmsg}
                                 />
                        </Grid>} 
                    
                         {TerminsStates.vehicle_type.value==="Private Motor Cycle Less Than 200cc" || TerminsStates.vehicle_type.value==="Private Motor Cycle Greater Than 200cc"||
                         TerminsStates.vehicle_type.value==="Private Three Wheel Motor Cycle Less Than 200cc" || TerminsStates.vehicle_type.value==="Private Three Wheel Motor Cycle Greater Than 200cc" 
                         ? 
                         <Grid item  md={6} xs={12} lg={6} >
                          <Labelbox type="select" labelname="Driver Type" 
                          dropdown={[{id:1,value:"Named Driver"},{id:2,value:"Unnamed Driver"}]}
                          changeData={(data)=>CheckValidation(data,"driver_type")} 
                          value={TerminsStates.driver_type.value}
                          error={TerminsStates.driver_type.error}
                          errmsg={TerminsStates.driver_type.errmsg}
                          />
                          </Grid>:
                         TerminsStates.vehicle_type.value==="Car1" ||  TerminsStates.vehicle_type.value==="Car2" ||
                         TerminsStates.vehicle_type.value==="Car3" || TerminsStates.vehicle_type.value==="Car4" ||
                         TerminsStates.vehicle_type.value==="Car5" || TerminsStates.vehicle_type.value==="Car5" ||
                         TerminsStates.vehicle_type.value==="Car6" || TerminsStates.vehicle_type.value==="Car7" ||
                         TerminsStates.vehicle_type.value==="Car8" || TerminsStates.vehicle_type.value==="Car9" ||
                         TerminsStates.vehicle_type.value==="Car10"
                         ?
                          <Grid item  md={6} xs={12} lg={6} >
                          <Labelbox type="select" labelname="Driver Type" 
                           dropdown={[{id:1,value:"Automobiles"},{id:2,value:"Bus - Small"},{id:3,value:"Minibu"},{id:4,value:"Station Wagon"}]}
                         
                          />
                       </Grid>:TerminsStates.vehicle_type.value==="Private Automobiles" || TerminsStates.vehicle_type.value==="Automobiles"?
                         <Grid item  md={6} xs={12} lg={6} >
                             <Labelbox type="text" labelname="Cylinder Capacity"
                             />
                        </Grid>:
                        TerminsStates.vehicle_type.value==="Bus"?
                        <Grid item  md={6} xs={12} lg={6} >
                        <Labelbox type="select" labelname="Number of Seats" 
                   
                        />
                      </Grid>:
                      TerminsStates.vehicle_type.value==="Tankers"?
                      <Grid item  md={6} xs={12} lg={6} >
                      <Labelbox type="select" labelname="Carrying Capacity in Litres" 
                    //   changeData={(data)=>CheckValidation(data,"driver_type")} 
                    //   value={TerminsStates.driver_type.value}
                    //   error={TerminsStates.driver_type.error}
                    //   errmsg={TerminsStates.driver_type.errmsg}
                      />
                    </Grid>:
                     TerminsStates.vehicle_type.value==="Trucks"?
                     <Grid item  md={6} xs={12} lg={6} >
                     <Labelbox type="select" labelname="Carrying Capacity in quintals" 
                    //  changeData={(data)=>CheckValidation(data,"driver_type")} 
                    //  value={TerminsStates.driver_type.value}
                    //  error={TerminsStates.driver_type.error}
                    //  errmsg={TerminsStates.driver_type.errmsg}
                     />
                   </Grid>
                        :
                    TerminsStates.vehicle_type.value==="Agriculture Vehicle" ||       
                    TerminsStates.vehicle_type.value==="Construction Machines"?
                    <>
                    <Grid item  md={6} xs={12} lg={6} >
                    <Labelbox type="select" labelname="Driver Type " 
                    dropdown={[{id:1,value:"Motor Cycle Two wheel"},{id:2,value:"Three Wheel motor"}]}
                    />
                   </Grid>
                     <Grid item  md={6} xs={12} lg={6} >
                     <Labelbox type="select" labelname="Number of Seats" 
                     dropdown={[{id:1,value:"Public Use Bus"},{id:2,value:"Taxi"}]}
                     />
                     </Grid>
                      <Grid item  md={6} xs={12} lg={6} >
                     <Labelbox type="select" labelname="Carrying Capacity in Quintals" 
                     dropdown={[{id:1,value:"GC Trucks"}]}
                     />
                     </Grid>
                      <Grid item  md={6} xs={12} lg={6} >
                     <Labelbox type="select" labelname="Carrying Capacity in Litres" 
                     dropdown={[{id:1,value:"GC Tankers"}]}
                     />
                    </Grid>
                    </>
                       :""      
                    }
                     {TerminsStates.purpose.value===4&&
                      <Grid item  md={6} xs={12} lg={6} >
                      <Labelbox type="select" labelname="Number of Name Plates / Drivers" 
                      dropdown={[{id:1,value:""}]}
                      />
                     </Grid>
                     }  
                       
                       </Grid>   
                        <div className="custm_quote"><CustomButton btnName="Get Quote" onBtnClick={()=>setTableenable(!Tableenable)}/></div>
                       {Tableenable &&
                       <div>
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
                        </div>
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
   proposal:state.StateReducer.ProposalData || [],
   Customers_list:state.Reducer.Customers_list || [],
   EditData:state.MobileReducer.EditData || []
});
export default connect(mapStateToProps)(MotorInsurance);