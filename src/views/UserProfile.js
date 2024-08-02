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

function User() {
  const token = localStorage.getItem('token')
  const decoded = jwtDecode(token);


  const [profileData, setProfileData] = useState({ userName: '', email: '', firstName: '', lastName: '', address: '', city: '', country: '', postalCode: '', aboutMe: '' })
   

  useEffect(() => {
    setProfileData({ userName: decoded.userName, email: decoded.email, firstName: '', lastName: '', address: '', city: '', country: '', postalCode: '', aboutMe: '' })
  }, [])

  useEffect(() => {
    RootService.getProfile({email:decoded.email}).then((res) => {
          let profile=res.data?res.data.data:{}
     if(Object.keys(profile).length!=0) setProfileData({ ...profileData, ...profile })

    }).catch((err) => {
      console.log(err)
    })
 
  }, [])


  const handleChange = (event) => {
    let formData = { ...profileData }
    formData[event.target.name] = event.target.value

    setProfileData(formData)

  }
  const submitForm = (event) => {
    event.preventDefault()

    submitData()

  }

  const submitData = () => {
    RootService.updateProfile(profileData).then((res) => {

      flashservice.flash({ type: 'success', message: 'Profile Updated Successful' })

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
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={submitForm} >
                  <Row>

                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Username</label>
                        <Form.Control disabled
                          onChange={(e) => handleChange(e)}
                          name='userName' value={profileData.userName}
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
                          name='email' value={profileData.email}
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
                          name='firstName' value={profileData.firstName}
                          placeholder="Company"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          onChange={(e) => handleChange(e)}
                          name='lastName' value={profileData.lastName}
                          placeholder="Last Name"
                          type="text"
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
                          name='address' value={profileData.address}
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
                          name='city' value={profileData.city}
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
                          name='country' value={profileData.country}
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
                          name='postalCode' value={profileData.postalCode}
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>About Me</label>
                        <Form.Control
                          cols="80"
                           
                          placeholder="Here can be your description"
                          rows="4" onChange={(e) => handleChange(e)}
                          name='aboutMe' value={profileData.aboutMe}
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
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
                    <h5 className="title">{profileData.userName}</h5>
                  </a>
                  <p className="description">{profileData.email}</p>
                </div>
                <p className="description text-center">
                {profileData.aboutMe}  <br></br>
                  
                </p>
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

export default User;
