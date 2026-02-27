import React from "react";
import Button from 'react-bootstrap/Button';

import { get_random_word, is_valid_word } from './word_list';
import { Game_State } from './game_state';
import { update_leaderboard } from '../leaderboard/leaderboard';

export function Game({ word_length, user_name }) {
    const [start_word, set_start_word] = React.useState(get_random_word(word_length));
    const [end_word, set_end_word] = React.useState(get_random_word(word_length));
    
    //allows us to access the current end word in our event listener without worrying about stale closures
    const end_word_ref = React.useRef(end_word);
    React.useEffect(() => {
      end_word_ref.current = end_word;
    }, [end_word]);

    const [current_word, set_current_word] = React.useState("");
    const [past_words, set_past_words] = React.useState([start_word]);

    const [game_state, set_game_state] = React.useState(Game_State.Not_Started);
    const [time, set_time] = React.useState(0);
    const time_ref = React.useRef(null);

    const [shake, set_shake] = React.useState(false);

    

    // Restart the game with new random start and end words
   function new_game() {
        const new_start_word = get_random_word(word_length);
        const new_end_word = get_random_word(word_length);

        set_start_word(new_start_word);
        set_end_word(new_end_word);
        set_current_word("");
        set_past_words([new_start_word]);
    }

    // reset the current game back to the original start word and clear the past words
    function restart_game() {
        set_current_word("");
        set_past_words([start_word]);
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

    // Resets the timer to 0
    function reset_time() {
        set_time(0);
    }

    // Start a new game and set the state to running
    function start_game() {
      reset_time();
      new_game();
      set_game_state(Game_State.Running);
    }

    // quits the current game and returns to the not started state
    function give_up() {
      reset_time();
      new_game();
      set_game_state(Game_State.Not_Started);
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
                console.log("submitted word:", prev, "last word:", end_word_ref.current);
                if (prev === end_word_ref.current) {
                  set_game_state(Game_State.Game_Over);
                  update_leaderboard(user_name, time, word_length);
                }

                return [...old_past_words, prev];
              }

              set_shake(true);
              setTimeout(() => set_shake(false), 500);
              return old_past_words; // keep it if not valid
            });

            return "";// clear input if it was a valid submission
          })
          
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [word_length]);

    // Restart the game whenever the word length changes
    React.useEffect(() => {
      new_game();
    }, [word_length]);

    // starts a timer when the game starts, and stops it when the game ends
    React.useEffect(() => {
      if (game_state === Game_State.Running) {
        time_ref.current = setInterval(() => {
          set_time(prev => prev + 0.1);
        }, 100);
      } else {
        clearInterval(time_ref.current);
      }
    }, [game_state]);


    return (
        <div className="game">
            {/* the title and target chain */}
            <div className="title">
                <h3>Target Chain</h3>
                <p><span id="start_word">{game_state !== Game_State.Not_Started ? start_word : "###"}</span> -- 
                  <span id="end_word">{game_state !== Game_State.Not_Started ? end_word : "###"}</span></p>
            </div>

            {/* the game board */}
            {game_state === Game_State.Running &&
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
                <div className={`letter-cell ${shake ? "shake" : ""}`} key={i}>
                  {current_word[i] || ""}
                </div>
              ))}
              </div>
            </div>}           

            {/* the control buttons */}
            {game_state === Game_State.Running &&
            <div className="control-buttons">
                <button className="btn btn-dark" onClick={give_up}>give up</button>
                <button className="btn btn-dark" onClick={restart_game}>restart</button>
            </div>}

            {/* the start game button */}
            {game_state === Game_State.Not_Started && <Button variant="dark" onClick={start_game}>Start Game</Button>}

            {/* the game over screen with the player's time and a button to start a new game */}
            {game_state === Game_State.Game_Over &&
            <div>
                <h2>You Win!</h2>
                <p>Your time: {time.toFixed(2)} seconds</p>
                <button className="btn btn-dark" onClick={start_game}>Play Again</button>
            </div>}
        </div>);
}