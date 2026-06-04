// HOOKS
import React from "react";

// COMPONENTS
import NavBar from "../components/NavBar";

// STYLING
import "../cssFiles/LabThree.css";

export default function LabThree(){
    
    return(
        <div className="lab-three-page">

            {/* NAVIGATION */}
            <NavBar />
                    
            <div className="lab-three-content">
                <h1>LAB THREE</h1>                         
            </div>
            
        </div>
    );
}