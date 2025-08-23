import React from 'react';
import StatCard from '../common/StatCard';
import { dashboardStats } from '../../data/sidebarItems';

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dashboardStats.map((stat, index) => (
        <StatCard key={index} stat={stat} />
      ))}
    </div>
  );
};

export default DashboardStats;
