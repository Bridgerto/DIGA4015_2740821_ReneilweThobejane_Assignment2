// HOOKS
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// STYLING
import "../cssFiles/SignUpBankVerification.css";

// ICONS
import ABSALogo from "../assets/icons/OnboardingLogo.png"


export default function SignUpBankVerification() {

    const navigate = useNavigate();
    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState("");

    function handleFinish() {
        if (!agreed) {
            setError("Please confirm your bank connection to proceed.");
            return;
        }

        // Marks bank as connected
        localStorage.setItem("bankConnected", "true");

        // Marks signup as complete
        localStorage.setItem("isRegistered", "true");

        navigate(`/MoneySnapshot`);
    }

    return (
        <div className="subv-page">

            <div className="subv-Logo">
                <img 
                    src={ABSALogo} 
                    alt="image of the ABSA Logo" 
                    className="subv-logo-img"
                />
            </div>

            <div className="subv-content">
                <div className="subv-header">
                    <h1>Connect Your Bank Account</h1>
                    <h2>Step 3 of 3</h2>
                </div>

                <div className="subv-text">
                    <p>
                        ABSA NextGen Wealth Studio would like permission to access your
                        ABSA transaction data. This allows the app to automatically track
                        your confirmed and upcoming payments on your Money Snapshot.
                    </p>

                    <p>
                        Your data is private, secure and will never be shared with
                        third parties. You can revoke access at any time from your
                        Profile settings.
                    </p>

                    <div>
                        <input
                            type="checkbox"
                            id="consent"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                        />
                        <label htmlFor="consent">
                            I agree to allow ABSA NextGen Wealth Studio to access my
                            ABSA transaction data.
                        </label>
                    </div>

                    {error && <p className="error-text">{error}</p>}

                    <button onClick={handleFinish} className="subv-btn">FINISH & GO TO MY SNAPSHOT</button>
                </div>
            </div>     
        </div>
    );
}