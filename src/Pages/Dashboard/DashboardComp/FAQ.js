// import React, { useEffect, useState } from 'react'
// import { usedispatch,connect, useDispatch } from 'react-redux'
// import { get_Faq } from '../../../redux/actions/AllAction'
//  function FAQ(props){
//    let dispatch=useDispatch()
//    const [FaqDetails,setFaqDetails]=useState([])
//   useEffect(()=>{
//    dispatch(get_Faq())
//   },[])
//   useEffect(()=>{
//     let Data=[]
//     props.FaqData&&props.FaqData.map((data)=>{
//         Data.push(data)
//     })                     
//     setFaqDetails(Data)  
// },[props.FaqData])
//     return(
//         <div>
//         <div><h3>FAQ</h3></div>
//         {FaqDetails.map((data,index)=>{   
// <div class="accordion" id="accordionExample">
//   <div class="accordion-item">
//     <h2 class="accordion-header" id={index}>
//       <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
//        {data.question+"?"}
//       </button>
//     </h2>
//     <div id={index} class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
//       <div class="accordion-body">
//         <strong>Answer</strong> {data.answer}
//       </div>
//     </div>
//   </div>
// </div>

//         })}
// </div>
// )
// }

import React,{useState,useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { usedispatch,connect, useDispatch } from 'react-redux'
import { get_Faq } from '../../../redux/actions/AllAction'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

 function FAQ(props) {
  const [expanded, setExpanded] = React.useState('panel0');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  let dispatch=useDispatch()
  const [FaqDetails,setFaqDetails]=useState([])
 useEffect(()=>{
  dispatch(get_Faq())
 },[])
 useEffect(()=>{
   let Data=[]
   props.FaqData&&props.FaqData.map((data)=>{
       Data.push(data)
   })                     
   setFaqDetails(Data)  
},[props.FaqData])
  return (
    <div>
      <h3>FAQ</h3>
      {FaqDetails.map((data,index)=>{
        return(
          <>
          {data.status===1&&
      <Accordion square expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
        <AccordionSummary 
        aria-controls="panel1d-content" id="panel1d-header"
        expandIcon={<ExpandMoreIcon />}
        >
          <Typography>{data.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           <b>Answer</b>:{data.answer}
          </Typography>
        </AccordionDetails>
      </Accordion>
          }
          </>
        )
      })}
    </div>
  );
}
const mapStateToProps = (state) =>
({
   FaqData:state.Reducer.Get_FAQ || []
});
export default connect(mapStateToProps)(FAQ);