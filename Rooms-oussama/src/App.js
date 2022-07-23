import React, { useContext, useParams } from "react"
import Login from "./components/Login"
import Register from "./components/Register"
import Navbar from "./components/Navbar"
import NewOrganism from "./components/NewOrganism"
import Organism from "./components/Organism"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "./Context/authContext";


export default function App() {
  const {user} = useContext(AuthContext);
  function HandleOrganism() {
    let { id } = useParams();
    return (
      <Organism orgId={id} /> 
    )
  }

    return(
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
          <Route path="/login" element={user?<Navbar />:<Login />} />
          <Route path="/register" element={user?<Navbar />:<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/new-organism" element={<NewOrganism />} />
          <Route path="/organism/:id" element={<HandleOrganism />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
        
    )
}
