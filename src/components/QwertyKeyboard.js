import React, { useState, useEffect } from 'react';
import './styles/styles.css'; // Import the stylesheet

const QwertyKeyboard = ({ guessedLetters, targetWord, onKeyPress, submitClicked }) => {
  const [disabledKeys, setDisabledKeys] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');

  useEffect(() => {
    if (submitClicked) {
      // Identify the letters in the user's guess that are not in the target word
      const incorrectGuesses = currentGuess.split('').filter((letter) => !targetWord.includes(letter));
      setDisabledKeys(incorrectGuesses);
    }
  }, [submitClicked, currentGuess, targetWord]);

  const rows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ];

  const handleKeyPress = (key) => {
    if (!submitClicked) {
      setCurrentGuess((prevGuess) => prevGuess + key);
    }
    onKeyPress(key);
  };

  return (
    <div className="qwerty-keyboard">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key, keyIndex) => {
            const isGuessed = guessedLetters.includes(key);
            const isInTargetWord = targetWord.includes(key);
            const isDisabled = isGuessed && !isInTargetWord && submitClicked;

            return (
              <div
                key={keyIndex}
                className={`keyboard-key ${isDisabled ? 'disabled' : ''}`}
                onClick={() => (!isDisabled ? handleKeyPress(key) : null)}
                onKeyDown={(e) => (isDisabled ? e.preventDefault() : null)}
                role="button"
                tabIndex={0}
                style={{ backgroundColor: isDisabled ? '#eee' : 'white' }}
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
