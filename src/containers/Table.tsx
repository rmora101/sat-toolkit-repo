import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getIncomeRace} from '../components/LocationInput';
import { useEffect } from 'react';


function createData(
  name: string,
  Result: string, 
) {
  return { name, Result};
}
export default function BasicTable() {
  const [statsIncomeAndRace, setStatsIncomeAndRace] = React.useState([]);

  useEffect(() => {
    const fetchIncomeRace = async () => {
      try {
        const defaultStats = await getIncomeRace();
        setStatsIncomeAndRace(defaultStats);
      } catch (error) {
        console.error(error);
        setStatsIncomeAndRace([]); // Set an empty array to handle errors
      }
    };
    fetchIncomeRace();
  }, []);

  const secondRowValues = statsIncomeAndRace.length > 1 ? statsIncomeAndRace[1] : [];
  console.log(secondRowValues)

const rows = [
  createData('Income', secondRowValues['INCOME']),
  createData('African American (%)', secondRowValues['AAMERICAN']),
  createData('Hispanic (%)', secondRowValues['HISPANIC']),
  createData('Caucasian (%)', secondRowValues['CAUCASIAN']),
];

  return (
    <div>
      {statsIncomeAndRace.length > 0 ? (
        <TableContainer component={Paper} sx={{ width: '40%' }}>
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
      ) : (
        <p>Currently loading data. will hold place when user wants to select state</p>
      )}
    </div>
  );
}
