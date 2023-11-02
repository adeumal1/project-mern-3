import React, { lazy } from "react";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import "./App.css";
import OnLoad from './components/OnLoad/OnLoad'
import logo from './assets/img/frivo_logo.png'
import goBackArrow from './assets/img/back.svg'
const HomePage = lazy(() => import("./pages/HomePage"));
const TicTacToePage = lazy(() => import("./pages/TicTacToePage"));
const HangmanPage = lazy(() => import("./pages/HangmanPage"));
const SudokuPage = lazy(() => import("./pages/SudokuPage"));


function App() {
  const location = useLocation();
  const divs = Array.from({ length: 40 }, (_, index) => (<div className="game f" key={index}><a>Coming Soon!</a></div>))
  
  return (
    <div className="App">
      <header>
        <div className="logo-container">
          <img src={logo} alt="frivo_logo" />
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={
              <React.Suspense fallback={<OnLoad />}>
                <HomePage />
              </React.Suspense>
            }
          />
          <Route path="/tictactoe" element={
              <React.Suspense fallback={<OnLoad />}>
                <TicTacToePage />
              </React.Suspense>
            }
          />
          <Route path="/hangman" element={
              <React.Suspense fallback={<OnLoad />}>
                <HangmanPage />
              </React.Suspense>
            }
          />
          <Route path="/sudoku" element={
              <React.Suspense fallback={<OnLoad />}>
                <SudokuPage />
              </React.Suspense>
            }
          />
        </Routes>
        {location.pathname !== '/' ? <Link id="go-home-button" to="/"><img src={goBackArrow} alt="go-back-arrow" /></Link> : 
        <div className="container-games">
          <div className="game t">
            <Link to="/tictactoe">TicTacToe</Link>
          </div>
          <div className="game h">
          <Link to="/hangman">Hangman</Link>
          </div>
          <div className="game s">
            <Link to="/sudoku">Sudoku</Link>
          </div>
          {divs}
          
        </div>
        }
      </main>
      <footer>
        
      </footer>
    </div>

  )
}

export default App
