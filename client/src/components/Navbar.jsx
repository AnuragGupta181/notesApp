import { memo, useState } from "react";
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import useScrollHide from "./useScrollHide";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const hidden = useScrollHide();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out!');
    window.location.href = "/login";
  };

  return (
    <>
      <Toaster />
      <nav
        className={`fixed w-full bg-gray-800 text-white transition-transform duration-300 ${
          hidden ? "-translate-y-20" : "translate-y-0"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <div className="text-2xl font-bold">
            <Link to="/">Notes App</Link>
          </div>
          <div className="hidden md:flex space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-700 text-white px-2 py-1 rounded"
            />
            {!user ? (
              <>
                <button><Link to="/login" className="bg-blue-500 px-4 py-2 rounded">Login</Link></button>
                <button><Link to="/register" className="bg-green-500 px-4 py-2 rounded">SignUp</Link></button>
              </>
            ) : (
              <>
                <span>Hi, {user.name}!</span>
                <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
              </>
            )}
          </div>
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </div>
          </button>
        </div>
        <div className={`md:hidden bg-gray-800 px-4 pt-2 pb-4 transition-max-height duration-300 overflow-hidden ${
          menuOpen ? "max-h-40" : "max-h-0"
        }`}>
          {!user ? (
            <>
              <button><Link to="/login" className="bg-blue-500 px-4 py-2  m-5 rounded text-center">Login</Link></button>
                <button><Link to="/register" className="bg-green-500 m-5 px-4 py-2 rounded text-center">SignUp</Link></button>
            </>
          ) : (
            <>
              <p className="font-bold text-left text-1xl py-2">Hello, {user.name}!</p>
              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded text-center">Logout</button>
            </>
          )}
        </div>
      </nav>
      <div className="pt-20"></div>
    </>
  );
};

export default memo(Navbar);