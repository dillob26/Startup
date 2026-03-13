//retrieves the leaderboard from local storage, or initializes it if it doesn't exist
export async function get_leaderboard() {
    const response =  await fetch('/leaderboard', {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    
    return data;
}

// updates the leaderboard with a new completion time for a user, adding them if they don't exist
export async function update_leaderboard(user_name, completion_time, word_length) {
    const response =  await fetch('/leaderboard', {
        method: 'post',
        body: JSON.stringify({ user_name, completion_time, word_length }),
        headers: { 'Content-Type': 'application/json' }
    });
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