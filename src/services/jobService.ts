import { Job } from '../types/Job';
import { jobsData, filters } from '../data/jobsData';

export const JobService = {
  getAllJobs(): Job[] {
    return jobsData;
  },

  getJobById(id: string): Job | undefined {
    return jobsData.find(job => job.id === id);
  },

  getFilters() {
    return filters;
  },

  filterJobs(selectedFilters: {
    type: string[];
    industry: string[];
    experience: string[];
  }): Job[] {
    return jobsData.filter(job => {
      const typeMatch = selectedFilters.type.length === 0 || selectedFilters.type.includes(job.type);
      const industryMatch = selectedFilters.industry.length === 0 || selectedFilters.industry.includes(job.industry);
      const experienceMatch = selectedFilters.experience.length === 0 || selectedFilters.experience.includes(job.experience);
      
      return typeMatch && industryMatch && experienceMatch;
    });
  },

  searchJobs(query: string): Job[] {
    const searchTerm = query.toLowerCase();
    return jobsData.filter(job => 
      job.title.toLowerCase().includes(searchTerm) ||
      job.company.toLowerCase().includes(searchTerm) ||
      job.location.toLowerCase().includes(searchTerm) ||
      job.description.toLowerCase().includes(searchTerm) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm))
    );
  }
};