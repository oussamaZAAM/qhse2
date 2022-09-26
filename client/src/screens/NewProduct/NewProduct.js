import React, { useContext, useEffect, useState } from 'react';
import "./NewProduct.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, MenuItem, Pagination } from '@mui/material';
import { AiFillCamera,AiOutlineCloudUpload } from 'react-icons/ai'
import { FaCheckCircle,FaTimes } from 'react-icons/fa'
import { AuthContext } from "../../Context/authContext";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom"

export default function NewProduct() {
    const navigate = useNavigate();
    const [picture, setPicture] = useState([]);
    const [imagePage, setImagePage] = useState(1);
    const [newEtiquetteName, setNewEtiquetteName] = useState('');
    const [newEtiquettes, setNewEtiquettes] = useState([]);
    const [newEtiquettesData, setNewEtiquettesData] = useState({});
    const [other, setOther] = useState(false);
    const { org } = useContext(AuthContext);
    const [zones, setZones] = useState();
    const [batiments, setBatiments] = useState();

  const [product, setProduct] = useState({
    name: "",
    shifelife: "",
    shife_time: "",
    fiche_technique: "",
    fds: "",
    photos: "",
    emballage: "",
    grammage: "",
    type_client: "",
    creation_date: "",
    agrement: "",
    autorisation: "",
    site: "",
    org: org.name,
    energie: "",
    proteine: "",
    carbs: "",
    lipide: "",
  });
  const handleChange = (event) => {
    if(event.target.name==="type_client" && event.target.value==="Autre"){
        setOther(true);
    }   
    setProduct({...product, [event.target.name]: event.target.value});
  };
  const submitProduct = async () => {
    const newProduct = {
        name: product.name,
        shifelife: product.shifelife,
        shife_time: product.shife_time,
        fiche_technique: product.fiche_technique,
        fds: product.fds,
        photos: product.photos,
        emballage: product.emballage,
        grammage: product.grammage,
        type_client: product.type_client,
        creation_date: product.creation_date,
        agrement: product.agrement,
        autorisation: product.autorisation,
        site: product.site,
        organism: org._id,
        energie: product.energie,
        proteine: product.proteine,
        carbs: product.carbs,
        lipide: product.lipide,
        userEtiquettes: newEtiquettesData,
    }
    try{
        await axios.post("http://localhost:5000/api/product/create", newProduct)
    } catch(err){
        console.log(err)
    }
    navigate("/products");

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
        setProduct({...product, photos: [...picture, fileName]});
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
                setProduct({...product, fiche_technique: fileName});
                break;
            case "fds":
                setProduct({...product, fds: fileName});
        }
        
    }
    function handleImagePage(event, value) {
        setImagePage(value);
    }
    function deleteImage(imageId) {
        setPicture(prev=>prev.filter(picture=>prev.indexOf(picture)!==imageId))
        setImagePage(prev=>{
            if (prev!==1){
                return prev-1;
            } else {
                return prev;
            }
        });
    }
    function handleChangeEtiquette(e) {
        setNewEtiquetteName(e.target.value)
    }
    function handleAddEtiquette(e) {
        setNewEtiquettes([...newEtiquettes, newEtiquetteName])
        setNewEtiquettesData({...newEtiquettesData, [newEtiquetteName]: ''})
        setNewEtiquetteName('')
    }
    function handleNewEtiquettes(e) {
        setNewEtiquettesData({...newEtiquettesData, [e.target.name]: e.target.value})
    }
    const selectZones = zones && zones.map(zone => <MenuItem value={zone.code}>{zone.code+" (zone)"}</MenuItem>);
    const selectBatiments = batiments && batiments.map(batiment => <MenuItem value={batiment.code}>{batiment.code+" (bâtiment)"}</MenuItem>);
    const newEtiquettesText = newEtiquettes.map(x=>{
        return (
            <TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4"
                id="outlined-name"
                label={x}
                value={product.x}
                name={x}
                onChange={handleNewEtiquettes}
            />
        )
    })

    useEffect(()=>{
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
    }, [])
    const allSites = selectZones && selectBatiments && selectZones.concat(selectBatiments)
  return (
    <main className="container">
        <div className="row text-center"><h1 className='text-center'>Nouveau Produit</h1></div>
        <div className='d-flex flex-column align-items-center'>
            <Box
                className='row d-flex justify-content-center'
                style={{maxWidth: '50%'}}
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
            <TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4"
                id="outlined-name"
                label="Name"
                value={product.name}
                name='name'
                onChange={handleChange}
            />
            <TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4"
                id="outlined-name"
                label="Shelf Life"
                value={product.shifelife}
                name='shifelife'
                onChange={handleChange}
            />
            <TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4"
                id="outlined-name"
                label="Duree Shelf Life"
                value={product.shife_time}
                name='shife_time'
                onChange={handleChange}
            />
            <div className='d-flex justify-content-start align-items-start col-12 col-sm-6 col-md-4 col-lg-4'>
                <TextField
                    className="col-12"
                    id="outlined-name"
                    label="Fiche Technique"
                    value={product.fiche_technique.slice(13)}
                    name='fiche_tech'
                />
                <label className="p-3" variant="contained" component="label" for="fiche_tech">
                    <AiOutlineCloudUpload style={{cursor: 'pointer'}} size={20}/> <input hidden type="file" id="fiche_tech" onChange={(e) => handleUploadFile(e)}/>
                </label>
            </div>
            <div className='d-flex justify-content-start align-items-start col-12 col-sm-6 col-md-4 col-lg-4'>
                <TextField
                    className="col-12"
                    id="outlined-name"
                    label="FDS"
                    value={product.fds.slice(13)}
                    name='fds'
                />
                <label className="p-3" variant="contained" component="label" for="fds">
                    <AiOutlineCloudUpload style={{cursor: 'pointer'}} size={20}/> <input hidden type="file" id="fds" onChange={(e) => handleUploadFile(e)}/>
                </label>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4 d-flex justify-content-center" >
                {picture.length!==0 && 
                (<div className="d-flex flex-column align-items-center">
                    <div className="image-wrap">
                        <img className="col-9" id="outlined-name" src={"http://localhost:5000/images/"+picture[imagePage-1]} name="photos" />
                        <FaTimes className='close' onClick={()=>deleteImage(imagePage-1)} />
                    </div>
                    {picture.length!==1 && <Pagination count={picture.length} page={imagePage} size="small" onChange={handleImagePage}/>}
                </div>
                )}
                <Button className="col-4" variant="contained" component="label">
                    <AiFillCamera />
                    <input hidden accept="image/*" multiple type="file" onChange={(e) => handleUpload(e)}/>
                </Button>
            </div>
            <TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4"
                id="outlined-name"
                label="Emballage"
                value={product.emballage}
                name='emballage'
                onChange={handleChange}
            />
            <TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4"
                id="outlined-name"
                label="Grammage"
                value={product.grammage}
                name='grammage'
                onChange={handleChange}
            />
            
            {other?
            <TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4"
                id="outlined-name"
                label="Type de Client"
                value={product.type_client}
                name='type_client'
                onChange={handleChange}
            />
            :<select name= "type_client" className="form-select col-12 col-sm-6 col-md-4 col-lg-4" aria-label="Default select example" id="outlined-name" onChange={handleChange}>
                <option selected>Type de client</option>
                <option value="Tous">Tous</option>
                <option value="Enfants">Enfants</option>
                <option value="Adultes">Adultes</option>
                <option value="Industries">Industries</option>
                <option value="Autre">Autre..</option>
            </select>
            }
            <TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4"
                id="outlined-name"
                type='date'
                label="Date de création"
                value={product.creation_date}
                name='creation_date'
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4"
                id="outlined-textarea"
                label="Agrément Sanitaire"
                value={product.agrement}
                name='agrement'
                onChange={handleChange}
                multiline
            />
            <TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4"
                id="outlined-textarea"
                label="Autorisation Sanitaire"
                value={product.autorisation}
                name='autorisation'
                onChange={handleChange}
                multiline
            />
            <TextField 
                className="form-control m-2"
                id="outlined-textarea"
                label="Zone"
                variant="outlined"
                select
                value={product.site}
                name='site'
                onChange={handleChange}
            >   
                <MenuItem selected>Choisir une Zone / Bâtiment</MenuItem>
                {allSites}
            </TextField>
            <TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4"
                id="outlined-name"
                label="Organisme"
                value={org.name}
                name='org'
                InputLabelProps={{ shrink: true }}
                disabled={true}
            />
            </Box>
            <hr/>
            <div className='text-center col-12 col-sm-6 col-md-4 col-lg-4'>Etiquettes</div>
            <Box
                className='row d-flex justify-content-center'
                style={{maxWidth: '50%'}}
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
            {product.energie==="" || Number.isInteger(+product.energie)!==false ?
            (<TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4"
                id="outlined-name"
                label="Valeur Energetique"
                value={product.energie}
                name='energie'
                onChange={handleChange}
            />)
            : (<TextField
                error
                id="outlined-error-helper-text"
                label="Error"
                value={product.energie}
                name='energie'
                helperText="Entrer des entiers."
                onChange={handleChange}
                />)}
            {product.proteine==="" || Number.isInteger(+product.proteine)!==false ?
            (<TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4"
                id="outlined-name"
                label="Proteines"
                value={product.proteine}
                name='proteine'
                onChange={handleChange}
            />)
            : (<TextField
                error
                id="outlined-error-helper-text"
                label="Error"
                value={product.proteine}
                name='proteine'
                helperText="Entrer des entiers."
                onChange={handleChange}
            />)}
            {product.carbs==="" || Number.isInteger(+product.carbs)!==false ?
            (<TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4"
                id="outlined-name"
                label="Carbohydrates"
                value={product.carbs}
                name='carbs'
                onChange={handleChange}
            />)
            : (<TextField
                error
                id="outlined-error-helper-text"
                label="Error"
                value={product.carbs}
                name='carbs'
                helperText="Entrer des entiers."
                onChange={handleChange}
                />)}
            {product.lipide==="" || Number.isInteger(+product.lipide)!==false ?
            (<TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4"
                id="outlined-name"
                label="Lipides"
                value={product.lipide}
                name='lipide'
                onChange={handleChange}
            />)
            : (<TextField
                error
                id="outlined-error-helper-text"
                label="Error"
                value={product.lipide}
                name='lipide'
                helperText="Entrer des entiers."
                onChange={handleChange}
                />)}
            {/* {product.calcium==="" || Number.isInteger(+product.calcium)!==false ?
            (<TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4"
                id="outlined-name"
                label="Calcium"
                value={product.calcium}
                name='calcium'
                onChange={handleChange}
            />)
            : (<TextField
                error
                id="outlined-error-helper-text"
                label="Error"
                value={product.calcium}
                name='calcium'
                helperText="Entrer des entiers."
                onChange={handleChange}
                />)} */}
            <div className='d-flex w-100 justify-content-center align-items-center'>
                <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    placeholder='Nouvelle Etiquette'
                    value={newEtiquetteName}
                    variant="filled"
                    size="small"
                    onChange={handleChangeEtiquette}
                />
                <FaCheckCircle style={{cursor: 'pointer'}} className="mx-3" size={30} onClick={handleAddEtiquette}/>
            </div>
            {newEtiquettesText}
            </Box>
            <Button className="m-3" variant="outlined" onClick={submitProduct}>Enregistrer</Button>
        </div>
    </main>
  );
}