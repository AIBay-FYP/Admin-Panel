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
import { UserButton, useUser } from '@clerk/nextjs';


const Sidebar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const {user} = useUser();
  var username = user?.username;

  const queryClient = useQueryClient();
  const router = useRouter();


  if (!username) {
      username = 'Admin Name'
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

  const menuItems = [
    { label: 'Compliance Monitoring', icon: faClipboardList, route: '/complianceMonitoring' },
    { label: 'Contract Monitoring', icon: faFileContract, route: '/contractMonitoring' },
    { label: 'Feedback', icon: faCommentDots, route: '/feedback' },
    { label: 'Moderators Registration', icon: faShieldAlt, route: '/moderatorPage' },
    { label: 'Document Verification', icon: faFileSignature, route: '/documentVerification' },
  ];

  const handleNavigation = (item) => {
    // Check if selectedSidebar is a number
    const storedSidebar = JSON.parse(localStorage.getItem('selectedSidebar'));
  
    if (typeof storedSidebar === 'number') {
      // If it's a number, set selectedCard to null
      localStorage.setItem('selectedCard', null);
  
      // Update selectedSidebar to the new selection
      const newSelection = item.label; // Update with the current item's label
      localStorage.setItem('selectedSidebar', JSON.stringify(newSelection));
  
      // Update state with mutation
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
    return <div>Loading...</div>;
  }

  return (
    <aside
      className={`bg-sidebar fixed left-0 z-50 h-full p-5 flex flex-col justify-between shadow-lg transition-transform duration-300 ${
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
        {/* <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 mb-1">
          <Image
            src="/assets/no-pfp.jpg"
            alt="Profile Picture"
            width={64}
            height={64}
            className="object-cover"
          />
        </div> */}
        <UserButton
            appearance={{
              elements: {
                userButtonPopoverActionButton__manageAccount:{
                  display:'none'
                },
                avatarBox:{
                  width: '50px',
                  height: '50px',
                  marginBottom: '1em'
                },
                userButtonPopoverFooter:{
                  display:'none'
                },
              },
            }}
        />

        <h3 className="text-md font-semibold text-white">{username}</h3>
        <p className="text-xs text-gray-300 mb-4">{user?.publicMetadata.role}</p>
        <hr className="w-full border-gray-600" />
      </div>

      <nav className="flex flex-col space-y-10 mt-10 justify-start flex-grow">
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
