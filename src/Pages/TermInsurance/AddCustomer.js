import { Grid } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import Labelbox from '../../Components/labelbox/labelbox'
import { Create_Customers,Get_Customers_List,Delete_Customers } from '../../redux/actions/AddcustomersActions'
import ValidationLibrary from '../../Components/validationfunction'
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch,connect } from 'react-redux'
 export default function Agent_AddCustomers(props){
    let dispatch=useDispatch()
  
 
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
         dispatch(Create_Customers(MyPolicyState,"")).then(()=>{
            HandleCancel()
            props.CloseModal(false)
         })
    }
    setMyPolicyState(prevState =>({
        ...prevState,
      }))  
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
 


    return(
        <div>
           <Grid container xs={12} spacing={2} className=""> 
                   <Grid item md={3} xs={12} lg={4} >
                       <Labelbox type="text" labelname="Name"
                          changeData={(data) =>checkValidation(data, "name")}
                          value={MyPolicyState.name.value}
                          error={MyPolicyState.name.error}
                          errmsg={MyPolicyState.name.errmsg}
                       />
                   </Grid>  
                   <Grid item md={3} xs={12} lg={4} >
                       <Labelbox type="text" labelname="Email"
                            changeData={(data) =>checkValidation(data, "email")}
                            value={MyPolicyState.email.value}
                            error={MyPolicyState.email.error}
                            errmsg={MyPolicyState.email.errmsg}
                       />
                   </Grid>  
                   <Grid item md={3} xs={12} lg={4} >
                       <Labelbox type="text" labelname= "Mobile Number"
                         changeData={(data) =>checkValidation(data, "mobile_number")}
                         value={MyPolicyState.mobile_number.value}
                         error={MyPolicyState.mobile_number.error}
                         errmsg={MyPolicyState.mobile_number.errmsg}
                       />
                   </Grid>
                   {/* <Grid item md={3} xs={12} lg={3} >
                   </Grid> */}
                   
                   
                   <Grid item md={2} xs={12} lg={12} style={{alignItems:"center",display:"flex",marginTop:"15px",justifyContent:"flex-end"}}>
                       {/* <CustomButton  btnName="Search"/> */}
                       <a onClick={Submit} class="next">Submit</a>
                   </Grid>
                   
            </Grid>      
        </div>
    )
}

