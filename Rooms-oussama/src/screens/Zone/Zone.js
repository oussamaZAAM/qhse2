import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import './Zone.css'
import { Box } from '@mui/system';
import { AuthContext } from '../../Context/authContext';
import { useNavigate } from 'react-router-dom';
import { AiFillCaretUp } from 'react-icons/ai';
// import { Button } from 'react-bootstrap';
import { BiDownload } from 'react-icons/bi';
import { Alert, Snackbar } from '@mui/material';
import { Button } from '@mui/material';

const Zone = (props) => {
    const [zone, setZone] = useState();

    const [persons, setPersons] = useState();
    const allIds = persons && persons.map(x=>x._id);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [openAlert, setOpenAlert] = useState([false, false]);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpenAlert(false);
    };

    const deleteZone = async() => {
        try{
            setOpenAlert(true);
            if (window.confirm("Etes-vous sûr que vous voulez Supprimer ?")){
                await axios.delete("http://localhost:5000/api/zone/" + props.zoneId);
                navigate("../zones")
            }
        } catch(err) {
            window.alert(err.message);
        }
    }
    const handleDownload = async(e) => {
        await axios.get("http://localhost:5000/api/download/"+zone.flux[e.target.id]);
    }
    
    useEffect(()=>{
        const fetchPersons = async() => {
            const res = await axios.get("http://localhost:5000/api/personnel/a/" + user._id);
            setPersons(res.data)
        };
        fetchPersons();
        const fetchZone = async() => {
            const res = await axios.get("http://localhost:5000/api/zone/" + props.zoneId)
            setZone(res.data);
        }
        fetchZone();
    }, [props.zoneId])
    const transformedPersonnel = zone && zone.equipe.map(x=>persons[allIds.indexOf(x)].nom+' '+persons[allIds.indexOf(x)].prenom);
    return zone !== undefined && (
        <main className="container">
            <div className="container">
                    <div className="col-4 small d-flex justify-content-center align-items-center">
                        <Button href="../zones" className='col-2 small mx-2'><AiFillCaretUp />Liste des Zones</Button>
                    </div>
                    <div className="text-center"><h1 className='text-center'>{zone.type === 'zone' ? "Zone" : "Bâtiment"} : {zone.code}</h1></div>
                    <div className="container d-flex justify-content-center">
                        <Box
                            className='row d-flex justify-content-center mt-5'
                            style={{maxWidth: '50%'}}
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '30ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            {zone.type !== 'zone' &&
                            <div className="d-block w-100 m-1">
                                <h6 className="m-2">Libelle :</h6>
                                <b>{zone.libelle}</b>
                            </div>}
                            <div className="d-block w-100 m-1">
                                <h6 className="m-2">Ordre :</h6>
                                <b>{zone.ordre}</b>
                            </div>
                            <div className="d-block w-100 m-1">
                                <h6 className="m-2">Superficie :</h6>
                                <b>{zone.superficie}</b>
                            </div>
                            {zone.type !== 'zone' &&
                            <div className="d-block w-100 m-1">
                                <h6 className="m-2">Nombre de niveaux :</h6>
                                <b>{zone.nbr_niveau}</b>
                            </div>}
                            <div className="d-block w-100 m-1">
                                <h6 className="m-2">Responsable :</h6>
                                {persons !== undefined && <b>{persons[allIds.indexOf(zone.responsable)].nom+' '+persons[allIds.indexOf(zone.responsable)].prenom}</b>}
                            </div>
                            <div className="d-block w-100 m-1">
                                <h6 className="m-2">Equipe :</h6>
                                <b>{transformedPersonnel.join(' - ')}</b>
                            </div>
                            {zone.type !== 'zone' &&
                            <div className="d-block w-100 m-1">
                                <h6 className="m-2">Atex :</h6>
                                <b>{zone.atex}</b>
                            </div>}
                            <div className='d-flex text-center'><h3>Flux données</h3></div>
                            {zone.flux.mp && <div className="d-block w-100 m-1">
                                <h6 className="m-2">Flux MP :</h6>
                                <b>{zone.flux.mp}</b>
                                <BiDownload className="m-2 pointer" id="mp" size={20} onClick={handleDownload}/>
                            </div>}
                            {zone.flux.produit && <div className="d-block w-100 m-1">
                                <h6 className="m-2">Flux Produit :</h6>
                                <b>{zone.flux.produit}</b>
                                <BiDownload className="m-2 pointer" id="produit" size={20} onClick={handleDownload}/>
                            </div>}
                            {zone.flux.personnel && <div className="d-block w-100 m-1">
                                <h6 className="m-2">Flux Personnel :</h6>
                                <b>{zone.flux.personnel}</b>
                                <BiDownload className="m-2 pointer" id="personnel" size={20} onClick={handleDownload}/>
                            </div>}
                            {zone.flux.eau_potable && <div className="d-block w-100 m-1">
                                <h6 className="m-2">Flux Eau Potables :</h6>
                                <b>{zone.flux.eau_potable}</b>
                                <BiDownload className="m-2 pointer" id="eau_potable" size={20} onClick={handleDownload}/>
                            </div>}
                            {zone.flux.eau_incendie && <div className="d-block w-100 m-1">
                                <h6 className="m-2">Flux Eau Incendie :</h6>
                                <b>{zone.flux.eau_incendie}</b>
                                <BiDownload className="m-2 pointer" id="eau_incendie" size={20} onClick={handleDownload}/>
                            </div>}
                            {zone.flux.evacuation && <div className="d-block w-100 m-1">
                                <h6 className="m-2">Flux Evacuation</h6>
                                <b>{zone.flux.evacuation}</b>
                                <BiDownload className="m-2 pointer" id="evacuation" size={20} onClick={handleDownload}/>
                            </div>}
                            {zone.flux.courant && <div className="d-block w-100 m-1">
                                <h6 className="m-2">Flux Courant Electrique :</h6>
                                <b>{zone.flux.courant}</b>
                                <BiDownload className="m-2 pointer" id="courant" size={20} onClick={handleDownload}/>
                            </div>}
                            {zone.flux.dechets && <div className="d-block w-100 m-1">
                                <h6 className="m-2">Flux Dechets Solides :</h6>
                                <b>{zone.flux.dechets}</b>
                                <BiDownload className="m-2 pointer" id="dechets" size={20} onClick={handleDownload}/>
                            </div>}
                            {zone.flux.vapeur && <div className="d-block w-100 m-1">
                                <h6 className="m-2">Flux Vapeur :</h6>
                                <b>{zone.flux.vapeur}</b>
                                <BiDownload className="m-2 pointer" id="vapeur" size={20} onClick={handleDownload}/>
                            </div>}
                            {zone.flux.air && <div className="d-block w-100 m-1">
                                <h6 className="m-2">Flux Air comprimé :</h6>
                                <b>{zone.flux.air}</b>
                                <BiDownload className="m-2 pointer" id="air" size={20} onClick={handleDownload}/>
                            </div>}
                        </Box>
                    </div>
                    <div className="container text-center"><Button className="btn text-danger" onClick={deleteZone}>Supprimer</Button></div>
                </div>
                {openAlert && 
                    <Snackbar sx={{width: '35%'}} open={true} autoHideDuration={1500} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="warning" sx={{ width: '100%' }}>
                        Suppression Annulée!
                    </Alert>
                    </Snackbar>
                }
        </main>
    )
}

export default Zone