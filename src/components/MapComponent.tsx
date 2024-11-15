import React, { useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
interface JobData {
  [key: string]: {
    title: string;
    description: string;
    skills: string[];
  };
}

const MapComponent: React.FC = () => {
  const mapRef = useRef<GoogleMap>(null);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  const jobData: JobData = {
    Tunisia: {
      title: 'Software Developer',
      description: 'Develop scalable web applications.',
      skills: ['React.js', 'Node.js', 'MySQL'],
    },
    Germany: {
      title: 'Data Scientist',
      description: 'Analyze and model data for actionable insights.',
      skills: ['Python', 'Machine Learning', 'SQL'],
    },
  };

  return (
    <div className="relative w-full h-full">
      <LoadScript googleMapsApiKey="AIzaSyCMkb6IXHavqSlWJVua2bLvPJq9wZxMHpI">
        <GoogleMap
          ref={mapRef}
          mapContainerClassName="w-full h-full"
          center={{ lat: 42, lng: 10 }}
          zoom={3}
          options={{
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
          }}
        >
          {Object.keys(jobData).map((country) => {
            const countryInfo = jobData[country];
            const position =
              country === 'Tunisia'
                ? { lat: 33.8869, lng: 9.5375 }
                : { lat: 51.1657, lng: 10.4515 };

            return (
              <Marker
                key={country}
                position={position}
                onMouseOver={() => setActiveMarker(country)}
                onMouseOut={() => setActiveMarker(null)}
                onLoad={(marker) => {
                  // Safely set the icon using `google` object
                  marker.setIcon({
                    url: "https://via.placeholder.com/25",
                    scaledSize: new window.google.maps.Size(25, 25), // Use `window.google` safely
                  });
                }}
              >
                {activeMarker === country && (
                  <InfoWindow position={position} onCloseClick={() => setActiveMarker(null)}>
                    <div
                      className="bg-gray-800 text-white p-4 rounded-lg shadow-lg"
                      style={{ minWidth: '200px' }}
                    >
                      <h4 className="text-lg font-bold mb-2">{countryInfo.title}</h4>
                      <p className="text-sm mb-2">{countryInfo.description}</p>
                      <ul className="text-xs">
                        {countryInfo.skills.map((skill, index) => (
                          <li key={index}>- {skill}</li>
                        ))}
                      </ul>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            );
          })}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
