import { Alert, BottomNavigation, BottomNavigationAction, MenuItem, Snackbar, TextField } from '@mui/material';
import axios from 'axios';
import { ObjectId } from 'bson';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { BiUpload } from 'react-icons/bi';
import { IoMdCloseCircle } from 'react-icons/io';
import Equipement from '../../components/Equipement/Equipement';
import { AuthContext } from '../../Context/authContext';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Material from '../../components/Equipement/Material';
import Logistic from '../../components/Equipement/Logistic';

export const Equipements = () => {
    const libelle = useRef();
    const code = useRef();
    const num_inventaire = useRef();
    const fiche_technique = useRef();
    const fds = useRef();
    const batiment = useRef();
    const affection = useRef();
    const type_material = useRef();
    const { user, org } = useContext(AuthContext);

    const [value, setValue] = useState(0);
    const [equips, setEquips] = useState();
    const [clickedEq, setClickedEq] = useState(0);
    const [editValues, setEditValues] = useState();
    const [editValuesMat, setEditValuesMat] = useState();
    const [editValuesLog, setEditValuesLog] = useState();
    const [openAlert, setOpenAlert] = useState([false, false, false]);
    const [loading, setLoading] = useState(false);
    const [zones, setZones] = useState();
    const [zone, setZone] = useState();

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert([false, false, false]);
      };
    
    function handleChange(e) {
        setEditValues({...editValues, [e.target.name]: e.target.value});
    }
    function handleChangeMat(e) {
        setEditValuesMat({...editValuesMat, [e.target.name]: e.target.value});
    }
    function handleChangeLog(e) {
        setEditValuesLog({...editValuesLog, [e.target.name]: e.target.value});
    }

    const handleUploadFile = async (e) => {
        setLoading(true);
        const pic=e.target.files[0];
        const data = new FormData();
        const fileName = Date.now() + pic.name;
        data.append("name", fileName);
        data.append("file", pic);
        try {
            await axios.post("http://localhost:5000/api/upload/file", data);
        } catch (err) {};
        value ===0 
         ? setEditValues({...editValues, [e.target.id]: fileName})
         : value ===1 ? setEditValuesMat({...editValuesMat, [e.target.id]: fileName}) : setEditValuesLog({...editValuesLog, [e.target.id]: fileName});
        setLoading(false);
    }
    const submitFormEq = async (e)=>{
        setLoading(true);
        var id = new ObjectId();
        const equipement = {
            _id: id.toString(),
            user:user._id, organism: org._id,
            type: 'eq',
            libelle:libelle.current.value,
            code:code.current.value,
            num_inventaire:num_inventaire.current.value,
            zone:zone,
            fiche_technique:editValues.fiche_technique, 
            fds:editValues.fds, 
            affection:batiment.current.value
        }
        if (Object.keys(equipement).every(x=>equipement[x] !== '')){
            try{
                await axios.post("http://localhost:5000/api/equipement/createEq", equipement);
                setEquips(prevArray=>[...prevArray, equipement]);
                setOpenAlert([false, true, false]);
            }catch(err){
                console.log(err)
            }
        } else {
            setOpenAlert([false, false, true]);
        }
        setLoading(false);
    }
    const submitFormMat = async (e)=>{
        setLoading(true);
        var id = new ObjectId();
        const material = {
            _id: id.toString(),
            user:user._id, organism: org._id,
            type: 'mat',
            libelle:libelle.current.value,
            type_material:type_material.current.value,
            code:code.current.value,
            num_inventaire:num_inventaire.current.value,
            fiche_technique:editValuesMat.fiche_technique, 
            fds:editValuesMat.fds, 
            affection:affection.current.value
        }
        if (Object.keys(material).every(x=>material[x] !== '')){
            try{
                await axios.post("http://localhost:5000/api/equipement/createMat", material);
                setEquips(prevArray=>[...prevArray, material]);
                setOpenAlert([false, true, false]);
            }catch(err){
                console.log(err)
            }
        } else {
            setOpenAlert([false, false, true]);
        }
        setLoading(false);
    }
    const submitFormLog = async (e)=>{
        setLoading(true);
        var id = new ObjectId();
        const logistic = {
            _id: id.toString(),
            user:user._id, organism: org._id,
            type: 'log',
            libelle:libelle.current.value,
            code:code.current.value,
            num_inventaire:num_inventaire.current.value,
            fiche_technique:editValuesLog.fiche_technique, 
            fds:editValuesLog.fds, 
            affection:affection.current.value
        }
        if (Object.keys(logistic).every(x=>logistic[x] !== '')){
            try{
                await axios.post("http://localhost:5000/api/equipement/createLog", logistic);
                setEquips(prevArray=>[...prevArray, logistic]);
                setOpenAlert([false, true, false]);
            }catch(err){
                console.log(err)
            }
        } else {
            setOpenAlert([false, false, true]);
        }
        setLoading(false);
    }
    const editEquips = async () => {
        setLoading(true);
        if(value === 0){
            const index = equips.findIndex(x => x._id === editValues._id);
            if (Object.keys(editValues).every(x=>editValues[x] !== '')){
                try{
                    await axios.put("http://localhost:5000/api/equipement/" + editValues._id, editValues);
                    setEquips(prevEquips=>{
                    const newEquip = prevEquips.map(x=>{
                        if (prevEquips.indexOf(x) === index){
                        return editValues;
                        } else {
                        return x;
                        }
                    })
                    return newEquip;
                    });
                    setClickedEq(0);
                    setOpenAlert([false, true, false]);
                    setEditValues();
                }catch(err){
                    console.log(err)        
                }
            } else {
                setOpenAlert([false, false, true]);
            }
        } else {
            if (value === 1 ){
                const index = equips.findIndex(x => x._id === editValuesMat._id);
                if (Object.keys(editValuesMat).every(x=>editValuesMat[x] !== '')){
                    try{
                        await axios.put("http://localhost:5000/api/equipement/" + editValuesMat._id, editValuesMat);
                        setEquips(prevEquips=>{
                        const newEquip = prevEquips.map(x=>{
                            if (prevEquips.indexOf(x) === index){
                            return editValuesMat;
                            } else {
                            return x;
                            }
                        })
                        return newEquip;
                        });
                        setClickedEq(0);
                        setOpenAlert([false, true, false]);
                        setEditValuesMat();
                    }catch(err){
                        console.log(err)        
                    }
                } else {
                    setOpenAlert([false, false, true]);
                }
            } else {
                const index = equips.findIndex(x => x._id === editValuesLog._id);
                if (Object.keys(editValuesLog).every(x=>editValuesLog[x] !== '')){
                    try{
                        await axios.put("http://localhost:5000/api/equipement/" + editValuesLog._id, editValuesLog);
                        setEquips(prevEquips=>{
                        const newEquip = prevEquips.map(x=>{
                            if (prevEquips.indexOf(x) === index){
                            return editValuesLog;
                            } else {
                            return x;
                            }
                        })
                        return newEquip;
                        });
                        setClickedEq(0);
                        setOpenAlert([false, true, false]);
                        setEditValuesLog();
                    }catch(err){
                        console.log(err)        
                    }
                } else {
                    setOpenAlert([false, false, true]);
                }
            }
        }
        setLoading(false);
    }
    const deleteEquips = async () => {
        setLoading(true);
        if (value === 0 ){
            try{
                await axios.delete("http://localhost:5000/api/equipement/" + editValues._id);
                setClickedEq(0);
                setEquips(prevArray=>{
                  const deletedArray = prevArray.filter(x=>x._id !== editValues._id);
                  return deletedArray;
                })
                setOpenAlert([true, false, false]);
                setEditValues();
                setEditValuesMat();
                setEditValuesLog();
            }catch(err){
                console.log(err)        
            }
        } else {
            if ( value === 1 ){
                try{
                    await axios.delete("http://localhost:5000/api/equipement/" + editValuesMat._id);
                    setClickedEq(0);
                    setEquips(prevArray=>{
                      const deletedArray = prevArray.filter(x=>x._id !== editValuesMat._id);
                      return deletedArray;
                    })
                    setOpenAlert([true, false, false]);
                    setEditValuesMat();
                }catch(err){
                    console.log(err)        
                }
            } else {
                try{
                    await axios.delete("http://localhost:5000/api/equipement/" + editValuesLog._id);
                    setClickedEq(0);
                    setEquips(prevArray=>{
                      const deletedArray = prevArray.filter(x=>x._id !== editValuesLog._id);
                      return deletedArray;
                    })
                    setOpenAlert([true, false, false]);
                    setEditValuesLog();
                }catch(err){
                    console.log(err)        
                }
            }
        }
        setLoading(false);
    }
    useEffect(()=>{
        const fetchEquips = async() => {
            const res = await axios.get("http://localhost:5000/api/equipement/all/" + user._id);
            setEquips(res.data);
        }
        fetchEquips();
        const fetchZones = async() => {
            const res = await axios.get("http://localhost:5000/api/zone/z/" + org._id);
            setZones(res.data);
        }
        fetchZones();
    }, [])

    const selectZones = zones && zones.map(zone => <MenuItem value={zone.code}><Link className='link' to={"/zones/"+zone._id}>{zone.code}</Link></MenuItem>);
    const equipementsFilter = equips && equips.filter(x => x.type === 'eq');
    const materialsFilter = equips && equips.filter(x => x.type === 'mat');
    const logisticsFilter = equips && equips.filter(x => x.type === 'log');

    function handleClick(num) {
        setClickedEq(num);
        value === 0
            ? setEditValues(equipementsFilter[num-1])
            : value === 1 
                ? setEditValuesMat(materialsFilter[num-1])
                : setEditValuesLog(logisticsFilter[num-1])
    }
    const equipements = equipementsFilter!==undefined && equipementsFilter.map((x, i)=>{
        return(
            <Equipement 
              num={i+1}
              key={x._id}
              equipId={x}
              handleClick={handleClick}
            />
        )
    })
    const materials = materialsFilter!==undefined && materialsFilter.map((x, i)=>{
        return(
            <Material 
              num={i+1}
              key={x._id}
              equipId={x}
              handleClick={handleClick}
            />
        )
    })
    const logistics =logisticsFilter!==undefined &&logisticsFilter.map((x, i)=>{
        return(
            <Logistic 
              num={i+1}
              key={x._id}
              equipId={x}
              handleClick={handleClick}
            />
        )
    })

    return (
        <main className="background  new-organism-main" >
            <div className="container rounded">
                

                <div className="row vertical-center">
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
                    <div className=" col-9 col-sm-12 col-md-5 col-lg-6 d-flex b justify-content-center align-items-center row">
                        <h1>Liste des {value === 0 ? "Equipements" : value === 1 ? "Materiels" : "Logistiques"} <small>{equipements.length === 0 && " : Vide"}</small></h1>
                        {equipements.length !== 0 && value === 0 &&
                            <table className="table table-striped table-hover">
                            <thead>
                            <tr>
                                <th className="text-center" scope="col-4">Numéro</th>
                                <th className="text-center" scope="col-4">Libelle</th>
                                <th className="text-center" scope="col-4">Code</th>
                                <th className="text-center" scope="col-4">Numéro d'Inventaire</th>
                                <th className="text-center" scope="col-4">Zone</th>
                                <th className="text-center" scope="col-4">Fiche Technique</th>
                                <th className="text-center" scope="col-4">FDS</th>
                                <th className="text-center" scope="col-4 ">Bâtiment</th>
                            </tr>
                            </thead>
                            <tbody>
                                {equipements}
                            </tbody>
                        </table>}
                        {/* --------------------------------------------------------------------------------------------------------------- */}
                        {materials.length !== 0 && value === 1 &&
                            <table className="table table-striped table-hover">
                            <thead>
                            <tr>
                                <th className="text-center" scope="col-4">Numéro</th>
                                <th className="text-center" scope="col-4">Libelle</th>
                                <th className="text-center" scope="col-4">Type de materiel</th>
                                <th className="text-center" scope="col-4">Code</th>
                                <th className="text-center" scope="col-4">Numéro d'Inventaire</th>
                                <th className="text-center" scope="col-4">Fiche Technique</th>
                                <th className="text-center" scope="col-4">FDS</th>
                                <th className="text-center" scope="col-4 ">Affection</th>
                            </tr>
                            </thead>
                            <tbody>
                                {materials}
                            </tbody>
                        </table>}
                        {/* --------------------------------------------------------------------------------------------------------------- */}
                        {logistics.length !== 0 && value === 2 &&
                            <table className="table table-striped table-hover">
                            <thead>
                            <tr>
                                <th className="text-center" scope="col-4">Numéro</th>
                                <th className="text-center" scope="col-4">Libelle</th>
                                <th className="text-center" scope="col-4">Code</th>
                                <th className="text-center" scope="col-4">Numéro d'Inventaire</th>
                                <th className="text-center" scope="col-4">Fiche Technique</th>
                                <th className="text-center" scope="col-4">FDS</th>
                                <th className="text-center" scope="col-4 ">Affection</th>
                            </tr>
                            </thead>
                            <tbody>
                                {logistics}
                            </tbody>
                        </table>}
                    </div>
                    {clickedEq === 0 
                    ? <div className="col-9 col-sm-12 col-md-4 col-lg-3 register-a" style={{maxWidth: "fit-content"}}>
                        <h1 className="text-prime pb-5">Ajouter un Equipement</h1>
                        <form className="form-group">
                            <input className="form-control m-2" placeholder="Libelle Equipement" ref={libelle}/>
                            {value === 1 && <input className="form-control m-2" placeholder='Type de materiel' ref={type_material}/>}
                            <input className="form-control m-2" placeholder="Code Equipement" ref={code} />
                            <input className="form-control m-2" placeholder="Numéro d'Inventaire" ref={num_inventaire} />
                            {value === 0 && <TextField 
                                className="form-control m-2"
                                id="outlined-basic"
                                label="Zone"
                                variant="outlined"
                                select
                                aria-label="Default select example"
                                onChange={(e)=>setZone(e.target.value)}
                            >   
                                <MenuItem selected>Choisir une zone</MenuItem>
                                {selectZones}
                            </TextField>}
                            <div className="form-control m-2 d-flex align-items-center">
                                {value ===0
                                 ? <input readOnly={true} className="form-control m-2" value={editValues && editValues.fiche_technique} placeholder="Fiche Technique" ref={fiche_technique} />
                                 : value ===1 
                                  ? <input readOnly={true} className="form-control m-2" value={editValuesMat && editValuesMat.fiche_technique} placeholder="Fiche Technique" ref={fiche_technique} />
                                  : <input readOnly={true} className="form-control m-2" value={editValuesLog && editValuesLog.fiche_technique} placeholder="Fiche Technique" ref={fiche_technique} />}
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="fiche_technique" onChange={(e) => handleUploadFile(e)} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            <div className="form-control m-2 d-flex align-items-center">
                                {value ===0 
                                 ? <input readOnly={true} className="form-control m-2" value={editValues && editValues.fds} placeholder="FDS" ref={fds} />
                                 : value ===1
                                  ? <input readOnly={true} className="form-control m-2" value={editValuesMat && editValuesMat.fds} placeholder="FDS" ref={fds} />
                                  : <input readOnly={true} className="form-control m-2" value={editValuesLog && editValuesLog.fds} placeholder="FDS" ref={fds} />}
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="fds" onChange={(e) => handleUploadFile(e)} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            {value === 0 
                                ? <input className="form-control m-2" placeholder="Bâtiment" ref={batiment} />
                                : <input className="form-control m-2" placeholder="Affection" ref={affection} />
                            }
                            <div className="d-flex justify-content-end m-2">
                                <Button 
                                    className="bg-prime" 
                                    onClick={value === 0 ? submitFormEq : value === 1 ? submitFormMat : submitFormLog} >Enregister</Button>
                            </div>
                        </form>
                    </div>
                    : 
                    value === 0 ? (<div className="col-9 col-sm-12 col-md-4 col-lg-3 register-a" style={{maxWidth: "fit-content"}}> 
                        <div className="d-flex justify-content-center m-2">
                        <IoMdCloseCircle className="fournisseur-close" color="red" size={30} onClick={()=>setClickedEq(0) && setEditValues()}/>
                        </div>
                        <h1 className="text-prime pb-5">Equipement numéro: {clickedEq}</h1>
                        <form className="form-group">
                            <input 
                                className="form-control m-2" 
                                placeholder="Libelle Equipement"
                                value={editValues.libelle}
                                name='libelle'
                                onChange={handleChange}
                                ref={libelle} 
                            />
                            <input 
                                className="form-control m-2" 
                                placeholder="Code Equipement" 
                                value={editValues.code}
                                name='code'
                                onChange={handleChange}
                                ref={code}
                            />
                            <input 
                                className="form-control m-2" 
                                placeholder="Numero d'Inventaire"
                                value={editValues.num_inventaire}
                                name='num_inventaire'
                                onChange={handleChange}
                                ref={num_inventaire} 
                            />
                            <TextField 
                                className="form-control m-2"
                                id="outlined-basic"
                                label="Zone"
                                variant="outlined"
                                select
                                name='zone'
                                onChange={handleChange}
                                aria-label="Default select example"
                                value={editValues.zone}
                            >
                                {selectZones}
                            </TextField>
                            <div className="form-control m-2 d-flex align-items-center">
                                <input readOnly={true} className="form-control m-2" value={editValues && editValues.fiche_technique.slice(13)} placeholder="Fiche Technique" ref={fiche_technique} />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="fiche_technique" onChange={(e) => handleUploadFile(e)} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            <div className="form-control m-2 d-flex align-items-center">
                                <input readOnly={true} className="form-control m-2" value={editValues && editValues.fds.slice(13)} placeholder="FDS" ref={fds} />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="fds" onChange={(e) => handleUploadFile(e)} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            <input 
                                className="form-control m-2" 
                                placeholder="Bâtiment"
                                value={editValues.affection}
                                name='affection'
                                onChange={handleChange}
                                ref={batiment} 
                            />
                            <div className="d-flex justify-content-end m-2">
                                <div className="d-flex justify-content-center align-items-center">
                                    <Button className="bg-prime mx-2" onClick={editEquips} >Modifier</Button>
                                    <Button className="bg-danger" onClick={deleteEquips} >Supprimer</Button>
                                </div>
                            </div>
                        </form>
                    </div>)

                    : value === 1 ? (<div className="col-9 col-sm-12 col-md-4 col-lg-3 register-a" style={{maxWidth: "fit-content"}}> 
                        <div className="d-flex justify-content-center m-2">
                        <IoMdCloseCircle className="fournisseur-close" color="red" size={30} onClick={()=>setClickedEq(0) && setEditValuesMat()}/>
                        </div>
                        <h1 className="text-prime pb-5">Equipement numéro: {clickedEq}</h1>
                        <form className="form-group">
                            <input 
                                className="form-control m-2" 
                                placeholder="Libelle Equipement"
                                value={editValuesMat.libelle}
                                name='libelle'
                                onChange={handleChangeMat}
                                ref={libelle} 
                            />
                            <input 
                                className="form-control m-2" 
                                placeholder="Type de Materiel"
                                value={editValuesMat.type_material}
                                name='type_material'
                                onChange={handleChangeMat}
                                ref={type_material} 
                            />
                            <input 
                                className="form-control m-2" 
                                placeholder="Code Equipement" 
                                value={editValuesMat.code}
                                name='code'
                                onChange={handleChangeMat}
                                ref={code}
                            />
                            <input 
                                className="form-control m-2" 
                                placeholder="Numero d'Inventaire"
                                value={editValuesMat.num_inventaire}
                                name='num_inventaire'
                                onChange={handleChangeMat}
                                ref={num_inventaire} 
                            />
                            <div className="form-control m-2 d-flex align-items-center">
                                <input readOnly={true} className="form-control m-2" value={editValuesMat && editValuesMat.fiche_technique.slice(13)} placeholder="Fiche Technique" ref={fiche_technique} />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="fiche_technique" onChange={(e) => handleUploadFile(e)} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            <div className="form-control m-2 d-flex align-items-center">
                                <input readOnly={true} className="form-control m-2" value={editValuesMat && editValuesMat.fds.slice(13)} placeholder="FDS" ref={fds} />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="fds" onChange={(e) => handleUploadFile(e)} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            <input 
                                className="form-control m-2" 
                                placeholder="Bâtiment"
                                value={editValuesMat.affection}
                                name='affection'
                                onChange={handleChangeMat}
                                ref={batiment} 
                            />
                            <div className="d-flex justify-content-end m-2">
                                <div className="d-flex justify-content-center align-items-center">
                                    <Button className="bg-prime mx-2" onClick={editEquips} >Modifier</Button>
                                    <Button className="bg-danger" onClick={deleteEquips} >Supprimer</Button>
                                </div>
                            </div>
                        </form>
                    </div>)
                    : (
                        <div className="col-9 col-sm-12 col-md-4 col-lg-3 register-a" style={{maxWidth: "fit-content"}}> 
                        <div className="d-flex justify-content-center m-2">
                        <IoMdCloseCircle className="fournisseur-close" color="red" size={30} onClick={()=>setClickedEq(0) && setEditValuesLog()}/>
                        </div>
                        <h1 className="text-prime pb-5">Equipement numéro: {clickedEq}</h1>
                        <form className="form-group">
                            <input 
                                className="form-control m-2" 
                                placeholder="Libelle Equipement"
                                value={editValuesLog.libelle}
                                name='libelle'
                                onChange={handleChangeLog}
                                ref={libelle} 
                            />
                            <input 
                                className="form-control m-2" 
                                placeholder="Code Equipement" 
                                value={editValuesLog.code}
                                name='code'
                                onChange={handleChangeLog}
                                ref={code}
                            />
                            <input 
                                className="form-control m-2" 
                                placeholder="Numero d'Inventaire"
                                value={editValuesLog.num_inventaire}
                                name='num_inventaire'
                                onChange={handleChangeLog}
                                ref={num_inventaire} 
                            />
                            <div className="form-control m-2 d-flex align-items-center">
                                <input readOnly={true} className="form-control m-2" value={editValuesLog && editValuesLog.fiche_technique.slice(13)} placeholder="Fiche Technique" ref={fiche_technique} />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="fiche_technique" onChange={(e) => handleUploadFile(e)} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            <div className="form-control m-2 d-flex align-items-center">
                                <input readOnly={true} className="form-control m-2" value={editValuesLog && editValuesLog.fds.slice(13)} placeholder="FDS" ref={fds} />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="fds" onChange={(e) => handleUploadFile(e)} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            <input 
                                className="form-control m-2" 
                                placeholder="Bâtiment"
                                value={editValuesLog.affection}
                                name='affection'
                                onChange={handleChangeLog}
                                ref={batiment} 
                            />
                            <div className="d-flex justify-content-end m-2">
                                <div className="d-flex justify-content-center align-items-center">
                                    <Button className="bg-prime mx-2" onClick={editEquips} >Modifier</Button>
                                    <Button className="bg-danger" onClick={deleteEquips} >Supprimer</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                    )
                    }
                    {openAlert[0] && 
                    <Snackbar sx={{width: '35%'}} open={true} autoHideDuration={2000} onClose={handleCloseAlert}>
                        <Alert onClose={handleCloseAlert} severity="warning" sx={{ width: '100%' }}>
                        L'élément est supprimé !
                        </Alert>
                    </Snackbar>
                    }
                    {openAlert[1] && 
                    <Snackbar sx={{width: '35%'}} open={true} autoHideDuration={2000} onClose={handleCloseAlert}>
                        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                        Opération est fait avec success !
                        </Alert>
                    </Snackbar>
                    }
                    {openAlert[2] && 
                    <Snackbar sx={{width: '35%'}} open={true} autoHideDuration={3000} onClose={handleCloseAlert}>
                        <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                        Veuillez Entrer toutes les Informations !
                        </Alert>
                    </Snackbar>
                    }
                </div>
                <div className='container d-flex flex-column align-items-center navigation-div'>
                    <BottomNavigation
                        className='navigation'
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            value !== newValue && setClickedEq(0);
                            setValue(newValue);
                            handleCloseAlert();
                        }}
                    >
                        <BottomNavigationAction label="Equipements"  />
                        <BottomNavigationAction label="Matériels"  />
                        <BottomNavigationAction label="Logistiques"  />
                    </BottomNavigation>
                </div>
            </div>
        </main>
    )
}