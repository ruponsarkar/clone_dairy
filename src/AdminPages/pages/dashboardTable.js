// ProfessionalTable.js

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Link,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import DownloadIcon from '@mui/icons-material/Download';
import FilterListIcon from "@mui/icons-material/FilterList";
import Application from "../../components/register/application";
import api from "../../API/api";
import Swal from "sweetalert2";
import CancelIcon from '@mui/icons-material/Cancel';
// import IconButton from '@mui/material/IconButton';
import { CSVLink, CSVDownload } from "react-csv";
import PaymentsIcon from '@mui/icons-material/Payments';



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

const defaultdistricts = [
  'Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar', 'Charaideo', 'Chirang',
  'Darrang', 'Dhemaji', 'Dhubri', 'Dibrugarh', 'Goalpara', 'Golaghat', 'Hailakandi',
  'Hojai', 'Jorhat', 'Kamrup Metropolitan', 'Kamrup', 'Karbi Anglong', 'Karimganj',
  'Kokrajhar', 'Lakhimpur', 'Majuli', 'Morigaon', 'Nagaon', 'Nalbari', 'Dima Hasao',
  'Sivasagar', 'Sonitpur', 'South Salmara-Mankachar', 'Tinsukia', 'Udalguri', 'West Karbi Anglong'
];

const statuses = [
  'Approve', 'Reject', 'Draft', 'Incompleted'
];





