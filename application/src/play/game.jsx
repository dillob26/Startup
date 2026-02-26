import React from "react";
import Button from 'react-bootstrap/Button';

import { get_random_word } from './word_list';

export function Game() {
    const [start_word, set_start_word] = React.useState(get_random_word());
    const [end_word, set_end_word] = React.useState(get_random_word());

   function restart_game() {
        set_start_word(get_random_word());
        set_end_word(get_random_word());
    }

    return (
        <div className="game">
            <div className="title">
                <h3>Target Chain</h3>
                <p><span id="start_word">{start_word}</span> -- <span id="end_word">{end_word}</span></p>
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
                <button className="btn btn-dark" onClick={restart_game}>restart</button>
            </div>
        </div>);
}