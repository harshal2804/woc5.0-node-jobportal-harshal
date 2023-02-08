import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button"
import "./css/Profile.css"
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"

export default function StudentProfile() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [data, setData] = useState([]);
    
    useEffect(() => {
        axios.get("https://woc5-0-node-jobportal-harshal.onrender.com/Student/auth/login/success", {
            params: location.state
        } ).then((res) => {
            if(res.status === 200){
                axios.get("https://woc5-0-node-jobportal-harshal.onrender.com/StudentDetails", {
                    headers: {
                        Authorization: 'Bearer '+ location.state.accessToken
                    }
                })
                .then(res => {
                    setData(res.data)
                })
            }
        })
    }, []);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        navigate('/CompanyList',{ replace: true, state: { user:true, data: data }})
    }

    return (
        <div className="profile">
            <div className="title">
                Your Profile
            </div>
            <Table striped>
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{data.name}</td>
                    </tr>
                    <tr>
                        <td>E-mail</td>
                        <td>{data.email}</td>
                    </tr>
                    <tr>
                        <td>Batch</td>
                        <td>{data.batch}</td>
                    </tr>
                    <tr>
                        <td>CPI</td>
                        <td>{data.cpi}</td>
                    </tr>
                    <tr>
                        <td>Gender</td>
                        {data.male==="on"?<td>Male</td>:data.female==="on"?<td>Female</td>:<td>Other</td>}
                        {/* <td>{data.officialWebsite}</td> */}
                    </tr>
                    <tr>
                        <td>TechStack</td>
                        <td>{data.techStack}</td>
                    </tr>
                </tbody>
            </Table>
            <Button variant="info" onClick={(e) => onSubmitHandler(e)}>Search Company</Button>
        </div>
    )
}