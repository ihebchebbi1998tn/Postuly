import React, { useState } from 'react';
import { Briefcase, Users, MapPin, Award, BookOpen, Send, Star, Settings } from 'lucide-react';
import MapComponent from './components/MapComponent';
import Sidebar from './components/Sidebar';

function App() {
  const [activeTab, setActiveTab] = useState('jobs');

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

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar menuItems={menuItems} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1">
        <div className="h-full">
          <MapComponent />
        </div>
      </main>
    </div>
  );
}

export default App;
