import React, { useRef, useContext } from "react";
import { AuthContext } from "../../Context/authContext";
import {Link, useNavigate} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';
import {Button} from 'react-bootstrap';

export default function Navbar() {
    const { user,org, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogout() {
        dispatch({ type: "LOGIN_SUCCESS", payload: [undefined,undefined]});
        localStorage.removeItem("user");
        localStorage.removeItem("org");
        navigate("./login")
      }
      console.log(org)
    function handleFinish() {
        dispatch({ type: "SELECT_SUCCESS", payload: [user,undefined]});
        localStorage.removeItem("org");
        navigate("./main")
      }
    return(
        <div style={{backgroundColor:"#F5F0BB"}}>


        <nav class="navbar navbar-expand-lg navbar-light justify-content-between">
  <a class="navbar-brand" href="../main"><img src="https://bit.ly/3b1DwND" style={{maxHeight:"70px", marginTop:"20px", marginLeft:"20px", paddingBottom:"20px"}}/></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
    {user!==undefined && 
    <ul class="navbar-nav">
        {org!==undefined &&
      <li class="nav-item">
        <a className="nav-link sortable" onClick={handleFinish}>Terminer</a>
      </li>
      }
      <li class="nav-item">
        <a className="nav-link sortable" onClick={handleLogout}>Deconnecter</a>
      </li>
    </ul>
    }
  
</nav>
        </div>

    )
}