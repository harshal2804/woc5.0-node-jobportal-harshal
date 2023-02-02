import axios from "axios";
import React from "react"
import { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { useLocation } from 'react-router-dom'

export default function CompanyList() {
    const [data, setData] = useState([]);
    const location = useLocation();

    useEffect(() => {
        axios.get("http://localhost:5000/CompanyList", {
            params :location.state.data
        }).then(res => {
            console.log(res.data)
            setData(res.data);
        })
    }, [])

    const printData = (data) => {
        return data.map(element => {
            return (
                <Card className="text-center">
                <Card.Header>{element.position}</Card.Header>
                <Card.Body>
                    <Card.Title>{element.companyName}</Card.Title>
                    <Card.Text>
                        {element.package}
                    </Card.Text>
                    <Card.Text>
                        {element.description}
                    </Card.Text>
                    <a href={`https://${element.officialWebsite}`}>
                    <Button variant="primary">Website Link</Button>
                    </a>
                </Card.Body>
            </Card>
            )
        })
    }

    return (
        <div className="companyList">
            <div className="title">You can apply to these companies :</div>
            {printData(data)}
        </div>
    )
}