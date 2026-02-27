import React from "react";
import Button from 'react-bootstrap/Button';

import { get_random_word, is_valid_word } from './word_list';

export function Game({ word_length }) {
    const [start_word, set_start_word] = React.useState(get_random_word(word_length));
    const [end_word, set_end_word] = React.useState(get_random_word(word_length));

    const [current_word, set_current_word] = React.useState("");
    const [past_words, set_past_words] = React.useState([start_word]);



    // Restart the game with new random start and end words
   function restart_game() {
        set_start_word(get_random_word(word_length));
        set_end_word(get_random_word(word_length));
        set_current_word("");
        set_past_words([start_word]);
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

            <div className={`letter-grid`}>
              {past_words.map((word, rowIndex) => (
                <div className={`letter-row-${word_length}`} key={rowIndex}>
                  {word.split("").map((letter, colIndex) => (
                    <div className="letter-cell" key={colIndex}>
                      {letter}
                    </div>
                  ))}
                </div>
              ))}

              <div className={`letter-row-${word_length}`}>
               {Array.from({ length: word_length }).map((_, i) => (
                <div className="letter-cell" key={i}>
                  {current_word[i] || ""}
                </div>
              ))}
              </div>
            </div>

            <div>
                <button className="btn btn-dark">give up</button>
                <button className="btn btn-dark" onClick={restart_game}>restart</button>
            </div>
        </div>);
}