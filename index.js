const express = require('express');
const app = express();
const port = 3000;
const { generateRandomQuestion, isCorrectAnswer } = require('./utils/mathUtilities');

let currentQuestion = '';
let currentCorrectAnswer = ''; // Store correct answer
let currentStreak = 0; // Initialize streak counter
let currentDifficulty = 1; // Set default difficulty level (1 for easy)

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
    const { answer } = req.body;
    const isCorrect = parseFloat(answer) === parseFloat(currentCorrectAnswer); // Check if answer is correct

    if (isCorrect) {
        currentStreak++; // Increment streak on correct answer
    } else {
        currentStreak = 0; // Reset streak on incorrect answer
    }

    // Generate a new question and correct answer for the next round
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
    res.render('leaderboards', { streak: currentStreak }); // Pass current streak to leaderboards
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
