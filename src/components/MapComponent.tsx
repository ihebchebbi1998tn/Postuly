import React, { useRef, useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import SearchBar from './SearchBar';
import JobNotification from './JobNotification';

interface MapComponentProps {
  onOpenSidebar: () => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onOpenSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState<{
    country: string;
    job: { title: string; company: string };
  } | null>(null);

  const mapRef = useRef<google.maps.Map>();
  const [selectedMarker, setSelectedMarker] = useState<any>(null);

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
        "elementType": "geometry",
        "stylers": [{ "color": "#242f3e" }]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#746855" }]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#d59563" }]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{ "color": "#17263c" }]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#515c6d" }]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [{ "color": "#17263c" }]
      }
    ],
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false
  };

  // Sample job data
  const jobLocations = [
    {
      position: { lat: 36.8065, lng: 10.1815 },
      title: "Senior React Developer",
      company: "TechCorp Tunisia",
      skills: ["React", "TypeScript", "Node.js"],
      description: "Join our dynamic team in building next-gen web applications"
    },
    {
      position: { lat: 36.7200, lng: 10.2000 },
      title: "Full Stack Engineer",
      company: "Digital Solutions",
      skills: ["Vue.js", "Python", "AWS"],
      description: "Help us create innovative solutions for global clients"
    },
    // Add more job locations as needed
  ];

  useEffect(() => {
    const countries = ['Tunisia', 'France', 'Germany'];
    const jobs = [
      { title: 'Senior Developer', company: 'TechCorp' },
      { title: 'Full Stack Engineer', company: 'Digital Solutions' },
      { title: 'Frontend Developer', company: 'WebTech' },
    ];

    const showRandomNotification = () => {
      const country = countries[Math.floor(Math.random() * countries.length)];
      const job = jobs[Math.floor(Math.random() * jobs.length)];
      setNotification({ country, job });
      setTimeout(() => setNotification(null), 4000);
    };

    const interval = setInterval(showRandomNotification, 5000);
    return () => clearInterval(interval);
  }, []);

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  return (
    <div className="relative w-full h-full">
      <LoadScript googleMapsApiKey="AIzaSyCMkb6IXHavqSlWJVua2bLvPJq9wZxMHpI">
        <div className="absolute top-4 lg:left-1/2 lg:-translate-x-1/2 z-10 w-full lg:w-1/2">
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery}
            onOpenSidebar={onOpenSidebar}
          />
        </div>
        
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={8}
          center={defaultCenter}
          options={mapOptions}
          onLoad={onLoad}
        >
          {jobLocations.map((job, index) => (
            <Marker
              key={index}
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
                  {selectedMarker.skills.map((skill: string, index: number) => (
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

        {notification && (
          <JobNotification 
            country={notification.country}
            job={notification.job}
          />
        )}
      </LoadScript>
    </div>
  );
};

export default MapComponent;