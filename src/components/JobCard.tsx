import React from 'react';
import { Building2, MapPin, Clock, Briefcase, DollarSign } from 'lucide-react';
import { Job } from '../types/Job';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-gray-900/90 backdrop-blur-xl border border-blue-500/30 rounded-lg p-4 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300">
      <div className="flex items-start gap-4 mb-4">
        <img
          src={job.companyLogo}
          alt={`${job.company} logo`}
          className="w-12 h-12 rounded-lg object-cover border border-blue-500/30"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-blue-400">{job.title}</h3>
          <p className="text-sm text-gray-400">{job.company}</p>
        </div>
        <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
          {job.type}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <MapPin className="h-4 w-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <DollarSign className="h-4 w-4" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Clock className="h-4 w-4" />
          <span>{job.posted}</span>
        </div>
      </div>

      <p className="text-sm text-gray-300 mb-4 line-clamp-2">{job.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.map((skill, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-300 border border-gray-700"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {job.benefits.map((benefit, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-300"
            >
              {benefit}
            </span>
          ))}
        </div>

        <button className="w-full py-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-colors duration-200">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;