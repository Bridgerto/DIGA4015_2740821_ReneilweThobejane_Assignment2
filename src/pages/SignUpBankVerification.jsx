// HOOKS
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// STYLING

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
        <div>
            <h1>Connect Your Bank Account</h1>
            <p>Step 3 of 3</p>

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

            <button onClick={handleFinish}>Finish & Go to My Snapshot</button>
        </div>
    );
}