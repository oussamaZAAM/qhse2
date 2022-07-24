import React, { useRef, useContext, useState, useEffect } from "react";
import './Organism.css'
import {useNavigate} from "react-router-dom"
import { AuthContext } from "../../Context/authContext";
import { Button } from 'react-bootstrap';


export default function Organism(props) {
    const navigate = useNavigate();

    const { dispatch } = useContext(AuthContext);

    const handleOrg = (e) => {
    
        dispatch({ type: "SELECT_SUCCESS", payload: props.orgId});
        localStorage.setItem("org", JSON.stringify(props.orgId))
        navigate("/organism/"+props.orgId._id);

    

    }

    
    return(
            <tr onClick={handleOrg} className="sortable">
      <td>{props.orgId.name}</td>
      <td>{props.orgId.domaines}</td>
      <td>{props.orgId.tel}</td>
    </tr>
    )
}