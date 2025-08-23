import React from 'react';
import { Outlet } from 'react-router-dom';
import IconSidebar from './IconSidebar';
import MainSidebar from './MainSidebar';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <IconSidebar />
      <MainSidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
