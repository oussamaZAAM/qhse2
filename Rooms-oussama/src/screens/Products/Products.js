import React, { useContext, useEffect, useState } from 'react';
import Product from '../../components/Product/Product';
import { Button } from 'react-bootstrap';
import {AiOutlinePlus} from "react-icons/ai"
import './Products.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/authContext';
import 'bootstrap/dist/css/bootstrap.css';

export default function Products() {
    const [prods, setProds] = useState();

    const { user, org } = useContext(AuthContext);
    useEffect(() => {
        const fetchProds = async () => {
          if (user) {
            const res = await axios.get("http://localhost:5000/api/product/a/" + org._id);
            setProds(
              res.data
            );
          }
        };
        fetchProds();
      }, [user._id]);

    const products = prods!==undefined && prods.map(x=>{
        return(
            <Product 
              key={x._id}
              prod={x}
            />
           
        )
    })
    if(prods!==undefined){
    return(
        <div className='container-fluid logo'>
            <div className=' justify-content-center pb-10 pt-7'>
                <div className='row organisms-grid'>
                  {products.length!==0 && (
                  <div className='col-auto col-sm-auto col-md-auto'>
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th scope="col-4">Name</th>
                        <th scope="col-4">Photos</th>
                        <th scope="col-4">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products}
                    </tbody>
                  </table>
                  </div>)}
                  <div className='col-auto col-sm-auto col-md-auto col-lg-auto mt-2'>
                  <Link to="../new-product">
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