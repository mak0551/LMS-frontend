import React from "react";
import { Link } from "react-router-dom";

function EnrollmentList({ data }) {
  return (
    <div className="sm:mx-8 xl:mx-40 mx-4 flex gap-4 flex-wrap py-4 justify-center">
      {data.length > 0 ? (
        data.map((data, index) => (
          <div
            className="flex w-[350px] h-[400px] flex-col rounded-lg overflow-hidden my-2 bg-white hover:bg-zinc-50 font-mono p-6 shadow-md hover:shadow-xl transition-all duration-300 group"
            key={index}
          >
            <div className=" overflow-hidden rounded-md">
              <img
                src={`${
                  data?.courseId?.thumbNail
                    ? data?.courseId?.thumbNail
                    : "https://plus.unsplash.com/premium_photo-1685086785636-2a1a0e5b591f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }`}
                alt=""
                className="h-full w-full rounded-md transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="relative">
              <h1 className="mt-4 mb-2 text-3xl capitalize font-mono font-bold ">
                {data?.courseId?.title}
              </h1>
              <p className="text-zinc-500 mb-4 text-sm truncate w-3/4">
                {data?.courseId?.description}
              </p>
              <div className="capitalize">
                {data?.courseId?.teacher?.name
                  ? `By ${data?.courseId?.teacher?.name}`
                  : ""}
              </div>
              <div className="text-xs mb-2 font-base">
                Last Updated {data?.courseId?.updatedAt.slice(0, 10)}
              </div>
              <div className="mt-4 flex gap-2 items-center">
                <span
                  className={`${
                    data?.courseId?.level === "Advance"
                      ? "bg-red-300"
                      : "bg-green-300"
                  } ${
                    data.level === "Intermediate" && "bg-yellow-200"
                  } w-fit px-2 py-1 rounded-md text-zinc-800 `}
                >
                  {data?.courseId?.level}
                </span>
                <Link
                  to={`/viewcoursedetails/${data?.courseId?._id}`}
                  className="text-xs underline underline-offset-4 capitalize"
                >
                  continue learning
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

export default EnrollmentList;
