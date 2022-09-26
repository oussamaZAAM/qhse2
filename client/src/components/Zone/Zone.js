import React from "react";
import { useNavigate } from "react-router-dom";


export default function Zone(props) {
    const navigate = useNavigate();
    function handleNavigate() {
      navigate("./" + props.id);
    }
    const allIds = props.persons && props.persons.map(x=>x._id);
    console.log(allIds)
    return(
            <tr className="sortable" onClick={handleNavigate}>
              <td className="text-center">{props.num}</td>
              <td className="text-center">{props.zone.code}</td>
              <td className="text-center">{props.zone.ordre}</td>
              <td className="text-center">{props.zone.superficie}</td>
              {allIds.includes(props.zone.responsable)
                ? <td className="text-center text-success">{props.persons[allIds.indexOf(props.zone.responsable)].nom+' '+props.persons[allIds.indexOf(props.zone.responsable)].prenom}</td>
                : <td className="text-center text-danger">Personnel Supprimé !</td>
              }
              {allIds.includes(props.zone.equipe[0])
                ? <td className="text-center text-success">{props.persons[allIds.indexOf(props.zone.equipe[0])].nom+' '+props.persons[allIds.indexOf(props.zone.equipe[0])].prenom+', ...'}</td>
                : <td className="text-center text-danger">Personnel Supprimé !</td>
              }
            </tr>
    )
}