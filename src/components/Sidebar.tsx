import React from 'react';
import { LucideIcon, Globe } from 'lucide-react';

interface SidebarProps {
  menuItems: {
    id: string;
    icon: LucideIcon;
    label: string;
  }[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems, activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 bg-gray-900/40 backdrop-blur-xl border-r border-blue-500/20 shadow-[5px_0_30px_-15px_rgba(59,130,246,0.5)]">
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-blue-400" />
            <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
              Postuly
            </div>
          </div>
          <div className="mt-1 text-xs text-blue-300/70">Global Talent Network</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 backdrop-blur-sm ${
                      activeTab === item.id
                        ? 'bg-blue-500/10 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)] border border-blue-500/20'
                        : 'text-gray-400 hover:bg-blue-500/5 hover:text-blue-300 hover:border border-blue-500/10'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                    {activeTab === item.id && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-blue-500/20">
          <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-blue-500/5">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop&crop=faces"
                alt="User"
                className="h-10 w-10 rounded-full border-2 border-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              />
              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-gray-900 shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
            </div>
            <div>
              <div className="text-sm font-medium text-blue-100">Iheb Chebbi</div>
              <div className="text-xs text-blue-300/70">Software Engineer</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;