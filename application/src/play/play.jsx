import React from 'react';
import './play.css';

import { Game } from './game';

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

        <Game />

        <div className="notifications">    
            <ul>
                <li><span className="Name">Timmothy</span> finished a chain (tag -- fat)</li>
                <li><span className="Name">John</span> finished a chain (bad -- dog)</li>
            </ul>
        </div>
    </main>
  );
}