
import React, { useRef, useContext, useState, useEffect } from "react";
import './Fournisseurs.css'
import {useNavigate} from "react-router-dom"


export default function Fournisseurs(props) {
    const navigate = useNavigate();


    if(props.dashBoard===true){
      return(
        <tr className="sortable" onClick={()=>navigate("../../fournisseurs")}>
          <td className="text-center">{props.fourId.code_four}</td>
          <td className="text-center">{props.fourId.raison_soc}</td>
          <td className="text-center">{props.fourId.pays}</td>
          <td className="text-center">{props.fourId.ville}</td>
        </tr>
)
    }else{
    return(
            <tr className="sortable" onClick={()=>props.handleClick(props.num)}>
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
}