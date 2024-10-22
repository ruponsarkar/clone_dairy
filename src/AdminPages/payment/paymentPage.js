import React, { useState, useEffect } from "react";
import { styled, emphasize } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import BasicMenu from "../../ui-component/menu";
import { Button, Paper, Toolbar,
  Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Swal from "sweetalert2";
import PaymentsIcon from "@mui/icons-material/Payments";
import { CSVLink, CSVDownload } from "react-csv";
import api from "../../API/api";
import SearchIcon from '@mui/icons-material/Search';
import Loader from "../../components/pannel/loader";


import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      '&:active': {
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

export default function PaymentPage() {
  const [data, setData] = useState();
  const [month, setMonth] = useState(getCurrentMonth());

  const [role, setRole] = useState();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [all, setAll] = useState();
  const [loading, setLoading] = useState(false);

  function getCurrentMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1

    return `${year}-${month}`;
  }

  useEffect(() => {
    // if (JSON.parse(sessionStorage.getItem('user')).role === 'Admin') {
    setRole(JSON.parse(sessionStorage.getItem("user")).role);
    // }
  }, []);

  useEffect(() => {
    api.getRangeSubsidy('2020-01', '2029-01').then((res) => {
      console.log("ress ", res);
      setAll(res.data.data)
    })
      .catch((err) => {
        console.log("err e", err);
      })
  }, []);

  // const getMonthlyReport = () => {
  //   api
  //     .getMonthlyReport(month)
  //     .then((res) => {
  //       console.log("res", res);
  //       let selectAllData = res.data.data.map((e) => ({
  //         ...e,
  //         selected: true,
  //       }));
  //       setData(selectAllData);
  //     })
  //     .catch((err) => {
  //       console.log("err ", err);
  //     });
  // };


  useEffect(()=>{
    handleViewBeneficiary();
  },[data]);
  
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

  const handleApproveAll = () => {
    let selectedData = data.filter((e) => e.selected);
    console.log(selectedData);


    Swal.fire({
      title: `Approve Payment for ${selectedData.length} account!`,
      text: "You will redirect to payment gatway",
      icon: "warning"
    });
  };

  const handleRangeSubsidy = () => {
    setLoading(true)
    api.getRangeSubsidy(from, to).then((res) => {
      console.log("ress ", res);
      setData(res.data.data)
      setAll(res.data.data)
      setLoading(false)
    })
    .catch((err) => {
      console.log("err e", err);
      setLoading(false)
      })
  }

  const handleViewBeneficiary = () => {
    api.viewBeneficiary(data).then((res) => {
     let beneficiaries= res.data.data;
     if(data?.length>0 && beneficiaries?.length>0){
      data.map(item1=>{
        let flag = false;
        beneficiaries.map(item2=>{
          let beneficiary_id = 'Beneficiary_'+item1?.bank_account_no+'_'+item1?.id;
          if(item2.beneficiary_id==beneficiary_id){
            flag = true;
          }
        });
        item1.isBeneficiary = flag?true:false;
      });
      console.log("DATA===",data);
      setData(data);
     }
    })
      .catch((err) => {
        console.log("err : ", err);
      })
  }

  const handleCreateBeneficiary = (farmer) => {
    console.log(farmer);
    
    let beneficiary_id = 'Beneficiary_' + farmer?.bank_account_no + '_' + farmer?.id;
    const data = {
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
        farmer_id: farmer?.id,
        api_request_id: Math.floor(Math.random() * 10000000000000001)
      }
    }
    console.log("data=", data);
    api.createBeneficiary(data).then((res) => {
      Swal.fire('Beneficiary created successfully !');
      handleViewBeneficiary();
    })
      .catch((err) => {
        console.log("err : ", err);
        Swal.fire('Something went wrong !');
      })
  }

  return (
    <>
    <Paper className="p-1 mb-3">
                <Toolbar sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                "@media (max-width: 600px)": {
                flexDirection: "column",
                alignItems: "flex-start",
                },
                }}>
                <Typography sx={{ display: "flex", gap: 2 }} variant="h6" id="tableTitle" component="div">
                Payment
                </Typography>
                <div role="presentation" >
                <Breadcrumbs aria-label="breadcrumb">
                <StyledBreadcrumb
                    component="a"
                    href="/#/admin/dashboard"
                    label="Home"
                    icon={<HomeIcon fontSize="small" />}
                />
                {/* <StyledBreadcrumb component="a" href="#" label="Catalog" /> */}
                <StyledBreadcrumb label="Payment"/>
                </Breadcrumbs>
                </div>
                </Toolbar>

            </Paper>

    <Paper className="p-2">
      <Loader open={loading}/>
      <div className="my-3 d-flex gap-3">


      </div>

      <div className="d-flex justify-content-between">

        <div className="d-flex gap-2">
          <input type="month" className="form-control col-5" value={from} onChange={(e) => setFrom(e.target.value)} name="" id="" />
          <input type="month" className="form-control col-5" name="" value={to} onChange={(e) => setTo(e.target.value)} id="" />
          <div>
            <Button variant="contained" onClick={handleRangeSubsidy}> <SearchIcon /> </Button>
          </div>
        </div>

        <div className="d-flex align-items-center gap-4">
          <div>
            {role === "Super Admin" && (
              <Button variant="contained" onClick={handleApproveAll}>
                Approve for Payment to Finance&nbsp; <PaymentsIcon />
              </Button>
            )}
          </div>
          {all &&
            <div className="">
              <CSVLink data={all} filename={"AHVD_SUBSIDYcsv"}>
                {data ? 'Download Report' : 'Download Report(All)'}

              </CSVLink>
            </div>
          }
        </div>

      </div>






      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className="text-center p-2">
                <Checkbox
                  checked={selectAll ? true : false}
                  onClick={handeSelectAll}
                />
              </StyledTableCell>
              <StyledTableCell className="text-center p-2">Name</StyledTableCell>
              <StyledTableCell className="text-center p-2">Name of DCS</StyledTableCell>
              <StyledTableCell className="text-center p-2">Registration No </StyledTableCell>
              <StyledTableCell className="text-center p-2">Subsidy Details</StyledTableCell>
              <StyledTableCell className="text-center p-2">Quantity of milk(in Litres)</StyledTableCell>
              <StyledTableCell className="text-center p-2">Ammount(in Rs)</StyledTableCell>
              <StyledTableCell className="text-center p-2">Bank Account No</StyledTableCell>
              <StyledTableCell className="text-center p-2">Payment Status</StyledTableCell>
              {/* <StyledTableCell>Action</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell className="text-center p-2" component="th" scope="row">
                    <Checkbox
                      checked={row.selected ? true : false}
                      onClick={() => handleSelect(row.id)}
                    />
                  </StyledTableCell>
                  <StyledTableCell className="text-center p-2">{row.name}</StyledTableCell>
                  <StyledTableCell className="text-center p-2">
                    {row.name_of_co_operatice_society}
                  </StyledTableCell>
                  <StyledTableCell className="text-center p-2">
                    {row.registration_no_of_co_operatice_society}
                  </StyledTableCell>
                 
                  <StyledTableCell className="text-center p-2" width={200}>{row.subsidy_details}</StyledTableCell>

                  <StyledTableCell className="text-center p-2" align="center"> <strong> {row.quantity} </strong> </StyledTableCell>
                  <StyledTableCell className="text-center p-2" align="center"> <strong> {row.total_amount} </strong> </StyledTableCell>
                  <StyledTableCell className="text-center p-2">{row.bank_account_no}</StyledTableCell>
                  <StyledTableCell className="text-center p-2">
                    <span className={`${row.paymentStatus === 'Pending' ? 'bg-warning' : 'bg-success'} rounded px-2`}>
                      {row.paymentStatus}
                    </span>
                  </StyledTableCell>
                  <StyledTableCell>
                    {!row.isBeneficiary &&
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleCreateBeneficiary(row)}
                    >
                      Add as Beneficiary
                    </Button>}
                  </StyledTableCell>
                </StyledTableRow>
              ))

            }


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
    </Paper>
    </>
  );
}
