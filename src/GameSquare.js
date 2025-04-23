import React from "react";

function GameSquare({ value }) {
  return (
    <button className="game-square">
      {value}
    </button>
  );
}

export default GameSquare;
