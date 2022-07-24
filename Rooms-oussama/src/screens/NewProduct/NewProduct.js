import React, { useState } from 'react';
import "./NewProduct.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { AiFillCamera } from 'react-icons/ai'
import axios from 'axios';

export default function NewProduct() {
  const [product, setProduct] = useState({
    name: "",
    shifelife: "",
    time_shife: "",
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
    org: "",
    energie: "",
    energie: "",
    carbs: "",
    lipide: "",
    calcium: "",
  });
  const handleChange = (event) => {
    setProduct({...product, [event.target.name]: event.target.value});
  };
  const submitProduct = async () => {
    try{
        await axios.post("http://localhost:5000/api/product/create", product)
    } catch(err){
        console.log(err)
    }
  }
  return (
    <main className="container">
        <div className="row text-center"><h1 className='text-center'>New Product</h1></div>
        <div className='d-flex flex-column align-items-center'>
            <Box
                className='row d-flex'
                style={{maxWidth: '50%'}}
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
            <TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4"
                id="outlined-name"
                label="Name"
                value={product.name}
                name='name'
                onChange={handleChange}
            />
            <TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4"
                id="outlined-name"
                label="Shife Life"
                value={product.shifelife}
                name='shifelife'
                onChange={handleChange}
            />
            <TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4"
                id="outlined-name"
                label="Duree Shife Life"
                value={product.time_shife}
                name='time_shife'
                onChange={handleChange}
            />
            <TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4"
                id="outlined-name"
                label="Fiche Technique"
                value={product.fiche_technique}
                name='fiche_technique'
                onChange={handleChange}
            />
            <TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4"
                id="outlined-name"
                label="FDS"
                value={product.fds}
                name='fds'
                onChange={handleChange}
            />
            <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 d-flex justify-content-center" >
            <TextField
                className="col-7 m-0"
                id="outlined-name"
                label="Photos"
                value={product.photos}
                name='photos'
                onChange={handleChange}
            />
            <Button className="col-4" variant="contained" component="label">
                <AiFillCamera />
                <input hidden accept="image/*" multiple type="file" />
            </Button>
            </div>
            <TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4"
                id="outlined-name"
                label="Emballage"
                value={product.emballage}
                name='emballage'
                onChange={handleChange}
            />
            <TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4"
                id="outlined-name"
                label="Grammage"
                value={product.grammage}
                name='grammage'
                onChange={handleChange}
            />
            <TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4"
                id="outlined-name"
                label="Type de Client"
                value={product.type_client}
                name='type_client'
                onChange={handleChange}
            />
            <TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4"
                id="outlined-name"
                label="Date de creation"
                value={product.creation_date}
                name='creation_date'
                onChange={handleChange}
            />
            <TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4"
                id="outlined-textarea"
                label="Agrement Sanitaire"
                value={product.agrement}
                name='agrement'
                onChange={handleChange}
                multiline
            />
            <TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4"
                id="outlined-textarea"
                label="Autorisation Sanitaire"
                value={product.autorisation}
                name='autorisation'
                onChange={handleChange}
                multiline
            />
            <TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4"
                id="outlined-name"
                label="Site de production"
                value={product.site}
                name='site'
                onChange={handleChange}
            />
            <TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4"
                id="outlined-name"
                label="Organism"
                value={product.org}
                name='org'
                onChange={handleChange}
            />
            </Box>
            <hr/>
            <label>Etiquettes</label>
            <Box
                className='row d-flex'
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
                className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4"
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
                className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4"
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
                className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4"
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
                className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4"
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
            {product.calcium==="" || Number.isInteger(+product.calcium)!==false ?
            (<TextField
                className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4"
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
                />)}
            </Box>
            <Button className="m-3" variant="outlined" onClick={submitProduct}>Enregistrer</Button>
        </div>
    </main>
  );
}