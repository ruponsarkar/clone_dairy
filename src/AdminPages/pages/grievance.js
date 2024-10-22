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
import { styled, emphasize } from "@mui/material/styles";
import FilterListIcon from "@mui/icons-material/FilterList";
import Application from "../../components/register/application";
import api from "../../API/api";
import Swal from "sweetalert2";
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




const Grievance = () => {

    const [data, setData] = useState();
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        getGrievance();
    },[])

    const getGrievance=()=>{
        setLoading(true)
        api.getGrievance().then((res)=>{
            console.log("res", res.data.data);
            setData(res.data.data)
            setLoading(false)
        })
        .catch((err)=>{
            setLoading(false)
            console.log("err", err);
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
                Grievance
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
                <StyledBreadcrumb label="Grievance"/>
                </Breadcrumbs>
                </div>
                </Toolbar>

            </Paper>

        <Paper className="p-2">
            <Loader open={loading}/>



            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size="medium"
                >


                    <TableHead>
                        <TableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell>Applicant ID</StyledTableCell>
                            <StyledTableCell>Applicant Name</StyledTableCell>
                            <StyledTableCell>Type</StyledTableCell>
                            <StyledTableCell>Details</StyledTableCell>
                            {/* <StyledTableCell align="center">Action</StyledTableCell> */}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data &&
                            data.map((row, index) => {
                                return (
                                    <TableRow hover tabIndex={-1} key={row.name}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.userId}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.userName}
                                        </TableCell>
                                        <TableCell>{row.type}</TableCell>
                                        <TableCell>{row.details}</TableCell>
                                     
                                       
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

        </Paper>
        </>
    );
};

export default Grievance;
