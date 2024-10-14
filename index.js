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
// Initialize the leaderboard array
 let leaderboard = [
    { username: "Isaac", streak: 1 },
    { username: "Carl", streak: 2 },
    { username: "Albert", streak: 3 },
    { username: "Blaise", streak: 4 },
    { username: "Leonhard", streak: 5 },
    { username: "Sophie", streak: 10 },
    { username: "Pythagoras", streak: 20 },
    { username: "Ada", streak: 30 },
    // { username: "Rene", streak: 45 },
    // { username: "Archimedes", streak: 50 },
    // { username: "Euclid", streak: 65 },
    // { username: "Emmy", streak: 75 },
    // { username: "Niels", streak: 85 },
    // { username: "David", streak: 95 },
    // { username: "Bernhard", streak: 100 }
];


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Home route
app.get("/", (req, res) => {
    // Check if reset has been requested
    if (req.query.reset) {
      questionsCompleted = 0; // Reset questions completed counter
      // Optionally reset other quiz-related data here if needed
    }
    res.render("index", {
      username,
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
      questionsCompleted,
      questionsSuccessful,
      streak: currentStreak,
      highestStreak
      
      
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

  res.render("leaderboards", { leaderboard: leaderboard });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
