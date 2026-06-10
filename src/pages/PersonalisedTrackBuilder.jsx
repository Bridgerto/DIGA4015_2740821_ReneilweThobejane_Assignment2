// HOOKS
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// UTILS
import { calculateMonthlyTax } from "../utils/taxCalculator";

// COMPONENTS
import NavBar from "../components/NavBar";

// STYLING
import "../cssFiles/PersonalisedTrackBuilder.css";

// ICONS
import emptyAvatar from "../assets/avatars/emptyAvatar.png";

const questions = [
    { key: "goal", question: "What do you want to achieve in the next 5 years?" },
    { key: "concern", question: "What is your biggest financial concern right now?" },
    { key: "debt", question: "Do you have any debt you want to prioritise?" },
    { key: "saving", question: "Are you saving toward anything specific?" },
];

export default function PersonalisedTrackBuilder() {
    const navigate = useNavigate();

    // READ USER DATA FROM LOCALSTORAGE
    const username = localStorage.getItem("username") || "User";
    const avatar = localStorage.getItem("avatar") || emptyAvatar;
    const grossIncome = localStorage.getItem("grossIncome") || "0";
    const fixedCosts = JSON.parse(localStorage.getItem("fixedCosts")) || [];

    // CALCULATE FINANCIAL DATA
    const { grossMonthly, takeHomePay } = calculateMonthlyTax(grossIncome);
    const totalFixedCosts = fixedCosts.reduce(
        (total, expense) => total + parseFloat(expense.amount || 0), 0
    );
    const moneyLeft = takeHomePay - totalFixedCosts;

    // QUESTIONNAIRE STATE
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({
        goal: "",
        concern: "",
        debt: "",
        saving: "",
    });
    const [currentAnswer, setCurrentAnswer] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [generatedTrack, setGeneratedTrack] = useState(null);
    const [error, setError] = useState("");

    const handleNext = async () => {

        const key = questions[currentQuestion].key;

        const updatedAnswers = {
            ...answers,
            [key]: currentAnswer,
        };

        setAnswers(updatedAnswers);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setCurrentAnswer("");
            return;
        }

        await generateTrack(updatedAnswers);
    };

    const handleUpdate = () => {
        setGeneratedTrack(null);

        setAnswers({
            goal: "",
            concern: "",
            debt: "",
            saving: "",
        });

        setCurrentQuestion(0);
        setCurrentAnswer("");
    };



    return(
        <div className="ptb-page">

            {/* NAVIGATION */}
            <NavBar />

            <div className="ptb-content">
                
                {/* HEADER */}
                <section className="ptb-header">
                    <div className="ptb-user">
                        <img src={avatar} alt="user avatar" className="ptb-avatar" />
                        <p className="ptb-username">{username}</p>
                    </div>
                    <div className="ptb-title">
                        <h1>Building {username}'s Personalised Track</h1>
                    </div>
                </section>

                {/* FINANCIAL SUMMARY BAR */}
                <section className="ptb-summary">
                    <div className="ptb-summary-tile">
                        <p className="ptb-summary-label">Take-Home Pay</p>
                        <p className="ptb-summary-value">R {takeHomePay.toLocaleString("en-ZA")}</p>
                    </div>
                    <div className="ptb-summary-tile">
                        <p className="ptb-summary-label">Fixed Costs</p>
                        <p className="ptb-summary-value">R {totalFixedCosts.toLocaleString("en-ZA")}</p>
                    </div>
                    <div className="ptb-summary-tile highlight">
                        <p className="ptb-summary-label">Money Left</p>
                        <p className="ptb-summary-value">R {moneyLeft.toLocaleString("en-ZA")}</p>
                    </div>
                </section>

                {/* QUESTIONNAIRE — shown before generation */}
                {!isLoading && !generatedTrack && (
                    <section className="ptb-questionnaire">

                        <p className="ptb-step">
                            Question {currentQuestion + 1} of {questions.length}
                        </p>

                        <h2 className="ptb-question">
                            {questions[currentQuestion].question}
                        </h2>

                        <textarea
                            className="ptb-textarea"
                            placeholder="Type your answer here..."
                            value={currentAnswer}
                            onChange={(e) => setCurrentAnswer(e.target.value)}
                            rows={4}
                        />

                        {error && <p className="ptb-error">{error}</p>}

                        <button className="ptb-button" onClick={handleNext}>
                            {currentQuestion < questions.length - 1
                                ? "Next Question"
                                : "Generate My Track"}
                        </button>

                    </section>
                )}

                {/* LOADING STATE */}
                {isLoading && (
                    <section className="ptb-loading">
                        <div className="ptb-spinner" />
                        <p>Building your personalised track, {username}...</p>
                        <p>This may take a few seconds.</p>
                    </section>
                )}

                
                {/* GENERATED TRACK — shown after generation */}
                {generatedTrack && (
                    <section className="ptb-track">

                        <h2 className="ptb-track-heading">
                            Your Personalised 5-Year Track
                        </h2>

                        {parseTrack(generatedTrack).map((section, index) => (
                            <div key={index} className={`ptb-track-section ${section.heading.startsWith("NUDGE") ? "ptb-nudge" : ""}`}>
                                <p className="ptb-track-section-heading">
                                    {section.heading}
                                </p>
                                {section.content.map((line, i) => (
                                    <p key={i} className="ptb-track-section-content">
                                        {line}
                                    </p>
                                ))}
                            </div>
                        ))}

                        <button className="ptb-button" onClick={handleUpdate}>
                            Update My Goals
                        </button>
                    </section>
                )}

            </div>
        </div>  
    );
}