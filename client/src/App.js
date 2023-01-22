import React from 'react'
import Home from './Components/Home'
import Student from './Components/Student'
import Company from './Components/Company'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },

    {
      path: "/Student",
      element: <Student/>,
    },

    {
      path: "/Company",
      element: <Company/>
    }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App