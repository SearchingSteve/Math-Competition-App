/**
 * Generates a random multiplication, division, subtraction, or addition question
 * based on the difficulty level.
 *
 * @param {number} difficulty - The difficulty level: 1 for easy, 2 for normal, 3 for hard.
 * @returns {List} The randomly generated math question and respective answer.
 */
function getRandomQuestion(difficulty) {
  console.log("Received difficulty:", difficulty);

  let questionText = "";
  let num1, num2, num3, operator1, operator2;
  const level = parseInt(difficulty, 10);
  if (![1, 2, 3].includes(level)) {
    throw new Error("Invalid difficulty level: " + difficulty);
  }

  switch (level) {
    case 1: // Easy
      num2 = getRandomNonZeroInt(1);
      operator1 = getRandomOperator();
      num1 = simpleDividend(num2, operator1, 1);
      questionText = `What is ${num1} ${operator1} ${num2}?`;
      break;
    case 2: // Normal
      num2 = getRandomInt(2);
      operator1 = getRandomOperator();
      num1 = simpleDividend(num2, operator1, 2);
      questionText = `What is ${num1} ${operator1} ${num2}?`;
      break;
    case 3: // Hard
      num2 = getRandomNonZeroInt(3);
      operator1 = getRandomOperator();
      num1 = simpleDividend(num2, operator1, 3);
      operator2 = getRandomOperator();
      num3 = getRandomNonZeroInt(3);
      questionText = stringifyQuestion(num1, num2, num3, operator1, operator2);
      break;
    default:
      throw new Error("Invalid difficulty level: " + difficulty);
  }

  let correctAnswer = Math.round(eval(questionText.replace('What is ', '').replace('?', '')));
  console.log("Question: ", questionText, "Answer: ", correctAnswer);
  return [questionText, correctAnswer];
}

/**
 * Constructs a math question string with appropriate operations and ensures divisions result in whole numbers.
 *
 * @param {number} num1 - The first number.
 * @param {number} num2 - The second number (divisor for division operations).
 * @param {number} num3 - The third number, used in difficulty level 3.
 * @param {string} operator1 - The first operator.
 * @param {string} operator2 - The second operator, used in difficulty level 3.
 * @returns {string} A math question string that ensures whole number results for all operations.
 */
function stringifyQuestion(num1, num2, num3, operator1, operator2) {
    // Managing division to prevent results that round to zero
    if (operator1 === '/') {
        num1 = num2 * getRandomMultiplier(num2); // Ensuring num1 is a multiple of num2 and large enough
    }
    if (operator2 === '/') {
        // Adjust num3 to ensure the operation does not trivialize the result
        let tempResult = eval(`${num1} ${operator1} ${num2}`);
        num3 = getRandomNonTrivialDivisor(tempResult);
    }

    let questionStr = `${num1} ${operator1} ${num2} ${operator2} ${num3}`;
    return `What is ${questionStr}?`;
}

/**
 * Generates a random integer with specified number of digits.
 *
 * @param {number} digits - The number of digits for the random number.
 * @returns {number} A random integer with the specified number of digits.
 */
/**
 * Generates a random integer with exactly the specified number of digits.
 *
 * @param {number} digits - The number of digits for the random number.
 * @returns {number} A random integer with exactly the specified number of digits.
 */
function getRandomInt(digits) {
  const min = Math.pow(10, digits - 1); // Minimum number for the digit count
  const max = Math.pow(10, digits) - 1; // Maximum number for the digit count
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomNonZeroInt(digits) {
  let num;
  do {
    num = getRandomInt(digits);
  } while (num === 0);
  return num;
}

function simpleDividend(divisor, operator, digits) {
  if (operator === "/") {
    // Ensure the dividend is a multiple of the divisor to guarantee a whole number result
    let multiplier = getRandomInt(digits);
    return divisor * multiplier;
  } else {
    return getRandomInt(digits);
  }
}


function getRandomNonTrivialDivisor(number) {
    let divisor;
    do {
        divisor = getRandomNonZeroInt(1); // or adjust the range based on 'number'
    } while (number / divisor < 1); // Ensure the result is not trivially small or zero
    return divisor;
}

/**
 * Generate a reasonable multiplier for the division to make sure results are significant.
 *
 * @param {number} base - The base number to multiply to get a new dividend.
 * @returns {number} A multiplier that ensures non-trivial division results.
 */
function getRandomMultiplier(base) {
    return Math.ceil(base / 10) + 1; // Simple heuristic to get a larger number
}

/**
 * Gets a random operator from the list of operations.
 *
 * @returns {string} A random operator (+, -, *, /).
 */
function getRandomOperator() {
  const operators = [ "+","-","*","/"];
  const chosenOperator =
    operators[Math.floor(Math.random() * operators.length)];
  console.log("Chosen operator:", chosenOperator);
  return chosenOperator;
}

/**
 * Checks if the user's answer is correct by comparing it against the evaluated result of the math question.
 * This function extracts the mathematical expression from the question string, evaluates it,
 * and then compares the result with the user's provided answer, accounting for potential floating point precision issues.
 *
 * @param {string} question - The math question as a string. This should include the entire question text ending with a question mark.
 * @param {number} answer - The user's answer as a floating number. This is what will be compared to the calculated answer.
 * @returns {boolean} True if the user's answer is within a very small range (0.00001) of the correct answer, otherwise false.
 */
function isCorrectAnswer(question, answer) {
  const regex = /What is\s+(.*)\?/;
  const matches = question.match(regex);
  if (!matches) {
    console.error("Question format error:", question);
    return false;
  }
  // Evaluate the expression and round to handle floating point precision issues
  let correctAnswer = Math.round(eval(matches[1]));
  return Math.abs(correctAnswer - parseFloat(answer)) < 0.00001;
}

/**
 * Select random prompt message from the submissionPrompts array.
 *
 * @param {boolean} isCorrect - Is user's answer correct or not.
 * @returns {string} Random feedback message (Correct or Incorrect).
 */
function getRandomPrompt(isCorrect) {
  let submissionPrompts = [
    ["Correct!", "Incorrect. Try again!"],
    ["Great job!", "Oops! Try again!"],
    ["Awesome!", "Not quite. Try again!"],
  ];
  const prompts =
    submissionPrompts[Math.floor(Math.random() * submissionPrompts.length)];
  return isCorrect ? prompts[0] : prompts[1];
}

// Export the functions
module.exports = {
  getRandomQuestion,
  isCorrectAnswer,
  getRandomInt,
  getRandomPrompt,
};
