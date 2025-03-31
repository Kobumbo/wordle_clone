const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

/**
 * In-memory store for:
 *   - activeGames: { [gameId]: { solution, attempts, maxAttempts, isGameOver } }
 */
const activeGames = {};

const wordLists = {
  5: fs
    .readFileSync("words_5_letters.txt", "utf-8")
    .split("\n")
    .map((w) => w.trim()),
  6: fs
    .readFileSync("words_6_letters.txt", "utf-8")
    .split("\n")
    .map((w) => w.trim()),
  // Add more sizes if needed
};

// Start a new game
app.post("/api/game", (req, res) => {
  const { length = 5 } = req.body;
  const wordList = wordLists[length];
  if (!wordList) {
    return res.status(400).json({ error: "Unsupported word length" });
  }

  const solution =
    wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();

  // Create a new game object
  const gameId = uuidv4();
  activeGames[gameId] = {
    solution,
    attempts: [],
    maxAttempts: 6,
    isGameOver: false,
  };

  res.json({ gameId, length, maxAttempts: 6 });
});

// Submit a guess
app.post("/api/guess", (req, res) => {
  const { gameId, guess } = req.body;
  const game = activeGames[gameId];

  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }
  if (game.isGameOver) {
    return res.status(400).json({ error: "Game is already over" });
  }

  const solution = game.solution;
  if (guess.length !== solution.length) {
    return res
      .status(400)
      .json({ error: `Guess must be ${solution.length} letters long` });
  }

  // Generate feedback
  const feedback = generateFeedback(solution, guess);

  console.log(
    `GUESS: ${guess} — SOLUTION: ${solution} — FEEDBACK: ${feedback}`
  );

  // Save the attempt
  game.attempts.push({ guess, feedback });

  // Check if the guess is correct
  if (guess.toLowerCase() === solution.toLowerCase()) {
    game.isGameOver = true;
    return res.json({ feedback, correct: true, gameOver: true });
  }

  // Check if out of attempts
  if (game.attempts.length >= game.maxAttempts) {
    game.isGameOver = true;
    return res.json({
      feedback,
      correct: false,
      gameOver: true,
      message: "No more attempts left.",
      word: solution,
    });
  }

  // Otherwise, still playing
  return res.json({
    feedback,
    correct: false,
    gameOver: false,
  });
});

function generateFeedback(solution, guess) {
  const feedback = Array(guess.length).fill("gray");
  const solutionLetters = solution.split("");
  const guessLetters = guess.toLowerCase().split("");

  const solutionUsed = Array(solution.length).fill(false);
  const guessUsed = Array(guess.length).fill(false);

  // Step 1: Mark green (correct letter, correct position)
  for (let i = 0; i < guessLetters.length; i++) {
    if (guessLetters[i] === solutionLetters[i]) {
      feedback[i] = "green";
      solutionUsed[i] = true;
      guessUsed[i] = true;
    }
  }

  // Step 2: Mark yellow (correct letter, wrong position)
  for (let i = 0; i < guessLetters.length; i++) {
    if (!guessUsed[i]) {
      for (let j = 0; j < solutionLetters.length; j++) {
        if (!solutionUsed[j] && guessLetters[i] === solutionLetters[j]) {
          feedback[i] = "yellow";
          solutionUsed[j] = true;
          break;
        }
      }
    }
  }

  return feedback;
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Wordle backend is running on port ${PORT}`);
});
