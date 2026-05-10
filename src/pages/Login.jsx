// HOOKS
import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

// ICONS
import LoginIcon1 from "../assets/icons/LoginIcon1.png";
import LoginIcon2 from "../assets/icons/LoginIcon2.png" ;
import OnBoardingLogo from "../assets/icons/OnBoardingLogo.png" ;

const Icon1 = LoginIcon1;
const Icon2 = LoginIcon2;
const Logo = OnBoardingLogo;

// STYLING
import "../cssFiles/Login.css";

export default function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    function handleEnter() {
        navigate("/MoneySnapshot");
    } 

    return(
        <div className="login-page">

            <div className="login-content">
                <img src={Logo} alt="ABSA Main Logo" className="main-logo" />
                <h1>Welcome user!</h1>

                <div className="login-username">
                    <img src={Icon1} alt="Username Icon" className="username-icon"/>
                        <input 
                            type="text"
                            placeholder="Enter your username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className= "username-input"
                        />
                </div>


                <div className="login-password">
                    <img src={Icon2} alt="Password Icon" className="password-icon"/>
                    <input 
                        type="password"
                        placeholder="Enter your password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className= "password-input"
                    />
                </div>
              
                <button onClick={handleEnter}>ENTER</button>
            </div>

        </div>
    );
}