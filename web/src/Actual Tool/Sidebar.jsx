import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div
            className={`h-screen z-20 bg-[#212121] text-[#F7F7F7] flex flex-col justify-between ${isCollapsed ? 'w-20' : 'w-48'
                } transition-all duration-300`}
        >
            {/* Logo Section */}
            <div className="logoContainer flex flex-col items-center w-full pt-10 px-1">
                <Link to="home">
                    <img
                        className="w-40 rounded-lg"
                        src={isCollapsed ? '../minilogo2.jpg' : '../megaLogo.jpg'}
                        alt="Logo"
                    />
                </Link>
            </div>

            {/* Links Section */}
            <div className="linksContainer flex flex-col space-y-4 w-full px-2 mt-4">
                <NavLink
                    className={({ isActive }) =>
                        `w-full px-2 rounded-md ${isActive ? 'bg-[#7E57C2] text-[#F7F7F7]' : 'text-[#B0B0B0]'}`
                    }
                    to="home"
                >
                    <div className="sidebar-item flex items-center justify-center space-x-4 rounded-md py-2 w-full">
                        <i className="bi bi-house-fill text-xl"></i>
                        {!isCollapsed && <span className="text-base mt-1">Home</span>}
                    </div>
                </NavLink>

                <NavLink
                    className={({ isActive }) =>
                        `w-full px-2 rounded-md ${isActive ? 'bg-[#7E57C2] text-[#F7F7F7]' : 'text-[#B0B0B0]'}`
                    }
                    to="analytics"
                >
                    <div className="sidebar-item flex items-center justify-center space-x-4 rounded-md py-2 w-full">
                        <i className="bi bi-bar-chart-line-fill text-xl"></i>
                        {!isCollapsed && <span className="text-base mt-1">Analytics</span>}
                    </div>
                </NavLink>

                <NavLink
                    className={({ isActive }) =>
                        `w-full px-2 rounded-md ${isActive ? 'bg-[#7E57C2] text-[#F7F7F7]' : 'text-[#B0B0B0]'}`
                    }
                    to="account"
                >
                    <div className="sidebar-item flex items-center justify-center space-x-4 rounded-md py-2 w-full">
                        <i className="bi bi-person-fill text-xl"></i>
                        {!isCollapsed && <span className="text-base mt-1">Account</span>}
                    </div>
                </NavLink>
            </div>

            {/* Log Out Section */}
            <div className="w-full px-2 mb-4">
                <div className="sidebar-item flex items-center justify-center space-x-4 rounded-md py-2 w-full">
                    <i className="bi bi-box-arrow-left text-xl"></i>
                    {!isCollapsed && <span className="text-base mt-1">Log Out</span>}
                </div>
            </div>

            {/* Collapse Button */}
            <div className="collapseContainer px-2 mb-6">
                <button
                    onClick={toggleSidebar}
                    className={`w-full flex items-center justify-center rounded-md py-2 bg-[#7E57C2] text-white font-bold transition-all duration-300`}
                >
                    {isCollapsed ? '>' : '<'}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
