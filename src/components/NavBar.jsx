// HOOKS
import React from "react";
import {Link, useLocation} from "react-router-dom"

// IMPORTING MY ICONS
import NavBarABSALogo from "../assets/icons/NavBarABSALogo.png";
const Logo = NavBarABSALogo;

// STYLING
import "../cssFiles/NavBar.css";

export default function NavBar(){
    const location = useLocation();

 
    return (
    <nav className="side-bar">
        <img src={Logo} alt="NavBar ABSA Logo" className="logo"/>
        
        <div className="nav-links"> 
            <Link 
                to ="/MoneySnapshot" className={`nav-item ${location.pathname === "/MoneySnapshot" ? "active" : ""}`} > Money Snapshot
            </Link>


            <Link 
                to ="/StrategyTracks" className={`nav-item ${location.pathname === 
                "/StrategyTracks" ? "active" : ""}`}> Strategy Tracks
            </Link>

            <Link 
                to ="/SimulationStudio" className={`nav-item ${location.pathname === 
                "/SimulationStudio" ? "active" : ""}`}> Simulation Studio
            </Link>
        </div>

        <div className="nav-bottom">
            <Link 
                to ="/Profile" className={`nav-item ${location.pathname ===
                 "/Profile" ? "active" : ""}`}> Profile 
            </Link>

            <Link to ="/" className="nav-item" > Logout </Link>
        </div>
    </nav>
    );

}