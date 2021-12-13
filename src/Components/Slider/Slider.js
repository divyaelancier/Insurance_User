import React, { useState} from "react";
import {NavLink} from 'react-router-dom'
import {Row,Col} from 'antd';
import Slider from "react-slick";
import './Slider.scss'
const SampleNextArrow = props => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: 'block',fontSize:"35px",right:"-37px",color:"#83AF40"}}
      onClick={onClick}
    />
  )
}

const SamplePrevArrow = props => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: 'block'}}
      onClick={onClick}
    />
  )
}


const SliderComp = (props) => {
 
  const settings = {
    dots:true,
    slidesToShow:1,
    slidesToScroll: 1,
    draggable:true,
    // rows:2,
    // swipe:true,
    initialSlide: 0,
    // adaptiveHeight:true,
    infinite: false,
    // slide:"div" 
    // autoplaySpeed: 3000,
    autoplay:false,
    cssEase: "linear",
    // swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: false,
          
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
    ],
    nextArrow: <SampleNextArrow />,
    
    
  }
    //  var settings = {
    //   dots: true,
    //   infinite: true,
    //   speed: 500,
    //   slidesToShow: 1,
    //   slidesToScroll: 2,
    //   autoplaySpeed: 30000
    // };
  return (
    <div className="carosal_root_div">
     {/* <Row justify="center">
        <Col span={20}  justify="center"> */}
          <Slider  {...settings} autoplay>
               
               {props.children}
            
          </Slider>
          {/* </Col>
      </Row> */}
      
    </div>
  )
}

export default SliderComp;




// import React from "react";
// import Slider from "react-slick";

// export default function SliderComp() {
//   var settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1
//   };
//   return (
//     <Slider {...settings}>
//       <div>
//         <h3>1</h3>
//       </div>
//       <div>
//         <h3>2</h3>
//       </div>
//       <div>
//         <h3>3</h3>
//       </div>
//       <div>
//         <h3>4</h3>
//       </div>
//       <div>
//         <h3>5</h3>
//       </div>
//       <div>
//         <h3>6</h3>
//       </div>
//     </Slider>
//   );
// }