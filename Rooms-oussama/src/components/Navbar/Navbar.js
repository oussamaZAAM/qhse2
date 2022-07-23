import React from "react";

export default function Navbar() {
    return(
        <div className="navbar">
            <ul className="navbar-list">
                <li className="navbar-li">
                    <img className="navbar-logo" src="" />
                </li>
                <li className="navbar-li">
                    <input className="navbar-search" placeholder="Search Rooms..." />
                </li>
                <li className="navbar-li">
                    <div>
                        <></>
                        <></>
                    </div>
                </li>
                <li className="navbar-li">
                    <div className="navbar-user">
                        <img className="profileimage" src="" />
                        <p>Username</p>
                    </div>
                </li>
            </ul>
        </div>
    )
}