import React, { useState, useEffect } from 'react'
import api from '../../API/api';



const Register = () => {

    const [formData, setForm] = useState({
        user: "",
        email: "",
        password: "",
        confirm: "",
        number: ""
    }
    );

    const handleInputChange = (e) => {
        setForm({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {

        api.register(formData).then((res) => {
            console.log("Register=>", res);
        })
            .catch((err) => {
                console.log(err);
            })

    }



    return (
        <>
            <section className='bg-light'>
                <div className='container p-0'>
                    <div className='row justify-content-center'>
                        <div className='col-md-6'>
                            <div className='px-3 justify-content-center mt-5 mb-5'>
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className='img-fluid' />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="box-form">
                                <div className="right">

                                    <h2>Register</h2>
                                    <p>Don't have an account? <a href="#">Creat Your Account</a> it takes less than a minute</p>

                                    <div className="inputs">
                                        <label>User Name</label>
                                        <input type="text" name="user" value={formData.user} onChange={handleInputChange} placeholder="user name" />
                                        <br /><br />
                                        <label>User Name</label>
                                        <input type="text" name="user" value={formData.user} onChange={handleInputChange} placeholder="user name" />
                                        <br /><br />
                                        <label>Phone Number</label>
                                        <input type="number" name="phone" value={formData.number} onChange={handleInputChange} placeholder="number" />
                                        <br /><br />
                                        <label>Email Address</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Id" />
                                        <br /><br />
                                        <label>Password</label>
                                        <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="password" />
                                        <br /><br />
                                        <label>Confirm Password</label>
                                        <input type="password" name="password" value={formData.confirm} onChange={handleInputChange} placeholder="confirm password" />
                                    </div>

                                    <br /><br />

                                    {/* <div className="remember-me--forget-password">
                                        <label>
                                            <input type="checkbox" name="item" />
                                            <span className="text-checkbox">Remember me</span>
                                        </label>
                                        <p>forget password?</p>
                                    </div> */}

                                    <button onClick={handleSubmit}>Register</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


export default Register;