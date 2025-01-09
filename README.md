# Math Competition App

The **Math Competition App** is a simple express based web application where users can practice solving math questions, track their streak of correct answers, and view leaderboards.

## Features

- **Home Page**: Start a new quiz or view leaderboards. Display the user's last recorded streak or a message if no streak exists.
- **Quiz Page**: Answer math questions while tracking the user's streak of correct answers.
- **Quiz Completion Page**: Show the current streak and allow the user to start a new quiz or return to the home page.
- **Leaderboards Page**: Display the top 10 streaks, including the number of correct answers and when the streak was achieved.

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [Development Guidelines](#development-guidelines)
3. [Folder Structure](#folder-structure)
4. [Run the Application](#run-the-application)
5. [Running Unit Tests](#running-unit-tests)
6. [License](#license)
7. [Author](#author)

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org) installed on your machine.
- A code editor, such as [VSCode](https://code.visualstudio.com/).

### Steps to Create Your Own Repository

1. **Click the "Use this template" button** at the top of this page on GitHub.
2. **Name your new repository** and choose its visibility (public or private).
3. Clone your new repository to your local machine:
   git clone <your-new-repo-url>
4. Navigate into the project directory and install the necessary dependencies:
   cd <your-new-repo-name>
   npm install
5. **Run the app**:
   npm start
   This starts the server at `http://localhost:3000/`.

6. **Run tests**:
   npm test
   This runs the unit tests for the application.

## Development Guidelines

### Homepage
- Links to start a new quiz or view the leaderboards.
- Display the last recorded streak or a message if no streak exists.

### Quiz Functionality
- Users can select the difficulty level: Easy, Medium, or Hard.
- Generate math questions based on the selected difficulty, tracking the user's streak of consecutive correct answers.
- After each question, check if the answer is correct and provide feedback. Update the streak accordingly; reset the streak to zero on an incorrect answer.
- The quiz should consist of a configurable number of questions (e.g., 3 questions).
- At the end of the quiz, display a summary of the user's performance.

### Leaderboard
- Track and display the top 10 streaks in memory, including:
  - Username (default to "MyUser" for each session)
  - Highest streak
  - Date the streak was achieved
- Sort the leaderboard by streak in descending order.

### Testing
- Write unit tests covering core functionality:
  - Generating random math questions of varying difficulty.
  - Identifying correct and incorrect answers.
  - Handling edge cases (e.g., floating point precision).
- Use the Jest testing framework to automate unit testing.

## Folder Structure

- **`/public/`**: Static assets (CSS, images, etc.).
- **`/views/`**: EJS templates for rendering HTML pages.
- **`/utils/`**: Utility functions (e.g., `mathUtilities.js`, `leaderboard.js`).
- **`app.js`**: Main application file for server setup and routing.
- **`README.md`**: Documentation file.

## Run the Application

1. Clone the repository:
   git clone <your-new-repo-url>
2. Navigate to the project directory:
   cd <your-new-repo-name>
3. Install dependencies:
   npm install
4. Run the server:
   npm start
5. Access the app at `http://localhost:3000/` in your browser.

## Running Unit Tests

1. Install Jest (if not already installed):
   npm install jest --save-dev
2. Run the tests:
   npm test
3. Review the test results to ensure all functionalities are working as expected.

## License

This project is provided for **personal use only**. Redistribution, modification, or commercial use in any form is strictly prohibited without prior written permission from the author.

For detailed license terms, refer to the [LICENSE](./LICENSE.md) file.

## Author
- **[Stephen Crocker](https://github.com/SearchingSteve)** 
