import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Upload, Download, Database, RefreshCw, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const BackupRestore = () => {
  const [backupHistory, setBackupHistory] = useLocalStorage('backupHistory', [
    {
      id: 1,
      name: 'Auto Backup - August 23, 2024',
      type: 'Automatic',
      size: '45.2 MB',
      date: '2024-08-23 03:00:00',
      status: 'Completed',
      includes: ['Users', 'Cars', 'Bookings', 'Settings']
    },
    {
      id: 2,
      name: 'Manual Backup - August 20, 2024',
      type: 'Manual',
      size: '44.8 MB',
      date: '2024-08-20 14:30:00',
      status: 'Completed',
      includes: ['Users', 'Cars', 'Bookings']
    },
    {
      id: 3,
      name: 'System Migration Backup',
      type: 'Manual',
      size: '42.1 MB',
      date: '2024-08-15 10:00:00',
      status: 'Completed',
      includes: ['All Data']
    }
  ]);

  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [selectedIncludes, setSelectedIncludes] = useState({
    users: true,
    cars: true,
    bookings: true,
    settings: true,
    messages: true,
    logs: false
  });

  const dataCategories = [
    { key: 'users', label: 'User Data', size: '12.3 MB' },
    { key: 'cars', label: 'Car Information', size: '8.7 MB' },
    { key: 'bookings', label: 'Booking Records', size: '15.2 MB' },
    { key: 'settings', label: 'System Settings', size: '0.8 MB' },
    { key: 'messages', label: 'Contact Messages', size: '2.1 MB' },
    { key: 'logs', label: 'Activity Logs', size: '6.2 MB' }
  ];

  const handleCreateBackup = async () => {
    setIsCreatingBackup(true);
    setBackupProgress(0);

    // Simulate backup creation progress
    const progressInterval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsCreatingBackup(false);
          
          // Add new backup to history
          const newBackup = {
            id: Math.max(...backupHistory.map(b => b.id)) + 1,
            name: `Manual Backup - ${new Date().toLocaleDateString()}`,
            type: 'Manual',
            size: '45.8 MB',
            date: new Date().toISOString().replace('T', ' ').substring(0, 19),
            status: 'Completed',
            includes: Object.keys(selectedIncludes).filter(key => selectedIncludes[key])
          };
          
          setBackupHistory([newBackup, ...backupHistory]);
          alert('Backup created successfully!');
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleDownloadBackup = (backup) => {
    // Simulate file download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${backup.name.replace(/[^a-zA-Z0-9]/g, '_')}.sql`;
    link.click();
    alert(`Downloading backup: ${backup.name}`);
  };

  const handleRestoreBackup = (backup) => {
    if (window.confirm(`Are you sure you want to restore from "${backup.name}"? This will overwrite current data.`)) {
      alert('Restore process would begin. This is a demo - no actual restore performed.');
    }
  };

  const handleDeleteBackup = (backup) => {
    if (window.confirm(`Are you sure you want to delete the backup "${backup.name}"?`)) {
      setBackupHistory(backupHistory.filter(b => b.id !== backup.id));
    }
  };

  const toggleInclude = (key) => {
    setSelectedIncludes(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const totalSelectedSize = dataCategories
    .filter(cat => selectedIncludes[cat.key])
    .reduce((total, cat) => {
      const size = parseFloat(cat.size);
      return total + size;
    }, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Database className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Backup & Restore</h1>
            <p className="text-gray-600">Manage your system backups and data restoration</p>
          </div>
        </div>
      </div>

      {/* Backup Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{backupHistory.length}</div>
            <div className="text-sm text-gray-600">Total Backups</div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {backupHistory.filter(b => b.status === 'Completed').length}
            </div>
            <div className="text-sm text-gray-600">Successful</div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {backupHistory.find(b => b.type === 'Automatic')?.date ? 'Today' : 'Never'}
            </div>
            <div className="text-sm text-gray-600">Last Auto Backup</div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">45.2 MB</div>
            <div className="text-sm text-gray-600">Latest Backup Size</div>
          </div>
        </div>
      </div>

      {/* Create New Backup */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Backup</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Select Data to Include:</h3>
            <div className="space-y-3">
              {dataCategories.map((category) => (
                <label key={category.key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedIncludes[category.key]}
                      onChange={() => toggleInclude(category.key)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <span className="ml-3 text-sm text-gray-700">{category.label}</span>
                  </div>
                  <span className="text-xs text-gray-500">{category.size}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Backup Summary</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <div className="flex justify-between">
                  <span>Selected Items:</span>
                  <span>{Object.values(selectedIncludes).filter(Boolean).length} categories</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Size:</span>
                  <span>{totalSelectedSize.toFixed(1)} MB</span>
                </div>
                <div className="flex justify-between">
                  <span>Backup Type:</span>
                  <span>Manual</span>
                </div>
              </div>
            </div>
            
            {isCreatingBackup ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                  <span className="text-sm text-gray-700">Creating backup... {backupProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${backupProgress}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <button
                onClick={handleCreateBackup}
                disabled={Object.values(selectedIncludes).every(v => !v)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Create Backup</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Backup History */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Backup History</h2>
          <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>

        <div className="space-y-4">
          {backupHistory.map((backup) => (
            <div key={backup.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className={`p-1 rounded-full ${
                      backup.status === 'Completed' ? 'bg-green-100' : 'bg-yellow-100'
                    }`}>
                      {backup.status === 'Completed' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{backup.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{backup.date}</span>
                        </span>
                        <span>{backup.size}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          backup.type === 'Automatic' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {backup.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {backup.includes.map((item, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDownloadBackup(backup)}
                    className="text-green-600 hover:text-green-800 p-1"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleRestoreBackup(backup)}
                    className="text-blue-600 hover:text-blue-800 p-1"
                    title="Restore"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteBackup(backup)}
                    className="text-red-600 hover:text-red-800 p-1"
                    title="Delete"
                  >
                    <AlertTriangle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Automated Backup Settings */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Automated Backup Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="daily">Daily at 3:00 AM</option>
              <option value="weekly">Weekly (Sundays)</option>
              <option value="monthly">Monthly (1st of month)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Retention Period</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
              <option value="365">1 year</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="flex items-center">
            <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
            <span className="ml-2 text-sm text-gray-700">Enable automated backups</span>
          </label>
        </div>
        <div className="mt-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Update Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackupRestore;
