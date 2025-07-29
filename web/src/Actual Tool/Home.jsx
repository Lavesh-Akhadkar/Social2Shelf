import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const [prodLink, setProdLink] = useState('');
  const [loading, setLoading] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [showErrorScreen, setShowErrorScreen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start the loader
    try {
      const response = await axios.post(
        'https://social2shelf-dev.onrender.com/social/analyze-instagram-post/',
        { url: prodLink },
        {
          headers: {
            "ngrok-skip-browser-warning": "69420", // Bypass ngrok warning
          },
        }
      );
      navigate('/dashboard/publish', { state: { prodData: response.data } });
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.detail === "Product validation failed. Reason: Inappropriate Content") {
        setLoading(false)
        setShowErrorScreen(true);
        setErrorMsg(' Product Validation Failed Due To Inappropriate Content ❌❌');


      } else {
        setLoading(false)
        setShowErrorScreen(true);
        setErrorMsg('Error fetching product data');
        console.error('Error fetching product data:', error);
      }
    } finally {
      setLoading(false); // Stop the loader
    }
  };

  return (
    <>
     {/* error screen */}
     {
          showErrorScreen &&
          <div className="fixed inset-0 flex flex-col justify-center items-center space-y-6 z-50 bg-gray-900">
            <img src="../error404.png" className="w-64" />
            <h1 className="text-3xl text-white font-bold"> {errorMsg} </h1>
            <button
              className="px-6 py-2 rounded-xl border-2 border-[#7E57C2] text-white text-lg font-semibold hover:bg-black"
              onClick={() => { setShowErrorScreen(false) }}>Back to page</button>
          </div>
        }

      <nav className="bg-[#212121] w-full text-[#F7F7F7]">
        {/* Navbar Container */}
        <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <NavLink to='/home'>
              <img
                className="w-24 rounded-lg"
                src="../megaLogo.jpg"
                alt="Logo"
              />
            </NavLink>
          </div>

          {/* Hamburger Icon for Small Screens */}
          <button
            onClick={toggleMenu}
            className="inline-flex items-center p-2 text-[#F7F7F7] rounded-lg md:hidden hover:bg-[#7E57C2] focus:outline-none focus:ring-2 focus:ring-[#7E57C2]"
          >
            <span className="sr-only">Open Menu</span>
            <i className="bi bi-list text-2xl"></i>
          </button>

          {/* Navbar Links (Hidden on Small Screens) */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/dashboard/home"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-md ${isActive ? 'bg-[#7E57C2]' : ''}`
              }
            >
              <i className="bi bi-house-fill text-xl"></i>
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/dashboard/analytics"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-md ${isActive ? 'bg-[#7E57C2]' : ''}`
              }
            >
              <i className="bi bi-bar-chart-line-fill text-xl"></i>
              <span>Analytics</span>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-md ${isActive ? 'bg-[#7E57C2]' : ''}`
              }
            >
              <i className="bi bi-person-fill text-xl"></i>
              <span>About</span>
            </NavLink>
            <div className="flex items-center space-x-2 px-3 py-2 rounded-md">
              <i className="bi bi-box-arrow-left text-xl"></i>
              <span>Log Out</span>
            </div>
          </div>
        </div>

        {/* Mobile Menu (Shown When Hamburger Icon is Clicked) */}
        {isMenuOpen && (
          <div className="flex flex-col md:hidden space-y-2 p-4">
            <NavLink
              to="/dashboard/home"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-md ${isActive ? 'bg-[#7E57C2]' : ''}`
              }
              onClick={() => setIsMenuOpen(false)} // Close menu on link click
            >
              <i className="bi bi-house-fill text-xl"></i>
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/dashboard/analytics"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-md ${isActive ? 'bg-[#7E57C2]' : ''}`
              }
              onClick={() => setIsMenuOpen(false)} // Close menu on link click
            >
              <i className="bi bi-bar-chart-line-fill text-xl"></i>
              <span>Analytics</span>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-md ${isActive ? 'bg-[#7E57C2]' : ''}`
              }
              onClick={() => setIsMenuOpen(false)} // Close menu on link click
            >
              <i className="bi bi-person-fill text-xl"></i>
              <span>About</span>
            </NavLink>
            <div className="flex items-center space-x-2 px-3 py-2 rounded-md">
              <i className="bi bi-box-arrow-left text-xl"></i>
              <span>Log Out</span>
            </div>
          </div>
        )}
      </nav>








      <div className="bg-[#212121] flex flex-col items-center justify-center min-h-screen w-full p-6 sm:p-10 md:p-12">
       
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl">
          {/* Left Section */}
          <div className="flex flex-col items-center lg:items-start space-y-8 sm:space-y-10">
            {/* Logo */}
            <img
              src="../megaLogo.jpg"
              className="w-3/4 sm:w-1/2 lg:w-2/3 max-w-xs rounded-xl mx-auto lg:mx-0"
              alt="Logo"
            />

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white font-bold text-center lg:text-left">
              Transforming Social Media Content into Seamless{' '}
              <span className="text-[#7E57C2]">E-Commerce Listing</span>
            </h1>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row justify-center sm:justify-center lg:justify-start items-center w-full gap-4 sm:gap-6"
            >
              <div className="relative w-full sm:w-2/3">
                <input
                  onChange={(e) => setProdLink(e.target.value)}
                  className="block w-full p-3  sm:p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Paste Your Instagram Post Link Here..."
                  required
                />
              </div>
              <button
                type="submit"
                className="text-white bg-[#7E57C2] hover:bg-[#6A4FB7] focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-6 py-2 sm:py-3"
              >
                Add To Amazon
              </button>
            </form>
          </div>

          {/* Right Section */}
          <div className="flex justify-center items-center">
            <img
              src="../flowchart2.jpg"
              className="max-w-full lg:max-w-md h-auto rounded-lg"
              alt="Process illustration"
            />
          </div>
        </div>

        {/* Loader */}
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
            <div className="flex flex-col items-center space-y-4">
              <img
                src="../shopping.gif"
                alt="Loading"
                className="w-32 h-32"
              />
              <p className="text-white text-2xl sm:text-3xl font-bold bg-black">
                Fetching Product Details...
              </p>
            </div>
          </div>
        )}
      </div>

    </>
  );
};

export default Home;
