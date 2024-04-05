// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import Game from './components/Game';
import Banner from './Banner';


function App() {
  return (
    <Router>
      <div>
        {/* <Banner /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/users/:userId/game/:gameId" element={<Game />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


