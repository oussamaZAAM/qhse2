import React, { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../Context/authContext";
import {Link} from "react-router-dom"
import { Button } from "react-bootstrap";
import "./Main.css"


export default function Main() {

    return(
        <main className="pt-5 mt-5">
            <div className="container p-5 rounded">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="row col-12 col-sm-12 col-md-6 col-lg-5 d-flex b justify-content-center align-items-center pos1">
                        <h1 className="col-12 text-center text-prime pb-3">Améliorez votre Efficacité et Productivité</h1>
                        <Link className="text-decoration-none col-3 " to="../Login"><button className="c2a"><b>Commencer</b></button></Link>
                    </div>
                    
                    <div className="col-12 col-sm-12 col-md-7 col-lg-7 pos2"> 
                           <img src="https://i.postimg.cc/YSw-Brxz2/the-one.png" className="col-12 "  width="250"></img>  
                    </div>
                </div>
            </div>
        </main>

    )
}