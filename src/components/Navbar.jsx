import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../state_management/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://lms-htvh.onrender.com/course/getall"
      );
      setCourses(res.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCourses([]);
      return;
    }
    const result = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(result);
  }, [searchTerm, courses]);

  return (
    <nav className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white shadow-md font-mono">
      <Link to="/" className="text-2xl font-bold text-black">
        LMS
      </Link>

      <div className="relative flex-1 mx-4 hidden lg:flex">
        <input
          type="text"
          placeholder="Search for courses"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring focus:ring-gray-300"
        />
        {searchTerm.trim() !== "" && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white shadow-lg border border-gray-200 rounded-md">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <Link
                  key={course._id}
                  to={`/viewcoursedetails/${course._id}`}
                  onClick={() => setSearchTerm("")}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  {course.title}
                </Link>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No courses found</div>
            )}
          </div>
        )}
      </div>

      <ul className="hidden md:flex font-bold items-center space-x-6 text-black">
        <li className="hover:scale-105 transition-transform">
          <Link to="/viewteachers" className="hover:text-gray-700">
            Tutors
          </Link>
        </li>
        <li className="hover:scale-105 transition-transform">
          <Link to="/mylearnings" className="hover:text-gray-700">
            My Learning
          </Link>
        </li>
        <li className="hover:scale-105 transition-transform">
          <Link to="/createcourse" className="hover:text-gray-700">
            Create Course
          </Link>
        </li>
        <li className="hover:scale-105 transition-transform">
          <Link to="/mycourses" className="hover:text-gray-700">
            Teacher's dashboard
          </Link>
        </li>
      </ul>

      <div className="flex items-center">
        {user ? (
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex gap-2 items-center mx-2">
              <img
                src={user.user?.profileImg}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-black font-semibold">
                {user.user?.name}
              </span>
            </div>
            <button
              onClick={logout}
              className="px-3 py-1 text-white bg-red-500 border-2 border-red-600 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden md:flex space-x-2">
            <Link
              to="/signin"
              className="px-3 py-1 mx-2 bg-black text-white  border-black border-2 rounded-md hover:bg-zinc-700"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="px-3 py-1 text-black bg-white border-black border-2 rounded-md hover:bg-zinc-50"
            >
              Sign up
            </Link>
          </div>
        )}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden ml-4 text-gray-800 text-2xl"
        >
          {menuOpen ? <RxCross1 /> : <GiHamburgerMenu />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 md:hidden">
          <ul className="flex flex-col items-center space-y-4 text-black font-semibold">
            <li>
              <Link
                to="/viewteachers"
                onClick={() => setMenuOpen(false)}
                className="hover:text-pink-700"
              >
                Tutors
              </Link>
            </li>
            <li>
              <Link
                to="/mylearnings"
                onClick={() => setMenuOpen(false)}
                className="hover:text-pink-700"
              >
                My Learning
              </Link>
            </li>
            <li>
              <Link
                to="/createcourse"
                onClick={() => setMenuOpen(false)}
                className="hover:text-pink-700"
              >
                Create Course
              </Link>
            </li>
            <li>
              <Link
                to="/mycourses"
                onClick={() => setMenuOpen(false)}
                className="hover:text-pink-700"
              >
                Teacher's dashboard
              </Link>
            </li>
          </ul>
          <div className="flex flex-col items-center space-y-3">
            {user ? (
              <>
                <div className="flex gap-2 items-center justify-center">
                  <img
                    src={user.user?.profileImg}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-black font-semibold">
                    {user.user?.name}
                  </span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="px-4 py-1 text-white bg-red-500 border-2 border-red-600 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  onClick={() => setMenuOpen(false)}
                  className="sm:px-4 px-1 py-2 w-[90px] h-[40px] text-sm text-center bg-black text-white border-black border-2 rounded-md hover:bg-zinc-700"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="sm:px-4 px-1 py-2 w-[90px] h-[40px] text-center text-sm text-black bg-white border-black border-2 rounded-md hover:bg-zinc-50"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
