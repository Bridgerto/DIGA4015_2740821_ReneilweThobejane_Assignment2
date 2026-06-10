// IMPORTING AVATAR/ICON IMAGES 
import avatar01 from "../assets/avatars/avatar01.png";
import avatar02 from "../assets/avatars/avatar02.png";
import avatar03 from "../assets/avatars/avatar03.png";
import avatar04 from "../assets/avatars/avatar04.png";
import avatar05 from "../assets/avatars/avatar05.png";
import avatar06 from "../assets/avatars/avatar06.png";
import avatar07 from "../assets/avatars/avatar07.png";
import avatar08 from "../assets/avatars/avatar08.png";
import emptyAvatar from "../assets/avatars/emptyAvatar.png";

// HOOKS
import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

// STYLING
import "../cssFiles/SignUp.css";

const placeHolderAvatar = emptyAvatar;
const avatars = [ avatar01, avatar02, avatar03, avatar04, avatar05, avatar06, avatar07, avatar08];



export default function SignUp (){

    const navigateSignUp = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [grossIncome, setGrossIncome] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState(""); 
    const [error, setError] = useState("");

    function handleProceed()
    {
        // CHECK IF ALL FIELDS ARE FILLED
        if (!username || !password || !grossIncome || !selectedAvatar) 
        {
            setError("Please fill in all fields and select a profile icon.");
            return;  
        }

        // CHECK IF AN ACCOUNT ALREADY EXISTS WITH THIS USERNAME
        const storedUsername = localStorage.getItem("username");
        const storedPassword = localStorage.getItem("password");

        if (storedUsername && storedPassword) 
        {
            // ACCOUNT EXISTS — check if it matches
            if (username === storedUsername && password === storedPassword) 
            {
                // SAME CREDENTIALS — they already have an account, send to login
                setError("An account with these details already exists. Please login instead.");
                return;
            } 
            else if (username === storedUsername) 
            {
                // SAME USERNAME, DIFFERENT PASSWORD
                setError("This username is already taken. Please choose a different username.");
                return;
            }
        }

        // Save this information to localStorage
        localStorage.setItem("username", username );
        localStorage.setItem("password", password );
        localStorage.setItem("grossIncome", grossIncome );
        localStorage.setItem("avatar", selectedAvatar); 

        //after everything has been done, then you can move to the SignUpFixedCost.jsx page
        navigateSignUp(`/SignUpFixedCosts`);
    }


    return(
    <div className="signup-container">

        {/*LEFT SIDE - form area*/}
        <div className="signup-left"> 
            <h1 className="signup-title">Welcome, time to create your account</h1>
            <h2 className="progress-tracker"> Step 1 of 3</h2>   

            <label>Username</label>
                <input 
                   type="text"
                   placeholder="Enter your username"
                   value={username}
                   onChange={(e) => {setUsername(e.target.value); setError("");}}
                   className="signup-input" 
                />
       
            <label>Password</label>
                <input 
                   type="password"
                   placeholder="Enter your password"
                   value={password}
                   onChange={(e) => {setPassword(e.target.value); setError("");}}
                   className="signup-input"
                />

            <label>Gross Income</label>
                <input 
                   type= "number"
                   placeholder="Example: 540 000"
                   value={grossIncome}
                   onChange={(e) => {setGrossIncome(e.target.value); setError("");}}
                   className="signup-input"
                />

            {error && <p className="signup-error">{error}</p>} 
           
            <button onClick={handleProceed} className="signup-button">PROCEED TO STEP 2</button>       
        
        </div>


        <div className="signup-right">
            {/* RIGHT SIDE — avatar selection */}     
                {/* EmptyIcon */} 
                <div className="avatar-preview"> 
                    <img 
                        src={selectedAvatar || placeHolderAvatar} 
                        alt="selected avatar" 
                        className="avatar-preview-img"
                    />
                </div>

                {/* Avatar grid */}
                <div className="avatar-grid">
                    {avatars.map((avatar) => (
                        <div
                                key={avatar}
                                onClick={() => setSelectedAvatar(avatar)}
                                className={`avatar-option ${selectedAvatar === avatar ? "avatar-selected" : ""}`}
                        >
                            <img
                                src={avatar}
                                alt="avatar option"
                                className="avatar-option-img"
                            />
                        </div>
                    ))}
                </div>

                {/*ICON INSTRUCTION*/}
                <div className="signup-icon-text">
                    <p>Choose your profile icon</p>
                </div>

        </div>
    
    </div>
  );
}


 

   




