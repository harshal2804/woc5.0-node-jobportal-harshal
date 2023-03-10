import React from "react"
import "./css/Home.css"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className="main">
            <div className="main--title">
                <div className="one">Welcome to </div>
                <div className="two">Job</div>
                <div className="three mx-2">Hub</div>
            </div>
            <div className="title">Choose your role</div>
            <Link to="/Student">
            <div className="student">
                <p className="student--text--bg">
                    <p className="student--text">Student</p>
                </p>
            </div>
            </Link>
            <Link to="/Company">
            <div className="company">
                <p className="student--text--bg">
                    <p className="student--text">Company</p>
                </p>
            </div>
            </Link>
        </div>
    )
}