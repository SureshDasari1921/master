import React, { useEffect, useState } from "react";

// react-bootstrap components
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
import RootService from 'service/RootService';
import flashservice from "components/Flash/flashservice"
import { jwtDecode } from "jwt-decode";

function AccountDetails() {
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token);
    const [accountList, setAccountList] = useState([]);
    const [formStatus, setFormStatus] = useState("Create Account")
    const [accountData, setProfileData] = useState({
        bankAccount: '', accountType: '', userName: decoded.userName, email: decoded.email, firstName: '', lastName: '', address: '', city: '', country: '', postalCode: '', gender: '', panCardNumber: '', age: ''
        , mobileNumber: ''
    })

    useEffect(() => {
        getAccounts(); // Call getAccounts() when component mounts
       
    }, []); // Empty dependency array means this runs only once on mount

    const getAccounts = () => {  
        RootService.getAccountProfile()
            .then((res) => {
                setAccountList(res.data); // Update accountList state

            })
            .catch((err) => {
                console.error('Error fetching accounts:', err);
            });
    };

     


    const handleChange = (event) => {
         
        let formData = { ...accountData }
        formData[event.target.name] = event.target.value

        setProfileData(formData)

    }
    const submitForm = (event) => {
        event.preventDefault()
 
        submitData()

    }

    const submitData = () => {
        if (formStatus == 'Create Account') submitFormData()
        else editBankAccount()
    }

    const submitFormData = async () => {

        let value = Math.floor(1000000000 + Math.random() * 9000000000);

        const data={...accountData,accountNumber:value}
            RootService.crateAccountProfile(data).then((res) => {
                getAccounts()
                 cancel()
                flashservice.flash({ type: 'success', message: 'Account Created Successful' })

            }).catch((err) => {
                flashservice.flash({ type: 'error', message: err.response.data })
            })
        
    }

    const editBankAccount = () => {

        RootService.updateBankAccount(accountData).then((res) => {
            getAccounts()
            setFormStatus("Create Account")
            flashservice.flash({ type: 'success', message: 'Account Updated Successful' })
            cancel()
        }).catch((err) => {

        })
    }
    const showBankDetails = (data, type) => {
        if (type == 'edit') setFormStatus("Update Account")
        setProfileData({ ...accountData, ...data })

    }
    const cancel = () => {
        setProfileData({
            bankAccount: 'HDFC BANK', accountType: 'Savings', userName: decoded.userName, email: decoded.email, firstName: '', lastName: '', address: '', city: '', country: '', postalCode: '', gender: '', panCardNumber: '', age: ''
            , mobileNumber: ''
        })
        setFormStatus("Create Account")
    }
    const deleteBank = (data) => {
        RootService.deleteAccountProfile(data).then((res) => {
            getAccounts()

            flashservice.flash({ type: 'success', message: 'Account Deleted Successfully' })

        }).catch((err) => {

        })
    }  

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="8">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Account Profile</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={submitForm} >
                                    <Row>

                                        <Col className="px-1" md="6">
                                            <Form.Group>
                                                <label>Bank Account</label>
                                                <select className="form-control" onChange={(e) => handleChange(e)}
                                                    name='bankAccount' value={accountData.bankAccount} required> 
                                                    <option value="">Select ...</option>
                                                    <option value="HDFC BANK">HDFC BANK</option>

                                                </select>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label htmlFor="exampleInputEmail1">
                                                    Account Type
                                                </label>
                                                <select className="form-control" onChange={(e) => handleChange(e)}
                                                    name='accountType' value={accountData.accountType}  disabled={formStatus=='Update Account'}
                                                    required >
                                                    <option value="">Select ...</option>
                                                    <option value="Saving Account">Saving Account</option>
                                                    <option value="Current Account">Current Account</option>
                                                    <option value="Salary Account"> Salary Account</option>

                                                </select>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>

                                        <Col className="px-1" md="6">
                                            <Form.Group>
                                                <label>Username</label>
                                                <Form.Control disabled
                                                    onChange={(e) => handleChange(e)}
                                                    name='userName' value={accountData.userName}
                                                    placeholder="Username"  
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label htmlFor="exampleInputEmail1">
                                                    Email address
                                                </label>
                                                <Form.Control disabled onChange={(e) => handleChange(e)}
                                                    name='email' value={accountData.email}
                                                    placeholder="Email" 
                                                    type="email"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>First Name</label>
                                                <Form.Control
                                                    onChange={(e) => handleChange(e)}
                                                    name='firstName' value={accountData.firstName}
                                                    placeholder="Company" required
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label>Last Name</label>
                                                <Form.Control
                                                    onChange={(e) => handleChange(e)}
                                                    name='lastName' value={accountData.lastName}
                                                    placeholder="Last Name" required
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>Gender</label>
                                                <Form.Control
                                                    onChange={(e) => handleChange(e)}
                                                    name='gender' value={accountData.gender}
                                                    placeholder="Gender" required
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label>Age</label>
                                                <Form.Control
                                                    onChange={(e) => handleChange(e)}
                                                    name='age' value={accountData.age}
                                                    placeholder="Age" required
                                                    type="number"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label> Mobile Number</label>
                                                <Form.Control
                                                    onChange={(e) => handleChange(e)}
                                                    name='mobileNumber' value={accountData.mobileNumber}
                                                    placeholder="Mobile Number" required
                                                    type="number"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label>PAN Card Number</label>
                                                <Form.Control
                                                    onChange={(e) => handleChange(e)}
                                                    name='panCardNumber' value={accountData.panCardNumber}
                                                    placeholder="PAN Card Number"
                                                    type="text" required
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group>
                                                <label>Address</label>
                                                <Form.Control

                                                    placeholder="Home Address"
                                                    type="text" onChange={(e) => handleChange(e)}
                                                    name='address' value={accountData.address}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="4">
                                            <Form.Group>
                                                <label>City</label>
                                                <Form.Control
                                                    onChange={(e) => handleChange(e)}
                                                    name='city' value={accountData.city}
                                                    placeholder="City"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="px-1" md="4">
                                            <Form.Group>
                                                <label>Country</label>
                                                <Form.Control
                                                    onChange={(e) => handleChange(e)}
                                                    name='country' value={accountData.country}
                                                    placeholder="Country"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="4">
                                            <Form.Group>
                                                <label>Postal Code</label>
                                                <Form.Control
                                                    placeholder="ZIP Code" onChange={(e) => handleChange(e)}
                                                    name='postalCode' value={accountData.postalCode}
                                                    type="number"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>


                                    <Button
                                        className="btn-fill pull-right"
                                        type="submit"
                                        variant="info"
                                    >
                                        {formStatus}
                                    </Button>
                                    <Button
                                        className="btn-fill pull-right"
                                        type="button" style={{ position: 'relative', left: '20%' }}
                                        variant="info" onClick={cancel}
                                    >
                                        Cancel
                                    </Button>


                                    <div className="clearfix"></div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card className="card-user">
                            <div className="card-image">
                                <img
                                    alt="..."
                                    src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                                ></img>
                            </div>
                            <Card.Body>
                                <div className="author">
                                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                        <img
                                            alt="..."
                                            className="avatar border-gray"
                                            src={require("assets/img/faces/face-3.jpg")}
                                        ></img>
                                        <h5 className="title">{accountData.userName}</h5>
                                    </a>
                                    <p className="description">{accountData.email}</p>
                                </div>
                                <p className="description text-center"> </p>
                                <span style={{ position: 'relative', left: '20%', color: 'blue' }} > BANKS DETAILS</span>

                                {accountList.length && accountList.map((account, index) => {
                                    return (
                                        <div key={index}>
                                            <ul   >
                                                <li style={{ cursor: 'pointer' }} onClick={() => showBankDetails(account)} >{account.bankAccount}--{account.accountType}--{account.accountNumber}

                                                </li>
                                                <i style={{ cursor: 'pointer' }} onClick={() => deleteBank(account)} className="bi bi-trash3-fill"></i>

                                                <i style={{ cursor: 'pointer', position: 'relative', left: '10%' }} onClick={() => showBankDetails(account, 'edit')} className="bi bi-pencil-fill"></i>
                                            </ul>
                                        </div>
                                    )
                                })}

                            </Card.Body>
                            <hr></hr>
                            <div className="button-container mr-auto ml-auto">
                                <Button
                                    className="btn-simple btn-icon"
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                    variant="link"
                                >
                                    <i className="fab fa-facebook-square"></i>
                                </Button>
                                <Button
                                    className="btn-simple btn-icon"
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                    variant="link"
                                >
                                    <i className="fab fa-twitter"></i>
                                </Button>
                                <Button
                                    className="btn-simple btn-icon"
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                    variant="link"
                                >
                                    <i className="fab fa-google-plus-square"></i>
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default AccountDetails;
