// HOOKS
import React from "react";

// ICONS
import emptyAvatar from "../assets/avatars/emptyAvatar.png";


// UTILS
import { calculateMonthlyTax } from "../utils/taxCalculator";

// STYLING
import "../cssFiles/PersonalisedHeader.css";

export default function PersonalisedHeader() {

    const username = localStorage.getItem("username") || "User";
    const avatar = localStorage.getItem("avatar") || emptyAvatar;
    const grossIncome = localStorage.getItem("grossIncome") || "0";

    const { grossMonthly, monthlyPAYE, monthlyUIF, takeHomePay } = calculateMonthlyTax(grossIncome);

    return (
        <div className="header-container">

            {/* LEFT — greeting and avatar */}
            <div className="header-greeting">
                <img
                    src={avatar}
                    alt="profile avatar"
                    className="header-avatar"
                />
                <div>
                    <h2 className="header-welcome">Hello {username}, Welcome!</h2>
                    <p className="header-subtitle">Here is your financial snapshot.</p>
                </div>
            </div>

            {/* RIGHT — financial summary tiles */}
            <div className="header-summary">

                <div className="summary-tile">
                    <p className="summary-label">Gross Monthly Income : </p>
                    <p className="summary-value">R {grossMonthly.toLocaleString("en-ZA")}</p>
                </div>

                <div className="summary-tile">
                    <p className="summary-label">Tax Deductions (PAYE + UIF) : </p>
                    <p className="summary-value">R {(monthlyPAYE + monthlyUIF).toLocaleString("en-ZA")}</p>
                </div>

                <div className="summary-tile highlight">
                    <p className="summary-label">Net Take-Home Pay : </p>
                    <p className="summary-value">R {takeHomePay.toLocaleString("en-ZA")}</p>
                </div>

            </div>
        </div>
    );
}