// utils/leaderboard.js

function updateLeaderboard(leaderboard, username, streak) {
    // Check if username is falsy or empty and set default
    if (!username || username.trim() === '') {
        username = "MyUser"; // Default username if none provided
    }

    const index = leaderboard.findIndex(entry => entry.username === username);
    if (index !== -1) {
        // Only update the streak if the new streak is higher than the current
        if (leaderboard[index].streak < streak) {
            leaderboard[index].streak = streak;
        }
    } else {
        // Push a new entry if the user does not exist
        leaderboard.push({ username, streak });
    }
}


function getHighestStreak(leaderboard, username) {
    const entry = leaderboard.find(entry => entry.username === username);
    return entry ? entry.streak : 0;
}

module.exports = { updateLeaderboard, getHighestStreak };
