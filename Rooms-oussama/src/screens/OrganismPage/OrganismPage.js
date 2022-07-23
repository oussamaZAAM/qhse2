import React from 'react';
import Organism from '../../components/Organism/Organism';
import { Button } from 'react-bootstrap';
import {AiOutlinePlus} from "react-icons/ai"
import './OrganismPage.css'

export default function OrganismPage() {

    return(
        <div className='container-fluid'>
            <div className='row'>
                <div className="col-sm-4 col-md-6 col-lg-12 p-4">
                    <img className='logo-img' src="https://i.ibb.co/FHB2LVk/Whats-App-Image-2022-07-23-at-12-35-53-PM.jpg" width="250px"/>
                </div>
            </div>
            <div className='vertical-center justify-content-center'>
                <div className='row organisms-grid'>
                    <div className="col-auto col-sm-auto col-md-auto col-lg-auto mt-2">
                        <Organism />
                    </div>
                    <div className="col-auto col-sm-auto col-md-auto col-lg-auto mt-2">
                        <Organism />
                    </div>
                    <div className="col-auto col-sm-auto col-md-auto col-lg-auto mt-2">
                        <Organism />
                    </div>
                    <div className="col-auto col-sm-auto col-md-auto col-lg-auto mt-2">
                        <Organism />
                    </div>
                    <div className='col-auto col-sm-auto col-md-auto col-lg-auto mt-2'>
                        <AiOutlinePlus size={50} style={{borderRadius: "9px", border: "3px solid"}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}