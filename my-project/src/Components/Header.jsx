import { React, useState, useEffect } from 'react';
import { RiAccountCircleFill } from "react-icons/ri";
import { useAuth } from '../../Context/AuthProvider';
import Login from './Login';

const Header = () => {
    const [username, setUsername] = useState('');
    const [authUser, setAuthUser] = useAuth();

    
    useEffect(() => {
        // Retrieve 'Users' from localStorage and set the username
        const storedUser = localStorage.getItem('Users');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUsername(parsedUser.username);
        }
    }, []);
// console.log(authUser);

    // Logout functionality
    const handleLogout = () => {
        // Clear localStorage and auth context
        localStorage.removeItem('username');
        localStorage.removeItem('Users'); // Clear any other user-related data
        setAuthUser(undefined);
        setUsername('');
    };

    return (
        <>
                

            <div className="h-12 w-full py-2 px-10 border bg-slate-200">
                <div className="logo text-xl font-bold">Logo</div>

                {/* Dashboard */}
                <div className="nav mt-3">
                    <div className="item flex justify-between gap-2 bg-slate-5 p-3 mx-auto my-auto">
                        <div className="flex gap-20">
                            <a href="/" className="style-none text-xl text-gray-500">Home</a>
                            <a href="/employee-list" className="style-none text-xl text-gray-500">Employee List</a>
                        </div>
                        <div className="flex justify-between gap-10">
                            <div className="userlogin text-gray-500 mx-2 flex justify-center align-middle">
                                <RiAccountCircleFill className="text-3xl mx-2" /> {authUser ? username : "some user"}
                            </div>
                            {
                                authUser 
                                    ? <button className="btn btn-error text-white" onClick={handleLogout}>LogOut</button>
                                    : <button className="btn btn-success text-white" onClick={() => document.getElementById('my_modal_3').showModal()}>Login</button>
                            }
                        </div>
                    </div>
                    <div className="h-12 bg-yellow-300 p-3">
                        <h1 className="text-2xl text-gray-600">Dashboard</h1>
                    </div>
                </div>
            </div>

            <Login />
        </>
    );
};

export default Header;
