import React from 'react';
import './leaderboard.css';

import { get_sorted_leaderboard } from './leaderboard';

export function Leaderboard() {
    const [scores_3, set_scores_3] = React.useState([]);
    const [scores_4, set_scores_4] = React.useState([]);

    React.useEffect( () => {
        async function fetch_leaderboard() {
            set_scores_3(await get_sorted_leaderboard(3));
            set_scores_4(await get_sorted_leaderboard(4));
        }
        fetch_leaderboard();
    }, []);


  return (
    <main className="main-leaderboard container-fluid bg-secondary">
        <h2>
            Leaderboard
        </h2>

        <h3 className='leaderboard-title'>3 Letter Words</h3>
        <table className="table table-bordered w-50 table-striped table-dark">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Completions</th>
                    <th>Best Time</th>
                </tr>
            </thead>
            <tbody>
                {scores_3.length === 0 ? (
                    <tr>
                        <td colSpan="4">No scores yet. Play a game to get on the leaderboard!</td>
                    </tr>
                ) : (
                scores_3.map((entry, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{entry.user_name}</td>
                        <td>{entry.completions}</td>
                        <td>{entry.best_time.toFixed(2)}</td>
                    </tr>
                    ))
                )}
            </tbody>
        </table>

        <h3 className='leaderboard-title'>4 Letter Words</h3>
        <table className="table table-bordered w-50 table-striped table-dark">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Completions</th>
                    <th>Best Time</th>
                </tr>
            </thead>
            <tbody>
                {scores_4.length === 0 ? (
                    <tr>
                        <td colSpan="4">No scores yet. Play a game to get on the leaderboard!</td>
                    </tr>
                ) : (
                scores_4.map((entry, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{entry.user_name}</td>
                        <td>{entry.completions}</td>
                        <td>{entry.best_time.toFixed(2)}</td>
                    </tr>
                    ))
                )
                }
            </tbody>
        </table>
    </main>
  );
}