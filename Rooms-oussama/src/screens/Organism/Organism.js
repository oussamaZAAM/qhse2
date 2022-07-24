import React, { useRef, useContext, useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import {Button} from 'react-bootstrap';
import { AuthContext } from "../../Context/authContext";
import "./Organism.css"
import Menu from "../../components/Menu/Menu"

export default function Organism(props) {
    const name = useRef();
    const site_num = useRef();
    const creation_time = useRef();
    const domaines = useRef();
    const tel = useRef();
    const adresse = useRef();
    const carte = useRef();
    
    const { user } = useContext(AuthContext);
    const [org, setOrg] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const [editValues, setEditValues] = useState({
        name: "",
        site_num: "",
        creation_date: "",
        domaines: "",
        tel: "",
        Adresse: "",
        Carte: "",
    })

    const navigate = useNavigate();

    function editOrg() {
        setIsEdit(true);
    }
    function endEditOrg() {
        setIsEdit(false);
    }
    function editValuesFunc(e) {
        setEditValues({...editValues, [e.target.name]: e.target.value})
    }
    console.log(editValues)
    const submitEditOrg = async () => {
        try{
            await axios.put("http://localhost:5000/api/organism/" + props.orgId, editValues);
        } catch (err) {
            console.log(err);
        }
        setIsEdit(false)
    }
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
        };
        fetchOrg();
    }, [props.orgId]);
    if(org!==undefined){
        return(
            !isEdit ? <main className="bg-white" >
                <div className="container">
                <div className=" row">
                    <div className="col-12"> 
                        <h1 className="text-prime pb-5">{org.name}</h1>
                            <div className="m-2" >Sites : {org.site_num}</div>
                            <div className=" m-2">Creation Time : {org.creation_time}</div>
                            <div className=" m-2">Domaine : {org.domaines}</div>
                            <div className=" m-2">Tel : {org.tel}</div>
                            <div className=" m-2">Adresse : {org.Adresse}</div>
                            <div className=" m-2">Location : {org.Carte}</div>
                            <div className="d-flex justify-content-end m-2">
                            <Button className="bg-prime" onClick={editOrg}>Modifier</Button>
                            <Button className="bg-danger" onClick={delOrg} >Supprimer</Button>
                            </div>
                        
                    </div>
                </div>
                </div>
            </main>
        : (
            <div className="container display-flex justify-content-center">
                <h3 className="text-prime p-3">Modification . . .</h3>
                <div className="row mediaquery-770">
                    <div className="col-12 org-edit-label">
                        <label>Name :</label>
                        <input className="org-name" name="name" type="text" value={org.name} onChange={editValuesFunc}></input>
                    </div>
                    <div className="col-12 org-edit-label">
                        <label>Sites :</label>
                        <input className="org-name" name="site_num" type="text" value={org.site_num} onChange={editValuesFunc}></input>
                    </div>
                    <div className="col-12 org-edit-label">
                        <label className="org-label">Creation Time :</label>
                        <input className="org-name" name="creation_date" type="date" value={org.creation_time} onChange={editValuesFunc}></input>
                    </div>
                    <div className="col-12 org-edit-label">
                        <label>Domaine :</label>
                        <input className="org-name" name="domaines" type="text" value={org.domaines} onChange={editValuesFunc}></input>
                    </div>
                    <div className="col-12 org-edit-label">
                        <label>Tel :</label>
                        <input className="org-name" name="tel" type="tel" value={org.tel} onChange={editValuesFunc}></input>
                    </div>
                    <div className="col-12 org-edit-label">
                        <label>Adresse :</label>
                        <input className="org-name" name="Adresse" type="text" value={org.Adresse} onChange={editValuesFunc}></input>
                    </div>
                    <div className="col-12 org-edit-label">
                        <label>Location :</label>
                        <input className="org-name" name="Carte" type="text" value={org.Carte} onChange={editValuesFunc}></input>
                    </div>
                </div>
                <div className="row p-5">
                    <Button type="submit" className="col-3 btn btn-warning m-1" onClick={endEditOrg} >Annuler</Button>
                    <Button type="submit" className="col-3 btn btn-success m-1" onClick={submitEditOrg}>Verifier</Button>
                </div>
            </div>
        )
        )
     }else{
        return null
     }
}