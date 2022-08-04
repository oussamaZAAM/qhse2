import React, { useRef, useContext } from "react";
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import {Button} from 'react-bootstrap';
import { AuthContext } from "../../Context/authContext";

export default function NewOrganism() {
    const code_fourn = useRef();
    const raison_soc = useRef();
    const ville = useRef();
    const pays = useRef();
    const tel = useRef();
    const mail = useRef();
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const userFournisseur= async (e)=>{
        e.preventDefault();
        const fournisseur = {user:user._id,code_fourn:code_fourn.current.value, raison_soc:raison_soc.current.value,ville:ville.current.value,pays:pays.current.value,tel:parseInt(tel.current.value),mail:mail.current.value}
        try{
            await axios.post("http://localhost:5000/api/fournisseur/create",fournisseur);
            navigate("/main");

        }catch(err){
                console.log(err)        
        }
    }
   
    return(
        <main className="jumbotron vertical-center new-organism-main" >
            <div className="container p-5 rounded">
            
                
                <div className="register-a" style={{maxWidth: "fit-content"}}> 
                    <h1 className="text-prime pb-5">Ajouter Fournisseur</h1>
                    <form className="form-group ">
                        <input className="form-control m-2" placeholder="Code Fournisseur" ref={code_fourn}/>
                        <input className="form-control m-2" placeholder="Raison Social" ref={raison_soc} />
                        <input className="form-control m-2" placeholder="Pays" ref={pays} />
                        <input className="form-control m-2" placeholder="Ville" ref={ville} />
                        <input className="form-control m-2" placeholder="Tel." ref={tel} />
                        <input className="form-control m-2" placeholder="Mail" ref={mail} />
                        <div className="d-flex justify-content-end m-2">
                        <Button className="bg-prime" onClick={userFournisseur} >Enregister</Button>
                        </div>
                    </form>
                    
                </div>
            </div>
            
        </main>
    )
}