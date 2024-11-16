import React, { useState, useEffect } from 'react';
import { Briefcase, Users, MapPin, Award, BookOpen, Send, Star, Settings } from 'lucide-react';
import MapComponent from './components/MapComponent';
import Sidebar from './components/Sidebar';
import SidebarMobile from './components/SidebarMobile';

function App() {
  const [activeTab, setActiveTab] = useState('jobs');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const menuItems = [
    { id: 'jobs', icon: Briefcase, label: 'Job Listings' },
    { id: 'applications', icon: Send, label: 'My Applications' },
    { id: 'companies', icon: Users, label: 'Top Companies' },
    { id: 'skills', icon: Award, label: 'Skills Matrix' },
    { id: 'learning', icon: BookOpen, label: 'Learning Path' },
    { id: 'locations', icon: MapPin, label: 'Job Markets' },
    { id: 'saved', icon: Star, label: 'Saved Jobs' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Adjust the width as per your design
    };

    // Set the initial screen size
    handleResize();

    // Add event listener for window resizing
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {isMobile ? (
        <SidebarMobile 
          menuItems={menuItems} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      ) : (
        <Sidebar
          menuItems={menuItems}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}
      
      <main className="flex-1">
        <div className="h-full">
          <MapComponent onOpenSidebar={() => setSidebarOpen(true)} />
        </div>
      </main>
    </div>
  );
}

export default App;
