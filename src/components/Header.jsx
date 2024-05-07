import React from "react";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header className="bg-blue-500 py-4 px-8 flex justify-between items-center">
      <h1 className="text-white text-2xl font-semibold">Dashboard</h1>
      <Link to="/logout">
        <button className="bg-red-700 text-white py-2 px-4 rounded-lg">
          Logout
        </button>
      </Link>
    </header>
  );
}

export default Header;
