const express = require("express");
const app = express();
const port = 3000;
const { getRandomQuestion, getRandomPrompt } = require("./utils/mathUtilities");
const { updateLeaderboard, getHighestStreak } = require("./utils/leaderboard");

let currentQuestion = ""; // Store the current question
let currentCorrectAnswer = ""; // Store the correct answer
let currentStreak = 0; // Initialize streak counter
let difficulty = 1; // Set default difficulty level (1 for easy)
let questionsCompleted = 0; // Initialize questions completed counter
let questionsSuccessful = 0; // Initialize questions successful counter
let numQuestions = 3; // Set number of questions per quiz
let username = "Guest"; // Initialize username

let leaderboard = [
  { username: "Isaac", streak: 1, date: "2024-10-01" },
  { username: "Carl", streak: 2, date: "2024-09-30" },
  { username: "Albert", streak: 3, date: "2024-09-29" },
  { username: "Blaise", streak: 4, date: "2024-09-28" },
  { username: "Leonhard", streak: 5, date: "2024-09-27" },
  { username: "Sophie", streak: 10, date: "2024-09-26" },
  { username: "Pythagoras", streak: 20, date: "2024-09-25" },
  { username: "Ada", streak: 30, date: "2024-09-24" },
  // { username: "Rene", streak: 45, date: "2024-09-23" },
  // { username: "Archimedes", streak: 50, date: "2024-09-22" },
  // { username: "Euclid", streak: 65, date: "2024-09-21" },
  // { username: "Emmy", streak: 75, date: "2024-09-20" },
  // { username: "Niels", streak: 85, date: "2024-09-19" },
  // { username: "David", streak: 95, date: "2024-09-18" },
  // { username: "Bernhard", streak: 100, date: "2024-09-17" }
];


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Home route
app.get("/", (req, res) => {
  // Check if reset has been requested
  if (req.query.reset) {
    questionsCompleted = 0; // Reset questions completed counter
  }
  res.render("index", {
    username,
    streak: currentStreak,
  });
});

// Quiz route
app.get("/quiz", (req, res) => {
  const newDifficulty = req.query.difficulty || difficulty;
  difficulty = parseInt(newDifficulty, 10);
  const [question, correctAnswer] = getRandomQuestion(difficulty);
  currentQuestion = question;
  currentCorrectAnswer = correctAnswer;
  res.render("quiz", {
    username,
    question: currentQuestion,
    questionsSuccessful,
    questionsCompleted,
    numQuestions: numQuestions,
    correctAnswer: currentCorrectAnswer,
    streak: currentStreak,
    difficulty: difficulty,
  });

  console.log(username);
});

// Handles quiz submissions
app.post("/quiz", (req, res) => {
  const { answer } = req.body; // Get answer and username from form submission
  const isCorrect = parseFloat(answer) === parseFloat(currentCorrectAnswer); // Check if answer is correct
  let highestStreak = getHighestStreak(leaderboard, username); // Get highest streak for the user
  console.debug("Highest Streak: ", highestStreak);
  if (isCorrect) {
    questionsSuccessful++; // Increment successful questions counter
    currentStreak++; // Increment streak on correct answer
    console.log(`New streak for ${username}: ${currentStreak}`);
    if (currentStreak > highestStreak) {
      highestStreak = currentStreak; // Update highest streak if current streak is higher
      updateLeaderboard(leaderboard, username, currentStreak); // Update only if current streak is a new highest
      console.log(`Leaderboard updated for ${username}: ${currentStreak}`);
    }
  } else {
    currentStreak = 0; // Reset streak on incorrect answer
  }

  questionsCompleted++;

  if (questionsCompleted >= numQuestions) {
    res.render("quiz-completion", {
      // Render completion page instead of another question
      username,
      questionsCompleted,
      questionsSuccessful,
      streak: currentStreak,
      highestStreak,
    });
    questionsCompleted = 0; // Reset questions completed for the next quiz
    questionsSuccessful = 0; // Reset questions successful for the next quiz
    return;
  }

  const [newQuestion, newCorrectAnswer] = getRandomQuestion(difficulty);
  currentQuestion = newQuestion;
  currentCorrectAnswer = newCorrectAnswer;

  const prompt = getRandomPrompt(isCorrect);
  res.render("quiz", {
    username: username,
    question: currentQuestion,
    questionsCompleted,
    numQuestions: numQuestions,
    correctAnswer: currentCorrectAnswer,
    streak: currentStreak,
    difficulty: difficulty,
    prompt: prompt,
  });
});

// Leaderboard route
app.get("/leaderboards", (req, res) => {
  // Sort the leaderboard by streak in descending order
  leaderboard.sort((a, b) => b.streak - a.streak);

  res.render("leaderboards",
    { leaderboard: leaderboard, 
      username: username,
      streak: currentStreak,
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
