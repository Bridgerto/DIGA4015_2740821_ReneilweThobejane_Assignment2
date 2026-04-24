// HOOKS
import React, { useState } from "react";

// STYLING
import "../cssFiles/TrackCard.css";

export default function TrackCard({ title, description, prioritises, avoids, tradeoffs, milestones }) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* TRACK CARD */}
            <div className="track-card" onClick={() => setIsOpen(true)}>
                <div className="track-card-image-placeholder" />
                <h3 className="track-card-title">{title}</h3>
                <p className="track-card-description">{description}</p>
            </div>

            {/* MODAL OVERLAY */}
            {isOpen && (
                <div className="track-modal-overlay" onClick={() => setIsOpen(false)}>
                    <div className="track-modal" onClick={(e) => e.stopPropagation()}>

                        <button className="track-modal-close" onClick={() => setIsOpen(false)}>✕</button>

                        <h2 className="track-modal-title">{title}</h2>
                        <p className="track-modal-text">{description}</p>

                        <p className="track-modal-heading">What the track prioritises:</p>
                        <p className="track-modal-text">{prioritises}</p>

                        <p className="track-modal-heading">What it avoids:</p>
                        <p className="track-modal-text">{avoids}</p>

                        <p className="track-modal-heading">Tradeoffs:</p>
                        <p className="track-modal-text">{tradeoffs}</p>

                        <p className="track-modal-heading">Key milestones:</p>
                        <ul className="track-modal-milestones">
                            {milestones.map((milestone, index) => (
                                <li key={index}>{milestone}</li>
                            ))}
                        </ul>

                    </div>
                </div>
            )}
        </>
    );
}