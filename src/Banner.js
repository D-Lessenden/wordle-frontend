// Banner.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

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
    <div className="banner">
      <Link to="/dashboard">Dashboard</Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Banner;
