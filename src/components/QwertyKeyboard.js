import React, { useState, useEffect } from 'react';
import './styles/styles.css'; // Import the stylesheet

const QwertyKeyboard = ({ guessedLetters, targetWord, onKeyPress, submitClicked }) => {
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  useEffect(() => {
    if (submitClicked) {
      setIsSubmitClicked(true);
    }
  }, [submitClicked]);

  const rows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ];

  return (
    <div className="qwerty-keyboard">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key, keyIndex) => {
            const isGuessed = guessedLetters.includes(key);
            const isInTargetWord = targetWord.includes(key);
            const isDisabled = isGuessed && !isInTargetWord && isSubmitClicked;

            return (
              <div
                key={keyIndex}
                className={`keyboard-key ${isDisabled ? 'disabled' : ''}`}
                onClick={() => (isDisabled ? null : onKeyPress(key))}
                onKeyDown={(e) => (isDisabled ? null : e.preventDefault())}
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
