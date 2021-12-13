
import React, { useState,useEffect } from 'react'
import CustomButton from '../../Components/Butttons/button'
import Help from '../../Images/help.png'
import Poster from '../../Images/poster2.png'
import term from '../../Images/term.png'
import premium from '../../Images/premium.png'
import unit from '../../Images/unit.png'
import endowment from '../../Images/endowment.png'
import money from '../../Images/money.png'
import wholelife from '../../Images/wholelife.png'
import group from '../../Images/group.png'
import childins from '../../Images/childins.png'
import Retirement from '../../Images/Retirement.png'
import './LifePolicies.scss'
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Get_Products,Get_Offline_policies } from '../../redux/actions/AllAction'
import { useHistory,useLocation } from 'react-router-dom'
import { useDispatch,connect } from 'react-redux'
// import { Button } from "shards-react";
 function LifePoliciesComp(props){
    let location=useLocation()
    let dispatch=useDispatch()
    const [ProductDetails,setProductDetails]=useState([])
    const [buttonChange,setbuttonChange]=useState(props.location.state.category_type==="Life Policies"?1:2)
    const [mainDetail,setmainDetail]=useState("")
    let history =useHistory()
    const OnchangeComp=(id)=>{
       if(id==1){
        setbuttonChange(1)
       }
       if(id==2 || location.state=="motor"){
        setbuttonChange(2)
       }
       
    }
    const TermInsurance=[
        {image:term,head:"Term Insurance"},  {image:premium,head:"Anticipated Endowment Life Insurance Policy without Profit"},        
        {image:unit,head:"Education Endowment Life Insurance Policy without Profit"}, {image:endowment,head:"Endowment Annuity Policy without Profit"},
        {image:money,head:"Individual Health Insurance Policy"}, {image:wholelife,head:"Individual Mortgage Protection Policy"},
        {image:group,head:"Life Assurance Policy for Cross Border Drivers and Assistant Driver"}, {image:childins,head:"Ordinary Endowment Life Insurance Policy without Profit"},
        {image:Retirement,head:"Whole Life Insurance Policy without Profit"}
    ]
    const Lifepolicypush=(data,id)=>{
        

        if(data==="Motor Insurance"){
            history.push({
                pathname:"/motorinsurance",
                state:data
             })
        }
        else if(data==="Travel Insurance"){
            history.push({
                pathname:"/travelpolicy_insurance",
                state:data
             })
        }
       
        else{
           history.push({
               pathname:"/terminsurance",
               state:data
            })
        }
    }
    const OfflinePolicysChange=(data,id)=>{
        var OffLine=props.OfflinePolicy.find((item)=>{
  
          return id===item.id
         })
        history.push({
          pathname:"/PolicyView",
          state:OffLine
       }) 
      }
    useEffect(()=>{
        dispatch(Get_Products(props.location.state.category_type,buttonChange))
        dispatch(Get_Offline_policies(props.location.state.category_type,buttonChange))
    },[props.location.state.category_type,buttonChange])
  
    useEffect(()=>{
    let Data=[]  
    let Headers=[]
    props.Product_list.map((data,index)=>{
        Data.push(data)
        Headers.push(data)
    })             
    setProductDetails(Data)  
    },[props.Product_list])
    console.log(props,"props")
 
    const editorChange=(input)=>{

      var e = document.createElement('div');
      e.innerHTML = input;
      return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }
    return(
        <div className="moreproduct_ins">

            <div className="img_cont_div">
                     <img src={"http://161.97.72.249:3001/uploads/"+props.location.state.product_img} style={{width:"400px"}}/>
                     <div>
                       {props.location.state.short_desc}
                     </div>
                 </div>  
              
                  
                 {/*buttons*/}
                 <div className="life_ins_polic">
                 <CustomButton custombtnCSS={buttonChange===1?"life_policy":"changed_life_policy"} btnName={"Life Policies"} onBtnClick={()=>OnchangeComp("1")}/>
                 <CustomButton  custombtnCSS={buttonChange===2?"life_policy":"changed_life_policy"} btnName={"Non Life Policies"} onBtnClick={()=>OnchangeComp("2")}/>
                 </div>
                 {/*  */}

                 {/* card items */}
         
          
                <Grid container  spacing={3}>
              
                {ProductDetails.map((data,index)=>
                 <>
                <Grid item md={4} xs={12} lg={4} sm={4} className="term_icon_div" key={data.index} onClick={()=>Lifepolicypush(data.category_title)}>
                <div className="term_ins_div"> 
                 <img src={"http://161.97.72.249:3001/uploads/"+data.icon} style={{width:"100px",height:"80px"}}/>
                   <h6>{data.category_title}</h6>
                   <p>{data.long_desc}</p>
                   <CustomButton  custombtnCSS={"get_guote_btn"} btnName={"Get Quote"}/>
         
                   </div>
                </Grid>
                 </>
                 )}
                {props.OfflineProducts.map((data,index)=>
                 <>
                <Grid item md={4} xs={12} lg={4} sm={4} className="term_icon_div" key={data.index} onClick={()=>OfflinePolicysChange(data.category_title,data.id)}>
                <div className="term_ins_div"> 
                 <img src={"http://161.97.72.249:3001/uploads/"+data.icon} style={{width:"100px",height:"80px"}}/>
                   <h6>{data.category_title}</h6>
                   <p dangerouslySetInnerHTML={{ __html:editorChange(data.long_desc) }}/>
                   <CustomButton  custombtnCSS={"get_guote_btn"} btnName={"Get Quote"}/>
                   </div>
                </Grid>
                 </>
                 )}
                </Grid>
           
     
                {/* { buttonChange===2&&<NonLifepolicy/>} */}
                {/*  */}
                <div className="need_help_div">
                <div>Need Help?</div>
                <div className="need_common_div">
                   <div className="container">
               
                   <Grid container spacing={4}>
                     <Grid item spacing={2} md={5} sm={12} lg={5} className="grid_in_help">
                          <div className="card p-3 img_help">
                               <h6>Make a complaint</h6>
                               <p>If you’re not happy about our service, neither are we. Please get in touch, so we can try and put things right for you as quickly as possible.</p>
                               <div><CustomButton  custombtnCSS={"get_guote_btn"} btnName={"Get in touch"}/></div>
                           </div>
                           <div className="card p-3 img_help">
                               <h6>View Our Documents</h6>
                               <p>Make sure you read our policy documents.</p>
                               <div><CustomButton  custombtnCSS={"get_guote_btn"} btnName={"Find out more"}/></div>
                           </div>
                     </Grid>
                     <Grid item spacing={2} md={7} sm={12} lg={7}>
                     <img src={Help} style={{width:"100%",height:"100%"}}/>
                     </Grid>   
                   </Grid>
               </div>
               </div>
               </div>
               {/*  */}
              
        </div>
    )
}
const mapStateToProps = (state) =>
({
   Product_list:state.Reducer.Product_list || [],
   OfflineProducts:state.Reducer.OfflineProducts || []
});
export default connect(mapStateToProps)(LifePoliciesComp);