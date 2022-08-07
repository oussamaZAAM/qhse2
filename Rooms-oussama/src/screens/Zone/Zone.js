import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import './Zone.css'
import { Box } from '@mui/system';
import { AuthContext } from '../../Context/authContext';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AiFillCaretUp } from 'react-icons/ai';


const Zone = (props) => {
    const [zone, setZone] = useState();
    const [batiment, setBatiment] = useState();

    const [persons, setPersons] = useState();
    const allIds = persons && persons.map(x=>x._id);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const deleteZone = async() => {
        try{
            await axios.delete("http://localhost:5000/api/zone/" + props.zoneId);
            navigate("../zones")
        } catch(err) {
            window.alert(err.message);
        }
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
                    <div className="text-center"><h1 className='text-center'>Zone : {zone.code}</h1></div>
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
                            <div className="d-block w-100 m-1">
                                <h6 className="m-2">Ordre :</h6>
                                <b>{zone.ordre}</b>
                            </div>
                            <div className="d-block w-100 m-1">
                                <h6 className="m-2">Superficie :</h6>
                                <b>{zone.superficie}</b>
                            </div>
                            <div className="d-block w-100 m-1">
                                <h6 className="m-2">Responsable :</h6>
                                {persons !== undefined && <b>{persons[allIds.indexOf(zone.responsable)].nom+' '+persons[allIds.indexOf(zone.responsable)].prenom}</b>}
                            </div>
                            <div className="d-block w-100 m-1">
                                <h6 className="m-2">Equipe :</h6>
                                <b>{transformedPersonnel.join(' - ')}</b>
                            </div>
                            <div className='d-flex text-center'><h3>Flux données</h3></div>
                            {zone.flux.mp && <div className="d-block w-100 m-1">
                                <h6 className="m-2">Flux MP :</h6>
                                <b>{zone.flux.mp}</b>
                            </div>}
                            {zone.flux.produit && <div className="d-block w-100 m-1">
                                <h6 className="m-2">Flux Produit :</h6>
                                <b>{zone.flux.produit}</b>
                            </div>}
                            {zone.flux.personnel && <div className="d-block w-100 m-1">
                                <h6 className="m-2">Flux Personnel :</h6>
                                <b>{zone.flux.personnel}</b>
                            </div>}
                            {zone.flux.eau_potable && <div className="d-block w-100 m-1">
                                <h6 className="m-2">Flux Eau Potables :</h6>
                                <b>{zone.flux.eau_potable}</b>
                            </div>}
                            {zone.flux.eau_incendie && <div className="d-block w-100 m-1">
                                <h6 className="m-2">Flux Eau Incendie :</h6>
                                <b>{zone.flux.eau_incendie}</b>
                            </div>}
                            {zone.flux.evacuation && <div className="d-block w-100 m-1">
                                <h6 className="m-2">Flux Evacuation</h6>
                                <b>{zone.flux.evacuation}</b>
                            </div>}
                            {zone.flux.courant && <div className="d-block w-100 m-1">
                                <h6 className="m-2">Flux Courant Electrique :</h6>
                                <b>{zone.flux.courant}</b>
                            </div>}
                            {zone.flux.dechets && <div className="d-block w-100 m-1">
                                <h6 className="m-2">Flux Dechets Solides :</h6>
                                <b>{zone.flux.dechets}</b>
                            </div>}
                            {zone.flux.vapeur && <div className="d-block w-100 m-1">
                                <h6 className="m-2">Flux Vapeur :</h6>
                                <b>{zone.flux.vapeur}</b>
                            </div>}
                            {zone.flux.air && <div className="d-block w-100 m-1">
                                <h6 className="m-2">Flux Air comprimé :</h6>
                                <b>{zone.flux.air}</b>
                            </div>}
                        </Box>
                    </div>
                    <div className="container text-center text-danger"><Button className="btn" onClick={deleteZone}>Supprimer</Button></div>
                </div>
        </main>
    )
}

export default Zone