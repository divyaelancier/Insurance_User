import { Grid } from '@material-ui/core'
import React,{useEffect,useState} from 'react'
import CustomButton from '../../../Components/Butttons/button'
import Labelbox from '../../../Components/labelbox/labelbox'
import EnhancedTable from '../../../Components/Table/Table'
import './Mypolicies.scss'
import AutorenewIcon from '@material-ui/icons/Autorenew';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Get_Branch_Locator } from '../../../redux/actions/AllAction'
import { connect,useDispatch } from 'react-redux'

 function BranchLocator(props){ 
    let dispatch=useDispatch()
    const [StateDetails,setStateDetails]=useState([]) 
    const [CityDetail,setCityDetail]=useState([])
    const [storeCity,setstoreCity]=useState([])
    const [BranchData,setBranchData]=useState([])
    const [branch,setbranch]=useState(false)
    const [BranchLocatorState,setBranchLocatorState]=useState({
        state:{
          value:""
        },
        city:{
          value:""
        }
    })
    useEffect(()=>{
        dispatch(Get_Branch_Locator())
    },[])
    useEffect(()=>{
      
    let Data=[]
    let City=[]
    props.BranchData&&props.BranchData.map((data)=>{
        City.push({id:data.id,value:data.status===1&&data.city})
    })   
    var items= props.BranchData.filter((data,index,self)=>
    index===self.findIndex((t)=>(
    t.state===data.state && t.id===t.id
    ))
   )
   items.map((data)=>{
    Data.push({id:data.id,value:data.status===1&&data.state})
   })      
             
    setStateDetails(Data)  
    setCityDetail(City)
    },[props.BranchData])
    const BranchValidation=(data,key)=>{
        if(data&&key==="state"){
          let CityData=[]
          var Data= props.BranchData.filter((item)=>{
            return(item.state===data)
          })

          var items= Data.filter((data,index,self)=>
          index===self.findIndex((t)=>(
          t.city===data.city && t.id===t.id
         ))
        )
        items.map((t)=>{
             CityData.push({id:t.id,value:t.city})
         })
         setstoreCity(CityData)
        }
        let Dynobj={
          value:data
        }
        setBranchLocatorState(prevState =>({
          ...prevState,
          [key]:Dynobj
         }))
      }
      const Submit=()=>{
        setbranch(true)
          var Data=props.BranchData.filter((data)=>{
              return(data.state===BranchLocatorState.state.value && data.city===BranchLocatorState.city.value || data.state===BranchLocatorState.state.value)
          })
          var City=props.BranchData.filter((data)=>{
            return(data.city===BranchLocatorState.city.value && data.state===BranchLocatorState.state.value  || data.state===BranchLocatorState.state.value  )
          })
      console.log(City,"setBranchData")

          let CityData=[]
          CityData.push(City)
          if(branch){
         setBranchData([{
          state:Data[0]?.state,
          city:Data[0]?.city,
          address:City?.map((data)=>{
            return data.address
          })
         }])
        }
          setBranchLocatorState(prevState =>({
            ...prevState,
           }))
      }
      const HandleCancel=()=>{
        let Key=Object.keys(BranchLocatorState)
        Key.map((data)=>{
          BranchLocatorState[data].value=""
        })
        setBranchLocatorState(prevState =>({
          ...prevState,
         }))
      }
      console.log("BranchData",BranchData)
    return(
        <div>
           <h3>Branch Locator</h3>
           <Grid container xs={12} spacing={2} className=""> 
                   <Grid item md={3} xs={12} lg={3} >
                       <Labelbox type="select" labelname="Select State"
                       dropdown={StateDetails}
                       value={BranchLocatorState.state.value}
                       changeData={(data) =>BranchValidation(data, "state")}
                       />
                   </Grid>  
                   
                   <Grid item md={3} xs={12} lg={3} >
                       <Labelbox type="select" labelname="Select City"
                       dropdown={storeCity}
                       value={BranchLocatorState.city.value}
                       changeData={(data) =>BranchValidation(data, "city")}
                       />
                   </Grid>  
                   
                   <Grid item md={12} xs={12} lg={12} style={{display:"flex"}}>
                       {/* <CustomButton  btnName="Search"/> */}
                       <div className="submit_css_das">
                        <a onClick={Submit} class="next">Search</a>
                        <a className="clear_btn" onClick={HandleCancel}>Reset</a>
                        </div>
                   </Grid>
                   <Grid item md={12} xs={12} lg={12} >
                     {BranchData.length>0&&
                     <>
                       <h3>Address</h3>
                        <p><b>State:</b> {BranchData[0]?.state}</p>

                        <p><b>City:</b> {BranchData[0]?.city}</p>

                        <b>Address:</b> 
                        <div  className="branch_data">{BranchData[0]?.address?.map((data)=>{
           return(
             <div style={{width:"20%"}}>
              <li>{data}</li>
              </div>
           )
         })}
         </div> 
         </>
                       }
                   </Grid>
            </Grid>      
        </div>
    )
}

const mapStateToProps = (state) =>
({
   BranchData:state.Reducer.BranchData ||[]
});
export default connect(mapStateToProps)(BranchLocator);