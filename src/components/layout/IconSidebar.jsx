// import React from 'react';
// import { Car, Search, Home, Users, Bell, Settings, HelpCircle } from 'lucide-react';

// const IconSidebar = () => {
//   return (
//     <div className="w-16 bg-slate-900 text-white flex flex-col items-center py-4 space-y-6">
//       {/* Logo */}
//       <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
//         <Car className="w-6 h-6 text-white" />
//       </div>
      
//       {/* Icon Navigation */}
//       <div className="flex flex-col space-y-4">
//         <button className="p-2 rounded-lg bg-slate-700 text-white">
//           <Search className="w-5 h-5" />
//         </button>
//         <button className="p-2 rounded-lg hover:bg-slate-700 text-slate-400">
//           <Home className="w-5 h-5" />
//         </button>
//         <button className="p-2 rounded-lg hover:bg-slate-700 text-slate-400">
//           <Users className="w-5 h-5" />
//         </button>
//         <button className="p-2 rounded-lg hover:bg-slate-700 text-slate-400">
//           <Bell className="w-5 h-5" />
//         </button>
//         <button className="p-2 rounded-lg hover:bg-slate-700 text-slate-400">
//           <Settings className="w-5 h-5" />
//         </button>
//       </div>
      
//       {/* Bottom Icon */}
//       <div className="mt-auto">
//         <button className="p-2 rounded-lg hover:bg-slate-700 text-slate-400">
//           <HelpCircle className="w-5 h-5" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default IconSidebar;

import React, { useState } from "react";
import {
  Sun,
  Moon,
  Search,
  Bell,
  Settings,
  User,
  LogOut,
} from "lucide-react";

const IconSidebar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", !darkMode);
  };

  return (
    <div
      className="h-screen w-16 bg-gray-900 text-white flex flex-col justify-between py-6"
    >
      {/* Top Section */}
      <div className="flex flex-col items-center gap-6">
        {/* Theme Toggle */}
        <button onClick={toggleTheme} title="Toggle Theme">
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        {/* Search */}
        <button title="Search">
          <Search size={24} />
        </button>

        {/* Notifications */}
        <button title="Notifications">
          <Bell size={24} />
        </button>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col items-center gap-6">
        {/* Settings */}
        <button title="Settings">
          <Settings size={24} />
        </button>

        {/* Admin */}
        <button title="Admin">
          <User size={24} />
        </button>

        {/* Logout */}
        <button title="Logout">
          <LogOut size={24} />
        </button>
      </div>
    </div>
  );
};

export default IconSidebar;

