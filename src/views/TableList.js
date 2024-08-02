import React, { useEffect, useState } from "react";
import html2canvas from 'html2canvas'
  ;
// react-bootstrap components
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
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
function TableList() {

  const [tableData, setTableData] = useState([])
  const [totalData, setTotalData] = useState([])
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

  }
 
  const fetchTransactionDetails = () => {
    RootService.fetchTrannsactionDetails().then((res) => {
      setTableData(res.data)
      setTotalData(res.data)
    }).catch((err) => {
      flashservice.flash({ type: 'error', message: err.response.data })
    })
  }
 
  const downloadPdf = () => {

    const input = document.getElementById('transaction-table');

    html2canvas(input, { scrollY: -window.scrollY, scale: 2 })
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = pdf.internal.pageSize.width;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let position = 10;
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('transaction-history.pdf');
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Transaction History </Card.Title>
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
                <span style={{ position: 'relative', left: '90%', cursor: 'pointer' }} onClick={downloadPdf} >Download Pdf</span>
                

              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped" id="transaction-table">
                  <thead>
                    <tr>
                      <th className="border-0">SL NO</th>
                      <th className="border-0">BANK ACCOUNT</th>
                      <th className="border-0">ACCOUNT NUMBER</th>
                      <th className="border-0">AMOUNT</th>
                      <th className="border-0">ACCOUNT TYPE</th>
                      <th className="border-0">TRANSACTION DATE</th>
                      <th className="border-0">DEBIT/CREDIT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.length!=0 && tableData.map((data, index) => (
                        
                        <tr key={data._id}>
                          <td>{index + 1}</td>
                          <td>{data.transactionHistory.bankAccount}</td>
                          <td>{data.transactionHistory.accountNumber}</td>
                          <td>{data.transactionHistory.amount}</td>
                          <td>{data.transactionHistory.accountType}</td>
                          <td>{data.transactionHistory.transactionDate}</td>
                          <td style={{ 'color': data.transactionHistory.creditDebit == 'Debit' ? 'red' : 'green' }}>{data.transactionHistory.creditDebit}</td>
                        </tr>
                      ))
                    }
 
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
    </>
  );
}

export default TableList;
