export async function get_leaderboard() {
    const response =  await fetch('/api/leaderboard', {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    
    return data;
}

// updates the leaderboard with a new completion time for a user, adding them if they don't exist
export async function update_leaderboard(completion_time, word_length, start_word, end_word) {
    const response =  await fetch('/api/leaderboard', {
        method: 'post',
        body: JSON.stringify({ completion_time, word_length, start_word, end_word }),
        headers: { 'Content-Type': 'application/json' }
    });
}

//returns an array of leaderboard entries sorted by best time, with each entry containing the user name, number of completions, and best time
export async function get_sorted_leaderboard(word_length) {
    const entries = await get_leaderboard();

    const best_key = word_length === 3 ? 'best_time_3' : 'best_time_4';
    const completions_key = word_length === 3 ? 'completions_3' : 'completions_4';

    return entries
        .filter(entry => entry[completions_key] > 0)
        .sort((a, b) => a[best_key] - b[best_key])
        .map(entry => ({
            user_name: entry.user_name,
            completions: entry[completions_key],
            best_time: entry[best_key]
        }));
}