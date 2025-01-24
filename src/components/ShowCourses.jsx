import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ShowCourses() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:4040/course/getall");
      setData(response.data);
      console.log(response.data);
    };
    fetchData();
  }, []);
  return (
    <div className="mx-40 py-12">
      {data.length > 0 ? (
        data.map((data, index) => (
          <div
            className="w-full h-[300px] flex rounded-lg overflow-hidden my-8 font-mono p-6 border border-pink-400"
            key={index}
          >
            <div className="w-[40%]">
              <img
                src={`${
                  data.thumbNail
                    ? data.thumbNail
                    : "https://plus.unsplash.com/premium_photo-1685086785636-2a1a0e5b591f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }`}
                alt=""
                className="h-full w-full rounded-md "
              />
            </div>
            <div className=" w-[60%] px-8">
              <h1 className="mt-4 mb-2 text-3xl capitalize font-mono font-bold">
                {data.title}
              </h1>
              <p className="text-zinc-500 mb-4 text-sm">{data.description}</p>
              <div className="capitalize">
                {data.teacher?.name ? `By ${data.teacher.name}` : ""}
              </div>
              <div className="text-xs mb-2 font-base">
                Last Updated {data.updatedAt.slice(0, 10)}
              </div>
              <span>&#8377;{data.price}</span>

              <div className="my-4 flex gap-2 items-center">
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
                  to={"/viewcoursedetails"}
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

export default ShowCourses;
