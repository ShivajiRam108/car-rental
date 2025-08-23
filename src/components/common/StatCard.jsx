import React from 'react';
import CircularProgress from './Circularprogress';

const StatCard = ({ stat }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
        <div className="mt-2">
          <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {stat.active && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                ACTIVE {stat.active}
              </span>
            )}
            {stat.total && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                TOTAL {stat.total}
              </span>
            )}
            {stat.thisMonth !== undefined && (
              <span className="bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded-full">
                THIS MONTH {stat.thisMonth}
              </span>
            )}
            {stat.thisYear && (
              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                THIS YEAR {stat.thisYear}
              </span>
            )}
            {stat.replied !== undefined && (
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                REPLIED {stat.replied}
              </span>
            )}
          </div>
        </div>
      </div>
      <CircularProgress percentage={stat.percentage} color={stat.color} />
    </div>
  </div>
);

export default StatCard;
