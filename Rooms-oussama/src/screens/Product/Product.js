import { Pagination, TextField } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppPagination from '../../components/Pagination/AppPagination';
import { AuthContext } from "../../Context/authContext";
import "./Product.css"

const Product = (props) => {
    const [product, setProduct] = useState();
    const [page, setPage] = useState(1);
    const [isEdit, setIsEdit] = useState(props.isEdit==="isEdit");
    const { org } = useContext(AuthContext)
    const [editValues, setEditValues] = useState({
        name: "",
        shifelife: "",
        shife_time:"",
        fiche_technique:"",
        fds:"",
        emballage:"",
        grammage:"",
        type_client:"",
        creation_date:"",
        agrement:"",
        autorisation:"",
        site:"",
        energie:"",
        proteine:"",
        carbs:"",
        lipide:"",
        calcium:"",
    })
    const navigate = useNavigate();
    function handlePage(event, value) {
        setPage(value);
    }
    function enableEdit() {
        setIsEdit(true);
    }
    function handleChange(event) {
        setEditValues({...editValues, [event.target.name]: event.target.value})
    }
    const handleEdit = async() => {
        try{
            await axios.put("http://localhost:5000/api/product/" + props.productId, editValues)
        } catch(err){
            console.log(err);
        }
        setIsEdit(false)
    }
    const handleDelete= async (e)=>{
        e.preventDefault();
        try{
            await axios.delete("http://localhost:5000/api/product/" + props.productId);
            navigate("../../main")
        }catch(err){
            console.log(err)      
        }
    }
    useEffect(() => {
        const fetchProducts = async() => {
            const res = await axios.get("http://localhost:5000/api/product/"+props.productId);
            setProduct(res.data);
            setEditValues({
                name: res.data.name,
                shifelife: res.data.shifelife,
                shife_time: res.data.shife_time,
                fiche_technique: res.data.fiche_technique,
                fds:res.data.fds,
                emballage:res.data.emballage,
                grammage:res.data.grammage,
                type_client:res.data.type_client,
                creation_date:res.data.creation_date,
                agrement:res.data.agrement,
                autorisation:res.data.autorisation,
                site:res.data.site,
                energie:res.data.energie,
                proteine:res.data.proteine,
                carbs:res.data.carbs,
                lipide:res.data.lipide,
                calcium:res.data.calcium,
              })
        }
        fetchProducts();
    },[props.productId])
    console.log(editValues)
  return (
    product && 
    <div className="container">
        <h3 className="p-5 text-center">{editValues.name}</h3>
        <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6"></div>
            <div className="row col-sm-12 col-md-6 col-lg-6">
                <div className="container">
                    {page === 1 ?
                    !isEdit ?
                        (<>
                            <h5 className='p-3'>Shelf Life: <b>{editValues.shifelife}</b></h5>
                            <h5 className='p-3'>Duree de Shelf Life: <b>{editValues.shife_time}</b></h5>
                            <h5 className='p-3'>Fiche Technique: <b>{editValues.fiche_technique}</b></h5>
                            <h5 className='p-3'>FDS: <b>{editValues.fds}</b></h5>
                            <h5 className='p-3'>Emballage: <b>{editValues.emballage}</b></h5>
                            <h5 className='p-3'>Grammage: <b>{editValues.grammage}</b></h5>
                        </>)
                    :
                        (<>
                            <div className='d-flex justify-content-start'>
                                <h5 className='p-3'>Shelf Life: </h5>
                                <TextField
                                    hiddenLabel
                                    className="col-12 col-sm-6 col-md-4 col-lg-4"
                                    id="filled-hidden-label-normal"
                                    value={editValues.shifelife}
                                    name='shifelife'
                                    variant="filled"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='d-flex justify-content-start'>
                                <h5 className='p-3'>Duree de Shelf Life: </h5>
                                <TextField
                                    hiddenLabel
                                    className="col-12 col-sm-6 col-md-4 col-lg-4"
                                    id="filled-hidden-label-normal"
                                    value={editValues.shife_time}
                                    name='shife_time'
                                    variant="filled"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='d-flex justify-content-start'>
                                <h5 className='p-3'>Fiche Technique: </h5>
                                <TextField
                                    hiddenLabel
                                    className="col-12 col-sm-6 col-md-4 col-lg-4"
                                    id="filled-hidden-label-normal"
                                    value={editValues.fiche_technique}
                                    name='fiche_technique'
                                    variant="filled"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='d-flex justify-content-start'>
                                <h5 className='p-3'>FDS: </h5>
                                <TextField
                                    hiddenLabel
                                    className="col-12 col-sm-6 col-md-4 col-lg-4"
                                    id="filled-hidden-label-normal"
                                    value={editValues.fds}
                                    name='fds'
                                    variant="filled"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='d-flex justify-content-start'>
                                <h5 className='p-3'>Emballage: </h5>
                                <TextField
                                    hiddenLabel
                                    className="col-12 col-sm-6 col-md-4 col-lg-4"
                                    id="filled-hidden-label-normal"
                                    value={editValues.emballage}
                                    name='emballage'
                                    variant="filled"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='d-flex justify-content-start'>
                                <h5 className='p-3'>Grammage: </h5>
                                <TextField
                                    hiddenLabel
                                    className="col-12 col-sm-6 col-md-4 col-lg-4"
                                    id="filled-hidden-label-normal"
                                    value={editValues.grammage}
                                    name='grammage'
                                    variant="filled"
                                    onChange={handleChange}
                                />
                            </div>
                        </>)
                    
                    : page === 2 ?
                        isEdit ?
                            (<>
                                <div className='d-flex justify-content-start'>
                                    <h5 className='p-3'>Type de client: </h5>
                                    <TextField
                                        hiddenLabel
                                        className="col-12 col-sm-6 col-md-4 col-lg-4"
                                        id="filled-hidden-label-normal"
                                        value={editValues.type_client}
                                        name='type_client'
                                        variant="filled"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='d-flex justify-content-start'>
                                    <h5 className='p-3'>Date de création: </h5>
                                    <TextField
                                        hiddenLabel
                                        className="col-12 col-sm-6 col-md-4 col-lg-4"
                                        id="filled-hidden-label-normal"
                                        value={editValues.creation_date}
                                        name='creation_date'
                                        variant="filled"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='d-flex justify-content-start'>
                                    <h5 className='p-3'>Agrément Sanitaire: </h5>
                                    <TextField
                                        hiddenLabel
                                        className="col-12 col-sm-6 col-md-4 col-lg-4"
                                        id="filled-hidden-label-normal"
                                        value={editValues.agrement}
                                        name='agrement'
                                        variant="filled"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='d-flex justify-content-start'>
                                    <h5 className='p-3'>Autorisation Sanitaire: </h5>
                                    <TextField
                                        hiddenLabel
                                        className="col-12 col-sm-6 col-md-4 col-lg-4"
                                        id="filled-hidden-label-normal"
                                        value={editValues.autorisation}
                                        name='autorisation'
                                        variant="filled"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='d-flex justify-content-start'>
                                    <h5 className='p-3'>Site de production: </h5>
                                    <TextField
                                        hiddenLabel
                                        className="col-12 col-sm-6 col-md-4 col-lg-4"
                                        id="filled-hidden-label-normal"
                                        value={editValues.site}
                                        name='site'
                                        variant="filled"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='d-flex justify-content-start'>
                                    <h5 className='p-3'>Organisme: </h5>
                                    <TextField
                                        disabled
                                        hiddenLabel
                                        className="col-12 col-sm-6 col-md-4 col-lg-4"
                                        id="filled-hidden-label-normal"
                                        value={org.name}
                                        name='org'
                                        variant="filled"
                                        onChange={handleChange}
                                    />
                                </div>
                            </>)
                            : (<>
                                <h5 className='p-3'>Type de client: <b>{editValues.type_client}</b></h5>
                                <h5 className='p-3'>Date de création: <b>{editValues.creation_date}</b></h5>
                                <h5 className='p-3'>Agrément Sanitaire: <b>{editValues.agrement}</b></h5>
                                <h5 className='p-3'>Autorisation Sanitaire: <b>{editValues.autorisation}</b></h5>
                                <h5 className='p-3'>Site de production: <b>{editValues.site}</b></h5>
                                <h5 className='p-3'>Organisme: <b>{org.name}</b></h5>
                            </>
                            )
                        :
                        isEdit ?
                            (<>
                                <h4 className='text-center col-12 col-sm-6 col-md-4 col-lg-4 etiquettes'>Etiquettes</h4>
                                <div className='d-flex justify-content-start'>
                                    <h5 className='p-3'>Valeur Energétique: </h5>
                                    {console.log(editValues)}
                                    <TextField
                                        hiddenLabel
                                        className="col-12 col-sm-6 col-md-4 col-lg-4"
                                        id="filled-hidden-label-normal"
                                        type="number"
                                        value={editValues.energie}
                                        name='energie'
                                        variant="filled"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='d-flex justify-content-start'>
                                    <h5 className='p-3'>Protéines: </h5>
                                    <TextField
                                        hiddenLabel
                                        className="col-12 col-sm-6 col-md-4 col-lg-4"
                                        id="filled-hidden-label-normal"
                                        type="number"
                                        value={editValues.proteine}
                                        name='proteine'
                                        variant="filled"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='d-flex justify-content-start'>
                                    <h5 className='p-3'>Carbohydrates: </h5>
                                    <TextField
                                        hiddenLabel
                                        className="col-12 col-sm-6 col-md-4 col-lg-4"
                                        id="filled-hidden-label-normal"
                                        type="number"
                                        value={editValues.carbs}
                                        name='carbs'
                                        variant="filled"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='d-flex justify-content-start'>
                                    <h5 className='p-3'>Lipides: </h5>
                                    <TextField
                                        hiddenLabel
                                        className="col-12 col-sm-6 col-md-4 col-lg-4"
                                        id="filled-hidden-label-normal"
                                        type="number"
                                        value={editValues.lipide}
                                        name='lipide'
                                        variant="filled"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='d-flex justify-content-start'>
                                    <h5 className='p-3'>Calcium: </h5>
                                    <TextField
                                        hiddenLabel
                                        className="col-12 col-sm-6 col-md-4 col-lg-4"
                                        id="filled-hidden-label-normal"
                                        type="number"
                                        value={editValues.calcium}
                                        name='calcium'
                                        variant="filled"
                                        onChange={handleChange}
                                    />
                                </div>
                            </>)
                            :
                            (<>
                                <h4 className='text-center col-12 col-sm-6 col-md-4 col-lg-4 etiquettes'>Etiquettes</h4>
                                <h5 className='p-3'>Valeur Energétique: <b>{editValues.energie}</b></h5>
                                <h5 className='p-3'>Protéines: <b>{editValues.proteine}</b></h5>
                                <h5 className='p-3'>Carbohydrates: <b>{editValues.carbs}</b></h5>
                                <h5 className='p-3'>Lipides: <b>{editValues.lipide}</b></h5>
                                <h5 className='p-3'>Calcium: <b>{editValues.calcium}</b></h5>
                             </>)
                    }
                </div>
                <Pagination count={3} page={page} onChange={handlePage}/>
            </div>
        </div>
        {!isEdit?
        (<div className="container text-center products-btn">
            <Button className='btn btn-primary m-2' onClick={enableEdit}>Modifier</Button>
            <Button className='btn btn-danger m-2' onClick={handleDelete}>Supprimer</Button>
        </div>)
        :(<div className="container text-center products-btn">
            <Button className='btn btn-primary m-2 enregistrer' onClick={handleEdit}>Enregistrer</Button>
        </div>)}
    </div>
  )
}

export default Product