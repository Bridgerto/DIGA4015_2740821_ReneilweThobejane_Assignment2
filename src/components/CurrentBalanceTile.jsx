// HOOKS
import React from "react";

// STYLING
import "../cssFiles/CurrentBalanceTile.css";

export default function CurrentBalanceTile() {

    // Simulated balance — will be wired to live ABSA data later
    const simulatedBalance = 25862.91;

    return (
        <div className="balance-container">
            <p className="balance-label">Current Balance</p>
            <p className="balance-amount">
                R {simulatedBalance.toLocaleString("en-ZA", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}
            </p>
            <p className="balance-note">Live from your ABSA account</p>
        </div>
    );
}