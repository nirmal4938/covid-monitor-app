import React,{Component} from "react";
import Navbar from "./navbarCovid";
import CovidHome from "./covidHome";
import CovidByCountries from "./covidByCountries";
import {Route , Switch ,Redirect} from "react-router-dom";
class CovidMain extends Component
{

    state={};



    render()
    {
        return(<React.Fragment>
           <Navbar/>
           <Switch>
               
              
               <Route path="/all/:country" component={CovidByCountries}/>
               <Route path="/all" component={CovidHome}/>
               <Redirect from="/" to="/all"/>
           </Switch>
    </React.Fragment>);
    }
};
export default CovidMain;