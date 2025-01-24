// App.jsx
import { useState } from 'react';
import './App.css';

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const result = calculateWinner(board);
  const winner = result ? result.winner : null;
  const winningLine = result ? result.line : null;
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  // Determine the style for the winning line
  let lineStyle = {};
  if (winningLine) {
    const [a, b, c] = winningLine;

    // Updated winningStyles to account for the 25px gap
    const winningStyles = {
      '0,1,2': { 
        top: '45px', 
        left: '25px', 
        width: '350px', // 3 squares + 2 gaps
        height: '4px', 
        transform: 'rotate(0deg)' 
      },
      '3,4,5': { 
        top: '165px', 
        left: '25px', 
        width: '350px', 
        height: '4px', 
        transform: 'rotate(0deg)' 
      },
      '6,7,8': { 
        top: '285px', 
        left: '25px', 
        width: '350px', 
        height: '4px', 
        transform: 'rotate(0deg)' 
      },
      '0,3,6': { 
        top: '15px', 
        left: '56px', 
        width: '4px', 
        height: '310px', 
        transform: 'rotate(0deg)' 
      },
      '1,4,7': { 
        top: '15px', 
        left: '196px', 
        width: '4px', 
        height: '310px', 
        transform: 'rotate(0deg)' 
      },
      '2,5,8': { 
        top: '15px', 
        left: '337px', 
        width: '4px', 
        height: '310px', 
        transform: 'rotate(0deg)' 
      },
      '0,4,8': { 
        top: '25px', 
        left: '25px', 
        width: '450px', 
        height: '4px', 
        transform: 'rotate(40deg)', 
        transformOrigin: 'left top' 
      },
      '2,4,6': { 
        top: '25px', 
        left: '-80px', 
        width: '450px', 
        height: '4px', 
        transform: 'rotate(-40deg)', 
        transformOrigin: 'right top' 
      },
    };

    lineStyle = winningStyles[winningLine.toString()] || {};
  }

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="status">{status}</div>
      <div className="board">
        {board.map((value, index) => (
          <Square key={index} value={value} onClick={() => handleClick(index)} />
        ))}
        {winningLine && <div className="winning-line" style={lineStyle}></div>}
      </div>
      <button className="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
}

function calculateWinner(board) {
  const lines = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6], // Diagonal top-right to bottom-left
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return null;
}

export default App;
