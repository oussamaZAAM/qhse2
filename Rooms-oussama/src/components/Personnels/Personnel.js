
import React from "react";
import './Personnel.css'


export default function Personnels(props) {
    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;

      return [year, month, day].join('-');
    }

    
    return(
            <tr className="sortable" >
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