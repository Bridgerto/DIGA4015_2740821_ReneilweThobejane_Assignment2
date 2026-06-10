// HOOKS
import React, {useState} from "react";

// COMPONENTS
import NavBar from "../components/NavBar";

// STYLING
import "../cssFiles/LabThree.css";

// ICONS
import emptyAvatar from "../assets/avatars/emptyAvatar.png";

export default function LabThree(){
    const username = localStorage.getItem("username") || "User";
    const avatar = localStorage.getItem("avatar") || emptyAvatar;
    
    // INPUT STATE
    const [monthlyRent, setMonthlyRent] = useState(12000);
    const [propertyPrice, setPropertyPrice] = useState(1800000);

    // PRELOADED STATE (sliders)
    const [rentalEscalation, setRentalEscalation] = useState(8);
    const [bondInterestRate, setBondInterestRate] = useState(11.75);
    const [appreciationRate, setAppreciationRate] = useState(5);

    // RESULTS STATE
     const [results, setResults] = useState(null);

    function handleSimulate() {

        const years = 5;
        const months = years * 12;

        // --- DEPOSIT & BOND ---
        const deposit = propertyPrice * 0.10;
        const bondAmount = propertyPrice - deposit;

        // --- MONTHLY BOND REPAYMENT (20 year bond) ---
        const bondMonthlyRate = bondInterestRate / 100 / 12;
        const bondTermMonths = 240; // 20 years
        const monthlyBondRepayment = bondAmount *
            (bondMonthlyRate * Math.pow(1 + bondMonthlyRate, bondTermMonths)) /
            (Math.pow(1 + bondMonthlyRate, bondTermMonths) - 1);

        // --- PATH A: BUYING ---

        // once-off entry costs
        const transferDuty = 46000;
        const bondRegistration = 35000;
        const entryFees = transferDuty + bondRegistration;

        // rates and levies over 5 years
        const monthlyRatesAndLevies = 3500;
        const totalRatesAndLevies = monthlyRatesAndLevies * months;

        // total bond repayments over 5 years
        const totalBondRepayments = monthlyBondRepayment * months;

        // total cost of buying over 5 years
        const pathACost = totalBondRepayments + entryFees + totalRatesAndLevies;

        // property value at year 5
        const propertyValueYear5 = propertyPrice * Math.pow(1 + appreciationRate / 100, years);

        // remaining bond balance after 60 payments
        let remainingBond = bondAmount;
        for (let i = 0; i < months; i++) {
            const interestCharge = remainingBond * bondMonthlyRate;
            remainingBond = remainingBond + interestCharge - monthlyBondRepayment;
        }

        // equity built
        const equityBuilt = propertyValueYear5 - remainingBond;

        // --- PATH B: RENTING ---

        // total rent paid with annual escalation
        let totalRentPaid = 0;
        let currentMonthlyRent = monthlyRent;
        for (let year = 0; year < years; year++) {
            totalRentPaid += currentMonthlyRent * 12;
            currentMonthlyRent = currentMonthlyRent * (1 + rentalEscalation / 100);
        }

        // monthly investment = difference between bond repayment and rent
        const monthlyInvestment = Math.max(0, monthlyBondRepayment - monthlyRent);

        // investment portfolio value at year 5
        const investmentMonthlyRate = 0.10 / 12;
        const investmentValue = monthlyInvestment *
            ((Math.pow(1 + investmentMonthlyRate, months) - 1) / investmentMonthlyRate);

        setResults({
            deposit,
            monthlyBondRepayment,
            totalBondRepayments,
            entryFees,
            totalRatesAndLevies,
            pathACost,
            propertyValueYear5,
            remainingBond,
            equityBuilt,
            totalRentPaid,
            monthlyInvestment,
            investmentValue,
            years,
        });
    }


    return(
        <div className="lab-three-page">

            {/* NAVIGATION */}
            <NavBar />
                    
            <div className="lab-three-content">
                
                {/*HEADER*/}
                <section className="lab-three-header">
                    <div className="lab-three-user">
                        <img src={avatar} alt="user avatar" className="lab-three-avatar" />
                        <p className="lab-three-username">{username}</p>
                    </div>

                    <div className="lab-three-title">
                        <h1> Renting vs Buying in Johannesburg </h1>                         
                    </div>
                </section>

                    <section className="lab-three-info-tab">
                    <p>
                      This Studio is built for the user who is at a crossroads between 
                      continuing to rent or taking the step toward purchasing their first 
                      property. It takes your current monthly rent, your target 
                      property purchase price, and available deposit, and shows you two 
                      possible futures: one where you continue renting and invest the 
                      difference, and one where you commit to a bond and begin building 
                      equity.
                    </p>
                </section> 

                {/*USER INPUT SECTION*/}
                <section className="lab-three-simulation">

                    <div className="lab-three-input-grid">
                        {/* MONTHLY RENT */}
                        <div className="lab-three-input-tile">
                            <p className="lab-three-input-label">Current Monthly Rent</p>
                            <input
                                type="number"
                                className="lab-three-input-field"
                                value={monthlyRent}
                                onChange={(e) => setMonthlyRent(parseFloat(e.target.value))}
                            />
                        </div>

                        {/* PROPERTY PURCHASE PRICE */}
                        <div className="lab-three-input-tile">
                            <p className="lab-three-input-label">Property Purchase Price</p>
                            <input
                                type="number"
                                className="lab-three-input-field"
                                value={propertyPrice}
                                onChange={(e) => setPropertyPrice(parseFloat(e.target.value))}
                            />
                        </div>

                        {/* ANNUAL RENTAL ESCALATION SLIDER */}
                        <div className="lab-three-input-tile">
                            <p className="lab-three-input-label">Annual Rental Escalation (%)</p>
                            <p className="lab-three-slider-value">{rentalEscalation} %</p>
                            <input
                                type="range"
                                min="3"
                                max="15"
                                step="0.5"
                                value={rentalEscalation}
                                onChange={(e) => setRentalEscalation(parseFloat(e.target.value))}
                                className="lab-three-slider"
                            />
                        </div>

                        {/* BOND INTEREST RATE SLIDER */}
                        <div className="lab-three-input-tile">
                            <p className="lab-three-input-label">Bond Interest Rate (% p/a)</p>
                            <p className="lab-three-slider-value">{bondInterestRate} %</p>
                            <input
                                type="range"
                                min="8"
                                max="18"
                                step="0.25"
                                value={bondInterestRate}
                                onChange={(e) => setBondInterestRate(parseFloat(e.target.value))}
                                className="lab-three-slider"
                            />
                        </div>

                        {/* PROPERTY APPRECIATION RATE SLIDER */}
                        <div className="lab-three-input-tile">
                            <p className="lab-three-input-label">Property Appreciation Rate (% p/a)</p>
                            <p className="lab-three-slider-value">{appreciationRate} %</p>
                            <input
                                type="range"
                                min="1"
                                max="15"
                                step="0.5"
                                value={appreciationRate}
                                onChange={(e) => setAppreciationRate(parseFloat(e.target.value))}
                                className="lab-three-slider"
                            />
                        </div>
                    </div>

                        {/* SIMULATE BUTTON */}
                        <div className="lab-three-bottom-row">
                            <button className="lab-three-simulate-button" onClick={handleSimulate}>
                                SIMULATE
                            </button>
                        </div>
                </section>

                {/*WHAT HAPPENS WHEN SIMULATE IS CLICKED*/}
                {results && (
                    <>
                        {/* EXPLAINERY LAYER FEATURE - EDUCATIONAL CONTENT */}
                        <section className="lab-three-educational">
                            <h2>Educational Content</h2>
                            <p>
                                Property transfer duties in South Africa are levied by SARS on
                                properties above R1,100,000. A property purchased at
                                R {propertyPrice.toLocaleString("en-ZA")} attracts a transfer
                                duty of approximately R46,000. Bond registration costs add a
                                further R30,000-R40,000. These once-off entry costs are
                                significant and are factored into this simulation's Year 1
                                calculations.
                            </p>
                        </section>

                        
                        {/* PATH CARDS */}
                        <section className="lab-three-paths">
                            <div className="lab-three-path-card path-a">
                                <div className="lab-three-path-header">
                                    <h3>PATH A</h3>
                                    <p>BUY THE PROPERTY</p>
                                </div>
                                <div className="lab-three-path-body-a">
                                    <p className="lab-path-metric-label">Deposit required</p>
                                    <p className="lab-path-metric-value">R {Math.round(results.deposit).toLocaleString("en-ZA")}</p>

                                    <p className="lab-path-metric-label">Monthly bond repayment</p>
                                    <p className="lab-path-metric-value">R {Math.round(results.monthlyBondRepayment).toLocaleString("en-ZA")}</p>

                                    <p className="lab-path-metric-label">Total cost over {results.years} years</p>
                                    <p className="lab-path-metric-value">R {Math.round(results.pathACost).toLocaleString("en-ZA")}</p>

                                    <p className="lab-path-metric-label">Property value at Year 5</p>
                                    <p className="lab-path-metric-value">R {Math.round(results.propertyValueYear5).toLocaleString("en-ZA")}</p>

                                    <p className="lab-path-metric-label">Equity built</p>
                                    <p className="lab-path-metric-value">R {Math.round(results.equityBuilt).toLocaleString("en-ZA")}</p>
                                </div>
                            </div>

                            <div className="lab-three-path-card path-b">
                                 <div className="lab-three-path-header">
                                    <h3>PATH B</h3>
                                    <p>CONTINUE RENTING & INVEST</p>
                                </div>
                                <div className="lab-three-path-body-b">
                                    <p className="lab-path-metric-label">Total rent paid over {results.years} years</p>
                                    <p className="lab-path-metric-value">R {Math.round(results.totalRentPaid).toLocaleString("en-ZA")}</p>
                                    <p className="lab-path-metric-label">Monthly amount invested</p>
                                    <p className="lab-path-metric-value">R {Math.round(results.monthlyInvestment).toLocaleString("en-ZA")}</p>
                                    <p className="lab-path-metric-label">Investment portfolio at Year 5</p>
                                    <p className="lab-path-metric-value">R {Math.round(results.investmentValue).toLocaleString("en-ZA")}</p>
                                </div>
                            </div>
                        </section>

                        {/* VISUAL BARS */}
                        <section className="lab-three-bars">
                            
                            <div className="lab-bar-row">
                                <p className="lab-bar-label">Path A Total Cost</p>
                                <div className="lab-bar-track">
                                    <div
                                        className="lab-bar-fill path-a-fill"
                                        style={{
                                            width: `${(results.pathACost / Math.max(results.pathACost, results.totalRentPaid)) * 100}%`
                                        }}
                                    >
                                        <span>R {Math.round(results.pathACost).toLocaleString("en-ZA")}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="lab-bar-row">
                                <p className="lab-bar-label">Path B Total Rent</p>
                                <div className="lab-bar-track">
                                    <div
                                        className="lab-bar-fill path-b-fill"
                                        style={{
                                            width: `${(results.totalRentPaid / Math.max(results.pathACost, results.totalRentPaid)) * 100}%`
                                        }}
                                    >
                                        <span>R {Math.round(results.totalRentPaid).toLocaleString("en-ZA")}</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* LAB VERDICT */}
                        <section className="lab-three-verdict">
                            <p className="lab-three-verdict-title">LAB VERDICT</p>
                            <p className="lab-three-verdict-text">
                                Buying the property costs
                                R {Math.round(results.pathACost).toLocaleString("en-ZA")} over {results.years} years
                                in bond repayments, rates and levies. Your property will be worth
                                approximately R {Math.round(results.propertyValueYear5).toLocaleString("en-ZA")} and
                                you will have built R {Math.round(results.equityBuilt).toLocaleString("en-ZA")} in
                                equity. Renting costs R {Math.round(results.totalRentPaid).toLocaleString("en-ZA")} over
                                the same period, and investing the difference grows
                                to R {Math.round(results.investmentValue).toLocaleString("en-ZA")}.
                                Buying builds more long-term wealth — but requires
                                R {Math.round(results.deposit).toLocaleString("en-ZA")} upfront and ties up your capital.
                            </p>
                        </section>
                    </>
                )}

            </div>
            
        </div>
    );
}