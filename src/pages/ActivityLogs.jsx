import React, { useState } from 'react';
import Table from '../components/common/Table';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Clock, Filter, Download, RefreshCw } from 'lucide-react';

const ActivityLogs = () => {
  const [logs] = useLocalStorage('activityLogs', [
    {
      id: 1,
      timestamp: '2024-08-23 10:30:25',
      user: 'John Doe',
      action: 'User Login',
      resource: 'Authentication',
      details: 'Successful login from 192.168.1.100',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/91.0.4472.124',
      status: 'Success'
    },
    {
      id: 2,
      timestamp: '2024-08-23 10:28:15',
      user: 'Admin',
      action: 'Car Added',
      resource: 'Cars',
      details: 'Added new car: Toyota Camry 2024',
      ipAddress: '192.168.1.101',
      userAgent: 'Firefox/89.0',
      status: 'Success'
    },
    {
      id: 3,
      timestamp: '2024-08-23 10:25:45',
      user: 'Jane Smith',
      action: 'Booking Created',
      resource: 'Bookings',
      details: 'Created booking for Honda CR-V',
      ipAddress: '192.168.1.102',
      userAgent: 'Safari/14.1.1',
      status: 'Success'
    },
    {
      id: 4,
      timestamp: '2024-08-23 10:20:30',
      user: 'System',
      action: 'Database Backup',
      resource: 'System',
      details: 'Automated daily backup completed',
      ipAddress: 'localhost',
      userAgent: 'System Process',
      status: 'Success'
    },
    {
      id: 5,
      timestamp: '2024-08-23 10:15:20',
      user: 'Unknown User',
      action: 'Failed Login',
      resource: 'Authentication',
      details: 'Failed login attempt for admin@example.com',
      ipAddress: '192.168.1.200',
      userAgent: 'Chrome/91.0.4472.124',
      status: 'Failed'
    }
  ]);

  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const actionTypes = ['All', 'User Login', 'User Logout', 'Car Added', 'Car Updated', 'Booking Created', 
                      'Booking Updated', 'User Created', 'User Updated', 'System Backup', 'Failed Login'];

  const filteredLogs = logs.filter(log => {
    const typeMatch = filterType === 'All' || log.action === filterType;
    const statusMatch = filterStatus === 'All' || log.status === filterStatus;
    const searchMatch = !searchTerm || 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    return typeMatch && statusMatch && searchMatch;
  });

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'timestamp', label: 'Timestamp', sortable: true },
    { key: 'user', label: 'User', sortable: true },
    { key: 'action', label: 'Action', sortable: true },
    { key: 'resource', label: 'Resource', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
      )
    },
    { key: 'ipAddress', label: 'IP Address', sortable: false }
  ];

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Timestamp,User,Action,Resource,Details,IP Address,Status\n"
      + filteredLogs.map(log => 
        `${log.id},"${log.timestamp}","${log.user}","${log.action}","${log.resource}","${log.details}","${log.ipAddress}","${log.status}"`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "activity_logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRefresh = () => {
    // Simulate refreshing logs
    alert('Activity logs refreshed!');
  };

  const stats = {
    totalLogs: logs.length,
    successfulActions: logs.filter(log => log.status === 'Success').length,
    failedActions: logs.filter(log => log.status === 'Failed').length,
    uniqueUsers: new Set(logs.map(log => log.user)).size
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Clock className="w-8 h-8 text-indigo-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Activity Logs</h1>
            <p className="text-gray-600">Monitor system and user activities</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleRefresh}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleExport}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.totalLogs}</div>
            <div className="text-sm text-gray-600">Total Activities</div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.successfulActions}</div>
            <div className="text-sm text-gray-600">Successful</div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{stats.failedActions}</div>
            <div className="text-sm text-gray-600">Failed</div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.uniqueUsers}</div>
            <div className="text-sm text-gray-600">Unique Users</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <div>
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm w-48"
            />
          </div>

          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            >
              {actionTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            >
              <option value="All">All Status</option>
              <option value="Success">Success</option>
              <option value="Failed">Failed</option>
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

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Table
          data={filteredLogs}
          columns={columns}
          searchable={false}
        />
        
        {/* Log Details */}
        <div className="p-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Activity Summary:</h3>
          <div className="space-y-2">
            {filteredLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                <div>
                  <span className="font-medium text-gray-900">{log.user}</span>
                  <span className="text-gray-600 mx-2">•</span>
                  <span className="text-gray-700">{log.action}</span>
                  <span className="text-gray-600 mx-2">•</span>
                  <span className="text-gray-500">{log.details}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">{log.timestamp}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    log.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogs;
