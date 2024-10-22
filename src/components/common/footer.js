import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        
        <div className="footer">
        
            <section className="contact-area footer-bg pt-3" id="contact">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="contact-content text-center">
                                {/* <a href="#"><img src="https://i.ibb.co/QDy827D/ak-logo.png" alt="logo" /></a> */}
                                {/* <h5 className="text-dark">Providing Rs. 5 subsidy to farmers pouring milk to Dairy Co-operative Societies</h5> */}
                                {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum </p>
                                <div className="hr"></div>
                                <h6>1120 Lorem ipsum dolor sit amet, KC 179050, Chandigarh.</h6>
                                <h6>+01 2345 6789 12<span>|</span>+01 2345 6789 12</h6> */}
                                <div className="contact-social">
                                    <ul>
                                        {/* <li><a className="hover-target" href=""><i className="fa fa-facebook-f"></i></a></li> */}
                                        {/* <li><a className="hover-target" href="https://twitter.com/AnganaCk"><i className="fa fa-twitter"></i></a></li>
                                        <li><a className="hover-target" href="https://www.linkedin.com/in/angana-chakrabarti-a75a01157/"><i className="fa fa-linkedin"></i></a></li>
                                        <li><a className="hover-target" href="mailto:anganachakrabarti01@gmail.com"><i className="fa fa-envelope"></i></a></li> */}
                                        {/* <li><a className="hover-target" href=""><i className="fa fa-pinterest-p"></i></a></li> */}
                                    </ul>
                                </div>
                                <footer>
                                    <p>All rights reserved. ONLINE MILK COLLECTION & TRACKING MANAGEMENT SYSTEM | <a href="/#/admin">ADMIN </a>, Copyright &copy; 2024 </p>
                                    <p>Designed and Developed By <b>Skaplink Technologies Pvt. Ltd.</b></p>
            </footer>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
        </div>
        
    );
};

export default Footer;