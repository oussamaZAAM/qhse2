import React, { useContext, useEffect, useState } from 'react';
import Prod from '../../components/RawRecap/RawRecap';
import { Button } from 'react-bootstrap';
import {AiOutlinePlus} from "react-icons/ai"
import './RawRecap.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/authContext';
import 'bootstrap/dist/css/bootstrap.css';
import { AiFillCaretDown,AiFillCaretUp } from 'react-icons/ai'

export default function OrganismPage() {
    const [prods, setProds] = useState();
    const [num, setNum] = useState(1);

    const { user, org } = useContext(AuthContext);
    useEffect(() => {
        const fetchOrgs = async () => {
          
            const res = await axios.get("http://localhost:5000/api/product/a/" + org._id);
            setProds(
              res.data
            );
            console.log(res.data)
          
        };
        fetchOrgs();
      }, [user._id]);
    
      let a=1;
    const organisms = prods!==undefined && prods.map(x=>{
        if(a<x.raw.length) {
            a=x.raw.length;
        }
        return(
            <Prod 
              key={x._id}
              prod={x}
            />
           
        )
    })
    if(num!==a){
        setNum(a);
    }
    const ar = new Array(num-1);
    const produit = ar.map(x=>{
        
        return(
            <th scope="col-4"></th>
           
        )
    })
    if(prods!==undefined){
    return(
        <div className='container-fluid logo'>
            <div className=' justify-content-center pb-10 pt-7'>
            
                <div className='row organisms-grid'>
                  {organisms.length!==0 && (
                  <div className='col-auto col-sm-auto col-md-auto'>
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th scope="col-4">Produit</th>
                        <th scope="col-4">Matieres Premieres</th>
                       {produit}
                      </tr>
                    </thead>
                    <tbody>
                      {organisms}
                    </tbody>
                  </table>
                  </div>)}
                  <div className='d-flex  justify-content-center align-items-center'>
                  <Link className="text-center m-2" to="../new-raw">
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