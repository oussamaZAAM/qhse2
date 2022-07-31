import React, { useRef, useContext, useState, useEffect } from "react";
import './Product.css'
import {useNavigate} from "react-router-dom"
import { AuthContext } from "../../Context/authContext";
import { Button } from 'react-bootstrap';
import image from "../../images/like.png"


export default function Product(props) {
    const navigate = useNavigate();


    const handleOrg = (e) => {
    
       
        navigate("/product/"+props.prod._id);

    

    }

    
    return(
        <tr onClick={handleOrg} className="sortable">
            <td>{props.prod.name}</td>
            <td><img className="image-fluid" width="200px" src={"http://localhost:5000/images/"+props.prod.photos}/></td>
            <td>{props.prod.creation_date}</td>
        </tr>
    )
}