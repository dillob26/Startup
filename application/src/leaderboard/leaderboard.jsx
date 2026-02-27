import React from 'react';
import './leaderboard.css';

import { get_sorted_leaderboard } from './leaderboard';

export function Leaderboard() {
    const [scores, set_scores] = React.useState([]);

    React.useEffect(() => {
        set_scores(get_sorted_leaderboard());
    }, []);

  return (
    <main className="main-leaderboard container-fluid bg-secondary">
        <h2>
            Leaderboard
        </h2>


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
                <tr>
                    <td>1</td>
                    <td>Timmothy</td>
                    <td>46</td>
                    <td>0:15</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>John</td>
                    <td>52</td>
                    <td>0:24</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Greg</td>
                    <td>14</td>
                    <td>1:53</td>
                </tr>
            </tbody>
        </table>
    </main>
  );
}