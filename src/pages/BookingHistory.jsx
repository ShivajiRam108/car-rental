import React, { useState } from 'react';
import Table from '../components/common/Table';
import { mockBookings, mockUsers, mockCars } from '../data/mockData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Archive, Download, Filter } from 'lucide-react';

const BookingHistory = () => {
  const [bookings] = useLocalStorage('bookings', mockBookings);
  const [users] = useLocalStorage('users', mockUsers);
  const [cars] = useLocalStorage('cars', mockCars);
  const [filterStatus, setFilterStatus] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  const getCarModel = (carId) => {
    const car = cars.find(c => c.id === carId);
    return car ? car.model : 'Unknown Car';
  };

  const filteredBookings = bookings.filter(booking => {
    const statusMatch = filterStatus === 'All' || booking.status === filterStatus;
    const startDateMatch = !dateRange.start || booking.startDate >= dateRange.start;
    const endDateMatch = !dateRange.end || booking.endDate <= dateRange.end;
    return statusMatch && startDateMatch && endDateMatch;
  });

  const columns = [
    { key: 'id', label: 'Booking ID', sortable: true },
    { 
      key: 'userId', 
      label: 'Customer', 
      sortable: true,
      render: (userId) => getUserName(userId)
    },
    { 
      key: 'carId', 
      label: 'Vehicle', 
      sortable: true,
      render: (carId) => getCarModel(carId)
    },
    { key: 'startDate', label: 'Start Date', sortable: true },
    { key: 'endDate', label: 'End Date', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === 'Completed' ? 'bg-green-100 text-green-800' :
          status === 'Active' ? 'bg-blue-100 text-blue-800' :
          'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
      )
    },
    { 
      key: 'amount', 
      label: 'Total Amount', 
      sortable: true,
      render: (amount) => `₹${amount}`
    }
  ];

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Booking ID,Customer,Vehicle,Start Date,End Date,Status,Amount\n"
      + filteredBookings.map(b => 
        `${b.id},${getUserName(b.userId)},${getCarModel(b.carId)},${b.startDate},${b.endDate},${b.status},${b.amount}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "booking_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalRevenue = filteredBookings
    .filter(b => b.status === 'Completed')
    .reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Archive className="w-8 h-8 text-indigo-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Booking History</h1>
            <p className="text-gray-600">Total Revenue: ₹{totalRevenue}</p>
          </div>
        </div>
        <button
          onClick={handleExport}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
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

      <Table
        data={filteredBookings}
        columns={columns}
      />
    </div>
  );
};

export default BookingHistory;
