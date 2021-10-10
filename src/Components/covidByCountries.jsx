import React from "react";
import react,{Component} from "react";
import http from "./httpCovid";

class CovidByCountries extends Component
{
    state={
        countryData:{},
    };



    async componentDidMount()
    { let {country}=this.props.match.params;
    console.log(country);
    let response=await http.get(`/${country}`);
     let {data}=response;
     console.log(data);
    this.setState({countryData:data});
    }
    
    hadleGoHome=()=>
    {
        this.props.history.push("/all");
    }

    render()
    {
        let {countryData}=this.state;
        let {cases,active,activePerOneMillion,casesPerOneMillion,continent,country,critical,criticalPerOneMillion,deaths,deathsPerOneMillion,
            oneCasePerPeople,oneDeathPerPeople,oneTestPerPeople,population,recovered,recoveredPerOneMillion,tests,testsPerOneMillion,
            todayCases,todayDeaths,todayRecovered,updated,countryInfo}=countryData;
            console.log(countryInfo);
           
        return(<React.Fragment>
            <div className="container">
                <h3 className="text-center text-dark">Latest Details of {country}</h3>
                 <div className="row">
                

                <div className="col-8 mx-auto bg-light">
                    <div className="container text-center">
                       <h4>Total Cases : {cases}</h4><hr/>
                       <h4>Total Active : {active}</h4><hr/>
                       <h4>Total Active Per 1 Million : {activePerOneMillion}</h4><hr/>

                       <h4>Total Cases Per 1 Million : {casesPerOneMillion}</h4><hr/>
                       <h4>Total Critical Cases : {critical}</h4><hr/>
                       <h4>Total Critical Per 1 Million : {criticalPerOneMillion}</h4><hr/>
                       <h4>Total Death : {deaths}</h4><hr/>

                       <h4>Total Death Per 1 Millon : {deathsPerOneMillion}</h4><hr/>
                       <h4>1 Case Per People : {oneCasePerPeople}</h4><hr/>
                       <h4>1 Death Per People : {oneDeathPerPeople}</h4><hr/>

                       <h4>1 Test Per People : {oneTestPerPeople}</h4><hr/>
                       <h4>Total Population : {population}</h4><hr/>
                       <h4>Total Recovered : {recovered}</h4><hr/>

                        <h4>Recovered Per 1 Millon: {recoveredPerOneMillion}</h4><hr/>
                  
                        <h4>Total Tests : {tests}</h4><hr/>
                        <h4>Total Tests Per 1 Million : {testsPerOneMillion}</h4><hr/>
                        <h4 className="text-warning">Today's Cases : {todayCases}</h4><hr/>
                        <h4 className="text-danger">Today's Death : {todayDeaths}</h4><hr/>
                        <h4 className="text-success">Today's Recovered : {todayRecovered}</h4><hr/>
                        <h4 className="text-info">Updated : {updated}</h4><hr/>
                    </div>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={()=>this.hadleGoHome()}>Go Home</button>
                </div>
                </div>

        </React.Fragment>);
    }
}
export default CovidByCountries;