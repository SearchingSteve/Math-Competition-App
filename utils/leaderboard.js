/**
 * Updates the leaderboard with a new streak for the given username.
 * If the username exists and the new streak is higher than the current one, it updates the streak.
 * If the username doesn't exist, it adds the username to the leaderboard with the given streak.
 *
 * @param {Array<Object>} leaderboard - The leaderboard array containing user objects with `username` and `streak`.
 * @param {string} username - The name of the user whose streak is being updated.
 * @param {number} streak - The new streak value to update or add.
 */
function updateLeaderboard(leaderboard, username, streak) {
  // Check if username is falsy or empty and set default
  if (!username || username.trim() === "") {
    throw new Error("Invalid username: " + username);
  }

  const index = leaderboard.findIndex((entry) => entry.username === username);
  if (index !== -1) {
    // Only update the streak if the new streak is higher than the current
    if (leaderboard[index].streak < streak) {
      leaderboard[index].streak = streak;
    }
  } else {
    // Add a new entry if the user does not exist
    leaderboard.push({ username, streak });
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
