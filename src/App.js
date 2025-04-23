import React, { useState, useEffect } from 'react';
import './App.css';

const SIZE = 3;

// Check for winner
const checkWinner = (board) => {
  // Check rows, columns, and diagonals
  for (let i = 0; i < SIZE; i++) {
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== ' ') {
      return board[i][0]; // 'X' or 'O'
    }
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== ' ') {
      return board[0][i]; // 'X' or 'O'
    }
  }

  // Check diagonals
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== ' ') {
    return board[0][0]; // 'X' or 'O'
  }
  if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== ' ') {
    return board[0][2]; // 'X' or 'O'
  }

  // Check for draw (if no empty spaces left)
  if (board.every(row => row.every(cell => cell !== ' '))) {
    return 'D'; // 'D' for draw
  }

  return ' '; // Game still ongoing
};

// Minimax and game evaluation functions
const findBestMove = (board) => {
  let bestMove = null;
  let bestScore = -Infinity;

  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (board[row][col] === ' ') {
        // Make the move
        board[row][col] = 'O'; // AI's move

        // Calculate the score
        const score = minimax(board, 0, false);

        // Undo the move
        board[row][col] = ' ';

        // If this move is better, save it
        if (score > bestScore) {
          bestScore = score;
          bestMove = { row, col };
        }
      }
    }
  }

  return bestMove;
};

const minimax = (board, depth, isMaximizingPlayer) => {
  const winner = checkWinner(board);
  if (winner !== ' ') {
    return winner === 'O' ? 1 : winner === 'X' ? -1 : 0;
  }

  if (isMaximizingPlayer) {
    let best = -Infinity;

    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        if (board[row][col] === ' ') {
          board[row][col] = 'O'; // AI's move
          best = Math.max(best, minimax(board, depth + 1, false));
          board[row][col] = ' '; // Undo the move
        }
      }
    }
    return best;
  } else {
    let best = Infinity;

    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        if (board[row][col] === ' ') {
          board[row][col] = 'X'; // Player's move
          best = Math.min(best, minimax(board, depth + 1, true));
          board[row][col] = ' '; // Undo the move
        }
      }
    }
    return best;
  }
};

// App component
function App() {
  const [board, setBoard] = useState(Array(SIZE).fill().map(() => Array(SIZE).fill(' ')));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); // true for player, false for AI
  const [gameStatus, setGameStatus] = useState(''); // 'win', 'draw', or '' (ongoing)
  const [winner, setWinner] = useState(null);
  const [showPopup, setShowPopup] = useState(true);

  // Function to handle a click on a box
  const handleCellClick = (row, col) => {
    if (board[row][col] === ' ' && isPlayerTurn && !winner) {
      const newBoard = board.map(row => [...row]);
      newBoard[row][col] = 'X';
      setBoard(newBoard);
      setIsPlayerTurn(false);
      setTimeout(() => aiMove(newBoard), 300);
    }
  };
  

  // Function for AI's move (find the best move using Minimax)
  const aiMove = (currentBoard) => {
    const move = findBestMove(currentBoard);
    if (move) {
      const newBoard = currentBoard.map(row => [...row]);
      newBoard[move.row][move.col] = 'O';
      setBoard(newBoard);
      setIsPlayerTurn(true);
    }
  };
  useEffect(() => {
    const result = checkWinner(board);
    if (result !== ' ') {
      setWinner(result);
    }
  }, [board]);
  const resetGame = () => {
    setBoard(Array(SIZE).fill().map(() => Array(SIZE).fill(' ')));
    setIsPlayerTurn(true);
    setWinner(null);
    setGameStatus('');
  };
  
  {showPopup && (
    <div className="popup">
      <div className="popup-content">
        <h2>You wanna try beating AI?</h2>
        <p>Go ahead and play!</p>
        <button onClick={() => setShowPopup(false)}>Let's Go!</button>
      </div>
    </div>
  )}
  

  // Function to render the board
  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="board-row">
        {row.map((cell, colIndex) => (
          <div
            key={colIndex}
            className={`board-cell ${cell === 'X' ? 'X' : cell === 'O' ? 'O' : ''}`}
            onClick={() => handleCellClick(rowIndex, colIndex)}
          >
            {cell}
          </div>
        ))}
      </div>
    ));
  };
  

  // Handle Play Again
  const handlePlayAgain = () => {
    setBoard(Array(SIZE).fill().map(() => Array(SIZE).fill(' ')));
    setIsPlayerTurn(true); // Player starts the game
    setGameStatus(''); // Reset the game status
  };

  // Check for winner or draw after every move
  useEffect(() => {
    const winner = checkWinner(board);
    if (winner !== ' ') {
      if (winner === 'D') {
        setGameStatus('It\'s a draw!');
      } else {
        setGameStatus(`${winner} wins!`);
      }
    }
  }, [board]); // Runs whenever the board changes

  return (
    <div className="App">
      <h1>Tic-Tac-Toe Game</h1>

      {/* Display game status */}
      <div className="status">
        {gameStatus && <h2>{gameStatus}</h2>}
      </div>

      {/* Render the board */}
      <div className="board">{renderBoard()}</div>
      {winner && (
  <>
    {winner === 'O' && (
      <div className="glitch" data-text="You can't defeat AI. Try harder!">
        You can't defeat AI. Try harder!
      </div>
      
      
    )}
    {winner === 'X' && <h2 className="result-msg">You Win!</h2>}
    {winner === 'D' && <h2 className="result-msg">It's a Draw!</h2>}

    <button className="play-again" onClick={resetGame}>
      Play Again
    </button>
  </>
)}



      {/* Play Again Button */}
    
    </div>
  );
}

export default App;
