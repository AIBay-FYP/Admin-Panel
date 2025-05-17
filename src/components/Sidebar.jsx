'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClipboardList,
  faFileContract,
  faCommentDots,
  faShieldAlt,
  faFileSignature,
  faCog,
  faSignOutAlt,
  faBars,
  faTimes,
  faDashboard,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { UserButton, useUser } from '@clerk/nextjs';

const Sidebar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useUser();
  var username = user?.firstName;

  const queryClient = useQueryClient();
  const router = useRouter();

  if (!username) {
    username = 'Admin Name';
  }

  // Ensure the component is mounted on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const storedValue =
    typeof window !== 'undefined' &&
    JSON.parse(localStorage.getItem('selectedSidebar'));

  const { data: selected } = useQuery({
    queryKey: ['selectedSidebar'],
    queryFn: () => storedValue || 'Compliance Monitoring',
    staleTime: Infinity,
  });

  const mutation = useMutation({
    mutationFn: (newSelection) => {
      localStorage.setItem('selectedSidebar', JSON.stringify(newSelection));
      return newSelection;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['selectedSidebar'], data);
    },
  });

  // Menu items for Compliance Manager
  const complianceManagerMenuItems = [
    { label: 'Compliance Monitoring', icon: faClipboardList, route: '/complianceMonitoring' },
    { label: 'Contract Monitoring', icon: faFileContract, route: '/contractMonitoring' },
    { label: 'Document Verification', icon: faFileSignature, route: '/documentVerification' },
    { label: 'Settings', icon: faCog, route: '/settings' },
  ];

  // Menu items for Moderator
  const moderatorMenuItems = [
    { label: 'Compliance Monitoring', icon: faClipboardList, route: '/complianceMonitoring' },
    { label: 'Contract Monitoring', icon: faFileContract, route: '/contractMonitoring' },
    { label: 'Feedback', icon: faCommentDots, route: '/feedback' },
    { label: 'Moderator Registration', icon: faShieldAlt, route: '/moderatorPage' },
    { label: 'Document Verification', icon: faFileSignature, route: '/documentVerification' },
    { label: 'Settings', icon: faCog, route: '/settings' },
  ];

  // Determine which menu items to render based on the user's role
  const menuItems =
    user?.publicMetadata.role === 'Compliance Manager'
      ? complianceManagerMenuItems
      : moderatorMenuItems;

  const handleNavigation = (item) => {
    // Check if selectedSidebar is a number
    const storedSidebar = JSON.parse(localStorage.getItem('selectedSidebar'));

    if (typeof storedSidebar === 'number') {
      // If it's a number, set selectedCard to null
      localStorage.setItem('selectedCard', null);

      const newSelection = item.label; // Update with the current item's label
      localStorage.setItem('selectedSidebar', JSON.stringify(newSelection));
      mutation.mutate(newSelection);
    } else {
      // Handle regular updates for non-number sidebar states
      mutation.mutate(item.label);
    }

    // Navigate to the route
    router.push(item.route);
  };

  // Prevent rendering on the server
  if (!isMounted) {
    return (
      <aside className="bg-gradient-to-b from-[#111827] to-[#0f1c2d] fixed left-0 z-50 h-full p-5 flex flex-col justify-between shadow-lg sm:w-[25%] md:w-[18%]">
        <div className="flex justify-center items-center h-full">
          <div className="h-8 w-8 rounded-full bg-white/10 animate-pulse"></div>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={`bg-gradient-to-b from-[#111827] to-[#0f1c2d] fixed left-0 z-50 h-full flex flex-col justify-between shadow-lg transition-all duration-300 ease-in-out ${
        isOpen ? 'sm:w-[25%] md:w-[18%]' : 'w-[70px]'
      }`}
    >
      {/* Hamburger menu: visible only on small screens */}
      <button
        className="absolute -right-3 top-8 bg-gradient-to-br from-teal-600 to-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg md:block hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-xs" />
      </button>

      {/* Logo and Profile */}
      <div className="p-5">
        <div className={`flex items-center ${isOpen ? 'justify-start' : 'justify-center'} mb-8`}>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-300 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-indigo-900 text-lg font-bold">A</span>
            </div>
            {isOpen && (
              <div className="transition-opacity duration-200">
                <span className="text-white text-xl font-bold">AI-Bay</span>
                <span className="text-teal-300 text-xs block -mt-1">Admin Portal</span>
              </div>
            )}
          </div>
        </div>

        <div className={`flex ${isOpen ? 'flex-row items-center' : 'flex-col items-center'} mb-10`}>
          <div className={`${isOpen ? 'mr-3' : 'mb-2'}`}>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: isOpen ? '40px' : '30px',
                    height: isOpen ? '40px' : '30px',
                  },
                  userButtonPopoverActionButton__manageAccount: {
                    display: 'none',
                  },
                  userButtonPopoverFooter: {
                    display: 'none',
                  },
                },
              }}
            />
          </div>
          {isOpen && (
            <div>
              <h3 className="text-sm font-medium text-white">{username}</h3>
              <p className="text-xs text-teal-200 opacity-80">{user?.publicMetadata.role || 'Admin'}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-grow overflow-y-auto px-3 py-4">
        <div className={`mb-2 ${isOpen ? 'px-3' : 'text-center'}`}>
          <span className="text-xs uppercase font-semibold text-white/50">Menu</span>
        </div>
        
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex ${isOpen ? 'items-center justify-start' : 'flex-col items-center justify-center'} gap-3 py-3 px-3 rounded-lg transition-all duration-200 hover:bg-white/10 relative group ${
                selected === item.label
                  ? 'bg-gradient-to-r from-teal-600 to-teal-600 text-white'
                  : 'text-white/70 hover:text-white'
              }`}
              onClick={() => handleNavigation(item)}
            >
              <FontAwesomeIcon 
                icon={item.icon} 
                className={`${isOpen ? 'text-base' : 'text-lg mb-1'} ${selected === item.label ? 'text-white' : 'text-teal-300'}`} 
              />
              <span className={`text-sm whitespace-nowrap ${isOpen ? '' : 'text-[10px]'}`}>
                {isOpen ? item.label : item.label.split(' ')[0]}
              </span>
              
              {/* Active indicator */}
              {selected === item.label && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
              )}
              
              {/* Tooltip for collapsed state */}
              {!isOpen && (
                <div className="absolute left-full ml-2 p-2 bg-[#1e293b] text-white text-xs rounded-md whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-50">
                  {item.label}
                </div>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Footer section */}
      <div className="p-5">
        {isOpen ? (
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-teal-500/20 rounded-lg">
                <FontAwesomeIcon icon={faChartLine} className="text-teal-300 text-sm" />
              </div>
              <div>
                <div className="text-white text-xs font-medium">Platform Status</div>
                <div className="text-teal-200 text-[10px] flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 mr-1"></span>
                  All systems operational
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="p-2 bg-white/5 backdrop-blur-sm rounded-lg">
              <FontAwesomeIcon icon={faChartLine} className="text-teal-300 text-sm" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
