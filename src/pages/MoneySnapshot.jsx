// HOOKS
import React from "react";

// COMPONENTS
import NavBar from "../components/NavBar";
import PersonalisedHeader from "../components/PersonalisedHeader";
import CurrentBalanceTile from "../components/CurrentBalanceTile";
import FixedCostsTracker from "../components/FixedCostsTracker";


// STYLING
import "../cssFiles/MoneySnapshot.css";

export default function MoneySnapshot() {
    return (
        <div className="snapshot-page">
            {/* NAVIGATION */}
            <NavBar />
     
            {/* MAIN CONTENT */}
            <div className="snapshot-content">
                                
                {/* TOP - header details + balance  */}
                <div className="snapshot-top">
                    <PersonalisedHeader />
                    <CurrentBalanceTile />
                </div>

                
                {/* MIDDLE ROW - tracker + money left */}
                <div className="snapshot-middle">
                    <FixedCostsTracker />
                </div>

            </div>


        </div>
    );
}