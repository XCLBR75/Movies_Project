import React, { useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom'; 

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    // Configure base URL for Axios
    axios.defaults.baseURL = 'http://localhost:5000'; 

    try {
      const response = await axios.post('/signup', { username, password, email, phone });
      console.log(response.data); // Handle success response

      // Update state to show success message and clear form fields
      setSuccessMessage('Sign up successful!');

      // Clear form fields after successful sign-up
      setUsername('');
      setPassword('');
      setEmail('');
      setPhone('');

    } catch (error) {
      console.error('Error signing up:', error); // Handle error
      setError('Failed to sign up. Please try again later.'); // Generic error message
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-indigo-600'>
      <div className='w-96 p-6 shadow-lg bg-white rounded-md'>
        <h1 className='text-3xl block text-center'>Sign Up</h1>
        <hr className='mt-3' />

        {/* Display error message if sign up fails */}
        {error && <p className='text-red-500 text-sm text-center'>{error}</p>}

        {/* Display success message if sign up succeeds */}
        {successMessage && (
          <div className='text-green-500 text-sm text-center mb-3'>{successMessage}</div>
        )}

        <div className='mt-3'>
          <label htmlFor="username" className='block text-base mb-2'>Username</label>
          <input
            type='text'
            id='username'
            className='border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-600'
            placeholder='Enter Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className='mt-3'>
          <label htmlFor="password" className='block text-base mb-2'>Password</label>
          <input
            type='password'
            id='password'
            className='border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-600'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='mt-3'>
          <label htmlFor="email" className='block text-base mb-2'>Email</label>
          <input
            type='text'
            id='email'
            className='border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-600'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='mt-3'>
          <label htmlFor="phone" className='block text-base mb-2'>Phone</label>
          <input
            type='text'
            id='phone'
            className='border w-full text-base px-2 py-1 focus:outline-none focus:border-gray-600'
            placeholder='Enter Phone Number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className='mt-5'>
          <button
            className='border-2 border-indigo-700 rounded-md w-full hover:bg-transparent hover:text-red-700 hover:bg-indigo-700 font-semibold'
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>

        {/* Render Sign In button only when sign up is successful */}
        {successMessage && (
          <div className='mt-3 text-center'>
            <Link to="/login" className='border-2 p-2 rounded-xl border-blue-400'>Sign In</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUp;
