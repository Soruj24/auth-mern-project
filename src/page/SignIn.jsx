import { useState, useRef } from 'react';
import { BiUserCircle, BiShow, BiHide } from 'react-icons/bi'; // Icons for user and eye
import axios from 'axios'; // Axios for making API requests
import { toast } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import { Link, useNavigate } from 'react-router-dom'
const SignIn = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        image: null,
    });

    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const [loading, setLoading] = useState(false); // Loading state
    const fileInputRef = useRef(null);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: files ? files[0] : value,
        }));
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Handle form submission with axios
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true

        try {
            const response = await axios.post('http://localhost:5000/api/user/register', formData, {
                withCredentials: true
            });
            navigate('/signin')
            toast.success('Registration successful!'); // Show success toast
            console.log('Response:', response.data); // Handle success
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.response?.data?.message || 'Registration failed.'); // Show error toast
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    // Trigger file input click
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                    Sign In
                </h2>

                {/* Image Upload */}
                <div className="flex justify-center mb-6">
                    {formData.image ? (
                        <img
                            src={URL.createObjectURL(formData.image)}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover cursor-pointer"
                            onClick={handleImageClick}
                        />
                    ) : (
                        <BiUserCircle
                            className="w-24 h-24 text-gray-400 cursor-pointer"
                            onClick={handleImageClick}
                        />
                    )}
                </div>

                {/* Hidden File Input */}
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleChange}
                    className="hidden"
                />

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username */}
                    <div>
                        <label className="block text-gray-700 mb-2">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password with Eye Icon */}
                    <div className="relative">
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div
                            className="absolute right-3 top-14 transform -translate-y-1/2 text-xl cursor-pointer text-gray-500"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <BiHide /> : <BiShow />}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white py-2 rounded-lg hover:bg-blue-700 transition-colors`}
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? 'Loading...' : 'Sign In'}
                        </button>
                    </div>
                </form>
                <p>Already have an account? <Link to="/signup" className="text-blue-600 hover:text-blue-800 transition-colors">Sign Up</Link></p>
            </div>

        </div>
    );
};

export default SignIn;
