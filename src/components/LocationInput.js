import axios from "axios";
// import {selectedStateId} from "../containers/Stateselect.tsx";

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

// create a conditional where the second dropdown does not work until state id variable has a number.

// export const getArea = () => {
//     axios.get(`https://api.census.gov/data/2021/acs/acs1?get=NAME,B01001_001E&for=public%20use%20microdata%20area:*&in=state:${selectedStateId}`)
//     .then((response) => {
//         const areas = []
//         for (let data of response.data) {
//             const name = data[0];   // Accessing the "NAME" field
//             const population = data[1];  // Accessing the "state" number field
//             const state = data[2]; // access state code
//             const microDataArea = data[3]; // access micro area code
//             const areaData = {}
//             return(console.log(`NAME: ${name}, STATE: ${state}, POPULATION:${population}, CITY_CODE:${microDataArea}`));
//         }
//     })
//     .catch(console.error);
// }

// export const getIncomeRace = () => {
//     const response = axios.get(`https://api.census.gov/data/2021/acs/acs1/profile?get=NAME,DP03_0062E,DP05_0078PE,DP05_0071PE,DP05_0037PE,DP05_0044PE,DP05_0039PE&for=public%20use%20microdata%20area:00112&in=state:04`)
//     .then((response) => {
//         const stats = []
//         for (let data of response.data) {
//             const Income = data[1];   // Accessing the "DP03_0062E" field
//             const AAmerican = data[2];
//             const Hispanic = data[3];
//             const Caucasian = data[4]
//             const Asian = data[5]
//             const Indigenous = data[6]
//             const IncomeAndRace = {'INCOME': Income, 'AAMERICAN': AAmerican, 'HISPANIC': Hispanic, 'CAUCASIAN': Caucasian, 'ASIAN': Asian, 'Indigenous': Indigenous }
//             console.log(Income);
//             stats.push(IncomeAndRace)
//         }
//         return stats
//     })
//     .catch(console.error);
//     return response
// }

export const getPopulation = () => {
    const response = axios.get(`https://api.census.gov/data/2021/acs/acs1?get=NAME,B01001_001E&for=public%20use%20microdata%20area:00119&in=state:04`)
    .then((response) => {
        const population = []
        for (let data of response.data) {
            const popIncome = data[1];   // Accessing the "DP03_0062E" field
            // console.log(`INCOME: ${incomeData}`);
            population.push(popIncome)
        }
        return population
    })
    .catch(console.error);
    return response
}