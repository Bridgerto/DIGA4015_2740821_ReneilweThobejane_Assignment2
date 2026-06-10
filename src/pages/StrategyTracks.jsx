// HOOKS
import React from "react";
import { useNavigate } from "react-router-dom";

// COMPONENTS
import NavBar from "../components/NavBar";
import TrackCard from "../components/TrackCard";

// ICONS
import emptyAvatar from "../assets/avatars/emptyAvatar.png";

// IMAGES
import propertyImage from "../assets/images/strategy-track-first-property.jpg"; 
import lifestyleImage from "../assets/images/strategy-track-balanced-lifestyle.png"; 
import debtImage from "../assets/images/strategy-track-debt-demolisher.jpg";

// STYLING
import "../cssFiles/StrategyTracks.css";

const tracks = [
    {
        title: "First Property Path",
        image: propertyImage,
        description: "This track is for a user whose primary long-term goal is owning property. They are disciplined enough to delay lifestyle upgrades in exchange for building toward a deposit to eventually own a house.",
        prioritises: "Over the period of 5 years it will help clear high-interest debt first, building an emergency fund, then aggressively saving toward a property deposit. Lifestyle inflation is actively discouraged throughout.",
        avoids: "Unnecessary credit, large discretionary purchases, and investment vehicles that lock away money needed for a deposit.",
        tradeoffs: "This track requires lifestyle discipline. The user sacrifices short-term spending freedom for long-term property ownership. International travel and large discretionary buying are slowly cut out.",
        milestones: [
            "Year 1: Clear high-interest debt (credit card). Build a 1-month emergency fund.",
            "Year 2: Complete 3-month emergency fund. Open TFSA and begin contributions.",
            "Year 3: Begin dedicated property deposit savings account.",
            "Year 4–5: Reach target deposit amount. Engage a bond originator and begin the home loan application process.",
        ],
    },
    {
        title: "Balanced Lifestyle & Investing",
        image: lifestyleImage,
        description: "This track is for a user who wants to build wealth without completely sacrificing their current quality of life. They have stable income, manageable or no debt, and want a plan that allows them to invest while still living well.",
        prioritises: "Building an emergency fund, opening a TFSA, beginning a diversified investment portfolio, and maintaining a sustainable lifestyle budget that doesn't feel restrictive.",
        avoids: "Extreme frugality, locking all disposable income into savings, and ignoring quality of life entirely.",
        tradeoffs: "Wealth is built more slowly than aggressive tracks. The user won't reach property ownership or financial independence as quickly, but they maintain a quality of life that feels sustainable long term.",
        milestones: [
            "Year 1: Build a 3-month emergency fund. Open TFSA and begin monthly contributions.",
            "Year 2: Begin unit trust or ETF contributions alongside TFSA. Set a defined lifestyle budget.",
            "Year 3: Increase investment contributions as income grows. Begin exploring retirement annuity options.",
            "Year 4–5: Diversified portfolio established. Review and adjust based on life changes.",
        ],
    },
    {
        title: "Debt Demolisher Path",
        image: debtImage,
        description: "This track is for a user who is carrying significant debt and needs to prioritise clearing that debt before anything else can meaningfully happen.",
        prioritises: "Aggressive debt repayment above all else. Every available rand after fixed costs and a basic emergency fund goes toward reducing the debt principal as fast as possible.",
        avoids: "New debt of any kind, lifestyle inflation, and premature investing before the debt situation is stabilised.",
        tradeoffs: "This track requires patience. The user will watch peers invest and grow wealth while they focus on clearing debt. But financial freedom on the other side is worth the delay.",
        milestones: [
            "Year 1: Build a 1-month emergency fund. Begin making above-minimum debt repayments.",
            "Year 2: Debt reduced by at least 40%. No new credit taken on.",
            "Year 3: Debt cleared or reduced to a manageable level. Begin building a proper emergency fund.",
            "Year 4: Open TFSA. Begin first investments.",
            "Year 5: Debt-free. Diversified savings and investment foundation established.",
        ],
    },
];

export default function StrategyTracks() {
    const navigate = useNavigate();

    const username = localStorage.getItem("username") || "User";
    const avatar = localStorage.getItem("avatar") || emptyAvatar;

    return (
        <div className="strategy-tracks-page">

            {/* NAVIGATION */}
            <NavBar />

            <section className="strategy-tracks-content">

                {/* HEADER */}
                <section className="strategy-tracks-header">

                    <div className="strategy-tracks-user">
                        <img src={avatar} alt="user avatar" className="strategy-tracks-avatar" />
                        <p className="strategy-tracks-username">{username}</p>
                    </div>
                    
                    <div className="strategy-tracks-title">
                        <h1>Strategy Tracks</h1>
                    </div>
                </section>

                {/* INFO TAB */}
                <section className="strategy-tracks-info-tab">
                    <p>Your Strategy Track is your personal 5-year financial roadmap.
                        Not sure where to start? Browse the example tracks below for inspiration.
                        Ready to build yours? Create your personalised track.
                    </p>
                </section>

                {/* TRACK CARDS */}
                <section className="strategy-tracks-main">
                    {tracks.map((track, index) => (
                        <TrackCard key={index} {...track} />
                    ))}
                </section>

                {/* TRACK BUILDER */}
                <section className="track-builder">
                    <button
                        className="track-builder-button"
                        onClick={() => navigate("/PersonalisedTrackBuilder")}
                    >
                        Build My Personalised Track
                    </button>
                </section>

            </section>
        </div>
    );
}
