
import React, { useRef, useContext, useState, useEffect } from "react";
import './Fournisseurs.css'
import {useNavigate} from "react-router-dom"
import { AuthContext } from "../../Context/authContext";


export default function Fournisseurs(props) {
    const navigate = useNavigate();

    const { user, dispatch } = useContext(AuthContext);

    

    
    return(
            <tr className="sortable">
      <td>{props.num}</td>
      <td>{props.fourId.code_four}</td>
      <td>{props.fourId.raison_soc}</td>
      <td>{props.fourId.pays}</td>
      <td>{props.fourId.ville}</td>
      <td>{props.fourId.tel}</td>
      <td>{props.fourId.mail}</td>
    </tr>
    )
}