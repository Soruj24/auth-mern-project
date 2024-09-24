import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi"; // Importing the user icon

const Header = () => {
  return (
    <header className="bg-slate-300 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Home Link */}
        <div className="text-xl font-semibold text-gray-800">
          <Link to="/" className="hover:text-blue-600 transition-colors duration-300">
            Auth
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-4">
          <Link
            to="profile"
            className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-300"
          >
            <BiUserCircle className="mr-1 text-2xl" /> {/* User icon */}
            Profile
          </Link>
          <Link
            to="signin"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
          >
            Sign In
          </Link>
          <Link
            to="signup"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
          >
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
