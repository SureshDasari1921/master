import flashservice from "components/Flash/flashservice";
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

import { useDispatch, useSelector } from "react-redux";
import { updateAccountList } from "../redux/actions/actions";
import RootService from "service/RootService";
const DebitCredit = () => {
    const reduxData = useSelector(x => x)
    const usedispatch = useDispatch()
            
    const [depositCreditForm, setdepositCreditForm] = useState({
        bankAccount: 'HDFC BANK', accountNumber: '', amount: '', creditDebit: '', description: '',
        accountType: ''
    })
    const [totalAmountByAllAccounts, setTotalAmountByAllAccounts] = useState([])

    const handleChange = (event) => {
        setdepositCreditForm({ ...depositCreditForm, [event.target.name]: event.target.value })

    }

    useEffect(() => {
        if (depositCreditForm.accountType) fectBankDetails(depositCreditForm.bankAccount, depositCreditForm.accountType)
    }, [depositCreditForm.accountType])

    const fectBankDetails = (account, type) => {

        RootService.fetchBankDetails({ bankAccount: account, accountType: type }).then((res) => {
            console.log(reduxData)
            setdepositCreditForm({ ...depositCreditForm, accountNumber: res.data.accountNumber, bankAccount: res.data.bankAccount })
        }).catch((err) => {
            cancel()
            flashservice.flash({ type: 'error', message: err.response.data })
        })
    }
    const submitForm = (event) => {
        event.preventDefault()

        saveData()

    }
    const cancel = () => {
        setdepositCreditForm({
            bankAccount: 'HDFC BANK', accountNumber: '', amount: '', creditDebit: '', description: '',
            accountType: ''
        })
    }
    const totalAmountByBank = () => {
        for (const iterator of totalAmountByAllAccounts) {
            if (iterator.accountType == depositCreditForm.accountType) {
                return iterator.amount
            }
            
        }
        return 0
    }
    const saveData = () => {
        if (depositCreditForm.creditDebit == 'Debit') {
            if (depositCreditForm.amount > totalAmountByBank()) {
                return flashservice.flash({ type: 'error', message: 'Insufficient Funds' })
            }
        }
          const data = { ...depositCreditForm, transactionDate: new Date() }
        RootService.amountDepositWithdraw(data).then((res) => {
            getTotalAmount()
            cancel()
            flashservice.flash({ type: 'success', message: res.data })

        }).catch((err) => {
            flashservice.flash({ type: 'error', message: err.response.data })
        })
    }
    useEffect(() => {
        getTotalAmount()
    }, [])
    const getTotalAmount = () => {
        RootService.getTotalAmountsByAllAccounts().then((res) => {
            setTotalAmountByAllAccounts(res.data)
            usedispatch(updateAccountList(res.data))
  

        }).catch((err) => {
            flashservice.flash({ type: 'error', message: err.response.data })
        })
    }


    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="8">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Debit/Credit</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={submitForm} >
                                    <Row>

                                        <Col className="px-1" md="6">
                                            <Form.Group>
                                                <label>Bank Account</label>
                                                <select className="form-control" onChange={(e) => handleChange(e)}
                                                    name='bankAccount' value={depositCreditForm.bankAccount} disabled required >

                                                    <option value="HDFC BANK">HDFC BANK</option>

                                                </select>
                                            </Form.Group>
                                        </Col>
                                        <Col className="px-1" md="6">
                                            <Form.Group>
                                                <label> Account Type</label>
                                                <select className="form-control" onChange={(e) => handleChange(e)}
                                                    name='accountType' value={depositCreditForm.accountType} required>
                                                    <option value="">Select ...</option>
                                                    <option value="Saving Account">Saving Account</option>
                                                    <option value="Current Account">Current Account</option>
                                                    <option value="Salary Account"> Salary Account</option>

                                                </select>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label htmlFor="exampleInputEmail1">
                                                    Account Number
                                                </label>
                                                <Form.Control
                                                    onChange={(e) => handleChange(e)} disabled
                                                    name='accountNumber' value={depositCreditForm.accountNumber}
                                                    placeholder="Account Number" required
                                                    type="number"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>

                                        <Col className="px-1" md="6">
                                            <Form.Group>
                                                <label>Enter Amount</label>
                                                <Form.Control
                                                    onChange={(e) => handleChange(e)}
                                                    name='amount' value={depositCreditForm.amount}
                                                    placeholder="Enter Amount"
                                                    type="number" min="0" required
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="px-1" md="6">
                                            <Form.Group>
                                                <label>Select Type</label>
                                                <select className="form-control" onChange={(e) => handleChange(e)}
                                                    name='creditDebit' value={depositCreditForm.creditDebit} required  >
                                                    <option value=""> Select...</option>
                                                    <option value="Debit"> Debit</option>
                                                    <option value="Credit">Credit</option>
                                                </select>
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col className="px-1" md="6">
                                            <Form.Group>
                                                <label>Description</label>
                                                <Form.Control
                                                    onChange={(e) => handleChange(e)}
                                                    name='description' value={depositCreditForm.description}
                                                    placeholder="Description"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button
                                        className="btn-fill pull-right"
                                        type="submit"
                                        variant="info"
                                    >
                                        Submit
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
                                        <h5 className="title"> Total Amount </h5>
                                    </a>
                                    {
                                        totalAmountByAllAccounts.map((data) => (
                                            <p key={data._id} className="description">{data.accountType}-{data.amount}  </p>
                                        ))
                                    }

                                </div>
                                <p className="description text-center"> </p>



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
    )
}

export default DebitCredit
