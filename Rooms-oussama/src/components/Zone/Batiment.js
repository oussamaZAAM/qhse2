import React from "react";
import { useNavigate } from "react-router-dom";


export default function Batiment(props) {
    const navigate = useNavigate();
    function handleNavigate() {
      navigate("./" + props.id);
    }
    const allIds = props.persons && props.persons.map(x=>x._id);
    return(
            <tr className="sortable" onClick={handleNavigate}>
              <td className="text-center">{props.num}</td>
              <td className="text-center">{props.batiment.code}</td>
              <td className="text-center">{props.batiment.ordre}</td>
              <td className="text-center">{props.batiment.superficie}</td>
              <td className="text-center">{props.persons[allIds.indexOf(props.batiment.responsable)].nom+' '+props.persons[allIds.indexOf(props.batiment.responsable)].prenom}</td>
              <td className="text-center">{props.persons[allIds.indexOf(props.batiment.equipe[0])].nom+' '+props.persons[allIds.indexOf(props.batiment.equipe[0])].prenom+', ...'}</td>
            </tr>
    )
}