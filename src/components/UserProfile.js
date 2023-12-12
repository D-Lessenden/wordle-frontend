import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UserProfile = ({ logout, startNewGame }) => {
  const location = useLocation();
  const userData = location.state?.user;
  const navigate = useNavigate();
  const gameHistory = userData.attributes.game_history
  console.log(gameHistory)

  const handleLogout = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/v1/sessions/${userData.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Handle successful logout on the client side
        console.log('Logout successful');
        // Redirect to the home page or perform other actions as needed
        navigate('/');
      } else {
        // Handle unsuccessful logout
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleStartNewGame = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/v1/users/${userData.id}/game`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Handle successful new game initiation
        const gameData = await response.json();
        const userGameData = {
          user: userData,
          game: gameData.data
        };
        
        navigate(`/users/${userData.id}/game/${gameData.data.id}`, { state: userGameData });
  
      } else {
        // Handle unsuccessful new game initiation
        console.error('Failed to start a new game');
      }
    } catch (error) {
      console.error('Error during new game initiation:', error);
    }
  };


  return (
    <div>
      <h2>User Profile</h2>
      <p>Welcome, User {userData.id}!</p>

      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>

      {/* Start a new game button */}
      <button onClick={handleStartNewGame}>Start New Game</button>

      {/* Display game history */}
      <h3>Game History</h3>
      <p>Games Played: {gameHistory.games_played}</p>
      <p>Games Won: {gameHistory.games_won}</p>
      <p>Games Lost: {gameHistory.games_lost}</p>
      <p>Games won in one guess: {gameHistory.one_guess}</p>
      <p>Games won in two guesses: {gameHistory.two_guesses}</p>
      <p>Games won in three guesses: {gameHistory.three_guesses}</p>
      <p>Games won in four guesses: {gameHistory.four_guesses}</p>
      <p>Games won in five guesses: {gameHistory.five_guesses}</p>
      <p>Games won in six guesses: {gameHistory.six_guesses}</p>
    </div>
  );
};

export default UserProfile;
