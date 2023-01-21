import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "bootstrap/dist/css/bootstrap.min.css"
import "./css/Student.css"

export default function () {
    return (
        <div className="main">
            <div className="bg">
                <div className="title">Student Registration Form</div>
                <div className="form--bg">
                    <Form action="https://localhost:5000/Student" method="POST">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Full name"
                            className="mb-3"
                        >
                            <Form.Control name="fullname" type="text" placeholder="Enter your full name" />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="mb-3"
                        >
                            <Form.Control name="email" type="email" placeholder="name@example.com" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control type="password" placeholder="Password" />
                        </FloatingLabel>
                        <br />
                        <FloatingLabel controlId="floatingPassword" label="Confirm Password">
                            <Form.Control type="password" placeholder="Password" />
                        </FloatingLabel>
                        <br />
                        <Row className="g-2">
                            <Col md>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Select your batch"
                                >
                                    <Form.Select aria-label="Floating label select example">
                                        <option value="1">2019</option>
                                        <option value="2">2020</option>
                                        <option value="3">2021</option>
                                        <option value="3">2022</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel controlId="floatingInputGrid" label="CPI">
                                    <Form.Control type="text" placeholder="name@example.com" />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <br />
                        <Row className="g-2">
                            <Col xs={5}>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Age"
                                    className="mb-3"
                                    column lg={2}
                                >
                                    <Form.Control type="text" placeholder="Enter your age" />
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <Row className="g-2">
                                    <Form.Label>Gender</Form.Label>
                                    <div key="inline-radio" className="mb-3">
                                        <Form.Check
                                            inline
                                            label="Male"
                                            name="group1"
                                            type="radio"
                                            id="inline-radio-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="Female"
                                            name="group1"
                                            type="radio"
                                            id="inline-radio-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="Other"
                                            type="radio"
                                            id="inline-radio-3"
                                        />
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                        <Form.Label>TechStack</Form.Label>
                        {/* <Form.Control type="text" placeholder="Eg: HTML, CSS, JS,..." /> */}
                        <Form.Control as="textarea" rows={2} placeholder="Eg: HTML, CSS, JS,..."/>
                        <br />
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}