import React, { useState, useEffect } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [gameStatus, setGameStatus] = useState('');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Effect to update game status
  useEffect(() => {
    if (winner) {
      setGameStatus(`Player ${winner} wins!`);
    } else if (board.every(cell => cell !== '')) {
      setGameStatus('Game ended in a draw!');
    } else {
      setGameStatus(`Player ${currentPlayer}'s turn`);
    }
  }, [winner, board, currentPlayer]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // PUBLIC_INTERFACE
  const checkWinner = (boardState) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
        return boardState[a];
      }
    }
    return null;
  };

  // PUBLIC_INTERFACE
  const handleCellClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  // PUBLIC_INTERFACE
  const handleRestart = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header">
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
          <h1>Tic Tac Toe</h1>
        </div>
        <div className="game-container">
          <div className="game-status">{gameStatus}</div>
          <div className="game-board">
            {board.map((cell, index) => (
              <div
                key={index}
                className={`game-cell ${cell.toLowerCase()} ${
                  winner && board[index] === winner ? 'winner-cell' : ''
                }`}
                onClick={() => handleCellClick(index)}
              >
                {cell}
              </div>
            ))}
          </div>
          <button className="restart-button" onClick={handleRestart}>
            Restart Game
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
