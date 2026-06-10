// HOOKS
import React, {useState} from "react";

// COMPONENTS
import NavBar from "../components/NavBar";

// STYLING
import "../cssFiles/LabTwo.css";

// ICONS
import emptyAvatar from "../assets/avatars/emptyAvatar.png";

export default function LabOne(){
    const username = localStorage.getItem("username") || "User";
    const avatar = localStorage.getItem("avatar") || emptyAvatar;
    
    // INPUT STATE
    const [outstandingLoanBalance, setOutstandingLoanBalance] = useState(280000);
    const [currentRepayment, setCurrentRepayment] = useState(4800);
    const [additionalContribution, setAdditionalContribution] = useState(1000);
    const [interestRate, setInterestRate] = useState(13.25);

    // RESULTS STATE
    const [results, setResults] = useState(null);

    function calcLoanPayoff(balance, monthlyRepayment, annualRate) {
        const monthlyRate = annualRate / 100 / 12;

        // if repayment doesn't cover interest, loan never pays off
        if (monthlyRepayment <= balance * monthlyRate) {
            return { months: null, totalInterest: null };
        }

        let remaining = balance;
        let months = 0;
        let totalPaid = 0;

        while (remaining > 0 && months < 1200) {
            const interestCharge = remaining * monthlyRate;
            remaining = remaining + interestCharge - monthlyRepayment;
            totalPaid += monthlyRepayment;
            months++;
        }

        const totalInterest = totalPaid - balance;
        return { months, totalInterest, totalPaid };

     }

    {/* CALCULATION FOR SIMULATE  */}     
    function handleSimulate() {
        const aggressiveRepayment = currentRepayment + additionalContribution;

        const pathA = calcLoanPayoff(outstandingLoanBalance, currentRepayment, interestRate);
        const pathB = calcLoanPayoff(outstandingLoanBalance, aggressiveRepayment, interestRate);

        const monthsSaved = pathA.months - pathB.months;
        const interestSaved = pathA.totalInterest - pathB.totalInterest;

        setResults({
            pathA,
            pathB,
            aggressiveRepayment,
            monthsSaved,
            interestSaved,
            interestRate,
        });
    }


    return(
        <div className="lab-two-page">

            {/* NAVIGATION */}
            <NavBar />

            <div className="lab-two-content">

                {/*HEADER*/}
                <section className="lab-two-header">
                    <div className="lab-two-user">
                        <img src={avatar} alt="user avatar" className="lab-two-avatar" />
                        <p className="lab-two-username">{username}</p>
                    </div>

                    <div className="lab-two-title">
                        <h1> Minimum Repayment vs Aggressive Debt Payoff</h1>                         
                    </div>
                </section>

                <section className="lab-two-info-tab">
                    <p>
                        This Studio is built for you, in the case of begin someone who is carrying 
                        a significant debt obligation and making your monthly repayment 
                        consistently but has never stopped to interrogate what that minimum 
                        repayment is actually costing you over time. It takes your outstanding 
                        loan balance, your current monthly repayment, and shows you two possible 
                        futures → one where you continue at the same pace, and one where you increase 
                        your repayment by an additional monthly contribution.
                    </p>
                </section> 

                {/* USER INPUT SECTION */} 
                <section className="lab-two-simulation">

                    <div className="lab-two-input-grid">

                        {/* OUTSTANDING LOAN BALANCE */}
                        <div className="lab-two-input-tile">
                            <p className="lab-two-input-label">Outstanding Loan Balance</p>
                            <input
                                type="number"
                                className="lab-two-input-field"
                                value={outstandingLoanBalance}
                                onChange={(e) => setOutstandingLoanBalance(parseFloat(e.target.value))}
                            />
                        </div>

                        {/* CURRENT MONTHLY REPAYMENT OF LOAN */}
                        <div className="lab-two-input-tile">
                            <p className="lab-two-input-label">Current Monthly Repayment of Loan</p>
                            <input
                                type="number"
                                className="lab-two-input-field"
                                value={currentRepayment}
                                onChange={(e) => setCurrentRepayment(parseFloat(e.target.value))}
                            />
                        </div>

                        {/* ADDITIONAL MONTHLY CONTRIBUTION */}
                        <div className="lab-two-input-tile">
                            <p className="lab-two-input-label">Additional Monthly Contribution</p>
                            <input
                                type="number"
                                className="lab-two-input-field"
                                value={additionalContribution}
                                onChange={(e) => setAdditionalContribution(parseFloat(e.target.value))}
                            />
                        </div>

                        {/* INTEREST RATE SLIDER */}
                        <div className="lab-two-input-tile">
                            <p className="lab-two-input-label">Loan Interest Rate (% per annum)</p>
                            <p className="lab-two-slider-value">{interestRate} %</p>
                            <input
                                type="range"
                                min="5"
                                max="25"
                                step="0.25"
                                value={interestRate}
                                onChange={(e) => interestRate(parseFloat(e.target.value))}
                                className="lab-two-slider"
                            />
                        </div>                
                    </div>

                    {/* SIMULATE BUTTON*/}
                    <div className="lab-two-bottom-row">
                        <button className="lab-two-simulate-button" onClick={handleSimulate}>
                            SIMULATE
                        </button>
                    </div>
                </section>  

                {/*WHAT HAPPENS WHEN SIMULATE IS CLICKED*/}
                {results && (
                    <>
                        {/*EXPLAINERY LAYER FEATURE - EDUCATIONAL CONTENT*/}
                        <section className="lab-two-educational">
                            <h2>Educational Content</h2>
                            <p> 
                                Private student loans in South Africa are typically structured
                                at prime-linked rates, meaning they are sensitive to South African
                                Reserve Bank (SARB) repo rate decisions. As the repo rate shifts,
                                so does the cost of carrying this debt → making aggressive
                                repayment a particularly smart strategy in a high interest rate
                                environment.
                            </p>
                        </section>

                        {/* PATH CARDS */}
                        <section className="lab-two-paths">

                              <div className="lab-two-path-card path-a">
                                <div className="lab-two-path-header">
                                    <h3>PATH A</h3>
                                    <p>MINIMUM REPAYMENT</p>
                                </div>
                                <div className="lab-two-path-body-a">
                                    <p className="lab-path-metric-label">Monthly repayment</p>
                                    <p className="lab-path-metric-value">R {currentRepayment.toLocaleString("en-ZA")}</p>
                                    <p className="lab-path-metric-label">Months to debt freedom</p>
                                    <p className="lab-path-metric-value">{results.pathA.months} months</p>
                                    <p className="lab-path-metric-label">Total interest paid</p>
                                    <p className="lab-path-metric-value">R {Math.round(results.pathA.totalInterest).toLocaleString("en-ZA")}</p>
                                    <p className="lab-path-metric-label">Total paid back to bank</p>
                                    <p className="lab-path-metric-value">R {Math.round(results.pathA.totalPaid).toLocaleString("en-ZA")}</p>
                                </div>
                            </div>


                            <div className="lab-two-path-card path-b">
                                <div className="lab-two-path-header">
                                    <h3>PATH B</h3>
                                    <p>AGGRESSIVE DEBT PAYOFF</p>
                                </div>
                                <div className="lab-two-path-body-b">
                                    <p className="lab-path-metric-label">Monthly repayment</p>
                                    <p className="lab-path-metric-value">R {results.aggressiveRepayment.toLocaleString("en-ZA")}</p>
                                    <p className="lab-path-metric-label">Months to debt freedom</p>
                                    <p className="lab-path-metric-value">{results.pathB.months} months</p>
                                    <p className="lab-path-metric-label">Total interest saved</p>
                                    <p className="lab-path-metric-value">R {Math.round(results.interestSaved).toLocaleString("en-ZA")}</p>
                                    <p className="lab-path-metric-label">Months cut off loan</p>
                                    <p className="lab-path-metric-value">{results.monthsSaved} months earlier</p>
                                </div>
                            </div>
                        </section>

                        {/*VISUAL BARS*/}
                        <section className="lab-two-bars">

                            <div className="lab-bar-row">
                                <p className="lab-bar-label">Path A Minimum<br/>Repayments</p>
                                <div className="lab-bar-track">
                                    <div
                                        className="lab-bar-fill path-a-fill"
                                        style={{
                                            width: `${(results.pathA.months / Math.max(results.pathA.months, results.pathB.months)) * 100}%`
                                        }}
                                    />
                                </div>
                                <p className="lab-bar-value">{results.pathA.months} MONTHS</p>
                            </div>

                            <div className="lab-bar-row">
                                    <p className="lab-bar-label">Path B Aggressive<br/>Payoff</p>
                                    <div className="lab-bar-track">
                                        <div
                                            className="lab-bar-fill path-b-fill"
                                            style={{
                                                width: `${(results.pathB.months / Math.max(results.pathA.months, results.pathB.months)) * 100}%`
                                            }}
                                        />
                                    </div>
                                    <p className="lab-bar-value">{results.pathB.months} MONTHS</p>
                            </div>
                        </section>

                        {/* LAB VERDICT */}
                        <section className="lab-two-verdict">
                            <p className="lab-two-verdict-title">LAB VERDICT</p>
                            <p className="lab-two-verdict-text">
                                Paying your loan at R {currentRepayment.toLocaleString("en-ZA")}/month,
                                you will be debt-free in <strong>{results.pathA.months} months</strong> and
                                will pay R {Math.round(results.pathA.totalInterest).toLocaleString("en-ZA")} in
                                interest. However, increasing your repayment by
                                R {additionalContribution.toLocaleString("en-ZA")}/month clears your debt
                                in <strong>{results.pathB.months} months</strong> — that
                                is <strong>{results.monthsSaved} months earlier</strong> and
                                R {Math.round(results.interestSaved).toLocaleString("en-ZA")} less paid
                                to the bank.
                            </p>
                        </section>
                    </>
                )} 
            </div>
            
        </div>
    );
}