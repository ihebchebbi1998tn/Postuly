import React, { useRef, useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import SearchBar from './SearchBar';
import JobNotification from './JobNotification';
import ViewSwitcher from './ViewSwitcher';
import JobGrid from './JobGrid';
import { JobService } from '../services/jobService';
import { Job } from '../types/Job';

interface MapComponentProps {
  onOpenSidebar: () => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onOpenSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'map' | 'grid'>('map');
  const [notification, setNotification] = useState<{
    country: string;
    job: { title: string; company: string };
  } | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Job | null>(null);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(JobService.getAllJobs());
  const mapRef = useRef<google.maps.Map>();

  const filters = JobService.getFilters();
  const [selectedFilters, setSelectedFilters] = useState({
    type: [],
    industry: [],
    experience: [],
  });

  const handleFilterChange = (category: string, value: string) => {
    const newFilters = {
      ...selectedFilters,
      [category]: selectedFilters[category as keyof typeof selectedFilters].includes(value)
        ? selectedFilters[category as keyof typeof selectedFilters].filter(v => v !== value)
        : [...selectedFilters[category as keyof typeof selectedFilters], value],
    };
    setSelectedFilters(newFilters);
    setFilteredJobs(JobService.filterJobs(newFilters));
  };

  useEffect(() => {
    if (searchQuery) {
      setFilteredJobs(JobService.searchJobs(searchQuery));
    } else {
      setFilteredJobs(JobService.filterJobs(selectedFilters));
    }
  }, [searchQuery, selectedFilters]);

  const mapStyles = {
    width: '100%',
    height: '100%',
  };

  const defaultCenter = {
    lat: 36.8065,  // Tunisia
    lng: 10.1815,
  };

  const mapOptions = {
    styles: [
      {
        elementType: "geometry",
        stylers: [{ color: "#0c1015" }],
      },
      {
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "administrative.country",
        elementType: "geometry.stroke",
        stylers: [{ color: "#3b82f6" }, { weight: 0.5 }],
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [{ color: "#151a23" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#0a0d12" }],
      },
    ],
    disableDefaultUI: true,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
  };

  useEffect(() => {
    const showRandomNotification = () => {
      const jobs = JobService.getAllJobs();
      const randomJob = jobs[Math.floor(Math.random() * jobs.length)];
      setNotification({
        country: randomJob.location.split(',')[1].trim(),
        job: { title: randomJob.title, company: randomJob.company }
      });
      setTimeout(() => setNotification(null), 4000);
    };

    const interval = setInterval(showRandomNotification, 5000);
    return () => clearInterval(interval);
  }, []);

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  return (
    <div className="relative flex flex-col h-full">
      <div className="p-4 bg-gray-900/80 backdrop-blur-xl border-b border-blue-500/20">
        <div className="flex items-center gap-4 max-w-screen-xl mx-auto w-full">
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery}
            onOpenSidebar={onOpenSidebar}
          />
          <div className="flex-shrink-0">
            <ViewSwitcher view={view} onViewChange={setView} />
          </div>
        </div>
      </div>

      <div className="flex-1 relative">
        {view === 'map' ? (
          <LoadScript googleMapsApiKey="AIzaSyCMkb6IXHavqSlWJVua2bLvPJq9wZxMHpI">
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={8}
              center={defaultCenter}
              options={mapOptions}
              onLoad={onLoad}
            >
              {filteredJobs.map((job) => (
                <Marker
                  key={job.id}
                  position={job.position}
                  onClick={() => setSelectedMarker(job)}
                  icon={{
                    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
                    fillColor: "#3b82f6",
                    fillOpacity: 1,
                    strokeColor: "#1d4ed8",
                    strokeWeight: 2,
                    scale: 1.5,
                  }}
                />
              ))}

              {selectedMarker && (
                <InfoWindow
                  position={selectedMarker.position}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div className="bg-gray-900 text-white p-4 rounded-lg max-w-xs">
                    <h3 className="text-lg font-semibold text-blue-400 mb-2">
                      {selectedMarker.title}
                    </h3>
                    <p className="text-sm text-gray-300 mb-2">
                      {selectedMarker.company}
                    </p>
                    <p className="text-sm text-gray-400 mb-3">
                      {selectedMarker.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedMarker.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        ) : (
          <JobGrid
            jobs={filteredJobs}
            filters={filters}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />
        )}

        {notification && (
          <JobNotification 
            country={notification.country}
            job={notification.job}
          />
        )}
      </div>
    </div>
  );
};

export default MapComponent;