import React from "react";
import './Product.css'
import {useNavigate} from "react-router-dom"

import axios from 'axios';


export default function Product(props) {
    const navigate = useNavigate();


    const handleOrg = (e) => {
        navigate("/product/"+props.prod._id);
    }
    const handleEdit = async() => {
        navigate("/product/"+props.prod._id+"/isEdit");
    }
    const handleDelete= async (e)=>{
        e.preventDefault();
        try{
            await axios.delete("http://localhost:5000/api/product/" + props.prod._id);
            navigate("/main")
        }catch(err){
            console.log(err)      
        }
    }

    return(
        <div className="col-md-6 col-lg-4 col-xl-3">
          <div className="card1 p-3">

            <div onClick={handleOrg}  className="text-center">

                <img src={"http://localhost:5000/images/"+props.prod.photos[0]} className="img-height" width="200"/>
                
            </div>

            <div className="product-details">

                 <span onClick={handleOrg} >{props.prod.name}</span>

                 <div className="buttons d-flex flex-row justify-content-center">
                    <button onClick={handleEdit} className="btn btn-primary cart-button btn-block mx-3"><span className="dot">1</span>Modifier </button>
                    <button onClick={handleDelete} className="btn btn-danger cart-button btn-block"><span className="dot">1</span>Supprimer </button>
                </div>

                 <div className="weight d-flex flex-column">

                    <small>Numero : {props.count}</small>
                    <small>date : {props.prod.creation_date}</small>
                                                 
                 </div>

            </div>

          </div>

        </div>
    )
}