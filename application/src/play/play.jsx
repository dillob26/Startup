import React from 'react';
import './play.css';

export function Play() {
  return (
    <main className="main-play container-fluid bg-secondary text-center">
      <div className="options fixed-left">
            <h3>Difficulty</h3>
            <ul>
                <li><button className="btn btn-dark active">3-letter</button></li>
                <li><button className="btn btn-dark">4-letter</button></li>
            </ul>

            
        </div>

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
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
                <div className="letter-cell"></div>
            </div>

            <div>
                <button className="btn btn-dark">give up</button>
                <button className="btn btn-dark">restart</button>
            </div>
        </div>

        <div className="notifications">    
            <ul>
                <li><span className="Name">Timmothy</span> finished a chain (tag -- fat)</li>
                <li><span className="Name">John</span> finished a chain (bad -- dog)</li>
            </ul>
        </div>
    </main>
  );
}