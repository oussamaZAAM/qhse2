import React, { useRef, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Menu1 from "./Menu.css"
import { AuthContext } from "../../Context/authContext";

export default function Menu() {

    const { org } = useContext(AuthContext);
if(org!==undefined){
    return(
        <>
        <h1 className="mt-1">
               {org.name}
        </h1>
<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action p-3 mt-4">Tableaux de bord</a>
  <a href={"../../organism/"+org._id} class="list-group-item list-group-item-action list-group-item-primary p-3">SITE</a>
  <a href="#" class="list-group-item list-group-item-action list-group-item-secondary p-3">Ressources Humains</a>
  <a href="#" class="list-group-item list-group-item-action list-group-item-success p-3">PROCESSUS</a>
  <a href="#" class="list-group-item list-group-item-action list-group-item-danger p-3">Programme Prealable</a>
  <a href="#" class="list-group-item list-group-item-action list-group-item-warning p-3">Qualité : ISO 9001 - 2015</a>
  <a href="#" class="list-group-item list-group-item-action list-group-item-info p-3">Hygiène : ISO 22000 - 2018</a>
  <a href="#" class="list-group-item list-group-item-action list-group-item-light p-3">Sécurité : ISO 45000 -2015</a>
  <a href="#" class="list-group-item list-group-item-action list-group-item-dark p-3">Environnement: ISO 14000 : 2015</a>
</div></> )
}else{
    return null
}
}