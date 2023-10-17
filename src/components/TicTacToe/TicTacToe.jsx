import React, { useState, useEffect } from "react";
import "./TicTacToe.css";

const TicTacToe = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [buttonText, setButtonText] = useState("✖️");
  const [cells, setCells] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [classHiddenVisibleDiv, setClassHiddenVisibleDiv] = useState("hidden");
  const [classHiddenVisibleP, setClassHiddenVisibleP] = useState("visible");

  const winCombos = [
    [0, 1, 2],[3, 4, 5],[6, 7, 8], // Rows
    [0, 3, 6],[1, 4, 7],[2, 5, 8], // Columns
    [0, 4, 8],[2, 4, 6], // Diagonals
  ];

  const handleStart = () => {
    setIsStarted(!isStarted);
    setCells(Array(9).fill(null));
    setButtonText("✖️");
    setWinner(null);
    setClassHiddenVisibleDiv("hidden");
    setClassHiddenVisibleP("visible");
  };

  const handlePlay = (index) => {
    if (cells[index] === null) {
      cells[index] = buttonText;
      const newCells = [...cells];
      setCells(newCells);
      setButtonText(buttonText === "✖️" ? "⭕" : "✖️");
    }
  };

  useEffect(() => {
    // console.log('cells is changing');
    // console.log(cells);
    for (let i = 0; i < winCombos.length; i++) {
      const [a, b, c] = winCombos[i];
      console.log(cells[a], cells[b], cells[c]);
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        setWinner(cells[a]);
        setClassHiddenVisibleDiv("visible");
        setClassHiddenVisibleP("hidden");
      }
    }
  }, [cells]);

  return (
    <div className="container-tictactoe">
      <h1>Tic Tac Toe</h1>
      <button onClick={handleStart}>{isStarted ? "Restart" : "Start"}</button>
      <p className={classHiddenVisibleP}>{isStarted ? "Turn for " + buttonText : ""}</p>
      {isStarted ? (
        <div>
          <div className="table-tictactoe">
            {cells.map((value, index) => (
              <button
                key={index}
                className="cell"
                data-cell={index + 1}
                onClick={() => handlePlay(index)}
              >
                {value}
              </button>
            ))}
          </div>
          <div className={"winner-container " + classHiddenVisibleDiv}>
            <h2>The winner is {winner}</h2>
          </div>
        </div>
      ) : (
        <div>
          <h1>PRESS START</h1>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
