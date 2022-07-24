import React, { useContext } from "react"
import Login from "./screens/Login/Login"
import Register from "./screens/Register/Register"
import Navbar from "./components/Navbar/Navbar"
import NewOrganism from "./screens/NewOrganism/NewOrganism"
import Organism from "./screens/Organism/Organism"
import { BrowserRouter, Routes, Route, useParams, Link } from "react-router-dom";
import { AuthContext } from "./Context/authContext";
import OrganismPage from "./screens/OrganismPage/OrganismPage";
import "./App.css"
export default function App() {
  const {user, org} = useContext(AuthContext);
  function HandleOrganism() {
    let {id} = useParams();
    return (
      <Organism orgId={id} /> 
    )
  }

    return(
    <BrowserRouter>

      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
          <Route path="/login" element={org?<Organism />:(user?<OrganismPage />:<Login />)} />
          <Route path="/register" element={org?<Organism />:(user?<OrganismPage />:<Register />)} />
          <Route path="/main" element={org?<Organism />:(user?<OrganismPage />:<Login />)} />
          <Route path="/" element={org?<Organism />:(user?<OrganismPage />:<Login />)} />
          <Route path="/new-organism" element={org?<Organism />:(user?<NewOrganism />:<Login />)} />
          <Route path="/organism/:id" element={org?<Organism />:(user?<HandleOrganism />:<Login />)} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
        
    )
}
