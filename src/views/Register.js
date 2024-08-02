import React, { useState } from 'react'
import {
    Badge,
    Button,
    Card,
    Form,
    Navbar,
    Nav,
    Container,
    Row,
    Col
} from "react-bootstrap";

import { NavLink } from "react-router-dom";
import validator from 'validator';
import { useHistory } from 'react-router-dom';
import PasswordChecklist from "react-password-checklist"
import RootService from 'service/RootService';
import flashservice from "components/Flash/flashservice"
import "../views/login.css";

import BackgroundImage from "../assets/images/background.png";
import Logo from "../assets/images/logo.png";

const Register = () => {

    const history = useHistory();
    const [registerData, setRegisterData] = useState({ userName: '', email: '', password: '', confirmPassword: '' })
    const [formSubmit, setFormSubmit] = useState(false)
    const [passwordValid, setPasswordValid] = useState(false)
    const handleChange = (event) => {
        let formData = { ...registerData }
        formData[event.target.name] = event.target.value

        setRegisterData(formData)

    }
    const submitForm = (event) => {
        event.preventDefault()
        setFormSubmit(true)
        console.log(formValidation(), passwordValid)
        if (formValidation()) {
            submitData()
        }

    }
    const submitData = () => {
        RootService.register(registerData).then((res) => {
            flashservice.flash({ type: 'success', message: 'Register Successful Login To Continue' })
            history.push("/")
        }).catch((err) => {
            if (err.response.data.message.includes("duplicate key")) flashservice.flash({ type: 'error', message: "Email ID Already Exist" })

        })
    }



    const formValidation = () => {
        for (const key in registerData) {
            if (registerData[key] == "") {
                return false
            }
        }
        return true
    }
    const passwordValidation = (event) => {
        setPasswordValid(event)
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
                <div className="h4 mb-2 text-center">Register</div>
                <Form.Group className="mb-2" controlId="username">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                        type="text"
                        name='userName' value={registerData.userName} onChange={(e) => handleChange(e)}
                        placeholder="User Name"

                        required
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name='email' value={registerData.email} onChange={(e) => handleChange(e)}
                        placeholder="Email"

                        required
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name='password' value={registerData.password} onChange={(e) => handleChange(e)}
                        placeholder="Password"

                        required
                    />
                </Form.Group>
                {registerData.password && < PasswordChecklist
                    rules={["minLength", "specialChar", "number", "capital", "lowercase"]}
                    minLength={8}
                    // maxLength={16}
                    value={registerData.password}
                    // valueAgain={passwordAgain}
                    onChange={(isValid) => passwordValidation(isValid)}
                    messages={{

                        specialChar: "Atleaset one special character",
                        number: "Atleaset one number.",
                        capital: "Atleaset one uppercase",
                        // match: "Las contraseñas coinciden.",
                        minLength: "minimum 8 caracteres.",
                        // maxLength:"maximum 16 characters",
                        lowercase: "Atleaset one lowercase",
                    }}
                />
                }
                <Form.Group className="mb-2" controlId="confirm password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        name='confirmPassword' value={registerData.confirmPassword} onChange={(e) => handleChange(e)}
                        placeholder="Password"

                        required
                    />
                </Form.Group>
                {registerData.confirmPassword &&
                    <PasswordChecklist
                        rules={["match"]}

                        value={registerData.password}
                        valueAgain={registerData.confirmPassword}
                        onChange={(isValid) => passwordValidation(isValid)}
                        messages={{
                            match: "password matched",

                        }}
                    />
                }

                <Button className="w-100" variant="primary" type="submit">
                    Register
                </Button>

                <div className="d-grid justify-content-end">
                    <NavLink to="/" style={{ position: 'relative', left: '40%' }}>

                        Back to login

                    </NavLink>
                </div>
            </Form>
            {/* Footer */}

        </div>
    )
}

export default Register
