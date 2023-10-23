import React, { useState, useEffect } from "react";
import "./Hangman.css";
import { chooseRandomWord } from "../../assets/data";

const Hangman = () => {
 
  const alfabet = "abcdefghijklmnopqrstuvwxyz".split("");

  const [isStarted, setIsStarted] = useState(false);
  const [wordToGuess, setWordToGuess] = useState("");
  const [lettersGuesed, setLettersGuesed] = useState([]);
  const [lettersUsed, setLetterUsed] = useState([]);
  const [attempt, setAttempt] = useState(0);


  const handleStart = () => {
    if (!isStarted) {
      setWordToGuess(()=>  chooseRandomWord())
      setLettersGuesed([])
      setLetterUsed([])
    }
    setIsStarted(!isStarted);
  };

  const checkEquals = () => {
    console.log(wordToGuess.split("").length - 1 + " " + lettersGuesed.length);
    if (wordToGuess.split("").length - 1 !== lettersGuesed.length) {
      console.log('Continue');
    } else {
      
    }
  };

  const handleChoosenLetter = (e) => {
    setLetterUsed(prevArray => [...prevArray, e.target.value]);
    if (wordToGuess.includes(e.target.value)) {
      const prevArray = [...lettersGuesed];
      let count = 0;
      for (let i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess[i] === e.target.value) {
          count++;
        }
      }
      while (count != 0) {
        prevArray.push(e.target.value);
        setLettersGuesed(prevArray);
        count--;
      }
      checkEquals();
    } else {
      setAttempt(attempt+1);
    }
  };

  useEffect(() => {
    if (attempt === 15) {
      
    } else {

    }
  }, [attempt])
  
  const renderWord = () => {
    return wordToGuess.split("").map((letter, index) => {
      if (lettersGuesed.includes(letter)) {
        return <span key={index}>{letter} </span>;
      } else {
        return <span key={index}>_ </span>;
      }
    });
  };

  return (
    <div className="container-hangman">
      <h1>Hangman</h1>
      <button onClick={handleStart}>{isStarted ? "Restart" : "Start"}</button>
      {isStarted ? (
        <div className="content-container">
          <h1>Game</h1>
          <p>{attempt}/15</p>
          <p>word: {wordToGuess}</p>
          <h2>{renderWord()}</h2>
          <div className="buttons-container">
            {
              alfabet.map((value, index)=> (
                <button
                  key={index}
                  value={value}
                  onClick={handleChoosenLetter}
                  disabled={lettersUsed.includes(value) ? true : false}
                >{value}</button>
                )
              )
            }
          </div>
          <div>
            <p>letters used</p>
            {
              lettersUsed.map((value, index)=> (
                <span key={index}>{value} </span>
              ))
            }
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
export default Hangman;
