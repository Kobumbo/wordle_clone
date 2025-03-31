import React, { useEffect, useRef, useState } from "react";
import Keyboard from "./Keyboard";

function GameBoard({
  gameId,
  wordLength,
  maxAttempts,
  guesses,
  setGuesses,
  gameOver,
  setGameOver,
  message,
  setMessage,
}) {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [letterStates, setLetterStates] = useState({});
  const [correctWord, setCorrectWord] = useState(null);

  useEffect(() => {
    const focusInput = () => {
      inputRef.current?.focus();
    };
    focusInput();
    window.addEventListener("click", focusInput);
    window.addEventListener("keydown", focusInput);
    return () => {
      window.removeEventListener("click", focusInput);
      window.removeEventListener("keydown", focusInput);
    };
  }, []);

  const updateLetterStates = (guess, feedback) => {
    const newStates = { ...letterStates };
    guess.split("").forEach((letter, i) => {
      const result = feedback[i];
      const prev = newStates[letter];
      if (
        result === "green" ||
        (result === "yellow" && prev !== "green") ||
        (result === "gray" && !prev)
      ) {
        newStates[letter] = result;
      }
    });
    setLetterStates(newStates);
  };

  const submitGuess = async (guess) => {
    const res = await fetch("http://localhost:4000/api/guess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId, guess }),
    });
    const data = await res.json();

    setGuesses((prev) => [...prev, { guess, feedback: data.feedback }]);
    updateLetterStates(guess, data.feedback);

    if (data.gameOver) {
      setGameOver(true);
      setCorrectWord(data.word);
      setMessage(
        data.correct ? "🎉 You guessed it!" : data.message || "Game Over!"
      );
    }
  };

  const handleInput = (key) => {
    if (gameOver) return;

    if (key === "Enter") {
      if (inputValue.length === wordLength) {
        submitGuess(inputValue);
        setInputValue("");
      }
    } else if (key === "Backspace") {
      setInputValue((prev) => prev.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(key)) {
      if (inputValue.length < wordLength) {
        setInputValue((prev) => prev + key.toUpperCase());
      }
    }
  };

  const onKeyDown = (e) => handleInput(e.key);
  const onKeyClick = (key) => handleInput(key);

  const playerGuessedCorrectly = () => {
    if (!correctWord) return false;
    return guesses.some(
      (g) => g.guess.toLowerCase() === correctWord.toLowerCase()
    );
  };

  return (
    <div>
      <input
        ref={inputRef}
        onKeyDown={onKeyDown}
        style={{
          position: "absolute",
          opacity: 0,
          height: 0,
          pointerEvents: "none",
        }}
        autoFocus
      />

      <div
        className="board"
        style={{
          gridTemplateColumns: `repeat(${wordLength}, var(--cell-size))`,
        }}
      >
        {[...Array(maxAttempts)].map((_, rowIndex) => {
          const attempt = guesses[rowIndex];
          const isCurrent = rowIndex === guesses.length && !gameOver;

          const letters =
            attempt?.guess?.split("") ||
            (isCurrent
              ? inputValue.padEnd(wordLength).split("")
              : Array(wordLength).fill(""));

          const feedback = attempt?.feedback || Array(wordLength).fill("");

          return (
            <div key={rowIndex} className="row">
              {letters.map((letter, i) => (
                <div key={i} className={`cell ${feedback[i]}`}>
                  {letter}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {message && <div className="message">{message}</div>}

      {gameOver && correctWord && !playerGuessedCorrectly() && (
        <div className="correct-word">
          The correct word was: <strong>{correctWord.toUpperCase()}</strong>
        </div>
      )}

      {gameOver && (
        <div className="play-again">
          <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
      )}

      <Keyboard onKeyPress={onKeyClick} letterStates={letterStates} />
    </div>
  );
}

export default GameBoard;
