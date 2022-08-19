import React from "react";


export default function Equipement(props) {


    
    return(
            <tr className="sortable" onClick={()=>props.handleClick(props.num)}>
              <td className="text-center">{props.num}</td>
              <td className="text-center">{props.equipId.libelle}</td>
              <td className="text-center">{props.equipId.code}</td>
              <td className="text-center">{props.equipId.num_inventaire}</td>
              <td className="text-center">{props.equipId.zone}</td>
              <td className="text-center">{props.equipId.fiche_technique.slice(13)}</td>
              <td className="text-center">{props.equipId.fds.slice(13)}</td>
              <td className="text-center">{props.equipId.affection}</td>
            </tr>
    )
}