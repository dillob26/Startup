import React from 'react';
import './play.css';

import { Game } from './game';

export function Play() {
    const [word_length, set_word_length] = React.useState(3);

  return (
    <main className="main-play container-fluid bg-secondary text-center">
      <div className="options fixed-left">
            <h3>Difficulty</h3>
            <ul>
                <li><button className="btn btn-dark active" onClick={() => set_word_length(3)}>3-letter</button></li>
                <li><button className="btn btn-dark" onClick={() => set_word_length(4)}>4-letter</button></li>
            </ul>

            
        </div>

        <Game word_length={word_length} />

        <div className="notifications">    
            <ul>
                <li><span className="Name">Timmothy</span> finished a chain (tag -- fat)</li>
                <li><span className="Name">John</span> finished a chain (bad -- dog)</li>
            </ul>
        </div>
    </main>
  );
}