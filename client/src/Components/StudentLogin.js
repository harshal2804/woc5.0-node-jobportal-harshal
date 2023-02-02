import React from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import "bootstrap/dist/css/bootstrap.min.css"
import "./css/Student.css"
import axios from "axios"
import { useNavigate , Link } from 'react-router-dom'


export default function StudentLogin() {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({});
    const [user , setUser] = useState(null);

    const inputchangeHandler = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(formData);
        axios.post("http://localhost:5000/Student/login", formData).then(res => {
            console.log(res.data);
            if(res.data.user){
                setUser(true);
                navigate('/StudentProfile',{ replace: true, state: { user:true, accessToken:res.data.accessToken }})
                
            }else{
                setUser(false)
            }
        })
       
    }

    return (
        <div className="studentSignIn">
            <div className="bg">
                <div className="title">Student Login</div>
                <div className="form--bg">
                    <div className="error">{user===false && " ❌ Incorrect Username or Password"}</div>
                    <Form>
                        {/* <FloatingLabel
                            controlId="name"
                            label="Full name"
                            className="mb-3"
                        >
                            <Form.Control name="name" type="text" placeholder="Enter your full name" onChange={(e) => inputchangeHandler(e)} />
                        </FloatingLabel> */}
                        <FloatingLabel
                            controlId="email"
                            label="Email address"
                            className="mb-3"
                        >
                            <Form.Control name="email" type="email" placeholder="name@example.com" onChange={(e) => inputchangeHandler(e)} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </FloatingLabel>

                        <FloatingLabel controlId="password" label="Password">
                            <Form.Control name="password" type="password" placeholder="Password" onChange={(e) => inputchangeHandler(e)} />
                        </FloatingLabel>
                        <Button variant="primary" type="submit" onClick={(e) => { onSubmitHandler(e) }}>
                            {/* <Link to="/StudentProfile" style={{ color: '#FFFFFF', textDecoration: "none " }}> */}
                                Log In
                            {/* </Link> */}
                        </Button>
                        <div className='footer'>Don't have an account? <Link to="/Student">Register</Link></div>

                    </Form>
                </div>
            </div>
        </div>
    )
}