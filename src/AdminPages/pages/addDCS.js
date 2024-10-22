import React, { useEffect, useState } from "react";
import { Card, Paper, Toolbar, Typography, Button } from "@mui/material";
import AdminTable from "../table/adminTable";

import Modal from "../../ui-component/modal";
import Swal from "sweetalert2";
import Loader from "../../components/pannel/loader";
import api from "../../API/api";
import DCSTable from "../table/DCSTable";

import { styled, emphasize } from "@mui/material/styles";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";

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

const AddDCS = () => {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();

  const [formData, setFormData] = useState({
    status: 1,
  });

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user"));

    setUser(user);
    console.log("user ", user);
  }, []);

  useEffect(() => {
    getAllDCS();
  }, [user]);

  const handleCreateDCS = () => {
    api
      .createDCS(formData, user)
      .then((res) => {
        console.log("res ", res);
        setOpen(false);
        Swal.fire("DCS added successfully");
        getAllDCS();
      })
      .catch((err) => {
        console.log("err ", err);
        setOpen(false);
        Swal.fire("Something went wrong");
      });
  };

  const getAllDCS = () => {
    setLoading(true);
    if (user) {
      api
        .getAllDCS(user)
        .then((res) => {
          console.log("res", res.data);
          setData(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("err :", err);
          setLoading(false);
        });
    }
  };

  const addAdminForm = () => {
    return (
      <>
        <Paper elevation={1}>
          <div className="p-3">
            <div className="row">
              <div className="col-md-12">
                <label htmlFor=""> Name of DCS</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id=""
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="">Registration no</label>
                <input
                  type="text"
                  className="form-control"
                  name="registration_no"
                  id=""
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="">District</label>

                <select
                  className="form-control"
                  name="district"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  id=""
                >
                  <option value="">-select-</option>
                  {districts &&
                    districts.map((d) => <option value={d}>{d}</option>)}
                </select>
              </div>
              <div className="col-md-12">
                <label htmlFor=""> Address of DCS</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  id=""
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id=""
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>

              <div className="text-center">
                <Button variant="contained" onClick={handleCreateDCS}>
                  Add DCS
                </Button>
              </div>
            </div>
          </div>
        </Paper>
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
            DCS
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
              <StyledBreadcrumb label="DCS" />
            </Breadcrumbs>
          </div>
        </Toolbar>
      </Paper>
      <Loader open={loading} />
      <div className="container p-0">
        <div className="mt-2">
          <Card>
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
                + Add New DCS
              </Button>

              <Modal
                maxWidth="md"
                open={open}
                handleClose={() => setOpen(false)}
                modaldata={addAdminForm()}
              />
            </div>
            <div className="row">
              <div className="col-12">
                <div className="m-2">
                  <h4> DCS list</h4>
                  <Typography>All DCS are available here.</Typography>
                </div>

                <DCSTable data={data} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AddDCS;
