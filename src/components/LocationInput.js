import axios from "axios";
const URL = "https://api.census.gov/data/2021/acs/acs1?get=NAME,B01001_001E&for=public%20use%20microdata%20area:*&in=state:04"
const authToken = process.env.CENSUS_TOKEN;

export const getStates = () => {

    const response = axios.get("https://api.census.gov/data/2016/acs/acs1?get=NAME&for=state:*")
        .then((response) => {
            const states = []
            for (let data of response.data) {
                const name = data[0];   // Accessing the "NAME" field
                const state = data[1];  // Accessing the "state" field
                const stateData = {'stateName': name, 'stateId': state};
                states.push(stateData)
            }
            return states
        })
        .catch(() => {return'hello'});
        return response
}

// export const getArea = () => {
//     axios.get("https://api.census.gov/data/2021/acs/acs1?get=NAME,B01001_001E&for=public%20use%20microdata%20area:*&in=state:04")
//     .then((response) => {
//         const areas = []
//         for (let data of response.data) {
//             const name = data[0];   // Accessing the "NAME" field
//             const population = data[1];  // Accessing the "state" number field
//             const state = data[2]; // access state code
//             const microDataArea = data[3]; // access micro area code
//             return(console.log(`NAME: ${name}, STATE: ${state}, POPULATION:${population}, CITY_CODE:${microDataArea}`));
//         }
//     })
//     .catch(console.error);
// }