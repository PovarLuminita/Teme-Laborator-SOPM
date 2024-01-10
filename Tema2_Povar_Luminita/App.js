import React, { useState } from 'react';

function Square({ value, onSquareClick, highlight }) {
  return (
    <button className={`square ${highlight ? 'highlight' : ''}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winningLine = calculateWinner(squares);
  let status;
  if (winningLine) {
    status = 'Winner: ' + squares[winningLine[0]];
  } else if (!squares.includes(null)) {
    status = 'Draw!';
  } else {
    status = 'Next symbol: ' + (xIsNext ? 'X' : 'O');
  }

  const renderSquare = (i, highlight) => {
    return (
      <Square
        value={squares[i]}
        onSquareClick={() => handleClick(i)}
        key={'square_' + i}
        highlight={highlight}
      />
    );
  };

  const boardRows = [];
  for (let row = 0; row < 3; row++) {
    const squaresInRow = [];
    for (let col = 0; col < 3; col++) {
      const squareIndex = row * 3 + col;
      const highlight = winningLine && winningLine.includes(squareIndex);
      squaresInRow.push(renderSquare(squareIndex, highlight));
    }
    boardRows.push(
      <div className="board-row" key={'row_' + row}>
        {squaresInRow}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {boardRows}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const [winnerSymbols, setWinnerSymbols] = useState([]);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    const winningLine = calculateWinner(nextSquares);
    if (winningLine) {
      const winner = nextSquares[winningLine[0]];
      setWinnerSymbols([...winnerSymbols, winner]);
    }
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const clearWinnerSymbols = () => {
    setWinnerSymbols([]);
  };

  const sortedHistory = isAscending ? history.slice() : history.slice().reverse();

  const moves = sortedHistory.map((squares, move) => {
    const moveNumber = isAscending ? move : history.length - 1 - move;

    let description;
    if (moveNumber > 0) {
      description =
        moveNumber === currentMove ? `You are at move #${moveNumber}` : `Go to move #${moveNumber}`;
    } else {
      description = 'Go to the beginning of the game';
    }

    return (
      <li key={moveNumber}>
        {moveNumber === currentMove ? (
          <span>{description}</span>
        ) : (
          <button onClick={() => jumpTo(moveNumber)}>{description}</button>
        )}
      </li>
    );
  });

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
  };

  const getWinnerString = () => {
    return winnerSymbols.join('');
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <div>
          <button onClick={toggleSortOrder}>
            Change order: {isAscending ? 'Ascending' : 'Descending'}
          </button>
        </div>
        {}
        <button onClick={clearWinnerSymbols}>Clear winner string</button>
        {}
        <div>{getWinnerString()}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
}
