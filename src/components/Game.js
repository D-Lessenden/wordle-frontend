// components/Game.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './styles/styles.css';
import QwertyKeyboard from './QwertyKeyboard';

const Game = () => {
  const location = useLocation();
  const gameData = location.state;
  const userId = 19;
  const gameId = gameData.game.id;
  const [userGuesses, setUserGuesses] = useState(Array.from({ length: 6 }, () => Array(5).fill('')));
  const [gameState, setGameState] = useState(gameData.game);
  const [submitClicked, setSubmitClicked] = useState(false);
//   console.log(gameData.game.attributes.target_word)

  const handleInputChange = (rowIndex, cellIndex) => (event) => {
    // Ensure event.target exists before accessing its properties
    if (!event.target) {
      console.error('Event target is undefined');
      return;
    }

    // Handle user input for each row
    const inputValue = event.target.value.toLowerCase(); // Assuming guesses are case-insensitive

    // Create a shallow copy of the current userGuesses
    const updatedGuesses = [...userGuesses];

    // Create a shallow copy of the current row
    const updatedRow = [...updatedGuesses[rowIndex]];

    updatedRow[cellIndex] = inputValue;
    updatedGuesses[rowIndex] = updatedRow;
    setUserGuesses(updatedGuesses);
  };

  const formatUserGuesses = () => {
    // console.log(userGuesses)
    // Format the user guesses into an array of arrays
    return userGuesses.flat().join('');
  };

  const handleKeyPress = (key) => {
    // Placeholder function for demonstration
    console.log(`Key pressed: ${key}`);
  };

  const handleSubmit = () => {
    setSubmitClicked(true);
    // Submit user guesses to the backend
    const apiUrl = `http://127.0.0.1:5000/api/v1/users/${userId}/game/${gameId}`;

    fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ guesses: formatUserGuesses() }),
    })
      .then(response => response.json())
      .then(updatedGameData => {
        // Update the UI based on the updated game state
        console.log(updatedGameData);
        setGameState(updatedGameData);
      })
      .catch(error => console.error('Error making guess:', error));
  };

  if (!gameData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Game Details</h2>
      <div className="game-board">
        {gameData.game.attributes.game_board.map((row, rowIndex) => (
          <div key={rowIndex} className="game-row">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className={`key ${cell || 'white'}`}>
                <input
                  type="text"
                  maxLength="1"
                  value={userGuesses[rowIndex][cellIndex] || ''}
                  onChange={handleInputChange(rowIndex, cellIndex)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <QwertyKeyboard
        guessedLetters={ formatUserGuesses() }  // Replace with your guessedLetters logic
        targetWord={gameData.game.attributes.target_word}
        onKeyPress={handleKeyPress}
        submitClicked={submitClicked}
      />
      <button onClick={handleSubmit}>Submit Guess</button>
    </div>
  );
};

export default Game;
