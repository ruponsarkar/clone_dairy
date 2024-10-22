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
import FilterListIcon from "@mui/icons-material/FilterList";
import Application from "../../components/register/application";
import api from "../../API/api";
import Swal from "sweetalert2";
import CancelIcon from "@mui/icons-material/Cancel";
import Checkbox from "@mui/material/Checkbox";
import { CSVLink, CSVDownload } from "react-csv";
import PaymentsIcon from "@mui/icons-material/Payments";
import Loader from "../../components/pannel/loader";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.blue,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const defaultdistricts = [
  "Baksa",
  "Barpeta",
  "Biswanath",
  "Bongaigaon",
  "Cachar",
  "Charaideo",
  "Chirang",
  "Darrang",
  "Dhemaji",
  "Dhubri",
  "Dibrugarh",
  "Goalpara",
  "Golaghat",
  "Hailakandi",
  "Hojai",
  "Jorhat",
  "Kamrup Metropolitan",
  "Kamrup",
  "Karbi Anglong",
  "Karimganj",
  "Kokrajhar",
  "Lakhimpur",
  "Majuli",
  "Morigaon",
  "Nagaon",
  "Nalbari",
  "Dima Hasao",
  "Sivasagar",
  "Sonitpur",
  "South Salmara-Mankachar",
  "Tinsukia",
  "Udalguri",
  "West Karbi Anglong",
];

const statuses = ["Approve", "Reject", "Draft", "Incompleted"];

