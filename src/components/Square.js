

// Square component - or a single square in the Board
// must return JSX for a single square, HAS NO STATE, STATELESS COMPONENT
export default function Square({ value, onSquareClick, highlight }) {
  const style = highlight ? { backgroundColor: 'yellow' } : {};

    return (
      <button className="square" onClick={onSquareClick} style={style}>
        {value}
      </button>
    );
  }