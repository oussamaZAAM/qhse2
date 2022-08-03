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
        navigate("/login")
      }
    function handleFinish() {
        dispatch({ type: "SELECT_SUCCESS", payload: [user,undefined]});
        localStorage.removeItem("org");
        navigate("/main")
      }
    return(
        <div style={{backgroundColor:"#F5F0BB"}}>


        <nav className="navbar navbar-expand-lg navbar-light justify-content-between">
  <a className="navbar-brand" href="../main"><img src="http://localhost:5000/images/logo1.jpeg" style={{maxHeight:"70px", marginTop:"20px", marginLeft:"20px", paddingBottom:"20px"}}/></a>
  

    {(user!==null && user!==undefined) && 
        <ul className="navbar-nav">
          {org!==null && org!==undefined &&
            <li className="nav-item">
              <a className="nav-link sortable" onClick={handleFinish}>Terminer</a>
            </li>
          }
          <li className="nav-item">
            <a className="nav-link sortable" onClick={handleLogout}>Déconnecter</a>
          </li>
        </ul>
    }
  
</nav>
        </div>

    )
}