import React, { useContext, useEffect, useState } from 'react';
import Organism from '../../components/Organism/Organism';
import { Button } from 'react-bootstrap';
import {AiOutlinePlus} from "react-icons/ai"
import './Organisms.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/authContext';
import 'bootstrap/dist/css/bootstrap.css';

export default function OrganismPage() {
    const [orgs, setOrgs] = useState();

    const { user } = useContext(AuthContext);
    useEffect(() => {
        const fetchOrgs = async () => {
          if (user) {
            const res = await axios.get("http://localhost:5000/api/organism/a/" + user._id);
            setOrgs(
              res.data
            );
          }
        };
        fetchOrgs();
      }, [user._id]);

    const organisms = orgs!==undefined && orgs.map(x=>{
        return(
            <Organism 
              orgId={x}
            />
           
        )
    })
    if(orgs!==undefined){
    return(
        <div className='container-fluid logo'>
            <div className=' justify-content-center pb-10 pt-7'>
                <div className='row organisms-grid'>
                  {organisms.length!==0 && (
                  <div className='col-auto col-sm-auto col-md-auto'>
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th scope="col-4">Name</th>
                        <th scope="col-4">Domaine</th>
                        <th scope="col-4">Téléphone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {organisms}
                    </tbody>
                  </table>
                  </div>)}
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