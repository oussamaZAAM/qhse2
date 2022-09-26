import React, { useRef, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { ObjectId } from "bson";

import 'bootstrap/dist/css/bootstrap.css';
import {Button} from 'react-bootstrap';
import "./Fournisseurs.css";

import { AuthContext } from "../../Context/authContext";
import Fournisseurs from '../../components/Fournisseurs/Fournisseurs.js';

import { IoMdCloseCircle } from "react-icons/io";
import Typography from '@mui/material/Typography';
import { MuiTelInput, isValidPhoneNumber } from 'mui-tel-input';
import Snackbar from '@mui/material/Snackbar';
import Alert from "../../components/Alert/Alert";
import { AiFillCaretDown,AiFillCaretUp } from 'react-icons/ai'
import { Skeleton } from "@mui/material";
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Fournisseur() {
    const code_four = useRef();
    const raison_soc = useRef();
    const ville = useRef();
    const pays = useRef();
    const mail = useRef();
    const { user } = useContext(AuthContext);

    const [fours, setFours] = useState();
    const [clickedFour, setClickedFour] = useState(0);
    const [editValues, setEditValues] = useState();
    const [tel, setTel] = useState('');
    const [isTelValid, setIsTelValid] = useState(false);
    const [openAlert, setOpenAlert] = useState([false, false, false, false]);
    const [loading, setLoading] = useState(false);


    const handleCloseAlert = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenAlert([false, false, false, false]);
    };

    useEffect(() => {
      const fetchFours = async () => {
        if (user) {
          const res = await axios.get("http://localhost:5000/api/fournisseur/a/" + user._id);
          setFours(res.data);
          setEditValues(res.data[clickedFour]);
          clickedFour !==0 && setTel(res.data[clickedFour].tel);
        }
      };
      fetchFours();
    }, [user._id]);
    const userFournisseur= async (e)=>{
      setLoading(true);
      if (isTelValid){
        var id = new ObjectId();
        const fournisseur = {_id: id.toString(), user:user._id,code_four:code_four.current.value, raison_soc:raison_soc.current.value,ville:ville.current.value,pays:pays.current.value,tel:tel,mail:mail.current.value}
        if (Object.keys(fournisseur).every(x=>fournisseur[x] !== '')){
          try{
              await axios.post("http://localhost:5000/api/fournisseur/create",fournisseur);
              setFours(prevArray=>[...prevArray, fournisseur]);
          }catch(err){
              console.log(err)        
          }
        } else {
          setOpenAlert([false, false, false, true]);
        }
      } else {
        setOpenAlert([false, true, false, false]);
      }
      setLoading(false);
    }
    const editFournisseur= async (e)=>{
      setLoading(true);
      if (Object.keys(editValues).every(x=>editValues[x] !== '')){
        if(isTelValid) {
          try{
              await axios.put("http://localhost:5000/api/fournisseur/"+editValues._id, editValues);
              setFours(prevFours=>{
                const newFours = prevFours.map(x=>{
                  if (prevFours.indexOf(x) === clickedFour - 1){
                    return editValues;
                  } else {
                    return x;
                  }
                })
                return newFours;
              });
              setClickedFour(0);
              setTel('');
              setIsTelValid(false);
              setOpenAlert([true, false, false, false]);
          }catch(err){
              console.log(err)        
          }
        } else {
          setOpenAlert([false, true, false, false]);
        }
      } else {
        setOpenAlert([false, false, true, false]);
      }
      setLoading(false);
    }
    const deleteFournisseur= async (e)=>{
        setLoading(true);
        try{
            await axios.delete("http://localhost:5000/api/fournisseur/" + editValues._id);
            setClickedFour(0);
            setTel('');
            setIsTelValid(false);
            setFours(prevArray=>{
              const deletedArray = prevArray.filter(x=>x._id !== editValues._id);
              return deletedArray;
            })
            setLoading(false);
        }catch(err){
            console.log(err)        
        }
    }
    function handleClick(num) {
      setClickedFour(num);
      setIsTelValid(true);
      setEditValues(fours[num-1])
      setTel(fours[num-1].tel)
    }
    function handleChange(e) {
      setEditValues({...editValues, [e.target.name]: e.target.value});
    }
    const handleChangeTel = (newValue) => {
      setIsTelValid(isValidPhoneNumber(newValue))
      setEditValues({...editValues, tel: newValue})
      setTel(newValue)
    }
    const fournisseurs = fours!==undefined && fours.map((x, i)=>{
        return(
            <Fournisseurs 
              num={i+1}
              key={x._id}
              fourId={x}
              handleClick={handleClick}
            />
        )
    })
    return(
        <main className="background  new-organism-main" >
            <div className="container rounded ">
              
              
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
                  <h1>Liste des Fournisseurs</h1>
                  {fournisseurs.length!==0 && (
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th className="text-center" scope="col-4">Numéro</th>
                        <th className="text-center" scope="col-4">Code</th>
                        <th className="text-center" scope="col-4">Raison</th>
                        <th className="text-center" scope="col-4">Pays</th>
                        <th className="text-center" scope="col-4">Ville</th>
                        <th className="text-center" scope="col-4">Téléphone</th>
                        <th className="text-center" scope="col-4 ">Mail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fours !== undefined 
                        ? fournisseurs
                        : <tr className="sortable">
                            <td className="text-center"><Skeleton animation="wave" /></td>
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
                )}
                </div>
                {clickedFour===0 ?
                (<div className="col-9 col-sm-12 col-md-4 col-lg-3 register-a" style={{maxWidth: "fit-content"}}>
                    <h1 className="text-prime pb-5">Ajouter un Fournisseur</h1>
                    <form className="form-group">
                        <input className="form-control m-2" placeholder="Code Fournisseur" ref={code_four}/>
                        <input className="form-control m-2" placeholder="Raison Social" ref={raison_soc} />
                        <input className="form-control m-2" placeholder="Pays" ref={pays} />
                        <input className="form-control m-2" placeholder="Ville" ref={ville} />
                        <div className='form-control m-2 d-flex flex-column justify-content-center align-items-end'>
                          <MuiTelInput label='Téléphone' value={tel} onChange={handleChangeTel} />
                          <Typography>Téléphone Valide ? {isTelValid 
                             ? <b className='text-success'>Oui</b>
                             : <b className='text-danger'>Non</b>}
                          </Typography>
                        </div>
                        <input className="form-control m-2" placeholder="Mail" ref={mail} />
                        <div className="d-flex justify-content-end m-2">
                        <Button className="bg-prime" onClick={userFournisseur} >Enregister</Button>
                        </div>
                    </form>
                </div>)
                : (
                  <div className="col-9 col-sm-12 col-md-4 col-lg-3 register-a" style={{maxWidth: "fit-content"}}> 
                    <div className="d-flex justify-content-center m-2">
                      <IoMdCloseCircle className="fournisseur-close" color="red" size={30} onClick={()=>{
                        setClickedFour(0);
                        setIsTelValid(false)
                        setTel('');}} />
                    </div>
                    <h1 className="text-prime pb-5">Fournisseur numéro: {clickedFour}</h1>
                    <form className="form-group">
                        <input 
                          className="form-control m-2" 
                          placeholder="Code Fournisseur" 
                          value={editValues.code_four}
                          name='code_four'
                          onChange={handleChange}
                          ref={code_four}
                        />
                        <input 
                          className="form-control m-2" 
                          placeholder="Raison Social"
                          value={editValues.raison_soc}
                          name='raison_soc'
                          onChange={handleChange}
                          ref={raison_soc} 
                        />
                        <input 
                          className="form-control m-2" 
                          placeholder="Pays"
                          value={editValues.pays}
                          name='pays'
                          onChange={handleChange}
                          ref={pays} 
                        />
                        <input 
                          className="form-control m-2" 
                          placeholder="Ville"
                          value={editValues.ville}
                          name='ville'
                          onChange={handleChange}
                          ref={ville} 
                        />
                        <div className='form-control m-2 d-flex flex-column justify-content-center align-items-end'>
                          <MuiTelInput label="Téléphone" value={tel} onChange={handleChangeTel} />
                          <Typography>Téléphone Valide ? {isTelValid
                             ? <b className='text-success'>Oui</b>
                             : <b className='text-danger'>Non</b>}
                          </Typography>
                        </div>
                        <input 
                          className="form-control m-2" 
                          placeholder="Mail"
                          value={editValues.mail}
                          name='mail'
                          onChange={handleChange}
                          ref={mail} 
                        />
                        <div className="d-flex justify-content-end m-2">
                        {clickedFour === 0 
                          ? <Button className="bg-prime" onClick={userFournisseur} >Enregister</Button>
                          : <div className="d-flex justify-content-center align-items-center">
                              <Button className="bg-prime mx-2" onClick={editFournisseur} >Modifier</Button>
                              <Button className="bg-danger" onClick={deleteFournisseur} >Supprimer</Button>
                            </div>
                        }
                        </div>
                    </form>
                </div>
                )}
                {openAlert[0] && 
                  <Snackbar sx={{width: '35%'}} open={true} autoHideDuration={2000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                      Modification Validée
                    </Alert>
                  </Snackbar>
                }
                {openAlert[1] && 
                  <Snackbar sx={{width: '35%'}} open={true} autoHideDuration={2000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="warning" sx={{ width: '100%' }}>
                      Téléphone Non Validé!
                    </Alert>
                  </Snackbar>
                }
                {openAlert[2] && 
                  <Snackbar sx={{width: '35%'}} open={true} autoHideDuration={3000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                      Veuillez Entrer toutes les Informations!
                    </Alert>
                  </Snackbar>
                }
                {openAlert[3] && 
                  <Snackbar sx={{width: '35%'}} open={true} autoHideDuration={3000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                      Veuillez Entrer toutes les Informations!
                    </Alert>
                  </Snackbar>
                }
              </div>
            </div>
        </main>
    )
}