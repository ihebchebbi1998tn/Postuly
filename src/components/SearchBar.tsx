import React from 'react';
import { Search, Menu } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onOpenSidebar: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onOpenSidebar }) => {
  return (
    <div className="relative px-4 lg:px-0 flex items-center gap-2">
      {/* Mobile Menu Button */}
      <button
        onClick={onOpenSidebar}
        className="lg:hidden flex-shrink-0 p-2 rounded-lg bg-gray-900/90 border border-blue-500/30 
                  backdrop-blur-xl shadow-glow hover:bg-blue-500/10 transition-colors duration-200"
      >
        <Menu className="h-5 w-5 text-blue-400" />
      </button>

      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-blue-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-blue-500/30 rounded-lg 
                   bg-gray-900/60 backdrop-blur-xl text-white placeholder-blue-300/50
                   focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
                   shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300"
          placeholder="Search for jobs, skills, or locations..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;