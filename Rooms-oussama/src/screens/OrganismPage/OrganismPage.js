import React, { useContext, useEffect, useState } from 'react';
import Organism from '../../components/Organism/Organism';
import { Button } from 'react-bootstrap';
import {AiOutlinePlus} from "react-icons/ai"
import './OrganismPage.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/authContext';

export default function OrganismPage() {
    const {user} = useContext(AuthContext);
    const [Organisms, setOrganisms] = useState();
    useEffect(()=>{
        const fetchOrganisms = () => {
            const res = axios.get("https://localhost:5000/api/organism/"+user._id)
            setOrganisms(res.data);
        }
        fetchOrganisms();
    }, [])
    console.log(Organisms);
    return(
        <div className='container-fluid'>
            <div className='row'>
                <div className="col-sm-4 col-md-6 col-lg-12 p-4">
                    <img className='logo-img' src="https://i.ibb.co/FHB2LVk/Whats-App-Image-2022-07-23-at-12-35-53-PM.jpg" width="250px"/>
                </div>
            </div>
            <div className='vertical-center justify-content-center'>
                <div className='row organisms-grid'>
                    
                    <div className='col-auto col-sm-auto col-md-auto col-lg-auto mt-2'>
                        <Link to="/new-organism"><AiOutlinePlus size={50} style={{borderRadius: "9px", border: "3px solid"}}/></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}