import React from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import api from "../../API/api";
import CountStatus from "./countStatus";
const OverviewScheme = () => {
  useEffect(() => {
    apiTesting();
  });

  const apiTesting = () => {
    console.log(" process.env.baseURL=", process.env);
    api
      .apiTesting()
      .then((res) => {
        console.log("Response==>", res);
      })
      .catch((err) => {
        console.log("error==>", err);
      });
  };

  const customStyle = {
    fontFamily: "Arial, sans-serif", // Change to desired font
    color: "#333", // Custom text color
  };

  return (
    <Container>
      <Col md={12} className="pt-3 text-center">
        <h2>
          <div>

            <i>
            ONLINE MILK COLLECTION & TRACKING MANAGEMENT SYSTEM
            </i>
          </div>
          <div>

            {/* <i>
              দুগ্ধ সমবায় সমিতিক গাখীৰ  যোগান ধৰি থকা কৃষকসকলক 5 টকাৰ ৰাজসাহায্য প্ৰদান কৰা
            </i> */}
          </div>
        </h2>
      </Col>

      <div class="container py-3">
        <div class="row g-4">
          <div class="col-md-12">
            <Col md={12}>
              <img
                src="assets/dairy1.jpg"
                alt="Overview of the Scheme"
                className="img-fluid w-100 rounded-corners shadow-lg mb-5 bg-white rounded"
              />
            </Col>
          </div>
          {/* <div class="col-md-5 d-flex flex-column justify-content-center">
            <h2 class="section-title text-center">Register</h2>
            <p class="about-us-text text-center">
              The DCS must be functional before March 31, 2024 and registered under the Assam Co-operative Societies Act, 2007.
            </p>
           
          
            <a href="javascript:;" class="btn btn-primary pt-2">
              Register Here &rarr;
            </a>
          </div> */}
        </div>
      </div>

      <CountStatus user={{ "role": "Super Admin", "district": "All" }} />

      <Row>
        <Col md={12}>
          <Row>
            {/* <Col md={12} className='text-center'>
                <img src="assets/scheme-overview.png" alt="Overview of the Scheme" className="img-fluid" />
            </Col>
 */}

            <Col md={12}>
              <Card className="shadow-lg mb-5 bg-white rounded">
                <Card.Body>
                  {/* <Card.Title style={customStyle} className="text-center"><u>PROPOSED IMPLEMENTATION STRATEGY FOR THE SCHEME</u></Card.Title> */}

                  <Row style={customStyle} className="mb-1">
                    <Col>
                      <h4 className="text-center p-3">
                        <u>PROPOSED IMPLEMENTATION STRATEGY FOR THE SCHEME</u>
                      </h4>
                      <h5 style={customStyle}>
                        Proposed Strategy of Implementation:
                      </h5>
                      <p style={customStyle}>
                        <ol>
                          <li>
                            The scheme will be implemented in Direct Benefit
                            Transfer (DBT) mode.
                          </li>
                          <li>
                            Data of the beneficiaries will be collected in
                            prescribed format and approved by the District Level
                            Committee (DLC) of respective districts.
                          </li>
                          <li>
                            The final approved list will be uploaded in the
                            portal.
                          </li>
                          <li>
                            The State Level Selection Committee will accord
                            final approval.
                          </li>
                          <li>
                            The disbursal of the amount for approved beneficiary
                            will be done through DBT.
                          </li>
                        </ol>
                      </p>
                    </Col>
                  </Row>


                  <Row className="mb-1">
                    <Col>
                      <h5 style={customStyle}>Eligibility Criteria:</h5>
                      <p style={customStyle}>
                        <ol>
                          <li>
                            Farmer should be a pouring member of a functional
                            DCS formed on or before 31st March, 2024 (as per
                            Assam Co-operative Societies Act, 2007).
                          </li>
                        </ol>
                      </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={12}>
          <Card className="shadow-lg mb-5 bg-white rounded">
            <Card.Body>
              {/* <Card.Title className="text-center"><u>OVERVIEW OF THE SCHEME</u></Card.Title> */}

              <Row className="mb-4">
                <Col>
                  <h4 className="text-center p-3">
                    <u>OVERVIEW OF THE SCHEME</u>
                  </h4>
                  <h5 style={customStyle}>Genesis of the scheme:</h5>
                  <p style={customStyle}>
                    As announced by Hon’ble Chief Minister at the inauguration
                    of National Farming Conclave in Guwahati, Rs 5 per liter of
                    milk per day is to be provided to farmers selling milk
                    through dairy co-operative society.
                  </p>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col>
                  <h5 style={customStyle}>Objective of the scheme:</h5>
                  <p style={customStyle}>
                    To encourage formalization of dairy sector in Assam and
                    compensate the dairy farmers against high cost of milk
                    production such that the locally produced milk could compete
                    with the cheap imported milk from other states of India.
                  </p>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col>
                  <h5 style={customStyle}>
                    Justification for requirement of Rs. 2500 lakh
                  </h5>
                  <p style={customStyle}>
                    As per data received from Department of Co-operation:
                  </p>
                  <ol style={customStyle}>
                    <li>
                      308 functional DCS with milk data are available (excluding
                      8 nos. 6th schedule areas)
                    </li>
                    <li>
                      Approximately, 10437 dairy farmers are associated with the
                      308 DCS
                    </li>
                    <li>
                      Approximately, 1.33 lakh litres of milk is marketed
                      through the above mentioned DCS per day
                    </li>
                    <li>
                      Therefore, 1.33 L x Rs. 5 x 365 days = Rs. 2430 lakh i.e.
                      ~ Rs. 2500 lakh is required to implement the scheme
                    </li>
                  </ol>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OverviewScheme;
