import React from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "bootstrap/dist/css/bootstrap.min.css"
import "./css/Student.css"
import axios from "axios"

export default function Student() {

    const data = {}
    const [formData, setFormData] = useState(data);

    const inputchangeHandler = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }

    const genderChangeHandler = (e) => {
        setFormData({
            ...formData,
            male: "off",
            female:"off",
            other: "off",
            [e.target.id]: e.target.value
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(formData);
        axios.post("http://localhost:5000/Student",formData).then(res => {
            console.log(res);
        })
    }

    return (
        <div className="studentSignIn">
            <div className="bg">
                <div className="title">Student Registration Form</div>
                <div className="form--bg">
                    <Form>
                        <FloatingLabel
                            controlId="name"
                            label="Full name"
                            className="mb-3"
                        >
                            <Form.Control name="name" type="text" placeholder="Enter your full name" onChange={(e)=>inputchangeHandler(e)}/>
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="email"
                            label="Email address"
                            className="mb-3"
                        >
                            <Form.Control name="email" type="email" placeholder="name@example.com" onChange={(e)=>inputchangeHandler(e)}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </FloatingLabel>

                        <FloatingLabel controlId="password" label="Password">
                            <Form.Control name="password" type="password" placeholder="Password" onChange={(e)=>inputchangeHandler(e)}/>
                        </FloatingLabel>
                        <br />
                        <FloatingLabel controlId="confirmPassword" label="Confirm Password">
                            <Form.Control name="confirmPassword" type="password" placeholder="Password" onChange={(e)=>inputchangeHandler(e)}/>
                        </FloatingLabel>
                        <br />
                        <Row className="g-2">
                            <Col md>
                                <FloatingLabel
                                    controlId="batch"
                                    label="Select your batch"
                                    onChange={(e)=>inputchangeHandler(e)}
                                >
                                    <Form.Select name="batch" aria-label="Floating label select example">
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel controlId="cpi" label="CPI">
                                    <Form.Control name="cpi" type="number" placeholder="name@example.com" onChange={(e)=>inputchangeHandler(e)}/>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <br />
                        <Row className="g-2">
                            <Col xs={5}>
                                <FloatingLabel
                                    controlId="age"
                                    label="Age"
                                    className="mb-3"
                                    column lg={2}
                                >
                                    <Form.Control type="number" placeholder="Enter your age" onChange={(e)=>inputchangeHandler(e)}/>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <Row className="g-2">
                                    <Form.Label>Gender</Form.Label>
                                    <div  id="gender" onChange={(e)=>genderChangeHandler(e)} key="inline-radio" className="mb-3">
                                        <Form.Check
                                            inline
                                            label="Male"
                                            name="group1"
                                            type="radio"
                                            id="male"
                                            // onChange={(e)=>inputchangeHandler(e)}
                                        />
                                        <Form.Check
                                            inline
                                            label="Female"
                                            name="group1"
                                            type="radio"
                                            id="female"
                                            // onChange={(e)=>inputchangeHandler(e)}
                                        />
                                        <Form.Check
                                            inline
                                            label="Other"
                                            name="group1"
                                            type="radio"
                                            id="other"
                                            // onChange={(e)=>inputchangeHandler(e)}
                                        />
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                        <Form.Label>TechStack</Form.Label>
                        {/* <Form.Control type="text" placeholder="Eg: HTML, CSS, JS,..." /> */}
                        <Form.Control id="techStack" type="text" as="textarea" rows={2} placeholder="Eg: HTML, CSS, JS,..." onChange={(e)=>inputchangeHandler(e)}/>
                        <br />
                        <Button variant="primary" type="submit" onClick={(e)=>{onSubmitHandler(e)}}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}