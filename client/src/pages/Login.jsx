import { memo, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    toast.promise(
      axios.post(`${import.meta.env.VITE_URL}api/auth/login`, { email, password }),
      {
        loading: 'Logging in...',
        success: (response) => {
          login(response.data.user, response.data.token);
          //console.log("Login successful:", response.data.user);
          window.location.href = "/dashboard";
          return <b>Login successful!</b>;
        },
        error: (error) => {
          console.error(error);
          return <b>{error.response?.data?.message || "Login failed"}</b>;
        },
      }
    ).finally(() => setLoading(false));
  };

  return (
    <div>
      <Toaster />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
        <div className='border shadow p-6 w-80 bg-white'>
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className='block text-gray-700'>Email</label>
              <input
                type="email"
                className='border border-gray-300 p-2 w-full'
                placeholder='Enter Email'
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className='block text-gray-700'>Password</label>
              <input
                type="password"
                className='border border-gray-300 p-2 w-full'
                placeholder='Enter Password'
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type='submit'
                className='w-full bg-teal-600 text-white py-2'
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
            <p className='text-center text-black'>
              Don't have an account? <a href="/register" className="text-teal-600">Signup</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(Login);
