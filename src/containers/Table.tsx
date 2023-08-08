import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getIncomeRace,getIncome, getPopulation } from '../components/LocationInput';
import { useEffect } from 'react';


function createData(
  name: string,
  Result: string, 
) {
  return { name, Result};
}

const rows = [
  createData('Income', 'p'),
];

export default function BasicTable() {
  const [statsIncomeAndRace, setStatsIncomeAndRace] = React.useState([]);

  const handleChange = (event) => {
    setStatsIncomeAndRace(event.target.value);
  };
  // const [states, setStates] = React.useState([]);
  useEffect(() => {
    const fetchIncomeRace = async () => {
      const defaultStats = await getIncomeRace();
      setStatsIncomeAndRace(defaultStats);
      // console.log( typeof defaultStats)
    };
    fetchIncomeRace();
  }, []);



  // useEffect(() => {
  //   const fetchPop = async () => {
  //     const defaultPop = await getPopulation();
  //     setStatsIncomeAndRace(defaultPop);
  //   };
  //   fetchPop();
  // }, []);
  

  // console.log(typeof statsIncomeAndRace)

  return (
    <div>
    <TableContainer component={Paper} sx={{ width:'40%' }} >
      <Table sx={{ minWidth: 300,  }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight: 'bold'}}>Data Name</TableCell>
            <TableCell style={{fontWeight: 'bold'}} align="right">Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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

    <p>{statsIncomeAndRace[1]['HISPANIC']}</p>

    </div>
  );
}