const DashboardTable = () => {

  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    setRequestData({
      ...requestData,
      filterBy: 'district',
      filterData: event.target.value
    })
    setSelectedStatus('');
  };





  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState();
  const [remark, setRemark] = useState();
  const [districts, setDistricts] = useState(defaultdistricts)
  const [openImgView, setOpenImgView] = useState(false);
  const [selectedImg, setSelectedImg] = useState();
  const [user, setUser] = useState();

  const [requestData, setRequestData] = useState(
    {
      limit: 100,
      offset: 0,
      user: JSON.parse(sessionStorage.getItem('user')),
      filterBy: '',
      filterData: ''
    }
  )

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem('user')).role === 'Admin') {
      setSelectedDistrict(JSON.parse(sessionStorage.getItem('user')).district)
      setDistricts([JSON.parse(sessionStorage.getItem('user')).district])

    }

    setUser(JSON.parse(sessionStorage.getItem('user')));

  }, [])

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    setRequestData({
      ...requestData,
      filterBy: 'status',
      filterData: event.target.value
    });
    setSelectedDistrict('');


  };

  const handleClearFilter = () => {
    setRequestData({
      ...requestData,
      filterBy: '',
      filterData: '',
    });
    setSelectedDistrict('');
    setSelectedStatus('');
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };


  const handleClickOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setSelectedRow(null);
  };

  useEffect(() => {
    getFrom()
  }, [requestData, selectedDistrict])



  const handleUpdate = () => {

    setOpen(false)
    if (status === 'Reject') {
      if (!remark) {
        Swal.fire("Please enter any remarks for Rejection ");
        return;
      }
    }
    else {
      setRemark('');
    }

    if (status) {
      console.log("mobileNumber: ", selectedRow.mobileNumber);
      console.log("status: ", status);
      console.log("remarks: ", remark);


      const data = {
        mobileNumber: selectedRow.mobileNumber,
        status: status,
        remark: remark,
      }
      api.updateFormStatus(data).then((res) => {
        console.log("final response :", res);
        Swal.fire('Successfully Updated !');
        if (status === 'Approve') {
          handleSaveToMaster(selectedRow)
        }
        getFrom();

      })
        .catch((err) => {
          console.log("err : ", err);
          Swal.fire('Something went wrong !');
        })

    }

    const handleSaveToMaster = (data) => {
      console.log("master", data);
      api.saveToMaster(data, user).then((res) => {
        console.log("master res", res);
      })
        .catch((err) => {
          console.log("master err", err);
        })
    }




  }

  const getFrom = () => {
    // const data = {
    //   limit: 10,
    //   offset: 0,
    //   user: JSON.parse(sessionStorage.getItem('user')),
    //   filterBy: '',
    //   filterData: ''
    // }

    api.getFrom(requestData).then((res) => {
      // console.log("res :", res);
      setData(res.data.data)
    })
      .catch((err) => {
        console.log("err: ", err);
      })
  }







  return (
    <Paper className="p-2">
        <Typography className="pt-1 pb-2" variant="h6" id="tableTitle" component="div">
          Farmer Data
        </Typography>
        <Typography className="py-2">
          Here is the recent registered farmer list <a href="admin/newRequest">View full list</a>
        </Typography>
      

    

      {/* 
    <div className="p-3 float-end">
      <a className="btn text-primary" role="button" href="/assets/data.xlsx"> <DownloadIcon/> Download Reports</a>
    </div> */}

      <TableContainer component={Paper}>
        <Table className="table-bordered table-striped"
         
        >



          <TableHead className="p-2">
            <TableRow className="p-2">
              <StyledTableCell className="p-2 text-center">
                Name of the applicant
              </StyledTableCell>
              <StyledTableCell className="p-2 text-center">Registration No CO</StyledTableCell>
              {/* <StyledTableCell>Area of residence</StyledTableCell> */}
              <StyledTableCell className="p-2 text-center">District</StyledTableCell>
              <StyledTableCell className="p-2 text-center">Village</StyledTableCell>
              <StyledTableCell className="p-2 text-center">Status</StyledTableCell>
              {/* <StyledTableCell className="p-2 text-center">Action</StyledTableCell> */}
            </TableRow>
          </TableHead>

          <TableBody>
            {data &&
              data.map((row, index) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.name}>
                    <TableCell className="p-2" component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell className="p-2">{row.registration_no_of_co_operatice_society}</TableCell>
                    {/* <TableCell>{row.area}</TableCell> */}
                    <TableCell className="p-1">{row.district}</TableCell>
                    <TableCell className="p-2">{row.village}</TableCell>
                    <TableCell className="p-2" align="center">
                      {row.status === 'Draft' && <span className="bg-secondary px-3 rounded">Draft</span>}
                      {row.status === 'Incompleted' && <span className="bg-warning px-3 rounded">Incomplet</span>}
                      {row.status === 'Approve' && <span className="bg-success px-3 rounded">Approved</span>}
                      {row.status === 'Reject' && <span className="bg-danger px-3 rounded">Rejected</span>}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <div>
          {!data && (
            <div className="text-center p-5">
              <img
            src="../assets/noData.png"
            alt="no data"
            className="govt-logo"
          />
              <p>Data not found</p>
            </div>
          )}
        </div>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="protein-modal-title"
        fullWidth={true}
        maxWidth={'lg'}
      >
        <DialogTitle id="protein-modal-title"> Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>

              <Application data={selectedRow} />

              {selectedRow &&
                <div className="documents d-flex justify-content-center border p-3 gap-4">
                  <div className="text-center card">
                    <h3>Pan Card</h3>
                    {/* <a href={`http://localhost:8800/${selectedRow.panCard}`}> */}
                    <img src={`http://localhost:8800/${selectedRow.panCard}`} className="img" alt=""
                      onClick={() => {
                        setOpenImgView(true);
                        setSelectedImg(`http://localhost:8800/${selectedRow.panCard}`)
                      }} />
                    {/* </a> */}
                  </div>
                  <div className="text-center card">
                    <h3>Aadhar Card</h3>
                    <img src={`http://localhost:8800/${selectedRow.aadharCard}`} className="img" alt=""
                      onClick={() => {
                        setOpenImgView(true);
                        setSelectedImg(`http://localhost:8800/${selectedRow.aadharCard}`)
                      }} />
                  </div>
                  <div className="text-center card">
                    <h3>
                      Passbook
                    </h3>
                    <img src={`http://localhost:8800/${selectedRow.passbook}`} className="img" alt=""
                      onClick={() => {
                        setOpenImgView(true);
                        setSelectedImg(`http://localhost:8800/${selectedRow.passbook}`)
                      }} />
                  </div>
                </div>
              }

              <div className="d-flex justify-content-center gap-3 m-3">
                <div>
                  <select name="" id="" onChange={(e) => setStatus(e.target.value)} className="form-control">
                    <option value="">---select---</option>
                    <option value="Approve">Approve</option>
                    <option value="Reject">Reject</option>
                  </select>
                </div>
                {status === 'Reject' &&
                  <div>
                    <input type="text" onChange={(e) => setRemark(e.target.value)} className="form-control" placeholder="Remark" name="" id="" />
                  </div>
                }
                <div>
                  <Button variant="contained" onClick={handleUpdate} disabled={status ? false : true}>Submit</Button>
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>



      {/* for image view  */}

      <Dialog
        open={openImgView}
        onClose={() => setOpenImgView(false)}
        aria-labelledby="protein-modal-title"
        fullWidth={true}
        maxWidth={'lg'}
      >

        <DialogContent>
          <DialogContentText>
            <div className="text-center">
              <img src={`${selectedImg}`} className="img-fluid" alt="" />
            </div>
          </DialogContentText>
        </DialogContent>


      </Dialog>






    </Paper>
  );
};

export default DashboardTable;
