import React from 'react';
import { Map, LayoutGrid } from 'lucide-react';

interface ViewSwitcherProps {
  view: 'map' | 'grid';
  onViewChange: (view: 'map' | 'grid') => void;
}

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ view, onViewChange }) => {
  return (
    <div className="flex items-center bg-gray-900/90 backdrop-blur-xl border border-blue-500/30 rounded-lg p-1">
      <button
        onClick={() => onViewChange('map')}
        className={`p-2 rounded-lg transition-all duration-200 ${
          view === 'map'
            ? 'bg-blue-500/20 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.2)]'
            : 'text-gray-400 hover:bg-blue-500/10 hover:text-blue-300'
        }`}
        aria-label="Map View"
      >
        <Map className="h-5 w-5" />
      </button>
      <button
        onClick={() => onViewChange('grid')}
        className={`p-2 rounded-lg transition-all duration-200 ${
          view === 'grid'
            ? 'bg-blue-500/20 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.2)]'
            : 'text-gray-400 hover:bg-blue-500/10 hover:text-blue-300'
        }`}
        aria-label="Grid View"
      >
        <LayoutGrid className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ViewSwitcher;