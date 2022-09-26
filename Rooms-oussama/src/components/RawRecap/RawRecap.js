import React, { useRef, useContext, useState, useEffect } from "react";
import './RawRecap.css'
import {useNavigate} from "react-router-dom"
import { AuthContext } from "../../Context/authContext";
import axios from 'axios';


export default function Organism(props) {
    const navigate = useNavigate();

    const { user, dispatch } = useContext(AuthContext);

    const handleRaw = async (e) => {
        navigate("/raw/"+e.target.id);

    }
    const handleProd = async () => {
    
        navigate("/product/"+props.prod._id);

    }
 const raws = props.prod.raw.map(x=>{
        return(
            <td onClick={handleRaw} id={x} key={x}>{x}</td>
           
        )
    })
    
    return(
            <tr className="sortable">
                <td onClick={handleProd} key={props.prod._id}>{props.prod.name}</td>
                {raws}
            </tr>
    )
}