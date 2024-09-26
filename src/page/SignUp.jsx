import { useState } from 'react';
import axios from 'axios';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Import icons
import { toast } from 'react-toastify'; // If you're using react-toastify for notifications
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      },
        {
          withCredentials: true
        }
      );

      // Save the token to localStorage if login is successful
      const accessToken = response.data.payload.accessToken // Assuming your backend returns a token in response
      localStorage.setItem('accessToken', accessToken); // Store token in localStorage

      // Handle successful login (store token, redirect, etc.)
      console.log(response)
      toast.success('Login successful!');

      // Save token to localStorage or context if needed
    } catch (error) {
      // Handle errors
      toast.error(error.response?.data.message);
      console.error('Login error:', error.response?.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
            {/* Eye Icon for Toggling Visibility */}
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-10 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className='p-2'>Already have an account? <Link to="/signin" className="text-blue-600 hover:text-blue-800 transition-colors">Sign In</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
