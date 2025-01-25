import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Courses() {
  var [data, setData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("http://localhost:4040/course/getall");
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    fetchdata();
  }, []);
  return (
    <div className=" font-mono">
      <div className="p-4 pl-0 flex flex-nowrap overflow-auto scrollbar-hide">
        {data.length > 0 ? (
          data.map((data, index) => (
            <Link to={`/viewcoursedetails/${data._id}`} key={index}>
              <div
                className="h-[350px] w-[300px] flex flex-col overflow-hidden border border-pink-300 rounded-lg m-2 flex-shrink-0"
              >
                <div className="h-[50%]">
                  <img
                    src={`${
                      data.thumbNail
                        ? data.thumbNail
                        : "https://plus.unsplash.com/premium_photo-1685086785636-2a1a0e5b591f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }`}
                    alt=""
                    className="h-full w-full hover:brightness-125"
                  />
                </div>
                <div className="h-[50%] px-4 py-2 font-mono flex flex-col">
                  <div className="h-[50%]">
                    <h1 className="text-lg capitalize">{data.title}</h1>
                    <p className="text-zinc-500 text-nowrap">
                      {data.description}
                    </p>
                    <span className="text-zinc-600 text-nowrap text-sm capitalize">
                      {data.teacher?.name || ""}
                    </span>
                  </div>
                  <div className="h-[50%] relative">
                    <span>&#8377;{data.price}</span>
                    <div
                      className={`${
                        data.level === "Advance" ? "bg-red-300" : "bg-green-300"
                      } ${
                        data.level === "Intermediate" && "bg-yellow-200"
                      } w-fit px-2 py-1 rounded-md text-zinc-800 absolute bottom-2`}
                    >
                      {data.level}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-white">No courses available</p>
        )}
      </div>
      <Link to={"/allcourses"}>
        <p className="mx-2 px-3 py-1 text-zinc-900 border-pink-600 border-2 rounded-md hover:bg-zinc-100 w-fit capitalize">
          show all courses
        </p>
      </Link>
    </div>
  );
}

export default Courses;
