// HOOKS
import React from "react";
import {Link} from "react-router-dom"

// IMPORTING MY ICONS
import NavBarABSALogo from "../assets/icons/NavBarABSALogo.png";
const Logo = NavBarABSALogo;

// STYLING
import "../cssFiles/NavBar.css";

export default function NavBar(){


    return (
    <nav className="side-bar">
        <img src={Logo} alt="NavBar ABSA Logo" className="logo"/>
        
        <div className="nav-links">
            <Link to ="/MoneySnapshot" className="nav-item active" > Money Snapshot</Link>
            <Link to ="/StrategyTracks" className="nav-item"> Strategy Tracks</Link>
            <Link to ="/SimulationStudio" className="nav-item"> Simulation Studio</Link>
        </div>

        <div className="nav-bottom">
            <Link to ="/Profile" className="nav-item"> Profile </Link>
            <Link to ="/" className="nav-item"> Logout </Link>
        </div>
    </nav>
    );
}