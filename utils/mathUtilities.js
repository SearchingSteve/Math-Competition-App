
/**
 * Generates a random multiplication, division, subtraction, or addition question
 * 
 * @param {number} difficulty - The difficulty level: 1 for easy, 2 for normal, 3 for hard.
 * @returns {List} The randomly generated math question and respective answer.
 */
function getRandomQuestion(difficulty) {
    let questionText = '';
    let num1, num2, num3, operator1, operator2;

    switch (difficulty) {
        case 1: // Easy: 1 digit, 1 operation
            operator1 = getRandomOperator();
            num2 = getRandomInt(1);  // Get divisor first
            num1 = num2 * getRandomMultiplier(1); // Ensure num1 is a multiple of num2
            questionText = `What is ${num1} ${operator1} ${num2}?`;
            break;
        case 2: // Normal: 2 digits, 1 operation
            operator1 = getRandomOperator();
            num2 = getRandomInt(2);  // Get divisor first
            num1 = num2 * getRandomMultiplier(2); // Ensure num1 is a multiple of num2
            questionText = `What is ${num1} ${operator1} ${num2}?`;
            break;
        case 3: // Hard: 3 digits, 2 operations
            operator1 = getRandomOperator();
            operator2 = getRandomOperator();
            num2 = getRandomInt(3); // First divisor for the first operation
            num1 = num2 * getRandomMultiplier(3); // Ensure num1 is a multiple of num2
            num3 = getRandomInt(3); // Second divisor for the second operation
            questionText = `What is ${num1} ${operator1} ${num2} ${operator2} ${num3}?`;
            break;
        default:
            throw new Error("Invalid difficulty level");
    }

    // Calculate the correct answer using eval and rounding to handle floating point precision issues
    let questionWithoutText = questionText.replace('What is ', '').replace('?', '');
    let correctAnswer = Math.round(eval(questionWithoutText));

    return [questionText, correctAnswer]; // Return question and answer
}

/**
 * Generates a random multiplier depending on the number of digits specified.
 * 
 * @param {number} digits - The number of digits for the multiplier.
 * @returns {number} A random multiplier.
 */
function getRandomMultiplier(digits) {
    return Math.ceil(Math.random() * (Math.pow(10, digits) - 1)); // Ensure at least 1
}

/**
 * Generates a random integer with the specified number of digits.
 * 
 * @param {number} digits - The number of digits for the random number.
 * @returns {number} A random integer with the specified number of digits.
 */
function getRandomInt(digits) {
    return Math.ceil(Math.random() * (Math.pow(10, digits) - 1));
}

/**
 * Gets a random operator from the list of operations.
 * 
 * @returns {string} A random operator (+, -, *, /).
 */
function getRandomOperator() {
    const operators = ['+', '-', '*', '/'];
    const chosenOperator = operators[Math.floor(Math.random() * operators.length)];
    console.log('Chosen operator:', chosenOperator);
    return chosenOperator;
}

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
    let submissionPrompts = [['Correct!', 'Incorrect. Try again!'], ['Great job!', 'Oops! Try again!'], ['Awesome!', 'Not quite. Try again!']];
    const prompts = submissionPrompts[Math.floor(Math.random() * submissionPrompts.length)];
    return isCorrect ? prompts[0] : prompts[1];
}


// Export the functions
module.exports = {
    getRandomQuestion,
    isCorrectAnswer,
    getRandomInt,
    getRandomPrompt
};

