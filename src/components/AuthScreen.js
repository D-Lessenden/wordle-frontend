import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <h1>Welcome to our App</h1>
      {isLogin ? <Login /> : <Signup />}
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default AuthScreen;

