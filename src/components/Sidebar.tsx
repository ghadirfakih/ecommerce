import Link from 'next/link';
import { FaHome, FaBox, FaListAlt } from 'react-icons/fa';
import "@/styles/sidebar.css";  
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="header">
        <h1>Admin Panel</h1>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/dashboard" className="flex items-center space-x-2 p-4 hover:bg-gray-700">
              <FaHome />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/products" className="flex items-center space-x-2 p-4 hover:bg-gray-700">
              <FaBox />
              <span>Product Management</span>
            </Link>
          </li>
          <li>
            <Link href="/orders" className="flex items-center space-x-2 p-4 hover:bg-gray-700">
              <FaListAlt />
              <span>Order Management</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
