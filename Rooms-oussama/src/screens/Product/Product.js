import { Pagination, TextField } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../Context/authContext";
import "./Product.css";
import { AiFillCamera } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'

const Product = (props) => {
    const [product, setProduct] = useState();
    const [page, setPage] = useState(1);
    const [imagePage, setImagePage] = useState(1);
    const [picture, setPicture] = useState('');
    const [isEdit, setIsEdit] = useState(props.isEdit==="isEdit");
    const { org } = useContext(AuthContext)
    const [editValues, setEditValues] = useState({
        name: "",
        photos: "",
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
    function handleImagePage(event, value) {
        setImagePage(value);
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
    const handleUpload = async (e) => {
        const pic=e.target.files[0]; //Initialiser "pic" avec l'image telecharger depuis la machine
        // setFile(e.target.files[0])
        const data = new FormData(); //Initialiser "data" par une Forme de donnes
        const fileName = Date.now() + pic.name; //Initialiser "fileName" par le nom de fichier telecharge
        data.append("name", fileName);
        data.append("file", pic);
        //Ajouter les informations de fichier telecharge a notre "data"
        try {
            await axios.post("http://localhost:5000/api/upload/image", data);
            //envoyer la donnee vers le "backend" avec "axios" dans le champs "upload"
        } catch (err) {}
        // setPicture(fileName)
        setPicture(prev=>[...prev, fileName])
        setProduct({...product, photos: picture});
    }
    const handleDownload= async (e) => {
        await axios.get("http://localhost:5000/api/download/"+editValues.fiche_technique);
        switch(e.target.name){
            case "fiche_tech":
                await axios.get("http://localhost:5000/api/download/"+editValues.fiche_technique);
            case "fds":
                await axios.get("http://localhost:5000/api/download/"+editValues.fds);
        }
        
    }
    const handleUploadFile = async (e) => {
        const pic=e.target.files[0]; //Initialiser "pic" avec l'image telecharger depuis la machine
        // setFile(e.target.files[0])
        const data = new FormData(); //Initialiser "data" par une Forme de donnes
        const fileName = Date.now() + pic.name; //Initialiser "fileName" par le nom de fichier telecharge
        data.append("name", fileName);
        data.append("file", pic);
        //Ajouter les informations de fichier telecharge a notre "data"
        try {
            await axios.post("http://localhost:5000/api/upload/file", data);
            //envoyer la donnee vers le "backend" avec "axios" dans le champs "upload"
        } catch (err) {}
        // setPicture(fileName)
        setEditValues({...product, fiche_technique: fileName});
    }
    function deleteImage(imageId) {
        setImagePage(prev=>{
            if (prev!==1){
                return prev-1;
            } else {
                return prev;
            }
        });
        picture.splice(imageId,1)
        setEditValues({...editValues, photos: picture})
    }
    useEffect(() => {
        const fetchProducts = async() => {
            const res = await axios.get("http://localhost:5000/api/product/"+props.productId);
            setProduct(res.data);
            setEditValues({
                name: res.data.name,
                photos: res.data.photos,
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
            setPicture(res.data.photos)
        }
        fetchProducts();
    },[props.productId])
  return (
    product && 
    <div className="container">
        <h3 className="p-5 text-center">{editValues.name}</h3>
        <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6 text-center center-image d-flex flex-column">
                {picture.length!==0 
                    ? 
                    <>
                        {picture.length!==0 && isEdit && <div className='delete-product-div'><BiTrash className='delete-product-img' onClick={()=>deleteImage(imagePage-1)} /></div>}
                        <img className='wrapping-image' src={"http://localhost:5000/images/"+picture[imagePage-1]} width="400px" />
                    </>
                    : 
                    <div className='d-flex align-items-center border border-dark'>
                        <h3 className="p-3">Pas d'image</h3>
                        {isEdit && <label className="p-3" variant="contained" component="label" for="file">
                            <AiFillCamera size={30}/>
                            <input hidden accept="image/*" multiple type="file" id="file" onChange={(e) => handleUpload(e)}/>
                        </label>}
                    </div>
                }
                {isEdit && (
                    <>
                        <label className="wrapped-btn" variant="contained" component="label" for="file">
                            <AiFillCamera size={30}/>
                            <input hidden accept="image/*" type="file" id="file" onChange={(e) => handleUpload(e)}/>
                        </label>
                    </>
                    )}
                {picture.length>1 && <Pagination count={picture.length} page={imagePage} onChange={handleImagePage}/>}
            </div>
            <div className="row col-sm-12 col-md-6 col-lg-6">
                <div className="container">
                    {page === 1 ?
                    !isEdit ?
                        (<>
                            <h5 className='p-3'>Shelf Life: <b>{editValues.shifelife}</b></h5>
                            <h5 className='p-3'>Durée de Shelf Life: <b>{editValues.shife_time}</b></h5>
                            <h5 className='p-3'>Fiche Technique: <div name = "fiche_tech" onClick={handleDownload}><b>{editValues.fiche_technique.slice(13)}</b></div></h5>
                            <h5 className='p-3'>FDS: <div name="fds" onClick={handleDownload}><b>{editValues.fds.slice(13)}</b></div></h5>
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
                                <h5 className='p-3'>Durée de Shelf Life: </h5>
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
                                    value={(editValues.fiche_technique).slice(13)}
                                    name='fiche_tech'
                                    variant="filled"
                                    onChange={handleChange}
                                />
                                 <input type="file" id="file" onChange={(e) => handleUploadFile(e)}/>

                            </div>
                            <div className='d-flex justify-content-start'>
                                <h5 className='p-3'>FDS: </h5>
                                <TextField
                                    hiddenLabel
                                    className="col-12 col-sm-6 col-md-4 col-lg-4"
                                    id="filled-hidden-label-normal"
                                    value={editValues.fds.slice(13)}
                                    name='fds'
                                    variant="filled"
                                />
                                                                 <input type="file" id="file" onChange={(e) => handleUploadFile(e)}/>

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
                                        type='date'
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