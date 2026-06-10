// HOOKS
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// STYLING
import "../cssFiles/SignUpFixedCosts.css"

const categories = [
    "Rent",
    "Car Finance",
    "Insurance",
    "Family Transfer",
    "Subscription",
    "Other"
];

const days = Array.from({ length: 31 }, (_, i) => i + 1);

const emptyExpense = {
    category: "",
    amount: "",
    merchant: "",
    paymentDay: ""
};

export default function SignUpFixedCosts() {

    const navigate = useNavigate();

    const [expenses, setExpenses] = useState([{ ...emptyExpense }]);
    const [error, setError] = useState("");

    function handleChange(index, field, value) {
        const updated = [...expenses];
        updated[index][field] = value;
        setExpenses(updated);
    }

    function handleAddExpense() {
        setExpenses([...expenses, { ...emptyExpense }]);
    }

    function handleRemoveExpense(index) {
        const updated = expenses.filter((_, i) => i !== index);
        setExpenses(updated);
    }

    function handleProceed() {
        const allFilled = expenses.every(
            (e) => e.category && e.amount && e.merchant && e.paymentDay
        );

        if (!allFilled) {
            setError("Please fill in all fields for each expense.");
            return;
        }

        localStorage.setItem("fixedCosts", JSON.stringify(expenses));
        
        /*if all the above is validated, then user can procceed to the account verification section*/
        navigate("/SignUpBankVerification");
    }

    return (
        <div className="sign-up-fixed-costs-page">

            <div className="sufc-header">
                <h1 className="sufc-title">Your Fixed Costs</h1>
                <h2 className="sufc-progress-tracker">Step 2 of 3</h2>
            </div>

            <div className="sufc-content">
                <p>Add your known recurring monthly expenses below.</p>
            </div>

                {expenses.map((expense, index) => (
                    <div key={index} className="expense-block">
                        <p>Expense {index + 1}</p>

                        <div className="sufc-input">
                            <label>Category</label>
                            <select
                                value={expense.category}
                                onChange={(e) => handleChange(index, "category", e.target.value)}
                            >
                                <option value="" >Select a category</option>
                                    {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>

                            <label>Amount (R)</label>
                            <input
                                type="number"
                                placeholder="e.g. 9000"
                                value={expense.amount}
                                onChange={(e) => handleChange(index, "amount", e.target.value)}
                            />

                            <label>Merchant / Payee Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Fourways Properties"
                                value={expense.merchant}
                                onChange={(e) => handleChange(index, "merchant", e.target.value)}
                            />

                            <label>Payment Day of Month</label>
                            <select
                                value={expense.paymentDay}
                                onChange={(e) => handleChange(index, "paymentDay", e.target.value)}
                            >
                                <option value="" >Select a day</option>
                                {days.map((day) => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                            </select>
                        </div>

                        {expenses.length > 1 && (
                            <button onClick={() => handleRemoveExpense(index)} className="sufc-remove-expense">
                                    REMOVE EXPENSE
                            </button>
                        )}
                    </div>        
                ))}

            <button onClick={handleAddExpense} className="sufc-add-expense">+ ADD ANOTHER EXPENSE</button>

            {error && <p className="error-text">{error}</p>}

            <button onClick={handleProceed} className="sufc-proceed-btn">PROCEED TO STEP 3</button>
        </div>
    );
}

