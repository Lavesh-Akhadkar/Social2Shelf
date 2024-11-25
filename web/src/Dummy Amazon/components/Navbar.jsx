import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons CSS

const Navbar = () => {
    const [search, setSearch] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

    const handleSearchSubmit = () => {
        console.log(search, 'was searched');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <nav className="bg-[#131921] border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 space-x-4">
                    {/* Logo */}
                    <a href="#" className="flex items-center rounded-full space-x-4 rtl:space-x-reverse">
                        <img
                            src="https://static.vecteezy.com/system/resources/thumbnails/019/766/240/small/amazon-logo-amazon-icon-transparent-free-png.png"
                            className="h-12 rounded-lg bg-white"
                            alt=" Logo"
                        />
                      
                    </a>
                    {/* Searchbar */}
                    <div className="flex flex-1 overflow-hidden rounded-md">
                        <input
                            type="text"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            className="w-full"
                        />
                        <button
                            type="submit"
                            onClick={handleSearchSubmit}
                            className="bg-[#FEBD69] py-1 px-2"
                        >
                            <i className="text-xl md:text-3xl bi bi-search"></i>
                        </button>
                    </div>
                    {/* Hamburger Menu Button */}
                    <button
                        type="button"
                        onClick={toggleMenu}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                    {/* Navigation Links */}
                    <div
                        className={`${
                            isMenuOpen ? 'block' : 'hidden'
                        } w-full md:block md:w-auto`}
                        id="navbar-default"
                    >
                        <ul className="font-medium flex flex-col space-y-2 md:space-y-0 p-4 md:p-0 mt-4 rounded-lg md:flex-row md:items-center md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                            <li className="md:hidden">
                                <a
                                    href="#"
                                    className="block py-2 px-3 text-white bg-[#2d3c4d] rounded md:bg-transparent md:text-white md:p-0"
                                    aria-current="page"
                                >
                                    <i className="text-xl bi bi-house-door-fill mx-2"></i> Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block py-2 px-3 text-white bg-[#2d3c4d] rounded md:bg-transparent md:text-white md:p-0"
                                    aria-current="page"
                                >
                                    <i className="text-xl md:text-2xl bi bi-person-fill mx-2"></i>
                                    <span className="md:hidden"> Account</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block py-2 px-3 text-white bg-[#2d3c4d] rounded md:bg-transparent md:text-white md:p-0"
                                    aria-current="page"
                                >
                                    <i className="text-xl md:text-2xl bi bi-cart-fill mx-2"></i>{' '}
                                    <span className="md:hidden"> Cart</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
