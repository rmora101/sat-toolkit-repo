import axios from "axios";
const URL = "https://api.census.gov/data/2021/acs/acs1?get=NAME,B01001_001E&for=public%20use%20microdata%20area:*&in=state:04"
const authToken = process.env.CENSUS_TOKEN;


axios.get("https://api.census.gov/data/2016/acs/acs1?get=NAME&for=state:*")
    .then((response) => {
        for (let data of response.data) {
            const name = data[0];   // Accessing the "NAME" field
            const state = data[1];  // Accessing the "state" field
            console.log(`Name: ${name}, State: ${state}`);
        }
    })
    .catch(console.error);

    axios.get("https://api.census.gov/data/2021/acs/acs1?get=NAME,B01001_001E&for=public%20use%20microdata%20area:*&in=state:04")
    .then((response) => {
        for (let data of response.data) {
            const name = data[0];   // Accessing the "NAME" field
            const population = data[1];  // Accessing the "state" number field
            const state = data[2]; // access state code
            const microDataArea = data[3]; // access micro area code
            return(console.log(`NAME: ${name}, STATE: ${state}, POPULATION:${population}, CITY_CODE:${microDataArea}`));
        }
    })
    .catch(console.error);