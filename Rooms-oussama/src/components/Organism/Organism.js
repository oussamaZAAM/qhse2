import React, { useRef, useContext, useState, useEffect } from "react";
import './Organism.css'
import {useNavigate} from "react-router-dom"
import { AuthContext } from "../../Context/authContext";


export default function Organism(props) {
    const navigate = useNavigate();

    const { dispatch } = useContext(AuthContext);

    const handleOrg = (e) => {
        e.preventDefault();
    
        dispatch({ type: "SELECT_SUCCESS", payload: props.orgId});
        localStorage.setItem("org", JSON.stringify(props.orgId))
        navigate("/organism/"+props.orgId._id);

    

    }

    
    return(
        <div className='organism-component'>
            <img onClick={handleOrg} src='https://i.ibb.co/sFHsVVL/589195.png' className='organism-img'/>
            <h3 className="organism-title">Organism</h3>
        </div>
    )
}