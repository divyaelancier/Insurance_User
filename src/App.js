import logo from './logo.svg';
import './App.scss';
import React,{useEffect, useState} from 'react'
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.min.css';
// import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Routes from './Routes/Route'
import { AuthContext } from './context/auth'
import axios from 'axios'
// import { isMobile } from "react-device-detect";

function App() {
  const existingTokens = JSON.parse(localStorage.getItem("data"));
const [authTokens, setAuthTokens] = useState(existingTokens);
const setTokens=(data)=>{
  localStorage.setItem("data",JSON.stringify(data));
  localStorage.setItem("userId",JSON.stringify(data.id))
  setAuthTokens(data);
}

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
       <Routes/>
    </AuthContext.Provider>
  
  );
}

export default App;


