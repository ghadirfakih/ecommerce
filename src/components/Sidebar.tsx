import Link from "next/link";
import { FaHome, FaBox, FaListAlt } from "react-icons/fa";
const Sidebar = () => {
  return (
    <div className="col-span-2 bg-gray-800 text-white w-full min-h-screen">
      <div className="header p-4 border-b h-20 border-gray-700">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 p-4 hover:bg-gray-700 rounded"
            >
              <FaHome />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="flex items-center space-x-2 p-4 hover:bg-gray-700 rounded"
            >
              <FaBox />
              <span>Product Management</span>
            </Link>
          </li>
          <li>
            <Link
              href="/orders"
              className="flex items-center space-x-2 p-4 hover:bg-gray-700 rounded"
            >
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
