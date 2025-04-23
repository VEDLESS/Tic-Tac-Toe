import React, { useState, useEffect } from "react";
import GameSquare from "./GameSquare";
import './GameBoard.css';

const SIZE = 3;

function GameBoard() {
  const [board, setBoard] = useState(Array(SIZE).fill(Array(SIZE).fill(null)));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); // true means player X's turn, false means AI O's turn

  const checkWinner = (board) => {
    // Check rows, columns, and diagonals for a winner
    for (let i = 0; i < SIZE; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) return board[i][0];
      if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) return board[0][i];
    }
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return board[0][0];
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return board[0][2];
    return null;
  };

  const handleClick = (row, col) => {
    if (board[row][col] !== null || !isPlayerTurn) return;

    // Update the board with the player's move (X)
    const newBoard = board.map((r, i) => i === row ? r.map((c, j) => j === col ? 'X' : c) : r);
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      alert(winner === 'X' ? 'You win!' : 'AI wins!');
      return;
    }

    setIsPlayerTurn(false); // Change turn to AI
  };

  // Minimax Algorithm Functions
  const evaluate = (board) => {
    for (let i = 0; i < SIZE; i++) {
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        if (board[i][0] === 'O') return +10;
        if (board[i][0] === 'X') return -10;
      }
      if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        if (board[0][i] === 'O') return +10;
        if (board[0][i] === 'X') return -10;
      }
    }
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      if (board[0][0] === 'O') return +10;
      if (board[0][0] === 'X') return -10;
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      if (board[0][2] === 'O') return +10;
      if (board[0][2] === 'X') return -10;
    }
    return 0;
  };

  const isMovesLeft = (board) => {
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (board[i][j] === null) return true;
      }
    }
    return false;
  };

  const minimax = (board, depth, isMax) => {
    const score = evaluate(board);

    if (score === 10) return score - depth;
    if (score === -10) return score + depth;
    if (!isMovesLeft(board)) return 0;

    if (isMax) {
      let best = -1000;
      for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
          if (board[i][j] === null) {
            board[i][j] = 'O'; // AI's turn
            best = Math.max(best, minimax(board, depth + 1, false));
            board[i][j] = null;
          }
        }
      }
      return best;
    } else {
      let best = 1000;
      for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
          if (board[i][j] === null) {
            board[i][j] = 'X'; // Player's turn
            best = Math.min(best, minimax(board, depth + 1, true));
            board[i][j] = null;
          }
        }
      }
      return best;
    }
  };

  const findBestMove = (board) => {
    let bestVal = -1000;
    let bestMove = { row: -1, col: -1 };

    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (board[i][j] === null) {
          board[i][j] = 'O'; // AI's move
          let moveVal = minimax(board, 0, false);
          board[i][j] = null;

          if (moveVal > bestVal) {
            bestMove = { row: i, col: j };
            bestVal = moveVal;
          }
        }
      }
    }

    return bestMove;
  };

  const aiMove = () => {
    const bestMove = findBestMove(board);
    if (bestMove) {
      const newBoard = board.map((r, i) => i === bestMove.row ? r.map((c, j) => j === bestMove.col ? 'O' : c) : r);
      setBoard(newBoard);

      const winner = checkWinner(newBoard);
      if (winner) {
        alert(winner === 'X' ? 'You win!' : 'AI wins!');
        return;
      }

      setIsPlayerTurn(true); // Change turn to player
    }
  };

  const renderSquare = (row, col) => (
    <GameSquare value={board[row][col]} onClick={() => handleClick(row, col)} />
  );

  useEffect(() => {
    if (!isPlayerTurn) aiMove(); // AI makes a move when it's AI's turn
  }, [isPlayerTurn]);

  return (
    <div className="game-board">
      {Array.from({ length: SIZE }).map((_, row) => (
        <div className="board-row" key={row}>
          {Array.from({ length: SIZE }).map((_, col) => (
            <React.Fragment key={col}>
              {renderSquare(row, col)}
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
