import { useState } from "react";

function Square({ value, onSquareClick, isWinningSquare }) {
  const squareStyle = isWinningSquare ? { transform: "rotateY(360deg)" } : {};
  return (
    <button
      className={`square ${isWinningSquare ? "winning-square" : ""}`}
      onClick={onSquareClick}
      style={{
        boxShadow: isWinningSquare
          ? "2px 2px 3px #07F44D"
          : "2px 2px 3px #06d8f8",
        color: isWinningSquare ? "#07F44D" : "#06d8f8",
        ...squareStyle,
      }}
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [stop, setStop] = useState(0);
  const [winnerIndexes, setWinnerIndexes] = useState([]);

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const updatedSquares = squares.slice();
    const isEven = stop % 2 === 0;
    updatedSquares[i] = isEven ? "X" : "O";
    setSquares(updatedSquares);
    setStop(stop + 1);

    const winner = calculateWinner(updatedSquares);
    if (winner) {
      setWinnerIndexes(winner);
    }
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return lines[i];
      }
    }
    return null;
  }

  function newGame() {
    setSquares(Array(9).fill(null));
    setStop(0);
    setWinnerIndexes([]);
  }

  return (
    <div className="square-block">
      {squares.map((value, i) => (
        <Square
          key={i}
          value={value}
          isWinningSquare={winnerIndexes.includes(i)}
          onSquareClick={() => handleClick(i)}
        />
      ))}
      <button className="btn" onClick={newGame}>
        Új játék
      </button>
    </div>
  );
}
