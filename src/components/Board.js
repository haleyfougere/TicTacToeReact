import Square from "./Square";

//Board Component - returns JSX - high-level Parent Component
// STATELESS - our data and state will live
export default function Board({xIsNext, squares, onPlay}) {

    function handleClick(i) {
      if (squares[i] || calculateWinner(squares)) {
        return;
      }
  
      const nextSquares = squares.slice(); //create a copy of array from state
      if (xIsNext) {
        nextSquares[i] = "X";
      } else {
        nextSquares[i] = "O";
      }
      onPlay(nextSquares);
    }
  
    const winnerInfo = calculateWinner(squares);
    //check if all the squares are full
    const isBoardFull = squares.every(square => square !== null);
    let status;
    if (winnerInfo) {
      status = "Winner: " + winnerInfo.winner;
    } else if (isBoardFull) {
      status = "Game Result: Draw"
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }
  
    return (
      <>
      {/* render the game board with the helper function */}
        <div className="status">{status}</div>
        <div className="board-row">
          {renderSquare(0, winnerInfo)}
          {renderSquare(1, winnerInfo)}
          {renderSquare(2, winnerInfo)}
        </div>
        <div className="board-row">
          {renderSquare(3, winnerInfo)}
          {renderSquare(4, winnerInfo)}
          {renderSquare(5, winnerInfo)}
        </div>
        <div className="board-row">
          {renderSquare(6, winnerInfo)}
          {renderSquare(7, winnerInfo)}
          {renderSquare(8, winnerInfo)}
        </div>
        <MoveCounter squares={squares} />
      </>
    );
  
  function renderSquare(i, winnerInfo) {
    // Helper function to render a single square.
    return (
      // Passes the square value, click handler, and highlight condition.
      <Square
        value={squares[i]}
        onSquareClick={() => handleClick(i)}
        highlight={winnerInfo?.winningLine?.includes(i)}
      />
    );
  }
}

function calculateWinner(squares) {
  //possible winning locations
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {winner: squares[a], winningLine: lines[i]};
    }
  }

  return null;
}

function MoveCounter({squares}) {
  // Calculate the number of moves for each player
  const xMoves = squares.filter(square => square === "X").length;
  const oMoves = squares.filter(square => square === "O").length;

  return (
    <div className="move-counter">
      <p>X Move Count: {xMoves}</p>
      <p>O Move Count: {oMoves}</p>
    </div>
  );
}