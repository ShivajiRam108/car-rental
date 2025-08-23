import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Settings, Save, RefreshCw, Database, Globe, Mail, Bell, Shield } from 'lucide-react';

const SystemSettings = () => {
  const [settings, setSettings] = useLocalStorage('systemSettings', {
    general: {
      siteName: 'RentiPy',
      siteDescription: 'Premium Car Rental Platform',
      contactEmail: 'admin@rentipy.com',
      timezone: 'America/New_York',
      language: 'English',
      maintenanceMode: false
    },
    booking: {
      allowInstantBooking: true,
      requireVerification: true,
      cancellationPolicy: '24 hours',
      maxBookingDuration: 30,
      minBookingDuration: 1,
      advanceBookingDays: 90
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      marketingEmails: true,
      systemAlerts: true
    },
    security: {
      passwordMinLength: 8,
      requireTwoFactor: false,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      accountLockDuration: 15
    },
    payment: {
      defaultCurrency: 'USD',
      taxRate: 8.5,
      processingFee: 2.5,
      refundPolicy: 'Full refund within 24 hours',
      autoChargeEnabled: true
    }
  });

  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState(settings);

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'booking', label: 'Booking', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'payment', label: 'Payment', icon: Database }
  ];

  const handleSave = () => {
    setSettings(formData);
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset to default settings?')) {
      setFormData(settings);
    }
  };

  const updateSetting = (category, key, value) => {
    setFormData({
      ...formData,
      [category]: {
        ...formData[category],
        [key]: value
      }
    });
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
          <input
            type="text"
            value={formData.general.siteName}
            onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
          <input
            type="email"
            value={formData.general.contactEmail}
            onChange={(e) => updateSetting('general', 'contactEmail', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
          <select
            value={formData.general.timezone}
            onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
          <select
            value={formData.general.language}
            onChange={(e) => updateSetting('general', 'language', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
          <textarea
            value={formData.general.siteDescription}
            onChange={(e) => updateSetting('general', 'siteDescription', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            rows="3"
          />
        </div>
        <div className="md:col-span-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.general.maintenanceMode}
              onChange={(e) => updateSetting('general', 'maintenanceMode', e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Maintenance Mode</span>
          </label>
          <p className="text-xs text-gray-500 mt-1">Enable this to put the site in maintenance mode</p>
        </div>
      </div>
    </div>
  );

  const renderBookingSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Booking Settings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cancellation Policy</label>
          <select
            value={formData.booking.cancellationPolicy}
            onChange={(e) => updateSetting('booking', 'cancellationPolicy', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="24 hours">24 hours</option>
            <option value="48 hours">48 hours</option>
            <option value="72 hours">72 hours</option>
            <option value="1 week">1 week</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Booking Duration (days)</label>
          <input
            type="number"
            value={formData.booking.maxBookingDuration}
            onChange={(e) => updateSetting('booking', 'maxBookingDuration', parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Min Booking Duration (days)</label>
          <input
            type="number"
            value={formData.booking.minBookingDuration}
            onChange={(e) => updateSetting('booking', 'minBookingDuration', parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Advance Booking Days</label>
          <input
            type="number"
            value={formData.booking.advanceBookingDays}
            onChange={(e) => updateSetting('booking', 'advanceBookingDays', parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div className="md:col-span-2 space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.booking.allowInstantBooking}
              onChange={(e) => updateSetting('booking', 'allowInstantBooking', e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Allow Instant Booking</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.booking.requireVerification}
              onChange={(e) => updateSetting('booking', 'requireVerification', e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Require User Verification</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
      <div className="space-y-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.notifications.emailNotifications}
            onChange={(e) => updateSetting('notifications', 'emailNotifications', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <span className="ml-3 text-sm text-gray-700">Email Notifications</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.notifications.smsNotifications}
            onChange={(e) => updateSetting('notifications', 'smsNotifications', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <span className="ml-3 text-sm text-gray-700">SMS Notifications</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.notifications.pushNotifications}
            onChange={(e) => updateSetting('notifications', 'pushNotifications', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <span className="ml-3 text-sm text-gray-700">Push Notifications</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.notifications.marketingEmails}
            onChange={(e) => updateSetting('notifications', 'marketingEmails', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <span className="ml-3 text-sm text-gray-700">Marketing Emails</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.notifications.systemAlerts}
            onChange={(e) => updateSetting('notifications', 'systemAlerts', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <span className="ml-3 text-sm text-gray-700">System Alerts</span>
        </label>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password Min Length</label>
          <input
            type="number"
            min="6"
            max="20"
            value={formData.security.passwordMinLength}
            onChange={(e) => updateSetting('security', 'passwordMinLength', parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
          <input
            type="number"
            value={formData.security.sessionTimeout}
            onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
          <input
            type="number"
            value={formData.security.maxLoginAttempts}
            onChange={(e) => updateSetting('security', 'maxLoginAttempts', parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Account Lock Duration (minutes)</label>
          <input
            type="number"
            value={formData.security.accountLockDuration}
            onChange={(e) => updateSetting('security', 'accountLockDuration', parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div className="md:col-span-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.security.requireTwoFactor}
              onChange={(e) => updateSetting('security', 'requireTwoFactor', e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Require Two-Factor Authentication</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Payment Settings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
          <select
            value={formData.payment.defaultCurrency}
            onChange={(e) => updateSetting('payment', 'defaultCurrency', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="CAD">CAD</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={formData.payment.taxRate}
            onChange={(e) => updateSetting('payment', 'taxRate', parseFloat(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Processing Fee (%)</label>
          <input
            type="number"
            step="0.1"
            value={formData.payment.processingFee}
            onChange={(e) => updateSetting('payment', 'processingFee', parseFloat(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.payment.autoChargeEnabled}
              onChange={(e) => updateSetting('payment', 'autoChargeEnabled', e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Auto Charge Enabled</span>
          </label>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Refund Policy</label>
          <textarea
            value={formData.payment.refundPolicy}
            onChange={(e) => updateSetting('payment', 'refundPolicy', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            rows="3"
          />
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'booking':
        return renderBookingSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'payment':
        return renderPaymentSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Settings className="w-8 h-8 text-gray-600" />
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleReset}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
