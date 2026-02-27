//retrieves the leaderboard from local storage, or initializes it if it doesn't exist
export function get_leaderboard() {
    const data = localStorage.getItem('leaderboard');
    return data ? JSON.parse(data) : {};
}

// saves the given leaderboard data to local storage
export function save_leaderboard(data) {
    localStorage.setItem('leaderboard', JSON.stringify(data));
}

// updates the leaderboard with a new completion time for a user, adding them if they don't exist
export function update_leaderboard(user_name, completion_time, word_length) {
    const leaderboard = get_leaderboard();
   
    if (word_length === 3) {
        if (!leaderboard[user_name]) {
            leaderboard[user_name] = { completions_3: 1, completions_4: 0, best_time_3: completion_time, best_time_4: null };
        } else {
            leaderboard[user_name].completions_3 += 1;
            if (completion_time < leaderboard[user_name].best_time_3 || leaderboard[user_name].best_time_3 === null) {
                leaderboard[user_name].best_time_3 = completion_time;
            }
        }
    } else if (word_length === 4) {
        if (!leaderboard[user_name]) {
            leaderboard[user_name] = { completions_3: 0, completions_4: 1, best_time_3: null, best_time_4: completion_time };
        } else {
            leaderboard[user_name].completions_4 += 1;
            if (completion_time < leaderboard[user_name].best_time_4 || leaderboard[user_name].best_time_4 === null) {
                leaderboard[user_name].best_time_4 = completion_time;
            }
        }
    }

     save_leaderboard(leaderboard);
}

//returns an array of leaderboard entries sorted by best time, with each entry containing the user name, number of completions, and best time
export function get_sorted_leaderboard(word_length) {
    const leaderboard = get_leaderboard();
    let entries = Object.entries(leaderboard);

    const best_key = word_length === 3 ? 'best_time_3' : 'best_time_4';
    const completions_key = word_length === 3 ? 'completions_3' : 'completions_4';

    entries = entries.filter(([, stats]) => stats[completions_key] > 0);
    entries.sort(([, A_stats], [, B_stats]) => A_stats[best_key] - B_stats[best_key]);

    return entries.map(([user_name, stats]) => ({
        user_name,
        completions: stats[completions_key],
        best_time: stats[best_key]
    }));
}