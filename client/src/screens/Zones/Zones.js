import React, { useContext, useEffect, useState } from 'react'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import "./Zones.css"
import {  Alert, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Skeleton, Snackbar, TextField } from '@mui/material';
import { BiUpload } from 'react-icons/bi';
import axios from 'axios';
import { AuthContext } from '../../Context/authContext';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import Zone from '../../components/Zone/Zone';
import { ObjectId } from 'bson';
import { Button } from 'react-bootstrap';
import Batiment from '../../components/Zone/Batiment';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Zones = () => {
    const [value, setValue] = useState(0);
    const { user, org } = useContext(AuthContext);
    const zoneId = ObjectId();
    const batimentId = ObjectId();
    const [zone, setZone] = useState({
        _id: zoneId.toString(),
        type: 'zone',
        code: '',
        ordre: '',
        superficie: '',
        responsable: '',
        equipe: [],
        flux: {
            mp: '',
            produit: '',
            personnel: '',
            eau_potable: '',
            eau_incendie: '',
            evacuation: '',
            courant: '',
            dechets: '',
            vapeur: '',
            air: ''
        },
        organism: org._id
    });
    const [batiment, setBatiment] = useState({
        _id: batimentId.toString(),
        type: 'batiment',
        libelle: '',
        code: '',
        ordre: '',
        superficie: '',
        nbr_niveau: '',
        responsable: '',
        equipe: [],
        atex: '',
        flux: {
            mp: '',
            produit: '',
            personnel: '',
            eau_potable: '',
            eau_incendie: '',
            evacuation: '',
            courant: '',
            dechets: '',
            vapeur: '',
            air: ''
        },
        organism: org._id
    });

    const [zones, setZones] = useState();
    const [batiments, setBatiments] = useState([]);
    const [persons, setPersons] = useState();
    const [persons1, setPersons1] = useState();
    const [openAlert, setOpenAlert] = useState([false, false]);
    const [loading, setLoading] = useState(false);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert([false, false]);
    };

    const handleUploadFile = async (e, type) => {
        setLoading(true);
        const pic=e.target.files[0];
        const data = new FormData();
        const fileName = Date.now() + pic.name;
        data.append("name", fileName);
        data.append("file", pic);
        try {
            await axios.post("http://localhost:5000/api/upload/file", data);
        } catch (err) {}
        if(type === 'zone') {
            setZone({...zone, flux: {...zone.flux, [e.target.id]: fileName}})
        } else {
            setBatiment({...batiment, flux: {...zone.flux, [e.target.id]: fileName}})
        }
        setLoading(false);
    }
    const handleChange = (event, type) => {
        if(type === 'zone') {
            setZone({...zone, [event.target.name]: event.target.value});
        } else {
            setBatiment({...batiment, [event.target.name]: event.target.value});
        }
    };
    const saveZone = async() => {
        setLoading(true);
        try {
            const id = ObjectId();
            if (Object.keys(zone).every(x=>zone[x] !== '' && zone[x].length !==0 )){
                setZone({...zone, _id: id.toString()})
                await axios.post("http://localhost:5000/api/zone/createZone", zone)
                setZones(prev =>[...prev, zone])
                setOpenAlert([true, false]);
            } else {
                setOpenAlert([false, true]);
            }
        } catch (err) {
            window.alert(err.message);
        }
        setLoading(false);
    }
    const saveBatiment = async() => {
        setLoading(true);
        try {
            const id = ObjectId();
            if (Object.keys(batiment).every(x=>batiment[x] !== '' && batiment[x].length !==0 )){
                setBatiment({...batiment, _id: id.toString()})
                await axios.post("http://localhost:5000/api/zone/createBatiment", batiment)
                setBatiments(prev =>[...prev, batiment])
                setOpenAlert([true, false]);
            } else {
                setOpenAlert([false, true]);}
        } catch (err) {
            window.alert(err.message);
        }
        setLoading(false);
    }
    useEffect(()=>{
        const fetchPersons = async() => {
            const res = await axios.get("http://localhost:5000/api/personnel/a/" + user._id);
            setPersons1(res.data)
            const result = res.data.filter(person => person.zone === "" || person.zone === undefined);
            console.log(result)
            setPersons(result)
        };
        fetchPersons();
        const fetchZones = async() => {
            const res = await axios.get("http://localhost:5000/api/zone/z/" + org._id);
            setZones(res.data)
        }
        fetchZones();
        const fetchBatiments = async() => {
            const res = await axios.get("http://localhost:5000/api/zone/b/" + org._id);
            setBatiments(res.data)
        }
        fetchBatiments();
    }, [user._id, org._id])
    const mappedPersons = persons && persons.map(x=>{
        return (
            <MenuItem 
                key={x._id}
                value={x._id}
            >
                {x.nom + " " + x.prenom}
            </MenuItem>)
    })
    const workZones = zones !== undefined && zones.map((x, i) =>{
        return(
          <Zone
            num={i+1}
            key={x._id}
            id={x._id}
            zone={x}
            persons={persons1}
          />
        )
      });
    const workBatiments = batiments !==undefined && batiments.map((x, i) =>{
        return(
          <Batiment
            num={i+1}
            key={x._id}
            id={x._id}
            batiment={x}
            persons={persons1}
          />
        )
      });
      const [blurredZone, setblurredZone] = useState();
      const [blurredBatiment, setblurredBatiment] = useState();

      const handleBlur = (e, type) => {
        if (type === 'zone') {
            setblurredZone({...blurredZone, [e.name]: true});
        } else {
            setblurredBatiment({...blurredBatiment, [e.name]: true});
        }
      }
    return (
        <main className="container">
            {value ===0
                ? <div className="container">
                    
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
                   
                    <div className="container d-flex justify-content-center">
                        <Box
                            className='row d-flex justify-content-center'
                            style={{maxWidth: '50%'}}
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '30ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                className="col-12 col-sm-6 col-md-4 col-lg-4"
                                required
                                onBlur={(e)=>handleBlur(e.target, 'zone')}
                                error={blurredZone && blurredZone.code && zone.code === ''}
                                id="outlined-name"
                                label="Codification Zone"
                                value={zone.code}
                                name='code'
                                onChange={(e)=>handleChange(e,'zone')}
                            />
                            <TextField
                                className="col-12 col-sm-6 col-md-4 col-lg-4"
                                required
                                onBlur={(e)=>handleBlur(e.target, 'zone')}
                                error={blurredZone && blurredZone.ordre && zone.ordre === ''}
                                id="outlined-name"
                                label="Ordre"
                                value={zone.ordre}
                                name='ordre'
                                onChange={(e)=>handleChange(e, 'zone')}
                            />
                            <TextField
                                className="col-12 col-sm-6 col-md-4 col-lg-4"
                                required
                                onBlur={(e)=>handleBlur(e.target, 'zone')}
                                error={blurredZone && blurredZone.superficie && zone.superficie === ''}
                                id="outlined-name"
                                type='number'
                                label="Superficie"
                                value={zone.superficie}
                                name='superficie'
                                onChange={(e)=>handleChange(e, 'zone')}
                            />
                            <TextField
                                id="demo-simple-select-filled"
                                required
                                onBlur={(e)=>handleBlur(e.target, 'zone')}
                                error={blurredZone && blurredZone.responsable && zone.responsable === ''}
                                select
                                label='Responsable'
                                value={zone.responsable}
                                name='responsable'
                                onChange={(e)=>handleChange(e, 'zone')}
                            >
                                {mappedPersons}
                            </TextField>
                            <FormControl>
                                <InputLabel id="demo-multiple-chip-label">Equipe *</InputLabel>
                                <Select
                                    multiple
                                    onBlur={(e)=>handleBlur(e.target, 'zone')}
                                    error={blurredZone && blurredZone.equipe && zone.equipe.length === 0}
                                    label="Equipe *"
                                    value={zone.equipe}
                                    name='equipe'
                                    onChange={(e)=>handleChange(e, 'zone')}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => {
                                            const allIds = persons && persons.map(x=>x._id);
                                            return(
                                                <Chip 
                                                    key={value} 
                                                    label={persons[allIds.indexOf(value)].nom+' '+persons[allIds.indexOf(value)].prenom} />
                                            )
                                        })}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                {persons && persons.map((name) => (
                                    <MenuItem
                                        key={name._id}
                                        value={name._id}
                                    >
                                    {name.nom + " " + name.prenom}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className="mt-5 text-center"><h1 className='text-center'>Flux</h1></div>
                    <div className="container d-flex justify-content-center">
                        <Box
                            className='row d-flex justify-content-center'
                            style={{maxWidth: '75%'}}
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '30ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >   
                            <div className="d-flex align-items-center col-12 col-sm-6 col-md-4 col-lg-4">
                                <TextField
                                    id="outlined-name"
                                    label="Flux MP"
                                    name='code'
                                    value={zone.flux.mp}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="mp" onChange={(e) => handleUploadFile(e, 'zone')} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            <div className="d-flex align-items-center col-12 col-sm-6 col-md-4 col-lg-4">
                                <TextField
                                    id="outlined-name"
                                    label="Flux Produit"
                                    name='code'
                                    value={zone.flux.produit}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="produit" onChange={(e) => handleUploadFile(e, 'zone')} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            <div className="d-flex align-items-center col-12 col-sm-6 col-md-4 col-lg-4">
                                <TextField
                                    id="outlined-name"
                                    label="Flux Personnel"
                                    name='code'
                                    value={zone.flux.personnel}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="personnel" onChange={(e) => handleUploadFile(e, 'zone')} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            <div className="d-flex align-items-center col-12 col-sm-6 col-md-4 col-lg-4">
                                <TextField
                                    id="outlined-name"
                                    label="Flux Eau Potable"
                                    name='code'
                                    value={zone.flux.eau_potable}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="eau_potable" onChange={(e) => handleUploadFile(e, 'zone')} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            <div className="d-flex align-items-center col-12 col-sm-6 col-md-4 col-lg-4">
                                <TextField
                                    id="outlined-name"
                                    label="Flux Eau Incendie"
                                    name='code'
                                    value={zone.flux.eau_incendie}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="eau_incendie" onChange={(e) => handleUploadFile(e, 'zone')} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            <div className="d-flex align-items-center col-12 col-sm-6 col-md-4 col-lg-4">
                                <TextField
                                    id="outlined-name"
                                    label="Flux Evacuation"
                                    name='code'
                                    value={zone.flux.evacuation}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="evacuation" onChange={(e) => handleUploadFile(e, 'zone')} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            <div className="d-flex align-items-center col-12 col-sm-6 col-md-4 col-lg-4">
                                <TextField
                                    id="outlined-name"
                                    label="Flux Courant Electrique"
                                    name='code'
                                    value={zone.flux.courant}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="courant" onChange={(e) => handleUploadFile(e, 'zone')} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            <div className="d-flex align-items-center col-12 col-sm-6 col-md-4 col-lg-4">
                                <TextField
                                    id="outlined-name"
                                    label="Flux Dechets Solides"
                                    name='code'
                                    value={zone.flux.dechets}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="dechets" onChange={(e) => handleUploadFile(e, 'zone')} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            <div className="d-flex align-items-center col-12 col-sm-6 col-md-4 col-lg-4">
                                <TextField
                                    id="outlined-name"
                                    label="Flux Vapeur"
                                    name='code'
                                    value={zone.flux.vapeur}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="vapeur" onChange={(e) => handleUploadFile(e, 'zone')} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            <div className="d-flex align-items-center col-12 col-sm-6 col-md-4 col-lg-4">
                                <TextField
                                    id="outlined-name"
                                    label="Flux Air comprimé"
                                    name='code'
                                    value={zone.flux.air}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="air" onChange={(e) => handleUploadFile(e, 'zone')} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                        </Box>
                    </div>
                    <div className='m-3 d-flex justify-content-center'><Button className="btn btn-success" onClick={saveZone}>Enregistrer</Button></div>
                    
                    <div className='text-center'>
                        <h1>Tableaux des Zones</h1>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    {zones && workZones.length !== 0 && 
                                        <><th className="text-center" scope="col-4">Numéro</th>
                                        <th className="text-center" scope="col-4">Code</th>
                                        <th className="text-center" scope="col-4">Ordre</th>
                                        <th className="text-center" scope="col-4">Superficie</th>
                                        <th className="text-center" scope="col-4">Responsable</th>
                                        <th className="text-center" scope="col-4">Equipe</th></>}
                                </tr>
                            </thead>
                            <tbody>
                                {zones !== undefined 
                                    ? workZones.length !== 0
                                      ?   workZones
                                      :   <b>Liste Vide</b>
                                    : <tr className="sortable">
                                        <td className="text-center"><Skeleton animation="wave" /></td>
                                        <td className="text-center"><Skeleton animation="wave" /></td>
                                        <td className="text-center"><Skeleton animation="wave" /></td>
                                        <td className="text-center"><Skeleton animation="wave" /></td>
                                        <td className="text-center"><Skeleton animation="wave" /></td>
                                        <td className="text-center"><Skeleton animation="wave" /></td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                : <div className="container">
                <div className="col-4 small d-flex justify-content-center align-items-center">
                        <Button href="../fournisseurs" className='col-2 small mx-2'><AiFillCaretUp />Liste des Fournisseurs</Button>
                    </div> 
                <div className="text-center"><h1 className='text-center'>Nouveau Bâtiment</h1></div>
                    <div className="container d-flex justify-content-center">
                        <Box
                            className='row d-flex justify-content-center'
                            style={{maxWidth: '75%'}}
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '30ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                className="col-12 col-sm-6 col-md-4 col-lg-4"
                                required
                                onBlur={(e)=>handleBlur(e.target, 'batiment')}
                                error={blurredBatiment && blurredBatiment.libelle && batiment.libelle === ''}
                                id="outlined-name"
                                label="Libelle Bâtiments"
                                value={batiment.libelle}
                                name='libelle'
                                onChange={(e)=>handleChange(e, 'batiment')}
                            />
                            <TextField
                                className="col-12 col-sm-6 col-md-4 col-lg-4"
                                required
                                onBlur={(e)=>handleBlur(e.target, 'batiment')}
                                error={blurredBatiment && blurredBatiment.code && batiment.code === ''}
                                id="outlined-name"
                                label="Codification Zone"
                                value={batiment.code}
                                name='code'
                                onChange={(e)=>handleChange(e, 'batiment')}
                            />
                            <TextField
                                className="col-12 col-sm-6 col-md-4 col-lg-4"
                                required
                                onBlur={(e)=>handleBlur(e.target, 'batiment')}
                                error={blurredBatiment && blurredBatiment.ordre && batiment.ordre === ''}
                                id="outlined-name"
                                label="Ordre"
                                value={batiment.ordre}
                                name='ordre'
                                onChange={(e)=>handleChange(e, 'batiment')}
                            />
                            <TextField
                                className="col-12 col-sm-6 col-md-4 col-lg-4"
                                required
                                onBlur={(e)=>handleBlur(e.target, 'batiment')}
                                error={blurredBatiment && blurredBatiment.superficie && batiment.superficie === ''}
                                id="outlined-name"
                                type='number'
                                label="Superficie"
                                value={batiment.superficie}
                                name='superficie'
                                onChange={(e)=>handleChange(e, 'batiment')}
                            />
                            <TextField
                                className="col-12 col-sm-6 col-md-4 col-lg-4"
                                required
                                onBlur={(e)=>handleBlur(e.target, 'batiment')}
                                error={blurredBatiment && blurredBatiment.nbr_niveau && batiment.nbr_niveau === ''}
                                id="outlined-name"
                                type='number'
                                label="Nombre du niveaux"
                                value={batiment.nbr_niveau}
                                name='nbr_niveau'
                                onChange={(e)=>handleChange(e, 'batiment')}
                            />
                            <TextField
                                id="demo-simple-select-filled"
                                required
                                onBlur={(e)=>handleBlur(e.target, 'batiment')}
                                error={blurredBatiment && blurredBatiment.responsable && batiment.responsable === ''}
                                select
                                label="Responsable"
                                value={batiment.responsable}
                                name='responsable'
                                onChange={(e)=>handleChange(e, 'batiment')}
                            >
                                {mappedPersons}
                            </TextField>
                            <FormControl>
                                <InputLabel id="demo-multiple-chip-label">Equipe *</InputLabel>
                                <Select
                                    multiple
                                    onBlur={(e)=>handleBlur(e.target, 'batiment')}
                                    error={blurredBatiment && blurredBatiment.equipe && batiment.equipe.length === 0}
                                    label="Equipe *"
                                    value={batiment.equipe}
                                    name='equipe'
                                    onChange={(e)=>handleChange(e, 'batiment')}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => {
                                            const allIds = persons && persons.map(x=>x._id);
                                            return(
                                                <Chip 
                                                    key={value} 
                                                    label={persons[allIds.indexOf(value)].nom+' '+persons[allIds.indexOf(value)].prenom} />
                                            )
                                        })}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                {persons && persons.map((name) => (
                                    <MenuItem
                                        key={name._id}
                                        value={name._id}
                                    >
                                    {name.nom + " " + name.prenom}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                            <TextField
                                className="col-12 col-sm-6 col-md-4 col-lg-4"
                                required
                                onBlur={(e)=>handleBlur(e.target, 'batiment')}
                                error={blurredBatiment && blurredBatiment.atex && batiment.atex === ''}
                                id="outlined-name"
                                type='number'
                                label="Atex Numero"
                                value={batiment.atex}
                                name='atex'
                                onChange={(e)=>handleChange(e, 'batiment')}
                            />
                        </Box>
                    </div>
                    <div className="mt-5 text-center"><h1 className='text-center'>Flux</h1></div>
                    <div className="container d-flex justify-content-center">
                        <Box
                            className='row d-flex justify-content-center'
                            style={{maxWidth: '75%'}}
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '30ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >   
                            <div className="d-flex align-items-center col-12 col-sm-6 col-md-4 col-lg-4">
                                <TextField
                                    id="outlined-name"
                                    label="Flux MP"
                                    name='code'
                                    value={batiment.flux.mp}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="mp" onChange={(e) => handleUploadFile(e, 'batiment')} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            <div className="d-flex align-items-center col-12 col-sm-6 col-md-4 col-lg-4">
                                <TextField
                                    id="outlined-name"
                                    label="Flux Produit"
                                    name='code'
                                    value={batiment.flux.produit}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="produit" onChange={(e) => handleUploadFile(e, 'batiment')} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            <div className="d-flex align-items-center col-12 col-sm-6 col-md-4 col-lg-4">
                                <TextField
                                    id="outlined-name"
                                    label="Flux Personnel"
                                    name='code'
                                    value={batiment.flux.personnel}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="personnel" onChange={(e) => handleUploadFile(e, 'batiment')} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            <div className="d-flex align-items-center col-12 col-sm-6 col-md-4 col-lg-4">
                                <TextField
                                    id="outlined-name"
                                    label="Flux Eau Potable"
                                    name='code'
                                    value={batiment.flux.eau_potable}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="eau_potable" onChange={(e) => handleUploadFile(e, 'batiment')} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            <div className="d-flex align-items-center col-12 col-sm-6 col-md-4 col-lg-4">
                                <TextField
                                    id="outlined-name"
                                    label="Flux Eau Incendie"
                                    name='code'
                                    value={batiment.flux.eau_incendie}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="eau_incendie" onChange={(e) => handleUploadFile(e, 'batiment')} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            <div className="d-flex align-items-center col-12 col-sm-6 col-md-4 col-lg-4">
                                <TextField
                                    id="outlined-name"
                                    label="Flux Evacuation"
                                    name='code'
                                    value={batiment.flux.evacuation}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="evacuation" onChange={(e) => handleUploadFile(e, 'batiment')} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            <div className="d-flex align-items-center col-12 col-sm-6 col-md-4 col-lg-4">
                                <TextField
                                    id="outlined-name"
                                    label="Flux Courant Electrique"
                                    name='code'
                                    value={batiment.flux.courant}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="courant" onChange={(e) => handleUploadFile(e, 'batiment')} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            <div className="d-flex align-items-center col-12 col-sm-6 col-md-4 col-lg-4">
                                <TextField
                                    id="outlined-name"
                                    label="Flux Dechets Solides"
                                    name='code'
                                    value={batiment.flux.dechets}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="dechets" onChange={(e) => handleUploadFile(e, 'batiment')} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            <div className="d-flex align-items-center col-12 col-sm-6 col-md-4 col-lg-4">
                                <TextField
                                    id="outlined-name"
                                    label="Flux Vapeur"
                                    name='code'
                                    value={batiment.flux.vapeur}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="vapeur" onChange={(e) => handleUploadFile(e, 'batiment')} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            <div className="d-flex align-items-center col-12 col-sm-6 col-md-4 col-lg-4">
                                <TextField
                                    id="outlined-name"
                                    label="Flux Air comprimé"
                                    name='code'
                                    value={batiment.flux.air}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="air" onChange={(e) => handleUploadFile(e, 'batiment')} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                        </Box>
                    </div>
                    <div className='d-flex justify-content-center m-3'><Button className="btn btn-success" onClick={saveBatiment}>Enregistrer</Button></div>
                    <div className='text-center'>
                        <h1>Tableaux des Batiments</h1>
                        <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                {batiments && workBatiments.length!==0 &&
                                    <><th className="text-center" scope="col-4">Numéro</th>
                                    <th className="text-center" scope="col-4">Code</th>
                                    <th className="text-center" scope="col-4">Ordre</th>
                                    <th className="text-center" scope="col-4">Superficie</th>
                                    <th className="text-center" scope="col-4">Responsable</th>
                                    <th className="text-center" scope="col-4">Equipe</th></>}
                            </tr>
                        </thead>
                        <tbody>
                            {batiments !== undefined 
                                ?   batiments.length !==0 
                                    ?   workBatiments
                                    :   <b>Liste Vide</b>
                                    : <tr className="sortable">
                                        <td className="text-center"><Skeleton animation="wave" /></td>
                                        <td className="text-center"><Skeleton animation="wave" /></td>
                                        <td className="text-center"><Skeleton animation="wave" /></td>
                                        <td className="text-center"><Skeleton animation="wave" /></td>
                                        <td className="text-center"><Skeleton animation="wave" /></td>
                                        <td className="text-center"><Skeleton animation="wave" /></td>
                                    </tr>}
                        </tbody>
                        </table>
                    </div>
                </div>
            }
            
            
            <div className='container d-flex flex-column align-items-center navigation-div'>
                <BottomNavigation
                    className="navigation"
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        handleCloseAlert();
                    }}
                >
                    <BottomNavigationAction label="Zones"  />
                    <BottomNavigationAction label="Bâtiments"  />
                </BottomNavigation>
            </div>
            {openAlert[0] && 
                <Snackbar sx={{width: '35%'}} open={true} autoHideDuration={2000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    Ajout Validé
                </Alert>
                </Snackbar>
            }
            {openAlert[1] && 
                <Snackbar sx={{width: '35%'}} open={true} autoHideDuration={3000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="warning" sx={{ width: '100%' }}>
                    Veuillez Entrer les champs nécessaire!
                </Alert >
                </Snackbar>
            }
        </main>
            
    )
}

export default Zones