import React, { lazy } from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";

import OnLoad from './components/OnLoad/OnLoad'
const HomePage = lazy(() => import("./pages/HomePage"));
const TicTacToePage = lazy(() => import("./pages/TicTacToePage"));
const HangmanPage = lazy(() => import("./pages/HangmanPage"));
const SudokuPage = lazy(() => import("./pages/SudokuPage"));


function App() {
  return (
    <div className="App">
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/tictactoe">TicTacToe</Link>
          <Link to="/hangman">Hangman</Link>
          <Link to="/sudoku">Sudoku</Link>
        </nav>
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
      </main>
      <footer>
        
      </footer>
    </div>
    
  )
}

export default App
