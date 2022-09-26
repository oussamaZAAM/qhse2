import React, { useContext, useState, useEffect } from 'react';
import "./NewRaw.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Pagination } from '@mui/material';
import { AiFillCamera,AiOutlineCloudUpload } from 'react-icons/ai'
import { FaCheckCircle,FaTimes } from 'react-icons/fa'
import { AuthContext } from "../../Context/authContext";
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import { AiFillCaretDown,AiFillCaretUp } from 'react-icons/ai'

export default function NewRaw() {
    const navigate = useNavigate();
    const [picture, setPicture] = useState([]);
    const [imagePage, setImagePage] = useState(1);
    const [newEtiquetteName, setNewEtiquetteName] = useState('');
    const [newEtiquettes, setNewEtiquettes] = useState([]);
    const [newEtiquettesData, setNewEtiquettesData] = useState({});
    const [prods, setProds] = useState([]);
    const { user, org } = useContext(AuthContext);

  const [product, setProduct] = useState({
    name: "",
    product: "",
    fiche_technique: "",
    fds: "",
    photos: "",
    emballage: "",
    grammage: "",
    energie: "",
    proteine: "",
    carbs: "",
    lipide: "",
  });
  const handleChange = (event) => {   
    setProduct({...product, [event.target.name]: event.target.value});
  };

  const submitProduct = async () => {
    const newProduct = {
        name: product.name,
        product: product.product,
        fiche_technique: product.fiche_technique,
        fds: product.fds,
        photos: product.photos,
        emballage: product.emballage,
        grammage: product.grammage,
        energie: product.energie,
        proteine: product.proteine,
        carbs: product.carbs,
        lipide: product.lipide,
        userEtiquettes: newEtiquettesData,
    }
    try{
        await axios.post("http://localhost:5000/api/raw/create", newProduct);
        const res = await axios.get("http://localhost:5000/api/product/name/"+product.product);
        await axios.put("http://localhost:5000/api/product/"+res.data._id, {...res.data, raw:[...res.data.raw, product.name]});

    } catch(err){
        console.log(err)
    }
    navigate("/raw/"+product.name);

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
            <option value={x.name}>{x.name}</option>
           
        )
    })
    return (
    <main className="container">
        <div className="row text-center"><h1 className='text-center'>Ajouter Matière Propre</h1></div>
        
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
            <select name= "product" className="form-select col-12 col-sm-6 col-md-4 col-lg-4" aria-label="Default select example" id="outlined-name" onChange={handleChange}>
                <option selected>Produit</option>
                {products}
            </select>
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
           
            <div className='d-flex w-50 justify-content-between align-items-center'>
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