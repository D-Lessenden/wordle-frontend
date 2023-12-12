// components/Game.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './styles/styles.css';
import QwertyKeyboard from './QwertyKeyboard';

const Game = () => {
  const location = useLocation();
  const gameData = location.state.game;
  const userId = location.state.user.id;
  const gameId = gameData.id;
  console.log(gameData)
  const [userGuesses, setUserGuesses] = useState(Array.from({ length: 6 }, () => Array(5).fill('')));
  const [activeRow, setActiveRow] = useState(0);
  const [gameState, setGameState] = useState(gameData.game);
  const [submitClicked, setSubmitClicked] = useState(false);

  const handleInputChange = (rowIndex, cellIndex) => (event) => {
    if (rowIndex === activeRow) {
      const inputValue = event.target.value.toLowerCase();
      setUserGuesses((prevUserGuesses) => {
        const updatedRows = [...prevUserGuesses];
        const updatedRow = [...updatedRows[rowIndex]];
        updatedRow[cellIndex] = inputValue;
        updatedRows[rowIndex] = updatedRow;
        return updatedRows;
      });
    }
  };

  const formatUserGuesses = () => {
    // Extract the last 5 guesses made in the current row
    const lastRowGuesses = userGuesses[activeRow].slice(-5);
    return lastRowGuesses.join('');
  };

  const handleKeyPress = (key) => {
    console.log(`Key pressed: ${key}`);
  };

  const handleSubmit = async () => {
    setSubmitClicked(true);
    if (activeRow < 5) {
      setActiveRow(activeRow + 1);
    }

    const apiUrl = `http://127.0.0.1:5000/api/v1/users/${userId}/game/${gameId}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guesses: formatUserGuesses() }),
      });

      const updatedGameData = await response.json();
      console.log(updatedGameData);

      if (response.ok) {
        setGameState(updatedGameData);
        // Do not clear user guesses, let's keep track of all guesses made
      } else {
        console.error('Error making guess:', updatedGameData);
      }
    } catch (error) {
      console.error('Error making guess:', error);
    }
  };

  if (!gameData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Game Details</h2>
      <div className="game-board">
        {gameData.attributes.game_board.map((row, rowIndex) => (
          <div key={rowIndex} className={`game-row ${rowIndex === activeRow ? 'active' : ''}`}>
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className={`key ${cell || 'white'}`}>
                <input
                  type="text"
                  maxLength="1"
                  value={userGuesses[rowIndex][cellIndex] || ''}
                  onChange={handleInputChange(rowIndex, cellIndex)}
                  disabled={rowIndex !== activeRow}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <QwertyKeyboard
        guessedLetters={userGuesses.flat().join('')}
        targetWord={gameData.attributes.target_word}
        onKeyPress={handleKeyPress}
        submitClicked={submitClicked}
      />
      <button onClick={handleSubmit}>Submit Guess</button>
    </div>
  );
};

export default Game;
