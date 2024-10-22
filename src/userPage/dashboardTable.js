import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';

function createData(month, liter, amount) {
  return { month, liter, amount };
}

const rows = [
  createData('January', 150, 300),
  createData('February', 180, 360),
  createData('March', 200, 400),
  createData('April', 170, 340),
  createData('May', 160, 320),
];

const UserDashboardTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Month</TableCell>
            <TableCell align="right">Liter</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.month}>
              <TableCell component="th" scope="row">
                {row.month}
              </TableCell>
              <TableCell align="right">{row.liter}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserDashboardTable;
