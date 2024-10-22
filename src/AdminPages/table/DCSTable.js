import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BasicMenu from "../../ui-component/menu";

import Swal from "sweetalert2";

import api from "../../API/api";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.blue,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function DCSTable({ data, getAdmins }) {



  return (
    <Paper className="p-2">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>SL No</StyledTableCell>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Registration no</StyledTableCell>
              <StyledTableCell>District</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Password</StyledTableCell>
              {/* <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell>{row.uid}</StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.registration_no}</StyledTableCell>
                  <StyledTableCell>{row.district}</StyledTableCell>
                  <StyledTableCell>{row.address}</StyledTableCell>

                  <StyledTableCell>------</StyledTableCell>
                  {/* <StyledTableCell>
                    {row.status === 'Active' && <div className="bg-success text-center text-white rounded">Active</div> }
                    {row.status === 'Inactive' && <div className="bg-danger text-center text-white rounded">Inactive</div> }
                    </StyledTableCell> */}
                  {/* <StyledTableCell>
                    <BasicMenu menuItems={menuItems(row)} />
                  </StyledTableCell> */}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
