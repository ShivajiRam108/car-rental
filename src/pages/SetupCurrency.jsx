// import React, { useState } from 'react';
import { currencies } from '../data/mockData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Save, IndianRupee } from 'lucide-react';

const SetupCurrency = () => {
  const [selectedCurrency, setSelectedCurrency] = useLocalStorage('selectedCurrency', 'USD');
  const [exchangeRates, setExchangeRates] = useLocalStorage('exchangeRates', {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110,
    CAD: 1.25,
    AUD: 1.35
  });

  const handleSave = () => {
    alert('Currency settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <IndianRupee className="w-8 h-8 text-green-600" />
        <h1 className="text-2xl font-bold text-gray-900">Currency Setup</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Default Currency */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Default Currency</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Default Currency
              </label>
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                {currencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
            <div className="text-sm text-gray-600">
              <p>This will be the primary currency for all transactions and pricing.</p>
            </div>
          </div>
        </div>

        {/* Exchange Rates */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Exchange Rates</h2>
          <div className="space-y-3">
            {currencies.map(currency => (
              <div key={currency} className="flex items-center justify-between">
                <span className="font-medium text-gray-700">{currency}</span>
                <input
                  type="number"
                  step="0.01"
                  value={exchangeRates[currency] || 1}
                  onChange={(e) => setExchangeRates({
                    ...exchangeRates,
                    [currency]: parseFloat(e.target.value)
                  })}
                  className="w-24 border border-gray-300 rounded px-2 py-1 text-sm"
                />
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-gray-500">
            * Rates relative to {selectedCurrency}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );
};

export default SetupCurrency;
