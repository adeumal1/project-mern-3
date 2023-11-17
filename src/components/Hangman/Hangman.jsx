import React, { useState, useEffect } from "react";
import "./Hangman.css";
import { chooseRandomWord } from "../../assets/data";
import play from "../../assets/img/play.svg";
import pause from "../../assets/img/pause.svg";
import men0 from "../../assets/figure/figure-0.png";
import men1 from "../../assets/figure/figure-1.png";
import men2 from "../../assets/figure/figure-2.png";
import men3 from "../../assets/figure/figure-3.png";
import men4 from "../../assets/figure/figure-4.png";
import men5 from "../../assets/figure/figure-5.png";
import men6 from "../../assets/figure/figure-6.png";
import men7 from "../../assets/figure/figure-7.png";
import men8 from "../../assets/figure/figure-8.png";

const Hangman = () => {
  const alfabet = "abcdefghijklmnopqrstuvwxyz".split("");

  const [isStarted, setIsStarted] = useState(false);
  const [wordToGuess, setWordToGuess] = useState("");
  const [lettersGuesed, setLettersGuesed] = useState([]);
  const [lettersUsed, setLetterUsed] = useState([]);
  const [attempt, setAttempt] = useState(0);
  const [classHiddenVisibleDiv, setClassHiddenVisibleDiv] = useState("hidden");
  const [classHiddenVisibleDivButtons, setClassHiddenVisibleDivButtons] = useState("visible");

  const handleStart = () => {
    if (!isStarted) {
      setWordToGuess(() => chooseRandomWord());
      setLettersGuesed([]);
      setLetterUsed([]);
      setAttempt(0);
      setClassHiddenVisibleDiv("hidden");
      setClassHiddenVisibleDivButtons("visible");
    }
    setIsStarted(!isStarted);
  };

  const checkEquals = () => {
    console.log(wordToGuess.split("").length - 1 + " " + lettersGuesed.length);
    if (wordToGuess.split("").length - 1 !== lettersGuesed.length) {
      console.log("Continue");
    } else {
      l;
    }
  };

  const handleChoosenLetter = (e) => {
    setLetterUsed((prevArray) => [...prevArray, e.target.value]);
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
      setAttempt(attempt + 1);
    }
  };

  const checkWin = () => {
    if (wordToGuess.length !== 0) {
      const uniqueLetters = new Set(wordToGuess.split(""));
      return [...uniqueLetters].every((letter) =>
        lettersGuesed.includes(letter)
      );
    }
  };

  useEffect(() => {
    if (attempt !== 8) {
      if (checkWin()) {
        setClassHiddenVisibleDiv("visible");
        setClassHiddenVisibleDivButtons("hidden");
      }
    } else {
      setClassHiddenVisibleDiv("visible");
      setClassHiddenVisibleDivButtons("hidden");
      setLettersGuesed(wordToGuess);
      setLetterUsed([]);
    }
  }, [attempt, wordToGuess, lettersGuesed]);

  const renderWord = () => {
    return wordToGuess.split("").map((letter, index) => {
      if (lettersGuesed.includes(letter)) {
        return <span key={index}>{letter} </span>;
      } else {
        return <span key={index}>_ </span>;
      }
    });
  };

  const figureAttempt = () => {
    switch (attempt) {
      case 0:
        return men0;
      case 1:
        return men1;
      case 2:
        return men2;
      case 3:
        return men3;
      case 4:
        return men4;
      case 5:
        return men5;
      case 6:
        return men6;
      case 7:
        return men7;
      case 8:
        return men8;
      default:
        break;
    }
  };

  return (
    <div className="container-hangman">
      <button className="play-button" onClick={handleStart}>
        {isStarted ? "" : <img src={play} alt="" />}
      </button>
      {isStarted ? (
        <div className="content-container-hangman">
          {/* <p>{attempt}/8</p> */}
          <div className={"winner-container " + classHiddenVisibleDiv}>
            <h2>
              {checkWin()
                ? "Correct the word is " + wordToGuess.toUpperCase()
                : "Opps! The word is " + wordToGuess.toUpperCase()}
            </h2>
          </div>
          <div className="block-divider">
            <div className="block-1">
              {/* <p>word: {wordToGuess}</p> */}
              <h2>{renderWord()}</h2>
            </div>
            <div className="block-2">
              <img src={figureAttempt()} alt="hangman" />
            </div>
          </div>
          <div className={"buttons-container " + classHiddenVisibleDivButtons}>
            {alfabet.map((value, index) => (
              <button
                key={index}
                value={value}
                onClick={handleChoosenLetter}
                disabled={lettersUsed.includes(value) ? true : false}
              >
                {value}
              </button>
            ))}
          </div>
          <button className="pause-button" onClick={handleStart}>
            {isStarted ? <img src={pause} alt="" /> : ""}
          </button>
        </div>
      ) : (
        <div>
          <h1>Hangman</h1>
        </div>
      )}
    </div>
  );
};
export default Hangman;
