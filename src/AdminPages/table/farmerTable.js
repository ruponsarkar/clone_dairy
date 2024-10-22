import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BasicMenu from "../../ui-component/menu";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import Application from "../../components/register/application";
import Certificate from "../../components/approvel/certificate";

import Swal from "sweetalert2";

import api from "../../API/api";
import { Padding } from "@mui/icons-material";

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

let defaultLimit = 10;
let defaultOffset = 0;

// export default function FarmerTable({ data, getAdmins, setModalOpen, setApplicationId }) {
export default function FarmerTable({
  getAdmins,
  setModalOpen,
  setApplicationId,
  search,
  setSearch,
  searchStatus
}) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [opencertificate, setOpencertificate] = useState(false);
  const [openImgView, setOpenImgView] = useState(false);
  const [selectedImg, setSelectedImg] = useState();


  // *******************************************************

  const [data, setData] = useState();
  const [temp, setTemp] = useState();
  const [limit, setLimit] = useState(defaultLimit);
  const [offset, setOffset] = useState(defaultOffset);
  const [totalCount, setTotalCount] = useState(0);

  // const [search, setSearch] = useState({
  //   regno: "",
  //   dcs: "",
  // });
  const [isSearch, setIsSearch] = useState(false);


  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [dsc, setDcs] = useState(
    JSON.parse(sessionStorage.getItem("user")).role === "DCS"
      ? JSON.parse(sessionStorage.getItem("user")).uid
      : ""
  );

  const [loading, setLoading] = useState(false);

  const getAllFarmers = () => {
    setLoading(true);
    if (user) {
      api
        .getAllFarmers(dsc, user, limit, offset)
        .then((res) => {
          console.log("res :", res);
          setData(res.data.data);
          setTemp(res.data.data);
          setTotalCount(res.data.totalCount);
          setLoading(false);
        })
        .catch((err) => {
          console.log("err ", err);
        });
    }
  };

  useEffect(() => {
    getAllFarmers();
  }, [offset]);





  const searchFarmer = () => {

    console.log("search :", search);
    if (!search.dcs && !search.regno) {
      console.log("Both can't be null");
      return;
    }
    api
      .searchFarmer(search)
      .then((res) => {
        console.log("res", res);
        setData(res.data.data);
        setIsSearch(true);
      })
      .catch((err) => {
        console.log("err: ", err);
      });

  };

  useEffect(()=>{
    if(searchStatus==='search'){
      searchFarmer();
    }
    else{
      setData(temp)
    }
  },[searchStatus]);

  const cancelSearch = () => {
    setIsSearch(false);
    setData(temp);
    setSearch({
      regno: "",
      dcs: "",
    });
  };



  // *******************************************************

  const handleClickOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };
  const handleClickOpenCetificate = (row) => {
    setSelectedRow(row);
    setOpencertificate(true);
  };
  const handleClose = () => {
    setOpen(false);
    // setSelectedRow(null);
  };

  const updateFile = () => {
    setApplicationId(data[0].applicationId);
    setModalOpen(true);
  };

  return (
    <>
    {search.dcs}
      <TableContainer component={Paper}>
        <Table className="table-bordered table-striped">
          <TableHead>
            <TableRow>
              <StyledTableCell className="p-2 text-center">
                Sl No
              </StyledTableCell>
              <StyledTableCell className="p-2 text-center">
                Farmer Name
              </StyledTableCell>
              <StyledTableCell className="p-2 text-center">
                Name of DCS
              </StyledTableCell>
              <StyledTableCell className="p-2 text-center">
                Registration No
              </StyledTableCell>
              <StyledTableCell className="p-2 text-center">
                District
              </StyledTableCell>
              {/* <StyledTableCell align="center">Status</StyledTableCell> */}
              <StyledTableCell className="p-2 text-center">
                Action
              </StyledTableCell>
              <StyledTableCell className="p-2 text-center">
                Certificate
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data &&
              data.map((row, index) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.applicationId}>
                    <TableCell className="p-2 text-center">
                      {offset + index + 1}
                    </TableCell>
                    <TableCell
                      className="p-2 text-center"
                      component="th"
                      scope="row"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell className="p-2 text-center">
                      {row.dcs_name}
                    </TableCell>
                    <TableCell className="p-2 text-center">
                      {row.dcs_registration_no}
                    </TableCell>
                    <TableCell className="p-2 text-center">
                      {row.district}
                    </TableCell>
                    <TableCell className="p-2 text-center">
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleClickOpen(row)}
                      >
                        View
                      </Button>
                    </TableCell>

                    <TableCell className="p-2 text-center">
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleClickOpenCetificate(row)}
                      >
                        <i className="fa fa-download"></i>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>

        <div>
          <div className="d-flex justify-content-end align-items-center gap-3 p-2">
            <div>
              Page &nbsp;
              {/* {Math.ceil(offset / limit) + 1} / {Math.ceil(totalCount / limit)} | */}
               <select name="" value={Math.ceil(offset / limit) + 1} id="" onChange={(e)=>setOffset(limit * (e.target.value-1))}>
                {
                  // Generate an array from 1 to 5 and map over it to create options
                  Array.from({ length: Math.ceil(totalCount / limit) }, (_, i) => (
                    <option key={i} value={i+1}>
                      {i+1}
                    </option>
                  ))
                }
                {/* <option value="">{Math.ceil(offset / limit) + 1}</option> */}
              </select> |
            </div>
            <div>
              {offset} - {totalCount >= limit + offset ? limit + offset : totalCount} of {totalCount}
            </div>
            <div>
              <IconButton onClick={() => setOffset(offset - defaultLimit)} disabled={offset <= 0 ? true : false}>
                <KeyboardArrowLeftIcon />
              </IconButton>
            </div>
            <div>
              <IconButton onClick={() => setOffset(offset + defaultLimit)} disabled={totalCount <= limit + offset ? true : false}>
                <ChevronRightIcon />
              </IconButton>
            </div>
          </div>
        </div>

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
        maxWidth={"lg"}
      >
        <DialogTitle id="protein-modal-title"> Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>
              <Application data={selectedRow} />

              {selectedRow && (
                <div className=" d-flex justify-content-center border p-3 gap-4">
                  <div className="text-center card">
                    <h3>Pan Card</h3>
                    {/* <a href={`https://milksubsidydairyassam.com:8800/${selectedRow.panCard}`}> */}
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
              {JSON.parse(sessionStorage.getItem("user")).role === "DCS" && (
                <div>
                  <div className="text-center">
                    <Button onClick={updateFile}>Want to Update Files ?</Button>
                  </div>
                </div>
              )}


            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* certificate  */}

      <Dialog
        open={opencertificate}
        onClose={() => setOpencertificate(false)}
        aria-labelledby="protein-modal-title"
        fullWidth={true}
        maxWidth={"lg"}
      >
        <DialogTitle id="protein-modal-title"> Certificate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>
              {selectedRow && (
                <>
                  <Certificate data={selectedRow} />
                </>
              )}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpencertificate(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
