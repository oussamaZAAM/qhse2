
import React, { useRef, useContext, useState, useEffect } from "react";
import './Fournisseurs.css'
import {useNavigate} from "react-router-dom"
import { AuthContext } from "../../Context/authContext";


export default function Fournisseurs(props) {
    const navigate = useNavigate();

    const { user, dispatch } = useContext(AuthContext);

    

    
    return(
            <tr className="sortable">
      <td className="text-center">{props.num}</td>
      <td className="text-center">{props.fourId.code_four}</td>
      <td className="text-center">{props.fourId.raison_soc}</td>
      <td className="text-center">{props.fourId.pays}</td>
      <td className="text-center">{props.fourId.ville}</td>
      <td className="text-center">{props.fourId.tel}</td>
      <td className="text-center">{props.fourId.mail}</td>
    </tr>
    )
}