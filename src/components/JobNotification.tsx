import React from 'react';
import { Bell } from 'lucide-react';

interface JobNotificationProps {
  country: string;
  job: {
    title: string;
    company: string;
  };
}

const JobNotification: React.FC<JobNotificationProps> = ({ country, job }) => {
  return (
    <div className="absolute bottom-4 right-4 left-4 lg:left-auto z-50 animate-slide-up">
      <div className="bg-gray-900/90 backdrop-blur-xl border border-blue-500/30 rounded-lg p-4 shadow-glow
                    flex items-center gap-3 max-w-md transform transition-all duration-500">
        <div className="bg-blue-500/20 rounded-full p-2 flex-shrink-0">
          <Bell className="h-6 w-6 text-blue-400" />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-blue-400 truncate">New Job in {country}!</h4>
          <p className="text-xs text-gray-300 truncate">{job.title} at {job.company}</p>
        </div>
      </div>
    </div>
  );
};

export default JobNotification;