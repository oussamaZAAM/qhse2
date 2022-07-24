import React, { useContext } from "react"
import Login from "./screens/Login/Login"
import Register from "./screens/Register/Register"
import Navbar from "./components/Navbar/Navbar"
import NewOrganism from "./screens/NewOrganism/NewOrganism"
import Organism from "./screens/Organism/Organism"
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { AuthContext } from "./Context/authContext";
import OrganismPage from "./screens/OrganismPage/OrganismPage";
import "./App.css"
import NewProduct from "./screens/NewProduct/NewProduct"
export default function App() {
  const {user, org} = useContext(AuthContext);
  function HandleOrganism() {
    let {id} = useParams();
    console.log(id)
    return (
      <Organism orgId={id} /> 
    )
  }

    return(
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
          <Route path="/login" element={(user?<OrganismPage />:<Login />)} />
          <Route path="/register" element={(user?<OrganismPage />:<Register />)} />
          <Route path="/main" element={(user?<OrganismPage />:<Login />)} />
          <Route path="/" element={(user?<OrganismPage />:<Login />)} />
          <Route path="/new-organism" element={(user?<NewOrganism />:<Login />)} />
          <Route path="/new-product" element={(user?<NewProduct />:<Login />)} />
          <Route path="/organism/:id" element={(user?<HandleOrganism />:<Login />)} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
        
    )
}
