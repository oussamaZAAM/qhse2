import React, { useRef, useContext, useState, useEffect } from "react";
import './Product.css'
import {useNavigate} from "react-router-dom"
import { AuthContext } from "../../Context/authContext";
import { Button } from 'react-bootstrap';


export default function Product(props) {
    const navigate = useNavigate();


    const handleOrg = (e) => {
    
       
        navigate("/product/"+props.prod._id);

    

    }

    return(
        // <tr onClick={handleOrg} className="sortable">
        //     <td>{props.prod.name}</td>
        //     <td><img src={"../../../../../Server/public/images/"+props.prod.photos}/></td>
        //     <td>{props.prod.creation_date}</td>
        // </tr>
        <div class="col-md-3">

        <div class="card p-3">

            <div onClick={handleOrg}  class="text-center">

                <img src={"../../../../../Server/public/images/"+props.prod.photos} width="200"/>
                
            </div>

            <div class="product-details">


                 <span onClick={handleOrg} >{props.prod.name}</span>


                 <div class="buttons d-flex flex-row">
                    <div class="cart"><i class="fa fa-shopping-cart"></i></div> <button class="btn btn-success cart-button btn-block"><span class="dot">1</span>Add to cart </button>
                </div>

                 <div class="weight">

                    <small>1 piece 2.5kg</small>
                                                 
                 </div>

            </div>


            
        </div>
        

    </div>
    )
}