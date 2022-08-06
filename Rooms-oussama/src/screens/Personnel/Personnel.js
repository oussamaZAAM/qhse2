import { Alert, Button, Snackbar, TextField } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import './Personnel.css';

import { BsUpload } from 'react-icons/bs'
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/authContext';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { AiFillCaretUp } from 'react-icons/ai';

const Personnel = (props) => {
  const [allPersonnel, setAllPersonnel] = useState()
  const [editValues, setEditValues] = useState()
  const [picture, setPicture] = useState('');
  const [openAlert, setOpenAlert] = useState([false, false]);
  
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert([false, false]);
  };

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
      delete editValues.photo;
      if (Object.keys(editValues).every(x=>editValues[x] !== '')){
        const updatedPersonnel = {...editValues, photo: picture};
        try {
            await axios.put("http://localhost:5000/api/personnel/"+props.personId, updatedPersonnel)
        } catch (err) {
            window.alert("Erreur")
        }
        setOpenAlert([true, false])
    } else {
        setOpenAlert([false, true])
    }
  }
  const deletePersonnel = async() => {
    try {
        await axios.delete("http://localhost:5000/api/personnel/" + props.personId)
    } catch (err) {
        window.alert("Erreur")
    }
    navigate("../personnel")
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

  const thisProductIndex = allPersonnel && allPersonnel.findIndex(x=> x._id === props.personId);
  function navigateLeft() {
        const previousProductId = allPersonnel && allPersonnel[thisProductIndex-1]._id
        navigate("/personnel/"+ previousProductId);
  }
  function navigateRight() {
        const nextProductId = allPersonnel && allPersonnel[thisProductIndex+1]._id
        navigate("/personnel/"+ nextProductId);
  }
  useEffect(()=>{
    const fetchAllPersons = async() => {
        try {
            const res = await axios.get("http://localhost:5000/api/personnel/a/"+user._id);
            setAllPersonnel(res.data);
        } catch (err) {
            console.log(err)
        }
    }
    fetchAllPersons();
    const fetchPersons = async() => {
        try {
            const res = await axios.get("http://localhost:5000/api/personnel/"+props.personId);
            setEditValues(res.data);
            setPicture(res.data.photo);
        } catch (err) {
            console.log(err)
        }
    }
    fetchPersons();
  },[user._id, props.personId])
  return editValues!==undefined && (
    <main>
        <div className="container p-3 d-flex justify-content-between">
            <Button href="../personnel" className='col-4'><AiFillCaretUp />Liste des Personnels</Button>
            <h3 className="text-center col-2"></h3>
        </div>
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
            <div>Numéro de Personnel : {thisProductIndex+1}</div>
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
            <div className="d-flex justify-content-around align-items-center">
                {thisProductIndex !==0 ? <FaArrowCircleLeft className='pointer' size={20} onClick={navigateLeft}/> : <FaArrowCircleLeft color='gray' size={20} />}
                <div className='d-flex justify-content-center align-items-center m-3'>
                    <Button className='text-primary m-2' onClick={editPersonnel} >Modifier</Button>
                    <Button className='text-danger m-2' onClick={deletePersonnel} >Supprimer</Button>
                </div>
                {allPersonnel && thisProductIndex !== allPersonnel.length-1 ? <FaArrowCircleRight className='pointer' size={20} onClick={navigateRight}/> : <FaArrowCircleRight color='gray' size={20} />}
            </div>
            {openAlert[0] && 
                <Snackbar sx={{width: '35%'}} open={true} autoHideDuration={2000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    Modification Validée
                </Alert>
                </Snackbar>
            }
            {openAlert[1] && 
                <Snackbar sx={{width: '35%'}} open={true} autoHideDuration={3000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="warning" sx={{ width: '100%' }}>
                    Veuillez Entrer les champs nécessaire!
                </Alert>
                </Snackbar>
            }
        </div>
    </main>
  )
}

export default Personnel