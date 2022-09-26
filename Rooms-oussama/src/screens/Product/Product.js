import { MenuItem, Pagination, TextField } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../Context/authContext";
import "./Product.css";
import { AiFillCamera, AiOutlineCloudUpload,AiFillCaretDown,AiFillCaretUp } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import AnimatedPage from '../AnimatedPage';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Product = (props) => {
    const [product, setProduct] = useState();
    const [orgProducts, setOrgProducts] = useState();
    const [productOrganism, setProductOrganism] = useState();
    const [imagePage, setImagePage] = useState(1);
    const [picture, setPicture] = useState('');
    const [isEdit, setIsEdit] = useState(props.isEdit==="isEdit");
    const { org } = useContext(AuthContext)
    const [error404, setError404] = useState(false); 
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
        org:"",
        energie:"",
        proteine:"",
        carbs:"",
        lipide:"",
        editCount: 0,
    })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [zones, setZones] = useState();
    const [batiments, setBatiments] = useState();

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
        setLoading(true);
        setEditValues({...editValues, editCount: editValues.editCount+1})
        try{
            await axios.put("http://localhost:5000/api/product/" + props.productId, {...editValues, editCount: editValues.editCount+1})
        } catch(err){
            console.log(err);
        }
        setIsEdit(false)
        setLoading(false);
        setProduct({...editValues, editCount: editValues.editCount+1})
    }
    const handleCancel = async() =>{
        setEditValues(product);
        setIsEdit(false);
    }
    const handleDelete= async (e)=>{
        setLoading(true);
        e.preventDefault();
        try{
            await axios.delete("http://localhost:5000/api/product/" + props.productId);
            navigate("/products")
        }catch(err){
            console.log(err)      
        }
        setLoading(false);
    }
    const handleUpload = async (e) => {
        setLoading(true);
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
        setEditValues({...editValues, photos: [...picture,fileName]});
        setLoading(false);
    }
    const handleDownload= async (e) => {
        switch(e.target.id){
            case "fiche_tech":
                await axios.get("http://localhost:5000/api/download/"+editValues.fiche_technique);
                break
            case "fds":
                await axios.get("http://localhost:5000/api/download/"+editValues.fds);
        }
        
    }
    const handleUploadFile = async (e) => {
        setLoading(true);
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
        setLoading(false);
        
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
        navigate("/product/"+ previousProductId);
    }
    function navigateRight() {
        const nextProductId = orgProducts && orgProducts[thisProductIndex+1]._id
        navigate("/product/"+ nextProductId);
    }
    
    useEffect(() => {
        const fetchProducts = async() => {
            const res = await axios.get("http://localhost:5000/api/product/"+props.productId);
            setProduct(res.data);
            if (res.data !== null) {
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
                    org: res.data.organism,
                    energie:res.data.energie,
                    proteine:res.data.proteine,
                    carbs:res.data.carbs,
                    lipide:res.data.lipide,
                    userEtiquettes:res.data.userEtiquettes,
                    editCount:res.data.editCount,
                })
                setPicture(res.data.photos)
            } else {
                setError404(true);
            }
        }
        fetchProducts();
        const fetchOrgProducts = async() => {
            const res = await axios.get("http://localhost:5000/api/product/a/"+org._id);
            setOrgProducts(res.data);
        }
        fetchOrgProducts();
        const fetchMyOrg = async() => {
            const res = await axios.get("http://localhost:5000/api/organism/"+org._id);
            setProductOrganism(res.data)
        }
        fetchMyOrg();
        const fetchZones = async() => {
            const res = await axios.get("http://localhost:5000/api/zone/z/" + org._id);
            setZones(res.data);
        }
        fetchZones();
        const fetchBatiments = async() => {
            const res = await axios.get("http://localhost:5000/api/zone/b/" + org._id);
            setBatiments(res.data);
        }
        fetchBatiments();
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
  const selectZones = zones && zones.map(zone => <MenuItem value={zone.code}>{zone.code+" (zone)"}</MenuItem>);
  const selectBatiments = batiments && batiments.map(batiment => <MenuItem value={batiment.code}>{batiment.code+" (bâtiment)"}</MenuItem>);
  const allSites = selectZones && selectBatiments && selectZones.concat(selectBatiments)
 
  const thisProductIndex = orgProducts && orgProducts.findIndex(x=> x._id === props.productId)
  return (
    !error404
    ? product && 
    <AnimatedPage>
    <div className="container">
        
        <p className="text-center">Numéro du produit : {thisProductIndex+1}</p>
        <div className="row">
            <Box sx={{ height: 40 }}>
                <Fade
                className="loading"
                in={loading}
                style={{
                    transitionDelay: loading ? '800ms' : '0ms',
                }}
                unmountOnExit
                >
                    <CircularProgress />
                </Fade>
            </Box>
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
                            <h5 className='p-3'>Shelf Life: <b>{editValues.shifelife}</b></h5>
                            <h5 className='p-3'>Durée de Shelf Life: <b>{editValues.shife_time}</b></h5>
                            <h5 className='p-3'>Fiche Technique: <b id = "fiche_tech" onClick={handleDownload}>{editValues.fiche_technique.slice(13)}</b></h5>
                            <h5 className='p-3'>FDS: <b id="fds" onClick={handleDownload}>{editValues.fds.slice(13)}</b></h5>
                            <h5 className='p-3'>Emballage: <b>{editValues.emballage}</b></h5>
                            <h5 className='p-3'>Grammage: <b>{editValues.grammage}</b></h5>
                            <h5 className='p-3'>Type de client: <b>{editValues.type_client}</b></h5>
                            <h5 className='p-3'>Date de création: <b>{editValues.creation_date}</b></h5>
                            <h5 className='p-3'>Agrément Sanitaire: <b>{editValues.agrement}</b></h5>
                            <h5 className='p-3'>Autorisation Sanitaire: <b>{editValues.autorisation}</b></h5>
                            <h5 className='p-3'>Site de production: <b>{editValues.site}</b></h5>
                            <h5 className='p-3'>Organisme: <b>{productOrganism && productOrganism.name}</b></h5>
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
                                {/* <TextField
                                    hiddenLabel
                                    className="col-12 col-sm-6 col-md-4 col-lg-4"
                                    id="filled-hidden-label-normal"
                                    value={editValues.site}
                                    name='site'
                                    variant="filled"
                                    onChange={handleChange}
                                /> */}
                                <TextField 
                                    className="col-12 col-sm-6 col-md-4 col-lg-4"
                                    id="filled-hidden-label-normal"
                                    label="Zone"
                                    variant="filled"
                                    select
                                    value={editValues.site}
                                    name='site'
                                    onChange={handleChange}
                                >   
                                    {allSites}
                                </TextField>
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
        :(<div className="d-flex justify-content-center align-items-center">
            <Button className='btn-warning m-2' onClick={handleCancel}>Annuler</Button>
            <Button className='btn-primary m-2' onClick={handleEdit}>Enregistrer</Button>
        </div>)}
    </div>
    </AnimatedPage>
    : <div className="text-center d-flex flex-column justify-content-center align-items-center">
        <h3 className="m-3">Le produit est supprimé ou n'existe pas !</h3>
        <img src='https://i.ibb.co/G3V62Xt/image-2022-08-21-210432788.png' className='m-5 image404' />
    </div>
  )
}

export default Product