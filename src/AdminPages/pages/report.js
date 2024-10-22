import React, { useState, useEffect } from "react";
import { styled, emphasize } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BasicMenu from "../../ui-component/menu";
import { Button, Toolbar, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Swal from "sweetalert2";
import PaymentsIcon from "@mui/icons-material/Payments";
import { CSVLink, CSVDownload } from "react-csv";
import api from "../../API/api";
import SearchIcon from "@mui/icons-material/Search";
import Loader from "../../components/pannel/loader";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

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

export default function Report() {
  const [data, setData] = useState();
  const [month, setMonth] = useState(getCurrentMonth());

  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [all, setAll] = useState();
  const [district, setDistrict] = useState();
  const [loading, setLoading] = useState(false);
  const [dcsID, setDcsID] = useState();
  const [report, setReport] = useState();
  // const [beneficiaries, setBeneficiaries] = useState();
  let beneficiaries = []
  function getCurrentMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1

    return `${year}-${month}`;
  }

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("user")).role !== "Super Admin") {
      setDistrict(JSON.parse(sessionStorage.getItem("user")).district);
      setDcsID(JSON.parse(sessionStorage.getItem("user")).uid);
    }
  }, []);

  useEffect(() => {
    api
      .getRangeSubsidy("2020-01", "2029-01", dcsID)
      .then((res) => {
        console.log("ress1 ", res);
        setAll(res.data.data);
      })
      .catch((err) => {
        console.log("err e", err);
      });
  }, [district]);


  // useEffect(() => {
  //   if (JSON.parse(sessionStorage.getItem("user")).role == "Finance") {
  //     handleViewBeneficiary(data);
  //   }
  // }, []);


  const handleRangeSubsidy = () => {
    let id = '';

    if (JSON.parse(sessionStorage.getItem("user")).role === 'DCS') {
      id = dcsID
    }

    let role = JSON.parse(sessionStorage.getItem("user")).role

    setLoading(true);

    api
      .getRangeSubsidy(from, to, id, role)
      .then((res) => {
        if (JSON.parse(sessionStorage.getItem("user")).role == "Finance") {
          handleViewBeneficiary(res.data.data);
        }else{
          formatAndSetData(res.data.data, beneficiaries);
        }
        setAll(res.data.data);
        setLoading(false);
        setReport(res.data.data.map((e, i) => ({
          'SL No': i + 1,
          'Name of Applicant': e.name,
          'Name of DCS': e.dcs_name,
          'Registration No': e.dcs_registration_no,
          'Months': e.subsidy_details,
          'Total Milk Quantity(in Liters)': e.quantity,
          'Amount (in Rs)': e.amounts,
          'Total Amount (in Rs)': e.total_amount,
          'Bank Name': e.bank_name,
          'Account Holder Name': e.bank_account_holder_name,
          'Bank Account No': e.bank_account_no,
          'IFSC Code': e.ifsc_code
        })))
      })
      .catch((err) => {
        setLoading(false);
        console.log("err e", err);
      });
  };

  const formatAndSetData = (farmerData, beneficiaryData) => {
    if (farmerData?.length > 0) {
      let count =0;
      farmerData.map(item1 => {
        let flag = false;
        if(beneficiaryData?.length > 0){
          beneficiaryData.map(item2 => {
            let beneficiary_id = 'Beneficiary_' + item1?.bank_account_no;
            if (item2.beneficiary_id == beneficiary_id) {
              flag = true;
            }
          });
        }
        item1.isBeneficiary = flag ? true : false;
        count+=1;
        if(farmerData.length==count){
          setData(data=>([...[], ...farmerData]));
          console.log("DATA===", farmerData);
        }
      });
    }else{
      setData(farmerData);
    }
  }

  const handleCreateBeneficiary = (farmer) => {
    console.log(farmer);
    setLoading(true);
    let beneficiary_id = 'Beneficiary_' + farmer?.bank_account_no;
    const requestData = {
      beneficiaryData: {
        beneficiary_id: beneficiary_id,
        beneficiary_name: farmer?.bank_account_holder_name,
        beneficiary_contact_details: {
          beneficiary_email: farmer?.bank_account_no + '@milksubsidydairyassam.com',
          beneficiary_phone: farmer?.mobile || '',
          beneficiary_country_code: '+91',
          beneficiary_address: farmer?.district,
          beneficiary_city: farmer?.district,
          beneficiary_postal_code: farmer?.postal_code || '',
        },
        beneficiary_instrument_details: {
          bank_account_number: farmer?.bank_account_no,
          bank_ifsc: farmer?.ifsc_code,
          vpa: 'test@upi'
        }
      },
      additionalData: {
        farmer_id: farmer?.applicationId,
        api_request_id: Math.floor(Math.random() * 10000000000000001)
      }
    }
    console.log("data=", requestData);
    api.createBeneficiary(requestData).then((res) => {
      Swal.fire('Beneficiary created successfully !');
      handleRangeSubsidy();
      setLoading(false);
    })
      .catch((err) => {
        console.log("err : ", err);
        setLoading(false);
        Swal.fire('Something went wrong !');
      })
  }

  const handleViewBeneficiary = (actualData) => {
    api.viewBeneficiary(actualData).then((res) => {
      beneficiaries = res.data.data;
      formatAndSetData(actualData, beneficiaries);
    })
      .catch((err) => {
        console.log("err : ", err);
      })
  }

  return (
    <div>
      <Paper className="p-1 mb-3">
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            "@media (max-width: 600px)": {
              flexDirection: "column",
              alignItems: "flex-start",
            },
          }}
        >
          <Typography
            sx={{ display: "flex", gap: 2 }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Report
          </Typography>
          <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              <StyledBreadcrumb
                component="a"
                href="/#/admin/dashboard"
                label="Home"
                icon={<HomeIcon fontSize="small" />}
              />
              {/* <StyledBreadcrumb component="a" href="#" label="Catalog" /> */}
              <StyledBreadcrumb label="Report" />
            </Breadcrumbs>
          </div>
        </Toolbar>
      </Paper>
      <Paper className="p-2" style={{ minHeight: '75vh' }}>
        <Loader open={loading} />
        <div className="my-3 d-flex gap-3"></div>

        <div className="d-flex justify-content-between">
          <div className="d-flex gap-2">
            <input
              type="month"
              className="form-control col-5"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              name=""
              id=""
            />
            <input
              type="month"
              className="form-control col-5"
              name=""
              value={to}
              onChange={(e) => setTo(e.target.value)}
              id=""
            />
            <div>
              <Button variant="contained" onClick={handleRangeSubsidy}>
                {" "}
                <SearchIcon />{" "}
              </Button>
            </div>
          </div>

          <div className="d-flex align-items-center gap-4">
            {report && (
              <div className="">
                <Button variant="contained">
                  <CSVLink
                    data={report}
                    filename={"AHVD_SUBSIDYcsv"}
                    className="text-white"
                  >
                    {data ? "Download Report" : "Download Report(All)"}
                  </CSVLink>
                </Button>
              </div>
            )}
          </div>
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>
                Sl no
                </StyledTableCell>
                <StyledTableCell>Name of Applicant</StyledTableCell>
                <StyledTableCell>Name of DCS</StyledTableCell>
                <StyledTableCell>Registration No</StyledTableCell>
                <StyledTableCell>Subsidy Details</StyledTableCell>
                <StyledTableCell>Quantity of milk(in Litres)</StyledTableCell>
                <StyledTableCell>Amount(in Rs)</StyledTableCell>
                {/* <StyledTableCell>Bank Account No</StyledTableCell> */}
                <StyledTableCell>Approve By</StyledTableCell>
                <StyledTableCell>Payment Status</StyledTableCell>
                {JSON.parse(sessionStorage.getItem("user")).role === "Finance" && (
                <StyledTableCell>Action</StyledTableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((row, index) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell>{row.dcs_name}</StyledTableCell>
                    {/* <StyledTableCell>{row.approverName}</StyledTableCell> */}
                    <StyledTableCell>{row.dcs_registration_no}</StyledTableCell>
                    <StyledTableCell width={200}>
                      {row.subsidy_details}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {" "}
                      <strong> {row.quantity} </strong>{" "}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {" "}
                      <strong> {row.total_amount} ₹</strong>{" "}
                    </StyledTableCell>
                    <StyledTableCell>
                      {row.approveBy === 1 && 'DCS'}
                      {row.approveBy === 2 && 'DLC'}
                      {row.approveBy === 3 && 'SLSC'}
                    </StyledTableCell>
                    <StyledTableCell>
                      <span
                        className={`${row.paymentStatus === "Pending"
                          ? "bg-warning"
                          : "bg-success"
                          } rounded px-2`}
                      >
                        {row.paymentStatus}
                      </span>
                    </StyledTableCell>
                    {JSON.parse(sessionStorage.getItem("user")).role === "Finance" && (
                    <StyledTableCell>
                      {!row.isBeneficiary && (
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => handleCreateBeneficiary(row)}
                        >
                          Add as Beneficiary
                        </Button>)}
                        {row.isBeneficiary && (
                        <Button
                          variant="outlined"
                          color="success"
                          size="small"
                          onClick={() => {}}
                        >
                          <DoneAllIcon color="success" /> Beneficiary
                        </Button>)}
                    </StyledTableCell>)}
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
          <div>
            {!data && (
              <div className="text-center p-5" >
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
      </Paper>
    </div>
  );
}
