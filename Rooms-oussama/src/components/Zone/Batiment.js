import React from "react";
import { useNavigate } from "react-router-dom";
import './Personnel.css'


export default function Batiment(props) {
    const navigate = useNavigate();
    function handleNavigate() {
      navigate("./" + props.id);
    }

    
    return(
            <tr className="sortable" onClick={handleNavigate}>
              <td className="text-center">{props.num}</td>
              <td className="text-center">{props.Person.nom}</td>
              <td className="text-center">{props.Person.prenom}</td>
              <td className="text-center">{formatDate(props.Person.naissance)}</td>
              <td className="text-center">{props.Person.cin}</td>
              <td className="text-center">{props.Person.metier}</td>
              <td className="text-center">{props.Person.zone_affecte}</td>
            </tr>
    )
}