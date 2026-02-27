import React from 'react';
import './play.css';

import { Game } from './game';
import { Notification } from './notification';

export function Play({ user_name }) {
    const [word_length, set_word_length] = React.useState(3);

  return (
    <main className="main-play container-fluid bg-secondary text-center">
      <div className="options fixed-left">
            <h3>Difficulty</h3>
            <ul>
                <li><button className="btn btn-dark" onClick={() => set_word_length(3)}>3-letter</button></li>
                <li><button className="btn btn-dark" onClick={() => set_word_length(4)}>4-letter</button></li>
            </ul>

            
        </div>

        {user_name &&
        <Game word_length={word_length} user_name={user_name} />}

        {!user_name &&
        <div><p>Please log in to play.</p></div>}

        <Notification />
    </main>
  );
}