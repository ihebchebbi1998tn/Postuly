import React from 'react';
import { Filter } from 'lucide-react';

interface JobFiltersProps {
  filters: {
    type: string[];
    industry: string[];
    experience: string[];
  };
  selectedFilters: {
    type: string[];
    industry: string[];
    experience: string[];
  };
  onFilterChange: (category: string, value: string) => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({ filters, selectedFilters, onFilterChange }) => {
  return (
    <div className="p-4 bg-gray-900/90 backdrop-blur-xl border border-blue-500/30 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-blue-400">Filters</h3>
      </div>

      <div className="space-y-4">
        {Object.entries(filters).map(([category, values]) => (
          <div key={category} className="space-y-2">
            <h4 className="text-sm font-medium text-gray-300 capitalize">{category}</h4>
            <div className="flex flex-wrap gap-2">
              {values.map((value) => (
                <button
                  key={value}
                  onClick={() => onFilterChange(category, value)}
                  className={`px-3 py-1 text-sm rounded-full transition-all duration-200 ${
                    selectedFilters[category as keyof typeof selectedFilters].includes(value)
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]'
                      : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:border-blue-500/30 hover:text-blue-300'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobFilters;