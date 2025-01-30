import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [courses, setCourses] = useState([]);
  const [searchterm, setSearchterm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get("http://localhost:4040/course/getall");
      setCourses(res.data);
      console.log(res.data);
    };
    fetchdata();
  }, []);

  useEffect(() => {
    if (searchterm.trim() === "") {
      setFilteredCourses([]);
      return;
    }
    const result = courses.filter((course) =>
      course.title.toLowerCase().includes(searchterm.toLowerCase())
    );
    setFilteredCourses(result);
  }, [searchterm, courses]);

  return (
    <nav className="sticky top-0 z-10 flex h-[10vh] items-center font-mono justify-between px-6 py-4 bg-green-50 shadow-md">
      <Link to={"/"}>
        <div className="text-2xl font-bold text-gray-800">logo </div>
      </Link>

      <div className="relative flex flex-1 mx-4">
        <input
          type="text"
          placeholder="Search for courses"
          value={searchterm}
          onChange={(e) => setSearchterm(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-400"
        />

        {/* Search Results Dropdown */}
        {searchterm.trim() !== "" && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white shadow-lg border border-gray-200 rounded-md">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <Link
                  key={course._id}
                  to={`/viewcoursedetails/${course._id}`}
                  onClick={() => setSearchterm("")}
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

      <ul className="flex items-center space-x-6 text-gray-700">
        <li>
          <Link to={"/viewteachers"}>tutors</Link>
        </li>
        <li>
          <Link to={"/createcourse"}>create course</Link>
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
        <Link
          to={"/signin"}
          className="tracking-tighter mx-2 px-3 py-1 bg-white text-pink-500 border-pink-600 border-2 rounded-md hover:bg-zinc-100"
        >
          Log in
        </Link>
        <Link
          to={"/signup"}
          className="tracking-tighter mx-2 px-3 py-1 text-white bg-pink-600 border-pink-600 border-2 rounded-md hover:bg-pink-500"
        >
          Sign up
        </Link>
        <span className="ml-2 text-gray-800">username</span>
      </div>
    </nav>
  );
};

export default Navbar;
