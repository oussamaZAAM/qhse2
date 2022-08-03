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
    
    const { user, dispatch } = useContext(AuthContext);
    const [org, setOrg] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const [editValues, setEditValues] = useState({
        name: "",
        site_num: "",
        creation_date:"",
        domaines:"",
        tel:"",
        Adresse:"",
        Carte:"",
    })
    const [lastValues, setLastValues] = useState({
        name: "",
        site_num: "",
        creation_date:"",
        domaines:"",
        tel:"",
        Adresse:"",
        Carte:"",
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
    const submitEditOrg = async () => {
        try{
            console.log(props)
            await axios.put("http://localhost:5000/api/organism/" + props.orgId, editValues);
        } catch (err) {
            console.log(err);
        }
        setIsEdit(false)
        setLastValues(editValues)
    }
    const delOrg= async (e)=>{
        e.preventDefault();
        try{
            await axios.delete("http://localhost:5000/api/organism/" + props.orgId);
            dispatch({ type: "SELECT_SUCCESS", payload: [user,undefined]});
            localStorage.removeItem("org");
            navigate("../../main")
        
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
          setEditValues({
            name: res.data.name,
            site_num: res.data.site_num,
            creation_date:res.data.creation_time,
            domaines:res.data.domaines,
            tel:res.data.tel,
            Adresse:res.data.Adresse,
            Carte:res.data.Carte,
          })
          setLastValues({
            name: res.data.name,
            site_num: res.data.site_num,
            creation_date:res.data.creation_time,
            domaines:res.data.domaines,
            tel:res.data.tel,
            Adresse:res.data.Adresse,
            Carte:res.data.Carte,
          })
        };
        fetchOrg();
    }, [props.orgId, setOrg]);
    if(org!==undefined){
        return(
            !isEdit ? <main className="bg-white" >
                <div className="container">
                <div className=" row">
                    <div className="col-12"> 
                        <h1 className="text-prime pb-5">{!lastValues.name ? editValues.name : lastValues.name}</h1>
                            <div className="m-2" >Sites : <b>{!lastValues.site_num ? editValues.site_num : lastValues.site_num}</b></div>
                            <div className=" m-2">Date de création : <b>{!lastValues.creation_date ? formatDate(editValues.creation_date) : formatDate(lastValues.creation_date)}</b></div>
                            <div className=" m-2">Domaine : <b>{!lastValues.domaines ? editValues.domaines : lastValues.domaines}</b></div>
                            <div className=" m-2">Téléphone : <b>{!lastValues.tel ? editValues.tel : lastValues.tel}</b></div>
                            <div className=" m-2">Adresse : <b>{!lastValues.Adresse ? editValues.Adresse : lastValues.Adresse}</b></div>
                            <div className=" m-2">Localisation : <b>{!lastValues.Carte ? editValues.Carte : lastValues.Carte}</b></div>
                            <div className="d-flex justify-content-end m-2">
                            <Button className="bg-prime" onClick={editOrg}>Modifier</Button>
                            <Button className="bg-danger" onClick={delOrg} >Supprimer</Button>
                            <Button href="../products" >Liste des produits</Button>
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
                        <input 
                            className="org-name" 
                            name="name" 
                            type="text" 
                            placeholder={!lastValues.name ? editValues.name : lastValues.name} 
                            onChange={editValuesFunc}></input>
                    </div>
                    <div className="col-12 org-edit-label">
                        <label>Sites :</label>
                        <input 
                            className="org-name" 
                            name="site_num" 
                            type="text" 
                            placeholder={!lastValues.site_num ? editValues.site_num : lastValues.site_num} 
                            onChange={editValuesFunc}></input>
                    </div>
                    <div className="col-12 org-edit-label">
                        <label className="org-label">Date de création :</label>
                        <input 
                            className="org-name" 
                            name="creation_date" 
                            type="date" 
                            value={!lastValues.creation_date ? formatDate(editValues.creation_date) : formatDate(lastValues.creation_date)}
                            onChange={editValuesFunc}></input>
                    </div>
                    <div className="col-12 org-edit-label">
                        <label>Domaine :</label>
                        <input 
                            className="org-name" 
                            name="domaines" 
                            type="text" 
                            placeholder={!lastValues.domaines ? editValues.domaines : lastValues.domaines} 
                            onChange={editValuesFunc}></input>
                    </div>
                    <div className="col-12 org-edit-label">
                        <label>Téléphone :</label>
                        <input 
                            className="org-name" 
                            name="tel" 
                            type="tel" 
                            placeholder={!lastValues.tel ? editValues.tel : lastValues.tel} 
                            onChange={editValuesFunc}></input>
                    </div>
                    <div className="col-12 org-edit-label">
                        <label>Adresse :</label>
                        <input 
                            className="org-name" 
                            name="Adresse" 
                            type="text" 
                            placeholder={!lastValues.Adresse ? editValues.Adresse : lastValues.Adresse} 
                            onChange={editValuesFunc}></input>
                    </div>
                    <div className="col-12 org-edit-label">
                        <label>Location :</label>
                        <input 
                            className="org-name" 
                            name="Carte" 
                            type="text" 
                            placeholder={!lastValues.Carte ? editValues.Carte : lastValues.Carte} 
                            onChange={editValuesFunc}></input>
                    </div>
                </div>
                <div className="row p-5">
                    <Button type="submit" className="col-3 btn btn-warning m-1" onClick={endEditOrg} >Annuler</Button>
                    <Button type="submit" className="col-3 btn btn-success m-1" onClick={submitEditOrg}>Vérifier</Button>
                </div>
            </div>
        )
        )
     }else{
        return null
     }
}