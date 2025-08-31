import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { mockUsers, mockCars, mockBookings } from '../data/mockData';

const Reports = () => {
  const [users] = useLocalStorage('users', mockUsers);
  const [cars] = useLocalStorage('cars', mockCars);
  const [bookings] = useLocalStorage('bookings', mockBookings);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedReport, setSelectedReport] = useState('');

  const reportTypes = [
    {
      id: 'user-activity',
      name: 'User Activity Report',
      description: 'Comprehensive report on user registrations, verifications, and activity',
      icon: '👥'
    },
    {
      id: 'booking-summary',
      name: 'Booking Summary Report',
      description: 'Overview of all bookings, revenue, and trends',
      icon: '📊'
    },
    {
      id: 'revenue-analysis',
      name: 'Revenue Analysis Report',
      description: 'Detailed financial analysis and revenue breakdowns',
      icon: '💰'
    },
    {
      id: 'car-utilization',
      name: 'Car Utilization Report',
      description: 'Analysis of car usage, availability, and performance',
      icon: '🚗'
    },
    {
      id: 'customer-feedback',
      name: 'Customer Feedback Report',
      description: 'Summary of customer messages and satisfaction metrics',
      icon: '📝'
    }
  ];

  const generateReport = (reportType) => {
    let reportData = {};
    
    switch (reportType) {
      case 'user-activity':
        reportData = {
          totalUsers: users.length,
          verifiedUsers: users.filter(u => u.verified).length,
          activeUsers: users.filter(u => u.status === 'Active').length,
          bannedUsers: users.filter(u => u.status === 'Banned').length
        };
        break;
      case 'booking-summary':
        reportData = {
          totalBookings: bookings.length,
          activeBookings: bookings.filter(b => b.status === 'Active').length,
          completedBookings: bookings.filter(b => b.status === 'Completed').length,
          cancelledBookings: bookings.filter(b => b.status === 'Cancelled').length
        };
        break;
      case 'revenue-analysis':
        reportData = {
          totalRevenue: bookings.filter(b => b.status === 'Completed').reduce((sum, b) => sum + b.amount, 0),
          averageBookingValue: bookings.length > 0 ? bookings.reduce((sum, b) => sum + b.amount, 0) / bookings.length : 0,
          monthlyRevenue: 5200 // Mock data
        };
        break;
      case 'car-utilization':
        reportData = {
          totalCars: cars.length,
          availableCars: cars.filter(c => c.status === 'Available').length,
          bookedCars: cars.filter(c => c.status === 'Booked').length,
          maintenanceCars: cars.filter(c => c.status === 'Maintenance').length
        };
        break;
      default:
        reportData = {};
    }
    
    return reportData;
  };

  const handleDownloadReport = (reportType) => {
    const reportData = generateReport(reportType);
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Metric,Value\n"
      + Object.entries(reportData).map(([key, value]) => `${key},${value}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${reportType}-report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const quickStats = [
    { label: 'Total Users', value: users.length, color: 'blue' },
    { label: 'Total Bookings', value: bookings.length, color: 'green' },
    { label: 'Total Cars', value: cars.length, color: 'purple' },
    { label: 'Monthly Revenue', value: '₹ 5,200', color: 'yellow' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <FileText className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="text-center">
              <div className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Date Range Filter */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="font-medium text-gray-700">Report Filters:</span>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">From:</span>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">To:</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((report) => (
          <div key={report.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{report.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-900">{report.name}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{report.description}</p>
                
                {/* Sample Data Preview */}
                {report.id === selectedReport && (
                  <div className="bg-gray-50 rounded p-3 mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Preview:</h4>
                    <div className="text-xs text-gray-600 space-y-1">
                      {Object.entries(generateReport(report.id)).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span>{key.replace(/([A-Z])/g, ' ₹1').replace(/^./, str => str.toUpperCase())}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedReport(selectedReport === report.id ? '' : report.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm flex items-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>{selectedReport === report.id ? 'Hide' : 'Preview'}</span>
              </button>
              <button
                onClick={() => handleDownloadReport(report.id)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
