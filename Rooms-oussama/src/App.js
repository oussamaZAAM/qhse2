import React, { useContext } from "react"
import Login from "./screens/Login/Login"
import Register from "./screens/Register/Register"
import Navbar from "./components/Navbar/Navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "./Context/authContext";
import OrganismPage from "./screens/OrganismPage/OrganismPage";


export default function App() {
  const {user} = useContext(AuthContext);


    return(
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
          <Route path="/login" element={user?<Navbar />:<Login />} />
          <Route path="/register" element={user?<Navbar />:<Register />} />
          <Route path="/" element={user ? <OrganismPage />: <Login />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
        
    )
}
