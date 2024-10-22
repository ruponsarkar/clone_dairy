import React from 'react'
import Paper from '@mui/material/Paper';
import { Card } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

import ConnectModal from '../pannel/connectModal';


const About = (props) => {
    return (
        <>
            <div className="container mt-3 paddsection" id="aboutMe" style={{ paddingBottom: '30px' }}>

                <div className="row">
                    <Paper elevation={3}>
                        <br />
                        <br />
                        <br />
                        <div className=" m-2 mt-4 py-4">
                            {/* <hr /> */}
                            <div className="row  align-items-center">


                                <div className="col-md-5 text-center">

                                    <img src="assets/angana.jpg" className="col-12" alt="img" style={{ borderRadius: '50%', height: '250px', width: '250px' }} />
                                </div>
                                <div className="col-md-6">
                                    <div className="col-12">
                                        <h2 className='py-4'>Angana Chakrabarti</h2>
                                    </div>

                                    <div className=' font-large' style={{ textAlign: 'justify' }}>
                                        {/* <strong> */}
                                        <span>
                                            {props.bio && props.bio.bio}
                                            {/* I am an independent multimedia journalist based out of Guwahati. I primarily cover the Northeast region, focusing on the domains of politics, policy, human rights, crime, and environment. In 2022, I won the RedInk award for my report on the vandalism of mosques in Tripura. */}
                                        </span>
                                        {/* </strong> */}
                                    </div>
                                    <br />



                                </div>

                            </div>

                            {/* <div className="row justify-content-center">
                                <div className='col-md-3 text-center m-4'>
                                    <a href="/#latest-journal"> <div class="cust-btn">Check My Works <KeyboardDoubleArrowDownIcon /> </div>
                                    </a>
                                </div>
                            </div>
                            <hr /> */}


                            {/* <hr /> */}






                            {/* <div className="col-12">
                                <div className="text-center m-4 link-b">

                                    <div class="site" style={{width: 'max-content'}}>
                                        <h4> Social Links</h4>
                                    </div>

                                    <div class="wrapper">
                                        <a href="#"><div class="bg-ico" id="facebook"><i class="fa fa-facebook social  facebook fa-2x"></i></div></a>
                                        <a href="#"><div class="bg-ico" id="pinterest"><i class="fa fa-pinterest social  pinterest fa-2x"></i></div></a>
                                        <a href="#"><div class="bg-ico" id="twitter"><i class="fa fa-twitter social  twitter fa-2x"></i></div></a>
                                        <a href="#"><div class="bg-ico" id="instagram"><i class="fa fa-instagram social  instagram fa-2x"></i></div></a>
                                        <a href="#"><div class="bg-ico" id="tumblr"><i class="fa fa-tumblr social  tumblr fa-2x"></i></div></a>
                                        <a href="#"><div class="bg-ico" id="whatsapp"><i class="fa fa-whatsapp social  whatsapp fa-2x"></i></div></a>
                                        <a href="#"><div class="bg-ico" id="youtube"><i class="fa fa-youtube social  youtube fa-2x"></i></div></a>
                                    </div>


                                </div>
                            </div> */}






                        </div>
                        <br />
                        <br />
                        <br />
                        <br />
                    </Paper>



                </div>

            </div>
            <Card>
                <div className='my-4'>
                    <div className="row justify-content-center">
                        <div className='col-md-3 col-lg-3 col-sm-6 col-8 text-center m-4'>
                            <ConnectModal />
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default About;