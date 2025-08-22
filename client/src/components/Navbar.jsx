import { memo } from 'react';
import { useAuth } from '../context/ContextProvider';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { user } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    return (
        <nav className="bg-gray-800 text-white flex justify-center items-center">
            <div className='text-xl font-bold'><Link to="/">Notes App</Link></div>
            <input type="text" className="bg-gray-700 text-white p-2 rounded ml-4" placeholder="Search..." />
            <div>
                <span className='mr-4'>{user ? user.name : "Guest"}</span>
                {(!user) ? (
                    <>
                        <Link to="/login" className="bg-blue-400 px-4 py-2 rounded mr-4">Login</Link>
                        <Link to="/register" className="bg-green-500 px-4 py-2 rounded mr-4">Signup</Link>
                    </>
                ) : (
                    <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
                )}
            </div>
        </nav>
    );
};

export default memo(Navbar);