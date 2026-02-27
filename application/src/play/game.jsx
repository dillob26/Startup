import React from "react";
import Button from 'react-bootstrap/Button';

import { get_random_word, is_valid_word } from './word_list';

export function Game({ word_length }) {
    const [start_word, set_start_word] = React.useState(get_random_word(word_length));
    const [end_word, set_end_word] = React.useState(get_random_word(word_length));

    const [current_word, set_current_word] = React.useState("");
    const [past_words, set_past_words] = React.useState([]);



    // Restart the game with new random start and end words
   function restart_game() {
        set_start_word(get_random_word(word_length));
        set_end_word(get_random_word(word_length));
    }



    // Handle keyboard input for the current word
    React.useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase();

      // Only letters A-Z
      if (/^[A-Z]$/.test(key)) {
        if (current_word.length < word_length) { // max word length
          set_current_word((prev) => prev + key);
        }
      } else if (key === "BACKSPACE") {
        set_current_word((prev) => prev.slice(0, -1));
      } else if (key === "ENTER") {
        if (current_word.length === word_length) {
            if (is_valid_word(current_word, word_length)) {
                set_past_words((prev) => [...prev, current_word]);
                set_current_word(""); // reset input
            }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [current_word]);


    return (
        <div className="game">
            <div className="title">
                <h3>Target Chain</h3>
                <p><span id="start_word">{start_word}</span> -- <span id="end_word">{end_word}</span></p>
            </div>

            <div className={`letter-grid-${word_length}`}>
                <div className="letter-cell">{start_word[0]}</div>
                <div className="letter-cell">{start_word[1]}</div>
                <div className="letter-cell">{start_word[2]}</div>
                <div className="letter-cell">{current_word[0] || ""}</div>
                <div className="letter-cell">{current_word[1] || ""}</div>
                <div className="letter-cell">{current_word[2] || ""}</div>
            </div>

            <div>
                <button className="btn btn-dark">give up</button>
                <button className="btn btn-dark" onClick={restart_game}>restart</button>
            </div>
        </div>);
}