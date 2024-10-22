import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import AdminTable from "../table/adminTable";

import Modal from "../../ui-component/modal";
import Swal from "sweetalert2";
import Loader from "../../components/pannel/loader";
import api from "../../API/api";

import Breadcrumb from "../../ui-component/breadcrumbs";

import { styled, emphasize } from "@mui/material/styles";
import {
  Paper,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";


const districts = [
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

const AdminCategory = () => {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    status: "Active",
  });

  useEffect(() => {
    getAdmins();
  }, []);

  const handleSaveAdmin = () => {
    console.log(formData);

    api
      .addOrUpdateAdmin(formData)
      .then((res) => {
        console.log("res", res);
        setOpen(false);
        Swal.fire("Admin added successfully");
        getAdmins();
      })
      .catch((err) => {
        console.log("err", err);
        Swal.fire("Something went wrong");
      });
  };

  const getAdmins = () => {
    setLoading(true);
    api
      .getAdmins()
      .then((res) => {
        console.log("res", res.data.message);
        setData(res.data.message);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err :", err);
        setLoading(false);
      });
  };


  const test = [{
    href: "q1",
    label: "Home",
    icon: <HomeIcon fontSize="small" />
  },
  {
    label: "admin page",
  },
]

  const addAdminForm = () => {
    return (
      <>
        <div className="p-3">
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="">Admin Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                id=""
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">Admin Phone number</label>
              <input
                type="text"
                className="form-control"
                name="mobileNumber"
                id=""
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">Admin Email Id</label>
              <input
                type="text"
                className="form-control"
                name="email"
                id=""
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="">Admin Role</label>
              <select
                className="form-control"
                name="role"
                id=""
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              >
                <option value="">------</option>
                <option value="DLC">DLC</option>
                <option value="SLSC">SLSC</option>
                <option value="Finance">Finance</option>
                {/* <option value="Admin">Admin (DCS)</option> */}
                <option value="Super Admin">Super Admin</option>
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="">Assign District</label>
              <select
                className="form-control"
                name="district"
                id=""
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              >
                <option value="">------</option>
                {districts &&
                  districts.map((d) => <option value={d}>{d}</option>)}
              </select>
              {/* <input type="text" className='form-control' name="district" id="" onChange={(e)=>setFormData({...formData, [e.target.name]: e.target.value})} /> */}
            </div>
            <div className="col-md-6">
              <label htmlFor="">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                id=""
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className="text-center">
              <Button variant="contained" onClick={handleSaveAdmin}>
                Save Admin
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  };

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
            {/* <Breadcrumb label={"Admin Details"} home={"Home"} /> */}
            <Breadcrumb labels={test}  />
            
          </Typography>
          <div role="presentation">
          <Typography>
          <div style={{float:'right'}}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      height: 40,
                      minWidth: 120,
                      "@media (max-width: 600px)": {
                        width: "100%",
                        marginTop: 1,
                      },
                    }}
                    onClick={() => setOpen(true)}
                  >
                    <i className="fa fa-plus"></i> &nbsp; Add New
                  </Button>

                  <Modal
                    maxWidth="md"
                    open={open}
                    handleClose={() => setOpen(false)}
                    modaldata={addAdminForm()}
                  />
                </div>
          </Typography>
          </div>
        </Toolbar>
        
      </Paper>
      <Loader open={loading} />
      <div className="container p-0 m-0">
      <Typography>
          <h6 style={{color:'gray'}}><strong>All admins are available here. You can create/delete/suspend from the action button.</strong></h6>
        </Typography>
        <div>
          <Card>
            {/* <div className="row">
              <div className="col-6">
                <div className="m-2">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      height: 40,
                      minWidth: 120,
                      "@media (max-width: 600px)": {
                        width: "100%",
                        marginTop: 1,
                      },
                    }}
                    onClick={() => setOpen(true)}
                  >
                    + Add New Admin
                  </Button>

                  <Modal
                    maxWidth="md"
                    open={open}
                    handleClose={() => setOpen(false)}
                    modaldata={addAdminForm()}
                  />
                </div>
              </div>
            </div> */}
            <div className="row">
              <div className="col-12">
                {/* <div className="m-2">
                  <h4> Admin list
                  <div className="float-end ">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      height: 40,
                      minWidth: 120,
                      "@media (max-width: 600px)": {
                        width: "100%",
                        marginTop: 1,
                      },
                    }}
                    onClick={() => setOpen(true)}
                  >
                    + Add New Admin
                  </Button>

                  <Modal
                    maxWidth="md"
                    open={open}
                    handleClose={() => setOpen(false)}
                    modaldata={addAdminForm()}
                  />
                </div>
                  </h4>
                  <Typography>
                    All admins are available here. You can create/delete/suspend
                    from the action button.
                  </Typography>
                </div> */}

                <AdminTable data={data} getAdmins={getAdmins} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminCategory;
