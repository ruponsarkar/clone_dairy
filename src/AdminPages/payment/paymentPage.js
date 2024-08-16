import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BasicMenu from "../../ui-component/menu";
import { Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Swal from "sweetalert2";
import PaymentsIcon from "@mui/icons-material/Payments";
import { CSVLink, CSVDownload } from "react-csv";
import api from "../../API/api";
import SearchIcon from '@mui/icons-material/Search';

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
  },[]);
  
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
    api.getRangeSubsidy(from, to).then((res) => {
      console.log("ress ", res);
      setData(res.data.data)
      setAll(res.data.data)
    })
      .catch((err) => {
        console.log("err e", err);
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
    <Paper className="p-2">
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
                Approve Payout&nbsp; <PaymentsIcon />
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
              <StyledTableCell>
                <Checkbox
                  checked={selectAll ? true : false}
                  onClick={handeSelectAll}
                />
              </StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Co-operative name</StyledTableCell>
              <StyledTableCell>DCS</StyledTableCell>
              <StyledTableCell>DCS ID</StyledTableCell>
              <StyledTableCell>Subsidy Details</StyledTableCell>
              <StyledTableCell>Quantity of milk</StyledTableCell>
              <StyledTableCell>Ammount</StyledTableCell>
              <StyledTableCell>Bank Account No</StyledTableCell>
              <StyledTableCell>Payment Status</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    <Checkbox
                      checked={row.selected ? true : false}
                      onClick={() => handleSelect(row.id)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>
                    {row.name_of_co_operatice_society}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.approverName}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.approverId}
                  </StyledTableCell>
                  <StyledTableCell width={200}>{row.subsidy_details}</StyledTableCell>

                  <StyledTableCell> <strong> {row.quantity} </strong> </StyledTableCell>
                  <StyledTableCell> <strong> {row.total_amount} </strong> </StyledTableCell>
                  <StyledTableCell>{row.bank_account_no}</StyledTableCell>
                  <StyledTableCell>
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
          {!data &&
            <div className="text-center">
              <h3>Data not found</h3>
            </div>
          }
        </div>



      </TableContainer>
    </Paper>
  );
}
