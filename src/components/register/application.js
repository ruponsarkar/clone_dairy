import React from "react";
import Nav2 from "../../components/common/navbar";
import Footer from "../common/footer";
import { Paper, Button } from "@mui/material";

const Application = ({ data }) => {
  return (
    <>
      {/* <Nav2 /> */}
      <div className="container">
        <div className="row py-3">
          <Paper>
            <div style={{ overflowX: "auto" }}>
              <div className="py-4">
                <h3 className="text-center">
                  Milk to Dairy Co-operative Societies
                </h3>
              </div>
              <table className="py-3">
                <tr>
                  <th>Name of the applicant</th>
                  <th>Father/Spouse's Name</th>
                  <th>Mobile Number</th>
                  <th>Date of Birth</th>
                </tr>
                <tr>
                  <td>{data.name}</td>
                  <td>{data.fathersName}</td>
                  <td>{data.mobileNumber}</td>
                  <td>{data.dob}</td>
                </tr>
                <tr>
                  <th>12 digit AADHAAR number</th>
                  <th>AADHAAR linked mobile number</th>
                  <th>PAN number</th>
                  <th>Voter ID number</th>
                </tr>
                <tr>
                  <td>{data.aadhaarNo}</td>
                  <td>{data.aadharMobile}</td>
                  <td>{data.pan_number}</td>
                  <td>{data.voterID}</td>
                </tr>
                <tr>
                  <th>Area of residence</th>
                  <th>District</th>
                  <th>LAC</th>
                  <th>Village</th>
                </tr>
                <tr>
                  <td>{data.area}</td>
                  <td>{data.district}</td>
                  <td>{data.LAC}</td>
                  <td>{data.village}</td>
                </tr>
                <tr>
                  <th>Gaon Panchayat</th>
                  <th>Block</th>
                  <th>Pincode</th>
                  <th>Police Station</th>
                </tr>
                <tr>
                  <td>{data.gaon_panchayat}</td>
                  <td>{data.block}</td>
                  <td>{data.pincode}</td>
                  <td>{data.police_station}</td>
                </tr>
                <tr>
                  <th>Name of Dairy Co-operative Society</th>
                  <th>Address of the Dairy Co-operative Society</th>
                  <th>Registration number of Dairy Co-operative Society</th>
                  <th>Name of the bank</th>
                </tr>
                <tr>
                  <td>{data.name_of_co_operatice_society}</td>
                  <td>{data.addree_of_co_operatice_society}</td>
                  <td>{data.registration_no_of_co_operatice_society}</td>
                  <td>{data.bank_name}</td>
                </tr>
                <tr>
                  <th>Name of the Account holder </th>
                  <th>Bank Account Number</th>
                  <th>IFSC code</th>
                  <th>Gender</th>
                </tr>
                <tr>
                  <td>{data.bank_account_holder_name}</td>
                  <td>{data.bank_account_no}</td>
                  <td>{data.ifsc_code}</td>
                  <td>{data.gender}</td>
                </tr>

                <tr>
                  <th colSpan="2">Submitted Date</th>
                  <th colSpan="1">Status</th>
                  {data.status === "Reject" && <th colSpan="1">Remark</th>}
                </tr>
                <tr>
                  <td colSpan="2">{data.created_at} </td>
                  {/* <td colspan="2" className="text-danger"> Under Verification</td> */}
                  <td colSpan="1" className="text-success">
                    {/* {data.status} */}
                    {data.status === "Draft" && (
                      <span className="bg-secondary px-1 rounded">Draft</span>
                    )}
                    {data.status === "Incompleted" && (
                      <span className="bg-warning px-1 rounded">
                        Incompleted
                      </span>
                    )}
                    {data.status === "Approve" && (
                      <span className="bg-success px-1 rounded">Approved</span>
                    )}
                    {data.status === "Reject" && (
                      <span className="bg-danger px-1 rounded">Rejected</span>
                    )}
                  </td>
                  {data.status === "Reject" && (
                    <td colSpan="1">{data.remark} </td>
                  )}
                </tr>
              </table>
            </div>
          </Paper>

          {/* <Paper>
                        <div className="p-3">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <strong>Status</strong> : Under Verification
                                </div>
                                <div>
                                    <Button>
                                    Print
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Paper> */}
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default Application;
