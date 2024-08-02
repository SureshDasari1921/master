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
import { useSelector } from "react-redux";
const Budgets = () => {

    const reduxData=useSelector(x=>x)

    const [budgetData, setBudgetData] = useState({
        bankAccount: 'HDFC BANK', accountType: '', accountNumber: '', accountBalance: '', transactionDate: '', creditDebit: 'Debit', amount: '',
        description: '',category:''
    })

    useEffect(() => {
       if(budgetData.accountType) fectBankDetails(budgetData.bankAccount, budgetData.accountType)
    }, [budgetData.accountType])
     
    let accNumber, amount
    const fectBankDetails = (account, type) => {

        RootService.getTotalAmountsByAllAccounts().then((res) => {
            accNumber=''
            amount=''
            let i=0
            console.log(reduxData)  
            for (const iterator of res.data) {
                
                if (iterator.accountType == type) {
                    i++
                    accNumber = iterator.accountNumber
                    amount = iterator.amount
                }
                 
            }
            if(i==0)  flashservice.flash({ type: 'error', message: 'Account Does Not Exist' })
            setBudgetData({ ...budgetData, accountNumber: accNumber, accountBalance: amount })
             
        }).catch((err) => {
            cancel()
            
        })
    }

    const handleChange = (event) => {

        let formData = { ...budgetData }
        formData[event.target.name] = event.target.value

        setBudgetData(formData)

    }
    const submitForm = (event) => {
        event.preventDefault()

        submitData()

    }
    const cancel = () => {
       setBudgetData({  bankAccount: 'HDFC BANK', accountType: '', accountNumber: '', accountBalance: '', transactionDate: '', creditDebit: 'Debit', amount: '',
        description: ''})
    }

    const submitData = () => {
        if (budgetData.amount > budgetData.accountBalance) {
            return flashservice.flash({ type: 'error', message: 'Insufficient Funds' })
        }
        const data =  budgetData
        data['transactionDate']=new Date()
        delete data.accountBalance

        RootService.amountDepositWithdraw(data).then((res) => {
           
            cancel()
            flashservice.flash({ type: 'success', message: res.data })

        }).catch((err) => {
            flashservice.flash({ type: 'error', message: err.response.data })
        })
    }
     

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col md="8">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Budgets Details</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={submitForm} >
                                    <Row>

                                        <Col className="px-1" md="6">
                                            <Form.Group>
                                                <label>Bank Account</label>
                                                <select className="form-control" onChange={(e) => handleChange(e)}
                                                    name='bankAccount' value={budgetData.bankAccount} disabled required>

                                                    <option value="HDFC BANK">HDFC BANK</option>

                                                </select>
                                            </Form.Group>
                                        </Col>
                                        <Col className="px-1" md="6">
                                            <Form.Group>
                                                <label> Account Type</label>
                                                <select className="form-control" onChange={(e) => handleChange(e)}
                                                    name='accountType' value={budgetData.accountType} required >
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
                                                    onChange={(e) => handleChange(e)} disabled required
                                                    name='accountNumber' value={budgetData.accountNumber}
                                                    placeholder="Account Number"
                                                    type="number"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label htmlFor="exampleInputEmail1">
                                                    Account Balance
                                                </label>
                                                <Form.Control
                                                    onChange={(e) => handleChange(e)} disabled
                                                    name='accountNumber' value={budgetData.accountBalance}
                                                    placeholder="Account Balance" 
                                                    type="number"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>

                                        <Col className="px-1" md="6">
                                            <Form.Group>
                                                <label>  Amount</label>
                                                <Form.Control
                                                    onChange={(e) => handleChange(e)}
                                                    name='amount' value={budgetData.amount}
                                                    placeholder=" Amount" required
                                                    type="number" min="0"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        {/* <Col className="px-1" md="6">
                                            <Form.Group>
                                                <label> Date</label>
                                                <Form.Control
                                                    onChange={(e) => handleChange(e)}
                                                    name='budgetDebitDate' value={budgetData.budgetDebitDate}
                                                    placeholder="date"
                                                    type="date"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col> */}
                                        <Col className="px-1" md="6">
                                            <Form.Group>
                                                <label>Category</label>
                                                <select className="form-control" onChange={(e) => handleChange(e)}
                                                    name='category' value={budgetData.category} required  >
                                                    <option value=""> Select...</option>
                                                    <option value="Groceries">Groceries</option>
                                                    <option value="Movie">Movie</option>
                                                    <option value="Shopping">Shopping</option>
                                                    <option value="House Rent">House Rent</option>
                                                </select>
                                            </Form.Group>
                                        </Col>
                                        <Col className="px-1" md="6">
                                            <Form.Group>
                                                <label>Description</label>
                                                <Form.Control
                                                    onChange={(e) => handleChange(e)}
                                                    name='description' value={budgetData.description}
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

                </Row>
            </Container>
        </div>
    )
}

export default Budgets
