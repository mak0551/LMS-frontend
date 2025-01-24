import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Courses from "./Courses";

function ViewCourse() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get(
        `http://localhost:4040/course/getbyid/${id}`
      );
      setData(response.data);
      console.log(response.data);
    };
    fetchdata();
  }, [id]);
  setTimeout(() => {
    setMount(true);
  }, 2000);
  return (
    <div className="mx-48 my-20 font-mono p-2">
      <div className="flex gap-4 items-center">
        <img
          src={`${
            data.thumbNail
              ? data.thumbNail
              : "https://plus.unsplash.com/premium_photo-1685086785636-2a1a0e5b591f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }`}
          alt=""
          className="h-[200px] w-[300px] rounded-md "
        />
        <div className="m-4 flex flex-col gap-2">
          <h1 className="font-mono text-4xl capitalize">{data.title}</h1>
          <p className="text-zinc-500 text-base">{data.description}</p>
          <span className="capitalize">instructor - {data.teacher?.name}</span>
          <span className="text-sm">
            Date Created: {data.createdAt?.slice(0, 10)}
          </span>
          <span className="text-sm">
            Last Updated: {data.updatedAt?.slice(0, 10)}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4 ">
        <span className="mt-4">
          Course Duration:{" "}
          {`${
            data.duration?.hours > 1
              ? `${data.duration?.hours} hours`
              : `${data.duration?.hours} hour`
          } ${data.duration?.minutes} minutes`}
        </span>
        <div className="flex flex-col gap-4 ">
          <span>
            Difficulty Level:{" "}
            <span
              className={`${
                data.level === "Advance" ? "bg-red-300" : "bg-green-300"
              } ${
                data.level === "Intermediate" && "bg-yellow-200"
              } w-fit p-1 rounded-md text-zinc-800 `}
            >
              {data.level}
            </span>
          </span>
          <div>
            Required Skills:{" "}
            {data.skillsRequired?.map((data, index) => (
              <span key={index} className="capitalize">
                {" "}
                {data}{" "}
              </span>
            ))}
          </div>
          <div>Enrollment Fee: &#8377;{data.price}</div>
        </div>
        <button className="px-3 py-1 bg-white text-pink-500 border-pink-600 border-2 rounded-md hover:bg-zinc-100">
          Enroll Now
        </button>
        <button className="px-3 py-1 text-white bg-pink-600 border-pink-600 border-2 rounded-md hover:bg-pink-500">
          Add To WishList
        </button>
      </div>
      {mount && (
        <>
          <h1 className="capitalize mt-8 underline underline-offset-2 text-2xl">
            other courses you might be interested in
          </h1>
          <Courses />
        </>
      )}
    </div>
  );
}

export default ViewCourse;
