import React,{Component} from "react";
import {Link} from "react-router-dom";
import http from "./httpCovid";
import queryString from "query-string";

class CovidHome extends Component
{
state={
    mainCaseInfo:[],
    selValue:{
        continent:"",country:""
    },
    sortIndex:-1,
};

async componentDidMount()
{
    this.fetchData();
}

async fetchData()
{
    console.log("Hello");
   let response=await http.get("");
    let {data}=response;
    this.setState({mainCaseInfo:data});
   
}
async componentDidUpdate(prevProps,prevState)
{
   if(prevProps!==this.props)
   {
       this.fetchData();
   }
}

getAlldifferentContinent=()=>
{
    let {mainCaseInfo}=this.state;
    let arr= mainCaseInfo.length>0 ?mainCaseInfo.reduce((acc,cur)=>acc.find((ac)=>ac===cur["continent"]) ?
    acc : [...acc,cur["continent"]],[]):[];
    return arr;
}
getAllDifferentCountries=(continent,arr)=>
{
    let arr1= arr.reduce((acc,cur)=>cur.continent===continent ? [...acc,cur["country"]] :acc,[]);
    return arr1;
}
makeFilter=()=>
{
    let {mainCaseInfo}=this.state;
    let  queryParams=queryString.parse(this.props.location.search);
    let {continent="",country=""}=queryParams;
    let arr1=this.getAlldifferentContinent();
    console.log(arr1);
    let arr2=this.getAllDifferentCountries(continent,mainCaseInfo);
    return(<div className="container">
    <div className="row">
        <div className="col-3">
        <h5 className="text-dark">Search :</h5>
            </div>
            <div className="col-3">
             <div className="form-group">
                 <select className="form-control" value={queryParams.continent} name="continent" onChange={this.handleChange}>
                     <option value="">Select Continent</option>
                     {arr1.map((cont)=><option >{cont}</option>)}
                    </select>
                 </div>
                </div>
                <div className="col-3">
            <div className="form-group">
                 <select className="form-control" value={queryParams.country} name="country" onChange={this.handleChange}>
                     <option value="">Select Country</option>
                     {continent ?  arr2.map((cont)=><option >{cont}</option>) : ""}
                    </select>
                 </div>
            </div>
           
          
            </div>
            </div>);
   
}

handleChange=(e)=>
{
     let {currentTarget : input}=e;
     let queryParams=queryString.parse(this.props.location.search);
     queryParams[input.name]=input.value;
     this.callURL("/all",queryParams);
     console.log(queryParams);
}



callURL=(url,option)=>
       {

          let searchString=this.makeSerchstring(option);
          this.props.history.push({
              pathname:url,
              search:searchString,
          });
       }


       
    makeSerchstring(queryParams)
    {
        
      let {continent,country}=queryParams;
      let searchString="";
     
      searchString=this.addToQueryString(searchString,"continent",continent);
      searchString=this.addToQueryString(searchString,"country",country);
     return searchString;
    
    }
    
    
    addToQueryString=(str,name,value)=>
      value ? str ? `${str}&${name}=${value}`:
       `${name}=${value}` : str ;


sortByIndex=(index,arr)=>
{
    console.log("Sort index");
    let arr1=index===0 ? arr.sort((n1,n2)=>n1.country.localeCompare(n2.country)) :
    index===1 ? arr.sort((n1,n2)=>n1.cases-n2.cases) : index===2 ?
    arr.sort((n1,n2)=>n1.active-n2.active) :index===3 ? arr.sort((n1,n2)=>n1.todayCases-n2.todayCases) :
    index===4 ? arr.sort((n1,n2)=>n1.todayRecovered-n2.todayRecovered) : arr;
    return arr1;
}

getCaseTable=()=>
{
    let {mainCaseInfo,sortIndex}=this.state;
    let queryParams=queryString.parse(this.props.location.search);
    let {cases,active,activePerOneMillion,casesPerOneMillion,continent,country,critical,criticalPerOneMillion,deaths,deathsPerOneMillion,
        oneCasePerPeople,oneDeathPerPeople,oneTestPerPeople,population,recovered,recoveredPerOneMillion,tests,testsPerOneMillion,
        todayCases,todayDeaths,todayRecovered,updated}=mainCaseInfo;
        let arr1=this.filterqueryParams(mainCaseInfo,queryParams);
        let arr2= sortIndex>=0 ? this.sortByIndex(sortIndex,arr1) : arr1;
        console.log(arr1);
        return (<React.Fragment>
            <div className="row bg-dark text-center text-white">
                <div className="col-2" onClick={()=>this.sortHandler(0)}>Country</div>
                <div className="col-2" onClick={()=>this.sortHandler(1)}>Total Cases</div>
                <div className="col-2" onClick={()=>this.sortHandler(2)}>Active</div>
                <div className="col-2" onClick={()=>this.sortHandler(3)}>todaysCases</div>
                <div className="col-2" onClick={()=>this.sortHandler(4)}>todaysRecovered</div>
                <div className="col-2">DetailsInfo</div>
                </div>
         {arr2.map((cs)=>
         
            <div className="row text-center text-dark border border-muted">
            <div className="col-2">{cs.country}</div>
            <div className="col-2">{cs.cases}</div>
            <div className="col-2">{cs.active}</div>
            <div className="col-2">{cs.todayCases}</div>
            <div className="col-2">{cs.todayRecovered}</div>
            <div className="col-2"><button className="btn btn-info"><Link to={`/all/${cs.country}`}>More</Link></button></div>
            </div>
          )}
        </React.Fragment>);
}

sortHandler=(ind)=>
{
console.log("Sort");
let s1={...this.state};
s1.sortIndex=ind;
this.setState(s1);  
}


filterqueryParams=(arr,queryParams)=>
{
   let {continent,country}=queryParams;
  // let {tech}=this.props.match.params;
   arr= this.filterqueryParam(arr,"continent",continent); 
   arr= this.filterqueryParam(arr,"country",country);  
    return arr;
}
filterqueryParam=(arr,paramName,paramValue)=>
{
    if(!paramValue)
    return arr;
   // let valueArr= paramValue.split(",");
   // let arr1= arr.filter((lt) => valueArr.find((br)=>br===lt[paramName]));
   let arr1=arr.filter((lt)=>lt[paramName]===paramValue);
    return arr1;   
}




render()
{
    let {cases,active,activePerOneMillion,casesPerOneMillion,continent,country,critical,criticalPerOneMillion,deaths,deathsPerOneMillion,
        oneCasePerPeople,oneDeathPerPeople,oneTestPerPeople,population,recovered,recoveredPerOneMillion,tests,testsPerOneMillion,
        todayCases,todayDeaths,todayRecovered,updated}=this.state.mainCaseInfo;
    return(<React.Fragment>
        <div className="container">
            {this.makeFilter()}
       {this.getCaseTable()}
       </div>
    </React.Fragment>);
}
}
export default CovidHome;