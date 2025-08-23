import React from 'react';
import { Users } from 'lucide-react';
import { sidebarItems } from '../../data/sidebarItems';
import { getSectionTitle } from '../../utils/helpers';

const MainSidebar = ({ activeItem, setActiveItem }) => {
  let currentSection = '';

  return (
    <div className="w-64 bg-slate-800 text-white flex flex-col">
      {/* Brand Name */}
      <div className="p-4 border-b border-slate-700">
        <h1 className="text-xl font-bold text-cyan-400">rentiPy</h1>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-semibold">Super Admin</h2>
            <p className="text-sm text-slate-400">Super Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation - Scrollable */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {sidebarItems.map((item) => {
            const showSectionTitle = currentSection !== item.section;
            if (showSectionTitle) {
              currentSection = item.section;
            }

            return (
              <div key={item.name}>
                {showSectionTitle && getSectionTitle(item.section) && (
                  <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {getSectionTitle(item.section)}
                  </div>
                )}
                <button
                  onClick={() => setActiveItem(item.name)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeItem === item.name
                      ? 'bg-slate-700 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm">{item.name}</span>
                </button>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default MainSidebar;
