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

  return (
    <div>
      <h2>User Profile</h2>
      <p>Welcome, User {userData.id}!</p>

      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>

      {/* Start a new game button */}
      <button onClick={startNewGame}>Start New Game</button>

      {/* Display game history */}
      <h3>Game History</h3>
      {/* Access game history from userData */}
      {/* <p>Games Played: {userData.game_history.attributes.games_played}</p> */}
      {/* Add more content as needed */}

      {/* Add more content as needed */}
    </div>
  );
};

export default UserProfile;
