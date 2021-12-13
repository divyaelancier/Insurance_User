import React,{ useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import Poster from '../../Images/termpng.png'
import Image from '../../Images/resizer.gif'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Get_Offline_policies } from '../../redux/actions/AllAction'
import './OfflinepolicyView.scss'
import { Tabs } from 'antd';
import { connect, useDispatch } from 'react-redux'
const { TabPane } = Tabs;
 function OfflinePolicyView(props){
    let dispatch=useDispatch()
    const Policy=[{id:1,name:"Marine"},{id:2,name:"House Holders Insurance Policy"},{id:3,name:"Burglary"}]
    console.log("props",props)
    const [Offline,setOffline]=useState(props.location.state)
    const [Product_type,setProduct_type]=useState()
    const [Products,setProducts]=useState([])
    function callback(key) {
        console.log(key);
      }
   const ProductView=(data)=>{
    setOffline()
    var Data=props.OfflineProducts.find((item)=>{
      return( data.id==item.id)
    })
    console.log("dddddd",Data)

    setProduct_type(Data)
   } 
   useEffect(()=>{
        dispatch(Get_Offline_policies())
    },[])
    useEffect(()=>{
      setProducts(props.OfflineProducts)
    },[props.OfflineProducts])

    return(
        <div className="offline_policy">
            <Grid container sapcing={2}>
    
               
                <Grid item xs={12} md={8} lg={8}> 
            <div  className="category_offline"><h3>{Product_type?.category_title || Offline?.category_title}</h3></div> 

                <Grid container>  
                <Grid item xs={12} md={12} className="offline_view">
                    {/* <div className="img_cont_div"> */}
                    <div style={{width:"100%",height:"300px"}}>
                      {Offline?.thumnail?
                     <img src={"http://161.97.72.249:3001/uploads/"+Offline?.thumnail} style={{width:"100%",height:"100%"}}/>:
                     <img src={"http://161.97.72.249:3001/uploads/"+ Product_type?.thumnail} style={{width:"100%",height:"100%"}}/>}
                     </div>
                </Grid>
                <Grid item xs={12} md={12}>
                    <div className="overview">OverView</div>
                    <p>{Product_type?.long_desc||Offline?.long_desc}</p>
                
                {Offline?.category_title==="Marine" &&
                <>
                 <div className="overview">Marine Insurance – Open Policy</div>
                 <p>1) The open cover is a contract for 12 (twelve) months which gives the Insured continuous protection to cover large number of shipments / despatches and the premium of which would be adjusted from the respective cash deposit account maintained by the Insured.</p>
                  <p>2) The open cover is not having any Sum Insured but issued with SCL / PBL along with Terms of Cover etc.</p>
                   <p>3) An open cover is not a policy and therefore not stamped.</p>
                
              
                 
                 <div className="overview">Marine Insurance – Open Policy</div>
                 <p>1) The open policy is issued to cover several shipments/ despatches for the period of 12 (twelve) months based on the Sum Insured sufficiently large and adjusted against the value of each cargo in a reducing balance method</p>
                  <p>2) Traders having regular despatches are interested to take the benefit of the Open Policy.</p>
                  </>
                }
                <Tabs defaultActiveKey="1" onChange={callback}>
                       <TabPane tab="High Lights" key="1">
                           <div dangerouslySetInnerHTML={{__html:Product_type?.highlights || Offline?.highlights}}></div>
                        </TabPane>
                       <TabPane tab="Covered" key="2">
                       <div dangerouslySetInnerHTML={{__html:Product_type?.covered || Offline?.covered}}></div>
                      </TabPane>
                      <TabPane tab="Exclusions" key="3">
                          <div dangerouslySetInnerHTML={{__html:Product_type?.exclusions || Offline?.exclusions}}></div>
                      </TabPane>
                 </Tabs>
                </Grid>
                </Grid>
                </Grid>
                <Grid item xs={12} md={4} lg={4} className="poli_vie_pa">

                   <div className="policy_ins">
                 {Products.map((data)=>{
               return(
                <div className={Product_type?.category_title===data.category_title&&"clr_change" || Offline?.category_title===data.category_title&&"clr_change"} onClick={()=>ProductView(data)}>
                       <span><ArrowRightIcon/></span> {data.category_title} 
                  </div> 
                    )
                      })}
                   </div> 
                 </Grid>
            </Grid>                 

        </div>
    )
}
const mapStateToProps = (state) =>
({
  //  Product_list:state.Reducer.Product_list || [],
   OfflineProducts:state.Reducer.OfflineProducts || []
});
export default connect(mapStateToProps)(OfflinePolicyView);