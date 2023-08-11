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

function createData(
  name: string,
  Result: string, 
) {
  return { name, Result};
}
export default function BasicTable() {
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
    const response = axios.get(`https://api.census.gov/data/2021/acs/acs1/profile?get=NAME,DP03_0062E,DP05_0078PE,DP05_0071PE,DP05_0037PE,DP05_0044PE,DP05_0039PE&for=public%20use%20microdata%20area:00112&in=state:04`)
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
    createData('Population', secondRowPop['POPULATION']),
    createData('Median Household Income', secondRowValues['INCOME']),
    createData('African American (%)', secondRowValues['AAMERICAN']),
    createData('Hispanic (%)', secondRowValues['HISPANIC']),
    createData('Caucasian (%)', secondRowValues['CAUCASIAN']),
    createData('Asian (%)', secondRowValues['ASIAN']),
    createData('Indigenous (%)', secondRowValues['Indigenous'])
  ];

  return (
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
  );
}
