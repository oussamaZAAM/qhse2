import { Alert, BottomNavigation, BottomNavigationAction, Snackbar } from '@mui/material';
import axios from 'axios';
import { ObjectId } from 'bson';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { BiUpload } from 'react-icons/bi';
import { IoMdCloseCircle } from 'react-icons/io';
import Equipement from '../../components/Equipement/Equipement';
import { AuthContext } from '../../Context/authContext';

export const Equipements = () => {
    const libelle = useRef();
    const code = useRef();
    const num_inventaire = useRef();
    const zone = useRef();
    const fiche_technique = useRef();
    const fds = useRef();
    const batiment = useRef();
    const { user, org } = useContext(AuthContext);

    const [value, setValue] = useState(0);
    const [equips, setEquips] = useState();
    const [clickedEq, setClickedEq] = useState(0);
    const [editValues, setEditValues] = useState();
    const [openAlert, setOpenAlert] = useState([false, false, false]);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert([false, false, false]);
      };
    
    function handleChange(e) {
        setEditValues({...editValues, [e.target.name]: e.target.value});
    }

    const handleUploadFile = async (e) => {
        const pic=e.target.files[0];
        const data = new FormData();
        const fileName = Date.now() + pic.name;
        data.append("name", fileName);
        data.append("file", pic);
        try {
            await axios.post("http://localhost:5000/api/upload/file", data);
        } catch (err) {};
        setEditValues({...editValues, [e.target.id]: fileName});

    }
    const submitForm = async (e)=>{
        var id = new ObjectId();
        const equipement = {
            _id: id.toString(),
            user:user._id, organism: org._id,
            type: 'eq',
            libelle:libelle.current.value,
            code:code.current.value,
            num_inventaire:num_inventaire.current.value,
            zone:zone.current.value, 
            fiche_technique:editValues.fiche_technique, 
            fds:editValues.fds, 
            affection:batiment.current.value
        }
        if (Object.keys(equipement).every(x=>equipement[x] !== '')){
            try{
                await axios.post("http://localhost:5000/api/equipement/create", equipement);
                setEquips(prevArray=>[...prevArray, equipement]);
                setOpenAlert([false, true, false]);
            }catch(err){
                console.log(err)
            }
        } else {
            setOpenAlert([false, false, true]);
        }
    }
    const editEquips = async () => {
        if (Object.keys(editValues).every(x=>editValues[x] !== '')){
            try{
                await axios.put("http://localhost:5000/api/equipement/" + editValues._id, editValues);
                setEquips(prevEquips=>{
                const newEquip = prevEquips.map(x=>{
                    if (prevEquips.indexOf(x) === clickedEq - 1){
                    return editValues;
                    } else {
                    return x;
                    }
                })
                return newEquip;
                });
                setClickedEq(0);
                setOpenAlert([false, true, false]);
            }catch(err){
                console.log(err)        
            }
        } else {
            setOpenAlert([false, false, true]);
        }
    }
    const deleteEquips = async () => {
        try{
            await axios.delete("http://localhost:5000/api/equipement/" + editValues._id);
            setClickedEq(0);
            setEquips(prevArray=>{
              const deletedArray = prevArray.filter(x=>x._id !== editValues._id);
              return deletedArray;
            })
            setOpenAlert([true, false, false]);
        }catch(err){
            console.log(err)        
        }
    }
    useEffect(()=>{
        const fetchEquips = async() => {
            const res = await axios.get("http://localhost:5000/api/equipement/all/" + user._id);
            setEquips(res.data);
        }
        fetchEquips();
    }, [])

    function handleClick(num) {
        setClickedEq(num);
        setEditValues(equips[num-1])
    }

    const equipements = equips!==undefined && equips.map((x, i)=>{
        return(
            <Equipement 
              num={i+1}
              key={x._id}
              equipId={x}
              handleClick={handleClick}
            />
        )
    })

    return (
        <main className="background vertical-center new-organism-main" >
            <div className="container rounded">
                <div className="row d-flex justify-content-between">
                    <div className="col-4 d-flex justify-content-center align-items-center">
                        <Button href="../zones" className='col-6 mx-2'><AiFillCaretUp />Liste des Zones</Button>
                        <Button href="../zones" className='col-6 mx-2'><AiFillCaretUp />Liste des Postes</Button>
                    </div>
                    <h3 className="col-4"></h3>
                </div>

                <div className="row">
                    <div className=" col-9 col-sm-12 col-md-5 col-lg-6 d-flex b justify-content-center align-items-center row">
                        <h1>Liste des {value === 0 ? "Equipements" : value === 1 ? "Materiels" : "Logistiques"} <small>{equipements.length === 0 && " : Vide"}</small></h1>
                        {equipements.length !== 0 &&
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
                    </div>
                    {clickedEq === 0 
                    ? <div className="col-9 col-sm-12 col-md-4 col-lg-3 register-a" style={{maxWidth: "fit-content"}}>
                        <h1 className="text-prime pb-5">Ajouter un Equipement</h1>
                        <form className="form-group">
                            <input className="form-control m-2" placeholder="Libelle Equipement" ref={libelle}/>
                            <input className="form-control m-2" placeholder="Code Equipement" ref={code} />
                            <input className="form-control m-2" placeholder="Numéro d'Inventaire" ref={num_inventaire} />
                            <input className="form-control m-2" placeholder="Zone" ref={zone} />
                            <div className="form-control m-2 d-flex align-items-center">
                                <input readOnly={true} className="form-control m-2" value={editValues && editValues.fiche_technique} placeholder="Fiche Technique" ref={fiche_technique} />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="fiche_technique" onChange={(e) => handleUploadFile(e)} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            <div className="form-control m-2 d-flex align-items-center">
                                <input readOnly={true} className="form-control m-2" value={editValues && editValues.fds} placeholder="FDS" ref={fds} />
                                <label variant="contained" component="label" >
                                    <input hidden type="file" id="fds" onChange={(e) => handleUploadFile(e)} />
                                    <BiUpload style={{cursor: 'pointer', marginLeft:"10px"}} size={20}/>
                                </label>
                            </div>
                            <input className="form-control m-2" placeholder="Bâtiment" ref={batiment} />
                            <div className="d-flex justify-content-end m-2">
                                <Button className="bg-prime" onClick={submitForm} >Enregister</Button>
                            </div>
                        </form>
                    </div>
                    : 
                    <div className="col-9 col-sm-12 col-md-4 col-lg-3 register-a" style={{maxWidth: "fit-content"}}> 
                        <div className="d-flex justify-content-center m-2">
                        <IoMdCloseCircle className="fournisseur-close" color="red" size={30} onClick={()=>setClickedEq(0)}/>
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
                            <input 
                                className="form-control m-2" 
                                placeholder="Zone"
                                value={editValues.zone}
                                name='zone'
                                onChange={handleChange}
                                ref={zone} 
                            />
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
                    </div>
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
                <div className='container w-100 d-flex flex-column align-items-center navigation'>
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
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