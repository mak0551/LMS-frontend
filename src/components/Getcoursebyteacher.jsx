import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Getcoursebyteacher() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lms-htvh.onrender.com/course/getbyteacher/${id}`
      );
      setData(response.data);
      console.log(response.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center items-center ">
        <div className="font-mono mt-8 p-4 pl-0 flex flex-wrap justify-center items-center h-fit">
          {data.length > 0 ? (
            data.map((data, index) => (
              <Link to={`/viewcoursedetails/${data._id}`} key={index}>
                <div className="h-[280px] w-[200px] sm:h-[300px] sm:w-[250px] md:h-[350px] md:w-[300px] lg:h-[400px] lg:w-[350px] flex m-4 flex-col overflow-hidden bg-zinc-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex-shrink-0 border border-gray-100">
                  <div className="h-[50%] overflow-hidden">
                    <img
                      src={`${
                        data.thumbNail
                          ? data.thumbNail
                          : "https://plus.unsplash.com/premium_photo-1685086785636-2a1a0e5b591f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      }`}
                      alt=""
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="h-[50%] px-5 py-3 font-mono flex flex-col">
                    <h1 className="text-lg font-semibold capitalize text-gray-800 truncate">
                      {data.title}
                    </h1>
                    <p className="text-gray-600 text-sm truncate">
                      {data.description}
                    </p>
                    <span className="text-gray-500 text-sm capitalize">
                      {data.teacher?.name || ""}
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      ₹{data.price}
                    </span>
                    <div
                      className={`${
                        data.level === "Advance" ? "bg-red-300" : "bg-green-300"
                      } ${
                        data.level === "Intermediate" && "bg-yellow-200"
                      } w-fit px-2 py-1 rounded-md text-zinc-800 text-sm mt-2`}
                    >
                      {data.level}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-white">No courses available</p>
          )}
        </div>
        <Link to={"/viewTeachers"} className="m-4">
          <button className="tracking-tighter mx-2 px-3 py-1 text-white bg-pink-600 border-pink-600 border-2 rounded-md hover:bg-pink-500">
            Go Back
          </button>
        </Link>
      </div>
    </>
  );
}

export default Getcoursebyteacher;
