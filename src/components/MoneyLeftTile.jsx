// HOOKS
import React from "react";

// UTILS
import { calculateMonthlyTax } from "../utils/taxCalculator";

// STYLING
import "../cssFiles/MoneyLeftTile.css";

export default function MoneyLeftTile() {

    const grossIncome = localStorage.getItem("grossIncome") || "0";
    const fixedCosts = JSON.parse(localStorage.getItem("fixedCosts")) || [];

    const { takeHomePay } = calculateMonthlyTax(grossIncome);

    const totalFixedCosts = fixedCosts.reduce(
        (total, expense) => total + parseFloat(expense.amount || 0), 0
    );

    const moneyLeft = takeHomePay - totalFixedCosts;
    const isLow = moneyLeft < 5000;

    return (
        <div className={`moneyleft-container ${isLow ? "moneyleft-warning" : ""}`}>
            <p className="moneyleft-label">Money Left This Month</p>
            <p className="moneyleft-amount">
                R {moneyLeft.toLocaleString("en-ZA", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}
            </p>
            <p className="moneyleft-note">
                {isLow
                    ? "Your budget is running low — watch your spending."
                    : "You have breathing room this month."}
            </p>
        </div>
    );
}