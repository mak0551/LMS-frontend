import React from "react";
import { Link } from "react-router-dom";

function ShowCoursesComponent({ data }) {
  return (
    <div className="md:mx-40 mx-4 py-2">
      {data.length > 0 ? (
        data.map((data, index) => (
          <div
            className="w-full sm:h-[300px] md:h-fit sm:flex sm:flex-row flex-col rounded-lg overflow-hidden my-8 bg-white hover:bg-zinc-50 font-mono p-6 shadow-md hover:shadow-xl transition-all duration-300 group "
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
            <div className=" sm:w-[60%] md:w-[60%] px-8 relative">
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
                Last Updated {data.updatedAt.slice(0, 10)}
              </div>
              <span className="absolute sm:top-4 sm:right-10 right-4 top-10 text-xl">
                &#8377;{data.price}
              </span>

              <div className="mt-4 flex gap-2 items-center">
                <span
                  className={`${
                    data.level === "Advance" ? "bg-red-300" : "bg-green-300"
                  } ${
                    data.level === "Intermediate" && "bg-yellow-200"
                  } w-fit px-2 py-1 rounded-md text-zinc-800 `}
                >
                  {data.level}
                </span>
                <Link
                  to={`/viewcoursedetails/${data._id}`}
                  className="text-sm underline underline-offset-4"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>no courses found </div>
      )}
    </div>
  );
}

export default ShowCoursesComponent;
