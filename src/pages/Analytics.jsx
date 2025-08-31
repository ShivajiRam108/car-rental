import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Car, Calendar,IndianRupee} from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { mockUsers, mockCars, mockBookings } from '../data/mockData';

const Analytics = () => {
  const [users] = useLocalStorage('users', mockUsers);
  const [cars] = useLocalStorage('cars', mockCars);
  const [bookings] = useLocalStorage('bookings', mockBookings);
  const [timeRange, setTimeRange] = useState('7days');

  // Calculate analytics data
  const totalRevenue = bookings
    .filter(b => b.status === 'Completed')
    .reduce((sum, b) => sum + b.amount, 0);

  const activeBookings = bookings.filter(b => b.status === 'Active').length;
  const completedBookings = bookings.filter(b => b.status === 'Completed').length;
  const totalUsers = users.length;
  const verifiedUsers = users.filter(u => u.verified).length;
  const availableCars = cars.filter(c => c.status === 'Available').length;

  const analyticsCards = [
    {
      title: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      changeType: 'positive',
      icon: IndianRupee,
      color: 'green'
    }, 
    {
      title: 'Active Bookings',
      value: activeBookings,
      change: '+8.2%',
      changeType: 'positive',
      icon: Calendar,
      color: 'blue'
    },
    {
      title: 'Total Users',
      value: totalUsers,
      change: '+15.3%',
      changeType: 'positive',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Available Cars',
      value: availableCars,
      change: '-2.1%',
      changeType: 'negative',
      icon: Car,
      color: 'orange'
    }
  ];

  const bookingsByMonth = [
    { month: 'Jan', bookings: 12, revenue: 2400 },
    { month: 'Feb', bookings: 15, revenue: 3200 },
    { month: 'Mar', bookings: 18, revenue: 3800 },
    { month: 'Apr', bookings: 22, revenue: 4600 },
    { month: 'May', bookings: 25, revenue: 5200 },
    { month: 'Jun', bookings: 28, revenue: 5800 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <BarChart3 className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        </div>
        <div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="1year">Last year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className={`w-4 h-4 mr-1 ${
                    card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {card.change}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">vs last period</span>
                </div>
              </div>
              <div className={`p-3 rounded-full bg-${card.color}-100`}>
                <card.icon className={`w-6 h-6 text-${card.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Bookings</h3>
          <div className="space-y-4">
            {bookingsByMonth.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{data.month}</span>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(data.bookings / 28) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm text-gray-600">{data.bookings}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue</h3>
          <div className="space-y-4">
            {bookingsByMonth.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{data.month}</span>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(data.revenue / 5800) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm text-gray-600">₹{data.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Statistics */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">User Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{totalUsers}</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{verifiedUsers}</div>
            <div className="text-sm text-gray-600">Verified Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">
              {((verifiedUsers / totalUsers) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Verification Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
