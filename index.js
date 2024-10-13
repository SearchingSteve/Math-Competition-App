const express = require('express');
const app = express();
const port = 3000;
const { generateRandomQuestion } = require('./utils/mathUtilities');
const { updateLeaderboard, getHighestStreak } = require('./utils/leaderboard'); // Ensure these functions are implemented properly

let currentQuestion = '';
let currentCorrectAnswer = ''; // Store the correct answer
let currentStreak = 0; // Initialize streak counter
let currentDifficulty = 1; // Set default difficulty level (1 for easy)
let leaderboard = [{ username: "user1", streak: 5 },{ username: "user2", streak: 5 },{ username: "user3", streak: 10 },{ username: "user4", streak: 100 },{ username: "user5", streak: 1000 }]; // Initialize the leaderboard array

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
    res.render('index');
});

// Quiz route
app.get('/quiz', (req, res) => {
    // Check if there's a difficulty change request
    if (req.query.difficulty) {
        currentDifficulty = parseInt(req.query.difficulty);
    }
    const [question, correctAnswer] = generateRandomQuestion(currentDifficulty);
    currentQuestion = question;
    currentCorrectAnswer = correctAnswer;
    res.render('quiz', {
        question: currentQuestion,
        correctAnswer: currentCorrectAnswer,
        streak: currentStreak,
        difficulty: currentDifficulty
    });
});

// Handles quiz submissions
app.post('/quiz', (req, res) => {
    const { answer, username } = req.body; // Assume username is passed from the client
    const isCorrect = parseFloat(answer) === parseFloat(currentCorrectAnswer); // Check if answer is correct

    if (isCorrect) {
        currentStreak++; // Increment streak on correct answer
        const highestStreak = getHighestStreak(leaderboard, username);
        if (currentStreak > highestStreak) {
            updateLeaderboard(leaderboard, username, currentStreak); // Update only if current streak is a new high
        }
    } else {
        currentStreak = 0; // Reset streak on incorrect answer
    }

    const [newQuestion, newCorrectAnswer] = generateRandomQuestion(currentDifficulty);
    currentQuestion = newQuestion;
    currentCorrectAnswer = newCorrectAnswer;

    res.render('quiz', {
        question: currentQuestion,
        correctAnswer: currentCorrectAnswer, 
        streak: currentStreak,
        difficulty: currentDifficulty,
        message: isCorrect ? "Correct!" : "Incorrect. Try again!"
    });
});

// Leaderboard route
app.get('/leaderboards', (req, res) => {
    // Sort the leaderboard by streak in descending order
    leaderboard.sort((a, b) => b.streak - a.streak);

    res.render('leaderboards', { leaderboard: leaderboard });

});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
