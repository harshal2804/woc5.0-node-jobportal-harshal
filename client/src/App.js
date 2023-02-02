import React, { useState, useEffect } from 'react'
import Home from './Components/Home'
import Student from './Components/Student'
import Company from './Components/Company'
import CompanyProfile from './Components/CompanyProfile';
import CompanyList from './Components/CompanyList';
import StudentProfile from './Components/StudentProfile';
import StudentLogin from './Components/StudentLogin'
import CompanyLogin from './Components/CompanyLogin'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import axios from 'axios';

function App() {

  const [user, setUser] = useState({ user:"", accessToken:"" })

  useEffect(() => {
    axios.get('http://localhost:5000/Student/login/success').then((res) => {
      if (res.status === 200) return res.json()
      throw new Error("Authentication has been failed!");
    })
    .then(res => setUser({ user:res.data.user, accessToken:res.data.accessToken }))
    .catch(err => console.log(err))
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },

    {
      path: "/Student",
      element: user.user ? <Navigate to="/StudentProfile" /> : <Student user={user}/>,
    },

    {
      path: "/Company",
      element: <Company />
    },

    {
      path: "/Student/login",
      element: user.user ? <Navigate to="/StudentProfile" /> : <StudentLogin />,
    },

    {
      path: "/Company/login",
      element: <CompanyLogin />
    },

    {
      path: "/CompanyProfile",
      element: <CompanyProfile />,
    },

    {
      path: "/StudentProfile",
      element: <StudentProfile/>,
    },

    {
      path: "/CompanyList",
      element: <CompanyList />,
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App