import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const SidebarLayout = () => {
  return (
    <div className="flex flex-col md:flex-row w-full ">
      {/* Sidebar for screens >= sm */}
      <div className="hidden md:flex ">
        <Sidebar />
      </div>

      {/* Navbar for screens < sm */}
      <div className="md:hidden flex">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 w-full h-screen ">
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;
