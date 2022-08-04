import React, { useRef, useContext, useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import {Button} from 'react-bootstrap';
import { AuthContext } from "../../Context/authContext";
import Fournisseurs from '../../components/Fournisseurs/Fournisseurs.js';
import "./Fournisseurs.css";

export default function Fournisseur() {
    const code_fourn = useRef();
    const raison_soc = useRef();
    const ville = useRef();
    const pays = useRef();
    const tel = useRef();
    const mail = useRef();
    const { user } = useContext(AuthContext);
    const [fours, setFours] = useState();

    useEffect(() => {
        const fetchFours = async () => {
          if (user) {
            const res = await axios.get("http://localhost:5000/api/fournisseur/a/" + user._id);
            setFours(
              res.data
            );
          }
        };
        fetchFours();
      }, [user._id]);

    const userFournisseur= async (e)=>{
        e.preventDefault();
        const fournisseur = {user:user._id,code_fourn:code_fourn.current.value, raison_soc:raison_soc.current.value,ville:ville.current.value,pays:pays.current.value,tel:parseInt(tel.current.value),mail:mail.current.value}
        try{
            await axios.post("http://localhost:5000/api/fournisseur/create",fournisseur);
            window.location.reload()
                }catch(err){
                console.log(err)        
        }
    }
    const fournisseurs = fours!==undefined && fours.map((x, i)=>{
        return(
            <Fournisseurs 
              num={i+1}
              key={x._id}
              fourId={x}
            />
           
        )
    })
    return(
        <main className="background vertical-center new-organism-main" >
            <div className="container p-5 rounded">
            <div className="row">
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
                      {fournisseurs}
                    </tbody>
                  </table>
                )}
                </div>
                
                <div className="col-9 col-sm-12 col-md-4 col-lg-3 register-a" style={{maxWidth: "fit-content"}}> 
                    <h1 className="text-prime pb-5">Ajouter un Fournisseur</h1>
                    <form className="form-group ">
                        <input className="form-control m-2" placeholder="Code Fournisseur" ref={code_fourn}/>
                        <input className="form-control m-2" placeholder="Raison Social" ref={raison_soc} />
                        <input className="form-control m-2" placeholder="Pays" ref={pays} />
                        <input className="form-control m-2" placeholder="Ville" ref={ville} />
                        <input className="form-control m-2" placeholder="Tél." ref={tel} />
                        <input className="form-control m-2" placeholder="Mail" ref={mail} />
                        <div className="d-flex justify-content-end m-2">
                        <Button className="bg-prime" onClick={userFournisseur} >Enregister</Button>
                        </div>
                    </form>
                    
                </div>
            </div>
            </div>
        </main>
    )
}