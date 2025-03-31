import React, { useState, useEffect } from "react";
import GameBoard from "./GameBoard";
import "./styles.css";

function App() {
  const [gameId, setGameId] = useState(null);
  const [wordLength, setWordLength] = useState(5);
  const [maxAttempts, setMaxAttempts] = useState(6);
  const [guesses, setGuesses] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.documentElement.style.setProperty("--word-length", wordLength);
  }, [wordLength]);

  // 🚫 Block ctrl-zoom and pinch zoom
  useEffect(() => {
    const preventZoom = (e) => {
      if (e.ctrlKey && (e.key === "+" || e.key === "-" || e.key === "=")) {
        e.preventDefault();
      }
    };
    const blockWheelZoom = (e) => {
      if (e.ctrlKey) e.preventDefault();
    };
    window.addEventListener("keydown", preventZoom);
    window.addEventListener("wheel", blockWheelZoom, { passive: false });

    return () => {
      window.removeEventListener("keydown", preventZoom);
      window.removeEventListener("wheel", blockWheelZoom);
    };
  }, []);

  const startGame = async () => {
    const res = await fetch("http://localhost:4000/api/game", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ length: wordLength }),
    });
    const data = await res.json();
    setGameId(data.gameId);
    setMaxAttempts(data.maxAttempts);
    setGuesses([]);
    setGameOver(false);
    setMessage("");
    setGameStarted(true);
  };

  return (
    <div className="app-container">
      <h1>Wordle Clone</h1>

      {!gameStarted && (
        <div className="start-game">
          <div className="dropdown-wrapper">
            <label htmlFor="length-select">Word Length:</label>
            <select
              id="length-select"
              value={wordLength}
              onChange={(e) => setWordLength(+e.target.value)}
            >
              <option value={5}>5 Letters</option>
              <option value={6}>6 Letters</option>
            </select>
          </div>
          <button onClick={startGame}>Start Game</button>
        </div>
      )}

      {gameStarted && (
        <GameBoard
          gameId={gameId}
          wordLength={wordLength}
          maxAttempts={maxAttempts}
          guesses={guesses}
          setGuesses={setGuesses}
          gameOver={gameOver}
          setGameOver={setGameOver}
          message={message}
          setMessage={setMessage}
        />
      )}
    </div>
  );
}

export default App;
