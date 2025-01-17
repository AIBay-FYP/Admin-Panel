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
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const queryClient = useQueryClient();
  const router = useRouter();

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

  const menuItems = [
    { label: 'Compliance Monitoring', icon: faClipboardList, route: '/complianceMonitoring' },
    { label: 'Contract Monitoring', icon: faFileContract, route: '/contractMonitoring' },
    { label: 'Feedback', icon: faCommentDots, route: '/feedback' },
    { label: 'Moderators Registration', icon: faShieldAlt, route: '/moderatorPage' },
    { label: 'Document Verification', icon: faFileSignature, route: '/documentVerification' },
    { label: 'Settings', icon: faCog, route: '/settings' },
    { label: 'Log Out', icon: faSignOutAlt, route: '/logout' },
  ];

  const handleNavigation = (item) => {
    mutation.mutate(item.label); // Save selection to localStorage
    router.push(item.route); // Navigate to the respective route
  };

  // Prevent rendering on the server
  if (!isMounted) {
    return <div>Loading...</div>;
  }

  return (
    <aside
      className={`bg-sidebar fixed top-0 left-0 z-50 h-full p-5 flex flex-col justify-between shadow-lg transition-transform duration-300 ${
        isOpen ? 'transform-none' : '-translate-x-full'
      } sm:w-[25%] md:w-[18%]`}
    >
      {/* Hamburger menu: visible only on small screens */}
      <button
        className="block sm:hidden absolute top-5 right-5 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-2xl" />
      </button>

      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 mb-1">
          <Image
            src="/assets/no-pfp.jpg"
            alt="Profile Picture"
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
        <h3 className="text-md font-semibold text-white">Admin Name</h3>
        <p className="text-xs text-gray-300 mb-4">Role</p>
        <hr className="w-full border-gray-600" />
      </div>

      <nav className="flex flex-col space-y-6">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`flex items-center gap-3 py-3 px-3 text-xs rounded-md transition duration-200 ${
              selected === item.label
                ? 'bg-white text-black'
                : 'text-white hover:bg-[#066a73] active:bg-white active:text-black focus:outline-none focus:bg-white focus:text-black'
            }`}
            onClick={() => handleNavigation(item)}
            style={{
              minHeight: '48px', // Ensure consistent button height
              whiteSpace: 'nowrap', // Prevent text from wrapping
              textOverflow: 'ellipsis', // Truncate overflow text
              overflow: 'hidden', // Hide text overflow
            }}
          >
            <FontAwesomeIcon icon={item.icon} className="text-base" />
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
