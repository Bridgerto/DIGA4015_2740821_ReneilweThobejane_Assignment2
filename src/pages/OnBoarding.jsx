// HOOKS
import React from "react";
import {useNavigate} from "react-router-dom";

// ICONS
import OnBoardingLogo from "../assets/icons/OnBoardingLogo.png";
const ABSALogo = OnBoardingLogo;

// STYLING
import "../cssFiles/OnBoarding.css";


export default function OnBoarding(){


    //Navigate hook
    const navigate = useNavigate();

    function handleLogin(){
        navigate(`/Login`);
    }

    function handleSignUp(){
        navigate(`/SignUp`);
    }
    
    return(
        <div className="onboarding-page">

            <div className="onboarding-content">
                
                <section className="onboarding-icons">
                    <img src={ABSALogo} alt="ABSA Logo" className="logo" />
                    <h1>ABSA NextGen Wealth Studio</h1>
                    <p>Your story matters.</p>
                </section>

                <section className="onboarding-buttons">
                    <button onClick={handleLogin} className="onboarding-login" >LOGIN</button>
                    <button onClick={handleSignUp} className="onboarding-signup" >SIGN UP</button>
                </section>

            </div>

        </div>
    );
}