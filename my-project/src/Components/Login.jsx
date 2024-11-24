import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../Context/AuthProvider'; // Import your AuthProvider
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authUser, setAuthUser] = useAuth(); // Use Auth context
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validation
    if (!username || !password) {
      toast.error('Please enter both username and password.');
      return;
    }

    try {
      // Send login request to backend
      const response = await axios.post('http://localhost:5050/login', {
        username,
        password,
      });

      if (response.status === 200) {
        const { username, _id } = response.data; // Destructure response data

        console.log('Login successful:', response.data);

        // Store user in Auth context and localStorage
        const userData = { username, _id };
        localStorage.setItem('Users', JSON.stringify(userData));
        setAuthUser(userData);

        toast.success('Login successful!');
        navigate('/employee-list'); // Redirect to the home page
      } else {
        toast.error('Login failed.');
      }
    } catch (error) {
      toast.error( 'Username or password Is Incorrecty');
    }
  };

  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div className="w-full shadow-sm">
            <h1 className="text-2xl text-gray-500 font-bold text-center">Please Login</h1>
            <div className="card-body mt-7">
              <form onSubmit={handleLogin}>
                <h1 className="mx-1 text-gray-700">Username :</h1>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </label>
                <h1 className="mx-1 text-gray-700 mt-2">Password :</h1>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="password"
                    className="grow"
                    placeholder="******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <button type="submit" className="btn btn-success w-full my-2">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Login;
