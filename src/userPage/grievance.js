import React, { useState } from 'react';
import {
  Container, Toolbar, TextField, Button, MenuItem, Typography, Box, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';

const Grievance = () => {
  const [grievanceType, setGrievanceType] = useState('');
  const [details, setDetails] = useState('');
  const [grievances, setGrievances] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGrievance = { type: grievanceType, details: details };
    setGrievances([...grievances, newGrievance]);
    setGrievanceType('');
    setDetails('');
  };

  return (
    <div>
    
            <Toolbar sx={{ boxShadow: 3 }}>
                <Typography variant="h5" id="tableTitle" component="div">
                    Grievance
                </Typography>
            </Toolbar>
    <Paper className="p-2">
      <Box
        sx={{
          p: 4,
          mb: 4,
        //   borderRadius: 2,
        //   boxShadow: 3,
        //   backgroundColor: '#f9f9f9',
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>
          Submit a Grievance
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            mt: 3,
          }}
        >
          <TextField size="small"
            select
            label="Grievance Type"
            value={grievanceType}
            onChange={(e) => setGrievanceType(e.target.value)}
            fullWidth
            required
            variant="outlined"
          >
            <MenuItem value="Service Issue">Service Issue</MenuItem>
            <MenuItem value="Billing Issue">Billing Issue</MenuItem>
            <MenuItem value="Technical Problem">Technical Problem</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>

          <TextField size="small"
            label="Details"
            multiline
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            fullWidth
            required
            variant="outlined"
          />

          <Button size="small"
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 1, fontSize: '1rem' }}
          >
            Submit Grievance
          </Button>
        </Box>
      </Box>

      <hr></hr>

      <Typography variant="h6" align="center" gutterBottom>
          Grievance history
        </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table aria-label="grievance history table">
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="h6">Grievance Type</Typography></TableCell>
              <TableCell><Typography variant="h6">Details</Typography></TableCell>
              <TableCell><Typography variant="h6">Status</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grievances.map((grievance, index) => (
              <TableRow key={index}>
                <TableCell>{grievance.type}</TableCell>
                <TableCell>{grievance.details}</TableCell>
                <TableCell>{grievance.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    </div>
  );
};

export default Grievance;
