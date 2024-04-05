import React, { useState, useEffect } from 'react';
import './styles/styles.css'; // Import the stylesheet

const QwertyKeyboard = ({ guessedLetters, targetWord, onKeyPress, submitClicked, activeRow, updatedGameData }) => {
    const [disabledKeys, setDisabledKeys] = useState([]);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guessSubmitted, setGuessSubmitted] = useState(false);
    const [firstGuessMade, setFirstGuessMade] = useState(false);
  
    const rows = [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    ];
  
    useEffect(() => {
      // Reset disabledKeys when the component mounts
      setDisabledKeys([]);
  
      if (submitClicked && currentGuess !== '' && activeRow !== null && !guessSubmitted && updatedGameData) {
        const gameBoardRow = getGameBoardRow(activeRow); // Get the game board row for the current guess
        const incorrectGuesses = currentGuess.split('').filter((letter) => !targetWord.includes(letter));
  
        // Determine correct positions and correct letters in the wrong position
        const correctPositions = currentGuess
          .split('')
          .map((letter, index) => (gameBoardRow[index] === letter ? index : -1))
          .filter((index) => index !== -1);
  
        const correctLettersWrongPosition = currentGuess
          .split('')
          .filter((letter, index) => !correctPositions.includes(index) && targetWord.includes(letter));
  
        if (activeRow !== null) {
          // Filter out correct positions that are not in the user's guess
          const filteredCorrectPositions = correctPositions.filter((index) =>
            currentGuess.includes(gameBoardRow[index])
          );
  
          setDisabledKeys([...incorrectGuesses, ...filteredCorrectPositions, ...correctLettersWrongPosition]);
          setGuessSubmitted(true);
        }
  
        // The first guess has been made, set firstGuessMade to true
        setFirstGuessMade(true);
      }
    }, [submitClicked, currentGuess, activeRow, guessSubmitted, updatedGameData, targetWord, firstGuessMade]);

  

  // ... (other functions)

  const getGameBoardRow = (rowIndex) => {
    // Extract the row for the given index from the game board
    return updatedGameData && rowIndex < updatedGameData.game_board.length
      ? updatedGameData.game_board[rowIndex]
      : [];
  };

  return (
    <div className="qwerty-keyboard">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key, keyIndex) => {
            const isGuessed = guessedLetters.includes(key);
            const isInTargetWord = targetWord.includes(key);
            const isCorrectPosition = getGameBoardRow(activeRow).indexOf(key) === currentGuess.length - 1;
            const isDisabled = isGuessed && !isInTargetWord && submitClicked;

            return (
              <div
                key={keyIndex}
                className={`keyboard-key ${
                  isDisabled ? 'disabled' : ''
                } ${isInTargetWord ? 'in-target-word' : ''} ${isCorrectPosition ? 'correct-position' : ''}`}
                style={{
                  backgroundColor: isDisabled
                    ? '#eee'
                    : isInTargetWord && !isCorrectPosition && firstGuessMade
                    ? 'yellow'
                    : isInTargetWord && isCorrectPosition && firstGuessMade
                    ? 'green'
                    : 'white',
                }}
              >
                {key}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default QwertyKeyboard;