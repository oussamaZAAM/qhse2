import React, { useRef, useContext, useState, useEffect } from "react";
import Organism from '../../components/Organism/Organism';
import { Button } from 'react-bootstrap';
import {AiOutlinePlus} from "react-icons/ai"
import './OrganismPage.css'
import axios from 'axios'

import { AuthContext } from "../../Context/authContext";
export default function OrganismPage() {
    const [orgs, setOrgs] = useState();

    const { user } = useContext(AuthContext);

    useEffect(() => {
    
        const fetchOrgs = async () => {
          const res = await axios.get("http://localhost:5000/api/organism/a/" + user._id);
          setOrgs(
            res.data
          );
        };
        fetchOrgs();
      }, [user._id]);
    console.log(orgs)
    if(orgs!==undefined){
    return(
        <div className='container-fluid logo'>
            <div className='row '>
                <div className="col-sm-4 col-md-6 col-lg-12 p-4">
                    <img className='logo-img' src="https://i.ibb.co/FHB2LVk/Whats-App-Image-2022-07-23-at-12-35-53-PM.jpg" width="250px"/>
                </div>
            </div>
            <div className=' justify-content-center pb-10 pt-7'>
                <div className='row organisms-grid'>
                    <div className="col-auto col-sm-auto col-md-auto col-lg-auto mt-2 ">
                        <Organism orgId={orgs[0]}/>
                    </div>
                    {/* <div className="col-auto col-sm-auto col-md-auto col-lg-auto mt-2">
                        <Organism />
                    </div>
                    <div className="col-auto col-sm-auto col-md-auto col-lg-auto mt-2">
                        <Organism />
                    </div>
                    <div className="col-auto col-sm-auto col-md-auto col-lg-auto mt-2">
                        <Organism />
                    </div> */}
                    <div className='col-auto col-sm-auto col-md-auto col-lg-auto mt-2'>
                        <AiOutlinePlus size={50} style={{borderRadius: "9px", border: "3px solid"}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}else{
    return null
}
}