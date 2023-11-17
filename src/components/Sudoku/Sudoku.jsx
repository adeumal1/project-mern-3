import React, {useState, useEffect} from 'react'
import { makepuzzle, solvepuzzle, ratepuzzle } from "sudoku";
import play from "../../assets/img/play.svg";
import pause from "../../assets/img/pause.svg";
import './Sudoku.css'

const Sudoku = () => {
  
  const [isStarted, setIsStarted] = useState(false);
  const [sudokuBoard, setSudokuBoard] = useState(null);

  const handleStart = () => {
    if (!isStarted) {
      //rid of useStates
    }
    setIsStarted(!isStarted);
  };

  useEffect(() => {
    const newBoard = makepuzzle();
    setSudokuBoard(newBoard);
  }, []);
  
  console.log(sudokuBoard);

  const renderBoard = () => {
    if (!sudokuBoard) return null;
    const board2D = [];
    for (let i = 0; i < 9; i++) {
      board2D.push(sudokuBoard.slice(i * 9, (i + 1) * 9));
    }

  const selectNumberToPrint = () => {

  };

    return board2D.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((cell, colIndex) => (
          <div key={colIndex} className="cell">
            {cell === 0 ? '' : cell}
          </div>
        ))}
      </div>
    ));
  };

  return ( 
    <div className="container-sudoku">
      <button className="play-button" onClick={handleStart}>
        {isStarted ? "" : <img src={play} alt="" />}
      </button>
      {isStarted ? (
        <div className="content-container-sudoku">
          <div className="content-button-selector"></div>
          <div className="board">{renderBoard()}</div>
          <button className="pause-button" onClick={handleStart}>
              {isStarted ? <img src={pause} alt="" /> : ""}
          </button>
        </div>
      ) : (
        <div>
          <h1>Sudoku</h1>
        </div>
      )}
    </div>
  );
};

export default Sudoku