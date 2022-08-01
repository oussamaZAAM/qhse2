import React, { useContext, useEffect, useState } from 'react';
import Product from '../../components/Product/Product';
import { Button } from 'react-bootstrap';
import {AiOutlinePlus} from "react-icons/ai"
import './Products.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/authContext';
import 'bootstrap/dist/css/bootstrap.css';
import { FaFilter, FaSort } from 'react-icons/fa';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function Products() {
    const [prods, setProds] = useState();
    const [age, setAge] = useState('');

    const { user, org } = useContext(AuthContext);
    
    const handleChange = (event) => {
      setAge(event.target.value);
    };
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
    prods && prods.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0));
    prods && prods.sort((a,b) => b.energie - a.energie);

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
          // <div className='container-fluid logo'>
          //     <div className=' justify-content-center pb-10 pt-7'>
          //         <div className='row organisms-grid'>
          //           {products.length!==0 && (
          //           <div className='col-auto col-sm-auto col-md-auto'>
          //           <table className="table table-striped table-hover">
          //             <thead>
          //               <tr>
          //                 <th scope="col-4">Name</th>
          //                 <th scope="col-4">Photos</th>
          //                 <th scope="col-4">Date</th>
          //               </tr>
          //             </thead>
          //             <tbody>
          //               {products}
          //             </tbody>
          //           </table>
          //           </div>)}
          //           <div className='col-auto col-sm-auto col-md-auto col-lg-auto mt-2'>
          //           <Link to="../new-product">
          //               <AiOutlinePlus size={50} style={{borderRadius: "9px", border: "3px solid"}}/>
          //           </Link>
          //           </div>
          //         </div>
          //     </div>
          // </div>
          <div class="wrapper">
            <div class="container">
              <div className='d-flex justify-content-end align-items-center p-3'>
                <div className="filter-div">
                    <FaSort className='m-2'/>
                    <span className='m-2'>Sort by</span>
                </div>
                <div className="filter-div">
                  <FaFilter className='m-2'/>
                  <span className='m-2'>Filter</span>
                </div>
              </div>
              <div className="d-flex justify-content-center p-3">
                s
              </div>
              <div class="row g-1">
                {products}
                <Link className="text-center m-2" to="../new-product">
                      <AiOutlinePlus size={50} style={{borderRadius: "9px", border: "3px solid"}}/>
                </Link>
              </div>
            </div>
          </div>
      )
    }else{
        return null
    }
}