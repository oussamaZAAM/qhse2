import React, { useContext } from "react"
import Login from "./screens/Login/Login"
import Register from "./screens/Register/Register"
import Navbar from "./components/Navbar/Navbar"
import NewOrganism from "./screens/NewOrganism/NewOrganism"
import Organism from "./screens/Organism/Organism"
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { AuthContext } from "./Context/authContext";
import OrganismPage from "./screens/OrganismPage/OrganismPage";


export default function App() {
  const {user} = useContext(AuthContext);
  function HandleOrganism() {
    let {id} = useParams();
    return (
      <Organism orgId={id} /> 
    )
  }

    return(
    <BrowserRouter>
    <div style={{backgroundColor:"#F5F0BB"}}>
    <img style={{maxHeight:"70px", marginTop:"20px", marginLeft:"20px"}} src="https://bit.ly/3b1DwND" />
    </div>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
          <Route path="/login" element={user?<OrganismPage />:<Login />} />
          <Route path="/register" element={user?<OrganismPage />:<Register />} />
          <Route path="/main" element={<OrganismPage />} />
          <Route path="/new-organism" element={<NewOrganism />} />
          <Route path="/organism/:id" element={<HandleOrganism />} />
          <Route path="/main" element={<OrganismPage />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
        
    )
}
