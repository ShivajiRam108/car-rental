import React from 'react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome To Rentify Admin Panel</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">Dashboard</span>
          <span className="text-gray-300"> </span>
          <span className="text-sm font-medium text-gray-900">Dashboard</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
