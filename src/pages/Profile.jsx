// HOOKS
import React from "react";

// COMPONENTS
import NavBar from "../components/NavBar";

// STYLING
import "../cssFiles/Profile.css";

export default function Profile(){
    
    return(
        <div className="profile-page">

            {/* NAVIGATION */}
            <NavBar />
                    
            <div className="profile-content">
                <h1>PROFILE PAGEE</h1>                         
            </div>
            
        </div>
    );
}