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
    const [error, setError] = useState("");

    const navigate = useNavigate();

     function handleEnter() {

        // CHECK IF FIELDS ARE FILLED
        if (!username || !password) {
            setError("Please enter your username and password.");
            return;
        }

        // READ STORED CREDENTIALS FROM LOCALSTORAGE
        const storedUsername = localStorage.getItem("username");
        const storedPassword = localStorage.getItem("password");

        // CHECK IF AN ACCOUNT EXISTS AT ALL
        if (!storedUsername || !storedPassword) {
            setError("No account found. Please sign up first.");
            return;
        }

        // CHECK IF CREDENTIALS MATCH
        if (username === storedUsername && password === storedPassword) {
            navigate("/MoneySnapshot");
        } else {
            setError("Incorrect username or password. Please try again.");
        }
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
                            onChange={(e) => {setUsername(e.target.value); setError("");}}
                            className= "username-input"
                        />
                </div>


                <div className="login-password">
                    <img src={Icon2} alt="Password Icon" className="password-icon"/>
                    <input 
                        type="password"
                        placeholder="Enter your password" 
                        value={password}
                        onChange={(e) => {setPassword(e.target.value); setError("");}}
                        className= "password-input"

                    />
                </div>

                {error && <p className="login-error">{error}</p>}
              
                <button onClick={handleEnter}>ENTER</button>
            </div>

        </div>
    );
}