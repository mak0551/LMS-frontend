import React, { useState } from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import { FaSortAmountDown } from "react-icons/fa";
import { RiFilter2Fill } from "react-icons/ri";

function ShowCoursesComponent({ data }) {
  const [sortBy, setSortBy] = useState("default"); // Default: no sorting
  const [filterLevel, setFilterLevel] = useState("all"); // Default: show all levels

  // Sorting function
  const sortedCourses = [...data].sort((a, b) => {
    if (sortBy === "price") {
      return a.price - b.price; // Lowest price first
    } else if (sortBy === "rating") {
      return b.averageRating - a.averageRating; // Highest rating first
    }
    return 0; // Default: original order
  });

  // Filtering function
  const filteredCourses = sortedCourses.filter((course) => {
    if (filterLevel === "all") return true;
    return course.level.toLowerCase() === filterLevel.toLowerCase();
  });

  return (
    <div className="xl:mx-40 mx-4 py-2">
      {/* Sorting and Filtering Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm sm:my-3 gap-1 sm:gap-4">
        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 px-2 ">
          <label className="font-mono text-sm flex gap-2 items-center">
            <span className="hidden sm:block">Sort by</span>
            <FaSortAmountDown className="text-lg"/>
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-zinc-300 rounded-md p-1 sm:text-sm text-xs w-[100px]"
          >
            <option value="default" className="text-xs">Default</option>
            <option value="price" className="text-xs">Price (Low to High)</option>
            <option value="rating" className="text-xs">Rating (High to Low)</option>
          </select>
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2 px-2 ">
          <label className="font-mono text-sm flex items-center gap-2">
            <span className="hidden sm:block">Filter</span>
            <RiFilter2Fill className="text-lg" />
          </label>
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="border border-zinc-300 rounded-md p-1 sm:text-sm text-xs w-[100px]"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Course List */}
      {filteredCourses.length > 0 ? (
        filteredCourses.map((data, index) => (
          <div
            className="w-full sm:h-[300px] md:h-fit sm:flex sm:flex-row flex-col rounded-lg overflow-hidden mb-8 bg-white hover:bg-zinc-50 font-mono p-6 shadow-md hover:shadow-xl transition-all duration-300 group "
            key={index}
          >
            <div className="sm:w-[40%] overflow-hidden rounded-md">
              <img
                src={`${
                  data.thumbNail
                    ? data.thumbNail
                    : "https://plus.unsplash.com/premium_photo-1685086785636-2a1a0e5b591f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }`}
                alt=""
                className="h-[200px] 2xl:h-[260px] w-full md:min-w-[200px] rounded-md transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="sm:w-[60%] md:w-[60%] px-8 relative">
              <h1 className="mt-4 mb-2 text-3xl capitalize font-mono font-bold ">
                {data.title}
              </h1>
              <p className="text-zinc-500 mb-4 text-sm truncate w-3/4">
                {data.description}
              </p>
              <div className="capitalize">
                {data.teacher?.name ? `By ${data.teacher.name}` : ""}
              </div>
              <div className="text-xs mb-2 font-base">
                Last Updated {data?.updatedAt?.slice(0, 10)}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-pink-900">{data?.averageRating}</span>
                <div className="pb-[2px]">
                  <StarRating rating={data?.averageRating} />
                </div>
              </div>
              <span className="absolute sm:top-4 sm:right-10 right-4 top-10 text-xl">
                ₹{data.price}
              </span>

              <div className="mt-4 flex gap-2 items-center">
                <span
                  className={`${
                    data.level === "Advanced" ? "bg-red-300" : "bg-green-300"
                  } ${
                    data.level === "Intermediate" && "bg-yellow-200"
                  } w-fit px-2 py-1 rounded-md text-zinc-800 text-xs sm:text-lg`}
                >
                  {data.level}
                </span>
                <Link
                  to={`/viewcoursedetails/${data._id}`}
                  className="underline underline-offset-4 text-xs sm:text-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No courses found</div>
      )}
    </div>
  );
}

export default ShowCoursesComponent;
