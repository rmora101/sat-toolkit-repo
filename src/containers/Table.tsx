import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import axios from 'axios';  
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import {useEffect} from 'react';
// import axios from 'axios';
// import {SelectLables} from './Stateselect.tsx'

function createData(
  name: string,
  Result: string, 
) {
  return { name, Result};
}
export default function BasicTable() {

    const [selectedStateId, setSelectedStateId] = React.useState('');
    const [selectedArea, setSelectedArea] = React.useState('');
    const [areas, setAreas] = React.useState([]);
    const [states, setStates] = React.useState([]);

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedStateId(event.target.value);
        // setSelectedArea(event.target.value);
    };


    useEffect(() => {
        const fetchStates = async () => {
        const defaultStates = await getStates();
        setStates(defaultStates);
        };
        fetchStates();
    }, []);

    const getStates = () => {
        const response = axios.get("https://api.census.gov/data/2016/acs/acs1?get=NAME&for=state:*")
            .then((response) => {
                const states = []
                for (let data of response.data) {
                    const name = data[0];   // Accessing the "NAME" field
                    const state = data[1];  // Accessing the "state" field
                    const stateData = {'stateName': name, 'stateId': state};
                    states.push(stateData)
                }
                console.log(states);
                return states
            })
            .catch(() => {return'hello'});
            return response
    }
    useEffect(() => {
        const fetchArea = async () => {
        if (selectedStateId) {
            try {
            const response = await axios.get(
                `https://api.census.gov/data/2021/acs/acs1?get=NAME,B01001_001E&for=public%20use%20microdata%20area:*&in=state:${selectedStateId}`
            );
            const areasData = response.data.map((data) => ({ areaName: data[0], areaCode: data[3] }));
            setAreas(areasData);
                console.log(areas);
            } catch (error) {
            console.log(error);
            }
        }
        };
        // setAreas(fetchArea);
        fetchArea();
        }, [selectedStateId]);



  const [statsIncomeAndRace, setStatsIncomeAndRace] = React.useState([]);
  const [statsPopulation, setStatsPopulation] = React.useState([]);

  useEffect(() => {
    const fetchIncomeRace = async () => {
        const defaultStats = await getIncomeRace();
        setStatsIncomeAndRace(defaultStats);
    };
    fetchIncomeRace();
  }, []);

  useEffect(() => {
    const fetchPop = async () => {
      const defaultPop = await getPopulation();
      setStatsPopulation(defaultPop)
      
    };
    fetchPop();
    },[])

  const getIncomeRace = () => {
    const response = axios.get(`https://api.census.gov/data/2021/acs/acs1/profile?get=NAME,DP03_0062E,DP05_0078PE,DP05_0071PE,DP05_0037PE,DP05_0044PE,DP05_0039PE&for=public%20use%20microdata%20area:*&in=state:04`)
    .then((response) => {
        const stats = []
        for (let data of response.data) {
            const Income = data[1];   // Accessing the "DP03_0062E" field
            const AAmerican = data[2];
            const Hispanic = data[3];
            const Caucasian = data[4]
            const Asian = data[5]
            const Indigenous = data[6]
            const IncomeAndRace = {'INCOME': Income, 'AAMERICAN': AAmerican, 'HISPANIC': Hispanic, 'CAUCASIAN': Caucasian, 'ASIAN': Asian, 'Indigenous': Indigenous }
            stats.push(IncomeAndRace)
        }
        return stats
    })
    .catch(console.error);
    return response
  }

  const getPopulation = () => {
    const response = axios.get(`https://api.census.gov/data/2021/acs/acs1?get=NAME,B01001_001E&for=public%20use%20microdata%20area:00119&in=state:04`)
    .then((response) => {
        const population = []
        for (let data of response.data) {
            const popIncome = data[1];   // Accessing the "DP03_0062E" field
            const popDict = {'POPULATION':popIncome}
            // console.log(`INCOME: ${incomeData}`);
            population.push(popDict)
        }
        console.log(population)
        return population
    })
    .catch(console.error);
    return response
}



  const secondRowValues = statsIncomeAndRace.length > 1 ? statsIncomeAndRace[1] : [];
  const secondRowPop = statsPopulation.length > 1 ? statsPopulation[1] :[];
  // console.log(secondRowValues)

  const rows = [
    createData('Median Household Income', secondRowValues['INCOME']),
    createData('Population', secondRowPop['POPULATION']),
    createData('African American (%)', secondRowValues['AAMERICAN']),
    createData('Hispanic (%)', secondRowValues['HISPANIC']),
    createData('Caucasian (%)', secondRowValues['CAUCASIAN']),
    createData('Asian (%)', secondRowValues['ASIAN']),
    createData('Indigenous (%)', secondRowValues['Indigenous'])
  ];

  return (
    <section id='all-data'>
    <div>
      {statsIncomeAndRace.length > 0 ? (
        <TableContainer component={Paper} sx={{ m:1, minWidth: 750, height:450}}>
          <Table sx={{ minWidth: 300 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Data Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }} align="right">
                  Result
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.Result}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>Currently loading data.</p>
      )}
    </div>
    <div>
    <FormControl sx={{ m: 1, minWidth: 170, height:200}}>
            <InputLabel id="demo-simple-select-helper-label">State</InputLabel>
            <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={selectedStateId}
            label="states"
            onChange={handleChange}
            style={{height:'80px'}}
            >
            {states.map((state) => (
                <MenuItem key={state['stateId']} value={state['stateId']}>
                {state['stateName']}
                </MenuItem>
            ))} 
            </Select>
            <FormHelperText>Required</FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 170, height:200}}>
            <InputLabel id="demo-simple-select-helper-label">Area</InputLabel>
            <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={selectedArea}
            label="areas"
            onChange={(event) => setSelectedArea(event.target.value)}
            style={{height:'80px'}}
            >
                {areas.map((area) => (
                <MenuItem key={area['areaCode']} value={area['areaCode']}>
                {area['areaName']}
                </MenuItem>
            ))} 
            </Select>
            <FormHelperText>Required</FormHelperText>
        </FormControl>
    </div>
    </section>
  );
}
