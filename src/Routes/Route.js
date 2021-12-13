import React from 'react'
import HomePageLayout from '../Pages/HomePage/Homepage'
import HomepageContent from '../Pages/HomePage/HomepageContent'
import { BrowserRouter as Router, Switch, Route,HashRouter } from "react-router-dom";
import LifePoliciesComp from '../Pages/MoreProducts/LifePolicies'
import TermInsurance from '../Pages/TermInsurance/TermInsurance'
import MedicalHistory from '../Pages/TermInsurance/MedicalHistory'
import BasicInformation from '../Pages/TermInsurance/BasicInformation'
import InformationDetails from '../Pages/TermInsurance/InformationDetails'
import MedicalTest from '../Pages/TermInsurance/MedicalTest'
import Review from '../Pages/TermInsurance/Review'
import Dashboard from '../Pages/Dashboard/Dashboard'
import Mypolicies from '../Pages/Dashboard/DashboardComp/Mypolicies'
import MotorInsurance from '../Pages/MotorInsurance/MotorInsurance'
import MotorInformation from '../Pages/MotorInsurance/MotorInformationDetails'
import TravelInsurance from '../Pages/MotorInsurance/Travel_Insurance'
import Travel_InformationDetails from '../Pages/MotorInsurance/TravelInsuranceForm'
import OfflinePolicyView from '../Pages/MoreProducts/OfflinepolicyView'
import Login from '../Pages/Login/Login'
import MoreProducts from '../Pages/MoreProducts/MoreProducts'
import ViewModal from '../Pages/Dashboard/DashboardComp/PolicyView/ViewModal'


import FAQ from "../Pages/Dashboard/DashboardComp/FAQ";
import Myprofile from '../Pages/Dashboard/DashboardComp/Myprofile'
import MyClaimes from '../Pages/Dashboard/DashboardComp/MyCliams'
import MyQuotes from '../Pages/Dashboard/DashboardComp/MyQuotes'
import BranchLocator from '../Pages/Dashboard/DashboardComp/BranchLocator' 
import ServiceRequest from '../Pages/Dashboard/DashboardComp/ServiceRequest'
// import LineStyleIcon from '@mui/icons-material/LineStyle';
import MyPolicySRequest from '../Pages/Dashboard/DashboardComp/MypolicyRequest'
import AddCustomers from '../Pages/Dashboard/DashboardComp/AddCustomers'
var hashHistory = require('react-router-redux')

export default function Routes(props) {
    
    return (
        <HashRouter>
            <HomePageLayout>
                <Switch location={props.location}>
                    <Route path="/" component={HomepageContent} exact/>
                    <Route path='/lifepolicies' component={LifePoliciesComp}/>
                    <Route path='/terminsurance'component={TermInsurance}/>
                    <Route path="/medicalhistory" component={MedicalHistory}/>
                    <Route path="/basicinformation" component={BasicInformation}/>
                    <Route path="/informationdetails" component={InformationDetails} />
                    <Route path="/medicaltest" component={MedicalTest} />
                    <Route path="/Review" component={Review} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/motorinsurance" component={MotorInsurance} />
                    <Route path="/motorinsurance_informations" component={MotorInformation} />
                    <Route path="/travelpolicy_insurance" component={TravelInsurance} />
                    <Route path="/travel_policy_informations" component={Travel_InformationDetails} />
                    <Route path="/Policyview" component={OfflinePolicyView} />
                    <Route path="/login" component={Login} />
                    <Route path="/products" component={MoreProducts} />
                    <Route path="/viewmodal" component={ViewModal} />
                    <Route path={"/Mypolicies"} component={Mypolicies} />
                    <Route path={"/faq"} component={FAQ}/>
                    <Route path={"/myprofile"} component={Myprofile}/>
                    <Route path={"/myclaimes"} component={MyClaimes}/>
                   <Route path={"/myquotes"} component={MyQuotes}/>
                   <Route path={"/branchlocator"} component={BranchLocator}/>
                   <Route path={"/servicerequest"} component={ServiceRequest}/> 
                   <Route path={"/mypolicyrequest"} component={MyPolicySRequest}/> 
                   <Route path={"/addcustomers"} component={AddCustomers}/>
                    
                    {/* <Route path="/informationdetail" component={InformationDetails} /> */}
                    {/* <Route path="/mypolicies" component={Mypolicies}/> */}
                </Switch>
          </HomePageLayout>
   </HashRouter>
)}