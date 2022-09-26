import React, { useContext } from "react"
import Login from "./screens/Login/Login"
import Register from "./screens/Register/Register"
import Navbar from "./components/Navbar/Navbar"
import NewOrganism from "./screens/NewOrganism/NewOrganism"
import Organism from "./screens/Organism/Organism"
import Fournisseurs from "./screens/Fournisseurs/Fournisseurs"
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { AuthContext } from "./Context/authContext";
import Organisms from "./screens/Organisms/Organisms";
import Products from "./screens/Products/Products";
import RawRecap from "./screens/RawRecap/RawRecap";
import Main from "./screens/Main/Main";
import Raw from "./screens/Raw/Raw";
import "./App.css"
import {Link, useNavigate} from "react-router-dom"
import NewProduct from "./screens/NewProduct/NewProduct"
import NewRaw from "./screens/NewRaw/NewRaw"
import Product from "./screens/Product/Product"
import Personnels from "./screens/Personnels/Personnels"
import Personnel from "./screens/Personnel/Personnel"
import Zones from "./screens/Zones/Zones"
import Test from "./screens/Test"
import Zone from "./screens/Zone/Zone"
import { Equipements } from "./screens/Equipements/Equipements"
import ErrorPage from "./screens/ErrorPage"
export default function App() {

  const {user, org} = useContext(AuthContext);
  function HandleOrganism() {
    let {id} = useParams();
    if(id===undefined){
      id=org
      return (
        <Organism orgId={id._id} /> 
      )
    }
    return (
      <Organism orgId={id} /> 
    )
  }
  function HandleRaw() {
    console.log(useParams())
    let {name} = useParams();
    let {isEdit} = useParams();

    return (
      <Raw productId={name} isEdit={isEdit}/> 
    )
  }
  function HandlePersonnel() {
    let {id} = useParams();
    return (
      <Personnel personId={id} /> 
    )
  }
  function HandleProduct() {
    let {id} = useParams();
    let {isEdit} = useParams();
    return (
      <Product productId={id} isEdit={isEdit} /> 
    )
  }
  function HandleZone() {
    let {id} = useParams();
    return (
      <Zone zoneId={id} /> 
    )
  }
  const navigate = useNavigate();

    return(
      <>
      <Navbar />
      {org && user?
       <section className="section1">
  
      
           <Routes>
           {/* <Route path="/" element={<Layout />}> */}
             <Route path="/" element={org?<HandleOrganism/>:(user?<Organisms />:<Main />)} />
             <Route path="/main" element={org?<HandleOrganism/>:(user?<Organisms />:<Main />)} />
             <Route path="/login" element={org?<Organism/>:(user?<Organisms />:<Login />)} />
             <Route path="/register" element={org?<Organism/>:(user?<Organisms />:<Register />)} />
             <Route path="/new-organism" element={org?<Organism />:(user?<NewOrganism />:<Login />)} />
             <Route path="/organism/:id" element={org?<HandleOrganism />:(user?<Organisms/>:<Login />)} />
             <Route path="/new-product" element={org?<NewProduct />:(user?<Organisms/>:<Login />)} />
             <Route path="/new-raw" element={org?<NewRaw />:(user?<Organisms/>:<Login />)} />
             <Route path="/products" element={org?<Products />:(user?<Organisms />:<Login />)} />
             <Route path="/raw-recap" element={org?<RawRecap />:(user?<Organisms />:<Login />)} />
             <Route path="/raw/:name" element={org?<HandleRaw />:(user?<Organisms />:<Login />)} />
             <Route path="/product/:id/:isEdit" element={org?<HandleProduct />:(user?<Organisms />:<Login />)} />
             <Route path="/product/:id" element={org?<HandleProduct />:(user?<Organisms />:<Login />)} />
             <Route path="/fournisseurs" element={org?<Fournisseurs />:(user?<Organisms />:<Login />)} />
             <Route path="/personnel" element={org?<Personnels />:(user?<Organisms />:<Login />)} />
             <Route path="/personnel/:id" element={org?<HandlePersonnel />:(user?<Organisms />:<Login />)} />
             <Route path="/zones" element={org?<Zones />:(user?<Organisms />:<Login />)} />
             <Route path="/zones/:id" element={org?<HandleZone />:(user?<Organisms />:<Login />)} />
             <Route path="/equipements" element={org?<Equipements />:(user?<Organisms />:<Login />)} />
             <Route path="/test" element={org?<Test />:(user?<Organisms />:<Login />)} />
             <Route path="*" element={<ErrorPage />} />
           {/* </Route> */}
         </Routes>
     
   </section>
         
       
           :
           <Routes>
           {/* <Route path="/" element={<Layout />}> */}
             <Route path="/login" element={org?<Organism/>:(user?<Organisms />:<Login />)} />
             <Route path="/main" element={org?<Organism/>:(user?<Organisms />:<Main />)} />
             <Route path="/register" element={org?<Organism/>:(user?<Organisms />:<Register />)} />
             <Route path="/main" element={org?<Organism orgId={org._id}/>:(user?<Organisms />:<Login />)} />
             <Route path="/" element={org?<Organism orgId={org._id}/>:(user?<Organisms />:<Login />)} />
             <Route path="/new-organism" element={org?<Organism />:(user?<NewOrganism />:<Login />)} />
             <Route path="/organism/:id" element={org?<HandleOrganism />:(user?<Organisms/>:<Login />)} />
             <Route path="/new-product" element={org?<NewProduct />:(user?<Organisms/>:<Login />)} />
             <Route path="/new-raw" element={org?<NewRaw />:(user?<Organisms/>:<Login />)} />
             <Route path="/products" element={org?<Products />:(user?<Organisms />:<Login />)} />
             <Route path="/raw-recap" element={org?<RawRecap />:(user?<Organisms />:<Login />)} />
             <Route path="/raw/:name" element={org?<HandleRaw />:(user?<Organisms />:<Login />)} />
             <Route path="/product/:id/:isEdit" element={org?<HandleProduct />:(user?<Organisms />:<Login />)} />
             <Route path="/product/:id" element={org?<HandleProduct />:(user?<Organisms />:<Login />)} />
             <Route path="/fournisseurs" element={org?<Fournisseurs />:(user?<Organisms />:<Login />)} />
             <Route path="/personnel" element={org?<Personnels />:(user?<Organisms />:<Login />)} />
             <Route path="/personnel/:id" element={org?<HandlePersonnel />:(user?<Organisms />:<Login />)} />
             <Route path="/zones" element={org?<Zones />:(user?<Organisms />:<Login />)} />
             <Route path="/zones/:id" element={org?<HandleZone />:(user?<Organisms />:<Login />)} />
             <Route path="/equipements" element={org?<Equipements />:(user?<Organisms />:<Login />)} />
             <Route path="/test" element={org?<Test />:(user?<Organisms />:<Login />)} />
             <Route path="*" element={<ErrorPage />} />
           {/* </Route> */}
         </Routes>
           }
           </>
    )
}
