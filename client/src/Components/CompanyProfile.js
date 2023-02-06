import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button"
import "./css/Profile.css"
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"

export default function CompanyProfile() {

    const [data, setData] = useState([]);
    const location = useLocation()

    useEffect(() => {
        axios.get("http://localhost:5000/CompanyDetails", {
                    headers: {
                        Authorization: 'Bearer '+ location.state.accessToken
                    }
                })
                .then(res => {
                    setData(res.data)
                })
    }, []);

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
                        <td>Company Name</td>
                        <td>{data.companyName}</td>
                    </tr>
                    <tr>
                        <td>E-mail</td>
                        <td>{data.email}</td>
                    </tr>
                    <tr>
                        <td>Required Age</td>
                        <td>{data.requiredAge}</td>
                    </tr>
                    <tr>
                        <td>Required CPI</td>
                        <td>{data.requiredCpi}</td>
                    </tr>
                    <tr>
                        <td>Website</td>
                        <td>{data.officialWebsite}</td>
                    </tr>
                    <tr>
                        <td>Position</td>
                        <td>{data.position}</td>
                    </tr>
                    <tr>
                        <td>Package</td>
                        <td>{data.package}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>{data.description}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}