import React, { useState } from 'react'
// import {
//     Badge,
//     Button,
//     Card,
//     Form,
//     Navbar,
//     Nav,
//     Container,
//     Row,
//     Col
// } from "react-bootstrap";
import { Form, Button, Alert } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import RootService from 'service/RootService';
import { NavLink } from "react-router-dom";
import flashservice from 'components/Flash/flashservice'
import "../views/login.css";

import BackgroundImage from "../assets/images/background.png";
import Logo from "../assets/images/logo.png";

const Login = () => {

    const history = useHistory();
    const [loginData, setLoginData] = useState({ email: '', password: '' })
    const [formSubmit, setFormSubmit] = useState(false)

    const handleChange = (event) => {
        let formData = { ...loginData }
        formData[event.target.name] = event.target.value

        setLoginData(formData)

    }
    const submitForm = (event) => {
        event.preventDefault()
        setFormSubmit(true)
        console.log(formValidation())
        if (formValidation()) {
            submitData()
        }

    }
    const submitData = () => {
        RootService.login(loginData).then((res) => {

            flashservice.flash({ type: 'success', message: 'Login Successful' })
            localStorage.setItem("token", res.data.token)
            history.push("/admin/user")
        }).catch((err) => {

            if (err.response.data.message.includes("Invalid Email ID")) flashservice.flash({ type: 'error', message: err.response.data.message })
            if (err.response.data.message.includes("Invalid Credentials")) flashservice.flash({ type: 'error', message: err.response.data.message })
        })
    }
    const formValidation = () => {
        for (const key in loginData) {
            if (loginData[key] == "") {
                return false
            }
        }
        return true
    }

    return (
      
        <div
            className="sign-in__wrapper"
            style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
            {/* Overlay */}
            <div className="sign-in__backdrop"></div>
            {/* Form */}
            <Form className="shadow p-4 bg-white rounded" onSubmit={submitForm}>
                {/* Header */}
                <img
                    className="img-thumbnail mx-auto d-block mb-2"
                    src={Logo}
                    alt="logo"
                />
                <div className="h4 mb-2 text-center">Sign In</div>
 
                <Form.Group className="mb-2" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name='email' value={loginData.email} onChange={(e) => handleChange(e)}
                        placeholder="Email"

                        required
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name='password' value={loginData.password} onChange={(e) => handleChange(e)}
                        placeholder="Password"

                        required
                    />
                </Form.Group>


                <Button className="w-100" variant="primary" type="submit">
                    Log In
                </Button>

                <div className="d-grid justify-content-end">
                    <NavLink to="/register" style={{position:'relative',left:'30%'}}>

                        New User Register Here?

                    </NavLink>
                </div>
            </Form>
            {/* Footer */}

        </div>
    );

}

export default Login
