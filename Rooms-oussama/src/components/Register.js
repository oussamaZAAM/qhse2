import React, { useRef, useContext } from "react";
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import {Button} from 'react-bootstrap';

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const rePassword = useRef();
    const navigate = useNavigate();

    const userRegister= async (e)=>{
        e.preventDefault();
        
        if(password.current.value==rePassword.current.value){
            const user = {name:username.current.value, email:email.current.value,password:password.current.value}
            try{
                await axios.post("http://localhost:5000/api/user/register",user);
                navigate("/login");

            }catch(err){
                 console.log(err)        
            }
        } 
    }
   
    return(
        <main className="jumbotron vertical-center" >
            <div className="container bg-success p-5 rounded">
            <div className=" row">
                <div className=" col-6 d-flex justify-content-center align-items-center"><h1>Rooms</h1></div>
                <div className="col-1"></div>
                <div className="col-4  justify-content-center align-items-center"> 
                    <form className="form-group ">
                        <input className="form-control m-2" placeholder="nickname" ref={username}/>
                        <input className="form-control m-2" placeholder="Email Adress" ref={email} />
                        <input className="form-control m-2" type="password" placeholder="Password" ref={password} />
                        <input className="form-control m-2" type="password" placeholder="Verify Password" ref={rePassword} />
                        <div className="d-flex justify-content-end m-2">
                        <Button onClick={userRegister} >Register</Button>
                        </div>
                    </form>
                    <h5 className="login-suggest">Have an account already? <span><Link to="../Login">Login</Link></span></h5>
                </div>
            </div>
            </div>
        </main>
    )
}