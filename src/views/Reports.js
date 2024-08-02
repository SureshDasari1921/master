import React, { useEffect, useState } from 'react'
import { Chart, registerables } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
// Chart.register(...registerables);
import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Form,
    Table,
    Container,
    Row,
    Col,
} from "react-bootstrap";
import RootService from 'service/RootService';
import flashservice from "components/Flash/flashservice"

import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ChartDataLabels);

const Reports = () => {
    const [tableData, setTableData] = useState([])
    const [totalData, setTotalData] = useState([])
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        fetchTransactionDetails()
    }, [])
    const handleChange = (event) => {
        let filterData = []
        for (const iterator of totalData) {
            if (iterator.transactionHistory.accountType == event.target.value) {
                filterData.push(iterator)
            }
        }
        setTableData(filterData)
        debitCredit(filterData)
        fetchData()
    }
    let creditAmount = 0
    let debitAmount = 0

    const fetchTransactionDetails = () => {
        RootService.fetchTrannsactionDetails().then((res) => {
            setTableData(res.data)
            setTotalData(res.data)
            debitCredit(res.data)
            fetchData()

        }).catch((err) => {
            flashservice.flash({ type: 'error', message: err.response.data })
        })
    }
    const fetchData = async () => {
        try {


            setChartData({
                labels: ['Credit', 'Debit'],
                datasets: [
                    {
                        data: [creditAmount, debitAmount], // Replace 2 with actual debit amount from data if available
                         label: 'Amount',
                        backgroundColor: ['green', 'red'],
                        hoverBackgroundColor: 'blue',
                        borderRadius: 5,
                        barThickness: 48,
                    },
                    
                ],
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const debitCredit = (data) => {

        let debit = 0
        let credit = 0
        for (const iterator of data) {
            if (iterator.transactionHistory.creditDebit == 'Credit') {
                credit += iterator.transactionHistory.amount
            }
            if (iterator.transactionHistory.creditDebit == 'Debit') {
                debit += iterator.transactionHistory.amount
            }
        }
        creditAmount = credit
        debitAmount = debit
        return [credit,debit]
    }

    const options = {

        maintainAspectRatio: false,
        scales: {
            yAxes: [
                {
                    ticks: {

                        beginAtZero: true,
                    },
                },
            ],
        },
        legend: {
            labels: {
                fontSize: 15,
            },
        },
        plugins: {
            legend: {
              display: true
            },
            datalabels: {
                display: true,
                color: "white"
              }
            
        }

    }

    return (
        <div>
            <Form   >
                <Row>

                    <Col className="px-1" md="6">
                        <Form.Group>
                            <label htmlFor="exampleInputEmail1">
                                Account Type
                            </label>
                            <select className="form-control" onChange={(e) => handleChange(e)}
                                name='accountType' >
                                <option value="">Select ...</option>
                                <option value="Saving Account">Saving Account</option>
                                <option value="Current Account">Current Account</option>
                                <option value="Salary Account"> Salary Account</option>

                            </select>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <div style={{ width: '70%' ,height:'300px'}} >
                <Bar options={options} data={chartData} plugins={[ChartDataLabels]} />
            </div>
        </div>
    )
}

export default Reports
