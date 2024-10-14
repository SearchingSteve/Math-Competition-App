/**
 * Updates or adds a new entry to the leaderboard.
 * If the user exists and a new highest streak is achieved, updates the streak and the date.
 * If the user does not exist, adds a new entry with the current date.
 * 
 * @param {Array<Object>} leaderboard - The array holding all leaderboard entries.
 * @param {string} username - The username of the participant.
 * @param {number} streak - The new streak achieved by the participant.
 */
function updateLeaderboard(leaderboard, username, streak) {
    const index = leaderboard.findIndex(user => user.username === username);
    if (index !== -1) {
        leaderboard[index].streak = streak;
        leaderboard[index].date = new Date().toISOString().split('T')[0]; // Update the date when the streak is updated
    } else {
        leaderboard.push({ username, streak, date: new Date().toISOString().split('T')[0] });
    }
}

/**
 * Retrieves the highest streak for a given username from the leaderboard.
 * If the username is not found in the leaderboard, returns 0.
 *
 * @param {Array<Object>} leaderboard - The leaderboard array containing user objects with `username` and `streak`.
 * @param {string} username - The name of the user whose highest streak is being retrieved.
 * @returns {number} The highest streak for the user, or 0 if the user is not found.
 */
function getHighestStreak(leaderboard, username) {
  const entry = leaderboard.find((entry) => entry.username === username);
  return entry ? entry.streak : 0;
}

module.exports = { updateLeaderboard, getHighestStreak };
