import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getIncome } from '../components/LocationInput';
import { useEffect } from 'react';


function createData(
  name: string,
  Result: number, 
) {
  return { name, Result};
}

const rows = [
  createData('Income', 100000),
  createData('Population',50000),
  createData('race 1 (%)', 10),
  createData('race 2', 3)
];

export default function BasicTable() {
  const [incomeStats, setIncomeStats] = React.useState('');

  const handleChange = (event) => {
    setIncomeStats(event.target.value);
  };

  // const [states, setStates] = React.useState([]);

  useEffect(() => {
    const fetchIncome = async () => {
      const defaultIncome = await getIncome();
      setIncomeStats(defaultIncome);
    };
    fetchIncome();
  }, []);
  return (
    <div>
    <TableContainer component={Paper} sx={{ width:'25%' }} >
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
    <p>{incomeStats}</p>
    </div>
  );
}

