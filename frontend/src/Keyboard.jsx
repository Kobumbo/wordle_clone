import React from "react";

const qwertyRows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

function Keyboard({ onKeyPress, letterStates }) {
  const getKeyClass = (letter) => {
    const state = letterStates[letter];
    if (state === "green") return "key green";
    if (state === "yellow") return "key yellow";
    if (state === "gray") return "key gray";
    return "key";
  };

  return (
    <div className="keyboard">
      {qwertyRows.map((row, index) => (
        <div key={index} className="key-row">
          {row.split("").map((letter) => (
            <button
              key={letter}
              className={getKeyClass(letter)}
              onClick={() => onKeyPress(letter)}
            >
              {letter}
            </button>
          ))}
          {index === 2 && (
            <>
              <button className="key special" onClick={() => onKeyPress("Backspace")}>
                ←
              </button>
              <button className="key special" onClick={() => onKeyPress("Enter")}>
                Enter
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
