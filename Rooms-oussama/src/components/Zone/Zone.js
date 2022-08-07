import React from "react";
import { useNavigate } from "react-router-dom";


export default function Zone(props) {
    const navigate = useNavigate();
    function handleNavigate() {
      navigate("./" + props.id);
    }
    const allIds = props.persons && props.persons.map(x=>x._id);
    
    return(
            <tr className="sortable" onClick={handleNavigate}>
              <td className="text-center">{props.num}</td>
              <td className="text-center">{props.zone.code}</td>
              <td className="text-center">{props.zone.ordre}</td>
              <td className="text-center">{props.zone.superficie}</td>
              <td className="text-center">{props.persons[allIds.indexOf(props.zone.responsable)].nom+' '+props.persons[allIds.indexOf(props.zone.responsable)].prenom}</td>
              <td className="text-center">{props.persons[allIds.indexOf(props.zone.equipe[0])].nom+' '+props.persons[allIds.indexOf(props.zone.equipe[0])].prenom+', ...'}</td>
            </tr>
    )
}