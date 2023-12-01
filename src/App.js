// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import Game from './components/Game';

function App() {
  return (
    <Router>
      <div>
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
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


