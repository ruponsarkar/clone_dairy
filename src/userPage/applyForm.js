import React, { useEffect, useState } from "react";
import {
  Container,
  Toolbar,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import api from "../API/api";
import Swal from "sweetalert2";

function ApplyForm() {
  const [data, setData] = useState();
  const [formData, setFormData] = useState({
    month: "",
    litter: "",
    applicationId: JSON.parse(sessionStorage.getItem("farmer")).applicationId,
    isApprove: "Pending",
    paymentStatus: "Pending",
  });

  useEffect(() => {
    getIndividualMonthlyReport();
  }, []);

  const getIndividualMonthlyReport = () => {
    api
      .getIndividualMonthlyReport(
        JSON.parse(sessionStorage.getItem("farmer")).applicationId
      )
      .then((res) => {
        console.log("responnn ", res);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err".err);
      });
  };

  const rows = [
    { date: "2024-08-10", liter: 50, amount: 1000, status: "Approved" },
    { date: "2024-08-11", liter: 30, amount: 600, status: "Pending" },
    { date: "2024-08-12", liter: 40, amount: 800, status: "Rejected" },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add form submission logic here
    if (!formData.litter || !formData.month) {
      Swal.fire("All files required !");
      return;
    }
    // return;
    handleSubmitMonthReport();
  };

  const handleSubmitMonthReport = () => {
    api
      .individualMonthlyReport(formData)
      .then((res) => {
        console.log("individualMonthlyReport ", res);
        if (res.data.status === 400) {
          Swal.fire({
            title: "Already Updated for this month!",
            text: "Double entry is not allowed",
            icon: "error",
          });
        }
        if (res.data.status === 200) {
          Swal.fire({
            title: "Added Successfully",
            text: "",
            icon: "success",
          });
        }
      })
      .catch((err) => {
        console.log("err :", err);
      });

    // postMonthlyReport
  };

  return (
    <div>
      <Toolbar sx={{ boxShadow: 3 }}>
        <Typography variant="h5" id="tableTitle" component="div">
          Apply Subsidy
        </Typography>
      </Toolbar>
      <Paper className="p-2">
        <Toolbar>
          <Typography variant="h6" id="tableTitle" component="div">
            Apply for new subsidy
          </Typography>
        </Toolbar>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            maxWidth: 800,
            margin: "0 auto",
            padding: 3,
            // boxShadow: 3,
            // borderRadius: 2,
            // backgroundColor: '#f9f9f9'
          }}
        >
          {/* <FormControl fullWidth size="small">
            <InputLabel id="month-label">Month</InputLabel>
            <Select
              labelId="month-label"
              id="month"
              name="month"
              value={formData.month}
              onChange={handleChange}
              label="Month"
            >
              {months.map((month, index) => (
                <MenuItem key={index} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}

          <TextField
            size="small"
            label="Month"
            id="month"
            name="month"
            type="month"
            value={formData.month}
            onChange={handleChange}
            fullWidth
            InputProps={{ inputProps: { min: 0 } }} // Ensure the input is non-negative
          />

          <TextField
            size="small"
            label="Amount of Milk(in Litres)"
            id="litter"
            name="litter"
            type="number"
            value={formData.litter}
            onChange={handleChange}
            fullWidth
            InputProps={{ inputProps: { min: 0 } }} // Ensure the input is non-negative
          />
          <Button
            type="submit"
            className="px-4"
            variant="contained"
            color="primary"
            sx={{ alignSelf: "center" }}
          >
            Submit
          </Button>
        </Box>

        <hr></hr>
        {data &&
        <>
        
        <Toolbar>
          <Typography variant="h6" id="tableTitle" component="div">
            Subsidy Apply history
          </Typography>
        </Toolbar>

        
          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sl.No.</TableCell>
                  <TableCell>Month</TableCell>
                  <TableCell>Liter</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Approval Status</TableCell>
                  <TableCell>Payment Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.month}</TableCell>
                      <TableCell>{row.litter}</TableCell>
                      <TableCell>{row.amount}</TableCell>
                      <TableCell>
                        <span className={`${row.isApprove === 'Approve' ? 'bg-success' : 'bg-warning'} text-white rounded px-2`}>
                          {row.isApprove === 'Approve' ? 'Approved' : row.isApprove}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`${row.paymentStatus === 'Approve' ? 'bg-success' : 'bg-warning'} text-white rounded px-2`}>
                          {row.paymentStatus === 'Approve' ? 'Approved' : row.paymentStatus}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          </>
        }


      </Paper>
    </div>
  );
}

export default ApplyForm;
