// Test suite for mathUtilities.js

const {
  getRandomQuestion,
  isCorrectAnswer,
  getRandomPrompt,
}= require("../../utils/mathUtilities");

// Test getRadomQuestion function
describe('getRandomQuestion', () => {
  test('generates a valid question for easy difficulty', () => {
    const [question, answer] = getRandomQuestion(1);
    expect(question).toMatch(/What is \d+ [\+\-\*\/] \d+\?/);
    expect(typeof answer).toBe('number');
  });

  test('generates a valid question for normal difficulty', () => {
    const [question, answer] = getRandomQuestion(2);
    expect(question).toMatch(/What is \d+ [\+\-\*\/] \d+\?/);
    expect(typeof answer).toBe('number');
  });

  test('generates a valid question for hard difficulty', () => {
    const [question, answer] = getRandomQuestion(3);
    expect(question).toMatch(/What is (\(\d+ [\+\-\*\/] \d+\)|\d+) [\+\-\*\/] (\(\d+ [\+\-\*\/] \d+\)|\d+)( [\+\-\*\/] (\(\d+ [\+\-\*\/] \d+\)|\d+))?\?/
);
    expect(typeof answer).toBe('number');
  });

  test('throws an error for invalid difficulty levels', () => {
    expect(() => {
      getRandomQuestion(4);
    }).toThrow("Invalid difficulty level");
  });
});

// Test isCorrectAnswer function
describe('isCorrectAnswer', () => {
  test('correctly validates a right answer', () => {
    const question = "What is 2 + 2?";
    const userAnswer = 4;
    expect(isCorrectAnswer(question, userAnswer)).toBeTruthy();
  });

  test('correctly validates a wrong answer', () => {
    const question = "What is 2 + 2?";
    const userAnswer = 5;
    expect(isCorrectAnswer(question, userAnswer)).toBeFalsy();
  });

  test('handles floating point precision issues', () => {
    const question = "What is 0.1 + 0.2?";
    const userAnswer = 0.3;
    const isCorrect = isCorrectAnswer(question, userAnswer);
    expect(isCorrect).toBeTruthy();
});
});

// Test getRandomPrompt function
describe('getRandomPrompt', () => {
  const possibleCorrectPrompts = ["Correct!", "Great job!", "Awesome!"];
  const possibleIncorrectPrompts = ["Incorrect. Try again!", "Oops! Try again!", "Not quite. Try again!"];

  test('returns a correct prompt for a correct answer', () => {
    const prompt = getRandomPrompt(true);
    expect(possibleCorrectPrompts).toContain(prompt); 
  });

  test('returns an incorrect prompt for an incorrect answer', () => {
    const prompt = getRandomPrompt(false);
    expect(possibleIncorrectPrompts).toContain(prompt); 
  });
});

