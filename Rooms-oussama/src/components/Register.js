import React, { useRef, useContext } from "react";
import { registerCall } from "../apiCalls";
import { AuthContext } from "../Context/authContext";
import {Link} from "react-router-dom"

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const rePassword = useRef();
    const {user, isFetching, error, dispatch} = useContext(AuthContext)

    const userRegister= (e)=>{
        e.preventDefault();
        if(password.current.value==rePassword.current.value){
            registerCall({username:username.current.value, email:email.current.value,password:password.current.value}, dispatch)
        }
    }
    return(
        <main>
            <div className="login-card">
                <div className="rooms"><h1>Rooms</h1></div>
                <div> 
                    <form className="login-form">
                        <input className="login-input" placeholder="Username" ref={username}/>
                        <input className="login-input" placeholder="Email Adress" ref={email} />
                        <input className="login-input" type="password" placeholder="Password" ref={password} />
                        <input className="login-input" type="password" placeholder="Verify Password" ref={rePassword} />
                        <input className="login-submit" value="Register" type="submit" onClick={userRegister} />
                    </form>
                    <h5 className="login-suggest">Have an account already? <span><Link to="../Login">Login</Link></span></h5>
                </div>
            </div>
        </main>
    )
}