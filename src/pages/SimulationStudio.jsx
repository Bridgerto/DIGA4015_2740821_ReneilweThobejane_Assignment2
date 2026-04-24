import React from "react";

// COMPONENTS
import NavBar from "../components/NavBar";

// STYLING
import "../cssFiles/SimulationStudio.css";

export default function SimulationStudio(){
    
    return(
        <div className="simulation-studio-page">

            {/* NAVIGATION */}
            <NavBar />
           
            <div className="simulation-studio-content">
               <h1>SIMULATION STUDIO PAGE</h1>                         
            </div>
        </div>
    );
}