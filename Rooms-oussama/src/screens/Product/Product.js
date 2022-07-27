import { Pagination } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppPagination from '../../components/Pagination/AppPagination';
import "./Product.css"

const Product = (props) => {
    const [product, setProduct] = useState();
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    function handlePage(event, value) {
        setPage(value);
    }
    const handleDelete= async (e)=>{
        e.preventDefault();
        try{
            await axios.delete("http://localhost:5000/api/product/" + props.orgId);
            navigate("../../main")
        }catch(err){
            console.log(err)      
        }
        
    }
    useEffect(() => {
        const fetchProducts = async() => {
            const res = await axios.get("http://localhost:5000/api/product/"+props.productId);
            setProduct(res.data);
        }
        fetchProducts();
    },[props.productId])
  return (
    product && 
    <div className="container">
        <h3 className="text-center">{product.name}</h3>
        <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6"></div>
            <div className="row col-sm-12 col-md-6 col-lg-6">
                <div className="container">
                    {page === 1 ?
                        <>
                        <h5 className='p-3'>Shelf Life: <b>{product.shifelife}</b></h5>
                        <h5 className='p-3'>Duree de Shelf Life: <b>{product.time_shife}</b></h5>
                        <h5 className='p-3'>Fiche Technique: <b>{product.fiche_technique}</b></h5>
                        <h5 className='p-3'>FDS: <b>{product.fds}</b></h5>
                        <h5 className='p-3'>Emballage: <b>{product.emballage}</b></h5>
                        <h5 className='p-3'>Grammage: <b>{product.grammage}</b></h5>
                        </>
                    : page === 2 ?
                        <>
                        <h5 className='p-3'>Type de client: <b>{product.type_client}</b></h5>
                        <h5 className='p-3'>Date de creation: <b>{product.creation_date}</b></h5>
                        <h5 className='p-3'>Agrement Sanitaire: <b>{product.agrement}</b></h5>
                        <h5 className='p-3'>Autorisation Sanitaire: <b>{product.autorisation}</b></h5>
                        <h5 className='p-3'>Site de production: <b>{product.site}</b></h5>
                        <h5 className='p-3'>Organisme: <b>{product.org}</b></h5>
                        </>
                    :
                        <>
                        <h4 className='text-center col-12 col-sm-6 col-md-4 col-lg-4 etiquettes'>Etiquettes</h4>
                        <h5 className='p-3'>Valeur Energetique: <b>{product.energie}</b></h5>
                        <h5 className='p-3'>Proteines: <b>{product.proteine}</b></h5>
                        <h5 className='p-3'>Carbohydrates: <b>{product.carbs}</b></h5>
                        <h5 className='p-3'>Lipides: <b>{product.lipide}</b></h5>
                        <h5 className='p-3'>Calcium: <b>{product.calcium}</b></h5>
                        </>
                    }
                </div>
                <Pagination count={3} page={page} onChange={handlePage}/>
            </div>
        </div>
        <div className="container text-center products-btn">
            <Button className='btn btn-primary m-2'>Modifier</Button>
            <Button className='btn btn-danger m-2' onClick={handleDelete}>Supprimer</Button>
        </div>
    </div>
  )
}

export default Product