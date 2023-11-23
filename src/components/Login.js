// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const responseData = await response.json();
      // console.log(responseData)

      if (response.ok) {
        // Handle successful login, e.g., redirect or update state
        // const userId = data.user.id;
        const userId = responseData.data.attributes.id;
        // console.log(userId)
        navigate(`/user/${userId}`, { state: { user: responseData.data } });
        console.log('Login successful!');
      } else {
        // Handle unsuccessful login, e.g., display error message
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
    // Handle login logic here
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;

