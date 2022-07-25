import React, { useContext } from "react"
import Login from "./screens/Login/Login"
import Register from "./screens/Register/Register"
import Navbar from "./components/Navbar/Navbar"
import NewOrganism from "./screens/NewOrganism/NewOrganism"
import Organism from "./screens/Organism/Organism"
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { AuthContext } from "./Context/authContext";
import OrganismPage from "./screens/OrganismPage/OrganismPage";
import Products from "./screens/Products/Products";
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
          <Route path="/login" element={org?<Organism/>:(user?<OrganismPage />:<Login />)} />
          <Route path="/register" element={org?<Organism/>:(user?<OrganismPage />:<Register />)} />
          <Route path="/main" element={org?<Organism/>:(user?<OrganismPage />:<Login />)} />
          <Route path="/" element={(user?<OrganismPage />:<Login />)} />
          <Route path="/new-organism" element={org?<Organism />:(user?<NewOrganism />:<Login />)} />
          <Route path="/organism/:id" element={org?<HandleOrganism />:(user?<OrganismPage/>:<Login />)} />
          <Route path="/new-product" element={org?<NewProduct />:(user?<OrganismPage/>:<Login />)} />
          <Route path="/products" element={org?<Products />:(user?<OrganismPage />:<Login />)} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
        
    )
}
