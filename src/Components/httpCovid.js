import axios from "axios";

const baseURL="https://disease.sh/v3/covid-19/countries";

function get(url)
{
   return axios.get(baseURL + url);
}

export default{
    get,
}