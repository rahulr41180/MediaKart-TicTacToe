
import React from 'react';
import "../CSS/BorderComponent.css";
import "../CSS/styles.css";
import { SquareComponent } from './SquareComponent';

export const BoardComponent = ({ squares, onClick }) => {

  // render clicked sqaure with player image
  const renderSquare = (i) => {
    return <SquareComponent value={squares[i]} onClick={() => onClick(i)} />;
  };

  return (

    <div className='board'>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};