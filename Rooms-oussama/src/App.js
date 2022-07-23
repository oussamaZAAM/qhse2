import React, { useContext } from "react"
import Login from "./components/Login"
import Register from "./components/Register"
import Navbar from "./components/Navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "./Context/authContext";


export default function App() {
  const {user} = useContext(AuthContext);


    return(
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
          <Route path="/login" element={user?<Navbar />:<Login />} />
          <Route path="/register" element={user?<Navbar />:<Register />} />
          <Route path="/" element={<Login />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
        
    )
}
