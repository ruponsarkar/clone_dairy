import React, { useState } from 'react'
import api from '../../API/api';
import AuthUser from '../../API/token';
import Nav2 from '../../components/common/navbar'

import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { Card } from '@mui/material';
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { setToken } = AuthUser();
    const nagivate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const submit = () => {
        let valid = true;

        console.log("1");
        
    if (!email) {
      setEmailError('Email cannot be empty.');
      valid = false;
      console.log("2");
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password cannot be empty.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
        setLoading(true);
        api.login(email, password)
            .then((res) => {
                if (res.data.status == 200) {
                    if (res.data.authenticated) {
                        console.log("Login success==>", res);
                        setToken(res.data.data, res.data.token);
                        window.location.reload();
                        // nagivate('/admin');
                        setLoading(false);
                    } else {
                        setLoading(false);
                        setError(true);
                    }
                } else {
                    setLoading(false);
                    setError(true);
                }
            })
            .catch((err) => {
                console.log("login error==>", err);
                setLoading(false);
                setError(true);
            })
        }
    }

    const Loading = () => {
        return (
            <Stack sx={{ color: 'grey.500' }} style={{ 'alignItems': 'center' }}>
                <CircularProgress color="inherit" />
            </Stack>
        );
    }

    return (
        <>
            <Paper>
            <Nav2 />
            
            <div className='col-12 p-0 m-0 pt-2 text-center'>
                <h2><i>ONLINE MILK COLLECTION & TRACKING MANAGEMENT SYSTEM</i></h2>
                {/* <h2><i>দুগ্ধ সমবায় সমিতিক গাখীৰ যোগান ধৰি থকা কৃষকসকলক 5 টকাৰ ৰাজসাহায্য প্ৰদান কৰা</i></h2> */}
                <br />
                <h2 className='text-white bg-warning'>DCS/DLC/SLSC LOGIN (ডিচিএছ/ডিএলচি/এছএলএছচি লগইন।)</h2>
                {/* <h2 className='text-white bg-warning'>ডিচিএছ/ডিএলচি/এছএলএছচি/বিত্ত লগইন।</h2> */}
            </div>
            <div className='bg-image'>
                <section>

                
                    <div class="container-fluid">
                        <div>
                            <div class="row ">
                                <div class="col-lg-8">
                                    {/* <div class="card1 pb-5">
                                        <div class="row p-3 justify-content-center mt-5 mb-5">
                                            <img src="https://media.istockphoto.com/id/1390481905/photo/multi-factor-authentication-user-login-cybersecurity-privacy-protect-data-internet-network.jpg?s=612x612&w=0&k=20&c=Hqaa0_JZ9j4isOgS3-SKUlDDBnFCgXMeAOykWATzF9I=" class="img-fluid p-0 shadow-lg mb-5 bg-white rounded" />
                                        </div>
                                    </div> */}
                                </div>

                                <div class="col-lg-4 pt-5 ">
                                    <Card>
                                        <div className='d-flex align-items-center justify-content-center pt-4'>
                                        <div class="form-2-wrapper">
                                            <h2 class="text-center mb-4">Sign Into Your Account</h2>
                                            <h6 className='text-white p-1 text-center bg-warning rounded'>DCS/DLC/SLSC LOGIN</h6>
                                                {/* <form> */}
                                                <br/>
                                                <div className="inputs">
                                                    <label>Email Address or User ID </label>
                                                    <input type="email" className='form-control' value={email} onChange={e => setEmail(e.target.value)} placeholder="enter a valid email address" />
                                                    
                                                    <label>Password</label>
                                                    <input type="password" className='form-control' value={password} onChange={e => setPassword(e.target.value)} placeholder="enter password" />
                                                </div>


                                                <div class="form-check">
                                                    <input type="checkbox" class="form-check-input" id="rememberMe" />
                                                    <label class="form-check-label" for="rememberMe">Remember me</label>
                                                    <a href="forget-3.html" class="text-decoration-none float-end">Forget Password</a>
                                                </div>

                                                <br />
                                                {emailError && <Alert severity="error">{emailError}</Alert>}
                                                {passwordError && <Alert severity="error">{passwordError}</Alert>}
                                                {error && <Alert severity="error">Something went wrong !</Alert>
                                                }

                                                <br />

                                                {loading ? <Loading /> :
                                                    <div className='text-center'>
                                                        <button className='btn btn-outline-secondary login-btn w-100 mb-3' onClick={submit}>Login</button>
                                                    </div>
                                                }



                                                <p class="text-center register-test mt-3">Don't have an account? <a href="register-3.html" class="text-decoration-none text-primary">Register here</a></p>
                                                {/* </form> */}
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                </div>
            </Paper>
        </>
    )
}


export default Login;