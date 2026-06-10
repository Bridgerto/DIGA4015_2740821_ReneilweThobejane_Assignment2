// HOOKS
import React, {useState} from "react";

// COMPONENTS
import NavBar from "../components/NavBar";

// STYLING
import "../cssFiles/Profile.css";

//ICONS
import emptyAvatar from "../assets/avatars/emptyAvatar.png";
import avatar01 from "../assets/avatars/avatar01.png";
import avatar02 from "../assets/avatars/avatar02.png";
import avatar03 from "../assets/avatars/avatar03.png";
import avatar04 from "../assets/avatars/avatar04.png";
import avatar05 from "../assets/avatars/avatar05.png";
import avatar06 from "../assets/avatars/avatar06.png";
import avatar07 from "../assets/avatars/avatar07.png";
import avatar08 from "../assets/avatars/avatar08.png";

const avatars = [ avatar01, avatar02, avatar03, avatar04, avatar05, avatar06, avatar07, avatar08 ];

export default function Profile(){

    // READ CURRENT VALUES FROM LOCALSTORAGE
    const savedUsername = localStorage.getItem("username") || "User";
    const savedAvatar = localStorage.getItem("avatar") || emptyAvatar;

    // STATE — pre-filled with current values
    const [newUsername, setNewUsername] = useState(savedUsername);
    const [selectedAvatar, setSelectedAvatar] = useState(savedAvatar);
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");

    function handleSave() {
        if (!newUsername.trim()) {
            setError("Username cannot be empty.");
            setSuccessMessage("");
            return;
        }

        // SAVE UPDATED VALUES TO LOCALSTORAGE
        localStorage.setItem("username", newUsername);
        localStorage.setItem("avatar", selectedAvatar);

        setError("");
        setSuccessMessage("Your profile has been updated successfully.");
    }
    
    return(
        <div className="profile-page">

            {/* NAVIGATION */}
            <NavBar />
                    
            <div className="profile-content">
               {/* HEADER */}
                <section className="profile-header">
                    <h1 className="profile-title">My Profile</h1>
                </section>

                {/* CURRENT PROFILE DISPLAY */}
                <section className="profile-current">
                    <div className="profile-current-avatar">
                        <img
                            src={selectedAvatar}
                            alt="current avatar"
                            className="profile-avatar-preview"
                        />
                    </div>
                    <div className="profile-current-info">
                        <p className="profile-current-label">Current Username</p>
                        <p className="profile-current-value">{newUsername}</p>
                    </div>
                </section>

                {/* EDIT SECTION */}
                <section className="profile-edit">

                    {/* UPDATE USERNAME */}
                    <div className="profile-edit-block">
                        <label className="profile-edit-label">Update Username</label>
                        <input
                            type="text"
                            className="profile-edit-input"
                            value={newUsername}
                            onChange={(e) => {
                                setNewUsername(e.target.value);
                                setSuccessMessage("");
                            }}
                            placeholder="Enter new username"
                        />
                    </div>

                    {/* UPDATE AVATAR */}
                    <div className="profile-edit-block">
                        <label className="profile-edit-label">Update Profile Icon</label>
                        <div className="profile-avatar-grid">
                            {avatars.map((avatar) => (
                                <div
                                    key={avatar}
                                    onClick={() => {
                                        setSelectedAvatar(avatar);
                                        setSuccessMessage("");
                                    }}
                                    className={`profile-avatar-option ${selectedAvatar === avatar ? "profile-avatar-selected" : ""}`}
                                >
                                    <img
                                        src={avatar}
                                        alt="avatar option"
                                        className="profile-avatar-option-img"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ERROR AND SUCCESS MESSAGES */}
                    {error && <p className="profile-error">{error}</p>}
                    {successMessage && <p className="profile-success">{successMessage}</p>}

                    {/* SAVE BUTTON */}
                    <button className="profile-save-button" onClick={handleSave}>
                        Save Changes
                    </button>

                </section>
            </div>

            
        </div>
    );
}