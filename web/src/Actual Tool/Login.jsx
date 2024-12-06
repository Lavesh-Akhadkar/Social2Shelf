import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate , Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email,
                password,
            });
            const { token } = response.data;
            localStorage.setItem('token', token);
            navigate('/home');
        } catch (error) {
            navigate('/home');

        }
    };


    return (
        <div className="flex flex-col md:flex-row min-h-screen h-full">
            {/* Left Section: Form */}
            <div className=" flex flex-col min-h-screen h-full justify-center space-y-6 items-center bg-[#212121] text-white w-full md:w-2/5 px-8 md:px-12 py-6">
                <img src='../megaLogo.jpg' className='h-32' />
                <form onSubmit={handleLogin} className="w-full max-w-sm">
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="email">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-[#7E57e2] bg-gray-900 hover:bg-black border-2 border-[#7E57C2] font-bold rounded-md"
                    >
                        Sign in
                    </button>
                </form>
                <h1 className="text-sm text-center text-gray-600 mt-4">
                    {"Don't"} have an account?{" "}
                    <Link
                        to="/"
                        className="text-sm text-[#7E57C2] font-semibold cursor-pointer hover:underline"
                    >
                        Signup
                    </Link>
                </h1>
            </div>

            {/* Right Section (Empty for Now) */}
            <div className="hidden md:flex md:flex-col p-2 justify-evenly md:w-3/5 min-h-screen  items-center h-full bg-gradient-to-r from-purple-700 to-gray-900">
                <h1 className='text-5xl text-center font-bold max-w-xl text-white'>Just a Few Clicks Away from Your Next Listing!</h1>
                <img src='../login2.png' className='h-64 ' />
            </div>
        </div>
    );
};

export default Login;
