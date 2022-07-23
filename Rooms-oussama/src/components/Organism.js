import React, { useRef, useContext, useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import {Button} from 'react-bootstrap';
import { AuthContext } from "../Context/authContext";

export default function Organism(props) {
    const name = useRef();
    const site_num = useRef();
    const creation_time = useRef();
    const domaines = useRef();
    const tel = useRef();
    const adresse = useRef();
    const carte = useRef();

    const [org, setOrg] = useState();
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const delOrg= async (e)=>{
        e.preventDefault();
        
            try{
                await axios.delete("http://localhost:5000/api/organism/" + props.orgId);
                navigate("/main");

            }catch(err){
                 console.log(err)        
            }
        
    }
    useEffect(() => {
    
        const fetchOrg = async () => {
          const res = await axios.get("http://localhost:5000/api/organism/" + props.orgId);
          setOrg(
            res.data
          );
          console.log(res.data)

        };
        fetchOrg();
      }, [user._id]);
     if(org!==undefined){
    return(
        <main className="bg-white" >
            <div className="container">
            <div className=" row">
                <div className="col-12"> 
                    <h1 className="text-prime pb-5">{org.name}</h1>
                        <div className="m-2" >Sites : {org.site_num}</div>
                        <div className=" m-2" >Creation Time : {org.creation_time}</div>
                        <div className=" m-2">Domaine : {org.domaine}</div>
                        <div className=" m-2" >Tel : {org.tel}</div>
                        <div className=" m-2" >Adresse : {org.Adresse}</div>
                        <div className=" m-2">Location : {org.Carte}</div>
                        <div className="d-flex justify-content-end m-2">
                        <Button className="bg-prime"  >Modifier</Button>
                        <Button className="bg-danger" onClick={delOrg} >Supprimer</Button>
                        </div>
                    
                </div>
            </div>
            </div>
        </main>
    )
     }else{
        return null
     }
}