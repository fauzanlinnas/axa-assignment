import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-gray-800 ">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-xl font-bold">
              Home
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
