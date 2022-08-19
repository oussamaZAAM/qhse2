import React, { useContext, useEffect, useState } from 'react';
import Organism from '../../components/Organism/Organism';
import { Button } from 'react-bootstrap';
import {AiOutlinePlus} from "react-icons/ai"
import './Organisms.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/authContext';
import 'bootstrap/dist/css/bootstrap.css';
import { Skeleton } from '@mui/material';

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
              key={x._id}
              orgId={x}
            />
           
        )
    })
    return(
        <div className='container-fluid logo'>
            <div className=' justify-content-center pb-10 pt-7'>
                <div className='row organisms-grid'>
                  <div className='col-auto col-sm-auto col-md-auto'>
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th scope="col-4">Nom</th>
                        <th scope="col-4">Adresse</th>
                        <th scope="col-4">Téléphone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orgs!==undefined
                      ? organisms.length !== 0 
                        ? organisms
                        : <h3>Liste Vide!</h3>
                      : <tr>
                          <th scope="col-4"><Skeleton animation="wave" /></th>
                          <th scope="col-4"><Skeleton animation="wave" /></th>
                          <th scope="col-4"><Skeleton animation="wave" /></th>
                        </tr>}
                    </tbody>
                  </table>
                  </div>
                  <div className='col-auto col-sm-auto col-md-auto col-lg-auto mt-2'>
                  <Link to="../new-organism">
                      <AiOutlinePlus size={50} style={{borderRadius: "9px", border: "3px solid"}}/>
                  </Link>
                  </div>
                </div>
            </div>
        </div>
    )
}