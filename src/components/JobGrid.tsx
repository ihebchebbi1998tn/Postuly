import React from 'react';

import JobCard from './JobCard';
import JobFilters from './JobFilters';

interface JobGridProps {
  jobs: any[];
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

const JobGrid: React.FC<JobGridProps> = ({ jobs, filters, selectedFilters, onFilterChange }) => {
  return (
    <div className="h-screen flex bg-gray-900 text-white"> {/* Dark theme background */}
      {/* Filters Sidebar */}
      <div className="w-64 h-full border-r border-blue-500/20 overflow-y-auto hidden lg:block">
        <div className="sticky top-0 p-4">
          <JobFilters
            filters={filters}
            selectedFilters={selectedFilters}
            onFilterChange={onFilterChange}
          />
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobGrid;
