import React from "react";
import { Link } from "react-router-dom";

// COMPONENTS
import NavBar from "../components/NavBar";

// STYLING
import "../cssFiles/SimulationStudio.css";

// ICONS
import emptyAvatar from "../assets/avatars/emptyAvatar.png";

export default function SimulationStudio(){
    const username = localStorage.getItem("username") || "User";
    const avatar = localStorage.getItem("avatar") || emptyAvatar;

    return(
        <div className="simulation-studio-page">

            {/* NAVIGATION */}
            <NavBar />
           
            <div className="simulation-studio-content">
                       
                <section className="simulation-studio-header">
                    <div className="simulation-studio-user">
                        <img src={avatar} alt="user avatar" className="strategy-tracks-avatar" />
                        <p className="strategy-tracks-username">{username}</p>
                    </div>
                    
                    <div className="simulation-studio-title">
                        <h1>SIMULATION STUDIO PAGE</h1> 
                    </div>
                </section>
                
                <section className="simulation-studio-container">
                    <Link to="/Lab1" className="lab-item">
                        <img src="" alt="" className="lab-img"/>
                        <div  className="lab-info">
                            <h2>LAB 1: Car Upgrade VS Invest the Difference</h2>
                            <p>
                                This Studio is built for a user who is considering upgrading their current 
                                vehicle to a more expensive one. It takes the financial difference between 
                                what they currently pay and what they would pay on the upgraded vehicle, 
                                and shows them two possible futures for that money →  one where it goes 
                                toward the new car, and one where it gets invested instead.

                            </p>
                        </div>
                    </Link>

                    <Link to="/Lab2" className="lab-item">
                        <img src="" alt=""  className="lab-img"/>
                        <div className="lab-info">
                            <h2>LAB 2: Minimum Repayment VS Aggressive Debt Payoff </h2>
                            <p>
                                This Studio is built for the user who is carrying a significant debt obligation
                                and making their monthly repayment consistently  but has never stopped to 
                                interrogate what that minimum repayment is actually costing them over time. 
                                It takes the user's outstanding loan balance, their current monthly repayment, 
                                and shows them two possible futures.
                            </p>
                        </div>
                    </Link>

                    <Link to="/Lab3" className="lab-item">
                        <img src="" alt="" className="lab-img"/>
                        <div className="lab-info">
                            <h2>LAB 3: Renting VS Buying Property in Johannesburg</h2>
                            <p>
                                This Studio is built for the user who is at a crossroads between continuing 
                                to rent or taking the step toward purchasing their first property. It takes 
                                the user's current monthly rent, their target property purchase price, and 
                                available deposit, and shows them two possible futures: one where they 
                                continue renting and invest the difference.
                            </p>
                        </div>
                    </Link>
               </section>


            </div>
        </div>
    );
}