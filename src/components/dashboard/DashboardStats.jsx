import React, { useMemo } from 'react';
import StatCard from '../common/StatCard';
import { dashboardStats } from '../../data/sidebarItems';

const DashboardStats = () => {
  const memoizedStats = useMemo(() => dashboardStats, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {memoizedStats.map((stat, index) => (
        <StatCard key={`dashboard-stat-${index}`} stat={stat} />
      ))}
    </div>
  );
};

export default DashboardStats;
