import React from "react";
import Button from 'react-bootstrap/Button';

export function Game() {
    return (
        <div className="game">
            <div className="title">
                <h3>Target Chain</h3>
                <p><span id="start_word">ACT</span> -- <span id="end_word">APE</span></p>
            </div>

            <div className="letter-grid">
                <div className="letter-cell">A</div>
                <div className="letter-cell">C</div>
                <div className="letter-cell">T</div>
                <div className="letter-cell">A</div>
                <div className="letter-cell">C</div>
                <div className="letter-cell">E</div>
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
            </div>

            <div>
                <button className="btn btn-dark">give up</button>
                <button className="btn btn-dark">restart</button>
            </div>
        </div>);
}