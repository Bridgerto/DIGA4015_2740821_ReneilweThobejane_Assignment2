// HOOKS
import React from "react";

// COMPONENTS
import NavBar from "../components/NavBar";

// STYLING
import "../cssFiles/LabOne.css";

// ICONS
import emptyAvatar from "../assets/avatars/emptyAvatar.png";

export default function LabOne(){
    const username = localStorage.getItem("username") || "User";
    const avatar = localStorage.getItem("avatar") || emptyAvatar;

    return(
        <div className="lab-one-page">

            {/* NAVIGATION */}
            <NavBar />

                                  
            <div className="lab-one-content">
                {/* NAVIGATION */}
          
                <section className="lab-one-header">
                    <div className="lab-one-user">
                        <img src={avatar} alt="user avatar" className="lab-lab-avatar" />
                        <p className="lab-one-username">{username}</p>
                    </div>
                    
                    <div className="simulation-studio-title">
                        <h1>LAB ONE </h1> 
                    </div>
                </section>

                <section className="info-tab">
                    <p>
                        This lab is built for the user who is considering upgrading their 
                        current vehicle to a more expensive one. It takes the financial 
                        difference between what they currently pay and what they would 
                        pay on the upgraded vehicle and shows them two possible futures 
                        for that money → one where it goes toward the new car, and one 
                        where it gets invested instead. 
                    </p>
                </section>

                <section className="lab-simulation">

                    <div classname="block-one"></div>

                    <div classname="block-two"></div>
                    
                    <div classname="block-three"></div>

                </section>

            </div>
            
        </div>
    );
}