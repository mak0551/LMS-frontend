import React from "react";

const Navbar = () => {
  return (
    <nav className="flex h-[10vh] items-center font-mono justify-between px-6 py-4 bg-white shadow-md">
      <div className="text-2xl font-bold text-gray-800">logo </div>

      <div className="flex flex-1 mx-4">
        <input
          type="text"
          placeholder="Search for courses"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:ring-pink-500"
        />
        <button className="mx-2 px-4 py-2 text-white bg-pink-500 rounded-r-md hover:bg-pink-600">
          Search
        </button>
      </div>

      <ul className="flex items-center space-x-6 text-gray-700">
        <li>
          <a href="/categories" className="hover:text-pink-500">
            Categories
          </a>
        </li>
        <li>
          <a href="/teach" className="hover:text-pink-500">
            tutors
          </a>
        </li>
        <li>
          <a href="/cart" className="hover:text-pink-500">
            my courses
          </a>
        </li>
      </ul>

      <div className="flex items-center ml-6">
        <img
          src="https://via.placeholder.com/30"
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
        <span className="ml-2 text-gray-800">username</span>
      </div>
    </nav>
  );
};

export default Navbar;
