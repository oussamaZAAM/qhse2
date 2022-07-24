import React, { useContext, useEffect, useState } from 'react';
import Organism from '../../components/Organism/Organism';
import { Button } from 'react-bootstrap';
import {AiOutlinePlus} from "react-icons/ai"
import './OrganismPage.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/authContext';

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

    const organisms = orgs!==undefined && orgs.map(x=>{
        return(
            <div className="col-auto col-sm-auto col-md-auto col-lg-auto mt-2 ">
            <Organism 
            orgId={x}
            />
            </div>
        )
    })

    if(orgs!==undefined){
    return(
        <div className='container-fluid logo'>
            <div className=' justify-content-center pb-10 pt-7'>
                <div className='row organisms-grid'>
                   {organisms}
                    <div className='col-auto col-sm-auto col-md-auto col-lg-auto mt-2'>
                   <Link to="../new-organism">
                        <AiOutlinePlus size={50} style={{borderRadius: "9px", border: "3px solid"}}/>
                    </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}else{
    return null
}
}