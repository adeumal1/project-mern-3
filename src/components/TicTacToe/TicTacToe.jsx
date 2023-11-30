import React, { useState, useEffect } from "react";
import "./TicTacToe.css";
import play from "../../assets/img/play.svg";
import pause from "../../assets/img/pause.svg";

const TicTacToe = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [buttonText, setButtonText] = useState("✖️");
  const [cells, setCells] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [classHiddenVisibleDiv, setClassHiddenVisibleDiv] = useState("hidden");
  const [classHiddenVisibleP, setClassHiddenVisibleP] = useState("visible");
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const winCombos = [
    [0, 1, 2],[3, 4, 5],[6, 7, 8], // Rows
    [0, 3, 6],[1, 4, 7],[2, 5, 8], // Columns
    [0, 4, 8],[2, 4, 6], // Diagonals
  ];

  const randomPlayer = () => Math.random() < 0.5 ? "✖️" : "⭕";

  const handleStart = () => {
    setIsStarted(!isStarted);
    setCells(Array(9).fill(null));
    setButtonText(randomPlayer());
    setWinner(null);
    setClassHiddenVisibleDiv("hidden");
    setClassHiddenVisibleP("visible");
    setButtonDisabled(false);
  };

  const handlePlay = (index) => {
    if (cells[index] === null) {
      cells[index] = buttonText;
      const newCells = [...cells];
      setCells(newCells);
      setButtonText(buttonText === "✖️" ? "⭕" : "✖️");
    }
  };
  
  const draw = (arr) => {
    return arr.every(item => typeof item === 'string' && item.trim() !== '');
  };

  useEffect(() => {
    // console.log('cells is changing');
    // console.log(cells);
    if (draw(cells)) {
      setWinner("Draw");
      setClassHiddenVisibleDiv("visible");
      setClassHiddenVisibleP("hidden");
      setButtonDisabled(!isButtonDisabled);
    } 
    for (let i = 0; i < winCombos.length; i++) {
      const [a, b, c] = winCombos[i];
      // console.log(cells[a], cells[b], cells[c]);
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        setWinner("The winnner is "+cells[a]);
        setClassHiddenVisibleDiv("visible");
        setClassHiddenVisibleP("hidden");
        setButtonDisabled(!isButtonDisabled);
      }
    }
  }, [cells]);

  return (
    <div className="container-tictactoe">
      <button className="play-button" onClick={handleStart}>{isStarted ? "" : <img src={play} alt="" />}</button>
      {isStarted ? (
        <div className="container-tictactoe-2">
          <p className={classHiddenVisibleP}>{isStarted ? "Turn for " + buttonText : ""}</p>
          <div className={"winner-container " + classHiddenVisibleDiv}>
            <h2>{winner}</h2>
          </div>
          <div className="table-tictactoe">
            {cells.map((value, index) => (
              <button
                key={index}
                className="cell"
                disabled={isButtonDisabled}
                data-cell={index + 1}
                onClick={() => handlePlay(index)}
              >
                {value}
              </button>
            ))}
          </div>
          <button className="pause-button" onClick={handleStart}>{isStarted ? <img src={pause} alt="" /> : ""}</button>
        </div>
      ) : (
        <div>
           <h1>Tic Tac Toe</h1>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
