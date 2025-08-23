import React, { useState } from 'react';
import Table from '../components/common/Table';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Shield, Key, AlertTriangle, Eye, Lock, RefreshCw } from 'lucide-react';

const Security = () => {
  const [securityEvents] = useLocalStorage('securityEvents', [
    {
      id: 1,
      timestamp: '2024-08-23 10:30:25',
      event: 'Failed Login Attempt',
      user: 'unknown@hacker.com',
      ipAddress: '192.168.1.200',
      severity: 'High',
      status: 'Blocked',
      details: 'Multiple failed login attempts detected'
    },
    {
      id: 2,
      timestamp: '2024-08-23 09:15:30',
      event: 'Suspicious Activity',
      user: 'john@example.com',
      ipAddress: '192.168.1.150',
      severity: 'Medium',
      status: 'Under Review',
      details: 'Unusual access pattern detected'
    },
    {
      id: 3,
      timestamp: '2024-08-23 08:45:12',
      event: 'Password Changed',
      user: 'admin@rentipy.com',
      ipAddress: '192.168.1.101',
      severity: 'Low',
      status: 'Completed',
      details: 'Admin password successfully changed'
    }
  ]);

  const [activeUsers] = useLocalStorage('activeUsers', [
    { id: 1, user: 'admin@rentipy.com', ipAddress: '192.168.1.101', location: 'New York, US', device: 'Chrome on Windows', lastActive: '2 min ago' },
    { id: 2, user: 'john@example.com', ipAddress: '192.168.1.102', location: 'Los Angeles, US', device: 'Safari on iPhone', lastActive: '15 min ago' },
    { id: 3, user: 'jane@example.com', ipAddress: '192.168.1.103', location: 'Chicago, US', device: 'Firefox on Mac', lastActive: '1 hour ago' }
  ]);

  const [apiKeys, setApiKeys] = useLocalStorage('apiKeys', [
    { id: 1, name: 'Mobile App API', key: 'sk_live_***************xyz', created: '2024-01-15', lastUsed: '2024-08-23', status: 'Active' },
    { id: 2, name: 'Payment Gateway', key: 'pk_test_***************abc', created: '2024-02-20', lastUsed: '2024-08-22', status: 'Active' },
    { id: 3, name: 'Analytics Service', key: 'ak_prod_***************def', created: '2024-03-10', lastUsed: 'Never', status: 'Inactive' }
  ]);

  const [activeTab, setActiveTab] = useState('events');

  const securityColumns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'timestamp', label: 'Timestamp', sortable: true },
    { key: 'event', label: 'Event', sortable: true },
    { key: 'user', label: 'User', sortable: true },
    { key: 'ipAddress', label: 'IP Address', sortable: false },
    { 
      key: 'severity', 
      label: 'Severity', 
      sortable: true,
      render: (severity) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          severity === 'High' ? 'bg-red-100 text-red-800' :
          severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {severity}
        </span>
      )
    },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === 'Blocked' ? 'bg-red-100 text-red-800' :
          status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {status}
        </span>
      )
    }
  ];

  const activeUsersColumns = [
    { key: 'user', label: 'User', sortable: true },
    { key: 'ipAddress', label: 'IP Address', sortable: false },
    { key: 'location', label: 'Location', sortable: true },
    { key: 'device', label: 'Device', sortable: true },
    { key: 'lastActive', label: 'Last Active', sortable: true }
  ];

  const apiKeysColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'key', label: 'API Key', sortable: false },
    { key: 'created', label: 'Created', sortable: true },
    { key: 'lastUsed', label: 'Last Used', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {status}
        </span>
      )
    }
  ];

  const handleTerminateSession = (user) => {
    if (window.confirm(`Are you sure you want to terminate the session for ${user.user}?`)) {
      alert(`Session terminated for ${user.user}`);
    }
  };

  const handleRevokeApiKey = (apiKey) => {
    if (window.confirm(`Are you sure you want to revoke the API key: ${apiKey.name}?`)) {
      setApiKeys(apiKeys.map(key => 
        key.id === apiKey.id ? { ...key, status: 'Revoked' } : key
      ));
    }
  };

  const generateNewApiKey = () => {
    const newKey = {
      id: Math.max(...apiKeys.map(k => k.id)) + 1,
      name: 'New API Key',
      key: `sk_new_${Math.random().toString(36).substring(7)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      status: 'Active'
    };
    setApiKeys([...apiKeys, newKey]);
  };

  const stats = {
    totalEvents: securityEvents.length,
    highSeverity: securityEvents.filter(e => e.severity === 'High').length,
    blockedEvents: securityEvents.filter(e => e.status === 'Blocked').length,
    activeSessions: activeUsers.length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8 text-red-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Security Center</h1>
            <p className="text-gray-600">Monitor and manage system security</p>
          </div>
        </div>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4" />
          <span>Security Alert</span>
        </button>
      </div>

      {/* Security Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.totalEvents}</div>
            <div className="text-sm text-gray-600">Security Events</div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{stats.highSeverity}</div>
            <div className="text-sm text-gray-600">High Severity</div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.blockedEvents}</div>
            <div className="text-sm text-gray-600">Blocked Events</div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.activeSessions}</div>
            <div className="text-sm text-gray-600">Active Sessions</div>
          </div>
        </div>
      </div>

      {/* Security Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('events')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === 'events'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Security Events</span>
            </button>
            <button
              onClick={() => setActiveTab('sessions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === 'sessions'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Active Sessions</span>
            </button>
            <button
              onClick={() => setActiveTab('apikeys')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === 'apikeys'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Key className="w-4 h-4" />
              <span>API Keys</span>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'events' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Events</h3>
              <Table
                data={securityEvents}
                columns={securityColumns}
              />
            </div>
          )}

          {activeTab === 'sessions' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Active User Sessions</h3>
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center space-x-2">
                  <RefreshCw className="w-3 h-3" />
                  <span>Refresh</span>
                </button>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <Table
                  data={activeUsers}
                  columns={activeUsersColumns}
                  onDelete={handleTerminateSession}
                />
              </div>
            </div>
          )}

          {activeTab === 'apikeys' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">API Keys Management</h3>
                <button
                  onClick={generateNewApiKey}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
                >
                  <Key className="w-4 h-4" />
                  <span>Generate New Key</span>
                </button>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <Table
                  data={apiKeys}
                  columns={apiKeysColumns}
                  onDelete={handleRevokeApiKey}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Security;
