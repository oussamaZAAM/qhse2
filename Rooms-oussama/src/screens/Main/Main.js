import React, { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../Context/authContext";
import {Link} from "react-router-dom"
import { Button } from "react-bootstrap";
import "./Main.css"


export default function Main() {

    return(
        <main className="jumbotron vertical-center">
            <div className="container p-5 rounded">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="row col-12 col-sm-12 col-md-5 col-lg-5 d-flex b justify-content-center align-items-center">
                        {/* <img className="col-12" src="https://media.istockphoto.com/photos/imge-of-mint-picture-id619514634?k=20&m=619514634&s=612x612&w=0&h=0qd6aFtslmii-nfCiBxxIBQmAOqVVwm_iRq_vwYLAWw=" height="328" width="189"></img> */}
                        <h1 className="col-12 text-center text-prime">Améliorez votre Efficacité et Productivité</h1>
                    </div>
                
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 register-a"> 
                           <img src="https://photos.app.goo.gl/oXq6JNUBZrERSwobA" className="col-12" height="328" width="189"></img>  
                    </div>
                </div>
            </div>
        </main>

    )
}