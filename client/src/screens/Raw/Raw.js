import { Pagination, TextField } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../Context/authContext";
import "./Raw.css";
import { AiFillCamera, AiOutlineCloudUpload,AiFillCaretDown,AiFillCaretUp } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import AnimatedPage from '../AnimatedPage';

const Product = (props) => {
    const [product, setProduct] = useState();
    const [orgProducts, setOrgProducts] = useState();
    const [productOrganism, setProductOrganism] = useState();
    const [imagePage, setImagePage] = useState(1);
    const [picture, setPicture] = useState('');
    const [isEdit, setIsEdit] = useState(props.isEdit==="isEdit");
    const { org } = useContext(AuthContext)
    const [editValues, setEditValues] = useState({
        name: "",
        photos: "",
        fiche_technique:"",
        fds:"",
        emballage:"",
        grammage:"",
        energie:"",
        proteine:"",
        carbs:"",
        lipide:"",
        editCount: 0,
    })
    const navigate = useNavigate();
    function handleImagePage(event, value) {
        setImagePage(value);
    }
    function enableEdit() {
        setIsEdit(true);
    }
    function handleChange(event) {
        setEditValues({...editValues, [event.target.name]: event.target.value})
    }
    function handleChangeUserEtiquettes(event) {
        setEditValues({...editValues, userEtiquettes: {...editValues.userEtiquettes, [event.target.name]: event.target.value}})
    }
    const handleEdit = async() => {
        setEditValues({...editValues, editCount: editValues.editCount+1})
        try{
            await axios.put("http://localhost:5000/api/raw/" + props.productId, {...editValues, editCount: editValues.editCount+1})
        } catch(err){
            console.log(err);
        }
        setIsEdit(false)
    }
    const handleDelete= async (e)=>{
        e.preventDefault();
        try{
            await axios.delete("http://localhost:5000/api/raw/" + props.productId);
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
        setProduct({...product, photos: [...picture,fileName]});
    }
    const handleDownload= async (e) => {
        
        switch(e.target.id){
            case "fiche_tech":
                await axios.get("http://localhost:5000/api/download/"+editValues.fiche_technique);
            case "fds":
                await axios.get("http://localhost:5000/api/download/"+editValues.fds);
        }
        
    }
    const handleProd= async () => {
        
        const res = await axios.get("http://localhost:5000/api/product/name/"+editValues.product);
        navigate("../../product/"+res.data._id)
        
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
        switch (e.target.id){
            case "fiche_tech":
                setEditValues({...product, fiche_technique: fileName});                break;
            case "fds":
                setEditValues({...product, fds: fileName});     
        }
        
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
    function navigateLeft() {
        const previousProductId = orgProducts && orgProducts[thisProductIndex-1]._id
        navigate("/raw/"+ previousProductId);
    }
    function navigateRight() {
        const previousProductId = orgProducts && orgProducts[thisProductIndex+1]._id
        navigate("/raw/"+ previousProductId);
    }
    
    useEffect(() => {
        const fetchProducts = async() => {
            const res = await axios.get("http://localhost:5000/api/raw/"+props.productId);
            setProduct(res.data);
            setEditValues({
                name: res.data.name,
                product: res.data.product,
                photos: res.data.photos,
                fiche_technique: res.data.fiche_technique,
                fds:res.data.fds,
                emballage:res.data.emballage,
                grammage:res.data.grammage,
                energie:res.data.energie,
                proteine:res.data.proteine,
                carbs:res.data.carbs,
                lipide:res.data.lipide,
                userEtiquettes:res.data.userEtiquettes,
                editCount:res.data.editCount,
            })
            setPicture(res.data.photos)
        }
        fetchProducts();
        const fetchOrgProducts = async() => {
            const res = await axios.get("http://localhost:5000/api/raw/a/"+org._id);
            setOrgProducts(res.data);
        }
        fetchOrgProducts();
        const fetchMyOrg = async() => {
            const res = await axios.get("http://localhost:5000/api/organism/"+org._id);
            setProductOrganism(res.data)
        }
        fetchMyOrg();
    },[props.productId])
    const mappedUserEtiquettes = editValues.userEtiquettes && Object.keys(editValues.userEtiquettes).map((key,value)=>{
        return (
            <h5 className='p-3'>{key}: <b>{editValues.userEtiquettes[key]}</b></h5>
        )
    })
    const mappedModifiedUserEtiquettes = editValues.userEtiquettes && Object.keys(editValues.userEtiquettes).map((key,value)=>{
        return (
            <div className='d-flex justify-content-start'>
                <h5 className='p-3'>{key}: </h5>
                <TextField
                    hiddenLabel
                    className="col-12 col-sm-6 col-md-4 col-lg-4"
                    id="filled-hidden-label-normal"
                    type="number"
                    value={editValues.userEtiquettes[key]}
                    name={key}
                    variant="filled"
                    onChange={handleChangeUserEtiquettes}
                />
            </div>
        )
    })
    const thisProductIndex = orgProducts && orgProducts.findIndex(x=> x._id === props.productId)
  return (
    product && 
    <AnimatedPage>
    <div className="container">
        
        <p className="text-center">Numéro du produit : {thisProductIndex+1}</p>
        <div className="row">
            <div className="col-sm-11 col-md-5 col-lg-5 text-center center-image d-flex flex-column">
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
            <div className="row col-sm-11 col-md-5 col-lg-5 d-flex align-items-center">
                <div className="container">
                    {!isEdit ?
                        (<div className="product-scroll">
                             <h5 className='p-3'>Produit: <b id = "produit" onClick={handleProd}>{editValues.product}</b></h5>
                             <h5 className='p-3'>Fiche Technique: <b id = "fiche_tech" onClick={handleDownload}>{editValues.fiche_technique.slice(13)}</b></h5>
                            <h5 className='p-3'>FDS: <b id="fds" onClick={handleDownload}>{editValues.fds.slice(13)}</b></h5>
                            <h5 className='p-3'>Emballage: <b>{editValues.emballage}</b></h5>
                            <h5 className='p-3'>Grammage: <b>{editValues.grammage}</b></h5>
                            <h4 className='text-center col-12 col-sm-6 col-md-4 col-lg-4 etiquettes'>Etiquettes</h4>
                            <h5 className='p-3'>Valeur Energétique: <b>{editValues.energie}</b></h5>
                            <h5 className='p-3'>Protéines: <b>{editValues.proteine}</b></h5>
                            <h5 className='p-3'>Carbohydrates: <b>{editValues.carbs}</b></h5>
                            <h5 className='p-3'>Lipides: <b>{editValues.lipide}</b></h5>
                            {mappedUserEtiquettes}
                        </div>)
                    :
                        (<div className="product-scroll">
                           <div className='d-flex justify-content-start'>
                                <h5 className='p-3'>Fiche Technique: </h5>
                                <TextField
                                    hiddenLabel
                                    className="col-12 col-sm-6 col-md-4 col-lg-4"
                                    id="filled-hidden-label-normal"
                                    value={(editValues.fds).slice(13)}
                                    name='fiche_tech'
                                    variant="filled"
                                    onChange={handleChange}
                                />
                                <TextField
                                    hiddenLabel
                                    className="col-12 col-sm-6 col-md-4 col-lg-4"
                                    id="filled-hidden-label-normal"
                                    value={(editValues.fiche_technique).slice(13)}
                                    name='fiche_tech'
                                    variant="filled"
                                    onChange={handleChange}
                                />
                                 <label className="p-3" variant="contained" component="label" for="fiche_tech">
                                                           <AiOutlineCloudUpload size={20}/> <input hidden type="file" id="fiche_tech" onChange={(e) => handleUploadFile(e)}/>
                                                           </label>

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
                                <label className="p-3" variant="contained" component="label" for="fds">
                                                           <AiOutlineCloudUpload size={20}/> <input hidden type="file" id="fds" onChange={(e) => handleUploadFile(e)}/>
                                                           </label>

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
                            {mappedModifiedUserEtiquettes}
                        </div>)}
                </div>
            </div>
        </div>
        {!isEdit?
        (<div className="container text-center products-btn d-flex justify-content-between align-items-center">
            {thisProductIndex !==0 ? <FaArrowCircleLeft className='pointer' size={20} onClick={navigateLeft}/> : <FaArrowCircleLeft color='gray' size={20} />}
            <div className="d-flex justify-content-center align-items-start">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <Button className='btn btn-primary m-2 w-50' onClick={enableEdit}>Modifier</Button>
                    <span>Compteur de modification : <b>{editValues.editCount}</b></span>
                </div>
                <Button className='btn btn-danger m-2' onClick={handleDelete}>Supprimer</Button>
            </div>
            {orgProducts && thisProductIndex !== orgProducts.length-1 ? <FaArrowCircleRight className='pointer' size={20} onClick={navigateRight}/> : <FaArrowCircleRight color='gray' size={20} />}
        </div>)
        :(<div className="container text-center products-btn">
            <Button className='btn btn-primary m-2 enregistrer' onClick={handleEdit}>Enregistrer</Button>
        </div>)}
    </div>
    </AnimatedPage>
  )
}

export default Product