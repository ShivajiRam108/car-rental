import React from 'react';
import { Search, Filter, X } from 'lucide-react';

const SearchFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  filters, 
  activeFilters, 
  onFilterChange, 
  onClearFilters 
}) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        {/* Search Input */}
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Filters */}
        {filters && (
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Filters:</span>
            {filters.map((filter) => (
              <select
                key={filter.key}
                value={activeFilters[filter.key] || ''}
                onChange={(e) => onFilterChange(filter.key, e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm"
              >
                <option value="">{filter.label}</option>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ))}
            
            {/* Clear Filters */}
            {Object.keys(activeFilters).length > 0 && (
              <button
                onClick={onClearFilters}
                className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>
        )}
      </div>

      {/* Active Filter Tags */}
      {Object.entries(activeFilters).length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([key, value]) => (
            value && (
              <span
                key={key}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"
              >
                {key}: {value}
                <button
                  onClick={() => onFilterChange(key, '')}
                  className="hover:text-blue-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
