import React from 'react'
import Header from './Components/Header'
import Login from './Components/Login'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../Context/AuthProvider'

const Home = () => {
  const [authUser, setAuthUser] = useAuth(); // Use Auth context

    return (
        <>
            <div className="main bg-slate-50 max-h-screen">
                {
                   authUser ? "  " :  alert("Please click Login Button to Login and access")
                }
                <Header />
                <main className='max-h-screen px-10 '>
                    <Outlet />
                </main>
            </div>
            
        </>
    );
}

export default Home;
