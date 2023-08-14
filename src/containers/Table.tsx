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

const authToken = process.env.REACT_APP_CENSUS_TOKEN;
console.log(authToken);

export default function BasicTable() {

    const [selectedStateId, setSelectedStateId] = React.useState('');
    const [selectedArea, setSelectedArea] = React.useState('');
    const [areas, setAreas] = React.useState([]);
    const [states, setStates] = React.useState([]);
    const [statsIncomeAndRace, setStatsIncomeAndRace] = React.useState([]);
    const [statsPopulation, setStatsPopulation] = React.useState([]);
  
    const handleChange = (event: SelectChangeEvent) => {
        setSelectedStateId(event.target.value);
        setSelectedArea(event.target.value);
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
                // console.log(states);
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
                `https://api.census.gov/data/2021/acs/acs1?get=NAME,B01001_001E&for=public%20use%20microdata%20area:*&in=state:${selectedStateId}&key=${authToken}`
            );
            const areasData = response.data.map((data) => ({ areaName: data[0], areaCode: data[3] }));
            setAreas(areasData);
                // console.log(areas);
            } catch (error) {
            console.log(error);
            }
        }
        };
        fetchArea();
        }, [selectedStateId]);

  useEffect(() => {
        const fetchIncomeRace = async () => {
        if (selectedStateId && selectedArea) {
            try {
            const response = await axios.get(
              `https://api.census.gov/data/2021/acs/acs1/profile?get=NAME,DP03_0062E,DP05_0078PE,DP05_0071PE,DP05_0037PE,DP05_0044PE,DP05_0039PE&for=public%20use%20microdata%20area:${selectedArea}&in=state:${selectedStateId}&key=${authToken}`
            );
            const stats = []
        for (let data of response.data) {
            const Income = data[1];   // Accessing the "DP03_0062E" field
            const AAmerican = data[2];
            const Hispanic = data[3];
            const Caucasian = data[4]
            const Asian = data[5]
            const Indigenous = data[6]
            const IncomeAndRace = {'INCOME': Income, 'AAMERICAN': AAmerican, 'HISPANIC': Hispanic, 'CAUCASIAN': Caucasian, 'ASIAN': Asian, 'Indigenous': Indigenous }
            stats.push(IncomeAndRace)}
            
            console.log(stats);
            setStatsIncomeAndRace(stats);
            } catch (error) {
            console.log(error);
            }
        }
        };
        fetchIncomeRace();
        }, [selectedArea,selectedStateId]);
  
  useEffect(() => {
          const fetchPop = async () => {
          if (selectedStateId && selectedArea) {
              try {
              const response = await axios.get(
                `https://api.census.gov/data/2021/acs/acs1?get=NAME,B01001_001E&for=public%20use%20microdata%20area:${selectedArea}&in=state:${selectedStateId}&key=${authToken}`
              );
              const population = []
              for (let data of response.data) {
                  const popIncome = data[1];   // Accessing the "DP03_0062E" field
                  const popDict = {'POPULATION':popIncome}
                  population.push(popDict)}
                  console.log(population);
              setStatsPopulation(population)
              } catch (error) {
              console.log(error);
              }
          }
          };
          fetchPop();
          }, [selectedArea,selectedStateId]);

function createData(
  name: string,
  Result: string, 
) {
  return { name, Result};
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
    <div id='table'>
      {statsIncomeAndRace.length > 0 ? (
        <TableContainer component={Paper} sx={{ m:1, minWidth: 750, height:426}} >
          <Table sx={{ minWidth: 300 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Data Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }} align="right">
                  Result
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
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
        <p>*Select state and area to view table</p>
      )}
    </div>
    <div id='menu'>
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
        <FormControl sx={{ m: 1, minWidth: 250, height:200}}>
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
