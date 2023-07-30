import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  name: string,
  Population: number,
  Income: number,
  carbs: number,
  protein: number,
) {
  return { name, Population, Income, carbs, protein };
}

const rows = [
  createData('Data 1', 159, 6.0, 24, 4.0)
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Data Name</TableCell>
            <TableCell align="right">Result</TableCell>
          </TableRow>
          <TableRow>
          <TableCell>Population</TableCell>
          </TableRow>
          <TableRow>
          <TableCell>Income</TableCell>
          </TableRow>
          <TableRow>
          <TableCell>Race: African American/Black</TableCell>
          </TableRow>
          <TableRow>
          <TableCell>Race: Race 2 </TableCell>
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
              <TableCell align="right">{row.Population}</TableCell>
              <TableCell align="right">{row.Income}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

