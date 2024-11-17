export interface Job {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  company: string;
  skills: string[];
  description: string;
  type: string;
  industry: string;
  experience: string;
  location: string;
  salary: string;
  posted: string;
  benefits: string[];
  companyLogo: string;
}