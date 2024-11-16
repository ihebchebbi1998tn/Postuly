import React, { useState } from 'react';
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa'; // Importing icons for social logins

const LoginPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // For error message

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check for correct credentials
    if (username === 'admin' && password === 'katze') {
      console.log('Logging in with:', username, password);
      onClose(); // Close the popup after submitting
    } else {
      setErrorMessage('Invalid username or password'); // Show error if credentials are wrong
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-gray-800 border-2 border-blue-500 p-8 rounded-lg shadow-xl max-w-sm w-full">
        <h2 className="text-2xl text-center text-blue-400 mb-6">Login</h2>
        
        {/* Show error message if there's an issue */}
        {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-300">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-3 mt-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:shadow-lg focus:shadow-blue-500"
          >
            Login
          </button>
        </form>

        {/* Social Login Section */}
        <div className="mt-6 text-center">
          <p className="text-gray-300 mb-4">Or login with</p>
          <div className="flex justify-center space-x-4">
            <button className="p-3 bg-gray-800 rounded-full hover:bg-red-600 focus:outline-none">
              <FaGoogle className="text-white text-2xl" />
            </button>
            <button className="p-3 bg-gray-800 rounded-full hover:bg-blue-900 focus:outline-none">
              <FaFacebook className="text-white text-2xl" />
            </button>
            <button className="p-3 bg-gray-800 rounded-full hover:bg-gray-900 focus:outline-none">
              <FaGithub className="text-white text-2xl" />
            </button>
          </div>
        </div>

        <button
          onClick={onClose} // This will close the popup
          className="absolute top-2 right-2 text-white text-2xl hover:text-gray-400"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
