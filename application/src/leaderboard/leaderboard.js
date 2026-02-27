//retrieves the leaderboard from local storage, or initializes it if it doesn't exist
function get_leaderboard() {
    const data = localStorage.getItem('leaderboard');
    return data ? JSON.parse(data) : {};
}

// saves the given leaderboard data to local storage
function save_leaderboard(data) {
    localStorage.setItem('leaderboard', JSON.stringify(data));
}

// updates the leaderboard with a new completion time for a user, adding them if they don't exist
function update_leaderboard(user_name, completion_time) {
    const leaderboard = get_leaderboard();
    if (!leaderboard[user_name]) {
        leaderboard[user_name] = {
            completions: 1,
            best_time: completion_time
        };
    } else {
        leaderboard[user_name].completions += 1;
        if (completion_time < leaderboard[user_name].best_time) {
            leaderboard[user_name].best_time = completion_time;
        }
    }
     save_leaderboard(leaderboard);
}

//returns an array of leaderboard entries sorted by best time, with each entry containing the user name, number of completions, and best time
function get_sorted_leaderboard() {
    const leaderboard = get_leaderboard();
    const entries = Object.entries(leaderboard);

    entries.sort(([, A_stats], [, B_stats]) => A_stats.best_time - B_stats.best_time);

    return entries.map(([user_name, stats]) => ({
        user_name,
        completions: stats.completions,
        best_time: stats.best_time
    }));
}