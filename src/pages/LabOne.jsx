// HOOKS
import React, {useState} from "react";

// COMPONENTS
import NavBar from "../components/NavBar";

// STYLING
import "../cssFiles/LabOne.css";

// ICONS
import emptyAvatar from "../assets/avatars/emptyAvatar.png";

export default function LabOne(){
    const username = localStorage.getItem("username") || "User";
    const avatar = localStorage.getItem("avatar") || emptyAvatar;

    // INPUT STATE
    const [currentRepayment, setCurrentRepayment] = useState(3800);
    const [newRepayment, setNewRepayment] = useState(7500);
    const [insurance, setInsurance] = useState(1200);
    const [newInsurance, setNewInsurance] = useState(1680);
    const [returnRate, setReturnRate] = useState(10);
    const [timeHorizon, setTimeHorizon] = useState(5);

    // RESULTS STATE
    const [results, setResults] = useState(null);

    {/* CALCULATION FOR SIMULATE  */}     
    function handleSimulate() {
        const months = timeHorizon * 12;
        const monthlyRate = returnRate / 100 / 12;
        const diff = newRepayment - currentRepayment;
        const insuranceDiff = newInsurance - insurance;

        // Path A — extra cost of upgrading
        const pathACost = diff * months;

        // Path B — investing the difference with compound growth
        const pathBValue = diff * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

        // Insurance total over period
        const totalInsurance = insuranceDiff * months;

        // Depreciation — new car loses ~17.5% avg per year
        const newCarPrice = newRepayment * 60; // rough estimate
        const depreciatedValue = newCarPrice * Math.pow(1 - 0.175, timeHorizon);

        const difference = pathBValue - pathACost;

        setResults({
            diff,
            pathACost,
            pathBValue,
            difference,
            totalInsurance,
            depreciatedValue,
            timeHorizon,
            returnRate,
        });
    }



    return(
        <div className="lab-one-page">

            {/* NAVIGATION */}
            <NavBar />

                                  
            <div className="lab-one-content">
                
                {/* HEADER */}     
                <section className="lab-one-header">
                    <div className="lab-one-user">
                        <img src={avatar} alt="user avatar" className="lab-one-avatar" />
                        <p className="lab-one-username">{username}</p>
                    </div>
                    
                    <div className="lab-one-title">
                        <h1> Car Upgrade vs Invest the Difference </h1> 
                    </div>
                </section>

                <section className="lab-info-tab">
                    <p>
                        This lab is built for the user who is considering upgrading their 
                        current vehicle to a more expensive one. It takes the financial 
                        difference between what they currently pay and what they would 
                        pay on the upgraded vehicle and shows them two possible futures 
                        for that money → one where it goes toward the new car, and one 
                        where it gets invested instead. 
                    </p>
                </section>

                {/* USER INPUT SECTION */} 
                <section className="lab-simulation">

                   <div className="lab-input-grid">

                        {/* CURRENT CAR MONTHLY REPAYMENT PRICE */} 
                        <div className="lab-input-tile">
                            <p className="lab-input-label">Current Car Monthly Repayment</p>
                            <input
                                type="number"
                                className="lab-input-field"
                                value={currentRepayment}
                                onChange={(e) => setCurrentRepayment(parseFloat(e.target.value))}
                            />
                        </div>

                        {/* NEW CAR MONTHLY REPAYMENT PRICE */} 
                        <div className="lab-input-tile">
                            <p className="lab-input-label">New Car Monthly Repayment Price</p>
                            <input
                                type="number"
                                className="lab-input-field"
                                value={newRepayment}
                                onChange={(e) => setNewRepayment(parseFloat(e.target.value))}
                            />
                        </div>

                        {/* MONTHLY INSURANCE PRICE */} 
                        <div className="lab-input-tile">
                            <p className="lab-input-label">Monthly Insurance Price</p>
                                <input
                                	type="number"
                                    className="lab-input-field"
                                	value={insurance}
                                	onChange={(e) => setInsurance(parseFloat(e.target.value))}
                            	/>
                        </div>

                        {/* ESTIMATED NEW CAR INSURANCE PRICE */} 
                        <div className="lab-input-tile">
                            <p className="lab-input-label">Estimated New Car Insurance Price</p>
                            <input
                                type="number"
                                className="lab-input-field"
                                value={newInsurance}
                                onChange={(e) => setNewInsurance(parseFloat(e.target.value))}
                            />
                        </div>

                        {/* INVESTMENT RETURN RATES (% PER ANNUM) */} 
                        <div className="lab-input-tile">
                            <p className="lab-input-label">Investment Return Rate (% per annum)</p>
                            <p className="lab-slider-value">{returnRate} %</p>
                            <input
                                type="range"
                                min="5"
                                max="20"
                                step="1"
                                value={returnRate}
                                onChange={(e) => setReturnRate(parseFloat(e.target.value))}
                                className="lab-slider"
                            />
                        </div>

                        <div className="lab-input-tile lab-time-horizon">
                            <p className="lab-input-label">Time Horizon (years)</p>
                            <p className="lab-slider-value">{timeHorizon} years</p>

                            <input
                                type="range"
                                min="3"
                                max="10"
                                step="1"
                                value={timeHorizon}
                                onChange={(e) => setTimeHorizon(parseFloat(e.target.value))}
                                className="lab-slider"
                            />
                        </div>
                    </div>

                    {/* SIMULATE BUTTON*/}
                    <div className="lab-bottom-row">
                        <button className="lab-simulate-button" onClick={handleSimulate}>
                            SIMULATE
                        </button>
                    </div>
                </section>

                {/*WHAT HAPPENS WHEN SIMULATE IS CLICKED*/}
                {results && (
                    <>
                        {/*EXPLAINERY LAYER FEATURE - EDUCATIONAL CONTENT*/}
                        <section className="lab-educational">
                            <h2>Educational Content</h2>
                            <p> 
                                Vehicle finance in South Africa is calculated at prime-linked interest 
                                rates,currently sitting at approximately 11.75% p/a. Insurance premiums
                                for high-value vehicles in Gauteng are significantly elevated due to 
                                theft and hijacking statistics. Depreciation on new vehicles in 
                                South Africa averages 15–20% in the first year alone.
                            </p>
                        </section>

                        {/* PATH CARDS */}
                        <section className="lab-paths">

                            <div className="lab-path-card path-a">
                                <div className="lab-path-header">
                                    <h3>PATH A</h3>
                                    <p>UPGRADE CAR</p>
                                </div>
                                <div className="lab-path-body">
                                    <p className="lab-path-metric-label">Extra monthly cost</p>
                                    <p className="lab-path-metric-value">R {results.diff.toLocaleString("en-ZA")}</p>
                                    <p className="lab-path-metric-label">Total extra cost over period</p>
                                    <p className="lab-path-metric-value">R {Math.round(results.pathACost).toLocaleString("en-ZA")}</p>
                                </div>
                            </div>

                            <div className="lab-path-card path-b">
                                    <div className="lab-path-header">
                                    <h3>PATH B</h3>
                                    <p>KEEP OLD CAR, INVEST DIFFERENCE</p>
                                </div>
                                <div className="lab-path-body">
                                    <p className="lab-path-metric-label">Monthly investment</p>
                                    <p className="lab-path-metric-value">R {results.diff.toLocaleString("en-ZA")}</p>
                                    <p className="lab-path-metric-label">Investment value at the end</p>
                                    <p className="lab-path-metric-value">R {Math.round(results.pathBValue).toLocaleString("en-ZA")}</p>
                                    <p className="lab-path-metric-label">Difference vs Path A</p>
                                    <p className="lab-path-metric-value">R {Math.round(results.difference).toLocaleString("en-ZA")} ahead</p>
                                </div>
                            </div>

                            {/*VISUAL BARS*/}
                            <section className="lab-bars">

                                <div className="lab-bar-row">
                                    <p className="lab-bar-label">Path A Total Cost</p>
                                    <div className="lab-bar-track">
                                        <div
                                            className="lab-bar-fill path-a-fill"
                                            style={{
                                                width: `${(results.pathACost / Math.max(results.pathACost, results.pathBValue)) * 100}%`
                                            }}
                                        >
                                            <span>R {Math.round(results.pathACost).toLocaleString("en-ZA")}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="lab-bar-row">
                                    <p className="lab-bar-label">Path B Investment</p>
                                    <div className="lab-bar-track">
                                        <div
                                            className="lab-bar-fill path-b-fill"
                                            style={{
                                                width: `${(results.pathBValue / Math.max(results.pathACost, results.pathBValue)) * 100}%`
                                            }}
                                        >
                                            <span>R {Math.round(results.pathBValue).toLocaleString("en-ZA")}</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* LAB VERDICT */}
                            <section className="lab-verdict">
                                <p className="lab-verdict-title">LAB VERDICT</p>
                                <p className="lab-verdict-text">
                                    Upgrading your car costs you an extra 
                                    R {Math.round(results.pathACost).toLocaleString("en-ZA")} over  
                                    {results.timeHorizon} years. Investing that same amount monthly 
                                    at {results.returnRate}% p/a grows to 
                                    R {Math.round(results.pathBValue).toLocaleString("en-ZA")}. The 
                                    investment leaves you 
                                    R {Math.round(results.difference).toLocaleString("en-ZA")} better 
                                    off. This car cost is excluding the 
                                    R {Math.round(results.totalInsurance).toLocaleString("en-ZA")} that
                                    will go to insurance over the span of {results.timeHorizon} years. 
                                    Not to mention that the car will have depreciated to roughly 
                                    R {Math.round(results.depreciatedValue).toLocaleString("en-ZA")}.
                                </p>        
                            </section>

                        </section>
                    </>
                )}
            </div>        
        </div>
    );
}