const SLSCApproval = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    setRequestData({
      ...requestData,
      filterBy: "district",
      filterData: event.target.value,
    });
    setSelectedStatus("");
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState();
  const [status, setStatus] = useState();
  const [remark, setRemark] = useState();
  const [districts, setDistricts] = useState(defaultdistricts);
  const [openImgView, setOpenImgView] = useState(false);
  const [selectedImg, setSelectedImg] = useState();
  const [month, setMonth] = useState();
  const [amountPerLitter, setAmountPerLitter] = useState(5);
  const [user, setUser] = useState();

  function getCurrentMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1

    return `${year}-${month}`;
  }

  useEffect(() => {
    setMonth(getCurrentMonth());
  }, []);

  const [requestData, setRequestData] = useState({
    limit: 100,
    offset: 0,
    user: JSON.parse(sessionStorage.getItem("user")),
    filterBy: "",
    filterData: "",
  });

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("user")).role === "Admin") {
      setSelectedDistrict(JSON.parse(sessionStorage.getItem("user")).district);
      setDistricts([JSON.parse(sessionStorage.getItem("user")).district]);
    }
  }, []);

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    setRequestData({
      ...requestData,
      filterBy: "status",
      filterData: event.target.value,
    });
    setSelectedDistrict("");
  };

  const handleClearFilter = () => {
    setRequestData({
      ...requestData,
      filterBy: "",
      filterData: "",
    });
    setSelectedDistrict("");
    setSelectedStatus("");
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
    // getFrom();
    getMasterWithReport();
  }, [month]);

  const handleAddLitter = (id, litter) => {
    const updatedItems = data.map((item) =>
      item.id === id ? { ...item, litter: litter } : item
    );
    setData(updatedItems);
  };

  const handleApproveAll = () => {

    console.log(month);
    console.log(data);
    let selectedData = data.filter((e) => e.selected && e.approveBy == 2);
    let needUpdatesData = data.filter(
      (e) => e.litter && e.isApprove == "Pending"
    );

    console.log("selectedData", selectedData);

    if (!month || !selectedData.length) {
        Swal.fire({
          title: "No data selected !",
          text: "You must selct a data!",
          icon: "warning",
        });
        return;
      }



    // return;

    let approveBy = 3;
    updateMonthlyReport(selectedData, approveBy);

    return;

    // let approveBy = '';
    // switch (user.role) {
    //   case "DCS":
    //      approveBy = 1;
    //     postMonthlyReport(selectedData, approveBy);
    //     break;
    //   case "SLSC":
    //     approveBy = 2;
    //     postMonthlyReport(selectedData, approveBy);
    //     break;

    //   default:
    //     console.log("user role not found");
    //     Swal.fire({
    //         title: "Opss",
    //         text: "Only DCS or SLSC can approve it",
    //         icon: "warning",
    //       });
    //     break;
    // }

    return;
  };

  const postMonthlyReport = (selectedData, approveBy) => {
    console.log("selectedData=>", selectedData);
    console.log("approveBy=>", approveBy);

    setLoading(true);

    api
      .postMonthlyReport(selectedData, month, amountPerLitter, approveBy)
      .then((res) => {
        console.log("postMonthlyReport: ", res);
        Swal.fire({
          title: "Approved for Payment!",
          text: "Data sent for payment!",
          icon: "success",
        });

        setLoading(false);
        getMasterWithReport();
        return;
      })
      .catch((err) => {
        console.log("err postMonthlyReport", err);
        setLoading(false);
      });
  };

  const updateMonthlyReport = (data, approveBy) => {
    setLoading(true);
    api
      .updateMonthlyReport(data, month, amountPerLitter, approveBy)
      .then((res) => {
        console.log("updateMonthlyReport: ", res);
        Swal.fire({
            title: "Approved!",
            text: "Data approved!",
            icon: "success",
          });

        setLoading(false);
        getMasterWithReport();
        return;
      })
      .catch((err) => {
        setLoading(false);
        console.log("err updateMonthlyReport", err);
      });
  };

  const handleChangeMonth = (e) => {
    setMonth(e.target.value);
    // getMasterWithReport(e.target.value);
  };

  const getMasterWithReport = () => {
    if (!user) {
      console.log("user not found");
      return;
    }
    console.log(user);
    setLoading(true);
    console.log("selectedDistrict ", selectedDistrict);
    api
      .getMasterWithReport(month, selectedDistrict, user)
      .then((res) => {
        console.log("getMasterWithReport", res.data.data);
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("getMasterWithReport err", err);
      });
  };

  const [selectAll, setSelectAll] = useState(false);
  const handeSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setData(data.map((item) => ({ ...item, selected: newSelectAll })));
  };

  const handleSelect = (id) => {
    const updatedItems = data.map((item) =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setData(updatedItems);
    // Update the selectAll state based on the individual selections
    const allSelected = updatedItems.every((item) => item.selected);
    setSelectAll(allSelected);
  };

  return (
    <Paper className="p-2">
      <Loader open={loading} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          margin: "20px 0",
          "@media (max-width: 600px)": {
            flexDirection: "column",
            alignItems: "flex-start",
          },
        }}
      >
        {/* <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl sx={{ minWidth: 180, maxWidth: 200 }} size="small">
            <InputLabel id="assam-district-label">Select District</InputLabel>
            <Select
              labelId="assam-district-label"
              id="assam-district"
              value={selectedDistrict}
              label="Select District"
              onChange={handleDistrictChange}
            >
              {districts &&
                districts.map((district) => (
                  <MenuItem key={district} value={district}>
                    {district}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 180, maxWidth: 200 }} size="small">
            <InputLabel id="status-label">Select Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              value={selectedStatus}
              label="Select Status"
              onChange={handleStatusChange}
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {requestData.filterBy && (
            <IconButton onClick={handleClearFilter}>
              <CancelIcon />
            </IconButton>
          )}
        </Box> */}

        <div>
          {data && (
            <div>
              <CSVLink data={data} filename={"AHVD_DATA.csv"}>
                Download Data
              </CSVLink>
            </div>
          )}
        </div>
      </Box>

      {/* <div className="my-3 d-flex gap-3">
        <input
          type="month"
          name=""
          value={month}
          className="form-control col-2"
          id=""
          onChange={(e) => handleChangeMonth(e)}
        />
        <div>
          <Button variant="contained" onClick={handleApproveAll}>
            Approve and sent to Finance
          </Button>
        </div>
      </div> */}

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Checkbox
                  checked={selectAll ? true : false}
                  onClick={handeSelectAll}
                />
              </StyledTableCell>
              <StyledTableCell>Applicant Name</StyledTableCell>
              <StyledTableCell>Name of DCS</StyledTableCell>
              <StyledTableCell>Registration no</StyledTableCell>
              <StyledTableCell>District</StyledTableCell>
              <StyledTableCell>Quantity of Milk(in Litres)</StyledTableCell>
              <StyledTableCell>Amount (in Rs)</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data &&
              data.map((row, index) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.name}>
                    <TableCell>
                      <Checkbox
                        checked={row.selected ? true : false}
                        onClick={() => handleSelect(row.id)}
                        disabled={row.approveBy == 3 ? true : false}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.dcs_name}</TableCell>
                    <TableCell>{row.dcs_registration_no}</TableCell>
                    <TableCell>{row.district}</TableCell>
                    <TableCell align="center">
                      {row.litter ? row.litter : ""}
                    </TableCell>
                    <TableCell align="center">
                      {row.litter ? row.litter * 5 : 0}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`${
                          row.approveBy !== 3 ? "bg-warning" : "bg-success"
                        } rounded px-2`}
                      >
                        {row.approveBy === 3 ? "Approved" : "Pending"}
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleClickOpen(row)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>

        <div>
          {!data && (
            <div className="text-center">
              <h3>Data not found</h3>
            </div>
          )}
        </div>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="protein-modal-title"
        fullWidth={true}
        maxWidth={"lg"}
      >
        <DialogTitle id="protein-modal-title"> Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>
              <Application data={selectedRow} />

              {selectedRow && (
                <div className="documents d-flex justify-content-center border p-3 gap-4">
                  <div className="text-center card">
                    <h3>Pan Card</h3>
                    {/* <a href={`http://localhost:8800/${selectedRow.panCard}`}> */}
                    <img
                      src={`https://milksubsidydairyassam.com:8800/${selectedRow.panCard}`}
                      className="img"
                      alt=""
                      onClick={() => {
                        setOpenImgView(true);
                        setSelectedImg(
                          `https://milksubsidydairyassam.com:8800/${selectedRow.panCard}`
                        );
                      }}
                    />
                    {/* </a> */}
                  </div>
                  <div className="text-center card">
                    <h3>Aadhar Card</h3>
                    <img
                      src={`https://milksubsidydairyassam.com:8800/${selectedRow.aadharCard}`}
                      className="img"
                      alt=""
                      onClick={() => {
                        setOpenImgView(true);
                        setSelectedImg(
                          `https://milksubsidydairyassam.com:8800/${selectedRow.aadharCard}`
                        );
                      }}
                    />
                  </div>
                  <div className="text-center card">
                    <h3>Passbook</h3>
                    <img
                      src={`https://milksubsidydairyassam.com:8800/${selectedRow.passbook}`}
                      className="img"
                      alt=""
                      onClick={() => {
                        setOpenImgView(true);
                        setSelectedImg(
                          `https://milksubsidydairyassam.com:8800/${selectedRow.passbook}`
                        );
                      }}
                    />
                  </div>
                </div>
              )}

              {/* <div className="d-flex justify-content-center gap-3 m-3">
                <div>
                  <select
                    name=""
                    id=""
                    onChange={(e) => setStatus(e.target.value)}
                    className="form-control"
                  >
                    <option value="">---select---</option>
                    <option value="Approve">Approve</option>
                    <option value="Reject">Reject</option>
                  </select>
                </div>
                {status === "Reject" && (
                  <div>
                    <input
                      type="text"
                      onChange={(e) => setRemark(e.target.value)}
                      className="form-control"
                      placeholder="Remark"
                      name=""
                      id=""
                    />
                  </div>
                )}
                <div>
                  <Button
                    variant="contained"
                    onClick={handleUpdate}
                    disabled={status ? false : true}
                  >
                    Submit
                  </Button>
                </div>
              </div> */}
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
        maxWidth={"lg"}
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

export default SLSCApproval;
