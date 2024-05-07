import React from "react";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <aside className="bg-gray-800 text-white w-full h-screen sm:w-2/6 md:w-2/12 p-4">
      <nav>
        <ul>
          <Link to="/dashboard">
            <button className="bg-gray-700 text-white py-2 mb-2 px-4 rounded-lg w-full">
              Home
            </button>
          </Link>
          <Link to="/addContact">
            <button className="bg-gray-700 text-white mb-2 py-2 px-4 rounded-lg w-full">
              Add new contact
            </button>
          </Link>
          <Link to="/logout">
            <button className="bg-gray-700 text-white py-2 px-4 rounded-lg w-full">
              Logout
            </button>
          </Link>
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;
