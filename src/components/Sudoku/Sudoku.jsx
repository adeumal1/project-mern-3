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
  const [classHiddenVisibleDiv, setClassHiddenVisibleDiv] = useState("hidden");
  const [solvedYN, setSolvedYN] = useState(false);
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
      setClassHiddenVisibleDiv("hidden", null)
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
    setClassHiddenVisibleDiv('visible');
    if (JSON.stringify(sudokuBoard) === JSON.stringify(solved)) {
      setSolvedYN(true)
    } else {
      setSolvedYN(false)
    }
  };

  const continuePuzzle = () => {
    setClassHiddenVisibleDiv('hidden');
  }
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
          <div className={'winner-container ' + classHiddenVisibleDiv}>
            {solvedYN ? <span>✅</span> : <><span>❌</span><button className="tryagain" onClick={continuePuzzle}>Continue</button></>}
              
          </div>
          <div className="board">
            {sudokuBoard.map((number, index) => (
              <button key={index} className={"cell2"} value={index} onClick={updateBaord}>{number}</button>
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