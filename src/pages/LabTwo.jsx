// HOOKS
import React from "react";

// COMPONENTS
import NavBar from "../components/NavBar";

// STYLING
import "../cssFiles/LabTwo.css";

export default function LabOne(){
    
    return(
        <div className="lab-two-page">

            {/* NAVIGATION */}
            <NavBar />
                    
            <div className="lab-two-content">
                <h1>LAB TWO</h1>                         
            </div>
            
        </div>
    );
}