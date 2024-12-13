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
  faSignOutAlt 
} from '@fortawesome/free-solid-svg-icons';



const Sidebar = () => {
  return (
    <aside className="bg-sidebar fixed inset-6 w-[18%] h-[92%] rounded-lg p-5 flex flex-col justify-between shadow-lg">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 mb-4">
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

      <nav className="flex flex-col space-y-4">
        {[
          { label: "Compliance Monitoring", icon: faClipboardList },
          { label: "Contract Monitoring", icon: faFileContract },
          { label: "Feedback", icon: faCommentDots },
          { label: "Moderators Registration", icon: faShieldAlt },
          { label: "Document Verification", icon: faFileSignature },
          { label: "Settings", icon: faCog },
          { label: "Log Out", icon: faSignOutAlt },
        ].map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-3 py-3 px-3 text-sm text-white rounded-md transition duration-200 hover:bg-[#066a73] active:bg-white active:text-black focus:outline-none focus:bg-white focus:text-black"
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
