import React, { useState,useEffect } from 'react'
import Grid from "@material-ui/core/Grid";
import Poster from '../../Images/medical.png'
import { Checkbox } from 'antd';
import CustomButton from '../../Components/Butttons/button'
import {Link} from 'react-router-dom'
import { Get_Questions } from '../../redux/actions/FormActions'
import { connect,useDispatch } from 'react-redux'
import { Radio } from 'antd';
import { User_Get_Quote } from '../../redux/actions/PolicyStore'
import { useHistory } from 'react-router-dom'
function MedicalHistory(props){
const [QuestionData,setQuestionData]=useState({})
const [MedicalData,setMedicalData]=useState(new Map())
const [Q_Data,setQ_Data]=useState([])
const [QuestionDetails,setQuestionDetails]=useState([]) 
let history=useHistory()
const [count,setcount]=useState(0)
const [value, setValue] = useState();
let dispatch=useDispatch()
function onChangeCheckbox(e) {
 
//  let Id=index+1
  // setMedicalData([...MedicalData,{
  //   id:Id,
  //   question:question,
  //   answer:option1
  // }])
const item = e.target.name;
            const isChecked = e.target.checked;
            setMedicalData(MedicalData.set(item, isChecked))
           

  setQ_Data((prevState) => ({
    ...prevState,
  }));
}
console.log("checked",QuestionData);

const onChangeRadio = e => {
  setValue(e.target.value);
};



useEffect(()=>{
  dispatch(Get_Questions(props.location.state.Title))
},[])

useEffect(()=>{
    var Data=props.QuestionData.filter((data,index)=>{
      return (count===index)
    })
 setQuestionDetails(Data) 
                 
// setQuestionDetails(Data)
},[props.QuestionData,count])
useEffect(()=>{
  if(props.location.state.login){
    dispatch(User_Get_Quote(props.proposal,"",props.location.state.Title))
  }
},[props.proposal])    
const unCheck=()=>{
  
}                        
const QusetionsSubmit=(event)=>{
  MedicalData.length>0 && MedicalData.map((data)=>{
  console.log(QuestionData,"fffff")

    if(value===true){
      setQuestionData({
        id:"",
        question:"",
        answer:data.value
      })
    }
  })
  setcount(count+1)
  // unCheck()
//   if(count===1){
//   var x =document.getElementsByClassName("checkbox");
//   for(let i=0; i<=x.length; i++) {
//     x[i].checked = false;
//   }   
// }

if(count===props.QuestionData.length-1){
  history.push({
    pathname:"/basicinformation",
    state:{Medical:MedicalData,Details:props.location.state}
  })
}
var Data=[]

}

    return(
        <div style={{margin:"35px 0px"}}>
              <Grid container xs={12} spacing={3} className="medi_ins_parent"> 
                   <Grid item md={6} xs={12} lg={6} >
                   {QuestionDetails.map((data,index)=>{
                          return(
                          <>
                     <div className="img_cont_div">
                     <img src={"http://161.97.72.249:3001/uploads/"+data?.image} style={{width:"300px",height:"100%"}}/>
                     </div>
                          </>
                          )})}
                     </Grid>
                     <Grid item md={6} xs={12} lg={6} className="check_box_item">
                     {QuestionDetails.map((data,index)=>{
                          return(
                          <>
                         <h3>{data.question}</h3>
                          {/* <p>This will help us to find plan that cover your condition</p> */}
                      
                          {data.question_type==="Single Answer" && data.status===1?
                            <>
                         {data?.options.map((data)=> 
                             <div>
                             <Radio.Group onChange={onChangeRadio} value={value}>
                             <Radio  value={index}>{data.option1}</Radio>
                             </Radio.Group>
                             </div>
                          )}  
                          </>
                        :
                        <>
                          {data.status===1&&
                        <>
                        {data?.options.map((data,index)=> 
                       <div key={data.key}><Checkbox type="checkbox"  onChange={(e)=>onChangeCheckbox(e)} checked={MedicalData.get(data.option1) || false} name={data.option1} class="checkbox" />{data.option1}</div>
                         )}  
                         </>
                          }
                         </>
                        }
                        </>
                    
                          )
                        })}
                 
                       <div style={{textAlign:"end"}}>
                        <a onClick={QusetionsSubmit} class="next">Next &raquo;</a>
                          {/* <CustomButton btnName="Next" custombtnCSS="btn_nxt_props"/> */}
                          </div>
                     </Grid>
               </Grid>  
                
        </div>
    )
}
const mapStateToProps = (state) =>
({
   QuestionData:state.Reducer.QuestionData || [],
   proposal: state.StateReducer.ProposalData || [],
});
export default connect(mapStateToProps)(MedicalHistory);