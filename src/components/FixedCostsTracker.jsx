// HOOKS
import React from "react";

// STYLING
import "../cssFiles/FixedCostsTracker.css";

export default function FixedCostsTracker() {

    const fixedCosts = JSON.parse(localStorage.getItem("fixedCosts")) || [];
    const today = new Date().getDate();

    const confirmed = fixedCosts.filter(expense => parseInt(expense.paymentDay) <= today);
    const upcoming = fixedCosts.filter(expense => parseInt(expense.paymentDay) > today);

    return (
        <div className="tracker-container">

            {/* CONFIRMED PAYMENTS */}
            <div className="tracker-section">
                <h3 className="tracker-title">Confirmed Payments</h3>
                {confirmed.length === 0 ? (
                    <p className="tracker-empty">No confirmed payments yet this month.</p>
                ) : (
                    confirmed.map((expense, index) => (
                        <div key={index} className="tracker-tile confirmed">
                            <div className="tracker-tile-left">
                                <p className="tracker-category">{expense.category}</p>
                                <p className="tracker-merchant">{expense.merchant}</p>
                            </div>
                            <div className="tracker-tile-right">
                                <p className="tracker-amount">- R {parseFloat(expense.amount).toLocaleString("en-ZA")}</p>
                                <p className="tracker-date">Day {expense.paymentDay}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* UPCOMING PAYMENTS */}
            <div className="tracker-section">
                <h3 className="tracker-title">Upcoming Payments</h3>
                {upcoming.length === 0 ? (
                    <p className="tracker-empty">No upcoming payments this month.</p>
                ) : (
                    upcoming.map((expense, index) => (
                        <div key={index} className="tracker-tile upcoming">
                            <div className="tracker-tile-left">
                                <p className="tracker-category">{expense.category}</p>
                                <p className="tracker-merchant">{expense.merchant}</p>
                            </div>
                            <div className="tracker-tile-right">
                                <p className="tracker-amount">R {parseFloat(expense.amount).toLocaleString("en-ZA")}</p>
                                <p className="tracker-date">Due day {expense.paymentDay}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}