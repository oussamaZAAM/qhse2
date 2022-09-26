import { Alert, Button, Skeleton, Snackbar, TextField } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import './Personnel.css';

import { BsUpload } from 'react-icons/bs'
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/authContext';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { AiFillCaretUp } from 'react-icons/ai';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Personnel = (props) => {
  const [allPersonnel, setAllPersonnel] = useState()
  const [picture, setPicture] = useState([]);
  const [openAlert, setOpenAlert] = useState([false, false]);
  const [loading, setLoading] = useState(false);
  const [affectedZones, setAffectedZones] = useState([]);
  
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
    setAllPersonnel(prev=>{
        const newPrev = [];
        for (let i = 0; i < prev.length; i++){
            if(i === thisProductIndex){
                newPrev.push({...allPersonnel[i], [e.target.name]: e.target.value})
            } else {
                newPrev.push(prev[i])
            }
        }
        return newPrev;
    })
  }
  const editPersonnel = async() => {
    setLoading(true);
    const editValues = allPersonnel[thisProductIndex];
    delete editValues.photo;
    if (Object.keys(editValues).every(x=>editValues[x] !== '')){
        const updatedPersonnel = {...editValues, photo: picture[thisProductIndex]};
        try {
            await axios.put("http://localhost:5000/api/personnel/"+props.personId, updatedPersonnel)
        } catch (err) {
            window.alert("Erreur")
        }
        setOpenAlert([true, false])
    } else {
        setOpenAlert([false, true])
    }
    setLoading(false);
  }
  const deletePersonnel = async() => {
    setLoading(true);
    try {
        await axios.delete("http://localhost:5000/api/personnel/" + props.personId)
    } catch (err) {
        window.alert("Erreur")
    }
    navigate("../personnel")
    setLoading(false);
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
    setPicture(prev=>{
        const newPrev = [];
        for (let i = 0; i < prev.length; i++) {
            if (i === thisProductIndex) {
                newPrev.push(fileName);
            } else {
                newPrev.push(prev[i]);
            }
        }
        return newPrev;
    })
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
            const allPhotos = [];
            res.data.forEach(x=>allPhotos.push(x.photo))
            setPicture(allPhotos);
        } catch (err) {
            console.log(err)
        }
    }
    fetchAllPersons();
    const fetchAffectedZones = async() => {
        const res = await axios.get("http://localhost:5000/api/zone/includes/" + allPersonnel[thisProductIndex]._id);
        setAffectedZones(res.data);
    }
    allPersonnel && fetchAffectedZones();
  },[user._id, thisProductIndex]);
  const zoneCodes = affectedZones.length!==0 ? affectedZones.map(zone => <Link className='link m-1' to={'/zones/'+zone._id}>{zone.code}</Link>): "Pas affecté !"
  return (
    <main>
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
        <div className="container p-3 d-flex justify-content-between">
            <Button href="../personnel" className='col-4'><AiFillCaretUp />Liste des Personnels</Button>
            <h3 className="text-center col-2"></h3>
        </div>
        <div className="container d-flex flex-column justify-content-center align-items-center">
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={allPersonnel && 
                    (<label>
                        <BsUpload className='profile-upload' size={30} onClick={(e)=>handleUpload(e)} />
                        <input hidden accept="image/*" type="file" onChange={(e) => handleUpload(e)}/>
                    </label>)
                }
            >
                {allPersonnel 
                    // ? <Avatar sx={{width: '150px', height: '150px'}} className="profile-photo" src={"http://localhost:5000/images/"+picture[thisProductIndex]} />
                    ? <div className="thumbnail">
                        <Avatar sx={{width: '150px', height: '150px'}} className="profile-photo" src={"http://localhost:5000/images/"+picture[thisProductIndex]} />
                        <span>
                            <img src={"http://localhost:5000/images/"+picture[thisProductIndex]} />
                            <br />
                            {allPersonnel[thisProductIndex].nom + ' ' + allPersonnel[thisProductIndex].prenom}
                        </span>
                    </div>
                    : <Skeleton animation='wave' variant="circular" sx={{width: '150px', height: '150px'}} />
                }
            </Badge>
            <div>Numéro de Personnel : {thisProductIndex+1}</div>
            <div className='row d-flex justify-content-center align-items-center'>
                {allPersonnel
                    ?  <TextField 
                        className='col-11 col-sm-10 col-md-5 col-lg-3 m-2'
                        value={allPersonnel[thisProductIndex].nom}
                        label="Nom"
                        name='nom'
                        onChange={handleChange}
                    />
                    : <Skeleton className='col-11 col-sm-10 col-md-5 col-lg-3 m-2' animation="wave" height={50} />
                }
                {allPersonnel
                ? <TextField 
                    className='col-11 col-sm-10 col-md-5 col-lg-3 m-2'
                    value={allPersonnel[thisProductIndex].prenom}
                    label="Prénom"
                    name='prenom'
                    onChange={handleChange}
                />
                : <Skeleton className='col-11 col-sm-10 col-md-5 col-lg-3 m-2' animation="wave" height={50} />}
                {allPersonnel
                ? <TextField 
                    className='col-11 col-sm-10 col-md-5 col-lg-3 m-2'
                    value={formatDate(allPersonnel[thisProductIndex].naissance)}
                    type='date'
                    label="Date de Naissance"
                    name='naissance'
                    onChange={handleChange}
                />
                : <Skeleton className='col-11 col-sm-10 col-md-5 col-lg-3 m-2' animation="wave" height={50} />}
                {allPersonnel
                ? <TextField 
                    className='col-11 col-sm-10 col-md-5 col-lg-3 m-2'
                    value={allPersonnel[thisProductIndex].cin}
                    label="CIN"
                    name='cin'
                    onChange={handleChange}
                />
                : <Skeleton className='col-11 col-sm-10 col-md-5 col-lg-3 m-2' animation="wave" height={50} />}
                {allPersonnel
                ? <TextField 
                    className='col-11 col-sm-10 col-md-5 col-lg-3 m-2'
                    value={allPersonnel[thisProductIndex].metier}
                    label="Métier"
                    name='metier'
                    onChange={handleChange}
                />
                : <Skeleton className='col-11 col-sm-10 col-md-5 col-lg-3 m-2' animation="wave" height={50} />}
                {allPersonnel
                ? <TextField 
                    className='col-11 col-sm-10 col-md-5 col-lg-3 m-2'
                    value={allPersonnel[thisProductIndex].zone}
                    readOnly={true}
                    label="Zone affecté"
                   
                />
                : <Skeleton className='col-11 col-sm-10 col-md-5 col-lg-3 m-2' animation="wave" height={50} />}
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