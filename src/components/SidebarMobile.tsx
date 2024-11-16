import React, { useEffect, useRef } from 'react';
import { LucideIcon, Globe, X } from 'lucide-react';

interface SidebarProps {
  menuItems: {
    id: string;
    icon: LucideIcon;
    label: string;
  }[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const SidebarMobile: React.FC<SidebarProps> = ({ menuItems, activeTab, setActiveTab, isOpen, onClose }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number>(0);
  const currentX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (!sidebarRef.current) return;

      startX.current = e.touches[0].clientX;
      currentX.current = startX.current;
      isDragging.current = true;

      sidebarRef.current.style.transition = 'none';
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || !sidebarRef.current) return;

      currentX.current = e.touches[0].clientX;
      const diff = Math.min(0, currentX.current - startX.current);

      sidebarRef.current.style.transform = `translateX(${diff}px)`;
    };

    const handleTouchEnd = () => {
      if (!isDragging.current || !sidebarRef.current) return;

      isDragging.current = false;
      sidebarRef.current.style.transition = 'transform 0.3s ease-out';

      const diff = currentX.current - startX.current;
      if (diff < -50) {
        onClose();
      } else {
        sidebarRef.current.style.transform = 'translateX(0)';
      }
    };

    const sidebar = sidebarRef.current;
    if (sidebar) {
      sidebar.addEventListener('touchstart', handleTouchStart);
      sidebar.addEventListener('touchmove', handleTouchMove);
      sidebar.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (sidebar) {
        sidebar.removeEventListener('touchstart', handleTouchStart);
        sidebar.removeEventListener('touchmove', handleTouchMove);
        sidebar.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [onClose]);

  useEffect(() => {
    // Reset transform when isOpen changes
    if (sidebarRef.current) {
      sidebarRef.current.style.transform = isOpen ? 'translateX(0)' : 'translateX(-100%)';
    }
  }, [isOpen]);

  return (
    <>
      <div
  className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
  }`}
  onClick={onClose}
/>

      <aside
        ref={sidebarRef}
        className={`fixed lg:static w-64 h-full bg-gray-900/40 backdrop-blur-xl border-r border-blue-500/20 shadow-[5px_0_30px_-15px_rgba(59,130,246,0.5)] z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col">
          <button
            onClick={onClose}
            className="lg:hidden absolute right-4 top-4 p-2 rounded-lg hover:bg-blue-500/10 text-blue-400"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="p-6">
            <div className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-blue-400" />
              <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
                Postuly
              </div>
            </div>
            <div className="mt-1 text-xs text-blue-300/70">Global Talent Network</div>
          </div>

          <nav className="flex-1 px-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveTab(item.id);
                        if (window.innerWidth < 1024) onClose();
                      }}
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
        </div>
      </aside>
    </>
  );
};

export default SidebarMobile;
