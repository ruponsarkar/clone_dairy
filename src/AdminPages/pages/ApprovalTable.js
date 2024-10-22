// ProfessionalTable.js

import React, { useEffect, useState, useRef } from "react";
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
import CancelIcon from "@mui/icons-material/Cancel";
import Checkbox from "@mui/material/Checkbox";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { CSVLink, CSVDownload } from "react-csv";
import PaymentsIcon from "@mui/icons-material/Payments";
import Loader from "../../components/pannel/loader";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import UploadFile from "../../components/upload/upload";

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

const ApprovalTable = () => {
    const fileInput = useRef(null)
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
    const [daybook, setDaybook] = useState();

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
    }, [month, user?.uid]);

    // useEffect(())


    const handleAddLitter = (id, litter) => {

        console.log("name : ", );

        const updatedItems = data.map((item) =>
            item.id === id ? { ...item, litter: litter } : item
        );
        console.log("updatedItems : ", updatedItems);
        setData(updatedItems);
    };


    const handleData = (id, value, name) => {

        console.log("name : ", name);

        const updatedItems = data.map((item) =>
            item.id === id ? { ...item, [name]: value } : item
        );
        console.log("updatedItems : ", updatedItems);
        setData(updatedItems);
    };

    const handleApproveAll = () => {
        if (!month) {
            Swal.fire({
                title: "Month Not selected !",
                text: "You must selct a month!",
                icon: "warning",
            });
            return;
        }

        console.log(month);
        console.log(data);
        let selectedData = data.filter((e) => e.litter && e.isApprove == null);
        let needUpdatesData = data.filter(
            (e) => e.litter && e.isApprove == "Pending"
        );

        // console.log("selectedData", selectedData);
        // return;

        console.log("user", user);
        let approveBy = "";
        switch (user.role) {
            case "DCS":
                approveBy = 1;
                postMonthlyReport(selectedData, approveBy);
                break;
            case "SLSC":
                approveBy = 2;
                postMonthlyReport(selectedData, approveBy);
                break;

            default:
                console.log("user role not found");
                Swal.fire({
                    title: "Opss",
                    text: "Only DCS or SLSC can approve it",
                    icon: "warning",
                });
                break;
        }

        return;

        updateMonthlyReport(needUpdatesData);
        postMonthlyReport(selectedData);
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
                    title: "Approved!",
                    text: "Data submitted successfully!",
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

    const updateMonthlyReport = (data) => {
        setLoading(true);
        api
            .updateMonthlyReport(data, month, amountPerLitter)
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
            console.log("admin not found");
            return;
        }
        console.log("user==>>>", user);
        setLoading(true);
        console.log("selectedDistrict ", selectedDistrict);
        api
            .getMasterWithReport(month, selectedDistrict, user)
            .then((res) => {
                console.log("getMasterWithReport", res.data.data);
                setData(res.data.data);
                setLoading(false);
                getDocuments();

            })
            .catch((err) => {
                setLoading(false);
                console.log("getMasterWithReport err", err);
            });
    };

    const getDocuments=()=>{
        // role, month, admin_id 
        let data = {
            role: user.role, 
            month: month, 
            admin_id : user.uid
        }
        api.getDocuments(data).then((res)=>{
            console.log("res : ", res);
            setDaybook(res.data.data)
        })
        .catch((err)=>{
            console.log("err : ", err);
        })
    }

    const handleFileChange = event => {
        console.log("Make something", event.target.files[0])
        let file = event.target.files[0];
        const Data = new FormData();
        Data.append('month', month);
        Data.append('role', user.role);
        Data.append('id', user.uid);
        Data.append("fileName", month + "." + file.name.split(".")[1]);
        Data.append('type', 'daybook');
        Data.append('title', 'Daybook From '+user.name);
        Data.append('file', file);

        api
            .uploadDaybook(Data).then((res)=>{
                console.log("res ", res);
                getDocuments();
            })
            .catch((err)=>{
                console.log("errr ", err);
            })

        // make upload api here 

    }

    return (
        <>
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
                        Milk details
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
                            <StyledBreadcrumb label="Milk details" />
                        </Breadcrumbs>
                    </div>
                </Toolbar>
            </Paper>
            <Paper className="p-2">
                <Loader open={loading} />


                <Toolbar
                    className="p-0"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div className="my-3 p-0 d-flex gap-3">
                        <input
                            type="month"
                            name=""
                            value={month}
                            className="form-control col-3"
                            id=""
                            onChange={(e) => handleChangeMonth(e)}
                        />


                        <UploadFile handleFileChange={handleFileChange} daybook={daybook}/>


                        <div className="col-6">
                            <Button variant="contained" onClick={handleApproveAll}>
                                Approve and sent to DLC
                            </Button>
                        </div>
                    </div>
                    <div>
                        {data && (
                            <div>
                                <CSVLink data={data} filename={"AHVD_DATA.csv"}>
                                    <Button variant="contained">
                                        <FileDownloadOutlinedIcon />
                                        Download Data
                                    </Button>
                                </CSVLink>
                            </div>
                        )}
                    </div>
                </Toolbar>

                <TableContainer component={Paper}>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size="medium"
                    >
                        <TableHead>
                            <TableRow>
                                <StyledTableCell className="text-center p-2">Sl no</StyledTableCell>
                                <StyledTableCell className="text-center p-2">
                                    Applicant Name
                                </StyledTableCell>
                                <StyledTableCell className="text-center p-2">
                                    Name of DCS
                                </StyledTableCell>
                                <StyledTableCell className="text-center p-2">
                                    Registration no
                                </StyledTableCell>
                                <StyledTableCell className="text-center p-2">
                                    District
                                </StyledTableCell>
                                <StyledTableCell className="text-center p-2">
                                    Quantity of Milk <br/>
                                    (in Litres)
                                </StyledTableCell>
                                <StyledTableCell className="text-center p-2">
                                    Milk Quality (Optional)
                                    <br/>
                                    (Fat / SNF / Water Content / Lactometer)
                                </StyledTableCell>

                                {/* <StyledTableCell className="text-center p-2">
                                    Amount (in Rs)
                                </StyledTableCell> */}
                                
                                <StyledTableCell className="text-center p-2">
                                    Status
                                </StyledTableCell>
                                <StyledTableCell className="text-center p-2">
                                    Action
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data &&
                                data.map((row, index) => {
                                    return (
                                        <TableRow hover tabIndex={-1} key={index}>
                                            <TableCell className="text-center p-2">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell
                                                className="text-center p-2"
                                                component="th"
                                                scope="row"
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell className="text-center p-2">
                                                {row.dcs_name}
                                            </TableCell>
                                            <TableCell className="text-center p-2">
                                                {row.dcs_registration_no}
                                            </TableCell>
                                            <TableCell className="text-center p-2">
                                                {row.district}
                                            </TableCell>
                                            <TableCell className="text-center p-2">
                                                <input
                                                className="col-6 m-0 p-0"
                                                    type="number"
                                                    name="litter"
                                                    disabled={row.isApprove === "Approve" ? true : false}
                                                    value={row.litter ? row.litter : ""}
                                                    id=""
                                                    // onChange={(e) =>
                                                    //     handleAddLitter(row.id, e.target.value)
                                                    // }
                                                    onChange={(e) =>
                                                        handleData(row.id, e.target.value, 'litter')
                                                    }
                                                />
                                            </TableCell>

                                            <TableCell className="text-center p-2">
                                                <input
                                                    type="text"
                                                    name="quality"
                                                    id=""
                                                    disabled={row.isApprove === "Approve" ? true : false}
                                                    value={row.quality ? row.quality : row.isApprove ? " " : ""}
                                                    placeholder="Fat/SNF/WC/Lactometer"
                                                    onChange={(e) =>
                                                        handleData(row.id, e.target.value, 'quality')
                                                    }
                                                    
                                                />
                                            </TableCell>

                                            {/* <TableCell className="text-center p-2">
                                                {row.litter ? row.litter * 5 : 0} ₹
                                            </TableCell> */}
                                            <TableCell className="text-center p-2">
                                                <span
                                                    className={`${row.isApprove === "Pending" || !row.isApprove
                                                            ? "bg-warning"
                                                            : "bg-success"
                                                        } rounded px-2`}
                                                >
                                                    {row.isApprove
                                                        ? row.isApprove === "Approve"
                                                            ? "Approved"
                                                            : row.isApprove
                                                        : "Pending"}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-center p-2">
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
        </>
    );
};

export default ApprovalTable;
