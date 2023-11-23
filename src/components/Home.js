// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to Wordle Clone!</h1>
      <p>Already a player? Login!</p>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <p>Not yet a player? Sign up for some fun!</p>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
}

export default Home;
