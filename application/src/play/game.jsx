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
        const new_start_word = get_random_word(word_length);
        const new_end_word = get_random_word(word_length);

        set_start_word(new_start_word);
        set_end_word(new_end_word);
        set_current_word("");
        set_past_words([new_start_word]);
    }

    // Check if two words differ by exactly one letter
    function is_one_letter_diff(word1, word2) {
        let dif_count = 0;
        for (let i = 0; i < word1.length; i++) {
            if (word1[i] !== word2[i]) {
                dif_count += 1;
                if (dif_count > 1) return false;
            }
        }
        return dif_count === 1;
    }

    // Handle keyboard input for the current word
    React.useEffect(() => {
      const handleKeyDown = (event) => {
        const key = event.key.toUpperCase();

        if (/^[A-Z]$/.test(key)) {
          set_current_word((prev) => (prev.length < word_length ? prev + key : prev));
        } else if (key === "BACKSPACE") {
          set_current_word((prev) => prev.slice(0, -1));
        } else if (key === "ENTER") {
          set_current_word((prev) => {
            set_past_words((old_past_words) => {
              const last_word = old_past_words[old_past_words.length - 1];
              if (prev.length === word_length && is_one_letter_diff(prev, last_word) && is_valid_word(prev, word_length)) {
                return [...old_past_words, prev];
              }
              return old_past_words; // keep it if not valid
            });

            return prev.length === word_length && 
              is_one_letter_diff(prev, past_words[past_words.length - 1]) && 
              is_valid_word(prev, word_length) ? "" : prev; // clear input if it was a valid submission
          })
          
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [word_length]);

    // Restart the game whenever the word length changes
    React.useEffect(() => {
      restart_game();
    }, [word_length]);


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