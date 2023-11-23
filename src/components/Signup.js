// Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: {email, password, password_confirmation }}),
      });
      const responseData = await response.json();
      // const userId =responseData.data.attributes.id
      // console.log(responseData.data.attributes.id)

      if (response.ok) {
        // Check if data is not undefined and has the expected structure
        if (responseData && responseData.data && responseData.data.attributes && responseData.data.attributes.id) {
          const userId = responseData.data.attributes.id;
          console.log('Signup successful!', userId);
          
          // Redirect to the user's profile page after successful signup
          navigate(`/user/${userId}`, { state: { user: responseData.data } });
        } else {
          console.error('Signup failed: Unexpected response format');
        }
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={password_confirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;
