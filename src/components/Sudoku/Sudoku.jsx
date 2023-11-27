import React, { useState, useEffect } from 'react';
import { makepuzzle, solvepuzzle } from 'sudoku';
import play from '../../assets/img/play.svg';
import pause from '../../assets/img/pause.svg';
import './Sudoku.css';

const Sudoku = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [sudokuBoard, setSudokuBoard] = useState(null);
  const [solved, setSolved ]= useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const numbersArray = Array.from(Array(9).keys()).map((x) => x + 1);
  

  const convertTo1To9 = (array) => array.map(cell => (cell !== null ? cell + 1 : null));

  console.log(sudokuBoard);
  console.log(solved);

  useEffect(() => {
    const newBoard = makepuzzle();
    const newSolved = solvepuzzle(newBoard)
    setSudokuBoard(convertTo1To9(newBoard));
    setSolved(convertTo1To9(newSolved))
  }, [isStarted]);

  const handleStart = () => {
    if (!isStarted) {
      setSelectedButton(null);
    }
    setIsStarted(!isStarted);
  };

  

  const selectNumberToPrint = (e) => { 
    if (selectedButton !== null) {
      document.getElementById(`button${selectedButton}`).style.backgroundColor = '';
    }
    e.target.style.backgroundColor = 'lightblue';
    setSelectedButton(e.target.value);
  };

  const updateBaord = (e) => {
    if (e.target.innerHTML === '') { //bloquear solo los campos de la gneracion del board
      const newBoard = [...sudokuBoard];
      newBoard[e.target.value] = parseInt(selectedButton, 10);
      setSudokuBoard(newBoard);
    }
  };

  const checkWin = () => {
  
    if (JSON.stringify(sudokuBoard) === JSON.stringify(solved)) {
      console.log("Son iguales!");
    } else {
      console.log('No son iguales.');
    }
  };

  return (
    <div className="container-sudoku">
      <button className="play-button" onClick={handleStart}>
        {isStarted ? '' : <img src={play} alt="" />}
      </button>
      {isStarted ? (
        <div className="content-container-sudoku">
          <div className="content-button-selector">
            {numbersArray.map((number, index) => (
              <button
                key={index}
                id={`button${number}`}
                onClick={selectNumberToPrint}
                value={number}
              >
                {number}
              </button>
            ))}
          </div>
          <div className="board">
            {sudokuBoard.map((number, index) => (
              <button key={index} className={number === null ? "cell2" : "cell2 defaultnumber"} value={index} onClick={updateBaord}>{number}</button>
             ))}
          </div>
          <button className="win-button" onClick={checkWin}>check solution</button>
          <button className="pause-button" onClick={handleStart}>
            {isStarted ? <img src={pause} alt="" /> : ''}
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

export default Sudoku;