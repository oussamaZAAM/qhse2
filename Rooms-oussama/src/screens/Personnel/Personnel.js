import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Personnel.css';

import { BsUpload } from 'react-icons/bs'
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';

const Personnel = (props) => {
  const [personnel, setPersonnel] = useState()
  const [editValues, setEditValues] = useState()
  const [picture, setPicture] = useState('');

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }
  function handleChange(e) {
    setEditValues({...editValues, [e.target.name]: e.target.value})
  }
  const editPersonnel = async() => {
    const updatedPersonnel = {...editValues, photo: picture}
    try {
        await axios.put("http://localhost:5000/api/personnel/"+props.personId, updatedPersonnel)
    } catch (err) {
        window.alert("Erreur")
    }
  }
  const deletePersonnel = async() => {

  }
  const handleUpload = async (e) => {
    const pic=e.target.files[0];
    const data = new FormData();
    const fileName = Date.now() + pic.name;
    data.append("name", fileName);
    data.append("file", pic);
    try {
        await axios.post("http://localhost:5000/api/upload/image", data);
    } catch (err) {}
    setPicture(fileName)
  }
  useEffect(()=>{
    const fetchPersons = async() => {
        try {
            const res = await axios.get("http://localhost:5000/api/personnel/"+props.personId);
            setPersonnel(res.data);
            setEditValues(res.data);
            setPicture(res.data.photo);
        } catch (err) {
            console.log(err)
        }
    }
    fetchPersons();
  },[])
  return editValues!==undefined && (
    <main>
        <div className="container d-flex flex-column justify-content-center align-items-center">
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                    <label>
                        <BsUpload className='profile-upload' size={30} onClick={(e)=>handleUpload(e)} />
                        <input hidden accept="image/*" type="file" onChange={(e) => handleUpload(e)}/>
                    </label>
                }
            >
                <Avatar sx={{width: '150px', height: '150px'}} className="profile-photo" src={"http://localhost:5000/images/"+picture} />
            </Badge>
            <div className='row d-flex justify-content-center align-items-center'>
                <TextField 
                    className='col-11 col-sm-10 col-md-5 col-lg-3 m-2'
                    value={editValues.nom}
                    label="Nom"
                    name='nom'
                    onChange={handleChange}
                />
                <TextField 
                    className='col-11 col-sm-10 col-md-5 col-lg-3 m-2'
                    value={editValues.prenom}
                    label="Prénom"
                    name='prenom'
                    onChange={handleChange}
                />
                <TextField 
                    className='col-11 col-sm-10 col-md-5 col-lg-3 m-2'
                    value={formatDate(editValues.naissance)}
                    type='date'
                    label="Date de Naissance"
                    name='naissance'
                    onChange={handleChange}
                />
                <TextField 
                    className='col-11 col-sm-10 col-md-5 col-lg-3 m-2'
                    value={editValues.cin}
                    label="CIN"
                    name='cin'
                    onChange={handleChange}
                />
                <TextField 
                    className='col-11 col-sm-10 col-md-5 col-lg-3 m-2'
                    value={editValues.metier}
                    label="Métier"
                    name='metier'
                    onChange={handleChange}
                />
                <TextField 
                    className='col-11 col-sm-10 col-md-5 col-lg-3 m-2'
                    value={editValues.zone_affecte}
                    label="Zone affecté"
                    name='zone_affecte'
                    onChange={handleChange}
                />
            </div>
            <div className='d-flex justify-content-center align-items-center m-3'>
                <Button className='text-primary m-2' onClick={editPersonnel} >Modifier</Button>
                <Button className='text-danger m-2' onClick={deletePersonnel} >Supprimer</Button>
            </div>
        </div>
    </main>
  )
}

export default Personnel