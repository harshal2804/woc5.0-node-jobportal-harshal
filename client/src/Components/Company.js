import React from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "bootstrap/dist/css/bootstrap.min.css"
import "./css/Company.css"
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'

export default function Company() {

    const [formData, setFormData] = useState({});
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    const inputchangeHandler = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(formData);
        axios.post("http://localhost:5000/Company",formData).then(res => {
            console.log(res);
            setUser(res.data.user)
            if(res.data.user){
                navigate('/CompanyProfile',{ replace: true, state: { user:true, accessToken:res.data.accessToken }})
            }
        })
        
    }

    return (
        <div className="companySignIn">
            <div className="bg">
                <div className="title">Company Registration Form</div>
                <div className="form--bg">
                {user===false && <div className='error'> ❗User with this email id is already exists</div>}
                    <Form>
                        <FloatingLabel
                            controlId="companyName"
                            label="Company name"
                            className="mb-3"
                        >
                            <Form.Control name="companyName" type="text" placeholder="Enter your company name" onChange={(e)=>inputchangeHandler(e)}/>
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
                                    controlId="requiredAge"
                                    label="Select required age"
                                    onChange={(e)=>inputchangeHandler(e)}
                                >
                                    <Form.Select name="requiredAge" aria-label="Floating label select example">
                                        <option value="18-21">18-21</option>
                                        <option value="22-25">22-25</option>
                                        <option value="26-29">26-29</option>
                                        <option value="Above 29">Above 29</option>
                                        <option value="Any">Any</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel controlId="requiredCpi" label="Required CPI">
                                    <Form.Control name="requiredCpi" type="number" placeholder="number" onChange={(e)=>inputchangeHandler(e)}/>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <br />
                        <FloatingLabel
                            controlId="officialWebsite"
                            label="Official Website"
                            className="mb-3"
                        >
                            <Form.Control name="officialWebsite" type="text" placeholder="Enter your official website" onChange={(e)=>inputchangeHandler(e)}/>
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="position"
                            label="Position"
                            className="mb-3"
                        >
                            <Form.Control name="position" type="text" placeholder="Enter position" onChange={(e)=>inputchangeHandler(e)}/>
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="package"
                            label="Package"
                            className="mb-3"
                        >
                            <Form.Control name="package" type="text" placeholder="Enter package" onChange={(e)=>inputchangeHandler(e)}/>
                        </FloatingLabel>
                        <Form.Label>Description</Form.Label>
                        <Form.Control id="description" type="text" as="textarea" rows={2} placeholder="Eg: Our company is basically on React" onChange={(e)=>inputchangeHandler(e)}/>
                        <br />
                        <Button value="Submit" variant="primary" type="submit" onClick={(e)=>{onSubmitHandler(e)}}>
                            Submit
                        </Button>
                        <div className='footer'>Already have an account? <Link to="/Company/login">Login</Link></div>
                    </Form>
                </div>
            </div>
        </div>
    )
}