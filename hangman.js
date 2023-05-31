const readline = require('readline-sync');

// Hangman Game
const wordList = ['javascript', 'hangman', 'openai', 'programming', 'computer']; // List of words
let chosenWord = ''; // The word to guess
let guessedLetters = []; // Array to store guessed letters
let remainingGuesses = 6; // Number of remaining guesses

// Select a random word from the word list
function selectRandomWord() {
  chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
}

// Initialize the game
function initializeGame() {
  selectRandomWord();
  guessedLetters = [];
  remainingGuesses = 6;
  console.log('Welcome to Hangman!');
  console.log('Guess the word by entering one letter at a time.');
  console.log('You have 6 incorrect guesses before the game is over.');
  console.log('-----------------------------------------------');
  updateDisplay();
}

// Update the display
function updateDisplay() {
  // Display the word with blanks for unguessed letters
  let wordDisplay = '';
  for (let i = 0; i < chosenWord.length; i++) {
    if (guessedLetters.includes(chosenWord[i])) {
      wordDisplay += chosenWord[i];
    } else {
      wordDisplay += '_';
    }
    wordDisplay += ' ';
  }
  console.log('Word: ' + wordDisplay);

  // Display the guessed letters
  console.log('Guessed Letters: ' + guessedLetters.join(', '));
  console.log('Remaining Guesses: ' + remainingGuesses);

  // Check if the game is over
  if (remainingGuesses === 0) {
    console.log('Game over! The word was ' + chosenWord);
    process.exit();
  } else if (!wordDisplay.includes('_')) {
    console.log('Congratulations! You guessed the word!');
    process.exit();
  }

  // Prompt for the next guess
  const input = readline.question('Enter your guess: ').toLowerCase();
  processGuess(input);
}

// Process the user's guess
function processGuess(input) {
  // Check if the input is a single letter
  if (input.length !== 1 || !input.match(/[a-z]/i)) {
    console.log('Please enter a single letter.');
    updateDisplay();
    return;
  }

  // Check if the letter has already been guessed
  if (guessedLetters.includes(input)) {
    console.log('You have already guessed that letter.');
    updateDisplay();
    return;
  }

  // Add the guessed letter to the array
  guessedLetters.push(input);

  // Check if the guessed letter is in the chosen word
  if (!chosenWord.includes(input)) {
    remainingGuesses--;
  }

  // Update the display
  updateDisplay();
}

// Start the game
initializeGame();
