import React, { useRef, useContext, useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import {Button} from 'react-bootstrap';
import { AuthContext } from "../../Context/authContext";
import "./Organism.css"
import { MuiTelInput, isValidPhoneNumber } from 'mui-tel-input'
import { Typography } from "@mui/material";
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { Table } from '@mantine/core';
import Fournisseurs from '../../components/Fournisseurs/Fournisseurs.js';
import { Skeleton } from "@mui/material";
import Personnels from '../../components/Personnels/Personnel';
import Zone from '../../components/Zone/Zone';
import Equipement from '../../components/Equipement/Equipement';

export default function Organism(props) {
    const autoplay = useRef(Autoplay({ delay: 2000 }));
    const autoplay1 = useRef(Autoplay({ delay: 2000 }));

    
    const { user, org, dispatch } = useContext(AuthContext);
    const [org1, setOrg] = useState();
    const [prods, setProds] = useState();
    const [fours, setFours] = useState();
    const [equips, setEquips] = useState();
    const [raws, setRaws] = useState();
    const [zones, setZones] = useState();
    const [persons, setPersons] = useState();
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
    
    const [value, setValue] = useState('')
    const [isValid, setIsValid] = useState(true)

    const handleChange = (newValue) => {
        setIsValid(isValidPhoneNumber(newValue))
        setValue(newValue)
        setEditValues({...editValues, tel: newValue})
    }
    function editValuesFunc(name, value) {
        setEditValues({...editValues, [name]: value})
    }
    const equipementsFilter = equips && equips.filter(x => x.type === 'eq');

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
        if(isValid){
            try{
                await axios.put("http://localhost:5000/api/organism/" + props.orgId, editValues);
            } catch (err) {
                console.log(err);
            }
            setIsEdit(false)
            setLastValues(editValues)
        } else {
            window.alert("Téléphone Non Valide")
        }
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
          setValue(res.data.tel)
          setEditValues({
            name: res.data.name,
            site_num: res.data.site_num,
            creation_date:res.data.creation_date,
            domaines:res.data.domaines,
            tel:res.data.tel,
            Adresse:res.data.Adresse,
            Carte:res.data.Carte,
          })
          setLastValues({
            name: res.data.name,
            site_num: res.data.site_num,
            creation_date:res.data.creation_date,
            domaines:res.data.domaines,
            tel:res.data.tel,
            Adresse:res.data.Adresse,
            Carte:res.data.Carte,
          })
        };
        fetchOrg();
        
        const fetchProds = async () => {
            
                const res = await axios.get("http://localhost:5000/api/product/a/" + org._id);
              setProds(res.data);
           
          };
          fetchProds();
          const fetchRaws = async () => {
           
              const res = await axios.get("http://localhost:5000/api/raw/a/" + org._id);
              setRaws(
                res.data
              );
          };
          fetchRaws();
          const fetchFours = async () => {
            
              const res = await axios.get("http://localhost:5000/api/fournisseur/a/" + user._id);
              setFours(res.data);            
          };
          fetchFours();
          const fetchPersons = async () => {
            if (user) {
              const res = await axios.get("http://localhost:5000/api/personnel/a/" + user._id);
              setPersons(res.data);
            }
          };
          fetchPersons();
          const fetchZones = async() => {
            const res = await axios.get("http://localhost:5000/api/zone/z/" + org._id);
            setZones(res.data)
        }
        fetchZones();
        const fetchEquips = async() => {
          const res = await axios.get("http://localhost:5000/api/equipement/all/" + user._id);
          setEquips(res.data);
      }
      fetchEquips();
    }, [props.orgId]);
    const fournisseurs = fours!==undefined && fours.map((x, i)=>{
        if(i===3) {
            return null;
        };
        return(
            <Fournisseurs 
              num={i+1}
              key={x._id}
              fourId={x}
              dashBoard={true}
            />
        )
    })
    const personnels = persons && persons.map((x, i) =>{
        return(
          <Personnels
            num={i+1}
            key={x._id}
            id={x._id}
            Person={x}
            dashBoard={true}
          />
        )
      });
      const workZones = zones !== undefined && zones.map((x, i) =>{
        return(
          <Zone
            num={i+1}
            key={x._id}
            id={x._id}
            zone={x}
            persons={persons}
            dashBoard={true}
          />
        )
      });
      const equipements = equipementsFilter!==undefined && equipementsFilter.map((x, i)=>{
        return(
            <Equipement 
              num={i+1}
              key={x._id}
              equipId={x}
              dashBoard={true}
            />
        )
    })
    if(org1!==undefined && prods !== undefined && raws !== undefined){
        return(
            !isEdit ? <div className="grid-container" >
                
                <div className="container bg-white1 grid-item1 center">
                    
                        <h1 className="text-prime pb-5 ">{!lastValues.name ? editValues.name : lastValues.name}</h1>
                            <div className="m-2" >Sites : <b>{!lastValues.site_num ? editValues.site_num : lastValues.site_num}</b></div>
                            <div className=" m-2">Date de création : <b>{!lastValues.creation_date ? formatDate(editValues.creation_date) : formatDate(lastValues.creation_date)}</b></div>
                            <div className=" m-2">Domaine : <b>{!lastValues.domaines ? editValues.domaines : lastValues.domaines}</b></div>
                            <div className=" m-2">Téléphone : <b>{!lastValues.tel ? editValues.tel : lastValues.tel}</b></div>
                            <div className=" m-2">Adresse : <b>{!lastValues.Adresse ? editValues.Adresse : lastValues.Adresse}</b></div>
                            <div className=" m-2">Localisation : <b>{!lastValues.Carte ? editValues.Carte : lastValues.Carte}</b></div>
                            <div className="mt-5">
                            <Button className="bg-prime" onClick={editOrg}>Modifier</Button>
                            <Button className="bg-danger" onClick={delOrg} >Supprimer</Button>
                            </div>
                        
                </div>
                <div className="container grid-item2 grid-container2">
                <div className="item1 bg-white1 grid-container3">
                        <div className="itemA text-prime"><h2 onClick={()=>navigate("/products")}>Les produits:</h2></div>
                      <div className="itemB">
                     
                      <Carousel
      sx={{ maxWidth: 320 }}
      mx="auto"
      withIndicators
      height={200}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      style={{clear: "both"}}
    >
        {prods[0]!==undefined &&
      <Carousel.Slide>
        {prods[0].title}
        <Image style={{cursor:"pointer"}} onClick={()=> navigate("/product/"+prods[0]._id)} src={"http://localhost:5000/images/"+prods[0].photos[0]} />
      </Carousel.Slide>

        }
         {prods[1]!==undefined &&
      <Carousel.Slide>
        {prods[1].title}
        <Image style={{cursor:"pointer"}} onClick={()=> navigate("/product/"+prods[1]._id)} src={"http://localhost:5000/images/"+prods[1].photos[0]} />
      </Carousel.Slide>
    }
     {prods[2]!==undefined &&
      <Carousel.Slide>
        {prods[2].title}
        <Image style={{cursor:"pointer"}} onClick={()=> navigate("/product/"+prods[2]._id)} src={"http://localhost:5000/images/"+prods[2].photos[0]} />
      </Carousel.Slide>
    }
    </Carousel>
                      </div>
                      <div onClick={()=>navigate("/products")} className="itemC text-prime" style={{textAlign:"right", paddingRight:"10px"}}>
                        Plus d'information...
                      </div>
                      </div>
                      <div className="item2 bg-white1 grid-container3">
                        <div className="itemA text-prime"><h2 onClick={()=>navigate("/raw-recap")}>Les matieres premieres:</h2></div>
                      <div className="itemB">
                      <Carousel
      sx={{ maxWidth: 320 }}
      mx="auto"
      withIndicators
      height={200}
      plugins={[autoplay1.current]}
      onMouseEnter={autoplay1.current.stop}
      onMouseLeave={autoplay1.current.reset}
    >
        
      <Carousel.Slide>
        {raws[0].title}
        <Image style={{cursor:"pointer"}} onClick={()=> navigate("/product/"+raws[0]._id)} src={"http://localhost:5000/images/"+raws[0].photos[0]} />
      </Carousel.Slide>
      <Carousel.Slide>
        {raws[1].title}
        <Image style={{cursor:"pointer"}} onClick={()=> navigate("/product/"+raws[1]._id)} src={"http://localhost:5000/images/"+raws[1].photos[0]} />
      </Carousel.Slide>
    </Carousel>
                      </div>
                      <div onClick={()=>navigate("/raw-recap")} className="itemC text-prime" style={{textAlign:"right", paddingRight:"10px", }}>
                        Plus d'information...
                      </div>
                      </div>
                      <div className="item3 bg-white1 grid-container3">
                        <div className="itemA text-prime"><h2 onClick={()=>navigate("/fournisseurs")}>Les fournisseurs:</h2></div>
                      <div className="itemB">
                        <Table striped highlightOnHover>
                        <thead>
                      <tr>
                        <th className="text-center" scope="col-4">Code</th>
                        <th className="text-center" scope="col-4">Raison</th>
                        <th className="text-center" scope="col-4">Pays</th>
                        <th className="text-center" scope="col-4">Ville</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fours !== undefined 
                        ? fournisseurs
                        : <tr className="sortable">
                            <td className="text-center"><Skeleton animation="wave" /></td>
                            <td className="text-center"><Skeleton animation="wave" /></td>
                            <td className="text-center"><Skeleton animation="wave" /></td>
                            <td className="text-center"><Skeleton animation="wave" /></td>
                          </tr>
                      }
                    </tbody>
                        </Table>
                      </div>
                      <div onClick={()=>navigate("/fournisseurs")} className="itemC text-prime" style={{textAlign:"right", paddingRight:"10px"}}>
                        Plus d'information...
                      </div>
                      </div>
                      <div className="item4 bg-white1 grid-container3">
                      <div className="itemA text-prime"><h2 onClick={()=>navigate("../../personnel")}>Les personnels:</h2></div>
                      <div className="itemB">
                        <Table>
                        <thead>
                      <tr>
                        <th className="text-center" scope="col-4">Nom</th>
                        <th className="text-center" scope="col-4">Prénom</th>
                        <th className="text-center" scope="col-4">Métier</th>
                        <th className="text-center" scope="col-4">Zone affecté</th>
                      </tr>
                    </thead>
                   <tbody>
                    {persons 
                      ? personnels.length!==0
                        ? personnels
                        : <h3>Vide!</h3>
                      : <tr className="sortable">
                          <td className="text-center"><Skeleton animation="wave" /></td>
                          <td className="text-center"><Skeleton animation="wave" /></td>
                          <td className="text-center"><Skeleton animation="wave" /></td>
                          <td className="text-center"><Skeleton animation="wave" /></td>
                        </tr>}
                    </tbody>
                        </Table>
                      </div>
                      <div onClick={()=>navigate("../../personnel")} className="itemC text-prime" style={{textAlign:"right", paddingRight:"10px"}}>
                        Plus d'information...
                      </div>
                      </div>
                      <div className="item5 bg-white1 grid-container3">
                        <div className="itemA text-prime"><h2 onClick={()=>navigate("../../zones")}>Les zones:</h2></div>
                      <div className="itemB">
                      <Table>
                        <thead>
                      <tr>
                        <th className="text-center" scope="col-4">Code</th>
                        <th className="text-center" scope="col-4">Ordre</th>
                        <th className="text-center" scope="col-4">Superficie</th>
                        <th className="text-center" scope="col-4">Responsable</th>
                      </tr>
                    </thead>
                   <tbody>
                    {zones 
                      ? workZones.length!==0
                        ? workZones
                        : <h3>Vide!</h3>
                      : <tr className="sortable">
                          <td className="text-center"><Skeleton animation="wave" /></td>
                          <td className="text-center"><Skeleton animation="wave" /></td>
                          <td className="text-center"><Skeleton animation="wave" /></td>
                          <td className="text-center"><Skeleton animation="wave" /></td>
                        </tr>}
                    </tbody>
                        </Table>
                        </div>
                        <div onClick={()=>navigate("../../zones")} className="itemC text-prime" style={{textAlign:"right", paddingRight:"10px"}}>
                        Plus d'information...
                      </div>
                     </div>
                      <div className="item6 bg-white1 grid-container3">
                        <div className="itemA text-prime"><h2 onClick={()=>navigate("../../equipements")}>Les equipements:</h2></div>
                      <div className="itemB">
                      <Table>
                      <thead>
                            <tr>
                                <th className="text-center" scope="col-4">Libelle</th>
                                <th className="text-center" scope="col-4">Code</th>
                                <th className="text-center" scope="col-4">Numéro d'Inventaire</th>
                                <th className="text-center" scope="col-4">Zone</th>
                            </tr>
                            </thead>
                            <tbody>
                                {equipements}
                            </tbody>
                        </Table>
                        </div>
                        <div onClick={()=>navigate("../../equipements")} className="itemC text-prime" style={{textAlign:"right", paddingRight:"10px"}}>
                        Plus d'information...
                      </div>
                     </div>
                </div>
                </div>
            
            
        : (
            <div className="container justify-content-center">
                <h3 className="text-prime p-3">Modification . . .</h3>
                <div className="row mediaquery-770">
                    <div className="col-12 org-edit-label">
                        <label>Name :</label>
                        <input 
                            className="org-name" 
                            name="name" 
                            type="text" 
                            placeholder={!lastValues.name ? editValues.name : lastValues.name} 
                            onChange={(event)=>editValuesFunc(event.target.name, event.target.value)}></input>
                    </div>
                    <div className="col-12 org-edit-label">
                        <label>Sites :</label>
                        <input 
                            className="org-name" 
                            name="site_num" 
                            type="text" 
                            placeholder={!lastValues.site_num ? editValues.site_num : lastValues.site_num} 
                            onChange={(event)=>editValuesFunc(event.target.name, event.target.value)}></input>
                    </div>
                    <div className="col-12 org-edit-label">
                        <label className="org-label">Date de création :</label>
                        <input 
                            className="org-name" 
                            name="creation_date" 
                            type="date" 
                            value={formatDate(editValues.creation_date)}
                            onChange={(event)=>editValuesFunc(event.target.name, event.target.value)}></input>
                    </div>
                    <div className="col-12 org-edit-label">
                        <label>Domaine :</label>
                        <input 
                            className="org-name" 
                            name="domaines" 
                            type="text" 
                            placeholder={!lastValues.domaines ? editValues.domaines : lastValues.domaines} 
                            onChange={(event)=>editValuesFunc(event.target.name, event.target.value)}></input>
                    </div>
                    <div className="col-12 org-edit-label">
                        <label>Téléphone :</label>
                        <div className='d-flex flex-column align-items-end'>
                            <MuiTelInput 
                                value={value}
                                label="Téléphone" 
                                className="org-name" 
                                name="tel" 
                                onChange={handleChange} 
                            />
                            <Typography>This is valid ? {isValid 
                                ? <b className="text-success">yes</b>
                                : <b className="text-danger">no</b>}
                            </Typography>
                        </div>
                    </div>
                    <div className="col-12 org-edit-label">
                        <label>Adresse :</label>
                        <input 
                            className="org-name" 
                            name="Adresse" 
                            type="text" 
                            placeholder={!lastValues.Adresse ? editValues.Adresse : lastValues.Adresse} 
                            onChange={(event)=>editValuesFunc(event.target.name, event.target.value)}></input>
                    </div>
                    <div className="col-12 org-edit-label">
                        <label>Localisation :</label>
                        <input 
                            className="org-name" 
                            name="Carte" 
                            type="text" 
                            placeholder={!lastValues.Carte ? editValues.Carte : lastValues.Carte} 
                            onChange={(event)=>editValuesFunc(event.target.name, event.target.value)}></input>
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
        return(
            <Box sx={{ height: 40 }}>
                <Fade
                    className="loading"
                    in={true}
                    style={{
                    transitionDelay: '800ms',
                    }}
                    unmountOnExit
                >
                    <CircularProgress />
                </Fade>
            </Box>
     )}
}